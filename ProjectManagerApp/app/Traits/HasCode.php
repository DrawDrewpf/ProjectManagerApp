<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasCode
{
    /**
     * Boot the trait
     */
    protected static function bootHasCode()
    {
        static::creating(function ($model) {
            if (empty($model->code)) {
                $model->code = $model->generateCode();
            }
        });
    }

    /**
     * Generate a unique code for the model
     */
    public function generateCode()
    {
        $prefix = $this->getCodePrefix();
        $lastRecord = static::where('code', 'like', $prefix . '%')
            ->orderBy('code', 'desc')
            ->first();
        
        if ($lastRecord) {
            // Extract the number from the last code
            $lastNumber = (int) substr($lastRecord->code, strlen($prefix));
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }
        
        return $prefix . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }

    /**
     * Get the code prefix for the model
     */
    protected function getCodePrefix()
    {
        return match (class_basename($this)) {
            'Project' => 'PRJ-',
            'Task' => 'TSK-',
            'User' => 'USR-',
            default => 'GEN-'
        };
    }

    /**
     * Find a model by its code
     */
    public static function findByCode($code)
    {
        return static::where('code', $code)->first();
    }    /**
     * Get route key name (to use codes in routes instead of IDs)
     */
    public function getRouteKeyName()
    {
        return 'code';
    }
}
