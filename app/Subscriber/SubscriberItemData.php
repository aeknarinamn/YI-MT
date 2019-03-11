<?php

namespace YellowProject\Subscriber;

use Illuminate\Database\Eloquent\Model;

class SubscriberItemData extends Model
{
    public $timestamps = true;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected   $table  =  'fact_subscriber_items';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected   $fillable = [
        'subscriber_id',
        'value',
    ];
}
