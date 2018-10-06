<?php


namespace calderawp\WordPressPlugin\Contracts;

interface AddsRoutes
{

    /**
     * Add custom REST API routes
     *
     * @param string $nameSpace Namespace of all routes
     * @return $this
     */
    public function addRoutes(string $nameSpace);

    /**
     * Get the namespace
     *
     * @return string
     */
    public function getNamespace() : string;
}