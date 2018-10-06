<?php
/*
  Plugin Name: Caldera WordPress Plugin
  Plugin URI: https://CalderaForms.com
  Description: Drag and drop blockchain
  Author: Caldera Labs
  Version: 0.0.1
  Author URI: http://CalderaLabs.org
  Text Domain: caldera-wordpress-plugin
  GitHub Plugin URI: https://github.com/CalderaWP/caldera-wordpress-plugin
*/


do_action( 'calderawp/WordPressPlugin/init', new \calderawp\WordPressPlugin\Container(
    plugin_dir_path( __FILE__ ),
    plugins_url('', __FILE__ )
));

add_action( 'calderawp/WordPressPlugin/init', function( \calderawp\WordPressPlugin\Container $container){
    $container->initBlocks(
        json_decode(
            file_get_contents( __DIR__ . '/blocks.json' ),
            true
        )
    );
} );

include_once __DIR__ .'/vendor/autoload.php';