<?php

namespace ClarkWinkelmann\EmojioneArea;

use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected SettingsRepositoryInterface $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(): array
    {
        return [
            'emojioneAreaConfig' => [
                'search' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.enable-search'),
                'recentEmojis' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.enable-recent'),
                'filtersPosition' => $this->settings->get('clarkwinkelmann-emojionearea.filters-position-bottom') ? 'bottom' : 'top',
                'searchPosition' => $this->settings->get('clarkwinkelmann-emojionearea.search-position-bottom') ? 'bottom' : 'top',
                'tones' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.enable-tones'),
                'autocomplete' => false, // Do not try to provide autocomplete - will prevent the textcomplete lib from being included
            ],
            'emojioneAreaCloseOnPick' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.close-on-pick'),
            'emojioneAreaHideFlarumButton' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.hide-flarum-button'),
        ];
    }
}
