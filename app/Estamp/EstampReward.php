<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;

class EstampReward extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_estamp_reward';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'estamp_id',
		'img_url',
		'reward_name',
		'total_use_stamp',
    ];
}
