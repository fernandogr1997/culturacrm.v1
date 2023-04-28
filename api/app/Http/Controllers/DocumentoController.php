<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class DocumentoController extends Controller
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
    public function store(Request $request, $id)
    {

        // Comprueba si la carpeta no existe, si es así la crea
        $path = public_path() . '/Archivos/' . $id;
        $doc_path = '/api/public/Archivos/'.$id;

        // Carga los archivos en la carpeta correspondiente
        $file = $request->file('file');
        $filename = uniqid() . $file->getClientOriginalName();
        $file->move($path, $filename);

        Documento::create([
            'id_client' => $id,
            'doc_name' => $filename,
            'doc_path' => $doc_path . '/' . $filename
        ]);

        return response()->json(['message' => 'Archivos cargados exitosamente']);
    }
   
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Documentos = DB::table('documentos')
            ->where('id_client', '=', $id)
            ->orderByDesc('created_at')
            ->get();

        return $Documentos;
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
