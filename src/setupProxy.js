const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/opendata/', { target: 'https://data.gov.ru/sites/default/files', changeOrigin: true, secure: false }));
};
