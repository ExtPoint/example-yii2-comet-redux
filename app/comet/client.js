import jii from 'jii';
import CometClient from 'jii/comet/client/Client';
import Sockjs from 'jii/comet/client/transport/Sockjs';
import NeatClient from 'jii/comet/client/NeatClient';
import NeatComet from 'neatcomet';

// Only for debug
window.jiidebug = jii;

// Init Jii application
const app = jii.createWebApplication(jii.mergeConfigs(
    {
        application: {
            components: {
                comet: {
                    className: CometClient,
                    transport: {
                        className: Sockjs
                    }
                },
                neat: {
                    className: NeatClient,
                    engine: {
                        className: NeatComet.NeatCometClient,
                        createCollection: () => ({
                            items: [],
                            callback: () => {}
                        }),
                        callCollection: (collection, method, param1, param2) => {
                            switch (method) {
                                case 'add':
                                    collection.items.push(param1);
                                    break;

                                case 'reset':
                                    collection.items.splice(0, collection.items.length);
                                    Array.prototype.push.apply(collection.items, param1);
                                    break;

                                case 'update':
                                    const index = collection.items.findIndex(item => item.id === param2);
                                    if (index !== -1) {
                                        collection.items.splice(index, 1, param1);
                                    } else {
                                        collection.items.push(param1);
                                    }
                                    break;

                                case 'remove':
                                    const index2 = collection.items.findIndex(item => item.id === param1);
                                    if (index2 !== -1) {
                                        collection.items.splice(index2, 1);
                                    }
                                    break;

                                default:
                                    throw new Error(`Unknown method ${method} in NeatCometClient.callCollection()`);
                                    break;
                            }

                            collection.callback(collection.items);
                        }
                    }
                }
            }
        }
    },
    window.JII_CONFIG || {}
));

app.promise = app.start();