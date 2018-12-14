<?php


namespace calderawp\WordPressPlugin\Data;


interface PostsCollectionContract extends CollectionContract
{

	/**
	 * @param \WP_Post[] $posts
	 *
	 * @return $this
	 */
	public static function fromWpPosts(array $posts );
}
