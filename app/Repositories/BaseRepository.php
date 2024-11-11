<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    public function __construct(protected Model $model)
    {
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function findById($id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(String $id, array $data)
    {
        return $this->model->find($id)->update($data);        
    }

    public function delete(String $id)
    {
        return $this->model->find($id)->delete(); 
    }
}
