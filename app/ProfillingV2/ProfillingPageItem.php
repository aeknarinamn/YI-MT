<?php

namespace YellowProject\ProfillingV2;

use Illuminate\Database\Eloquent\Model;
use YellowProject\ProfillingV2\ProfillingPageItemAnswer;
use YellowProject\ProfillingV2\ProfillingPageItemChoiceList;
use YellowProject\ProfillingV2\ProfillingPageItemOption;

class ProfillingPageItem extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_v2_profilling_page_item';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'profilling_page_id',
		'title',
		'type',
		'question',
		'subscribe_id',
		'field_id',
    ];

    public function pageItemAnswers()
    {
        return $this->hasMany(ProfillingPageItemAnswer::class,'profilling_page_item_id','id');
    }

    public function pageItemChoiceLists()
    {
        return $this->hasMany(ProfillingPageItemChoiceList::class,'profilling_page_item_id','id');
    }

    public function pageItemOptions()
    {
        return $this->hasMany(ProfillingPageItemOption::class,'profilling_page_item_id','id');
    }
}
