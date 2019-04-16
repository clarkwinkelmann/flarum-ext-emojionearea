const flarumConfig = require('flarum-webpack-config');
const CopyPlugin = require('copy-webpack-plugin');

let config = flarumConfig();

config.plugins = config.plugins || [];
config.plugins.push(new CopyPlugin([
    // We need to copy the CSS file so it can be bundled with our extension
    // It seems we can't copy outside of the current folder so we put it in dist with the javascript
    {
        from: 'node_modules/emojionearea/dist/emojionearea.min.css',
        to: 'emojionearea.min.css',
        transform(content) {
            // Remove these alpha rules as they can't be understood by the less parser
            return content.toString().replace(/filter:alpha\([A-Za-z0-9=]+\);/g, '');
        },
    },
]));

module.exports = config;
