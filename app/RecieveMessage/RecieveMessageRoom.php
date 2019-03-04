<?php

namespace YellowProject\RecieveMessage;

use Illuminate\Database\Eloquent\Model;

class RecieveMessageRoom extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_recieve_message_room';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'line_user_id',
		'room_id',
		'keyword',
		'bot_conf',
		'bot_reply',
    ];
}
