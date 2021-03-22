<?php

namespace ClarkWinkelmann\EmojioneArea;

use Flarum\Settings\SettingsRepositoryInterface;

class ForumAttributes
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(): array
    {
        return [
            'emojioneAreaEnableSearch' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.enable-search', true),
            'emojioneAreaEnableRecent' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.enable-recent', true),
            'emojioneAreaEnableTones' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.enable-tones', true),
            'emojioneAreaFiltersPositionBottom' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.filters-position-bottom', false),
            'emojioneAreaSearchPositionBottom' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.search-position-bottom', false),
            'emojioneAreaHideFlarumButton' => (bool)$this->settings->get('clarkwinkelmann-emojionearea.hide-flarum-button', true),
        ];
    }
}
