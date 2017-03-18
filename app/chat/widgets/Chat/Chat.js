import React, {PropTypes} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import ChatForm from './views/ChatForm';
import ChatList from './views/ChatList';

import reducer from './reducers';

export default window.Chat = class Chat extends React.Component {

    static propTypes = {
        userName: PropTypes.string,
        pageSize: PropTypes.number.isRequired,
        preloadState: PropTypes.object.isRequired,
    };

    constructor() {
        super(...arguments);

        this.store = createStore(
            reducer,
            this.props.preloadState,
            applyMiddleware(
                thunk,
                createLogger()
            )
        );
    }

    render() {
        return (
            <Provider store={this.store}>
                <div>
                    <ChatForm userName={this.props.userName}/>
                    <div className='row'>
                        <div className='col-md-6'>
                            <ChatList groupId={1} pageSize={this.props.pageSize}/>
                        </div>
                        <div className='col-md-6'>
                            <ChatList groupId={2} pageSize={this.props.pageSize}/>
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }

};