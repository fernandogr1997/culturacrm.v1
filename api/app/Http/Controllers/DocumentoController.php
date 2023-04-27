<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request, $id)
    {
        $files = $request->file('file');
        
        // foreach ($files as $file) {
        //     $path = $file->store('/public/'.$id);
        //     if (Storage::putFileAs('/public/'. $id . '/', $file, $file->getClientOriginalName())) {
        //         Documento::create([
        //             'id_client' => $id,
        //             'doc_name' => $file->getClientOriginalName(),
        //             'doc_path' => $path
        //         ]);
        //     } else {
        //         return response()->json([
        //             'error' => 'Error al guardar el archivo.'
        //         ], 500);
        //     }
        // }
        
        return response()->json([
            'respuesta' => $files
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Documento $documento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Documento $documento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Documento $documento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Documento $documento)
    {
        //
    }
}
