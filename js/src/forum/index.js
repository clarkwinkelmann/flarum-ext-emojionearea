import {extend} from 'flarum/extend';
import app from 'flarum/app';
import TextEditor from 'flarum/components/TextEditor';
import EmojiAreaButton from "./components/EmojiAreaButton";

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    extend(TextEditor.prototype, 'toolbarItems', function (items) {
        items.add('clarkwinkelmann-emojionearea', EmojiAreaButton.component({
            textEditor: this,
        }));

        if (app.forum.attribute('emojioneAreaHideFlarumButton')) {
            console.log(items.toArray(), 'toolbar');
            items.remove('emoji');
        }
    });
});
