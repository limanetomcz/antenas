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

}

