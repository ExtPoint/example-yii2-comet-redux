<?php

namespace app\site;

use app\core\base\AppModule;

class SiteModule extends AppModule
{

    public function coreMenu()
    {
        return [
            [
                'label' => 'Ошибка',
                'url' => ["/$this->id/site/error"],
                'visible' => false,
            ],
        ];
    }

}