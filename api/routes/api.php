<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\DocumentoController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::get('/token', 'token');

});

Route::controller(ClientController::class)->group(function () {
    Route::get('/clients','index'); 
    Route::post('/new_client','store');
    Route::get('/client/show/{id}','show');
    Route::put('/client/update/{id}','update');
    Route::put('/client/proceso/{id}','proceso');
    Route::put('/client/eliminar/{id}','dead');
    Route::delete('/client/{id}','destroy');
});

Route::controller(ComentarioController::class)->group(function () {
    Route::post('/new_comentario','store');
    Route::get('/comentarios/{id}','show');
});

Route::controller(DocumentoController::class)->group(function () {
    Route::post('/news_documentos/{id}','store');
    Route::get('/comentarios/{id}','show');
});

// Route::controller(PdfController::class)->group(function () {
//     Route::post('/verpdf','VerPdf');
//     Route::post('/descargarpdf','DescargarPdf');

// });

// Route::controller(GastosController::class)->group(function () {
//     Route::get('/tickets','index'); 
//     Route::post('/nuevoticket','store');
//     Route::get('/ticket/{id}','show');
//     Route::put('/ticket/{id}','update');
//     Route::delete('/tiket/{id}','destroy');

// });

Route::middleware(['auth:sanctum'])->group(function () {
      
    Route::get('/logout',[AuthController::class, 'logout']);
});