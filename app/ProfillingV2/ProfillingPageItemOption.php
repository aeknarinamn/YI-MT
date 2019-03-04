<?php

namespace YellowProject\ProfillingV2;

use Illuminate\Database\Eloquent\Model;

class ProfillingPageItemOption extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_v2_profilling_page_item_options';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profilling_page_item_id',
		'title',
		'key',
		'value',
    ];
}
