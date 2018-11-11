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
add_filter( 'caldera_forms_render_assets_minify', '__return_false' );

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
    	$blocks = $container->getBlockCollection()
			->getBlocks();

		$container->getBlockCollection()
			->setBlocks($blocks);
        $container->registerBlocks();
    });
}, 3 );


add_action( 'calderawp/WordPressPlugin/init', function( \calderawp\WordPressPlugin\Container $container){
    add_action( 'save_post', function( $postId) {
        wp_queue()->push( new \calderawp\WordPressPlugin\Jobs\WritePostToJson( $postId, __DIR__ . '/wp-json') );
    });
    add_action( 'profile_update', function ($userId){
            if( file_exists( __DIR__ . '/wp-json/users/' . $userId . '.json'  ) ){
                wp_queue()->push( new \calderawp\WordPressPlugin\Jobs\WriteUserToJson( $userId, __DIR__ . '/wp-json' ) );
            }
    } );

    add_filter( '-wp_queue_default_connection', function() {
        return 'sync';
    } );


}, 3 );


add_action( 'caldera_forms_includes_complete', function(){
	class FormsRoute extends Caldera_Forms_API_Forms {
		public function prepare_form_for_response(Caldera_Forms_API_Form $form, WP_REST_Request $request)
		{
			return parent::prepare_form_for_response($form, $request); // TODO: Change the autogenerated stub
		}
	}
	add_filter( 'caldera_forms_api_js_config', function($data){
		$formsRoute = new FormsRoute();
		$request = new WP_REST_Request();
		$request->set_param( 'entry_list_only_fields', false );
		$data[ 'forms' ] = [ ];
		$forms = Caldera_Forms_Forms::get_forms(false, false );
		foreach ( $forms as $form ){

			$_form = new Caldera_Forms_API_Form(Caldera_Forms_Forms::get_form($form));
			$data[ 'forms' ][$form] = $formsRoute->prepare_form_for_response($_form, $request );
			if( ! empty($data[ 'forms' ][$form][ 'fields'])){
				$data[ 'forms' ][$form]['fields' ] = [];
			}
			$data[ 'forms' ][$form]['formId'] = $form;
		}
		return $data;
	});
});


do_action( 'calderawp/WordPressPlugin/init', new \calderawp\WordPressPlugin\Container(
    plugin_dir_path( __FILE__ ),
    plugins_url('', __FILE__ )
));

add_action(  'caldera_forms_admin_init',function(){
    remove_action(  'caldera_forms_admin_init', array( Caldera_Forms_Admin::class , 'init_privacy_settings' ) );

},5 );


add_filter( 'caldera_forms_api_allow_entry_view', '__return_true', 100 );
add_filter( 'caldera_forms_api_allow_form_view', '__return_true',100 );
function wp_verify_nonce(){
	return true;
}
add_action( 'rest_api_init', function () {

	/**
	 * CORS
	 */
	// Remove the default filter.
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	// Add a Custom filter.
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
		header( 'Access-Control-Allow-Credentials: true' );
		return $value;
	});

	/**
	 * Auth
	 */
	add_filter( 'caldera_forms_api_allow_entry_view', '__return_true', 100 );
	add_filter( 'caldera_forms_api_allow_form_view', '__return_true',100 );


}, 5000 );




