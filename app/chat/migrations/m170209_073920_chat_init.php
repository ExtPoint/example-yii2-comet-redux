<?php

use yii\db\Migration;

class m170209_073920_chat_init extends Migration
{
    public function up()
    {
        $this->createTable('chat_messages', [
            'id' => $this->primaryKey(),
            'userName' => $this->string(),
            'groupId' => $this->integer(),
            'text' => $this->string(),
            'createTime' => $this->dateTime(),
            'updateTime' => $this->dateTime(),
        ], 'CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE=InnoDB');

        $this->createTable('chat_messages_photos', [
            'messageId' => $this->string(),
            'fileUid' => $this->string(),
        ], 'CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE=InnoDB');
        $this->addPrimaryKey('chat_messages_photos_pk', 'chat_messages_photos', [
            'messageId',
            'fileUid',
        ]);
    }

    public function down()
    {
        $this->dropTable('chat_messages');
        $this->dropTable('chat_messages_photos');
    }
}
