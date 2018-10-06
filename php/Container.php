<?php


namespace calderawp\WordPressPlugin;

use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Blocks\Collection;
use calderawp\WordPressPlugin\Blocks\RegisterBlock;
use calderawp\WordPressPlugin\Contracts\ContainerContract;

class Container extends \calderawp\CalderaContainers\Service\Container implements ContainerContract
{

protected $packageName;
    protected $namespace;
    protected $dirName;
    protected $rootUrl;
    public function __construct(string $dirName, string $rootUrl)
    {
        $this->dirName = $dirName;
        $this->rootUrl = $rootUrl;
        $this->setUpContainer();
    }

    protected function setUpContainer()
    {
        $this->singleton( 'BLOCKS_COLLECTION', function(){
            return new Collection();
        } );
    }


    public function getDirName() : string {
        return $this->dirName;
    }

    public function getRootUrl() : string
    {
        return $this->rootUrl;
    }

    public function initBlocks(array $blocksJson )
    {
        $this->packageName = $blocksJson['packageName'];
        $this->namespace = $blocksJson[ 'namespace'];
        $blocks = $blocksJson[ 'blocks'];
        /** @var Collection $collection */
        $collection = $this->getBlockCollection();
        $blockTypes = [];
        foreach ( $blocks as $block ){

            try {
                $blockTypes[] = BlockType::fromArray($block);
            } catch (\Exception $e) {
                throw Exception::formOtherException($e);
            }
        }
        try{
            $collection->setBlocks($blockTypes );
        } catch (\Exception $e) {
            throw Exception::formOtherException($e);
        }


    }


    public function registerBlocks()
    {
        /** @var Collection $collection */
        $collection = $this->getBlockCollection();
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

    /**
     * @return Collection
     */
    public function getBlockCollection() : Collection
    {
        return $this->make('BLOCKS_COLLECTION');
    }


}