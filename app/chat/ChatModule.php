<?php

namespace app\chat;

use app\core\base\AppModule;

class ChatModule extends AppModule
{
    public function coreMenu()
    {
        return [
            [
                'label' => 'Главная',
                'url' => ["/$this->id/chat/index"],
                'visible' => false,
            ],
            [
                'url' => ["/$this->id/chat/send"],
                'urlRule' => 'send',
                'visible' => false,
            ],
            [
                'url' => ["/$this->id/chat/load"],
                'urlRule' => 'comet/load',
                'visible' => false,
            ],
        ];
    }
}