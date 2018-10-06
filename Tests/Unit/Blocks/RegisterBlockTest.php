<?php

namespace calderawp\WordPressPlugin\Tests\Unit\Blocks;

use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Blocks\RegisterBlock;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;

class RegisterBlockTest extends TestCase
{

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
            $register->filePath('food' )
        );
    }


}
