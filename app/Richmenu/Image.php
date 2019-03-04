<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_richmenu_img_download';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'img_url',
		'img_size',
    ];

    public static function checkFolderRichmenu()
    {
        if (!\File::isDirectory('file_uploads/richmenu')){
            self::createFolder('file_uploads/richmenu');
        }
    }

    public static function createFolder($path_save_image)
    {
        $result = \File::makeDirectory($path_save_image, 0775, true);
        return $result;
    }
}
