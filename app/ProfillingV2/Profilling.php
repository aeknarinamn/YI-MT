<?php

namespace YellowProject\ProfillingV2;

use Illuminate\Database\Eloquent\Model;
use YellowProject\ProfillingV2\ProfillingItem;
use YellowProject\ProfillingV2\ProfillingPage;

class Profilling extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_v2_profilling';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
		'desc',
        'is_active',
        'is_acvhice',
        'start_date',
        'end_date',
		'route_url',
    ];

    public function items()
    {
        return $this->hasMany(ProfillingItem::class,'profilling_id','id');
    }

    public function pages()
    {
        return $this->hasMany(ProfillingPage::class,'profilling_id','id');
    }

}
