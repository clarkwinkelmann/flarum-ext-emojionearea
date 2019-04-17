import app from 'flarum/app';
import EmojioneAreaSettingsModal from "./modals/EmojioneAreaSettingsModal";

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    app.extensionSettings['clarkwinkelmann-emojionearea'] = () => app.modal.show(new EmojioneAreaSettingsModal());
});
