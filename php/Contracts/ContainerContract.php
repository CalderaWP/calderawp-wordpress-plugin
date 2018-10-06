<?php


namespace calderawp\WordPressPlugin\Contracts;


interface ContainerContract
{
    public function getDirName() : string;
    public function getRootUrl() : string;
    public function initBlocks(array $blocksJson );
    public function registerBlocks();
}