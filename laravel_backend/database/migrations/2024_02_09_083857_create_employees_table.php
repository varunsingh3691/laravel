<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id('employee_id'); // Auto-incrementing primary key
            $table->string('full_name', 100);
            $table->char('gender', 1)->check(['M', 'F']);
            $table->date('date_of_birth');
            $table->dateTime('hire_date');
            $table->decimal('salary', 10, 2);
            $table->boolean('is_active')->default(1);
            $table->smallInteger('department_id');
            $table->string('job_title', 100);
            $table->string('email_address', 100)->unique();
            $table->string('phone_number', 15)->nullable();
        });
        
        // Set the AUTO_INCREMENT value
        DB::statement('ALTER TABLE employees AUTO_INCREMENT = 100;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
};
