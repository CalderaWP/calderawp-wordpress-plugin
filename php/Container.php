<?php


namespace calderawp\WordPressPlugin;

use calderawp\WordPressPlugin\Blocks\BlockType;
use calderawp\WordPressPlugin\Blocks\Collection;
use calderawp\WordPressPlugin\Blocks\RegisterBlock;
use calderawp\WordPressPlugin\Contracts\ContainerContract;

class Container extends \calderawp\CalderaContainers\Service\Container implements ContainerContract
{

	/**
	 * @var
	 */
	protected $packageName;
	/**
	 * @var
	 */
	protected $namespace;
	/**
	 * @var string
	 */
	protected $dirName;
	/**
	 * @var string
	 */
	protected $rootUrl;

	/**
	 * Container constructor.
	 *
	 * @param string $dirName
	 * @param string $rootUrl
	 */
	public function __construct(string $dirName, string $rootUrl)
	{
		$this->dirName = $dirName;
		$this->rootUrl = $rootUrl;
		$this->setUpContainer();
	}

	/**
	 *
	 */
	protected function setUpContainer()
	{
		$this->singleton('BLOCKS_COLLECTION', function () {
			return new Collection();
		});
	}


	/**
	 * @return string
	 */
	public function getDirName(): string
	{
		return $this->dirName;
	}

	/**
	 * @return string
	 */
	public function getRootUrl(): string
	{
		return $this->rootUrl;
	}

	/**
	 * @param array $blocksJson
	 *
	 * @throws Exception
	 */
	public function initBlocks(array $blocksJson)
	{
		$this->packageName = $blocksJson[ 'packageName' ];
		$this->namespace = $blocksJson[ 'namespace' ];
		$blocks = $blocksJson[ 'blocks' ];
		/** @var Collection $collection */
		$collection = $this->getBlockCollection();
		$blockTypes = [];
		/** @var BlockType $block */
		foreach ( $blocks as $block ) {

			try {

				$block = BlockType::fromArray($block);
				$class = ucfirst($block->getSlug());
				$class = "\\calderawp\\WordPressPlugin\\Blocks\\RenderCallback\\{$class}";
				if ( class_exists($class)
					&& in_array('calderawp\WordPressPlugin\Blocks\RenderCallback\RenderCallbackContract',
						class_implements($class))
				) {
					$instance = new $class;
					$block->setRenderCallback([ $instance, 'render' ]);
				}
				$blockTypes[] = $block;
			} catch ( \Exception $e ) {
				throw Exception::formOtherException($e);
			}
		}
		try {
			$collection->setBlocks($blockTypes);
		} catch ( \Exception $e ) {
			throw Exception::formOtherException($e);
		}


	}


	/**
	 *
	 */
	public function registerBlocks()
	{
		/** @var Collection $collection */
		$collection = $this->getBlockCollection();
		$collection->setNamespace($this->namespace);
		foreach ( $collection->getBlocks() as $block ) {
			$register = new RegisterBlock(
				$block,
				$this->getDirName(),
				$this->getRootUrl(),
				$this->namespace

			);
			$register->register();
		}
	}

	/**
	 * @return Collection
	 */
	public function getBlockCollection(): Collection
	{
		return $this->make('BLOCKS_COLLECTION');
	}


}