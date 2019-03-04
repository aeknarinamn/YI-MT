<?php

namespace YellowProject\Richmenu;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use YellowProject\Richmenu\RichmenuArea;
use YellowProject\Segment\Segment;
use YellowProject\Segment\QuickSegment;

class Richmenu extends Model
{
	use SoftDeletes;
	
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'dim_richmenu';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'width',
		'height',
		'selected',
		'img_url',
		'segment_id',
		'segment_type',
		'start_date',
		'end_date',
		'name',
		'chatBarText',
		'line_richmenu_id',
    ];

    public function areas()
    {
        return $this->hasMany(RichmenuArea::class,'richmenu_id','id');
    }

    public function segment()
    {
        return $this->belongsTo(Segment::class, 'segment_id', 'id');
    }

    public function quickSegment()
    {
        return $this->belongsTo(QuickSegment::class, 'segment_id', 'id');
    }
}
