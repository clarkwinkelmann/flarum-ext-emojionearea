import app from 'flarum/admin/app';

const settingsPrefix = 'clarkwinkelmann-emojionearea.';
const translationPrefix = 'clarkwinkelmann-emojionearea.admin.settings.';

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    app.extensionData.for('clarkwinkelmann-emojionearea')
        .registerSetting(function () {
            // Because we can't set a default value for booleans in settings below, we use this trick
            this.setting(settingsPrefix + 'enable-search', true);
            this.setting(settingsPrefix + 'enable-recent', true);
            this.setting(settingsPrefix + 'enable-tones', true);
            this.setting(settingsPrefix + 'hide-flarum-button', true);
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'enable-search',
            label: app.translator.trans(translationPrefix + 'enableSearch'),
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'enable-recent',
            label: app.translator.trans(translationPrefix + 'enableRecent'),
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'enable-tones',
            label: app.translator.trans(translationPrefix + 'enableTones'),
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'filters-position-bottom',
            label: app.translator.trans(translationPrefix + 'filtersPosition'),
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'search-position-bottom',
            label: app.translator.trans(translationPrefix + 'searchPosition'),
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'hide-flarum-button',
            label: app.translator.trans(translationPrefix + 'hideFlarumButton'),
        });
});
