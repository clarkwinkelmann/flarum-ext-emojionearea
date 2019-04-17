import {extend} from 'flarum/extend';
import app from 'flarum/app';
import Button from 'flarum/components/Button';
import ComposerBody from 'flarum/components/ComposerBody';
import TextEditor from 'flarum/components/TextEditor';

/* global $ */

const translationPrefix = 'clarkwinkelmann-emojionearea.forum.';

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    extend(ComposerBody.prototype, 'config', function (element, isInitialized, context) {
        if (isInitialized) return;

        const $container = $('<div class="ComposerBody-emojioneareaContainer"/>');
        this.$('.TextEditor-controls').before($container);

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
            events: { // Listen for clicks to sync with Flarum editor
                emojibtn_click: () => {
                    // To get the unicode value, we need to pull it from the invisible insert area
                    this.editor.insertAtCursor(this.editor.emojioneArea.getText());
                },
            },
        });

        this.editor.emojioneArea = area.data('emojioneArea');

        const clickedOutside = event => {
            // If a click is triggered before the picker is ready, do not do anything
            if (!this.editor.emojioneArea.isReady) {
                return;
            }

            const $target = $(event.target);

            // If we clicked on the popup or the editor button we don't do anything
            if ($target.is('.emojionearea') || $target.parents('.emojionearea').length || $target.parents('.Button-emojionearea').length) {
                return;
            }

            this.editor.emojioneArea.hidePicker();
        };

        document.addEventListener('click', clickedOutside);

        const previousUnload = context.onunload;
        context.onunload = () => {
            if (previousUnload) {
                previousUnload();
            }
            document.removeEventListener('click', clickedOutside);
        };
    });

    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        // Not using the TextEditorButton component because the tooltip apparently won't go away once the picker is open
        items.add('clarkwinkelmann-emojionearea', Button.component({
            onclick: () => {
                if (this.emojioneArea.button.is('.active')) {
                    this.emojioneArea.hidePicker();
                } else {
                    const position = this.$('.Button-emojionearea').position();
                    this.$('.emojionearea-picker').css('left', position.left - 290);
                    this.emojioneArea.showPicker();
                }
            },
            className: 'Button Button--icon Button--link Button-emojionearea',
            icon: 'far fa-smile-beam',
            title: app.translator.trans(translationPrefix + 'picker_button'),
        }));

        if (app.forum.attribute('emojioneAreaHideFlarumButton')) {
            items.remove('emoji');
        }
    });
});
