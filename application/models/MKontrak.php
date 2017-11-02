<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MKontrak extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkKontrak($nKode)
	{
		$xSQL = ("
			SELECT fs_kode_dokumen, fs_nama_dokumen
			FROM tm_dokumen_cetak
			WHERE fs_kode_dokumen = '".trim($nKode)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkCetak($sKdCab, $nApk, $nKode)
	{
		$xSQL = ("
			SELECT fs_kode_dokumen
			FROM tx_apk_cetak
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
			AND fs_kode_dokumen = '".trim($nKode)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKonsumenAll($sKdCab, $sCari)
	{
		$xSQL = ("
			SELECT fn_no_apk, fd_tgl_apk, fs_nama_konsumen
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($sKdCab)."' 
			AND (fs_keputusan_kredit = 'Y' OR fs_keputusan_kredit = 'N')
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

	public function listKonsumen($sKdCab, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fn_no_apk, fd_tgl_apk, fs_nama_konsumen
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND (fs_keputusan_kredit = 'Y' OR fs_keputusan_kredit = 'N')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKontrakAll($sFlag, $sCari)
	{
		$xSQL = ("
			SELECT fs_kode_dokumen, fs_jenis_piutang, fs_nama_dokumen, 
				fs_template_dokumen, fn_batas_cetak, fn_flag_preview, fs_setuju
			FROM tm_dokumen_cetak 
			WHERE fn_flag_preview = '0' AND fs_setuju = '".trim($sFlag)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKontrak($sFlag, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_dokumen, fs_jenis_piutang, fs_nama_dokumen, 
				fs_template_dokumen, fn_batas_cetak, fn_flag_preview, fs_setuju
			FROM tm_dokumen_cetak 
			WHERE fn_flag_preview = '0' AND fs_setuju = '".trim($sFlag)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_dokumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}