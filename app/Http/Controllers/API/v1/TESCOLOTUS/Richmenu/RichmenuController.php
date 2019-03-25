<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\Richmenu;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Richmenu\Richmenu;
use YellowProject\Richmenu\RichmenuArea;
use YellowProject\Richmenu\RichmenuAreaAction;
use YellowProject\Richmenu\RichmenuAreaBounds;
use YellowProject\Richmenu\CoreFunction;
use YellowProject\Richmenu\Image as ImageFile;
use Carbon\Carbon;
use URL;

class RichmenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $richmenus = Richmenu::all();

        return response()->json([
            'datas' => $richmenus,
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
        $request['width'] = $request['size']['width'];
        $request['height'] = $request['size']['height'];
        $richmenu = Richmenu::create($request->all());
        if(isset($request->areas)){
            foreach ($request->areas as $key => $areas) {
                $richmenuArea = RichmenuArea::create([
                    'richmenu_id' => $richmenu->id,
                ]);

                $areas['action']['richmenu_area_id'] = $richmenuArea->id;
                RichmenuAreaAction::create($areas['action']);

                $areas['bounds']['richmenu_area_id'] = $richmenuArea->id;
                RichmenuAreaBounds::create($areas['bounds']);
            }
        }

        CoreFunction::richMessageCreate($richmenu);
        if($request->selected == 1 && $request->segemnt != -1){
            CoreFunction::setLinkRichmenu($richmenu);
        }

        return response()->json([
            'msg_return' => 'บันทึกสำเร็จ',
            'code_return' => 1,
            'id' => $richmenu->id,
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
        $richmenu = Richmenu::find($id);
        $areas = $richmenu->areas;
        $datas['id'] = $richmenu->id;
        $datas['selected'] = $richmenu->selected;
        $datas['img_url'] = $richmenu->img_url;
        $datas['segment_id'] = $richmenu->segment_id;
        $datas['segment_type'] = $richmenu->segment_type;
        $datas['start_date'] = $richmenu->start_date;
        $datas['end_date'] = $richmenu->end_date;
        $datas['name'] = $richmenu->name;
        $datas['chatBarText'] = $richmenu->chatBarText;
        $datas['areas'] = [];
        $datas['size']['width'] = $richmenu->width;
        $datas['size']['height'] = $richmenu->height;
        foreach ($areas as $key => $area) {
            $datas['areas'][$key]['action'] = $area->action->toArray();
            $datas['areas'][$key]['bounds'] = $area->bound->toArray();
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
        $status = "";
        $switch = 0;
        $richmenu = Richmenu::find($id);
        if($richmenu->selected == 1 && $request->selected == 1){
            if($richmenu->segment_id != $request->segment_id){
                return response()->json([
                    'msg_return' => 'สถานะ Active ไม่สามารถเปลี่ยน Segment ได้',
                    'code_return' => 2,
                ]);
            }
        }

        if($richmenu->selected != $request->selected){
            $switch = 1;
            if($request->selected == 1){
                $status = "Active";
            }else{
                $status = "DeActive";
            }
        }
        // if($request->selected == 1){
        //     CoreFunction::setLinkRichmenu($richmenu);
        // }
        $request['width'] = $request['size']['width'];
        $request['height'] = $request['size']['height'];
        $richmenu->update($request->all());
        $richmenuAreas = $richmenu->areas;
        foreach ($richmenuAreas as $key => $richmenuArea) {
            RichmenuAreaAction::where('richmenu_area_id',$richmenuArea->id)->delete();
            RichmenuAreaBounds::where('richmenu_area_id',$richmenuArea->id)->delete();
            $richmenuArea->delete();
        }
        if(isset($request->areas)){
            foreach ($request->areas as $key => $areas) {
                $richmenuArea = RichmenuArea::create([
                    'richmenu_id' => $richmenu->id,
                ]);

                $areas['action']['richmenu_area_id'] = $richmenuArea->id;
                RichmenuAreaAction::create($areas['action']);

                $areas['bounds']['richmenu_area_id'] = $richmenuArea->id;
                RichmenuAreaBounds::create($areas['bounds']);
            }
        }

        if($request->selected == 1){
            CoreFunction::deleteRichmenu($richmenu);
            CoreFunction::richMessageCreate($richmenu);
            CoreFunction::setLinkRichmenu($richmenu);
        }else{
            CoreFunction::setUnLinkRichmenu($richmenu);
        }




        return response()->json([
            'msg_return' => 'บันทึกสำเร็จ',
            'code_return' => 1,
            'id' => $richmenu->id,
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
        $richmenu = Richmenu::find($id);
        if($richmenu->selected == 1){
            return response()->json([
                'msg_return' => 'ไม่สามารถลบได้เนื่องจากสถานะเป็น Active',
                'code_return' => 2,
            ]);
        }
        $richmenu->delete();
        CoreFunction::deleteRichmenu($richmenu);

        return response()->json([
            'msg_return' => 'ลบข้อมูลสำเร็จ',
            'code_return' => 1,
        ]);
    }

    public function uploadMultiple(Request $request)
    {
        ImageFile::checkFolderRichmenu();
        $datas = collect();
        if($request->img_items){
            foreach ($request->img_items as $key => $img_item) {
                $dateNow = Carbon::now()->format('dmY_His');
                $fileImage = $img_item;
                $type = null;
                $destinationPath = 'file_uploads/richmenu'; // upload path
                $extension = $fileImage->getClientOriginalExtension(); // getting image extension
                $fileName = $dateNow.'-'.$key.'.'.$extension; // renameing image
                $fileImage->move($destinationPath, $fileName); // uploading file to given path

                $imageFile = ImageFile::create([
                    'img_url' => URL::to('/')."/".$destinationPath."/".$fileName,
                    'img_size' => null,
                ]);

                $datas->put($key,$imageFile);
            }
        }

        return response()->json([
            'msg_return' => 'บันทึกสำเร็จ',
            'code_return' => 1,
            'datas' => $datas,
        ]);
    }
}
