<?php

namespace App\Services;

use App\Services\Contracts\AntenaServiceInterface;
use App\Repositories\Contracts\AntenaRepositoryInterface;
use Illuminate\Support\Facades\Storage;

class AntenaService implements AntenaServiceInterface
{
    public function __construct(protected AntenaRepositoryInterface $repository) {}

    public function getAll()
    {
        return $this->repository->findAll();
    }

    public function findById($id)
    {
        return $this->repository->findById($id);
    }

    public function create(array $data)
    {
        if (request()->hasFile('foto')) {
            $data['foto'] = request()->file('foto');
        }
        return $this->repository->create($data);
    }

    public function update($id, array $data)
    {
        $antena = $this->repository->findById($id);

        if (request()->hasFile('foto')) {

            if ($antena->foto) {
                Storage::disk('public')->delete($antena->foto);
            }

            $data['foto'] = request()->file('foto')->store('antenas/fotos', 'public');
        }

        return $this->repository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }
}
