<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MEmail extends CI_Model {

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function config($sCategory) 
	{
		$xSQL = ("
			SELECT *
			FROM config_email
			WHERE category = '".trim($sCategory)."' AND status = '1'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

	public function user($sUser)
	{
		$xSQL = ("
			SELECT fs_username, fs_email
			FROM tm_user
			WHERE fs_username = '".trim($sUser)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}
}