<?php


namespace calderawp\WordPressPlugin\Traits;


trait CreatesFromArrayWithSetters
{
    public static function fromArray( array $data ){
        $obj = new static();
        $setterPattern = 'set%s';

        foreach ( $data as $key => $datum ){
            $setter = sprintf($setterPattern,ucwords($key));
            $obj->$setter($datum);
        }

        return $obj;
    }
}