<?php

namespace YellowProject\MT\Center;

use Illuminate\Database\Eloquent\Model;

class Center extends Model
{
    public $timestamps = true;
    // protected $table = 'dim_mt_center';
    // protected $fillable = [
    // 	'line_user_id',
    // 	'shop_id',
    // 	'total_stamp',
    // 	'is_active',
    // 	'is_redeem',
    // ];

    const CENTER_NAME = 'isCenter'; 

    const PAGE_TOPS_QUESTION = 'mt.promotions.TOPS.question.';
    const TOPS_QUESTION_CONTROLLER = 'MT\Promotion\TOPS\QuestionController@';


    const PAGE_TOPS_QUESTION_PAGE1 = 'mt.promotions.TOPS.question.page-1';
    const PAGE_TOPS_QUESTION_PAGE2 = 'mt.promotions.TOPS.question.page-2';
}