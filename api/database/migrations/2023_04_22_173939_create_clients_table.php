<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->integer('id_procceso');
            $table->integer('priority');
            $table->string('avt');
            $table->string('clientName');
            $table->string('agenteName');
            $table->string('emailAddress');
            $table->string('address');
            $table->string('phone');
            $table->string('twoPhone');
            $table->string('callBackAppointment');
            $table->string('resortName');
            $table->string('location');
            $table->string('unitSize');
            $table->string('weeksPoints');
            $table->string('years');
            $table->string('maintenceFee');
            $table->string('priceOffered');
            $table->string('pendingBalance');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
