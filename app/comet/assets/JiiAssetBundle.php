<?php
namespace app\comet\assets;

use app\comet\CometModule;
use yii\helpers\Json;
use yii\web\AssetBundle;
use yii\web\View;

class JiiAssetBundle extends AssetBundle
{
    public function registerAssetFiles($view)
    {
        $view->registerJs("JII_CONFIG = " . Json::encode([
                'application' => [
                    'components' => [
                        'comet' => [
                            'serverUrl' => CometModule::getInstance()->client->cometUrl,
                        ],
                        'neat' => [
                            'bindings' => CometModule::getInstance()->neat->server->getClientParams()
                        ],
                    ],
                ],
            ]) . ";", View::POS_HEAD);

        parent::registerAssetFiles($view);
    }
}
