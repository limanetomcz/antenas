<?php

namespace App\Services;

use App\Services\Contracts\AntenaServiceInterface;
use App\Repositories\Contracts\AntenaRepositoryInterface;

class AntenaService implements AntenaServiceInterface
{
    public function __construct(protected AntenaRepositoryInterface $repository)
    {
    }

    public function getAll()
    {
        return $this->repository->findAll();
    }

    public function findAntenaById($id)
    {
        return $this->repository->findById($id);
    }

    public function createAntena(array $data)
    {
        if (request()->hasFile('foto')) {
            $data['foto'] = request()->file('foto'); 
        }
        return $this->repository->create($data);
    }

    public function updateAntena($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function deleteAntena($id)
    {
        return $this->repository->delete($id);
    }
}