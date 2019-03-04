<?php

namespace YellowProject\Http\Controllers\API\v1\TESCOLOTUS\TemplateMessage;

use Illuminate\Http\Request;
use YellowProject\Http\Controllers\Controller;
use YellowProject\TemplateMessage\TemplateMessage;
use YellowProject\TemplateMessage\TemplateMessageColumn;
use YellowProject\TemplateMessage\TemplateMessageAction;

class TemplateMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datas = [];
        $templateMessages = TemplateMessage::all();
        foreach ($templateMessages as $key => $templateMessage) {
            $datas[$key]['id'] = $templateMessage->id;
            $datas[$key]['name'] = $templateMessage->name;
            $datas[$key]['alt_text'] = $templateMessage->alt_text;
            $datas[$key]['type'] = $templateMessage->type;
            $datas[$key]['folder_name'] = ($templateMessage->folder)? $templateMessage->folder->name : null;
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
        $templateMessage = TemplateMessage::create($request->all());
        if(isset($request->columns)){
            $columns = $request->columns;
            foreach ($columns as $key => $column) {
                $column['template_message_id'] = $templateMessage->id;
                $templateMessageColumn = TemplateMessageColumn::create($column);
                if(isset($column['actions'])){
                    $actions = $column['actions'];
                    foreach ($actions as $key => $action) {
                        $action['template_message_column_id'] = $templateMessageColumn->id;
                        TemplateMessageAction::create($action);
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
        $templateMessage = TemplateMessage::find($id);
        $datas = $templateMessage->toArray();
        $templateMessageColumns = $templateMessage->templateMessageColumns;
        if($templateMessageColumns){
            foreach ($templateMessageColumns as $key => $templateMessageColumn) {
                $datas['columns'][$key] = $templateMessageColumn->toArray();
                $templateMessageActions = $templateMessageColumn->templateMessageActions;
                if($templateMessageActions){
                    foreach ($templateMessageActions as $index => $templateMessageAction) {
                        $datas['columns'][$key]['actions'][$index] = $templateMessageAction->toArray();
                    }
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
        $templateMessage = TemplateMessage::find($id);
        $templateMessage->update($request->all());
        $templateMessageColumns = $templateMessage->templateMessageColumns;
        if($templateMessageColumns){
            foreach ($templateMessageColumns as $key => $templateMessageColumn) {
                $templateMessageActions = $templateMessageColumn->templateMessageActions;
                if($templateMessageActions){
                    foreach ($templateMessageActions as $key => $templateMessageAction) {
                        $templateMessageAction->delete();
                    }
                }
                $templateMessageColumn->delete();
            }
        }

        if(isset($request->columns)){
            $columns = $request->columns;
            foreach ($columns as $key => $column) {
                $column['template_message_id'] = $templateMessage->id;
                $templateMessageColumn = TemplateMessageColumn::create($column);
                if(isset($column['actions'])){
                    $actions = $column['actions'];
                    foreach ($actions as $key => $action) {
                        $action['template_message_column_id'] = $templateMessageColumn->id;
                        TemplateMessageAction::create($action);
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
        $templateMessage = TemplateMessage::find($id);
        $templateMessageColumns = $templateMessage->templateMessageColumns;
        if($templateMessageColumns){
            foreach ($templateMessageColumns as $key => $templateMessageColumn) {
                $templateMessageActions = $templateMessageColumn->templateMessageActions;
                if($templateMessageActions){
                    foreach ($templateMessageActions as $key => $templateMessageAction) {
                        $templateMessageAction->delete();
                    }
                }
                $templateMessageColumn->delete();
            }
        }
        $templateMessage->delete();

        return response()->json([
            'msg_return' => 'ลบสำเร็จ',
            'code_return' => 1,
        ]);
    }
}
