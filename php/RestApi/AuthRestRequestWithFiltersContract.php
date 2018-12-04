<?php


namespace calderawp\WordPressPlugin\RestApi;


interface AuthRestRequestWithFiltersContract
{

	/**
	 * @param bool $allowed Is request allowed
	 * @param string $formId ID of form being requested
	 * @param \WP_REST_Request $request Current REST API request
	 *
	 * @return bool
	 */
	public function checkRequest($allowed, $formId, \WP_REST_Request $request);

}