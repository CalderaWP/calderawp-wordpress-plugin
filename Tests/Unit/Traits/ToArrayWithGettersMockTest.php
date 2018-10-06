<?php

namespace calderawp\WordPressPlugin\Tests\Unit\Traits;

use calderawp\WordPressPlugin\Tests\Mock\ToArrayWithGettersMock;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class ToArrayWithGettersMockTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Tests\Mock\ToArrayWithGettersMock::toArray()
     */
    public function testToArray()
    {
        $obj = new ToArrayWithGettersMock();
        $obj->setFood( 'tacos' )->setCount(2);
        $array = $obj->toArray();
        $this->assertEquals(
            2,
            $array[ 'count' ]
        );
        $this->assertEquals(
            'tacos',
            $array['food']
        );


    }


}
