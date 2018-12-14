<?php


namespace calderawp\WordPressPlugin\RestApi;


use calderawp\calderaforms\cf2\RestApi\Endpoint;
use calderawp\WordPressPlugin\Layout;

class GetLayout  extends Endpoint
{
	use ChecksRequestWithJWT;

	protected function getUri()
	{
		return 'layouts/(?P<id>\d+)';
	}

	protected function getArgs()
	{
		return [
			'methods'=>['GET'],
			'permissions_callback' => [ $this, 'checkRequest' ],
			'callback' => [$this,'getLayout'],
		];
	}

	public function getLayout(\WP_REST_Request $request){
		return (Layout::fromWpPost(get_post($request['id'])))->toResponse();
	}


}
