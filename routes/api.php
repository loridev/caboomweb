<?php

use App\Http\Controllers\LevelController;
use App\Http\Controllers\UserController;
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

// Route::middleware(['middleware' => 'auth:sanctum'], function () {
//     Route::get('/v1/users/current', [UserController::class, 'currentUser']);
// });

Route::middleware('auth:sanctum')->get('/v1/users/current', [UserController::class, 'currentUser']);
