<?php
use Illuminate\Http\Request;
use YellowProject\LineWebHooks;
use YellowProject\Profilling;
use YellowProject\ConnectBotNoi;
use YellowProject\Field;
use YellowProject\SubscriberLine;
use YellowProject\SubscriberItem;
use YellowProject\PhpMailer;
use YellowProject\GeneralFunction\CoreFunction;
use YellowProject\GeneralFunction\GenData;
use YellowProject\GeneralFunction\LineNotification;
use YellowProject\Queuing\QueuingData;
use YellowProject\Segment\Segment;
use YellowProject\TEST\TestFunction;
use YellowProject\Subscriber\MasterSubscriber;
use YellowProject\LineUserProfile;
use YellowProject\JobScheduleFunction;
use Carbon\Carbon;

Route::get('/run-job', function () {
  JobScheduleFunction::checkFunctionDownload();
});

Route::get('test-gen', function (Request $request) {
  \YellowProject\MT\GenerateData::generateData();
});

Route::get('test-mt', function (Request $request) {
  return view($request->page);
});

Route::get('test-mt-register', function()
{
    return view('mt.register.index');
});

Route::get('500', function()
{
    abort(500);
});

Route::get('clear-session', function () {
  Session::flush();
});

//SAMMY
Route::get('/sam-test', function () {
    //return view('fwd.show.taxcer-sendmail');
});

//do not delete
Route::get('storage/line/image/{messageType}/{imageid}', function ($imageid)
{
    //DIRECTORY_SEPARATOR
    // dd(storage_path('public'.DIRECTORY_SEPARATOR .'line'.DIRECTORY_SEPARATOR.'image'.DIRECTORY_SEPARATOR.'message'.DIRECTORY_SEPARATOR. $filename));
    return Image::make(storage_path('public'.DIRECTORY_SEPARATOR .'line'.DIRECTORY_SEPARATOR.'image'.DIRECTORY_SEPARATOR.'message'.DIRECTORY_SEPARATOR. $imageid))->response();
});

//TODO: samtest
Route::get('/device-test', function () {
    return view('sam-test.index');
});

Route::get('/test-line-login', function () {
    return view('line-login');
});

Route::group(['middleware' => 'guest'], function() {
  Route::get('/cms-lineofficialadmin', function () {
      return view('auth.login');
  });
});

Route::group(['middleware' => 'auth'], function() {
  Route::get('/cms-lineofficialadmin', function () {
      return view('web-view.index');
  });
  Route::middleware('cors')->resource('fwd-encrypt', 'API\v1\FWD\FWDEncryptController');
});

Auth::routes();

Route::get('signin', 'HomeController@index');

Route::get('line-login', 'Auth\AuthController@redirectToProvider')->name('line-login');
Route::get('callback', 'Auth\AuthController@handleProviderCallback');
Route::post('line-logout', 'Auth\AuthController@logout')->name('line-logout');

Route::get('dashboard', 'DashboardController@index');

Route::get('bc-recieve/{code}', 'RecieveTrackingBCController@recieveCode');

Route::resource('activity', 'ProfillingController');

Route::get('bc/{code}', function (Request $request,$code) {
  \Session::put('tracking_bc_code', $code);
  return redirect()->action('Auth\AuthController@redirectToProvider',['type' => 'bc_tracking']);
});

Route::get('/register', function () {
    return view('errors.404');
});

Route::get('/password/email', function () {
    return view('errors.404');
});

// Auth::routes();

// Route::get('/home', 'HomeController@index');

Route::post('field','FeildController@index');

Route::get('/notfound-page', function () {
    return view('errors.404');
});

Route::get('/test-tableu', function () {
    return view('tableu.index');
});

Route::get('/test-send-msg', function () {
    LineNotification::sentMessageLineNoti();
});


Route::resource('api-folder-campagin', 'API\v1\CampaignFolderController');

