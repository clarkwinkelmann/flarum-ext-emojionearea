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
        return m('.Button.Button-emojionearea.hasIcon.Button--link.Button--icon', {
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
            standalone: true, // Popup only mode
            search: app.forum.attribute('emojioneAreaEnableSearch'),
            searchPlaceholder: app.translator.trans(translationPrefix + 'search_placeholder'),
            buttonTitle: app.translator.trans(translationPrefix + 'picker_button'),
            recentEmojis: app.forum.attribute('emojioneAreaEnableRecent'),
            filtersPosition: app.forum.attribute('emojioneAreaFiltersPositionBottom') ? 'bottom' : 'top',
            searchPosition: app.forum.attribute('emojioneAreaSearchPositionBottom') ? 'bottom' : 'top',
            container: $container,
            tones: app.forum.attribute('emojioneAreaEnableTones'),
            hideSource: false, // Do not hide the target element
            autocomplete: false, // Do not try to provide autocomplete - will prevent the textcomplete lib from being included
            events: { // Listen for clicks to sync with Flarum editor
                emojibtn_click: () => {
                    // To get the unicode value, we need to pull it from the invisible insert area
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
