<?php

namespace App\Services\Contracts;

interface AntenaServiceInterface
{
    public function getAll();

    public function findAntenaById($id);

    public function createAntena(array $data);

    public function updateAntena($id, array $data);

    public function deleteAntena($id);
}