<?php

namespace YellowProject\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Log;
use YellowProject\ChatMain;
use YellowProject\UserAgent;
use YellowProject\ChatMainSetting;
use YellowProject\ConnectFirebase;
use YellowProject\JobScheduleFunction;
use YellowProject\JsonFile;
use YellowProject\RecieveBeacon;
use YellowProject\SettingJson;
use YellowProject\Campaign;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')
        //          ->hourly();
        // Log::debug('shedule');


        // $schedule->call(function () {
        //     // Log::debug('shedule start');
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        //     // $chatMain = ChatMain::where('chat_status','waiting')->get();
        //     // DB::table('recent_users')->delete();
        // })->everyMinute();


        // $schedule->call(function () {
        //     sleep(10);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(15);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(20);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(25);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(30);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(35);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(40);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(45);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();

        // $schedule->call(function () {
        //     sleep(50);
        //     ChatMain::autoPickUser();
        //     ChatMain::autoKickUser();
        // })->everyMinute();


        // $schedule->call(function () {
        //     JobScheduleFunction::checkStatusEcomProduct();
        //     JobScheduleFunction::checkStatusCoupon();
        // })->everyMinute();


        // $schedule->call(function () {
        //     $settingJson = SettingJson::first();
        //     $timeSend = $settingJson->hour.":".$settingJson->min;
        //     $dateNow = \Carbon\Carbon::now()->format('H:i');
        //     if($timeSend == $dateNow){
        //         // \Log::debug('schedule match');
        //         JsonFile::leadsProfiles();
        //         JsonFile::activities();
        //         JsonFile::respondAndCampaigns();
        //     }
        // })->everyMinute();


        // $schedule->call(function () {
        //     RecieveBeacon::checkBeaconLeave();
        // })->everyMinute();
        

        $schedule->call(function () {
            // \Log::debug('schedule-campaign-run');
            Campaign::scheduleSentMessage();
        })->everyMinute();

        $schedule->call(function () {
            JobScheduleFunction::checkFunctionDownload();
        })->everyMinute();

        $schedule->call(function () {
            JobScheduleFunction::refreshToken();
        })->dailyAt('00:00');

        $schedule->call(function () {
            Campaign::setScheduleRecurringData();
        })->dailyAt('00:00');
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
