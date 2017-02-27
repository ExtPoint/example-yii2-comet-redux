import React, {PropTypes} from 'react';
import File from 'fileup-core/lib/models/File';
import FilePropType from 'fileup-redux/lib/types/FilePropType';

export default class FileItem extends React.Component {

    static propTypes = {
        file: FilePropType,
        onRemove: PropTypes.func
    };

    static asHumanFileSize(bytes, showZero) {
        if (!bytes) {
            return showZero ? '0' : '';
        }

        var thresh = 1000;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' ' + 'B';
        }
        var units = [
            'kB',
            'MB',
            'GB',
            'TB',
            'PB',
            'EB',
            'ZB',
            'YB'
        ];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1) + ' ' + units[u];
    }

    render() {
        return (
            <div className='list-group-item'>
                <div className='media'>
                    {this._renderPreview()}
                    <div className='media-body'>
                        {this.props.file.status === File.STATUS_END && (
                            <button
                                type='button'
                                className='btn btn-sm btn-default pull-right'
                                onClick={() => this.props.onRemove()}
                            >
                                <span className='glyphicon glyphicon-remove' />
                            </button>
                        )}
                        <h4 className='media-heading'>
                            {this.props.file.name}
                        </h4>
                        {this.props.file.result === File.RESULT_ERROR && (
                            <p>
                                Ошибка: {this.props.file.resultHttpMessage.error}
                            </p>
                        )}
                        <p>
                            {this.props.file.status === File.STATUS_PROCESS && (
                                <span>
                                    {FileItem.asHumanFileSize(this.props.file.bytesUploaded)}
                                    &nbsp;
                                    из
                                </span>
                            )}
                            {!this.props.file.result === File.RESULT_ERROR && (
                                <span>
                                    &nbsp;
                                    {FileItem.asHumanFileSize(this.props.file.bytesTotal)}
                                </span>
                            )}
                        </p>
                        {this.props.file.status === File.STATUS_PROCESS && (
                            <div className='progress'>
                                <div
                                    className='progress-bar'
                                    style={{
                                        width: this.props.file.progress.percent + '%'
                                    }}
                                >
                                    {this.props.file.progress.percent}
                                    %
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    _renderPreview() {
        if (!this.props.file.status === File.STATUS_END || !this.props.file.result === File.RESULT_SUCCESS) {
            return null;
        }

        var response = this.props.file.resultHttpMessage;
        if (!response || !response.previewImageUrl || !response.downloadUrl) {
            return null;
        }

        return (
            <div className='media-left'>
                <a href={response.downloadUrl}>
                    <img
                        className='media-object panel'
                        src={response.previewImageUrl}
                        alt={this.props.file.name}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    />
                </a>
            </div>
        );
    }
}
