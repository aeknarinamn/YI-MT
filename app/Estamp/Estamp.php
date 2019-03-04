<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;
use YellowProject\Estamp\EstampImage;
use YellowProject\Estamp\EstampReward;

class Estamp extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_estamp';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'is_active',
        'is_auto_renew',
		'name',
		'image_banner',
		'image_board_stamp_on_finsh',
		'start_date',
		'end_date',
		'text_in_popup',
		'action_for_new_collect',
		'action_for_recive_stamp',
        'action_for_redeem',
        'total_stamp',
        'total_row',
		'total_column',
    ];

    public function estampImages()
    {
        return $this->hasMany(EstampImage::class,'estamp_id','id');
    }

    public function estampRewards()
    {
        return $this->hasMany(EstampReward::class,'estamp_id','id');
    }
}
