<?php

namespace YellowProject;

use Illuminate\Database\Eloquent\Model;
use YellowProject\TrackingBc;

class TrackingRecieveBc extends Model
{
    public $timestamps = true;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'fact_recieve_tracking_bc';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tracking_bc_id',
		'line_user_id',
		'ip',
		'device',
        'lat',
        'long',
        'city',
        'platform',
        'tracking_source',
        'tracking_campaign',
        'tracking_ref',
        'created_at',
        'updated_at',
        'campaign_id',
    ];

    public function trackingBc()
    {
        return $this->belongsTo(TrackingBc::class, 'tracking_bc_id', 'id');
    }
}
