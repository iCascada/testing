<?php

namespace Common\Packages\Auth;

use DateInterval;
use DateTime;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

class JwtService
{
    /**
     * Шифрование в формат JSON web token
     *
     * @param array $payload
     * @return string
     */
    public static function encode(array $payload): string
    {
        $dt = new DateTime();

        $payload['iat'] = $dt->getTimestamp();
        $payload['exp'] = $dt->add(new DateInterval('PT25M'))->getTimestamp();
        $payload['iss'] = env('APP_ISS');
        $payload['aud'] = env('APP_AUD');

        return JWT::encode($payload, env('APP_KEY'));
    }

    /**
     * Декодирование токена
     *
     * @param string $jwt
     * @return stdClass
     */
    public static function decode(string $jwt): stdClass
    {
        return JWT::decode($jwt, new Key(env('APP_KEY'), 'HS256'));
    }
}
