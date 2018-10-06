<?php

namespace calderawp\WordPressPlugin\Tests\Integration;

/**
 * Ensures that environment and depenencies are functioning
 */
class EnvironmentTest extends IntegrationTestCase
{


    public function testWordPresDatabaseApi()
    {
        $id = wp_insert_post([
            'post_title' => 'Hi Roy',
            'post_content' => 'Hi Roy',
        ]);

        $this->assertSame(
            'Hi Roy',
            get_post($id)->post_title
        );
    }


    public function testCalderaFormsIsActive()
    {
        $this->assertTrue( function_exists('caldera_forms_load') );
    }
}
