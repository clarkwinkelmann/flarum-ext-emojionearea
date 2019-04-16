<?php

namespace ClarkWinkelmann\EmojiOneArea;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__ . '/less/forum.less')
        ->css(__DIR__ . '/js/dist/emojionearea.min.css')
        ->js(__DIR__ . '/js/dist/forum.js'),
    (new Extend\Locales(__DIR__ . '/locale')),
];
