<?php


namespace calderawp\WordPressPlugin\Data;


use calderawp\WordPressPlugin\RestApi\Response;

interface DataContract
{

	/**
	 * @return array
	 */
	public function toArray(): array;

	/**
	 * @param int $statusCode
	 * @param array $headers
	 *
	 * @return Response
	 */
	public function toResponse($statusCode = 200, array $headers = []): Response;
}
