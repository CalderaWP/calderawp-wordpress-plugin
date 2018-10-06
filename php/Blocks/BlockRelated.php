<?php


namespace calderawp\WordPressPlugin\Blocks;


use calderawp\WordPressPlugin\Traits\ConvertsToArrayFromGetters;
use calderawp\WordPressPlugin\Traits\CreatesFromArrayWithSetters;

abstract class BlockRelated
{

    use ConvertsToArrayFromGetters, CreatesFromArrayWithSetters;
}