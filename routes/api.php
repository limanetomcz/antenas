<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AntenaController;
use Illuminate\Support\Facades\Route;

Route::resource('users', UserController::class)->middleware('auth:api');
Route::get('dash-ranking', [AntenaController::class,'dashRanking'])->middleware('auth:api');
Route::resource('antenas', AntenaController::class)->middleware('auth:api');
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::get('validate-token', [AuthController::class, 'validateToken'])->middleware('auth:api');