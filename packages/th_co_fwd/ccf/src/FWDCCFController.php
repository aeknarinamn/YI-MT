<?php

namespace TH_CO_FWD\CCF;

use Illuminate\Support\Facades\Log;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class FWDCCFController
{
 
    protected $appName;
    protected $key;

    public function init($appName, $key, $aws)
    {
        $this->appName = $appName;
        //$this->key = $key;

        Log::info("AppName: ".$appName."; Key: ".$key);
        
        /*
        $s3 = $aws->createClient('s3');
        
        Log::info("CCF Created S3 Client");
        
        $s3->putObject(array(
            'Bucket'    => 'fwdth-aws-keystorage',
            'Key'       => 'CCF',
            'Body'      => 'Hello World',
        ));

        Log::info("CCF Uploaded file to s3 bucket");
        */

        $client = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'https://hax94w83j1.execute-api.ap-southeast-1.amazonaws.com/dev/',
            // You can set any number of default request options.
            'timeout'  => 10.0,
        ]);

        Log::info("CCF Created Guzzle client");

        $response = $client->post('get-app-key',[
            'proxy' => 'http://linebizservice:Linefwd516@vpthwsg00001.th.intranet:8080', 
            'verify' => false,
            'json' => ['appid' => $appName]
        ]);

        Log::info("CCF Guzzle response: ".$response->getStatusCode()."; body: ".$response->getBody());
        $obj = json_decode($response->getBody());
        $this->key = $obj->{'key'};

        return $this->key;
    }

    public function getKey($appName)
    {        
        return $this->key;
    }
 
}