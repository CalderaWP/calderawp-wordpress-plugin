<?php


namespace calderawp\WordPressPlugin\RestApi;


use calderawp\calderaforms\pro\container;

class CheckProKeys
{

	protected $public;

	protected $token;

	public function checkRequest($allowed, $formId, \WP_REST_Request $request ){

		if( $allowed ){
			return $allowed;
		}

		if( ! caldera_forms_pro_is_active() ){
			return false;
		}

		$this->setKeyAndTokenFromRequest($request);
		return caldera_forms_pro_compare_to_saved_keys($this->public, $this->token );
	}

	protected function setKeyAndTokenFromRequest(\WP_REST_Request $request){
		$this->public = $request->get_header( 'X-CS-PUBLIC') ? $request->get_header( 'X-CS-PUBLIC' ) :
			$request->get_param( 'public' ) ? $request->get_param( 'public' ) : '';
		$this->token = $request->get_header( 'X-CS-TOKEN') ? $request->get_header( 'X-CS-TOKEN' ) :
			$request->get_param( 'token' ) ? $request->get_param( 'token' ) : '';
	}


}