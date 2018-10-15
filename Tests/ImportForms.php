<?php


namespace calderawp\WordPressPlugin\Tests;


class ImportForms
{


    /** @var string */
    protected $dirPath;

    /**
     * ImportForms constructor.
     * @param string $dirPath Optional. Path to directory with test forms
     */
    public function __construct(string $dirPath = '')
    {
        if( empty( $dirPath ) ){
            $dirPath = dirname(__FILE__, 2 ).'/cypress/forms';
        }
        $this->dirPath = $dirPath;
    }


    /**
     * Import test forms
     *
     * @return int|void
     */
    public function import()
    {
        $formFiles = scandir( $this->dirPath );
        $imported = [];
        $existingForms = \Caldera_Forms_Forms::get_forms(false,false);
        if( ! empty( $existingForms ) ){
            $existingForms = array_keys( $existingForms );

        }
        foreach ($formFiles as $file ){
            $fullPath = $this->dirPath . '/' . $file;
            $info = pathinfo($fullPath);
            if ('json' === $info['extension']){
                $importFormId = str_replace('.json', '', $file );
                if( ! in_array( $importFormId, $existingForms)){
                    $imported[] =  \Caldera_Forms_Forms::import_form(
                        json_decode( file_get_contents($fullPath), true ),
                        true
                    );
                }
            }
        }

        return count( $imported );

    }



}