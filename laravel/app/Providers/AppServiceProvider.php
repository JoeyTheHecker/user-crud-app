<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('alpha_only', function ($attribute, $value, $parameters, $validator) {
            // Check if the value contains only alphabetical characters
            return preg_match('/^[A-Za-z]+$/', $value);
        });
    
        // Optionally, you can also provide a custom error message for the rule
        Validator::replacer('alpha_only', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'The :attribute must contain only alphabetical characters.');
        });
    }
}
