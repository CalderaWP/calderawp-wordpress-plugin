<?php

namespace calderawp\WordPressPlugin\Tests\Unit\Blocks;

use calderawp\WordPressPlugin\Blocks\Attribute;
use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Blocks\Collection;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class CollectionTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::setNamespace()
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::getNamespace()
     */
    public function testGetNamespace()
    {
        $collection =( new Collection() )->setNamespace('nom');
        $this->assertEquals('nom', $collection->getNamespace() );

    }

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::setBlocks()
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::getCount()
     */
    public function testSetBlocks()
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
        $blockTypeTwo = $blockType->toArray();
        $blockTypeTwo[ 'slug' ] = 'aaa';

        $collection = new Collection();
        $collection->setBlocks([
            $blockType,
            $blockTypeTwo
        ]);
        $this->assertEquals(
            2,
            count( $collection->getBlocks() )
        );
        $this->assertEquals(
            2,
             $collection->getCount()
        );
    }

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::getCount()
     */
    public function testGetCountEmpty()
    {
        $collection = new Collection();
        $this->assertEquals(
            0,
            $collection->getCount()
        );
    }


    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::setPackageName()
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::$packageName
     */
    public function testSetPackageName()
    {
        $collection =( new Collection() )->setPackageName('nom');
        $this->assertAttributeEquals('nom','packageName', $collection );
    }


    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::setNamespace()
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::$namespace
     */
    public function testSetNamespace()
    {
        $collection =( new Collection() )->setNamespace('nom');
        $this->assertAttributeEquals('nom','namespace', $collection );

    }

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::setNamespace()
     * @covers \calderawp\WordPressPlugin\Blocks\Collection::getNamespace()
     */
    public function testGetPackageName()
    {
        $collection =( new Collection() )->setNamespace('nom');
        $this->assertEquals('nom', $collection->getNamespace() );
    }
}
