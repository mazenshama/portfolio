const path = require('path');

module.exports = {
    entry: {
        app: './js/portfolio.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: './js/portfolio.js',
    },
};
