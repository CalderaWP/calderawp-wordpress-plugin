<?php


namespace calderawp\WordPressPlugin;
use calderawp\WordPressPlugin\ReactScripts;

/**
 * Class Client
 *
 * Creates a client application
 */
class Client
{

    /**
     * @var string
     */
    protected $pluginDirPath;

    /**
     * @var string
     */
    protected $handle;

    /**
     * @var string string
     */
    protected $elementId;

    /**
     * Client constructor.
     * @param string $pluginDirPath
     * @param string $handle
     * @param string $elementId
     */
    public function __construct(string $pluginDirPath, string $handle, string $elementId )
    {

        $this->pluginDirPath = $pluginDirPath;
        $this->handle = $handle;
        $this->elementId = $elementId;
    }


    /**
     * Enqueue assets for app
     */
    public function enqueue()
    {
        ReactScripts\enqueue_assets(
            $this->pluginDirPath,
            [
                'handle' => $this->handle
            ]
        );
    }


    /**
     * Render the element for the app
     *
     * @return string
     */
    public function element() : string
    {
        return sprintf('<div id="%s"></div>', $this->elementId );
    }


}