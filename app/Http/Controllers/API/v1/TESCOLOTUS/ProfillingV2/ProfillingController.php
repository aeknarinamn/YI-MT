<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\ProfillingV2;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\ProfillingV2\Profilling;
use YellowProject\ProfillingV2\ProfillingItem;
use YellowProject\ProfillingV2\ProfillingItemStyle;
use YellowProject\ProfillingV2\ProfillingPage;
use YellowProject\ProfillingV2\ProfillingPageItem;
use YellowProject\ProfillingV2\ProfillingPageItemAnswer;
use YellowProject\ProfillingV2\ProfillingPageItemChoiceList;
use YellowProject\ProfillingV2\ProfillingPageItemOption;

class ProfillingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profillings = Profilling::all();

        return response()->json([
            'datas' => $profillings,
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
        $profilling = Profilling::create($request->all());
        if(isset($request->items)){
            foreach ($request->items as $key => $item) {
                $item['profilling_id'] = $profilling->id;
                $profillingItem = ProfillingItem::create($item);
                if(isset($item['styles'])){
                    foreach ($item['styles'] as $key => $style) {
                       $style['profilling_item_id'] = $profillingItem->id;
                       ProfillingItemStyle::create($style);
                    }
                }
            }
        }
        if(isset($request->pages)){
            foreach ($request->pages as $key => $page) {
                $page['profilling_id'] = $profilling->id;
                $profillingPage = ProfillingPage::create($page);
                if(isset($page['items'])){
                    foreach ($page['items'] as $key => $item) {
                        $item['profilling_page_id'] = $profillingPage->id;
                        $profillingPageItem = ProfillingPageItem::create($item);
                        if(isset($item['answers'])){
                            foreach ($item['answers'] as $key => $answer) {
                                ProfillingPageItemAnswer::create([
                                    'profilling_page_item_id' => $profillingPageItem->id,
                                    'value' => $answer
                                ]);
                            }
                        }
                        if(isset($item['choice_lists'])){
                            foreach ($item['choice_lists'] as $key => $choice_list) {
                                ProfillingPageItemChoiceList::create([
                                    'profilling_page_item_id' => $profillingPageItem->id,
                                    'value' => $choice_list
                                ]);
                            }
                        }
                        if(isset($item['options'])){
                            foreach ($item['options'] as $key => $option) {
                                $option['profilling_page_item_id'] = $profillingPageItem->id;
                                ProfillingPageItemOption::create($option);
                            }
                        }
                    }
                }
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
        $profilling = Profilling::find($id);
        $datas = $profilling->toArray();
        $profillingItems = $profilling->items;
        $profillingPages = $profilling->pages;
        $datas['items'] = [];
        $datas['pages'] = [];
        foreach ($profillingItems as $keyItem => $profillingItem) {
            $datas['items'][$keyItem]['type'] = $profillingItem->type;
            $datas['items'][$keyItem]['title'] = $profillingItem->title;
            $datas['items'][$keyItem]['flag'] = $profillingItem->flag;
            $datas['items'][$keyItem]['styles'] = [];
            $profillingItemStyles = $profillingItem->styles;
            foreach ($profillingItemStyles as $keyStyle => $profillingItemStyle) {
                $datas['items'][$keyItem]['styles'][$keyStyle]['ref'] = $profillingItemStyle->ref;
                $datas['items'][$keyItem]['styles'][$keyStyle]['title'] = $profillingItemStyle->title;
                $datas['items'][$keyItem]['styles'][$keyStyle]['key'] = $profillingItemStyle->key;
                $datas['items'][$keyItem]['styles'][$keyStyle]['value'] = $profillingItemStyle->value;
                $datas['items'][$keyItem]['styles'][$keyStyle]['output'] = $profillingItemStyle->output;
            }
        }
        foreach ($profillingPages as $keyPage => $profillingPage) {
            $profillingPageItems = $profillingPage->pageItems;
            $datas['pages'][$keyPage]['type'] = $profillingPage->type;
            foreach ($profillingPageItems as $keyPageItem => $profillingPageItem) {
                $profillingPageItemAnswers = $profillingPageItem->pageItemAnswers;
                $profillingPageItemChoiceLists = $profillingPageItem->pageItemChoiceLists;
                $profillingPageItemOptions = $profillingPageItem->pageItemOptions;
                $datas['pages'][$keyPage]['items'][$keyPageItem]['title'] = $profillingPageItem->title;
                $datas['pages'][$keyPage]['items'][$keyPageItem]['type'] = $profillingPageItem->type;
                $datas['pages'][$keyPage]['items'][$keyPageItem]['question'] = $profillingPageItem->question;
                $datas['pages'][$keyPage]['items'][$keyPageItem]['answers'] = [];
                foreach ($profillingPageItemAnswers as $keyPageAnswer => $profillingPageItemAnswer) {
                    $datas['pages'][$keyPage]['items'][$keyPageItem]['answers'][$keyPageAnswer]['value'] = $profillingPageItemAnswer->value;
                }
                $datas['pages'][$keyPage]['items'][$keyPageItem]['choice_lists'] = [];
                foreach ($profillingPageItemChoiceLists as $keyPageChoiceList => $profillingPageItemChoiceList) {
                    $datas['pages'][$keyPage]['items'][$keyPageItem]['choice_lists'][$keyPageChoiceList]['value'] = $profillingPageItemChoiceList->value;
                }
                $datas['pages'][$keyPage]['items'][$keyPageItem]['subscribe_id'] = $profillingPageItem->subscribe_id;
                $datas['pages'][$keyPage]['items'][$keyPageItem]['field_id'] = $profillingPageItem->field_id;
                $datas['pages'][$keyPage]['items'][$keyPageItem]['options'] = [];
                foreach ($profillingPageItemOptions as $keyPageOption => $profillingPageItemOption) {
                    $datas['pages'][$keyPage]['items'][$keyPageItem]['options'][$keyPageOption]['title'] = $profillingPageItemOption->title;
                    $datas['pages'][$keyPage]['items'][$keyPageItem]['options'][$keyPageOption]['key'] = $profillingPageItemOption->key;
                    $datas['pages'][$keyPage]['items'][$keyPageItem]['options'][$keyPageOption]['value'] = $profillingPageItemOption->value;
                }
            }
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
        $profilling = Profilling::find($id);
        $profilling->update($request->all());
        $profillingItems = ProfillingItem::where('profilling_id',$profilling->id)->get();
        if($profillingItems->count() > 0){
            foreach ($profillingItems as $key => $profillingItem) {
                $profillingItemStyles = ProfillingItemStyle::where('profilling_item_id',$profillingItem->id)->get();
                if($profillingItemStyles->count() > 0){
                    foreach ($profillingItemStyles as $key => $profillingItemStyle) {
                        $profillingItemStyle->delete();
                    }
                }
                $profillingItem->delete();
            }
        }

        $profillingPages = ProfillingPage::where('profilling_id',$profilling->id)->get();
        if($profillingPages->count() > 0){
            foreach ($profillingPages as $key => $profillingPage) {
                $profillingPageItems = ProfillingPageItem::where('profilling_page_id',$profillingPage->id)->get();
                if($profillingPageItems->count() > 0){
                    foreach ($profillingPageItems as $key => $profillingPageItem) {
                        ProfillingPageItemAnswer::where('profilling_page_item_id',$profillingPageItem->id)->delete();
                        ProfillingPageItemChoiceList::where('profilling_page_item_id',$profillingPageItem->id)->delete();
                        ProfillingPageItemOption::where('profilling_page_item_id',$profillingPageItem->id)->delete();
                        $profillingPageItem->delete();
                    }
                }
                $profillingPage->delete();
            }
        }
        

        if(isset($request->items)){
            foreach ($request->items as $key => $item) {
                $item['profilling_id'] = $profilling->id;
                $profillingItem = ProfillingItem::create($item);
                if(isset($item['styles'])){
                    foreach ($item['styles'] as $key => $style) {
                       $style['profilling_item_id'] = $profillingItem->id;
                       ProfillingItemStyle::create($style);
                    }
                }
            }
        }
        if(isset($request->pages)){
            foreach ($request->pages as $key => $page) {
                $page['profilling_id'] = $profilling->id;
                $profillingPage = ProfillingPage::create($page);
                if(isset($page['items'])){
                    foreach ($page['items'] as $key => $item) {
                        $item['profilling_page_id'] = $profillingPage->id;
                        $profillingPageItem = ProfillingPageItem::create($item);
                        if(isset($item['answers'])){
                            foreach ($item['answers'] as $key => $answer) {
                                ProfillingPageItemAnswer::create([
                                    'profilling_page_item_id' => $profillingPageItem->id,
                                    'value' => $answer
                                ]);
                            }
                        }
                        if(isset($item['choice_lists'])){
                            foreach ($item['choice_lists'] as $key => $choice_list) {
                                ProfillingPageItemChoiceList::create([
                                    'profilling_page_item_id' => $profillingPageItem->id,
                                    'value' => $choice_list
                                ]);
                            }
                        }
                        if(isset($item['options'])){
                            foreach ($item['options'] as $key => $option) {
                                $option['profilling_page_item_id'] = $profillingPageItem->id;
                                ProfillingPageItemOption::create($option);
                            }
                        }
                    }
                }
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
        $profilling = Profilling::find($id);
        $profillingItems = ProfillingItem::where('profilling_id',$profilling->id)->get();
        if($profillingItems->count() > 0){
            foreach ($profillingItems as $key => $profillingItem) {
                $profillingItemStyles = ProfillingItemStyle::where('profilling_item_id',$profillingItem->id)->get();
                if($profillingItemStyles->count() > 0){
                    foreach ($profillingItemStyles as $key => $profillingItemStyle) {
                        $profillingItemStyle->delete();
                    }
                }
                $profillingItem->delete();
            }
        }
        $profillingPages = ProfillingPage::where('profilling_id',$profilling->id)->get();
        if($profillingPages->count() > 0){
            foreach ($profillingPages as $key => $profillingPage) {
                $profillingPageItems = ProfillingPageItem::where('profilling_page_id',$profillingPage->id)->get();
                if($profillingPageItems->count() > 0){
                    foreach ($profillingPageItems as $key => $profillingPageItem) {
                        ProfillingPageItemAnswer::where('profilling_page_item_id',$profillingPageItem->id)->delete();
                        ProfillingPageItemChoiceList::where('profilling_page_item_id',$profillingPageItem->id)->delete();
                        ProfillingPageItemOption::where('profilling_page_item_id',$profillingPageItem->id)->delete();
                        $profillingPageItem->delete();
                    }
                }
                $profillingPage->delete();
            }
        }
        $profilling->delete();

        return response()->json([
            'msg_return' => 'ลบสำเร็จ',
            'code_return' => 1,
        ]);
    }
}
