<?php

namespace app\comet\controllers;

use app\comet\CometModule;
use yii\web\Controller;
use yii\web\Response;

class CometController extends Controller
{
    public $enableCsrfValidation = false;

    public function actionLoad() {
        \Yii::$app->response->format = Response::FORMAT_JSON;
        return CometModule::getInstance()->neat->server->loadDataLocally(\Yii::$app->request->post());
    }
}
