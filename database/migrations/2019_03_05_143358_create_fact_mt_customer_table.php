<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFactMtCustomerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fact_mt_customer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('line_user_id');
            $table->integer('shop_id');
            $table->integer('total_stamp')->default(0);
            $table->boolean('is_active')->default(0);
            $table->boolean('is_redeem')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fact_mt_customer');
    }
}
