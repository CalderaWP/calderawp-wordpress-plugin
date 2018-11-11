<?php

namespace calderawp\WordPressPlugin\Tests\Integration;

use calderawp\WordPressPlugin\Blocks\RegisterBlock;

class RegisterBlockTest extends IntegrationTestCase
{

    public function testRegister()
    {
        $dir = '/var/www/html/wp-content/plugins/caldera-wordpress-plugin';
        $url = 'http://localhost:8218/wp-content/plugins/caldera-wordpress-plugin';
        $blockType = $this->blockTypeFactory();
        $slug = 'entry';
        $namespace = 'salad';
        $blockType->setSlug($slug);
        $register = new RegisterBlock(
            $blockType,
            $dir,
            $url,
            $namespace
        );

        $register->register();
        $name = $register->blockName();
        $this->assertFalse(
            is_null( \WP_Block_Type_Registry::get_instance()->get_registered($name) )
        );

    }
}
