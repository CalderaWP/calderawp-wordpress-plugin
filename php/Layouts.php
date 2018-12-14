<?php


namespace calderawp\WordPressPlugin;


use calderawp\WordPressPlugin\RestApi\Response;

class Layouts
{

	protected $layouts;
	public function __construct(array $layouts = [])
	{
		if( ! empty( $layouts) ){
			$this->addLayouts($layouts);
		}
	}

	public function addLayouts(array $layouts )
	{
		foreach ( $layouts as $layout ){
			$this->addLayout($layout);
		}

		return $this;
	}

	public function addLayout( Layout $layout ){
		$this->layouts[] = $layout;
		return $this;
	}

	public static function fromWpPosts(array $posts )
	{
		$collection = [];
		foreach ($posts as $post ){
			$collection[] = Layout::fromWpPost($post);
		}
		return new static($collection);
	}

	public function toArray()
	{
		$output = [];
		if (! empty( $this->layouts)) {
			foreach ( $this->layouts as $layout ) {
				$output[] = $layout->toArray();
			}
		}
		return $output;
	}

	/**
	 * @param int $statusCode
	 * @param array $headers
	 *
	 * @return Response
	 */
	public function toResponse($statusCode = 200, array $headers = []): Response
	{
		return (new Response($this->toArray($statusCode, $headers)));
	}
}
