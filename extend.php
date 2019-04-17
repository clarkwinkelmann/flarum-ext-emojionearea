<?php

namespace ClarkWinkelmann\EmojioneArea;

use Flarum\Extend;
use ClarkWinkelmann\EmojioneArea;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->css(__DIR__ . '/js/dist/emojionearea.min.css')
        ->js(__DIR__ . '/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Locales(__DIR__ . '/locale')),
    (new EmojioneArea\Extend\Settings())
];
