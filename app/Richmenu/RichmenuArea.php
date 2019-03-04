<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;
use YellowProject\Richmenu\RichmenuAreaAction;
use YellowProject\Richmenu\RichmenuAreaBounds;

class RichmenuArea extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_richmenu_areas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'richmenu_id',
    ];

    public function action()
    {
        return $this->hasOne(RichmenuAreaAction::class,'richmenu_area_id','id');
    }

    public function bound()
    {
        return $this->hasOne(RichmenuAreaBounds::class,'richmenu_area_id','id');
    }
}
