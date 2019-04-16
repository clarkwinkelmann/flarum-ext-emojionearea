import {extend} from 'flarum/extend';
import app from 'flarum/app';
import TextEditor from 'flarum/components/TextEditor';
import EmojiAreaButton from "./components/EmojiAreaButton";

app.initializers.add('clarkwinkelmann-emojionearea', () => {
    extend(TextEditor.prototype, 'controlItems', function (items) {
        items.add('clarkwinkelmann-emojionearea', EmojiAreaButton.component({
            textEditor: this,
        }));
    });
});
