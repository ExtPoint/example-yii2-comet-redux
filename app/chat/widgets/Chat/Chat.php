<?php

namespace app\chat\widgets\Chat;

use app\comet\CometModule;
use Yii;
use app\core\base\AppWidget;

class Chat extends AppWidget {

    public $groupId = 1;

    public function init() {
        echo $this->renderReact([
            'userName' => Yii::$app->session->get('userName'),
            'groupId' => $this->groupId,
            'preloadState' => [
                'comet' => [
                    'chat' => [
                        'message' => CometModule::getInstance()->neat->server->profileBindings['chat']['message']->loadDataLocally([
                            'groupId' => $this->groupId,
                        ]),
                    ],
                ],
            ],
        ]);
    }

}