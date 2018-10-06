<?php

namespace calderawp\WordPressPlugin\Tests\Unit;

use calderawp\WordPressPlugin\Exception;
use calderawp\WordPressPlugin\RestApi\Response;

class ExceptionTest extends TestCase
{

    /**
     * @covers \calderawp\WordPressPlugin\Exception::toWpError()
     */
    public function testToWpError()
    {

        $wpError = \Mockery::mock('WP_Error');
        $this->assertInstanceOf(
            'WP_Error',
            (new Exception(500))
                ->toWpError([])
        );


    }

    /**
     * @covers \calderawp\WordPressPlugin\Exception::formOtherException()
     */
    public function testFormOtherException()
    {
        $code = 500;
        $message = 'fail';
        $data = [1 => 2];
        $original = new \Exception($message,$code);
        $e = Exception::formOtherException($original);
        $this->assertEquals($code,$e->getCode());
        $this->assertEquals($message,$e->getMessage());
    }

    /**
     * @covers \calderawp\WordPressPlugin\Exception::fromWpError()
     */
    public function testFromWpError()
    {
        $code = 500;
        $message = 'fail';
        $wpError = \Mockery::mock('WP_Error');
        $wpError->shouldReceive( 'get_error_code' )
            ->andReturn( $code );
        $wpError->shouldReceive( 'get_error_message' )
            ->andReturn( $message );

        $e = Exception::fromWpError($wpError);
        $this->assertEquals($code,$e->getCode());
        $this->assertEquals($message,$e->getMessage());

    }
}
