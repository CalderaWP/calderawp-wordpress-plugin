<?php

namespace calderawp\WordPressPlugin\Tests\Unit\Blocks;

use calderawp\WordPressPlugin\Blocks\Attribute;
use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class BlockTypeTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::setCategory()
     */
    public function testSetCategory()
    {
        $category = 'widget';
        $blockType = new BlockType();

        $blockType
            ->setCategory($category);

        $this->assertAttributeEquals(
            $category,
            'category',
            $blockType
        );
    }

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::getCategory()
     */
    public function testGetCategory()
    {
        $this->assertEquals(
            'common',
            (new BlockType() )->getCategory()
        );

        $this->assertEquals(
            'widget',
            (new BlockType() )->setCategory('widget')->getCategory()
        );
    }

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::getWpDependencies()
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::$wpDependencies
     */
    public function testGetWpDependencies()
    {

        $deps = [
            'wp-blocks',
            'components',
            'editor',
            'wp-api-request'
        ];
        $blockType = new BlockType();

        $blockType
            ->setWpDependencies($deps);

        $this->assertEquals(
            [
                'wp-blocks',
                'wp-components',
                'wp-editor',
                'wp-api-request'
            ],
            $blockType->getWpDependencies()
        );

    }

    /**
     *
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::setWpDependencies()
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::$wpDependencies
     */
    public function testSetWpDependencies()
    {
        $deps = [
            'wp-blocks'
        ];
        $blockType = new BlockType();

        $blockType
            ->setWpDependencies($deps);

        $this->assertAttributeEquals(
            $deps,
            'wpDependencies',
            $blockType
        );
    }

	/**
	 *
	 * @covers \calderawp\WordPressPlugin\Blocks\BlockType::setRenderCallback()
	 * @covers \calderawp\WordPressPlugin\Blocks\BlockType::$renderCallback
	 */
	public function testSetRenderCallback()
	{
		$r = function(){};
		$blockType = new BlockType();

		$blockType
			->setRenderCallback($r);

		$this->assertAttributeEquals(
			$r,
			'renderCallback',
			$blockType
		);
	}

	/**
	 *
	 * @covers \calderawp\WordPressPlugin\Blocks\BlockType::setRenderCallback()
	 * @covers \calderawp\WordPressPlugin\Blocks\BlockType::getRenderCallback()
	 * @covers \calderawp\WordPressPlugin\Blocks\BlockType::$renderCallback
	 */
	public function testGetRenderCallback()
	{
		$r = function(){};
		$blockType = new BlockType();

		$blockType
			->setRenderCallback($r);

		$this->assertEquals(
			$r,
			$blockType->getRenderCallback()
		);
	}

	/**
     *
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::getAttributes()
     * @covers \calderawp\WordPressPlugin\Blocks\BlockType::setAttributes()
     * @covers \calderawp\WordPressPlugin\Blocks\Attribute::fromArray()
     */
    public function testSetAttributes()
    {

        $data = [
            'type' => 'integer',
            'source' => 'aaaa',
            'selector' => 'image-now',
            'attribute' => 'img',
            'meta' => 'metafood',
        ];
        $attribute = Attribute::fromArray($data);
        $blockType = new BlockType();
        $blockType->setAttributes(
            [$attribute,$data]
        );
        $this->assertEquals(
            2,
            count( $blockType->getAttributes() )
        );

    }


    public function testGetAttributes()
    {

    }
}
