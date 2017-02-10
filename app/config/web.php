<?php

return \yii\helpers\ArrayHelper::merge(
    require 'main.php',
    [
        'defaultRoute' => 'chat/chat/index',
        'components' => [
            'request' => [
                'cookieValidationKey' => '11%s2~6twSe2OkBJ8H2k6wUI@fe~Ah9$',
                'parsers' => [
                    'application/json' => 'yii\web\JsonParser',
                ],
            ],
            'errorHandler' => [
                'errorAction' => 'site/site/error',
            ],
        ],
    ]
);