<?php

if( class_exists( 'WP_CLI' ) ){
    function calderaWordPresPluginImportTestFormsCommand( $args ) {
        $filePath = file_exists($args[0]) ? $args[0]: '';
        $importer = new \calderawp\WordPressPlugin\Tests\ImportForms($filePath);
        WP_CLI::success( sprintf( 'Forms imported: %d', $importer->import() ) );
    }
    WP_CLI::add_command( 'cwp import', 'calderaWordPresPluginImportTestFormsCommand' );
}