Route::get('clear-data-estamp', function () {
  \YellowProject\Estamp\EstampCustomer::truncate();
  \YellowProject\Estamp\EstampCustomerItem::truncate();
  \YellowProject\Estamp\EstampCustomerRecieveReward::truncate();
  \YellowProject\MT\RegisterData::truncate();
  \YellowProject\MT\RegisterEstampData::truncate();
});

///////////////////////////////////////Estamp/////////////////////////////////////
Route::get('estamp-page', 'Estamp\EstampController@estampPage');
Route::get('stamp/{code}', 'Estamp\EstampController@getStamp');
Route::post('get-reward', 'Estamp\EstampController@recieveReward');
Route::post('renew-estamp', 'Estamp\EstampController@renewEstamp');

Route::get('estamp-get-stamp/{code}', function (Request $request,$code) {
  \Session::put('rtd_code', $code);
  return redirect()->action('Auth\AuthController@redirectToProvider',['type' => 'get_estamp']);
});

Route::get('estamp', function (Request $request) {
  return redirect()->action('Auth\AuthController@redirectToProvider',['type' => 'estamp']);
});
//////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////MT/////////////////////////////////////
Route::get('mt-register', 'MT\RegisterController@registerPage');
Route::post('mt-register-store', 'MT\RegisterController@storeDataRegister');
Route::get('mt-register-stamp', 'MT\RegisterController@registerStampPage');
Route::post('mt-register-stamp-store', 'MT\RegisterController@storeDataRegisterStamp');
Route::get('mt-register-get-stamp', 'MT\RegisterController@getStampPage');
Route::get('mt-thanks', 'MT\RegisterController@thankPage');
Route::get('mt-estamp', 'MT\EstampController@estampPage');
Route::post('mt-estamp-register-store', 'MT\EstampController@storeRegisterData');
Route::get('mt-get-estamp/{code}', 'MT\EstampController@getStamp');
Route::post('mt-choose-reward', 'MT\EstampController@chooseRewardPage');
Route::post('mt-get-reward', 'MT\EstampController@getReward');
Route::get('mt-estamp-thanks', 'MT\EstampController@thankPage');
Route::post('mt-estamp-renew', 'MT\EstampController@renewEstamp');

Route::get('clear-data-mt-register', function (Request $request) {
  \YellowProject\MT\RegisterData::truncate();
});
Route::get('clear-data-mt-estamp', function (Request $request) {
  \YellowProject\MT\RegisterEstampData::truncate();
  \YellowProject\Estamp\EstampCustomer::truncate();
  \YellowProject\Estamp\EstampCustomerItem::truncate();
  \YellowProject\Estamp\EstampCustomerRecieveReward::truncate();
});


Route::get('promotions', 'MT\Promotion\PromotionController@index');
Route::get('promotions_first', 'MT\Promotion\PromotionController@first');
Route::post('promotions_second', 'MT\Promotion\PromotionController@second');
Route::post('promotions_confirm', 'MT\Promotion\PromotionController@confirm');
Route::get('mt-royal-thankpage', 'MT\Promotion\PromotionController@thank');

Route::get('promotions_estamps', 'MT\Promotion\PromotionEstampController@estampPage');
Route::get('mt-royal-addstamps', 'MT\Promotion\PromotionEstampController@addStamp');
Route::get('mt-royal-addstamps', 'MT\Promotion\PromotionEstampController@addStamp');

/*
  MT Royal Customer
*/
//Get http://yi-mt.test/customers/1/customerestamps
//Post http://yi-mt.test/customers/1/customerestamps

Route::resource('customers.estamps', 'MT\Customer\CustomerEstampController',['only' => [
  'index', 'store'
]]);

//Patch http://yi-mt.test/customers/1   *** change is_redeem
Route::resource('customers', 'MT\Customer\CustomerController',['only' => [
  'index', 'show', 'update'
]]);
Route::get('customers-redeems', 'MT\Customer\CustomerController@redeem');
//////////////////////////////////////////////////////////////////////////////////
