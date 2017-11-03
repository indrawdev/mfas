<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MLogging extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listActivityAll($sCari)
	{

	}

	public function listActivity($sCari, $nStart, $nLimit)
	{

	}

}