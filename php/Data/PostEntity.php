<?php


namespace calderawp\WordPressPlugin\Data;


use calderawp\WordPressPlugin\RestApi\Response;

abstract class PostEntity implements PostEntityContract
{

	/** @inheritdoc */
	public function toResponse($statusCode = 200, array $headers = [] ): Response{
		return new Response( $this->toArray(), $statusCode, $headers );
	}
}
