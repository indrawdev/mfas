<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MGroup extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listGroupAll($sCari)
	{
		$xSQL = ("
			SELECT *,
			CASE fs_jenis_pembiayaan WHEN 'P' THEN 'PERORANGAN' 
			WHEN 'W' THEN 'WIRASWASTA' WHEN 'B' THEN 'BADAN USAHA' ELSE '' END fs_jenis 
			FROM tx_apk
			WHERE fs_fleet = 'Y'
			AND fn_no_batch IS NULL AND (fs_flag_survey = '0' OR fs_flag_keputusan = '0')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listGroup($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *,
			CASE fs_jenis_pembiayaan WHEN 'P' THEN 'PERORANGAN' 
			WHEN 'W' THEN 'WIRASWASTA' WHEN 'B' THEN 'BADAN USAHA' ELSE '' END fs_jenis 
			FROM tx_apk
			WHERE fs_fleet = 'Y'
			AND fn_no_batch IS NULL AND (fs_flag_survey = '0' OR fs_flag_keputusan = '0')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_konsumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listUnGroupAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_fleet = 'Y'
			AND (fs_flag_survey = '0' AND fs_flag_keputusan = '0')
			AND fn_no_batch IS NOT NULL
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listUnGroup($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_fleet = 'Y'
			AND (fs_flag_survey = '0' AND fs_flag_keputusan = '0')
			AND fn_no_batch IS NOT NULL
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY fn_no_batch
			ORDER BY fs_nama_konsumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDetailAll($nBatch, $sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = '0' AND fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDetail($nBatch, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = '0' AND fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}