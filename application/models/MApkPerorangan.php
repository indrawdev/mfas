<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MApkPerorangan extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkAPK($sKdCab, $nNoApk)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fn_no_apk, fs_nama_konsumen
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($sKdCab)."' AND fn_no_apk = '".trim($nNoApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPeroranganAll()
	{

	}

	public function listPerorangan()
	{
		
	}

}