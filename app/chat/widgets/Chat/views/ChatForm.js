import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import {send} from '../actions/chat';

class ChatForm extends React.Component {

    static formId = 'ChatForm';

    static propTypes = {
        userName: PropTypes.string,
        groupId: PropTypes.number.isRequired,
    };

    constructor() {
        super(...arguments);

        this._onSubmit = this._onSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this._onSubmit)}>
                <div className='form-group'>
                    <label htmlFor={`${ChatForm.formId}_userName`}>
                        Имя
                    </label>
                    <Field
                        id={`${ChatForm.formId}_userName`}
                        name='userName'
                        component='input'
                        className='form-control'
                        placeholder='Дарт Вейдер'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor={`${ChatForm.formId}_text`}>
                        Сообщение
                    </label>
                    <Field
                        id={`${ChatForm.formId}_text`}
                        name='text'
                        component='input'
                        className='form-control'
                        placeholder=''
                    />
                </div>
                <Field
                    name='groupId'
                    component='input'
                    type='hidden'
                />
                <button
                    type='submit'
                    className='btn btn-default'
                >
                    Отправить
                </button>
            </form>
        );
    }

    _onSubmit(values) {
        if (values.text) {
            this.props.change('text', '');
            return send(values);
        }
    }

}


export default connect(
    (state, props) => ({
        initialValues: {
            groupId: props.groupId,
            userName: props.userName || '',
        },
    })
)(reduxForm({
    form: ChatForm.formId,
})(ChatForm));