import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import jii from 'jii';
import moment from 'moment';
import Gallery from 'react-grid-gallery';

import {update} from '../actions/comet';
import {getCollection} from '../reducers/comet';

class ChatList extends React.Component {

    static profileId = 'chat';
    static bindingId = 'message';

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            userName: PropTypes.string,
            text: PropTypes.string,
            createTime: PropTypes.string,
        })),
    };

    constructor() {
        super(...arguments);

        jii.app.promise.then(() => {
            const profile = jii.app.neat.openProfile(ChatList.profileId, {
                groupId: this.props.groupId,
                limit: this.props.pageSize,
            });
            const collection = profile.getCollection(ChatList.bindingId);
            collection.desc = true;
            collection.callback = items => {
                this.props.dispatch(update(ChatList.profileId, ChatList.bindingId, items));
            };

            this.profile = profile;
        });
    }

    render() {
        return (
            <div>
                <br />
                {[].concat(this.props.messages).map(message => this.renderItem(message))}
                <span className='btn btn-success' onClick={() => this.profile.updateParams({
                    groupId: this.props.groupId,
                    limit: [this.limit = ((this.limit || 0) + this.props.pageSize), this.props.pageSize],
                })}>next</span>
            </div>
        );
    }
    
    renderItem(message) {
        return (
            <div
                key={message.id}
                className='media'
            >
                <div className='media-body'>
                    <h4 className='media-heading'>
                        {message.userName}
                        &nbsp;
                        <small>
                            {moment(message.createTime).format('HH:mm, DD MMM')}
                        </small>
                    </h4>
                    <p>
                        {message.text}
                    </p>
                    <Gallery
                        images={message.photos}
                        rowHeight={100}
                        enableImageSelection={false}
                    />
                </div>
            </div>
        );
    }

}

export default connect(
    (state, props) => ({
        groupId: props.groupId,
        messages: getCollection(state, ChatList.profileId, ChatList.bindingId),
    })
)(ChatList);