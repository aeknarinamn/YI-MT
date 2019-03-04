<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;

class EstampImage extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_image_estamp';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'estamp_id',
		'img_url',
		'seq',
    ];
}
