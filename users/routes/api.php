<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\UserController;
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


Route::group(
    [
        'prefix' => 'departments'
    ],
    function () {
        Route::get('/', [DepartmentController::class, 'index']);
        Route::get('/{departmentId}', [DepartmentController::class, 'show'])->where('departmentId', '[0-9]+');
    }
);

Route::group(
    [
        'prefix' => 'account',
    ],
    function () {
        Route::get('/by-user-email', [UserController::class, 'getUserByEmail']);
        Route::get('{user}', [UserController::class, 'getUserById']);
    }
);

Route::group(
    [
        'prefix' => 'auth',
    ],
    function () {
        Route::post('/login', [LoginController::class, 'login']);
        Route::post('/register', [RegisterController::class, 'register']);
        Route::post('/is-user-auth', [LoginController::class, 'isAuth']);
        Route::middleware('auth')->get('/logout', [LoginController::class, 'logout']);
    }
);
