module.exports = {
    env: 'development', // or production
    application: {
        components: {
            http: {
                port: 5500
            },
            comet: {
                port: 5510
            },
        },
        params: {
            phpLoadDataUrl: 'http://example-yii2-comet-redux.local/comet/load/'
        }
    }
};