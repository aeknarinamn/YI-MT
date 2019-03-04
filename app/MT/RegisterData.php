<?php

namespace YellowProject\MT;

use Illuminate\Database\Eloquent\Model;
use YellowProject\LineUserProfile;

class RegisterData extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_mt_register';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    	'line_user_id',
        'shop_product_group',
    ];

    public function lineUserProfile()
    {
        return $this->belongsTo(LineUserProfile::class,'line_user_id','id');
    }
}
