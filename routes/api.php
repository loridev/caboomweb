<?php

use App\Http\Controllers\LevelController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\_OptionalAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::get('/v1/levels/{altId}', [LevelController::class, 'show']);

Route::post('/v1/users/register', [UserController::class, 'register']);

Route::post('/v1/users/login', [UserController::class, 'login']);

Route::post('/v1/users/logout', [UserController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/v1/rankings/', [RankingController::class, 'store']);

Route::get('/v1/rankings/single', [RankingController::class, 'getIndiv']);

Route::get('/v1/rankings/single/current', [RankingController::class, 'getIndiv'])->middleware('auth:sanctum');

Route::get('/v1/rankings/multi', [RankingController::class, 'getMulti']);

Route::get('/v1/rankings/multi/current', [RankingController::class, 'getMulti'])->middleware('auth:sanctum');

// Route::middleware(['middleware' => 'auth:sanctum'], function () {
//     Route::get('/v1/users/current', [UserController::class, 'currentUser']);
// });

Route::middleware('auth:sanctum')->get('/v1/users/current', [UserController::class, 'currentUser']);
