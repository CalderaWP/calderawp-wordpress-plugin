<?php


namespace calderawp\WordPressPlugin;

use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Blocks\Collection;
use calderawp\WordPressPlugin\Blocks\RegisterBlock;
use calderawp\WordPressPlugin\Contracts\ContainerContract;

class Container extends \calderawp\CalderaContainers\Service\Container implements ContainerContract
{

protected $packageName;
    protected $namespace ;
    public function __construct()
    {
        $this->singleton( 'BLOCKS_COLLECTION', function(){
            return new Collection();
        } );
    }


    public function getDirName() : string {

    }

    public function getRootUrl() : string
    {}

    public function initBlocks(array $blocksJson )
    {
        $this->packageName = $blocksJson['packageName'];
        $this->namespace = $blocksJson[ 'namespace'];
        $blocks = $blocksJson[ 'blocks'];
        /** @var Collection $collection */
        $collection = $this->make('BLOCKS_COLLECTION' );
        $blockTypes = [];
        foreach ( $blocks as $block ){

            try {
                $blockTypes[] = BlockType::fromArray($block);
            } catch (\Exception $e) {
            }
        }
        $collection->setBlocks($blockTypes );


    }


    public function registerBlocks()
    {
        /** @var Collection $collection */
        $collection = $this->make('BLOCKS_COLLECTION' );
        foreach ( $collection->getBlocks() as $block ){
            $regiser = new RegisterBlock(
                $block,
                $this->getDirName(),
                $this->getRootUrl(),
                $this->namespace

            );
            $regiser->register();
    }
    }



}