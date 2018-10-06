<?php


namespace calderawp\WordPressPlugin\Tests\Mock;


use calderawp\WordPressPlugin\Traits\ConvertsToArrayFromGetters;
use calderawp\WordPressPlugin\Traits\CreatesFromArrayWithSetters;

class ToArrayWithGettersMock
{

    use ConvertsToArrayFromGetters;
    /** @var string */
    protected $food;
    /** @var int */
    protected $count;

    /**
     * @return string
     */
    public function getFood(): string
    {
        return $this->food;
    }

    /**
     * @param string $food
     * @return ToArrayWithGettersMock
     */
    public function setFood(string $food): ToArrayWithGettersMock
    {
        $this->food = $food;
        return $this;
    }

    /**
     * @return int
     */
    public function getCount(): int
    {
        return $this->count;
    }

    /**
     * @param int $count
     * @return ToArrayWithGettersMock
     */
    public function setCount(int $count): ToArrayWithGettersMock
    {
        $this->count = $count;
        return $this;
    }



}