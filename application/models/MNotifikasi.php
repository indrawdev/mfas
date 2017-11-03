<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MNotifikasi extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function isSupport()
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nilai2_referensi, fs_nama_referensi 
			FROM tm_referensi 
			WHERE fs_kode_referensi = 'support_contact'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCheckDokumenAll($sKdCab)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_lokasi, a.fs_nomor_dealer, 
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian, 
				a.fs_nama_konsumen, 
			(SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - 
			COUNT(b.fs_kode_dokumen) AS hitung
			FROM tx_apk a 
			LEFT JOIN tx_apk_data_pendukung b ON b.fn_no_apk = a.fn_no_apk 
			AND b.fs_kode_cabang = a.fs_kode_cabang
			LEFT JOIN tm_data_pendukung c 
			ON b.fs_kode_dokumen = c.fs_kode_dokumen
			AND c.fs_wajib = 1
			WHERE a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_apk 
			HAVING (SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - COUNT(b.fs_kode_dokumen)> 0
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCheckDokumen($sKdCab, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_lokasi, a.fs_nomor_dealer, 
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian, 
				a.fs_nama_konsumen, 
			(SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - 
			COUNT(b.fs_kode_dokumen) AS hitung
			FROM tx_apk a 
			LEFT JOIN tx_apk_data_pendukung b ON b.fn_no_apk = a.fn_no_apk
			AND b.fs_kode_cabang = a.fs_kode_cabang
			LEFT JOIN tm_data_pendukung c 
			ON b.fs_kode_dokumen = c.fs_kode_dokumen
			AND c.fs_wajib = 1
			WHERE a.fs_kode_cabang = '".trim($sKdCab)."'
		");

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_apk 
			HAVING (SELECT COUNT(fs_kode_dokumen) FROM tm_data_pendukung WHERE fs_wajib = 1) - COUNT(b.fs_kode_dokumen)> 0
			ORDER BY a.fn_no_apk LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}