<?php

namespace app\chat\controllers;

use app\comet\CometModule;
use Yii;
use app\chat\models\Message;
use yii\helpers\ArrayHelper;
use yii\web\Controller;

class ChatController extends Controller
{

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionSend()
    {
        $message = new Message(Yii::$app->request->post());
        $message->saveOrPanic();

        Yii::$app->session->set('userName', $message->userName);
    }

}
