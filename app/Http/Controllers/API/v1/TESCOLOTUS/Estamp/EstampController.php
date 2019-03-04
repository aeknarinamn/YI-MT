<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\Estamp;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Estamp\Estamp;
use YellowProject\Estamp\EstampImage;
use YellowProject\Estamp\EstampReward;

class EstampController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datas = [];
        $estamps = Estamp::all();
        foreach ($estamps as $key => $estamp) {
            $datas[$key]['id'] = $estamp->id;
            $datas[$key]['name'] = $estamp->name;
            $datas[$key]['start_date'] = $estamp->start_date;
            $datas[$key]['end_date'] = $estamp->end_date;
            $datas[$key]['is_active'] = $estamp->is_active;
        }

        return response()->json([
            'datas' => $datas,
        ]);
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
        $estamp = Estamp::create($request->all());
        if(isset($request->images_stamp)){
            foreach ($request->images_stamp as $key => $imageStamp) {
                $imageStamp['estamp_id'] = $estamp->id;
                EstampImage::create($imageStamp);
            }
        }
        if(isset($request->reward_items)){
            foreach ($request->reward_items as $key => $rewardItem) {
                $rewardItem['estamp_id'] = $estamp->id;
                EstampReward::create($rewardItem);
            }
        }

        return response()->json([
            'msg_return' => 'บันทึกสำเร็จ',
            'code_return' => 1,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datas = [];
        $estamp = Estamp::find($id);
        $datas = $estamp->toArray();
        $estampImages = $estamp->estampImages;
        $estampRewardItems = $estamp->estampRewards;
        foreach ($estampImages as $key => $estampImage) {
            $datas['images_stamp'][$key]['id'] = $estampImage->id;
            $datas['images_stamp'][$key]['img_url'] = $estampImage->img_url;
            $datas['images_stamp'][$key]['seq'] = $estampImage->seq;
        }
        foreach ($estampRewardItems as $key => $estampRewardItem) {
            $datas['reward_items'][$key]['id'] = $estampRewardItem->id;
            $datas['reward_items'][$key]['img_url'] = $estampRewardItem->img_url;
            $datas['reward_items'][$key]['reward_name'] = $estampRewardItem->reward_name;
            $datas['reward_items'][$key]['total_use_stamp'] = $estampRewardItem->total_use_stamp;
        }

        return response()->json([
            'datas' => $datas,
        ]);
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
        $estamp = Estamp::find($id);
        $estamp->update($request->all());
        EstampImage::where('estamp_id',$id)->delete();
        EstampReward::where('estamp_id',$id)->delete();
        if(isset($request->images_stamp)){
            foreach ($request->images_stamp as $key => $imageStamp) {
                $imageStamp['estamp_id'] = $estamp->id;
                EstampImage::create($imageStamp);
            }
        }
        if(isset($request->reward_items)){
            foreach ($request->reward_items as $key => $rewardItem) {
                $rewardItem['estamp_id'] = $estamp->id;
                EstampReward::create($rewardItem);
            }
        }

        return response()->json([
            'msg_return' => 'บันทึกสำเร็จ',
            'code_return' => 1,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $estamp = Estamp::find($id);
        EstampImage::where('estamp_id',$id)->delete();
        EstampReward::where('estamp_id',$id)->delete();
        $estamp->delete();

        return response()->json([
            'msg_return' => 'ลบข้อมูลสำเร็จ',
            'code_return' => 1,
        ]);
    }

    public function destroyImageEstamp($id)
    {
        $estampImage = EstampImage::find($id);
        $estampImage->delete();

        return response()->json([
            'msg_return' => 'ลบข้อมูลสำเร็จ',
            'code_return' => 1,
        ]);
    }

    public function destroyRewardEstamp($id)
    {
        $estampReward = EstampReward::find($id);
        $estampReward->delete();

        return response()->json([
            'msg_return' => 'ลบข้อมูลสำเร็จ',
            'code_return' => 1,
        ]);
    }
}
