<?php

namespace App\Http\Controllers;

use App\Models\Antena;
use Illuminate\Http\Request;

class AntenaController extends Controller
{
    public function index()
    {
        $antenas = Antena::all();
        return response()->json($antenas);
    }

    public function show($id)
    {
        $antena = Antena::findOrFail($id);
        return response()->json($antena);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'descricao' => 'required|string|unique:antenas|min:10|max:100',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'uf' => 'required|string|size:2',
            'altura' => 'required|numeric|min:0.01',
            'data_implantacao' => 'nullable|date',
            'foto' => 'nullable|file|mimes:jpg,png|max:2048',
        ]);

        $antena = Antena::create($validatedData);
        return response()->json($antena, 201);
    }

    // Atualiza uma antena existente
    public function update(Request $request, $id)
    {
        $antena = Antena::findOrFail($id);

        $validatedData = $request->validate([
            'descricao' => 'required|string|min:10|max:100|unique:antenas,descricao,' . $antena->id,
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'uf' => 'required|string|size:2',
            'altura' => 'required|numeric|min:0.01',
            'data_implantacao' => 'nullable|date',
            'foto' => 'nullable|mimes:jpg,png|max:2048'
        ]);

        $antena->update($validatedData);
        return response()->json($antena);
    }

    // Deleta uma antena
    public function destroy($id)
    {
        $antena = Antena::findOrFail($id);
        $antena->delete();
        return response()->json(['message' => 'Antena deletada com sucesso.'], 200);
    }
}
