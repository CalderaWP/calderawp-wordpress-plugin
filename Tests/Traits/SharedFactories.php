<?php


namespace calderawp\WordPressPlugin\Tests\Traits;


use calderawp\WordPressPlugin\Blocks\BlockType;

trait SharedFactories
{
    /**
     * @return BlockType
     */
    protected function blockTypeFactory(): BlockType
    {
        $blockType = new BlockType();
        return $blockType
            ->setSlug('foo')
            ->setWpDependencies(
                [
                    'wp-blocks',
                    'wp-editor'
                ]
            );


    }

    protected function getBlocksJson() : array
    {
        $path = dirname(__FILE__, 3).'/blocks.json';
        return json_decode( file_get_contents( $path ), true );
    }
}