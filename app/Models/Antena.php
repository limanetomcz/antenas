<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Antena extends Model
{
    protected $fillable = ['descricao', 'latitude', 'longitude', 'uf', 'altura', 'data_implantacao', 'foto'];

    protected $keyType = 'string';
    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function ($antena) {
            $antena->id = (string) Str::uuid();
        });
    }
}
