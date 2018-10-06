<?php


namespace calderawp\WordPressPlugin\Tests\Unit\RestApi;

use Brain\Monkey;
use Mockery;
use calderawp\WordPressPlugin\Tests\Unit\TestCase;
use \calderawp\WordPressPlugin\RestApi\NonceCheck;

class NonceCheckTest extends TestCase
{
    /**
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::setNonceAction()
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::$nonceAction
     */
    public function testSetNonceAction()
    {
        $check = new NonceCheck([$this,'nonceCheckCallbackTrue']);
        $check->setNonceAction('act' );
        $this->assertAttributeEquals( 'act', 'nonceAction',$check );
    }

    /**
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::setNonceParamName()
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::$nonceParamName
     */
    public function testSetNonceParamName()
    {

        $check = new NonceCheck([$this,'nonceCheckCallbackTrue']);
        $check->setNonceParamName('act' );
        $this->assertAttributeEquals( 'act', 'nonceParamName',$check );
    }

    /**
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::$callback
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::verifyRequest()
     */
    public function testVerificationWhenValid()
    {
        $wpRestRequestMock = Mockery::mock('WP_REST_Request');
        $wpRestRequestMock->shouldReceive('get_param')->andReturn(md5(rand()));
        $check = new NonceCheck([$this,'nonceCheckCallbackTrue']);
        $check->setNonceParamName('act' )
            ->setNonceAction( 'act' );
        $this->assertTrue($check->verifyRequest($wpRestRequestMock));
    }

    /**
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::$callback
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::verifyRequest()
     */
    public function testVerificationWhenFalse()
    {
        $wpRestRequestMock = Mockery::mock('WP_REST_Request');
        $wpRestRequestMock->shouldReceive('get_param')->andReturn(md5(rand()));
        $check = new NonceCheck([$this,'nonceCheckCallbackFalse']);
        $check->setNonceParamName('act' )
            ->setNonceAction( 'act' );
        $this->assertFalse($check->verifyRequest($wpRestRequestMock));
    }


    /**
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::$callback
     * @covers \calderawp\WordPressPlugin\RestApi\NonceCheck::verifyRequest()
     */
    public function testVerificationGetNonce()
    {
        $wpRestRequestMock = Mockery::mock('WP_REST_Request');
        $hash =md5(rand());
        $wpRestRequestMock->shouldReceive('get_param')->andReturn($hash);

        $checker = new class {
            public $nonce;
            public $action;
            public function cb($nonce,$action)
            {
                $this->nonce = $nonce;
                $this->action = $action;
                return true;
            }
        };
        $check = new NonceCheck([$checker,'cb']);
        $check->setNonceParamName('act' )
            ->setNonceAction( 'act' );
        $this->assertTrue($check->verifyRequest($wpRestRequestMock));
        $this->assertEquals($hash, $checker->nonce );
        $this->assertEquals('act', $checker->action );

    }


    /**
     * Callback for nonce checker that returns true
     */
    public function nonceCheckCallbackTrue($nonce, $action){
        return true;
    }

    /**
     * Callback for nonce checker that returns false
     */
    public function nonceCheckCallbackFalse($nonce, $action){
        return false;
    }
}