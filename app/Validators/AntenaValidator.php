<?php

namespace App\Validators;

use Illuminate\Validation\Factory as ValidatorFactory;

class AntenaValidator
{
    public function __construct(protected ValidatorFactory $validator)
    {
    }

    public function validate(array $data, $id = null)
    {
        $rules = [
            'descricao' => 'required|string|min:10|max:100|unique:antenas,descricao' . ($id ? ',' . $id : ''),
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'uf' => 'required|string|size:2',
            'altura' => 'required|numeric|min:0.01',
            'data_implantacao' => 'nullable|date',
            'foto' => 'nullable|file|mimes:jpg,png|max:2048',
        ];

        return $this->validator->make($data, $rules);
    }
}
