<?php

namespace App\Repositories;

use App\Models\Antena;
use App\Repositories\Contracts\AntenaRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AntenaRepository extends BaseRepository implements AntenaRepositoryInterface
{
    public function __construct(Antena $model)
    {
        parent::__construct($model);
    }

    public function create(array $data)
    {

        if (isset($data['foto']) && $data['foto'] instanceof \Illuminate\Http\UploadedFile) {

            $path = $data['foto']->store('antenas/fotos', 'public');

            $data['foto'] = $path;
        }

        return $this->model->create($data);
    }

    public function update($id, array $data)
    {

        $antena = $this->model->findOrFail($id);

        if (isset($data['foto']) && $data['foto'] instanceof \Illuminate\Http\UploadedFile) {

            if ($antena->foto) {
                Storage::disk('public')->delete($antena->foto);
            }

            $path = $data['foto']->store('antenas/fotos', 'public');
            $data['foto'] = $path;
        }

        $antena->update($data);

        return $antena;
    }

    public function dashRanking()
    {
        $ranking = $this->model
            ->select('uf', DB::raw('COUNT(*) as quantidade'))
            ->groupBy('uf')
            ->orderByDesc('quantidade')
            ->limit(5)
            ->get();

        return response()->json($ranking);
    }
}
