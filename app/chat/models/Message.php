<?php

namespace app\chat\models;

use app\core\base\AppModel;
use app\file\FileModule;
use app\file\models\File;
use app\file\models\ImageMeta;
use extpoint\yii2\behaviors\TimestampBehavior;
use yii\base\Exception;
use yii\db\Query;

/**
 * @property string $id
 * @property string $userName
 * @property string $groupId
 * @property string $text
 * @property string $createTime
 * @property string $updateTime
 * @property-read File[] $photoFiles
 */
class Message extends AppModel
{
    public $photoUids = [];

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'chat_messages';
    }

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::className(),
        ];
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['groupId', 'required'],
            [['userName', 'text'], 'string', 'max' => 255],
            ['groupId', 'integer'],
        ];
    }

    public function getAttributes($names = null, $except = [])
    {
        $values = parent::getAttributes($names, $except);
        $values['photos'] = $this->getPhotos();
        return $values;
    }

    public function afterSave($insert, $changedAttributes)
    {
        // Add photos
        foreach ($this->photoUids as $photoUid) {
            $command = \Yii::$app->db->createCommand()->insert('chat_messages_photos', [
                'messageId' => $this->primaryKey,
                'fileUid' => $photoUid,
            ]);
            if ($command->execute() !== 1) {
                throw new Exception('Cannot add photo.');
            }
        }

        parent::afterSave($insert, $changedAttributes);
    }

    public function getPhotos() {
        $fileUids = (new Query())
            ->select('fileUid')
            ->from('chat_messages_photos')
            ->where(['messageId' => $this->id])
            ->column();

        return array_map(function($fileUid) {
            /** @type File $file */
            $full = ImageMeta::findByProcessor($fileUid, 'chat_full');
            $thumbnail = ImageMeta::findByProcessor($fileUid, 'chat_thumbnail');

            return [
                'uid' => $fileUid,
                'src' => $full->url,
                'thumbnail' => $thumbnail->url,
                'thumbnailWidth' => $thumbnail->width,
                'thumbnailHeight' => $thumbnail->height,
            ];
        }, $fileUids);
    }

    public function getPhotoFiles() {
        return $this->hasMany(File::className(), ['uid' => 'fileUid'])
            ->viaTable('chat_messages_photos', ['messageId' => 'id']);
    }

}
