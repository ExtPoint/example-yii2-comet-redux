<?php

namespace app\chat\models;

use app\core\base\AppModel;
use extpoint\yii2\behaviors\TimestampBehavior;

/**
 * @property string $id
 * @property string $userName
 * @property string $groupId
 * @property string $text
 * @property string $createTime
 * @property string $updateTime
 */
class Message extends AppModel {

    /**
     * @inheritdoc
     */
    public static function tableName() {
        return 'chat_messages';
    }

    /**
     * @inheritdoc
     */
    public function behaviors() {
        return [
            TimestampBehavior::className(),
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules() {
        return [
            [['groupId', 'text'], 'required'],
            [['userName', 'text'], 'string', 'max' => 255],
            ['groupId', 'integer'],
        ];
    }

}
