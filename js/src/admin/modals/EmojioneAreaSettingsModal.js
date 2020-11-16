import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Switch from 'flarum/components/Switch';

/* global m */

const settingsPrefix = 'clarkwinkelmann-emojionearea.';
const translationPrefix = 'clarkwinkelmann-emojionearea.admin.settings.';

export default class EmojioneAreaSettingsModal extends SettingsModal {
    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        const switchSetting = (settingSuffix, labelSuffix, defaultValue, help = false) => {
            return m('.Form-group', [
                Switch.component({
                    state: this.setting(settingsPrefix + settingSuffix, defaultValue ? '1' : '0')() === '1',
                    onchange: value => {
                        this.setting(settingsPrefix + settingSuffix)(value ? '1' : '0');
                    },
                }, app.translator.trans(translationPrefix + labelSuffix)),
                help ? m('.helpText', app.translator.trans(translationPrefix + labelSuffix + 'Help')) : null,
            ]);
        };

        return [
            switchSetting('enable-search', 'enableSearch', true),
            switchSetting('enable-recent', 'enableRecent', true),
            switchSetting('enable-tones', 'enableTones', true),
            switchSetting('filters-position-bottom', 'filtersPosition', false),
            switchSetting('search-position-bottom', 'searchPosition', false),
            switchSetting('hide-flarum-button', 'hideFlarumButton', true, true),
        ];
    }
}
