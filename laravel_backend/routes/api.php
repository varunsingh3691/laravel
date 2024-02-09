<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/allEmployees',[EmployeeController::class,'index']);
Route::post('/addNewEmployee',[EmployeeController::class,'store']);
Route::put('/updateEmployee/{id}',[EmployeeController::class,'update']);
Route::delete('/deleteEmployee/{id}',[EmployeeController::class,'destroy']);