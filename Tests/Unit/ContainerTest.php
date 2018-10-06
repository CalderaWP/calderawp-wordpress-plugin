<?php

namespace calderawp\WordPressPlugin\Tests\Unit;

use calderawp\WordPressPlugin\Blocks\Collection;
use calderawp\WordPressPlugin\Container;

class ContainerTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Container::__construct()
     * @covers \calderawp\WordPressPlugin\Container::$rootUrl
     * @covers \calderawp\WordPressPlugin\Container::getRootUrl()
     */
    public function testGetRootUrl()
    {
        $url = 'https://foo.com';
        $container = new Container(
            'a',
            $url
        );
        $this->assertEquals($url, $container->getRootUrl());
    }

    /**
     * @covers \calderawp\WordPressPlugin\Container::$packageName
     * @covers \calderawp\WordPressPlugin\Container::$namespace
     */
    public function testInitBlocks()
    {
        $url = 'https://foo.com';

        $dir = 'foo/bar';
        $container = new Container(
            $dir,
            $url
        );

        $blocksJson = $this->getBlocksJson();
        $container->initBlocks(
            $blocksJson
        );
        $this->assertEquals(1,
            $container->
            getBlockCollection()
                ->getCount()
        );
        $this->assertAttributeEquals(
            $blocksJson['namespace'],
            'namespace',
            $container
        );
        $this->assertAttributeEquals(
            $blocksJson['packageName'],
            'packageName',
            $container
        );

    }


    /**
     * @covers \calderawp\WordPressPlugin\Container::__construct()
     * @covers \calderawp\WordPressPlugin\Container::$dirName
     * @covers \calderawp\WordPressPlugin\Container::getDirName()
     */
    public function testGetDirName()
    {
        $dir = 'foo/bar';
        $container = new Container(
            $dir,
            'https://foo.com'
        );
        $this->assertEquals($dir, $container->getDirName());
    }

    /**
     * @covers \calderawp\WordPressPlugin\Container::setUpContainer()
     */
    public function testSetUpContainer()
    {
        $container = new Container(
            'a',
            'https://foo.com'
        );
        $this->assertEquals(
            Collection::class,
            get_class($container->getBlockCollection())
        );
    }
}
