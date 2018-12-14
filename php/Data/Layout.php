<?php


namespace calderawp\WordPressPlugin\Data;


use calderawp\WordPressPlugin\RestApi\Response;

class Layout extends PostEntity
{
	/** @var string */
	protected $title;
	/** @var int */
	protected $ID;
	/** @var string */
	protected $content;
	/** @var string */
	protected $slug;


	/** @inheritdoc */
	public static function fromWpPost( \WP_Post $post ) {
		$obj = new static;
		$obj->setContent($post->post_content )
			->setTitle( $post->post_title )
			->setSlug($post->post_name )
			->setID($post->ID );
		return $obj;
	}

	/** @inheritdoc */
	public function toArray(): array {
		return [
			'title' => $this->getTitle(),
			'slug' => $this->getSlug(),
			'content' => $this->getContent(),
			'ID' => $this->getID()
		];

	}


	/**
	 * @return string
	 */
	public function getTitle(): string
	{
		return $this->title;
	}

	/**
	 * @param string $title
	 *
	 * @return Layout
	 */
	public function setTitle(string $title): Layout
	{
		$this->title = $title;
		return $this;
	}

	/**
	 * @return int
	 */
	public function getID(): int
	{
		return $this->ID;
	}

	/**
	 * @param int $ID
	 *
	 * @return Layout
	 */
	public function setID(int $ID): Layout
	{
		$this->ID = $ID;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getContent(): string
	{
		return $this->content;
	}

	/**
	 * @param string $content
	 *
	 * @return Layout
	 */
	public function setContent(string $content): Layout
	{
		$this->content = $content;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getSlug(): string
	{
		return $this->slug;
	}

	/**
	 * @param string $slug
	 *
	 * @return Layout
	 */
	public function setSlug(string $slug): Layout
	{
		$this->slug = $slug;
		return $this;
	}




}
