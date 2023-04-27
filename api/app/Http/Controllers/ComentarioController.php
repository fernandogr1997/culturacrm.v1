<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ComentarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'comentario' => 'required',
        ], [
            'comentario.required' => 'Campo es obligatorio',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $Client = new Comentario();
        $Client->id_client = $request->id_client;
        $Client->user_name = $request->user_name;
        $Client->comentario = $request->comentario;
        $Client->save();

        return response()
            ->json(['respuesta' => 'Datos guardados exitosamente.']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $comentarios = DB::table('comentarios')
            ->where('id_client', '=', $id)
            ->orderByDesc('created_at')
            ->get();
        
        return $comentarios;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comentario $comentario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comentario $comentario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comentario $comentario)
    {
        //
    }
}
