<?php

namespace YellowProject\Http\Controllers;

use Illuminate\Http\Request;
use YellowProject\TrackingBc;
use YellowProject\TrackingRecieveBc;
use Jenssegers\Agent\Agent;

class RecieveTrackingBCController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function recieveCode($code)
    {
        $authUser = \Session::get('line-login', '');
        $trackingBc = TrackingBc::where('code',$code)->first();
        if(!$trackingBc){
            return view('errors.404');
        }
        $agent = new Agent();
        $device = $agent->device();
        $platform = $agent->platform();
        $ip = TrackingBc::getClientIps();
        // $geoLocation = TrackingBc::getGeoLocation($ip);
        // if($geoLocation != ""){
        //     $city = $geoLocation->city;
        //     $lat = $geoLocation->latitude;
        //     $long = $geoLocation->longitude;
        // }else{
            $city = 'Bangkok';
            $lat = null;
            $long = null;
        // }
        TrackingRecieveBc::create([
            'tracking_bc_id'    => $trackingBc->id,
            'line_user_id'      => $authUser->id,
            'ip'                => $ip,
            'device'            => $device,
            'platform'          => $platform,
            'lat'               => $lat,
            'long'              => $long,
            'city'              => $city,
            'tracking_source'   => $trackingBc->tracking_source,
            'tracking_campaign' => $trackingBc->tracking_campaign,
            'tracking_ref'      => $trackingBc->tracking_ref,
            'campaign_id'       => $trackingBc->campaign_id,
        ]);
        // return redirect()->away($trackingBc->original_url);
        return redirect($trackingBc->original_url);
    }

    public function bcCenter($code)
    {
        $trackingBc = TrackingBc::where('code',$code)->first();
        if(!$trackingBc){
            abort(404);
        }
        if($trackingBc->is_line_liff == 1){
            $url = "line://app/1556652597-VX0Zzkgw?code=".$code; //PROD
            return redirect()->away($url);
        }else{
            \Session::put('tracking_bc_code', $code);
            return redirect()->action('Auth\AuthController@redirectToProvider',['type' => 'bc_tracking']);
        }
    }

    public function recieveLiff(Request $request)
    {
        \Session::put('tracking_bc_code', $request->code);
        return redirect()->action('Auth\AuthController@redirectToProvider',['type' => 'bc_tracking']);
    }
}
