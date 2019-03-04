<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;

class RichmenuMappingLinkData extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_richmenu_mapping_link_data';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rich_menu_id',
        'mid',
    ];
}
