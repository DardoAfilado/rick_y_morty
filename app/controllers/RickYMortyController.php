<?php
declare(strict_types=1);

class RickYMortyController extends ControllerBase
{
	
    public function indexAction()
    {
		$this->assets->addJs('/rick_y_morty/public/js/rick_y_morty.js');
		$this->assets->addCss('/rick_y_morty/public/css/rick_y_morty.css');
    }

}

