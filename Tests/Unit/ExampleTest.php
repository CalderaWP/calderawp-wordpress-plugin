<?php

namespace calderawp\WordPressPlugin\Tests\Unit;

use calderawp\WordPressPlugin\Something;

/**
 * Class ExampleTest
 *
 * An example unit test
 *
 */
class ExampleTest extends TestCase
{
	/**
	 * Super basic test for educational purposes
	 *
	 * @covers TestCase
	 */
	public function testTheTruth()
	{
		//What should the value be?
		$excepted = true;
		//What is the value actually
		$actual = false;
		//Are they not the same?
		$this->assertNotEquals($excepted, $actual);
	}

    /**
     * @covers \calderawp\WordPressPlugin\Something::hiRoy()
     */
	public function testSomething()
    {
        $something = new Something();
        $this->assertSame( 'Hi Roy', $something->hiRoy() );
    }
}
