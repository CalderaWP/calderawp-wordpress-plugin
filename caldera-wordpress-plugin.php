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

include_once __DIR__ . '/vendor/autoload.php';


add_action( 'calderawp/WordPressPlugin/init', function( \calderawp\WordPressPlugin\Container $container){
    $container->initBlocks(
        json_decode(
            file_get_contents( __DIR__ . '/blocks.json' ),
            true
        )
    );
},1 );

add_action( 'calderawp/WordPressPlugin/init', function( \calderawp\WordPressPlugin\Container $container){
    add_action( 'init', function() use($container) {
        $container->registerBlocks();

    });
}, 3 );


do_action( 'calderawp/WordPressPlugin/init', new \calderawp\WordPressPlugin\Container(
    plugin_dir_path( __FILE__ ),
    plugins_url('', __FILE__ )
));