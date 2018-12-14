<?php


namespace calderawp\WordPressPlugin\Data;


interface PostEntityContract extends EntityContract
{

	/**
	 * @param \WP_Post $post
	 *
	 * @return $this
	 */
	public static function fromWpPost(\WP_Post $post);
}
