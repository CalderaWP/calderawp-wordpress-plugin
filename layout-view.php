<?php
get_header();
echo apply_filters( 'the_content', get_post()->post_content );
get_footer();