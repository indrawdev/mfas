<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MSearch extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function getLembaga($sKode)
	{
		$xSQL = ("
			SELECT fs_kode_lembaga_keuangan1, 
				fs_kode_lembaga_keuangan2, fs_nama_lembaga_keuangan
			FROM tm_lembagakeuangan
			WHERE fs_kode_cabang = '".trim($sKode)."'
		");

		$xSQL = $xSQL.("
			ORDER BY fs_kode_lembaga_keuangan1 ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getReferensi($sKode) 
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nilai2_referensi, fs_nama_referensi
			FROM tm_referensi
			WHERE fs_kode_referensi = '".trim($sKode)."'
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nilai1_referensi ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tm_cabang
			WHERE fs_aktif = '1'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_cabang LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabang($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tm_cabang
			WHERE fs_aktif = '1'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_cabang LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_cabang ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}