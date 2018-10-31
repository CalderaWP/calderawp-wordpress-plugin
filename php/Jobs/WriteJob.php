<?php


namespace calderawp\WordPressPlugin\Jobs;


abstract class WriteJob extends Job
{

    /**
     * @var string
     */
    protected $writePath;

    public function getWritePath()
    {
        return $this->writePath;
    }
}
