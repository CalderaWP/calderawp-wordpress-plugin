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

    public function testGetWpDependencies()
    {

    }

    public function testGetAttributes()
    {

    }
}
