<?php

namespace YellowProject\ProfillingV2;

use Illuminate\Database\Eloquent\Model;
use YellowProject\ProfillingV2\ProfillingItemStyle;

class ProfillingItem extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_v2_profilling_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profilling_id',
		'type',
		'title',
		'flag',
    ];

    public function styles()
    {
        return $this->hasMany(ProfillingItemStyle::class,'profilling_item_id','id');
    }

}
