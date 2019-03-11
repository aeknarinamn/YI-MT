<?php

namespace YellowProject\MT\Center;

use Illuminate\Database\Eloquent\Model;

class Center extends Model
{
    public $timestamps = true;
    protected $table = 'dim_mt_center';
    // protected $fillable = [
    // 	'line_user_id',
    // 	'shop_id',
    // 	'total_stamp',
    // 	'is_active',
    // 	'is_redeem',
    // ];

    const CENTER_NAME = 'isCenter';

    
}