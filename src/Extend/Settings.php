<?php

namespace ClarkWinkelmann\EmojioneArea\Extend;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Container\Container;

class Settings implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'settings']);
    }

    public function settings(Serializing $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            /**
             * @var $settings SettingsRepositoryInterface
             */
            $settings = app(SettingsRepositoryInterface::class);

            $event->attributes += [
                'emojioneAreaEnableSearch' => (bool)$settings->get('clarkwinkelmann-emojionearea.enable-search', true),
                'emojioneAreaEnableRecent' => (bool)$settings->get('clarkwinkelmann-emojionearea.enable-recent', true),
                'emojioneAreaEnableTones' => (bool)$settings->get('clarkwinkelmann-emojionearea.enable-tones', true),
                'emojioneAreaFiltersPositionBottom' => (bool)$settings->get('clarkwinkelmann-emojionearea.filters-position-bottom', false),
                'emojioneAreaSearchPositionBottom' => (bool)$settings->get('clarkwinkelmann-emojionearea.search-position-bottom', false),
                'emojioneAreaHideFlarumButton' => (bool)$settings->get('clarkwinkelmann-emojionearea.hide-flarum-button', true),
            ];
        }
    }
}
