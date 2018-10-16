<?php


namespace calderawp\WordPressPlugin\Blocks;


use calderawp\WordPressPlugin\Exception;

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

        if (!function_exists('register_block_type')) {
            return;
        }
        $slug = $this->blockType->getSlug();
        $index_js = "/src/blocks/$slug/build/index.js";
        if (!
            wp_register_script(
                $this->handle(false),
                $this->url($index_js),
                $this->blockType->getWpDependencies(),
                filemtime($this->filePath($index_js))
            )
        ) {
            throw new Exception(sprintf('Can not register block editor script for block %s', $this->blockName()));
        }


        $style_css = "/src/blocks/$slug/build/style.css";
        if (!
            wp_register_style(
                $this->handle(true),
                $this->url($style_css),
                [],
                filemtime($this->filePath($style_css))
            )
        ) {
            throw new Exception(sprintf('Can not register block editor CSS for block %s', $this->blockName()));

        }

        register_block_type($this->blockName(), array(
            'editor_script' => $this->handle(false),
            'style' => $this->handle(true),
        ));

        if (!\WP_Block_Type_Registry::get_instance()->is_registered($this->blockName())) {
            throw new Exception(sprintf('Can not register block %s', $this->blockName()));
        }

        add_action( 'enqueue_block_editor_assets', function() use ($index_js) {
            wp_enqueue_script($this->handle(false),
                $this->url($index_js),
                $this->blockType->getWpDependencies(),
                filemtime($this->filePath($index_js)));
            wp_enqueue_style($this->handle(true));
        });

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
        return  $this->dirName . $file;
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
        return sprintf('%s/%s', $this->namespace, $this->blockType->getSlug());
    }
}