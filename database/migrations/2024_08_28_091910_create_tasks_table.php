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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');
            $table->string('title')->nullable();
            $table->string('sound')->nullable();
            $table->string('image')->nullable();
            $table->text('question')->nullable();
            $table->json('answers')->nullable();
            $table->text('helperText')->nullable();
            $table->boolean('showHelperText')->nullable();
            $table->timestamps();
            $table->integer('order')->default(0);
            $table->enum('type', ['drag_and_drop', 'drawing', 'question', 'math', 'connect_lines', 'sorting', 'sorting_columns']);
            //   $table->json('additional_data')->nullable(); // JSON polje za specifične podatke

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
