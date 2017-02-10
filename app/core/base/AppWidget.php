<?php
namespace app\core\base;

use extpoint\yii2\base\Widget;
use yii\base\InvalidCallException;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\web\View;

class AppWidget extends Widget
{
    public function renderReact($config)
    {
        if (!preg_match('/^app\\\\(\\w+)\\\\widgets\\\\(\\w+)\\\\(\\w+)$/', get_class($this), $regs)) {
            throw new InvalidCallException('Widget class name is wrong for ' . get_class($this));
        }

        list(, $moduleName, $widgetName, $shortClassName) = $regs;

        $jsonId = Json::encode($this->id);
        $jsonConfig = !empty($config) ? Json::encode($config) : '{}';

        $code = "ReactDOM.render(React.createElement($widgetName, $jsonConfig), document.getElementById($jsonId))";
        $this->view->registerJs($code, View::POS_END, $this->id);
        $this->view->registerJsFile("@web/assets/bundle-$widgetName.js", ['position' => View::POS_END]);

        return Html::tag('span', '', ['id' => $this->id]);
    }
}
