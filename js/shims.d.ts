import 'flarum/common/components/TextEditor';

declare module 'flarum/common/components/TextEditor' {
    interface EmojioneArea {
        isReady: boolean
        button: any // jQuery

        showPicker(): void

        hidePicker(): void

        getText(): string
    }

    export default interface TextEditor {
        emojioneArea: EmojioneArea | null
        emojioneAreaLoading: boolean
        configureEmojioneArea: () => Promise<void>
        emojioneAreaClickedOutside: (event: MouseEvent) => void

        // Can't get {composer: ComposerState} to actually hint .editor correctly in the code, so just keep it any for now
        attrs: any
    }
}
