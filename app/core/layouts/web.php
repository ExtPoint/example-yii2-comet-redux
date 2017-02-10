<?php

namespace app\views;

use app\comet\assets\JiiAssetBundle;
use yii\helpers\Html;
use yii\bootstrap\NavBar;
use yii\web\View;

/* @var $this \yii\web\View */
/* @var $content string */

JiiAssetBundle::register($this);
$this->registerJsFile('@web/assets/bundle-index.js', ['position' => View::POS_BEGIN]);
$this->registerJsFile('@web/assets/bundle-style.js', ['position' => View::POS_BEGIN]);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= \Yii::$app->language ?>">
<head>
    <meta charset="<?= \Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= \Yii::$app->megaMenu->getFullTitle() ?></title>
    <?php $this->head() ?>
</head>
<body>

<?php $this->beginBody() ?>
    <div class="wrap">
        <?php
            NavBar::begin([
                'brandLabel' => 'Example Yii2 + Comet + Redux',
                'brandUrl' => \Yii::$app->homeUrl,
                'options' => [
                    'class' => 'navbar-inverse navbar-static-top',
                ],
            ]);
            NavBar::end();
        ?>

        <div class="container">
            <?= $content ?>
        </div>
    </div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
