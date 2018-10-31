<?php


namespace calderawp\WordPressPlugin\Jobs;


class WritePostToJson extends WriteJob
{

    /**
     * @var int
     */
    public $postId;

    /**
     * WritePostToJson constructor.
     * @param $postId
     * @param $writePath
     */
    public function __construct( $postId, $writePath ) {
        $this->postId = $postId;
        $this->writePath = $writePath;
    }

    /** @inheritdoc */
    public function handle() {
        $post = get_post( $this->postId );
        if( ! in_array( get_post_type($post), [ 'post', 'page' ]) ){
            return;
        }
        $controller = new \WP_REST_Posts_Controller( 'post' );
        $route = 'wp/v2/posts/' . $this->postId;
        $request = new \WP_REST_Request('GET', $route);
        $request->set_param( 'id', $this->postId );
        $response = $controller->get_item($request );
        $name = sprintf( '%s/posts/%s.json', $this->getWritePath(), $post->post_name );
        file_put_contents( $name, json_encode( $response ) );
        wp_queue()->push( new WriteUserToJson( $post->post_author, $this->writePath ) );

    }
}


class PostSaveJob extends \WP_Queue\Job
{
    protected $postId;
    public function __construct( $postId )
    {
        $this->postId = $postId;
    }
    public function handle() {
        $post = get_post( $this->postId );
        if( ! in_array( get_post_type($post), [ 'post', 'page' ]) ){
            return;
        }
        $controller = new \WP_REST_Posts_Controller( 'post' );
        $route = 'wp/v2/posts/' . $this->postId;
        $request = new \WP_REST_Request('GET', $route);
        $request->set_param( 'id', $this->postId );
        $response = $controller->get_item($request );
        $name = sprintf( '%s/posts/%s.json', __DIR__, $post->post_name );
        file_put_contents( $name, json_encode( $response ) );
        return $name;
    }
}
