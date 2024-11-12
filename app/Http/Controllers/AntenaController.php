<?php

namespace App\Http\Controllers;

use App\Services\Contracts\AntenaServiceInterface;
use App\Validators\AntenaValidator;
use Illuminate\Http\Request;

class AntenaController extends Controller
{
    public function __construct(
        protected AntenaServiceInterface $service,
        protected AntenaValidator $validator
    ) {}

    public function index()
    {
        return $this->service->getAll();
    }

    public function dashRanking()
    {
        return $this->service->dashRanking();
    }

    public function show($id)
    {
        return $this->service->findById($id);
    }

    public function store(Request $request)
    {
        $validator = $this->validator->validate($request->all());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $result = $this->service->create($validator->validated());

        return response()->json($result, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = $this->validator->validate($request->all(), $id);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $result = $this->service->update($id, $validator->validated());

        return response()->json($result);
    }

    public function destroy($id)
    {
        $this->service->delete($id);
        return response()->json(['message' => 'Antena deletada com sucesso.'], 200);
    }
}
