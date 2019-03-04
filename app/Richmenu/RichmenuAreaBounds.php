<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;

class RichmenuAreaBounds extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_richmenu_areas_bounds';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'richmenu_area_id',
        'x',
		'y',
		'width',
		'height',
    ];
}
