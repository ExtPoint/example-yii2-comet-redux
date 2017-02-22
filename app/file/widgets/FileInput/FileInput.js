import React, {PropTypes} from 'react';
import FileUp from 'fileup-core';
import File from 'fileup-core/lib/models/File';
import QueueCollection from 'fileup-core/lib/models/QueueCollection';
import FileItem from './FileItem';

export default class FileInput extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        backendUrl: PropTypes.string,
        multiple: PropTypes.bool,
        buttonClass: PropTypes.string,
        buttonLabel: PropTypes.string,
        files: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            fileMimeType: PropTypes.string,
            fileSize: PropTypes.string,
        })),
        options: PropTypes.object,
    };

    static defaultProps = {
        name: 'file',
        backendUrl: '/file/upload/',
        files: [],
        options: {},
        multiple: false,
        buttonClass: 'btn btn-primary',
        buttonLabel: 'Прикрепить файл',
    };

    constructor(props) {
        super(props);

        // Create uploader instance
        this._uploader = new FileUp({
            dropArea: {},
            backendUrl: this.props.backendUrl,
            form: {
                multiple: !!this.props.multiple,
            },
            ...this.props.options,
        });
        this._uploader.queue.add(props.files.map(item => this._createFileModel(item)));

        // Sync value and files
        if (this.props.input) {
            this._syncValueToFiles(this.getValue());
        }

        // Subscribe on queue changes
        this._uploader.queue.on([
            QueueCollection.EVENT_ADD,
            QueueCollection.EVENT_REMOVE,
            QueueCollection.EVENT_ITEM_STATUS,
            QueueCollection.EVENT_ITEM_PROGRESS,
        ], this._onQueueChange.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.input) {
            const nextValue = [].concat(nextProps.input.value || []);
            if (this.getValue().join() !== nextValue.join()) {
                this._syncValueToFiles(nextValue);
            }
        }
    }

    render() {
        const files = this._uploader.queue.getFiles()
            .filter(file => file && file.getPath());

        return (
            <div>
                {files.length > 0 && (
                    <div className='list-group'>
                        {files.map(file => (
                            <FileItem
                                key={file.getUid()}
                                file={file}
                                onRemove={() => this._uploader.queue.remove([file])}
                            />
                        ))}
                    </div>
                )}
                <button
                    type='button'
                    className={this.props.buttonClass}
                    onClick={() => this._uploader.browse()}
                >
                    {this.props.buttonLabel}
                </button>
            </div>
        );
    }

    getValue() {
        if (this.props.input) {
            return [].concat(this.props.input.value || []);
        }
        return [];
    }

    _createFileModel(item) {
        return new File({
            uid: item.uid,
            path: item.title,
            type: item.fileMimeType,
            bytesUploaded: item.fileSize,
            bytesUploadEnd: item.fileSize,
            bytesTotal: item.fileSize,
            status: File.STATUS_END,
            result: File.RESULT_SUCCESS,
            resultHttpStatus: 200,
            resultHttpMessage: item,
        });
    }

    _syncValueToFiles(uids) {
        // Remove files not in value
        const toRemove = this._uploader.queue.getFiles().filter(file => {
            const data = file.getResultHttpMessage();
            return data && uids.indexOf(data.uid) === -1;
        });
        if (toRemove.length > 0) {
            this._uploader.queue.remove(toRemove);
        }

        // Add uid without file object
        // TODO
    }

    _onQueueChange() {
        let files = this._uploader.queue.getFiles();

        // Only last file on not multiple
        if (!this.props.multiple) {
            files = files.slice(-1);
        }

        // Set uploaded file uids to value
        const value = files
            .map(file => {
                const data = file.getResultHttpMessage();
                return data && data.uid;
            })
            .filter(v => v);
        if (this.getValue().join() !== value.join() && this.props.input) {
            this.props.input.onChange(value);
        }

        // TODO
        this.setState({
            files
        });
    }

}
