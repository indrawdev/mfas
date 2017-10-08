<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MApkBadanUsaha extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listBadanUsahaAll($sCari)
	{
		$xSQL = ("

		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listBadanUsaha($sCari, $nStart, $nLimit)
	{
		$xSQL = ("

		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}