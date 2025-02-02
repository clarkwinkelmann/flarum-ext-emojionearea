import {extend} from 'flarum/common/extend';
import app from 'flarum/forum/app';
import TextEditor from 'flarum/common/components/TextEditor';
import TextEditorButton from 'flarum/common/components/TextEditorButton';

const translationPrefix = 'clarkwinkelmann-emojionearea.forum.';

let emojioneAreaLoaded = false;

function loadEmojioneArea() {
    if (emojioneAreaLoaded) {
        return Promise.resolve();
    }

    emojioneAreaLoaded = true;

    return new Promise(resolve => {
        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.crossOrigin = 'anonymous';
        style.integrity = 'sha256-LKawN9UgfpZuYSE2HiCxxDxDgLOVDx2R4ogilBI52oc=';
        style.href = 'https://cdn.jsdelivr.net/npm/emojionearea@3.4.2/dist/emojionearea.min.css';
        document.head.appendChild(style);

        const script = document.createElement('script');
        script.crossOrigin = 'anonymous';
        script.integrity = 'sha256-ImIFrmJd7ymGlVw2MbtI96BNPW4NfcKqM3d1Go665Ig=';
        script.src = 'https://cdn.jsdelivr.net/npm/emojionearea@3.4.2/dist/emojionearea.min.js';
        script.onload = resolve;
        document.body.appendChild(script);
    });
}

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    TextEditor.prototype.emojioneAreaClickedOutside = function (event) {
        // If a click is triggered before the picker is ready, do not do anything
        if (!this.emojioneArea || !this.emojioneArea.isReady) {
            return;
        }

        const $target = $<any>(event.target);

        // If we clicked on the popup or the editor button we don't do anything
        if ($target.is('.emojionearea') || $target.parents('.emojionearea').length || $target.parents('.Button-emojionearea').length) {
            return;
        }

        this.emojioneArea.hidePicker();
    }

    TextEditor.prototype.configureEmojioneArea = function () {
        if (this.emojioneArea) {
            return Promise.resolve();
        }

        const $container = $('<div class="ComposerBody-emojioneareaContainer"/>');
        this.$('.TextEditor-controls').before($container);

        return new Promise(resolve => {
            const filters: any = {};

            Object.keys($().emojioneArea.defaults.filters).forEach(filter => {
                const key = translationPrefix + 'filters.' + filter;

                if (key in app.translator.translations) {
                    filters[filter] = {
                        title: app.translator.trans(key),
                    };
                }
            });

            const area = $('<div />').emojioneArea({
                standalone: true, // Popup only mode
                sprite: false, // Undocumented setting, but disabling it removes an unnecessary CSS file load
                hidePickerOnBlur: false, // We do our own "click outside" detection since we have a custom opening button
                searchPlaceholder: app.translator.trans(translationPrefix + 'search_placeholder'),
                buttonTitle: app.translator.trans(translationPrefix + 'picker_button'),
                container: $container,
                filters,
                events: { // Listen for clicks to sync with Flarum editor
                    emojibtn_click: () => {
                        // To get the Unicode value, we need to pull it from the invisible insert area
                        this.attrs.composer.editor.insertAtCursor(this.emojioneArea!.getText());

                        if (app.forum.attribute('emojioneAreaCloseOnPick')) {
                            this.emojioneArea!.hidePicker();
                        }
                    },
                    ready: resolve,
                },
                ...app.forum.attribute('emojioneAreaConfig'),
            });

            this.emojioneArea = area.data('emojioneArea');
        });
    }

    extend(TextEditor.prototype, 'oncreate', function () {
        this.emojioneArea = null;
        this.emojioneAreaLoading = false;

        document.addEventListener('click', this.emojioneAreaClickedOutside.bind(this));
    });

    extend(TextEditor.prototype, 'onremove', function () {
        document.removeEventListener('click', this.emojioneAreaClickedOutside);
    });

    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        items.add('clarkwinkelmann-emojionearea', TextEditorButton.component({
            onclick: () => {
                // Prevent double-clicks while the library is loading
                if (this.emojioneAreaLoading) {
                    return;
                }

                if (this.emojioneArea && this.emojioneArea.button.is('.active')) {
                    this.emojioneArea.hidePicker();
                } else {
                    this.emojioneAreaLoading = true;

                    loadEmojioneArea().then(() => {
                        this.configureEmojioneArea().then(() => {
                            const position = this.$('.Button-emojionearea').position();
                            this.$('.emojionearea-picker').css('left', position.left - 290);
                            this.emojioneArea!.showPicker();

                            // Focus EmojiOneArea search bar after opening
                            $('.emojionearea-search input').focus();

                            this.emojioneAreaLoading = false;
                            m.redraw();
                        });
                    });
                }
            },
            className: 'Button Button--icon Button--link Button-emojionearea',
            icon: this.emojioneAreaLoading ? 'fas fa-spinner fa-pulse' : 'far fa-smile-beam',
            title: app.translator.trans(translationPrefix + 'picker_button'),
        }));
    });
});

app.initializers.add('clarkwinkelmann-emojionearea-after', () => {
    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        if (app.forum.attribute('emojioneAreaHideFlarumButton') && items.has('emoji')) {
            items.remove('emoji');
        }
    });
}, -100); // Since flarum/emoji does not run with any special priority, any negative value should work
