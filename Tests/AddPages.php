<?php


namespace calderawp\WordPressPlugin\Tests;


class AddPages
{


    /** @var string */
    protected $filePath;

    /**
     * AddPages constructor.
     * @param string $filePath Optional. Path to the JSON file with the forms and pages
     */
    public function __construct(string $filePath = '')
    {
        if (empty($filePath)) {
            $filePath = dirname(__FILE__, 2) . '/cypress/tests.json';
        }
        $this->filePath = $filePath;
    }


    /**
     * Create pages
     *
     * @return int|void
     */
    public function import()
    {

        $data = json_decode(file_get_contents($this->filePath), true);
        $testForms = $data['forms'];
        $contentPattern =  '[caldera_forms id="%s"]';
        $created = [];
        foreach ($testForms as $testForm) {
            $formId = $testForm['formId'];
            $pageSlug = $testForm['pageSlug'];
            $page = get_page_by_path($pageSlug, OBJECT);
            if( isset( $page ) ){
                continue;
            }
            $form = \Caldera_Forms_Forms::get_form($formId);
            if( isset( $form[ 'name' ]) ){
                if ( isset($page) ){
                    $created[] = wp_insert_post(
                        [
                            'post_name' => $pageSlug,
                            'post_title' => $form[ 'name' ],
                            'post_content' => sprintf($contentPattern,$formId)
                        ]

                    );
                }
            }

        }

        return count($created);

    }


}