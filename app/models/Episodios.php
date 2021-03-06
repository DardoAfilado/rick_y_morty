<?php

class Episodios extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $name;

    /**
     *
     * @var string
     */
    public $air_date;

    /**
     *
     * @var string
     */
    public $episode;

    /**
     *
     * @var string
     */
    public $url;

    /**
     *
     * @var string
     */
    public $created;

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema("rick_y_morty");
        $this->setSource("episodios");
    }

    /**
     * Allows to query a set of records that match the specified conditions
     *
     * @param mixed $parameters
     * @return Episodios[]|Episodios|\Phalcon\Mvc\Model\ResultSetInterface
     */
    public static function find($parameters = null): \Phalcon\Mvc\Model\ResultsetInterface
    {
        return parent::find($parameters);
    }

    /**
     * Allows to query the first record that match the specified conditions
     *
     * @param mixed $parameters
     * @return Episodios|\Phalcon\Mvc\Model\ResultInterface
     */
    public static function findFirst($parameters = null)
    {
        return parent::findFirst($parameters);
    }

}
