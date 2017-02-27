<?php

namespace app\file\widgets\FileInputView;

use yii\helpers\ArrayHelper;
use app\core\base\AppWidget;
use yii\helpers\Url;

class FileInputView extends AppWidget {

    public $url = ['/file/upload/index'];
    public $multiple = false;
    public $options = [];
    public $name = '';
    public $files = [];


    /**
     * Renders the widget.
     */
    public function run() {
        // TODO Convert data to fileup format
        /*uid: data.uid,
         path: data.title,
         type: data.fileMimeType,
         bytesUploaded: data.fileSize,
         bytesUploadEnd: data.fileSize,
         bytesTotal: data.fileSize,
         resultHttpMessage: data,*/

        $options = ArrayHelper::merge($this->options, [
            'uploader' => [
                'backendUrl' => Url::to($this->url)
            ],
            'files' =>  $this->files,
            'name' =>  $this->name,
        ]);

        return $this->renderReact([
            'options' =>  $options,
            'multiple' => $this->multiple,
        ]);
    }
}