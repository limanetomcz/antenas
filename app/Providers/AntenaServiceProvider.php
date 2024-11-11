<?php

namespace App\Providers;

use App\Services\Contracts\AntenaServiceInterface;
use App\Services\AntenaService;
use Illuminate\Support\ServiceProvider;

class AntenaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AntenaServiceInterface::class, AntenaService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}