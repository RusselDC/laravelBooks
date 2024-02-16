<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BooksController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::group(['middleware'=>'auth:sanctum'],function()
{
    Route::get('/user',[AuthController::class,'user']);
    Route::post('/bookmark/{id}/{title}',[BooksController::class,'bookmark']);
    Route::post('/remove/bookmark/{id}/{title}',[BooksController::class,'removeBookmark']);
    Route::post('/book/{id}/comment',[CommentsController::class,'store']);
    Route::get('/book/{id}/comment',[CommentsController::class,'getComments']);
});



Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

