<?php


namespace calderawp\WordPressPlugin\RestApi;


class NonceCheck
{


    protected $nonceAction;

    protected $nonceParamName;

    /**
     * @var callable
     */
    protected $callback;
    public function __construct(callable $callback)
    {
        $this->callback = $callback;
    }

    /**
     * @param mixed $nonceAction
     * @return NonceCheck
     */
    public function setNonceAction($nonceAction): self
    {
        $this->nonceAction = $nonceAction;
        return $this;
    }

    /**
     * @param mixed $nonceParamName
     * @return NonceCheck
     */
    public function setNonceParamName($nonceParamName): self
    {
        $this->nonceParamName = $nonceParamName;
        return $this;
    }


    /**
     * @param \WP_REST_Request $request
     * @return bool
     */
    public function verifyRequest(\WP_REST_Request $request) : bool
    {
        return  true === call_user_func(
                $this->callback,
                $request->get_param($this->nonceParamName),
                $this->nonceAction
        );
    }

}