<?php


namespace calderawp\WordPressPlugin\Jobs;


class WriteUserToJson extends WriteJob
{

    /**
     * @var int
     */
    public $userId;

    public function __construct( $userId, $writePath ) {
        $this->userId = $userId;
        $this->writePath = $writePath;
    }


    /** @inheritdoc */
    public function handle() {
        $user = get_user_by( 'ID', $this->userId );
        if( ! $user || is_wp_error( $user ) ){
            return;
        }
        $controller = new \WP_REST_Users_Controller( );
        $route = 'wp/v2/users/' . $this->userId;
        $request = new \WP_REST_Request('GET', $route);
        $request->set_param( 'id', $this->userId );
        $request->set_param( 'context', 'embed');
        $response = $controller->get_item($request );

        $name = sprintf( '%s/users/%s.json', $this->getWritePath(), $this->userId );
        file_put_contents( $name, json_encode( $response ) );
    }
}
