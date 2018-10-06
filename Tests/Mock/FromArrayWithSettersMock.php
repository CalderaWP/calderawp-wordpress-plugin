<?php


namespace calderawp\WordPressPlugin\Tests\Mock;


use calderawp\WordPressPlugin\Traits\CreatesFromArrayWithSetters;

class FromArrayWithSettersMock
{

    use CreatesFromArrayWithSetters;
    /** @var string */
    protected $food;

    /**
     * @return string
     */
    public function getFood(): string
    {
        return $this->food;
    }

    /**
     * @param string $food
     * @return FromArrayWithSettersMock
     */
    public function setFood(string $food): FromArrayWithSettersMock
    {
        $this->food = $food;
        return $this;
    }

    /**
     * @return int
     */
    public function getBooms(): int
    {
        return $this->booms;
    }

    /**
     * @param int $booms
     * @return FromArrayWithSettersMock
     */
    public function setBooms(int $booms): FromArrayWithSettersMock
    {
        $this->booms = $booms;
        return $this;
    }
    /** @var int */
    protected $booms;
}