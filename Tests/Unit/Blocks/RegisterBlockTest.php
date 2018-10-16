<?php

namespace calderawp\WordPressPlugin\Tests\Unit\Blocks;

use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Blocks\RegisterBlock;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class RegisterBlockTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\RegisterBlock::handle()
     */
    public function testHandle()
    {
        $register = new RegisterBlock(
            $this->blockTypeFactory(),
            'DIR/DIR',
            'https://example.com/wp-content/',
            'namespace'
        );

        $this->assertEquals(
            'foo-editor',
            $register->handle(false )
        );

        $this->assertEquals(
            'foo-front',
            $register->handle(true )
        );




    }

    /**
     * @covers \calderawp\WordPressPlugin\Blocks\RegisterBlock::blockName()
     */
    public function testBlockName()
    {
        $register = new RegisterBlock(
            $this->blockTypeFactory(),
            'DIR/DIR',
            'https://example.com/wp-content/',
            'namespace'
        );

        $this->assertEquals(
            'namespace/foo',
            $register->blockName()
        );
    }
    /**
     * @covers \calderawp\WordPressPlugin\Blocks\RegisterBlock::url()
     */
    public function testUrl()
    {
        $register = new RegisterBlock(
            $this->blockTypeFactory(),
            'DIR/DIR',
            'https://example.com/wp-content/',
            'namespace'
        );

        $this->assertEquals(
            'https://example.com/wp-content/food',
            $register->url('food' )
        );


    }
    /**
     * @covers \calderawp\WordPressPlugin\Blocks\RegisterBlock::filePath()
     */
    public function testFilePath()
    {

        $register = new RegisterBlock(
            $this->blockTypeFactory(),
            'DIR/DIR',
            'https://example.com/wp-content/',
            'namespace'
        );

        $this->assertEquals(
            'DIR/DIR/food',
            $register->filePath('/food' )
        );
    }

}
