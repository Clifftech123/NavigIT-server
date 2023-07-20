class HttpCode {
  // 1xx Informational
  public static readonly CONTINUE: number = 100 // Continue
  public static readonly SWITCHING_PROTOCOLS: number = 101 // Switching Protocols
  public static readonly PROCESSING: number = 102 // Processing

  // 2xx Success
  public static readonly OK: number = 200 // OK
  public static readonly CREATED: number = 201 // Created
  public static readonly ACCEPTED: number = 202 // Accepted
  public static readonly NON_AUTHORITATIVE_INFORMATION: number = 203 // Non-Authoritative Information
  public static readonly NO_CONTENT: number = 204 // No Content
  public static readonly RESET_CONTENT: number = 205 // Reset Content
  public static readonly PARTIAL_CONTENT: number = 206 // Partial Content
  public static readonly MULTI_STATUS: number = 207 // Multi-Status
  public static readonly ALREADY_REPORTED: number = 208 // Already Reported
  public static readonly IM_USED: number = 226 // IM Used

  // 3xx Redirection
  public static readonly MULTIPLE_CHOICES: number = 300 // Multiple Choices
  public static readonly MOVED_PERMANENTLY: number = 301 // Moved Permanently
  public static readonly MOVED_TEMPORARILY: number = 302 // Found
  public static readonly SEE_OTHER: number = 303 // See Other
  public static readonly NOT_MODIFIED: number = 304 // Not Modified
  public static readonly USE_PROXY: number = 305 // Use Proxy
  public static readonly SWITCH_PROXY: number = 306 // Switch Proxy
  public static readonly TEMPORARY_REDIRECT: number = 307 // Temporary Redirect

  // 4xx Client Error
  public static readonly BAD_REQUEST: number = 400 // Bad Request
  public static readonly UNAUTHORIZED: number = 401 // Unauthorized
  public static readonly PAYMENT_REQUIRED: number = 402 // Payment Required
  public static readonly FORBIDDEN: number = 403 // Forbidden
  public static readonly NOT_FOUND: number = 404 // Not Found
  public static readonly METHOD_NOT_ALLOWED: number = 405 // Method Not Allowed
  public static readonly NOT_ACCEPTABLE: number = 406 // Not Acceptable
  public static readonly PROXY_AUTHENTICATION_REQUIRED: number = 407 // Proxy Authentication Required
  public static readonly REQUEST_TIMEOUT: number = 408 // Request Timeout
  public static readonly CONFLICT: number = 409 // Conflict
  public static readonly GONE: number = 410 // Gone
  public static readonly LENGTH_REQUIRED: number = 411 // Length Required
  public static readonly PRECONDITION_FAILED: number = 412 // Precondition Failed
  public static readonly PAYLOAD_TOO_LARGE: number = 413 // Payload Too Large
  public static readonly REQUEST_URI_TOO_LONG: number = 414 // URI Too Long
  public static readonly UNSUPPORTED_MEDIA_TYPE: number = 415 // Unsupported Media Type
  public static readonly REQUESTED_RANGE_NOT_SATISFIABLE: number = 416 // Range Not Satisfiable
  public static readonly EXPECTATION_FAILED: number = 417 // Expectation Failed
  public static readonly IM_A_TEAPOT: number = 418 // I'm a teapot
  public static readonly METHOD_FAILURE: number = 420 // Method Failure
  public static readonly MISDIRECTED_REQUEST: number = 421 // Misdirected Request
  public static readonly UNPROCESSABLE_ENTITY: number = 422 // Unprocessable Entity
  public static readonly LOCKED: number = 423 // Locked
  public static readonly FAILED_DEPENDENCY: number = 424 // Failed Dependency
  public static readonly UPGRADE_REQUIRED: number = 426 // Upgrade Required
  public static readonly PRECONDITION_REQUIRED: number = 428 // Precondition Required
  public static readonly TOO_MANY_REQUESTS: number = 429 // Too Many Requests
  public static readonly REQUEST_HEADER_FIELDS_TOO_LARGE: number = 431 // Request Header Fields Too Large
  public static readonly UNAVAILABLE_FOR_LEGAL_REASONS: number = 451 // Unavailable For Legal Reasons

  // 5xx Server Error
  public static readonly INTERNAL_SERVER_ERROR: number = 500 // Internal Server Error
  public static readonly NOT_IMPLEMENTED: number = 501 // Not Implemented
  public static readonly BAD_GATEWAY: number = 502 // Bad Gateway
  public static readonly SERVICE_UNAVAILABLE: number = 503 // Service Unavailable
  public static readonly GATEWAY_TIMEOUT: number = 504 // Gateway Timeout
  public static readonly HTTP_VERSION_NOT_SUPPORTED: number = 505 // HTTP Version Not Supported
  public static readonly VARIANT_ALSO_NEGOTIATES: number = 506 // Variant Also Negotiates
  public static readonly INSUFFICIENT_STORAGE: number = 507 // Insufficient Storage
  public static readonly LOOP_DETECTED: number = 508 // Loop Detected
  public static readonly NOT_EXTENDED: number = 510 // Not Extended
  public static readonly NETWORK_AUTHENTICATION_REQUIRED: number = 511 // Network Authentication Required
  public static readonly NETWORK_CONNECT_TIMEOUT_ERROR: number = 599 // Network Connect Timeout Error
}

export default HttpCode
