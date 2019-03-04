<?php

namespace YellowProject\Estamp;

use Illuminate\Database\Eloquent\Model;
use YellowProject\Estamp\EstampCustomerItem;

class EstampCustomer extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_estamp_customer';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'estamp_id',
		'line_user_id',
		'status',
    ];

    public function estampCustomerItems()
    {
        return $this->hasMany(EstampCustomerItem::class,'estamp_customer_id','id');
    }
}
