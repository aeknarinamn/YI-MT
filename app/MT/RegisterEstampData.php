<?php

namespace YellowProject\MT;

use Illuminate\Database\Eloquent\Model;
use YellowProject\LineUserProfile;

class RegisterEstampData extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_mt_register_estamp';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'line_user_id',
        'first_name',
        'last_name',
        'gender',
        'product',
        'stamp_collect',
        'total_stamp_collect',
        'total_stamp_active',
    ];

    public function lineUserProfile()
    {
        return $this->belongsTo(LineUserProfile::class,'line_user_id','id');
    }
}
