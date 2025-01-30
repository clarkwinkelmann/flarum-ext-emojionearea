<?php

namespace ClarkWinkelmann\EmojioneArea;

use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->js(__DIR__ . '/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\Settings())
        ->default('clarkwinkelmann-emojionearea.enable-search', '1')
        ->default('clarkwinkelmann-emojionearea.enable-recent', '1')
        ->default('clarkwinkelmann-emojionearea.enable-tones', '1')
        ->default('clarkwinkelmann-emojionearea.hide-flarum-button', '1'),
];
