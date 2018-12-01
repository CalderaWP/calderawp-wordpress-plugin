<?php


namespace calderawp\WordPressPlugin\Blocks\RenderCallback;


interface RenderCallbackContract
{

	public function render(array $atts );


	/**
	 * @return array
	 */
	public function getDefaultAtts();

}