<?php


namespace calderawp\WordPressPlugin\Blocks;


use calderawp\WordPressPlugin\Exception;

class Collection
{
    /**
     * @var string
     */
    protected $namespace;

    /** @var BlockType[] */
    protected $blocks;

    /** @var int */
    private $count;

    /**
     * @var string
     */
    protected $packageName;

    /**
     * @return string
     */
    public function getPackageName(): string
    {
        return $this->packageName;
    }

    /**
     * @param string $packageName
     * @return Collection
     */
    public function setPackageName(string $packageName): Collection
    {
        $this->packageName = $packageName;
        return $this;
    }

    /**
     * @return string
     */
    public function getNamespace(): string
    {
        return $this->namespace;
    }

    /**
     * @param string $namespace
     * @return Collection
     */
    public function setNamespace(string $namespace): Collection
    {
        $this->namespace = $namespace;
        return $this;
    }

    /**
     * @return BlockType[]
     */
    public function getBlocks(): array
    {
        return ! empty($this->blocks )
            ? $this->blocks
            : [];
    }


    /**
     * @param array $blocks
     * @return Collection
     * @throws Exception
     */
    public function setBlocks(array $blocks): Collection
    {
        foreach ( $blocks as &$block ){
            if( is_array( $block ) ){
                $block = BlockType::fromArray($block);
            };
            if( ! is_a( $block, BlockType::class )){
                throw new Exception( 'Invalid block' );
            }
        }
        $this->blocks = $blocks;
        return $this;
    }

    /**
     * @return int
     */
    public function getCount() : int
    {
        return count( $this->getBlocks() );
    }


}