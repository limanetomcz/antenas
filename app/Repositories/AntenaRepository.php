<?php

namespace App\Repositories;

use App\Models\Antena;
use App\Repositories\Contracts\AntenaRepositoryInterface;

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
}
