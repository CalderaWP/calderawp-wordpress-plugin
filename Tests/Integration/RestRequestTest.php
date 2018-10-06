<?php

namespace calderawp\WordPressPlugin\Tests\Integration;


class RestRequestTest extends RestAPITestCase
{
    /**
     * Ensures that REST API requests will be filtered
     *
     * @covers FilterWPQuery::filterPreQuery()
     */
    public function testShouldFilter()
    {
        //Create a request
        $request = new \WP_REST_Request('GET', '/wp/v2/posts');
        rest_api_loaded();
        //Dispatch request
        $response = rest_get_server()->dispatch($request);

        $this->assertFalse(empty($response->get_headers()));
    }

}
