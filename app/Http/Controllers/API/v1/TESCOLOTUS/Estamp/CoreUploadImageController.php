<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\Estamp;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\Estamp\EstampImageUpload;
use Carbon\Carbon;
use URL;

class CoreUploadImageController extends Controller
{
    public function uploadMultipleStamp(Request $request)
    {
        // dd($request->all());
        EstampImageUpload::checkFolderStamp();
        $datas = collect();
        if($request->img_items){
            foreach ($request->img_items as $key => $img_item) {
                $dateNow = Carbon::now()->format('dmY_His');
                $fileImage = $img_item;
                $type = 'stamp';
                $destinationPath = 'file_uploads/estamp/stamp'; // upload path
                $extension = $fileImage->getClientOriginalExtension(); // getting image extension
                $fileName = $dateNow.'-'.$key.'.'.$extension; // renameing image
                $fileImage->move($destinationPath, $fileName); // uploading file to given path

                $imageFile = EstampImageUpload::create([
                    'img_url' => URL::to('/')."/".$destinationPath."/".$fileName,
                    'img_size' => null,
                    'type' => $type,
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

    public function uploadMultipleBanner(Request $request)
    {
        // dd($request->all());
        EstampImageUpload::checkFolderBanner();
        $datas = collect();
        if($request->img_items){
            foreach ($request->img_items as $key => $img_item) {
                $dateNow = Carbon::now()->format('dmY_His');
                $fileImage = $img_item;
                $type = 'banner';
                $destinationPath = 'file_uploads/estamp/banner'; // upload path
                $extension = $fileImage->getClientOriginalExtension(); // getting image extension
                $fileName = $dateNow.'-'.$key.'.'.$extension; // renameing image
                $fileImage->move($destinationPath, $fileName); // uploading file to given path

                $imageFile = EstampImageUpload::create([
                    'img_url' => URL::to('/')."/".$destinationPath."/".$fileName,
                    'img_size' => null,
                    'type' => $type,
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

    public function uploadMultipleBoard(Request $request)
    {
        // dd($request->all());
        EstampImageUpload::checkFolderBoard();
        $datas = collect();
        if($request->img_items){
            foreach ($request->img_items as $key => $img_item) {
                $dateNow = Carbon::now()->format('dmY_His');
                $fileImage = $img_item;
                $type = 'board';
                $destinationPath = 'file_uploads/estamp/board'; // upload path
                $extension = $fileImage->getClientOriginalExtension(); // getting image extension
                $fileName = $dateNow.'-'.$key.'.'.$extension; // renameing image
                $fileImage->move($destinationPath, $fileName); // uploading file to given path

                $imageFile = EstampImageUpload::create([
                    'img_url' => URL::to('/')."/".$destinationPath."/".$fileName,
                    'img_size' => null,
                    'type' => $type,
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

    public function uploadMultipleReward(Request $request)
    {
        // dd($request->all());
        EstampImageUpload::checkFolderReward();
        $datas = collect();
        if($request->img_items){
            foreach ($request->img_items as $key => $img_item) {
                $dateNow = Carbon::now()->format('dmY_His');
                $fileImage = $img_item;
                $type = 'reward';
                $destinationPath = 'file_uploads/estamp/reward'; // upload path
                $extension = $fileImage->getClientOriginalExtension(); // getting image extension
                $fileName = $dateNow.'-'.$key.'.'.$extension; // renameing image
                $fileImage->move($destinationPath, $fileName); // uploading file to given path

                $imageFile = EstampImageUpload::create([
                    'img_url' => URL::to('/')."/".$destinationPath."/".$fileName,
                    'img_size' => null,
                    'type' => $type,
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
