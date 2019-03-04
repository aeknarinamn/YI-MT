<?php

namespace YellowProject\ProfillingV2;

use Illuminate\Database\Eloquent\Model;

class ProfillingItemStyle extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_v2_profilling_item_styles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profilling_item_id',
		'ref',
		'title',
		'key',
		'value',
		'output',
    ];
}
