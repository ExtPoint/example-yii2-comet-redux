<?php

namespace app\chat\controllers;

use Yii;
use app\chat\models\Message;
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

    public function actionLoad() {
        return json_encode(CometModule::getInstance()->neat->server->loadDataLocally(json_decode($_POST['msg'], true)));
    }

}
