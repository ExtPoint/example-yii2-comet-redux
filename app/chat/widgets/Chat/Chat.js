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
        groupId: PropTypes.number.isRequired,
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
                    <ChatForm userName={this.props.userName} groupId={this.props.groupId}/>
                    <ChatList groupId={this.props.groupId} pageSize={this.props.pageSize} />
                </div>
            </Provider>
        );
    }

};