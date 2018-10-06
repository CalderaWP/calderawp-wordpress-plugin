<?php


namespace calderawp\WordPressPlugin\Blocks;


use calderawp\WordPressPlugin\Traits\CreatesFromArrayWithSetters;

class Attribute extends BlockRelated
{

    use CreatesFromArrayWithSetters;

    /** @var string */
    protected $type;
    /** @var mixed */
    protected $default;
    /** @var string */
    protected $source;
    /** @var string */
    protected $selector;
    /** @var string */
    protected $attribute;
    /** @var string */
    protected $meta;

    protected function getDefaults() {
        return[
            'type' => 'string',
            'default' => '',
            'source' => null,
            'selector' => null,
            'attribute' => null,
            'meta' => null
        ];
    }


    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return Attribute
     */
    public function setType(string $type): Attribute
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getDefault()
    {
        return $this->default
            ? $this->default
            : $this->getDefaults()['default' ];
    }

    /**
     * @param mixed $default
     * @return Attribute
     */
    public function setDefault($default)
    {
        $this->default = $default;
        return $this;
    }

    /**
     * @return string
     */
    public function getSource(): string
    {
        return $this->source;
    }

    /**
     * @param string $source
     * @return Attribute
     */
    public function setSource(string $source): ?Attribute
    {
        $this->source = $source;
        return $this;
    }

    /**
     * @return string
     */
    public function getSelector(): ?string
    {
        return $this->selector;
    }

    /**
     * @param string $selector
     * @return Attribute
     */
    public function setSelector(string $selector): Attribute
    {
        $this->selector = $selector;
        return $this;
    }

    /**
     * @return string
     */
    public function getAttribute(): string
    {
        return $this->attribute;
    }

    /**
     * @param string $attribute
     * @return Attribute
     */
    public function setAttribute(string $attribute): Attribute
    {
        $this->attribute = $attribute;
        return $this;
    }

    /**
     * @return string
     */
    public function getMeta(): string
    {
        return $this->meta;
    }

    /**
     * @param string $meta
     * @return Attribute
     */
    public function setMeta(string $meta): Attribute
    {
        $this->meta = $meta;
        return $this;
    }


}