const jii = require('jii');
const workers = require('jii/workers');

// Load other packages
const request = require('request');

module.exports = (config) => {
    workers
        .setEnvironment(config.env || 'development')
        .application('comet', jii.mergeConfigs(
            {
                application: {
                    basePath: __dirname,
                    inlineActions: {
                        // From php to comet
                        'api/index': context => {
                            var channel = context.request.post('channel');
                            var data = context.request.post('data');

                            if (context.request.post('method') !== 'publish' || !channel || !data) {
                                context.response.setStatusCode(400);
                                return 'Wrong api method.';
                            }

                            jii.app.comet.sendToChannel(channel, JSON.parse(data));
                            return 'ok';
                        }
                    },
                    components: {
                        urlManager: {
                            className: require('jii/request/UrlManager')
                        },
                        http: {
                            className: require('jii/request/http/HttpServer'),
                            port: 5500
                        },
                        comet: {
                            className: require('jii/comet/server/Server'),
                            port: 5510,
                            host: '127.0.0.1',
                            transport: {
                                className: require('jii/comet/server/transport/Sockjs'),
                                urlPrefix: '/comet'
                            }
                        },
                        neat: {
                            className: require('jii/comet/server/NeatServer'),
                            configFileName: `${__dirname}/../config/bindings.json`,

                            // From comet to php
                            dataLoadHandler: function(params) {
                                var url = jii.app.params.phpLoadDataUrl;
                                return new Promise((resolve, reject) => {
                                    request.post({url: url, json: params}, (error, response, body) => {
                                        if (error || !response || response.statusCode >= 400) {
                                            jii.error('Request to server `' + url + '` failed: ' + error);
                                            jii.error(body);
                                            return;
                                        }

                                        if (typeof body === 'object') {
                                            resolve(body);
                                        } else {
                                            jii.error('Cannot parse PHP response (url ' + url + '): ' + body);
                                            reject(body);
                                        }
                                    });
                                });
                            }
                        },
                    }
                },
                params: {
                    phpLoadDataUrl: ''
                }
            },
            config
        ));
};


