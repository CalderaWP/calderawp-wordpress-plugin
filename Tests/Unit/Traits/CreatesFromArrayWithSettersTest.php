<?php


namespace calderawp\WordPressPlugin\Tests\Unit\Traits;


use calderawp\WordPressPlugin\Tests\Mock\FromArrayWithSettersMock;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class CreatesFromArrayWithSettersTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Traits\FromArrayWithSettersMock::fromArray()
     */
    public function testFromArray()
    {
        $data = [
            'food' => 'tacos',
            'booms' => 1
        ];
       $obj =  FromArrayWithSettersMock::fromArray($data);
       $this->assertEquals(
           $data['food'],
           $obj->getFood()
       );
        $this->assertEquals(
            $data['booms'],
            $obj->getBooms()
        );


    }
}