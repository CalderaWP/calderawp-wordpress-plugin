<?php


namespace calderawp\WordPressPlugin\Tests\Mock;
use calderawp\WordPressPlugin\Contracts\AddsRoutes;


class RouteAdder implements AddsRoutes
{


    protected $namespace;
    public function getNamespace(): string
    {
       return $this->namespace;
    }

    public function addRoutes(string $nameSpace)
    {
        $this->namespace = $nameSpace;
        return $this;
    }

}