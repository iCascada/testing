export const HttpResponse = {
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
  },
  CLIENT_ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    PAYLOAD_TOO_LARGE: 413,
    UNPROCESSABLE_ENTITY: 422,
  },
  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    SSL_HANDSHAKE_FAILED: 525,
    NETWORK_CONNECT_TIMEOUT_ERROR: 599,
  },
};