<?php


namespace calderawp\WordPressPlugin\Traits;


trait ConvertsToArrayFromGetters
{


    public function toArray() : array
    {
        $data = [];
        $getterPattern = 'get%s';
        foreach (get_object_vars($this) as $key => $value ){
            if( is_null( $value ) ){
                continue;
            }
            $getter = sprintf($getterPattern,ucfirst($key));
            $data[$key] = $this->$getter();
        }

        return $data;
    }
}