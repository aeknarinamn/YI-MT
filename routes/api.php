<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
use Carbon\Carbon;
// Route::get('/aa', function () {
//  $now = Carbon::now();
//    // $dateNow1 = $now->toDateTimeString();
//    $dateNow1 = $now;
 
//  sleep(5);
//  $now = Carbon::now();
//    // $dateNow2 = $now->toDateTimeString();
//    $dateNow2 = $now;

//     dd($dateNow1->diffInSeconds($dateNow2)); 
// });
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//Route::middleware('cors')->resource('/test', 'testController');
/*
Route::get('/plural/{plural}', function ($plural) {
	$plural = str_plural($plural);

	return $plural;
});
*/
/*
Route::get('/ss', function () {
	$channelSecret = '7c231619ab14f6698b7c91a515dff5d4'; // Channel secret string
	$httpRequestBody = '{
		  "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
		  "type": "message",
		  "timestamp": 1462629479859,
		  "source": {
		    "type": "user",
		    "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
		  },
		  "message": {
		    "id": "325708",
		    "type": "text",
		    "text": "Hello, world"
		  }
		}'; // Request body string
	$hash = hash_hmac('sha256', $httpRequestBody, $channelSecret, true);
	$signature = base64_encode($hash);
	dd($signature);
});
*/

Route::get('line/receives', 'API\v1\TESCOLOTUS\LineWebHoocksController@getReceive');
Route::post('line/receives', 'API\v1\TESCOLOTUS\LineWebHoocksController@postReceive');
Route::resource('auto-reply-keyword-folder', 'API\v1\TESCOLOTUS\AutoReplyKeywordFolderController');
Route::resource('setting-location', 'API\v1\TESCOLOTUS\LocationController');
Route::resource('setting-location-item', 'API\v1\TESCOLOTUS\LocationItemController');


