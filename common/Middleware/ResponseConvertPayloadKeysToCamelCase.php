<?php

declare(strict_types=1);

namespace Common\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ResponseConvertPayloadKeysToCamelCase
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $json = json_decode($response->getContent(), true);

        if ($json) {
            $replaced = [];
            foreach ($json as $key => $value) {
                $replaced[Str::camel($key)] = $value;
            }
            $response->setContent(json_encode($replaced));
        }

        return $response;
    }
}