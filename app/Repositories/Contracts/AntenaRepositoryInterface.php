<?php

namespace App\Repositories\Contracts;

interface AntenaRepositoryInterface
{
    public function findAll();

    public function findById($id);

    public function create(array $data);

    public function update(String $id, array $data);

    public function delete(String $id);

    public function dashRanking();

}