Route::group(['middleware' => 'cors'], function() {
    Route::resource('auto-reply-keyword-folder', 'API\v1\TESCOLOTUS\AutoReplyKeywordFolderController');
    Route::resource('auto-reply-location', 'API\v1\TESCOLOTUS\AutoReplyLocationController');
	Route::resource('setting-location', 'API\v1\TESCOLOTUS\LocationController');
	Route::resource('setting-location-item', 'API\v1\TESCOLOTUS\LocationItemController');
	Route::resource('setting-user', 'API\v1\TESCOLOTUS\UserController');
	Route::post('setting-user-dt', 'API\v1\TESCOLOTUS\UserController@storeUserDt');
	Route::resource('setting-field', 'API\v1\TESCOLOTUS\FieldController');
	Route::resource('setting-master-field', 'API\v1\TESCOLOTUS\MasterFieldController');
	Route::resource('setting-field-folder', 'API\v1\TESCOLOTUS\FieldFolderController');
	Route::resource('setting-phpmailer', 'API\v1\TESCOLOTUS\PhpmailerController');
	Route::resource('setting-subscriber-folder', 'API\v1\TESCOLOTUS\SubscriberFolderController');

	//subscriber
	Route::resource('setting-subscriber', 'API\v1\TESCOLOTUS\SubscriberController');
	Route::get('setting-subscriber-download', 'API\v1\TESCOLOTUS\SubscriberController@downloadSubscriber');
	Route::get('setting-subscriber-download-single/{id}', 'API\v1\TESCOLOTUS\SubscriberController@downloadSubscriberSingle');
	Route::get('subscriber-get-field/{id}', 'API\v1\TESCOLOTUS\SubscriberController@getField');
	Route::get('subscriber-get-data/{id}', 'API\v1\TESCOLOTUS\SubscriberController@getData');
	Route::resource('subscriber-category', 'API\v1\TESCOLOTUS\Subscriber\SubscriberCategoryController');
	//

	Route::resource('setting-carousel-folder', 'API\v1\TESCOLOTUS\CarouselFolderController');

	Route::resource('setting-carousel', 'API\v1\TESCOLOTUS\CarouselController');
	Route::resource('setting-carousel-item', 'API\v1\TESCOLOTUS\CarouselItemController');
	Route::get('setting-carousel-download', 'API\v1\TESCOLOTUS\CarouselController@exportCarousel');

	Route::resource('line-profilling', 'API\v1\TESCOLOTUS\ProfillingController');
	Route::get('line-profilling-achieve/{id}', 'API\v1\TESCOLOTUS\ProfillingController@achieve');
	Route::get('line-profilling-un-achieve/{id}', 'API\v1\TESCOLOTUS\ProfillingController@unAchieve');
	Route::get('line-profilling-getdata-achieve', 'API\v1\TESCOLOTUS\ProfillingController@getDataAchieve');
	Route::resource('line-profilling-folder', 'API\v1\TESCOLOTUS\ProfillingFolderController');

	Route::resource('img-upload', 'API\v1\TESCOLOTUS\ImageFileController');
	Route::post('img-upload-multiple', 'API\v1\TESCOLOTUS\ImageFileController@uploadMultiple');

	Route::resource('tracking-bc', 'API\v1\TESCOLOTUS\TrackingBcController');

	Route::resource('list-menu', 'API\v1\TESCOLOTUS\ListMenuController');

	Route::post('setting-line-bussiness/{id}/issue', 'API\v1\TESCOLOTUS\LineSettingBusinessController@postIssueToken');
	Route::resource('setting-line-bussiness', 'API\v1\TESCOLOTUS\LineSettingBusinessController');


	Route::post('auto_reply_default/{id}/active', 'AutoReplyDefaultController@postActive');
	Route::resource('auto_reply_default', 'AutoReplyDefaultController');

	Route::post('auto_reply_keyword/{id}/active', 'AutoReplyKeywordController@postActive');
	Route::resource('auto_reply_keyword', 'AutoReplyKeywordController');
	Route::resource('auto-reply-keyword-sharelocation', 'API\v1\TESCOLOTUS\AutoReplyKeyword\AutoReplyKeywordShareLocationController');
	Route::resource('auto-reply-keyword-carousel', 'API\v1\TESCOLOTUS\AutoReplyKeyword\AutoReplyKeywordCarouselController');

	Route::post('campaign/{id}/active', 'API\v1\TESCOLOTUS\CampaignController@postActive');
	Route::post('campaign/{id}/schedule-active', 'API\v1\TESCOLOTUS\CampaignController@scheduleActive');
	Route::post('campaign/{id}/schedule-un-active', 'API\v1\TESCOLOTUS\CampaignController@scheduleUnActive');
	Route::resource('campaign', 'API\v1\TESCOLOTUS\CampaignController');
	Route::resource('campaign-folder', 'API\v1\TESCOLOTUS\CampaignFolderController');

	//RichMessage
	Route::resource('richmessage-folder', 'API\v1\TESCOLOTUS\RichMessageFolderController');
	Route::resource('richmessage', 'API\v1\TESCOLOTUS\RichMessageController');

	//Dashboard
	Route::get('dashboard-1', 'API\v1\TESCOLOTUS\Dashboard@report1');
	Route::post('dashboard-report-calendar-campaign', 'API\v1\TESCOLOTUS\Dashboard@reportCalendarCampaign');
	Route::post('dashboard-report-tracking-bc', 'API\v1\TESCOLOTUS\Dashboard@reportTrackingBC');
	Route::post('dashboard-report-tracking-bc-of-the-day', 'API\v1\TESCOLOTUS\Dashboard@reportTrackingBCofTheDay');
	Route::post('dashboard-report-campaign-statistic', 'API\v1\TESCOLOTUS\Dashboard@reportCampaignStatistic');
	Route::post('dashboard-report-up-comming-event', 'API\v1\TESCOLOTUS\Dashboard@reportUpCommingEvent');
	Route::post('dashboard-report-add-block', 'API\v1\TESCOLOTUS\Dashboard@reportFriendAddBlock');
	Route::post('dashboard-recieve-message-monitor', 'API\v1\TESCOLOTUS\Dashboard@reportRecieveMessageMonitor');
	Route::post('dashboard-keyword-stat', 'API\v1\TESCOLOTUS\Dashboard@reportKeywordStatistic');
	Route::post('dashboard-report-campaign-statistic-campaign', 'API\v1\TESCOLOTUS\Dashboard@reportCampaignStatisticCampaign');
	Route::post('dashboard-report-tracking-bc-by-tracking-bc', 'API\v1\TESCOLOTUS\Dashboard@reportTrackingBCByTrackingBC');
	//

	//test-upload
	Route::resource('test-upload', 'API\v1\TESCOLOTUS\TestUploadFileController');
	//

	//share location
	Route::resource('setting-share-location-folder', 'API\v1\TESCOLOTUS\ShareLocation\ShareLocationFolderController');

	Route::resource('setting-share-location', 'API\v1\TESCOLOTUS\ShareLocation\ShareLocationController');
	Route::resource('setting-share-location-item', 'API\v1\TESCOLOTUS\ShareLocation\ShareLocationItemController');
	Route::get('setting-share-location-download', 'API\v1\TESCOLOTUS\ShareLocation\ShareLocationController@exportShareLocation');
	//

	Route::resource('report-bot', 'API\v1\TESCOLOTUS\ReportBotController');
	Route::get('report-bot-export-csv', 'API\v1\TESCOLOTUS\ReportBotController@exportDataCsv');
	Route::get('report-bot-keyword-group', 'API\v1\TESCOLOTUS\ReportBotController@reportKeywordGroup');
	Route::get('report-bot-keyword-group-export', 'API\v1\TESCOLOTUS\ReportBotController@exportReportKeywordGroup');

	//setting confirmation
	Route::resource('setting-conf-location', 'API\v1\TESCOLOTUS\SettingConfirmation\SettingConfirmationShareLocationController');
	Route::resource('setting-conf-carousel', 'API\v1\TESCOLOTUS\SettingConfirmation\SettingConfirmationCarouselController');
	//

	//thailand Country
	Route::get('province', 'API\v1\TESCOLOTUS\Country\CountryController@getProvince');
	Route::get('all-district', 'API\v1\TESCOLOTUS\Country\CountryController@getAllDistrict');
	Route::get('all-sub-district', 'API\v1\TESCOLOTUS\Country\CountryController@getAllSubDistrict');
	Route::get('province-district', 'API\v1\TESCOLOTUS\Country\CountryController@getProvinceDistrict');
	Route::get('district-sub-district', 'API\v1\TESCOLOTUS\Country\CountryController@getDistrictSubDistrict');
	//

	//upload auto-reply
	Route::post('upload-auto-reply', 'API\v1\TESCOLOTUS\AutoReplyKeyword\AutoReplyKeywordController@uploadAutoReplyFile');
	//

	//master subscriber
	Route::get('get-field-master-subscriber', 'API\v1\TESCOLOTUS\Subscriber\MasterSubscriberController@getFieldMasterSubscriber');
	Route::resource('master-subscriber', 'API\v1\TESCOLOTUS\Subscriber\MasterSubscriberController');
	//

	//update data carousel
	Route::post('update-single-row-carousel', 'API\v1\TESCOLOTUS\CarouselController@updateSingleRow');
	//

	//update data sharelocation
	Route::post('update-single-row-sharelocation', 'API\v1\TESCOLOTUS\ShareLocation\ShareLocationController@updateSingleRow');
	//

	//segment
	Route::resource('setting-segment-folder', 'API\v1\TESCOLOTUS\Segment\SegmentFolderController');
	Route::resource('setting-segment', 'API\v1\TESCOLOTUS\Segment\SegmentController');
	Route::post('segment-get-subscriber-field', 'API\v1\TESCOLOTUS\Segment\SegmentController@getSubscriberListField');
	Route::get('segment-get-campaign', 'API\v1\TESCOLOTUS\Segment\SegmentController@getCampaign');
	Route::post('segment-get-data', 'API\v1\TESCOLOTUS\Segment\SegmentController@getDataSegment');
	Route::post('segment-get-data-count', 'API\v1\TESCOLOTUS\Segment\SegmentController@countDataSegment');
	Route::get('segment-get-subscriber', 'API\v1\TESCOLOTUS\Segment\SegmentController@getSubscriber');
	Route::get('segment-get-tracking-source', 'API\v1\TESCOLOTUS\Segment\SegmentController@getTrackingSource');
	Route::get('segment-get-tracking-campaign', 'API\v1\TESCOLOTUS\Segment\SegmentController@getTrackingCampaign');
	Route::get('segment-get-tracking-ref', 'API\v1\TESCOLOTUS\Segment\SegmentController@getTrackingRef');
	Route::post('segment-export', 'API\v1\TESCOLOTUS\Segment\SegmentController@segmentExportdata');
	Route::get('get-subscriber-all', 'API\v1\TESCOLOTUS\Segment\SegmentController@getSusbcriberAll');
	Route::get('get-segment-name', 'API\v1\TESCOLOTUS\Segment\SegmentController@getSegmentName');

	Route::resource('setting-quick-segment', 'API\v1\TESCOLOTUS\Segment\QuickSegmentController');
	Route::post('setting-quick-segment-upload/{id}', 'API\v1\TESCOLOTUS\Segment\QuickSegmentController@uploadQuickSegment');
	Route::get('setting-quick-segment-import-result', 'API\v1\TESCOLOTUS\Segment\QuickSegmentController@importResult');
	Route::get('setting-quick-segment-export/{id}', 'API\v1\TESCOLOTUS\Segment\QuickSegmentController@exportQuickSegment');
	Route::get('get-quick-segment-name', 'API\v1\TESCOLOTUS\Segment\QuickSegmentController@getQuickSegmentName');
	//

	//report location sharing
	Route::get('report-location-sharing', 'API\v1\TESCOLOTUS\Report\LocationSharingController@getData');
	Route::get('report-location-sharing-export', 'API\v1\TESCOLOTUS\Report\LocationSharingController@exportData');
	//

	//Field
	Route::get('get-field-master-susbcriber', 'API\v1\TESCOLOTUS\FieldController@getMasterSubscriberField');
	Route::get('get-field-personalize', 'API\v1\TESCOLOTUS\GeneralController\GetDataAllController@getPersonalizeField');
	//

	Route::get('send-message-campaign/{id}', 'API\v1\TESCOLOTUS\CampaignController@sendCampaign');

	Route::get('env_angular', 'API\v1\TESCOLOTUS\EnvAngularController@getData');

	//Greeting
	Route::post('setting-greeting/{id}/active', 'API\v1\TESCOLOTUS\Greeting\GreetingController@postActive');
	Route::resource('setting-greeting', 'API\v1\TESCOLOTUS\Greeting\GreetingController');
	//

	//Role Permission
	Route::resource('role-permission', 'API\v1\TESCOLOTUS\RolePermission\RolePermissionController');
	//

	//Google Analytic
	Route::resource('google-analytic-setting', 'API\v1\TESCOLOTUS\GoogleAnalytic\GoogleAnalyticController');
	//

	//General Controller
	Route::get('get-all-user-profile-id', 'API\v1\TESCOLOTUS\GeneralController\GetDataAllController@getAllUserID');
	Route::get('get-all-province', 'API\v1\TESCOLOTUS\GeneralController\GetDataAllController@getProvince');
	//

	//Template Message
	Route::resource('template-message-folder', 'API\v1\TESCOLOTUS\TemplateMessage\TemplateMessageFolderController');
	Route::resource('template-message', 'API\v1\TESCOLOTUS\TemplateMessage\TemplateMessageController');
	//

	//Campaign File
	Route::resource('campaign-photo', 'API\v1\TESCOLOTUS\Photo\CampaignPhotoController');
	Route::resource('campaign-video', 'API\v1\TESCOLOTUS\Video\CampaignVideoController');
	//

	//PageList Label
	Route::resource('page-list', 'API\v1\TESCOLOTUS\PageList\PageListController');
	Route::resource('page-list-label', 'API\v1\TESCOLOTUS\PageList\PageListLabelController');
	//

	//DownloadFile
	Route::get('get-file-subscriber', 'API\v1\TESCOLOTUS\DownloadFile\DownloadFileController@getFileSubscriber');
	//


	///////////////////////////////////////Report///////////////////////////////////
	Route::post('report-keyword-inquiry', 'API\v1\TESCOLOTUS\Report\KeywordInquiryController@keywordInquiryReport');
	Route::post('report-keyword-inquiry-export', 'API\v1\TESCOLOTUS\Report\KeywordInquiryController@keywordInquiryReportExport');
	////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////Estamp///////////////////////////////////
	Route::resource('estamp', 'API\v1\TESCOLOTUS\Estamp\EstampController');
	Route::post('img-upload-multiple-stamp', 'API\v1\TESCOLOTUS\Estamp\CoreUploadImageController@uploadMultipleStamp');
	Route::post('img-upload-multiple-banner', 'API\v1\TESCOLOTUS\Estamp\CoreUploadImageController@uploadMultipleBanner');
	Route::post('img-upload-multiple-board', 'API\v1\TESCOLOTUS\Estamp\CoreUploadImageController@uploadMultipleBoard');
	Route::post('img-upload-multiple-reward', 'API\v1\TESCOLOTUS\Estamp\CoreUploadImageController@uploadMultipleReward');
	Route::delete('estamp-del-estamp-img/{id}', 'API\v1\TESCOLOTUS\Estamp\EstampController@destroyImageEstamp');
	Route::delete('estamp-del-estamp-reward/{id}', 'API\v1\TESCOLOTUS\Estamp\EstampController@destroyRewardEstamp');
	////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////Richmenu/////////////////////////////////
	Route::resource('richmenu', 'API\v1\TESCOLOTUS\Richmenu\RichmenuController');
	Route::post('richmenu-img-upload-multiple', 'API\v1\TESCOLOTUS\Richmenu\RichmenuController@uploadMultiple');
	////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////Profilling V2/////////////////////////////////
	Route::resource('v2-profilling', 'API\v1\TESCOLOTUS\ProfillingV2\ProfillingController');
	/////////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////Message File/////////////////////////////////
	Route::post('message-file', 'API\v1\TESCOLOTUS\MessageFile\MessageFileController@uploadMultiple');
	/////////////////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////MT Report/////////////////////////////////
	Route::post('mt-report-1', 'API\v1\TESCOLOTUS\MT\Report\ReportController@report1');
	Route::post('mt-report-2', 'API\v1\TESCOLOTUS\MT\Report\ReportController@report2');
	Route::post('mt-report-3', 'API\v1\TESCOLOTUS\MT\Report\ReportController@report3');
	Route::post('mt-report-1-export', 'API\v1\TESCOLOTUS\MT\Report\ReportController@report1Export');
	Route::post('mt-report-2-export', 'API\v1\TESCOLOTUS\MT\Report\ReportController@report2Export');
	Route::post('mt-report-3-export', 'API\v1\TESCOLOTUS\MT\Report\ReportController@report3Export');
	/////////////////////////////////////////////////////////////////////////////////////
});

	// Route::middleware('cors')->resource('fwd-hello-soda', 'API\v1\FWD\HelloSodaController');



//Route::middleware('cors')->resource('/line/receives', 'api\v1\LineWebHoocksController');

