<?php

namespace YellowProject\ProfillingV2;

use Illuminate\Database\Eloquent\Model;
use YellowProject\ProfillingV2\ProfillingPageItem;

class ProfillingPage extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_v2_profilling_page';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profilling_id',
		'type',
    ];

    public function pageItems()
    {
        return $this->hasMany(ProfillingPageItem::class,'profilling_page_id','id');
    }
}
