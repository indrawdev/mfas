<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MMasterSurveyor extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkSurveyor($sKode)
	{
		$xSQL = ("
			SELECT fs_kode_surveyor, fs_kode_surveyor_lama, fs_nama_surveyor
			FROM tm_surveyor
			WHERE fs_kode_surveyor = '".trim($sKode)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listSurveyorAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_surveyor, fs_kode_surveyor_lama,
				fs_nama_surveyor, fs_alamat_surveyor, fs_ktp_surveyor, 
				fs_handphone_surveyor, fs_aktif
			FROM tm_surveyor
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (fs_kode_surveyor LIKE '%".trim($sCari)."%' 
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listSurveyor($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_surveyor, fs_kode_surveyor_lama,
				fs_nama_surveyor, fs_alamat_surveyor, fs_ktp_surveyor, 
				fs_handphone_surveyor, fs_aktif
			FROM tm_surveyor
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (fs_kode_surveyor LIKE '%".trim($sCari)."%' 
					OR fs_nama_surveyor LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fd_tanggal_buat DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}