<?php


namespace calderawp\WordPressPlugin\Tests\Unit\Contracts;


use calderawp\WordPressPlugin\Tests\Mock\RouteAdder;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class AddsRoutesTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Contracts\AddsRoutes::getNamespace()
     * @covers \calderawp\WordPressPlugin\Contracts\AddsRoutes::addRoutes()
     */
    public function testNamespace()
    {
        $adder = new RouteAdder();
        $namespace = 'hiroy';
        $adder->addRoutes($namespace);
        $this->assertEquals( $namespace, $adder->getNamespace());
    }
}