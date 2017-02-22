import React, {PropTypes} from 'react';

export default class FileItem extends React.Component {

    static propTypes = {
        file: PropTypes.object,
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
                        {this.props.file.isStatusEnd() && (
                            <button
                                type='button'
                                className='btn btn-sm btn-default pull-right'
                                onClick={() => this.props.onRemove()}
                            >
                                <span className='glyphicon glyphicon-remove' z/>
                            </button>
                        )}
                        <h4 className='media-heading'>
                            {this.props.file.getName()}
                        </h4>
                        {this.props.file.isResultError() && (
                            <p>
                                Ошибка: {this.props.file.getResultHttpMessage()['error']}
                            </p>
                        )}
                        <p>
                            {this.props.file.isStatusProcess() && (
                                <span>
                                    {FileItem.asHumanFileSize(this.props.file.getBytesUploaded())}
                                    &nbsp;
                                    из
                                </span>
                            )}
                            {!this.props.file.isResultError() && (
                                <span>
                                    {FileItem.asHumanFileSize(this.props.file.getBytesTotal())}
                                </span>
                            )}
                        </p>
                        {this.props.file.isStatusProcess() && (
                            <div className='progress'>
                                <div
                                    className='progress-bar'
                                    style={{
                                        width: this.props.file.progress.getPercent() + '%'
                                    }}
                                >
                                    {this.props.file.progress.getPercent()}
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
        if (!this.props.file.isStatusEnd() || !this.props.file.isResultSuccess()) {
            return null;
        }

        var response = this.props.file.getResultHttpMessage();
        if (!response || !response.previewImageUrl || !response.downloadUrl) {
            return null;
        }

        return (
            <div className='media-left'>
                <a href={response.downloadUrl}>
                    <img
                        className='media-object panel'
                        src={response.previewImageUrl}
                        alt={this.props.file.getName()}
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
