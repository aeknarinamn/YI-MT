<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFactMtCustomerEstampTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fact_mt_customer_estamp', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('line_user_id');
            $table->integer('mt_customer_id');
            $table->integer('seq');
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
        Schema::dropIfExists('fact_mt_customer_estamp');
    }
}
