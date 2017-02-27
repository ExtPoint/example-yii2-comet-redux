import React, {PropTypes} from 'react';
import FileItem from './FileItem';
import fileup from 'fileup-redux';
import FilePropType from 'fileup-redux/lib/types/FilePropType';

class FileInput extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        multiple: PropTypes.bool,
        buttonClass: PropTypes.string,
        buttonLabel: PropTypes.string,
        files: PropTypes.arrayOf(FilePropType),
    };

    static defaultProps = {
        name: 'file',
        buttonClass: 'btn btn-primary',
        buttonLabel: 'Прикрепить файл',
    };

    constructor(props) {
        super(props);
        this._syncValue(props);
    }

    componentWillReceiveProps(nextProps) {
        this._syncValue(nextProps);
    }

    render() {
        return (
            <div>
                {this.props.files.length > 0 && (
                    <div className='list-group'>
                        {this.props.files.map(file => (
                            <FileItem
                                key={file.uid}
                                file={file}
                                onRemove={() => this.props.remove(file.uid)}
                            />
                        ))}
                    </div>
                )}
                <button
                    type='button'
                    className={this.props.buttonClass}
                    onClick={() => this.props.uploader.browse()}
                >
                    {this.props.buttonLabel}
                </button>
            </div>
        );
    }

    _syncValue(props) {
        const prevInputUids = [].concat(this.props.input.value || []);
        const inputUids = [].concat(props.input.value || []);
        const uploaderUids = props.files
            .map(file => file.resultHttpMessage && file.resultHttpMessage.uid || null)
            .filter(v => v);

        // Remove files on value change (by form, for example - reset)
        if (prevInputUids.join() !== inputUids.join()) {
            this.props.remove(prevInputUids.filter(uid => inputUids.indexOf(uid) === -1));
        }

        // Add new uids from files
        if (inputUids.join() !== uploaderUids.join()) {
            this.props.input.onChange(uploaderUids);
        }
    }

}

export default fileup({
    id: 'FileInput',
    backendUrl: '/file/upload/',
})(FileInput);