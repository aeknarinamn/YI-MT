<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;

class EstampImageUpload extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_estamp_img_upload';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'img_url',
		'img_size',
		'type',
    ];

    public static function checkFolderStamp()
    {
        if (!\File::isDirectory('file_uploads/estamp/stamp')){
            self::createFolder('file_uploads/estamp/stamp');
        }
    }

    public static function checkFolderBanner()
    {
        if (!\File::isDirectory('file_uploads/estamp/banner')){
            self::createFolder('file_uploads/estamp/banner');
        }
    }

    public static function checkFolderBoard()
    {
        if (!\File::isDirectory('file_uploads/estamp/board')){
            self::createFolder('file_uploads/estamp/board');
        }
    }

    public static function checkFolderReward()
    {
        if (!\File::isDirectory('file_uploads/estamp/reward')){
            self::createFolder('file_uploads/estamp/reward');
        }
    }

    public static function createFolder($path_save_image)
    {
        $result = \File::makeDirectory($path_save_image, 0775, true);
        return $result;
    }
}
