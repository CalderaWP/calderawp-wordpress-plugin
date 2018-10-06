<?php


namespace calderawp\WordPressPlugin\Blocks;


/**
 * Class RegisterBlock
 * @package calderawp\WordPressPlugin\Blocks
 */
class RegisterBlock
{

    /** @var BlockType */
    protected $blockType;
    /** @var string */
    protected $rootUrl;
    /**
     * @var string
     */
    protected $dirName;

    /**
     * @var string
     */
    protected $namespace;

    /**
     * RegisterBlock constructor.
     * @param BlockType $blockType
     * @param string $dirName
     * @param string $rootUrl
     * @param string $namespace
     */
    public function __construct(BlockType $blockType, string $dirName, string $rootUrl, string $namespace)
    {
        $this->blockType = $blockType;
        $this->dirName = $dirName;
        $this->rootUrl = $rootUrl;
        $this->namespace = $namespace;
    }

    /**
     *
     */
    public function register()
    {

        $dir = dirname(__FILE__);
        $slug = $this->blockType->getSlug();
        $index_js = "src/blocks/$slug/build/index.js";
        wp_register_script(
            $this->handle(false),
            $this->url($index_js),
            $this->blockType->getWpDependencies()
            //filemtime($this->filePath($index_js))
        );


        $style_css = "src/blocks/$slug/build/style.css";
        wp_register_style(
            $this->handle(true),
            $this->url($style_css),
            []
            //filemtime($this->filePath($style_css))
        );

        register_block_type($this->blockName(), array(
            'editor_script' => $this->handle(false ),
            'style' => $this->handle(true ),
        ));
    }

    /**
     * @param string $uri
     * @return string
     */
    public function url(string $uri = ''): string
    {
        return $this->rootUrl . $uri;
    }

    /**
     * @param string $file
     * @return string
     */
    public function filePath(string $file): string
    {
        return sprintf( '%s/%s',$this->dirName, $file);
    }

    /**
     * @param bool $front
     * @return string
     */
    public function handle(bool $front = false)
    {
        return $front
            ? $this->blockType->getSlug() . '-front'
            : $this->blockType->getSlug() . '-editor';
    }

    /**
     * @return string
     */
    public function blockName()
    {
        return sprintf('%s/%s', $this->namespace, $this->blockType->getSlug() );
    }
}