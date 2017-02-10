<?php

return [
    'id' => 'example-yii2-comet-redux',
    'name' => 'Example Yii2 + Comet + Redux',
    'basePath' => dirname(__DIR__),
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'runtimePath' => dirname(dirname(__DIR__)) . '/files/log/runtime',
    'bootstrap' => \extpoint\yii2\components\ModuleLoader::getBootstrap(dirname(__DIR__)) + ['log'],
    'language' => 'ru',
    'components' => [
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=example-yii2-comet-redux',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
        ],
        'assetManager' => [
            'forceCopy' => true,
            'bundles' => [
                // Disables Yii jQuery
                'yii\web\JqueryAsset' => [
                    'sourcePath' => null,
                    'js' => [],
                ],
                'yii\bootstrap\BootstrapAsset' => [
                    'sourcePath' => null,
                    'css' => [],
                ],
                'yii\bootstrap\BootstrapPluginAsset' => [
                    'sourcePath' => null,
                    'js' => [],
                    'css' => [],
                ],
            ],
        ],
        'urlManager'=> [
            'showScriptName' => false,
            'enablePrettyUrl' => true,
            //'enableStrictParsing' => true,
            'suffix' => '/',
        ],
        'megaMenu'=> [
            'class' => '\extpoint\megamenu\MegaMenu',
        ],
    ],
    'modules' => \extpoint\yii2\components\ModuleLoader::getConfig(dirname(__DIR__)),
];
