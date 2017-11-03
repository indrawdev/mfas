<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MTransferApk extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function single($nKdCab, $nApk)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk 
			WHERE fs_kode_cabang = '".trim($nKdCab)."' 
			AND fn_no_apk = '".trim($nApk)."' 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function double($nKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.*
			FROM tx_apk a 
			LEFT JOIN tx_apk_pengurus b ON b.fs_kode_cabang = a.fs_kode_cabang 
			AND b.fn_no_apk = a.fn_no_apk 
			WHERE a.fs_kode_cabang = '".trim($nKdCab)."' 
			AND a.fn_no_apk = '".trim($nApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function detail($nKdCab, $nApk)
	{
		$xSQL = ("
			SELECT b.*
			FROM tx_apk a 
			LEFT JOIN tx_apk_detailtransaksi b ON b.fs_kode_cabang = a.fs_kode_cabang 
			AND b.fn_no_apk = a.fn_no_apk 
			WHERE a.fs_kode_cabang = '".trim($nKdCab)."'
			AND a.fn_no_apk = '".trim($nApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listTransferAll($sCari)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fd_tgl_apk, 
				a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi,
				a.fn_nomor_perjanjian, a.fs_nama_konsumen, b.fs_nama_referensi as keputusan_kredit,
				a.fs_catatan_analisa
			FROM tx_apk a JOIN tm_referensi b ON b.fs_nilai1_referensi = a.fs_keputusan_kredit
			AND b.fs_kode_referensi = 'keputusan_kredit'
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1'
			AND a.fs_flag_transfer = '0' AND a.fs_keputusan_kredit = 'Y'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listTransfer($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fd_tgl_apk, 
				a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi,
				a.fn_nomor_perjanjian, a.fs_nama_konsumen, b.fs_nama_referensi as keputusan_kredit,
				a.fs_catatan_analisa
			FROM tx_apk a JOIN tm_referensi b ON b.fs_nilai1_referensi = a.fs_keputusan_kredit
			AND b.fs_kode_referensi = 'keputusan_kredit'
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1'
			AND a.fs_flag_transfer = '0' AND a.fs_keputusan_kredit = 'Y'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%')
			");
		}
		
		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}