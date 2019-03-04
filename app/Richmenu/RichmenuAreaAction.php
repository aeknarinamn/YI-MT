<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;

class RichmenuAreaAction extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_richmenu_areas_actions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'richmenu_area_id',
		'type',
		'data',
    ];
}
