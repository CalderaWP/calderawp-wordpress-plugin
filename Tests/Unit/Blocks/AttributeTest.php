<?php
namespace calderawp\WordPressPlugin\Tests\Unit\Blocks;


use calderawp\WordPressPlugin\Blocks\Attribute;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class AttributeTest extends TestCase
{


    /**
     * @covers Attribute::getAttribute();
     * @covers Attribute::setAttribute();
     * @covers Attribute::$attribute
     */
    public function testSetDefault()
    {
        $value = 'aaaa';
        $attribute = new Attribute();
        $this->assertEquals(
            $attribute
            ->setAttribute($value)
            ->getAttribute(),
            $value
        );
    }

    /**
     * @covers Attribute::getSelector();
     * @covers Attribute::setSelector();
     * @covers Attribute::$selector
     */
    public function testGetSelector()
    {
        $value = 'aaaa';
        $attribute = new Attribute();
        $this->assertEquals(
            $attribute
                ->setSelector($value)
                ->getSelector(),
            $value
        );
    }

    /**
     * @covers Attribute::setSource();
     * @covers Attribute::getSource();
     * @covers Attribute::$source
     */
    public function testGetSource()
    {
        $value = 'aaaa';
        $attribute = new Attribute();
        $this->assertEquals(
            $attribute
                ->setSource($value)
                ->getSource(),
            $value
        );

    }

    public function testSetType()
    {

    }

    public function testSetSource()
    {

    }

    public function testGetMeta()
    {

    }

    public function testSetSelector()
    {

    }

    public function testSetAttribute()
    {

    }

    public function testSetMeta()
    {

    }

    public function testFromArray()
    {

    }

    public function testGetType()
    {

    }


    public function testGetAttribute()
    {

    }

    public function testGetDefault()
    {

    }


    /**
     * @covers \calderawp\WordPressPlugin\Blocks\Attribute::fromArray()
     */
    public function fromArrayTest()
    {

        $data = [
            'type' => 'integer',
            'source' => 'aaaa',
            'selector' => 'image-now',
            'attribute' => 'img',
            'meta' => 'metafood',
        ];
        $attribute = Attribute::fromArray($data);
        $this->assertEquals(

           $data['type'],
            $attribute->getType()
        );
        $this->assertEquals(

            $data['source'],
            $attribute->getSource()
        );
        $this->assertEquals(

            $data['selector'],
            $attribute->getSelector()
        );
        $this->assertEquals(

            $data['attribute'],
            $attribute->getAttribute()
        );
        $this->assertEquals(

            $data['meta'],
            $attribute->getMeta()
        );

    }

}

