<?php

namespace YellowProject\TemplateMessage;

use Illuminate\Database\Eloquent\Model;
use YellowProject\TemplateMessage\TemplateMessage;

class CoreFunction extends Model
{
    public static function setTemplateMessage($templateMessageId)
    {
    	$templateMessage = TemplateMessage::find($templateMessageId);
    	$templateMessageColumns = $templateMessage->templateMessageColumns;
    	$messages = [];
    	$messages = [
            "type" => "template",
            "altText" => $templateMessage->alt_text,
        ];
        if($templateMessage->type == 'confirm'){
        	$templateMessageColumn = $templateMessageColumns->first();
        	$templateMessageActions = $templateMessageColumn->templateMessageActions;
        	$messages['template']['type'] = 'confirm';
        	$messages['template']['text'] = $templateMessageColumn->title;
        	foreach ($templateMessageActions as $key => $templateMessageAction) {
        		$dataItems[] = self::setTemplateMessageAction($templateMessageAction);
	        }
	        $messages['template']['actions'] = $dataItems;
        }else if($templateMessage->type == 'buttons'){
        	$templateMessageColumn = $templateMessageColumns->first();
        	$templateMessageActions = $templateMessageColumn->templateMessageActions;
        	$messages['template']['type'] = 'buttons';
        	$messages['template']['thumbnailImageUrl'] = $templateMessageColumn->img_url;
        	$messages['template']['imageAspectRatio'] = 'rectangle';
        	$messages['template']['imageSize'] = 'cover';
        	// $messages['template']['imageBackgroundColor'] = '';
        	// $messages['template']['title'] = '';
        	$messages['template']['text'] = $templateMessageColumn->title;
        	foreach ($templateMessageActions as $key => $templateMessageAction) {
        		$dataItems[] = self::setTemplateMessageAction($templateMessageAction);
	        }
	        $messages['template']['actions'] = $dataItems;
        }else if($templateMessage->type == 'carousel'){
        	$messages['template']['type'] = 'carousel';
        	$templateMessageColumns = $templateMessageColumns;
        	foreach ($templateMessageColumns as $key => $templateMessageColumn) {
        		$messages['template']['columns'][$key]['thumbnailImageUrl'] = $templateMessageColumn->img_url;
        		$messages['template']['columns'][$key]['title'] = $templateMessageColumn->title;
        		$messages['template']['columns'][$key]['text'] = $templateMessageColumn->desc;
        		$templateMessageActions = $templateMessageColumn->templateMessageActions;
        		$dataItems = [];
        		foreach ($templateMessageActions as $index => $templateMessageAction) {
	        		$dataItems[] = self::setTemplateMessageAction($templateMessageAction);
		        }
	        	$messages['template']['columns'][$key]['actions'] = $dataItems;
        	}
        }else if($templateMessage->type == 'image_carousel'){
        	$messages['template']['type'] = 'image_carousel';
        	$templateMessageColumns = $templateMessageColumns;
        	foreach ($templateMessageColumns as $key => $templateMessageColumn) {
        		$messages['template']['columns'][$key]['imageUrl'] = $templateMessageColumn->img_url;
        		$templateMessageActions = $templateMessageColumn->templateMessageActions;
        		$templateMessageAction = $templateMessageActions->first();
        		$actions = self::setTemplateMessageAction($templateMessageAction);
        		// dd($actions);
        		$messages['template']['columns'][$key]['action'] = $actions;
        	}
        }
        // dd($messages);

        return $messages;
    }

    public static function setTemplateMessageAction($templateMessageAction)
    {
    	$datas = [];
    	if($templateMessageAction->action == 'Message'){
    		$datas = [
    			'type' => 'message',
    			'label' => $templateMessageAction->label,
    			'text' => $templateMessageAction->label
    		];
    	}
    	else if($templateMessageAction->action == 'Link URL'){
    		$datas = [
    			'type' => 'uri',
    			'label' => $templateMessageAction->label,
    			'uri' => $templateMessageAction->value
    		];
    	}else if($templateMessageAction->action == 'Tel'){
    		$datas = [
    			'type' => 'uri',
    			'label' => $templateMessageAction->label,
    			'uri' => 'tel:'.$templateMessageAction->value
    		];
    	}

    	return $datas;
    }
}
