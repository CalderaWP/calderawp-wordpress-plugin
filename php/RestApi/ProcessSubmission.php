<?php


namespace calderawp\WordPressPlugin\RestApi;


use calderawp\calderaforms\cf2\RestApi\Endpoint;

class ProcessSubmission extends Endpoint
{



	public function getUri()
	{
		return '/forms/<formId>';
	}

	public function getArgs()
	{

	}
}
