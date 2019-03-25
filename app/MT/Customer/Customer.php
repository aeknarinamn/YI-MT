<?php

namespace YellowProject\MT\Customer;

use YellowProject\MT\Shop\Shop;
use Illuminate\Database\Eloquent\Model;
use YellowProject\MT\Customer\CustomerEstamp;
use YellowProject\Richmenu\CoreFunction;
use YellowProject\Richmenu\Richmenu;

class Customer extends Model
{
    public $timestamps = true;


    protected $table = 'fact_mt_customer';

    protected $fillable = [
    	'line_user_id',
    	'shop_id',
    	'total_stamp',
    	'is_active',
    	'is_redeem',
        'is_use_coupon',
    ];

    const RULE_REDEEM = 6;

    public function customerestamps()
    {
        return $this->hasMany(CustomerEstamp::class,'mt_customer_id');
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class,'shop_id');
    }

    public function activeShop()
    {
        return $this->shop->is_active;
    }

    public static function changeShop($lineUserProfile,$shop)
    {
        $shopId = 0;
        if($shop == "TOPS"){
            $shopId = 1;
        }else if($shop == "WATSONS"){
            $shopId = 2;
        }

        $shop = Shop::find($shopId);

        $richmenu = Richmenu::find($shop->richmenu_id);

        CoreFunction::linkRichmenu($richmenu,$lineUserProfile->mid);

        $UserProfile = Customer::where('line_user_id',$lineUserProfile->id)
            ->where('is_active','1')
            ->first();

        if($UserProfile){
            if($UserProfile->shop_id != $shopId){
                $UserProfile->update([
                    'is_active' => '0'
                ]);

                if($shopId == 1){
                    $searchShopChange = Customer::where('line_user_id',$lineUserProfile->id)
                        ->where('shop_id',$shopId)
                        ->where('is_redeem','0')
                        ->first();
                    if($searchShopChange){
                        $searchShopChange->update([
                            'is_active' => '1'
                        ]);
                    }
                }else if($shopId == 2){
                    $searchShopChange = Customer::where('line_user_id',$lineUserProfile->id)
                        ->where('shop_id',$shopId)
                        ->first();
                    if($searchShopChange){
                        $searchShopChange->update([
                            'is_active' => '1'
                        ]);
                    }
                }
            }
        }
    }
}
