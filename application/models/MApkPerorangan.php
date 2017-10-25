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

	public function listPeroranganAll($sKdCab, $sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_jenis_pembiayaan <> 'B'
			AND fs_kode_cabang = '".trim($sKdCab)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%' 
					OR fn_no_apk LIKE '%".trim($sCari)."%')
			");
		}
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPerorangan($sKdCab, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_jenis_pembiayaan <> 'B'
			AND fs_kode_cabang = '".trim($sKdCab)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%' 
					OR fn_no_apk LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fd_tgl_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}