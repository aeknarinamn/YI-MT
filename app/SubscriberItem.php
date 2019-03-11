<?php

namespace YellowProject;

use Illuminate\Database\Eloquent\Model;
use YellowProject\SubscriberLine;
use YellowProject\Field;
use YellowProject\Subscriber\SubscriberCategory;
use YellowProject\Subscriber\SubscriberItemData;

class SubscriberItem extends Model
{
    public $timestamps = true;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected   $table  =  'fact_subscribers';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected   $fillable = [
        'subscriber_line_id',
        'field_id',
        'value',
    ];

    // protected static function boot() {
    //     parent::boot();

    //     static::saved(function($subscriberItem){
    //         $subscriberLine = $subscriberItem->subscriberLineSingle;
    //         $subscriber = $subscriberLine->
    //         $subscriberCategory = SubscriberCategory::where('')
    //         dd($subscriberItem->subscriberLineSingle);
    //     });
    // }

    public function subscriberLineSingle()
    {
        return $this->belongsTo(SubscriberLine::class, 'subscriber_line_id', 'id');
    }

    public function subscriberLine()
    {
        return $this->hasMany(SubscriberLine::class, 'subscriber_line_id', 'id');
    }

    public function field()
    {
        return $this->belongsTo(Field::class, 'field_id', 'id');
    }

    public function subscriberItemDatas()
    {
        return $this->hasMany(SubscriberItemData::class, 'subscriber_id', 'id');
    }
}
