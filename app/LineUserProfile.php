<?php

namespace YellowProject;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use YellowProject\LineBizConCustomer;
use YellowProject\ChatMain;
use YellowProject\FacebookUserProfile;
use YellowProject\TrackingRecieveBc;
use YellowProject\CouponUser;
use YellowProject\HistoryAddBlock;
use YellowProject\Campaign\CampaignSendMessage;

class LineUserProfile extends Model
{
   	use SoftDeletes;
    protected $guard = "dim_line_user_table";
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_line_user_table';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'mid',
		'avatar',
        'name',
        'user_type',
        'flag_status',
        'flag_comment',
        'is_follow',
        'is_auto_kick',
        'first_follow_date',
        'last_follow_date',
        'first_un_follow_date',
		'last_un_follow_date',
    ];

    public function lineBizConCustomer()
    {
        return $this->belongsTo(LineBizConCustomer::class, 'id', 'line_user_profile_id');
    }

    public function historyAddBlocks()
    {
        return $this->hasMany(HistoryAddBlock::class, 'line_user_id', 'id');
    }

    public function chatMains()
    {
        return $this->hasMany(ChatMain::class, 'line_user_id', 'id');
    }

    public function facebookProfile()
    {
        return $this->belongsTo(FacebookUserProfile::class, 'line_user_id', 'id');
    }

    public function campaignSendMessages()
    {
        return $this->hasMany(CampaignSendMessage::class, 'mid', 'mid');
    }

    public function trackingRecieveBcs()
    {
        return $this->hasMany(TrackingRecieveBc::class, 'line_user_id', 'id');
    }

    public function couponUsers()
    {
        return $this->hasMany(CouponUser::class, 'line_user_id', 'id');
    }
}
