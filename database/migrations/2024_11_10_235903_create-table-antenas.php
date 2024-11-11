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
        Schema::create('antenas', function (Blueprint $table) {
            $table->uuid('id')->primary(); 
            $table->string('descricao', 100)->unique(); 
            $table->decimal('latitude', 10, 8)->check('latitude BETWEEN -90 AND 90'); 
            $table->decimal('longitude', 11, 8)->check('longitude BETWEEN -180 AND 180'); 
            $table->string('uf', 2); 
            $table->decimal('altura', 8, 2)->check('altura > 0'); 
            $table->date('data_implantacao')->nullable(); 
            $table->string('foto')->nullable(); 

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antenas');
    }
};
