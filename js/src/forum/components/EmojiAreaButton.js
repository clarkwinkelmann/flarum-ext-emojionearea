import app from 'flarum/app';
import icon from "flarum/helpers/icon";
import Component from "flarum/Component";

/* global m, $ */

const translationPrefix = 'clarkwinkelmann-emojionearea.forum.';

export default class extends Component {

    init() {
        this.textEditor = this.props.textEditor;
    }

    view() {
        return m('.Button.Button-emojionearea.hasIcon.Button--icon', {
            config: this.configArea.bind(this),
        }, [
            icon('far fa-smile-beam', {className: 'Button-icon'}),
            m('.Button-emojioneareaContainer'),
        ]);
    }

    configArea(element, isInitialized, context) {
        if (isInitialized) return;

        const $container = $(element).find('.Button-emojioneareaContainer');

        const area = $('<div />').emojioneArea({
            container: $container,
            standalone: true, // Popup only mode
            hideSource: false, // Do not hide the target element
            autocomplete: false, // Do not try to provide autocomplete - will prevent the textcomplete lib from being included
            sprite: false, // Not used by the actual picker, but loads an additional CSS file if enabled
            buttonTitle: app.translator.trans(translationPrefix + 'picker_button'), // The default text includes something mentioning a TAB key, even for the standalone version where it makes no sense
            searchPlaceholder: app.translator.trans(translationPrefix + 'search_placeholder'),
            events: { // Listen for clicks to sync with Flarum editor
                emojibtn_click: () => {
                    this.textEditor.insertAtCursor(area.data('emojioneArea').getText());
                },
            },
        });

        document.addEventListener('click', this.clickedOutside);

        context.onunload = () => {
            document.removeEventListener('click', this.clickedOutside);
        };
    }

    clickedOutside(event) {
        const $target = $(event.target);

        // If we clicked on the popup or its content we don't do anything
        if ($target.is('.Button-emojioneareaContainer') || $target.parents('.Button-emojioneareaContainer').length) {
            return;
        }

        const $button = $('.Button-emojioneareaContainer .emojionearea-button');

        // If the popup is currently open we close it
        if ($button.is('.active')) {
            $button.trigger('click');
        }
    }

}
