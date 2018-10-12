<?php


namespace calderawp\WordPressPlugin\Blocks;
use calderawp\WordPressPlugin\Blocks\Attribute;
use calderawp\WordPressPlugin\Exception;
use calderawp\WordPressPlugin\Traits\CreatesFromArrayWithSetters;

class BlockType extends BlockRelated
{

    use CreatesFromArrayWithSetters;
    /** @var string */
    protected $slug;
    /** @var string */
    protected $title;
    /** @var string[] */
    protected $wpDependencies;
    /** @var string */
    protected $category;
    /** @var string */
    protected $icon;
    /** @var Attribute[] */
    protected $attributes;




    /**
     * @return string
     */
    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * @param string $slug
     * @return BlockType
     */
    public function setSlug(string $slug): BlockType
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return BlockType
     */
    public function setTitle(string $title): BlockType
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string[]
     */
    public function getWpDependencies(): array
    {
        return array_map(
            function($handle){
                if( 0 === strpos($handle, 'wp-') ){
                    return $handle;
                }
                return sprintf('wp-%s', $handle );
            },
            $this->wpDependencies
        );

    }

    /**
     * @param string[] $wpDependencies
     * @return BlockType
     */
    public function setWpDependencies(array $wpDependencies): BlockType
    {
        $this->wpDependencies = $wpDependencies;
        return $this;
    }

    /**
     * @return string
     */
    public function getCategory(): string
    {
        return $this->category
            ? $this->category
            : 'common';
    }

    /**
     * @param string $category
     * @return BlockType
     */
    public function setCategory( $category): BlockType
    {
        $this->category = $category;
        return $this;
    }

    /**
     * @return string
     */
    public function getIcon(): string
    {
        return $this->icon;
    }

    /**
     * @param string $icon
     * @return BlockType
     */
    public function setIcon(string $icon): BlockType
    {
        $this->icon = $icon;
        return $this;
    }

    /**
     * @return Attribute[]
     */
    public function getAttributes(): array
    {
        return $this->attributes;
    }

    /**
     * @param Attribute[] $attributes
     * @return BlockType
     */
    public function setAttributes(array $attributes): BlockType
    {
        foreach ($attributes as &$attribute ){
            if( is_array($attribute)){
                $attribute = \calderawp\WordPressPlugin\Blocks\Attribute::fromArray($attribute);
            }

            if( ! is_a($attribute,Attribute::class ) ){
                throw new Exception('Invalid attribute' );
            }
        }
        $this->attributes = $attributes;
        return $this;
    }



}