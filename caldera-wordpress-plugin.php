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
add_filter('caldera_forms_render_assets_minify', '__return_false');

define('LAYOUT_POST_TYPE', 'layout');
add_action('init', function () {
	$labels = [
		'name' => _x('Layouts', 'Post type general name', 'textdomain'),
		'singular_name' => _x('Layout', 'Post type singular name', 'textdomain'),
		'menu_name' => _x('Layouts', 'Admin Menu text', 'textdomain'),
		'name_admin_bar' => _x('Layout', 'Add New on Toolbar', 'textdomain'),
		'add_new' => __('Add New', 'textdomain'),
		'add_new_item' => __('Add New Layout', 'textdomain'),
		'new_item' => __('New Layout', 'textdomain'),
		'edit_item' => __('Edit Layout', 'textdomain'),
		'view_item' => __('View Layout', 'textdomain'),
		'all_items' => __('All Layouts', 'textdomain'),
		'search_items' => __('Search Layouts', 'textdomain'),
		'parent_item_colon' => __('Parent Layouts:', 'textdomain'),
		'not_found' => __('No Layouts found.', 'textdomain'),
		'not_found_in_trash' => __('No Layouts found in Trash.', 'textdomain'),
		'featured_image' => _x('Layout Cover Image',
			'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'textdomain'),
		'set_featured_image' => _x('Set cover image',
			'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'textdomain'),
		'remove_featured_image' => _x('Remove cover image',
			'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'textdomain'),
		'use_featured_image' => _x('Use as cover image',
			'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'textdomain'),
		'archives' => _x('Layout archives',
			'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'textdomain'),
		'insert_into_item' => _x('Insert into Layout',
			'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4',
			'textdomain'),
		'uploaded_to_this_item' => _x('Uploaded to this Layout',
			'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4',
			'textdomain'),
		'filter_items_list' => _x('Filter Layouts list',
			'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4',
			'textdomain'),
		'items_list_navigation' => _x('Layouts list navigation',
			'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4',
			'textdomain'),
		'items_list' => _x('Layouts list',
			'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4',
			'textdomain'),
	];

	$args = [
		'labels' => $labels,
		'public' => TRUE,
		'publicly_queryable' => TRUE,
		'show_ui' => TRUE,
		'show_in_menu' => TRUE,
		'query_var' => TRUE,
		'rewrite' => [ 'slug' => 'layout' ],
		'capability_type' => 'post',
		'has_archive' => TRUE,
		'hierarchical' => FALSE,
		'menu_position' => null,
		'show_in_rest' => TRUE,
		'supports' => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ],
	];

	register_post_type(LAYOUT_POST_TYPE, $args);
});

//Load blocks
add_action('calderawp/WordPressPlugin/init', function (\calderawp\WordPressPlugin\Container $container) {
	$container->initBlocks(
		json_decode(
			file_get_contents(__DIR__ . '/blocks.json'),
			TRUE
		)
	);
}, 1);

/**
 * REST API authentication
 */
add_action('calderawp/WordPressPlugin/init', function (\calderawp\WordPressPlugin\Container $container) {

	$keyAuth = new \calderawp\WordPressPlugin\RestApi\CheckJwtToken();
	$callback = [$keyAuth, 'checkRequest' ];
	add_filter( 'caldera_forms_pro_is_active', '__return_true' );
	add_filter('caldera_forms_api_allow_entry_view', $callback, 100,3 );
	add_filter('caldera_forms_api_allow_form_view', $callback, 100,3 );
}, 3);


add_action('calderawp/WordPressPlugin/init', function (\calderawp\WordPressPlugin\Container $container) {
	add_filter('show_admin_bar', function($show){
		if( LAYOUT_POST_TYPE === get_post_type( ) ){
			return false;
		}
		return $show;
	});


	add_filter( 'template_include', function ( $template ) {

		if ( LAYOUT_POST_TYPE === get_post_type() ) {
			return __DIR__ . '/layout-view.php';
		}

		return $template;
	}, 99 );


	add_filter( \calderawp\WordPressPlugin\Blocks\RenderCallback\EntryValue::DEFULAT_ATTS_FILTER, function($atts){
		if ( LAYOUT_POST_TYPE === get_post_type() ) {
			foreach([
				'entryId',
				'formId'
			] as $att){
				if( ! empty( $_GET[ $att ] ) ){
					$atts[$att] = sanitize_key($_GET[$att]);
				}
			}
		}
		return $atts;
	});


	add_action('init', function () use ($container) {

		$container->registerBlocks();
		add_action( 'admin_enqueue_scripts', function(){
			if( LAYOUT_POST_TYPE === get_post_type( ) ){
				wp_enqueue_script(
					'layout-sidebar',
					plugins_url('/build/layout/index.js', __FILE__ ),
					[
						'wp-plugins',
						'wp-plugins',
						'wp-element',
						'wp-edit-post',
						'wp-i18n',
						'wp-data',
						'wp-components',
						'wp-editor'
					] );

			}
		});
		add_filter('allowed_block_types', function ($allowed_block_types, $post) use ($container) {
			if ( $post->post_type === LAYOUT_POST_TYPE ) {
				$allowed_block_types = [
					'core/paragraph',
					'core/image',
					'core/columns',
					'core/heading',
					'core/url',
					'core/code',
					'core/spacer',
					'core/list',
					'core/paragraph',
				];

				return array_merge($container->getBlockCollection()->getBlockSlugs(), $allowed_block_types);
			}
		}, 101, 2);
		add_action('wp_print_scripts', function () {
			if( ! is_admin() && LAYOUT_POST_TYPE === get_post_type() ) {
				global $wp_scripts;
				$wp_scripts->queue = array();
			}
			if( ! wp_style_is( 'wp-block-library', 'registered') ){
				wp_register_script(
					'wp-block-library',
					gutenberg_url( 'build/block-library/index.js' ),
					array(
						'editor',
						'lodash',
						'moment',
						'wp-api-fetch',
						'wp-autop',
						'wp-blob',
						'wp-blocks',
						'wp-components',
						'wp-compose',
						'wp-core-data',
						'wp-data',
						'wp-editor',
						'wp-element',
						'wp-html-entities',
						'wp-i18n',
						'wp-keycodes',
						'wp-polyfill',
						'wp-url',
						'wp-viewport',
					),
					filemtime( gutenberg_dir_path() . 'build/block-library/index.js' ),
					true
				);
			}
			wp_enqueue_style( 'wp-block-library' );


		}, 100);


		add_action('wp_print_styles', function() {
			if( ! is_admin() &&  LAYOUT_POST_TYPE === get_post_type() ){
				global $wp_styles;
				$wp_styles->queue = array();
			}

		}, 100);


		add_action('init', function () use ($container) {


			$post_type_object = get_post_type_object(LAYOUT_POST_TYPE);
			$formId = 'CF5be77c7b45877';
			$form = Caldera_Forms_Forms::get_form($formId);
			$fields = \Caldera_Forms_Forms::get_fields($form);
			$fieldBlocks = [];
			$entryId = '2';
			$logoId = get_theme_mod('custom_logo');

			$url = wp_get_attachment_image_url($logoId, 'full', FALSE);
			$imageBlockArgs = [];

			if ( $url ) {
				$imageBlockArgs = [
					'url' => esc_url_raw($url),
					'id' => intval($logoId),
					'align' => 'center',
				];
			}

			foreach ( $fields as $field ) {
				$not_support = Caldera_Forms_Fields::not_support( $field[ 'type' ], 'entry_list' );
				if( $not_support ){
					if( 'html' !==  $field[ 'type' ] || empty( $field[ 'config' ][ 'show_in_summary' ] ) ){
						continue;

					}
				}

				$fieldBlocks[] = [
					'caldera-wordpress-plugin/entryvalue',
					[
						'formId' => $formId,
						'entryId' => $entryId,
						'fieldId' => $field[ 'ID' ],
						'before' => $field[ 'label' ] . ':'
					],
				];


			}



			$post_type_object->template = [
				[
					'core/columns',
					[],
					[
						[
							'core/column',
							[],
							[
								[ 'core/image', $imageBlockArgs ],
							],
						],
						[
							'core/column',
							[],
							[
								[
									'core/heading',
									[
										'level' => 2,
										'content' => $form[ 'name' ],
										'align' => 'center',
									],
								],
								[
									'core/paragraph',
									[
										'align' => 'center',
										'content' => get_bloginfo('description', 'display'),

									],
								],
							],
						],
					],
				],

			];

			$post_type_object->template = array_merge($post_type_object->template, $fieldBlocks);
			$post_type_object->template_lock = false;
		}, 25);

	});
}, 3);


add_action('calderawp/WordPressPlugin/init', function (\calderawp\WordPressPlugin\Container $container) {
	add_action('save_post', function ($postId) {
		wp_queue()->push(new \calderawp\WordPressPlugin\Jobs\WritePostToJson($postId, __DIR__ . '/wp-json'));
	});
	add_action('profile_update', function ($userId) {
		if ( file_exists(__DIR__ . '/wp-json/users/' . $userId . '.json') ) {
			wp_queue()->push(new \calderawp\WordPressPlugin\Jobs\WriteUserToJson($userId, __DIR__ . '/wp-json'));
		}
	});

	add_filter('-wp_queue_default_connection', function () {
		return 'sync';
	});


}, 3);


add_action('caldera_forms_includes_complete', function () {
	class FormsRoute extends Caldera_Forms_API_Forms
	{
		public function prepare_form_for_response(Caldera_Forms_API_Form $form, WP_REST_Request $request)
		{
			return parent::prepare_form_for_response($form, $request); // TODO: Change the autogenerated stub
		}
	}

	add_filter('caldera_forms_api_js_config', function ($data) {
		$formsRoute = new FormsRoute();
		$request = new WP_REST_Request();
		$request->set_param('entry_list_only_fields', FALSE);
		$data[ 'forms' ] = [];
		$forms = Caldera_Forms_Forms::get_forms(FALSE, FALSE);
		foreach ( $forms as $form ) {

			$_form = new Caldera_Forms_API_Form(Caldera_Forms_Forms::get_form($form));
			$data[ 'forms' ][ $form ] = $formsRoute->prepare_form_for_response($_form, $request);
			if ( !empty($data[ 'forms' ][ $form ][ 'fields' ]) ) {
				$data[ 'forms' ][ $form ][ 'fields' ] = [];
			}
			$data[ 'forms' ][ $form ][ 'formId' ] = $form;
		}
		/**
		$data[ 'proAuth' ] = [
			'public' => \calderawp\calderaforms\pro\container::get_instance()->get_api_client()->get_keys()->get_public(),
			'token' => \calderawp\calderaforms\pro\container::get_instance()->get_api_client()->get_keys()->get_token(),
		];
		 * */
		return $data;
	});
});


do_action('calderawp/WordPressPlugin/init', new \calderawp\WordPressPlugin\Container(
	plugin_dir_path(__FILE__),
	plugins_url('', __FILE__)
));

add_action('caldera_forms_admin_init', function () {
	remove_action('caldera_forms_admin_init', [ Caldera_Forms_Admin::class, 'init_privacy_settings' ]);

}, 5);


add_action('rest_api_init', function () {
	if( ! defined('JWT_AUTH_SECRET_KEY') ){
		define('JWT_AUTH_SECRET_KEY', 'DD3560122599086FCDB529109BB3C84C' );
	}if( ! defined('JWT_AUTH_CORS_ENABLE') ){
		define('JWT_AUTH_CORS_ENABLE', true );
	}
	/**
	 * CORS
	 */
	// Remove the default filter.
	remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
	// Add a Custom filter.
	add_filter('rest_pre_serve_request', function ($value) {
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Headers: x-cs-public, x-cs-token');
		return $value;
	});




}, 5000);


add_action('init', function () {
	$labels = [
		'name' => _x('Layouts', 'Post type general name', 'textdomain'),
		'singular_name' => _x('Layout', 'Post type singular name', 'textdomain'),
		'menu_name' => _x('Layouts', 'Admin Menu text', 'textdomain'),
		'name_admin_bar' => _x('Layout', 'Add New on Toolbar', 'textdomain'),
		'add_new' => __('Add New', 'textdomain'),
		'add_new_item' => __('Add New Layout', 'textdomain'),
		'new_item' => __('New Layout', 'textdomain'),
		'edit_item' => __('Edit Layout', 'textdomain'),
		'view_item' => __('View Layout', 'textdomain'),
		'all_items' => __('All Layouts', 'textdomain'),
		'search_items' => __('Search Layouts', 'textdomain'),
		'parent_item_colon' => __('Parent Layouts:', 'textdomain'),
		'not_found' => __('No Layouts found.', 'textdomain'),
		'not_found_in_trash' => __('No Layouts found in Trash.', 'textdomain'),
		'featured_image' => _x('Layout Cover Image',
			'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'textdomain'),
		'set_featured_image' => _x('Set cover image',
			'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'textdomain'),
		'remove_featured_image' => _x('Remove cover image',
			'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'textdomain'),
		'use_featured_image' => _x('Use as cover image',
			'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'textdomain'),
		'archives' => _x('Layout archives',
			'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'textdomain'),
		'insert_into_item' => _x('Insert into Layout',
			'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4',
			'textdomain'),
		'uploaded_to_this_item' => _x('Uploaded to this Layout',
			'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4',
			'textdomain'),
		'filter_items_list' => _x('Filter Layouts list',
			'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4',
			'textdomain'),
		'items_list_navigation' => _x('Layouts list navigation',
			'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4',
			'textdomain'),
		'items_list' => _x('Layouts list',
			'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4',
			'textdomain'),
	];

	$args = [
		'labels' => $labels,
		'public' => TRUE,
		'publicly_queryable' => TRUE,
		'show_ui' => TRUE,
		'show_in_menu' => TRUE,
		'query_var' => TRUE,
		'rewrite' => [ 'slug' => 'Layout' ],
		'capability_type' => 'post',
		'has_archive' => TRUE,
		'hierarchical' => FALSE,
		'menu_position' => null,
		'show_in_rest' => TRUE,
		'template' => [],
		'supports' => [ 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'comments' ],
	];

	register_post_type(LAYOUT_POST_TYPE, $args);
});

