<?php


namespace calderawp\WordPressPlugin;


use calderawp\WordPressPlugin\RestApi\Response;

class Exception extends \Exception
{
    /**
     * @param array $data
     * @return \WP_Error
     */
    public function toWpError(array $data = []): \WP_Error
    {
        return new \WP_Error($this->getCode(), $this->getMessage(), $data);
    }

    public function toResponse(array $data = [], array $headers = []): \WP_REST_Response
    {
        $data = array_merge($data, ['message' => $this->getMessage()]);
        return new Response($data, absint($this->getCode() ? $this->getCode() : 500), $headers);
    }

    /**
     * Convert any Exception to this type of Exception
     *
     * @param \Exception $exception
     * @return Exception
     */
    public static function formOtherException(\Exception $exception): self
    {
        return new static(
            $exception->getMessage(),
            $exception->getCode(),
            $exception);
    }

    /**
     * Convert a WP_Error object to an Exception
     * @param \WP_Error $error
     * @return Exception
     */
    public static function fromWpError(\WP_Error $error): self
    {
        return new static(
            $error->get_error_message(),
            $error->get_error_code()
        );
    }
}