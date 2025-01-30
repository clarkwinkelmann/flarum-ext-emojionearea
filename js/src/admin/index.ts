import app from 'flarum/admin/app';

const settingsPrefix = 'clarkwinkelmann-emojionearea.';
const translationPrefix = 'clarkwinkelmann-emojionearea.admin.settings.';

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    app.extensionData.for('clarkwinkelmann-emojionearea')
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
            setting: settingsPrefix + 'close-on-pick',
            label: app.translator.trans(translationPrefix + 'closeOnPick'),
        })
        .registerSetting({
            type: 'switch',
            setting: settingsPrefix + 'hide-flarum-button',
            label: app.translator.trans(translationPrefix + 'hideFlarumButton'),
        });
});
