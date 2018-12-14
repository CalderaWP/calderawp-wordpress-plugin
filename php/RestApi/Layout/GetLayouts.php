<?php


namespace calderawp\WordPressPlugin\RestApi\Layout;


use calderawp\calderaforms\cf2\RestApi\Endpoint;
use calderawp\WordPressPlugin\Data\Layouts;
use calderawp\WordPressPlugin\RestApi\ChecksRequestWithJWT;

class GetLayouts extends Endpoint
{
	use ChecksRequestWithJWT;

	protected function getUri()
	{
		return 'layouts';
	}

	protected function getArgs()
	{
		return [
			'methods'=>['GET'],
			'permissions_callback' => [ $this, 'checkRequest' ],
			'callback' => [$this,'getLayouts'],
			'args' => [
				'page' => [
					'type' => 'integer',
					'default' => 1
				]
			]
		];
	}

	public function getLayouts(\WP_REST_Request $request){

		return (
			Layouts::fromWpPosts(get_posts( [
				'post_type' => LAYOUT_POST_TYPE,
				'post_author' => get_current_user_id(),
				'page' => $request->get_param('page' )
			]))
		)->toResponse();

	}


}
