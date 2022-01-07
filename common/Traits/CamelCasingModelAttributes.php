<?php

declare(strict_types=1);

namespace Common\Traits;

use Illuminate\Support\Str;

trait CamelCasingModelAttributes
{
    /**
     * Get an attribute from the model.
     *
     * @param  string  $key
     */
    public function getAttribute($key)
    {
        if (array_key_exists($key, $this->relations)) {
            return parent::getAttribute($key);
        } else {
            return parent::getAttribute(Str::snake($key));
        }
    }

    /**
     * Set a given attribute on the model.
     *
     * @param  string  $key
     * @param  mixed  $value
     */
    public function setAttribute($key, $value)
    {
        return parent::setAttribute(Str::snake($key), $value);
    }

    public function toCamelCase($key)
    {
        return Str::camel($key);
    }
}