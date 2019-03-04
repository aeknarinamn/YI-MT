<?php

namespace TH_CO_FWD\CCF;

use Illuminate\Support\ServiceProvider;
/**
 *  Service Provider for FWD Cloud Client Framework
 *
 */
class FWDCCFServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        //$this->loadViewsFrom(__DIR__.'/views', 'ccf');
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
        //include __DIR__.'/routes.php';
        //$this->app->make('TH_CO_FWD\CCF\FWDCCFController');
    }
}
