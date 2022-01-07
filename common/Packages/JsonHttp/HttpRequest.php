<?php

namespace Common\Packages\JsonHttp;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response as GuzzleResponse;
use stdClass;

trait HttpRequest
{
    private Client $http;

    public function __construct(Client $client)
    {
        $this->http = $client;
    }

    /**
     * Http get запрос
     *
     * @param string $endpoint
     * @param array $options
     * @return stdClass
     */
    public function getRequest(string $endpoint, array $options = []): stdClass
    {
        return $this->send('GET', $endpoint, $options);
    }

    /**
     * Http post запрос
     *
     * @param string $endpoint
     * @param array $options
     * @return stdClass
     */
    public function postRequest(string $endpoint, array $options = []): stdClass
    {
        return $this->send('POST', $endpoint, $options);
    }

    private function send(string $method, string $endpoint, array $options = []): stdClass
    {
        $response = $this->http->request($method, $endpoint, $options);
        return json_decode($response->getBody()->getContents());
    }
}