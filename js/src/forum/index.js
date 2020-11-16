import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Button from 'flarum/components/Button';
import TextEditor from 'flarum/components/TextEditor';

/* global m, $ */

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

        const $target = $(event.target);

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
            const area = $('<div />').emojioneArea({
                standalone: true, // Popup only mode
                search: app.forum.attribute('emojioneAreaEnableSearch'),
                searchPlaceholder: app.translator.trans(translationPrefix + 'search_placeholder'),
                buttonTitle: app.translator.trans(translationPrefix + 'picker_button'),
                recentEmojis: app.forum.attribute('emojioneAreaEnableRecent'),
                filtersPosition: app.forum.attribute('emojioneAreaFiltersPositionBottom') ? 'bottom' : 'top',
                searchPosition: app.forum.attribute('emojioneAreaSearchPositionBottom') ? 'bottom' : 'top',
                container: $container,
                tones: app.forum.attribute('emojioneAreaEnableTones'),
                autocomplete: false, // Do not try to provide autocomplete - will prevent the textcomplete lib from being included
                sprite: false, // Undocumented setting, but disabling it removes an unnecessary CSS file load
                events: { // Listen for clicks to sync with Flarum editor
                    emojibtn_click: () => {
                        // To get the unicode value, we need to pull it from the invisible insert area
                        this.attrs.composer.editor.insertAtCursor(this.emojioneArea.getText());
                    },
                    ready: resolve,
                },
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
        // Not using the TextEditorButton component because the tooltip apparently won't go away once the picker is open
        items.add('clarkwinkelmann-emojionearea', Button.component({
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
                            this.emojioneArea.showPicker();

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

        if (app.forum.attribute('emojioneAreaHideFlarumButton')) {
            items.remove('emoji');
        }
    });
});
