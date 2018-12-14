<?php


namespace calderawp\WordPressPlugin\RestApi;


trait ChecksRequestWithJWT
{

	public function checkRequest($allowed, $formId, \WP_REST_Request $request)
	{
		if( $allowed || empty( $request->get_param( 'jwtToken')) ){
			return $allowed;
		}

		$secret_key = defined('JWT_AUTH_SECRET_KEY') ? JWT_AUTH_SECRET_KEY : false;


		/** Try to decode the token */
		try {
			$token = \Firebase\JWT\JWT::decode($request->get_param('jwtToken'), $secret_key, array('HS256'));
			return true;
		}catch (\Exception $e){
			return ( \calderawp\WordPressPlugin\Exception::formOtherException($e))->toResponse();
		}

	}
}
