<?php

namespace App\Providers;

use App\Repositories\Contracts\AntenaRepositoryInterface;
use App\Repositories\AntenaRepository;
use Illuminate\Support\ServiceProvider;

class AntenaRepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AntenaRepositoryInterface::class, AntenaRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}