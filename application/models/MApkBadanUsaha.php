<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MApkBadanUsaha extends CI_Model {

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

	public function checkPengurus($sKdCab, $nNoApk, $sKdJab, $sNama)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fn_no_apk, fs_kode_jabatan, fs_nama_pengurus
			FROM tx_apk_pengurus
			WHERE fs_kode_cabang = '".trim($sKdCab)."' AND fn_no_apk = '".trim($nNoApk)."'
			AND fs_kode_jabatan = '".trim($sKdJab)."' AND fs_nama_pengurus = '".trim($sNama)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listBadanUsahaAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_jenis_pembiayaan = 'B'
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

	public function listBadanUsaha($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_jenis_pembiayaan = 'B'
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

	public function listPengurusAll($nApk, $sCari)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_jabatan, a.fs_nama_pengurus, a.fs_alamat_pengurus,
				a.fs_kodepos_pengurus, a.fs_kota_pengurus, a.fs_ktp_pengurus,
				a.fs_npwp_pengurus, a.fn_persen_saham, a.fs_aktif, 
				b.fs_nama_referensi as fs_nama_jabatan
			FROM tx_apk_pengurus a
			LEFT JOIN tm_referensi b ON b.fs_kode_referensi = 'jabatan_pengurus' 
			AND  b.fs_nilai1_referensi = a.fs_kode_jabatan
			WHERE a.fn_no_apk = '".trim($nApk)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND a.fs_nama_pengurus LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPengurus($nApk, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_kode_jabatan, a.fs_nama_pengurus, a.fs_alamat_pengurus,
				a.fs_kodepos_pengurus, a.fs_kota_pengurus, a.fs_ktp_pengurus,
				a.fs_npwp_pengurus, a.fn_persen_saham, a.fs_aktif, 
				b.fs_nama_referensi as fs_nama_jabatan
			FROM tx_apk_pengurus a
			LEFT JOIN tm_referensi b ON b.fs_kode_referensi = 'jabatan_pengurus' 
			AND  b.fs_nilai1_referensi = a.fs_kode_jabatan
			WHERE a.fn_no_apk = '".trim($nApk)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND a.fs_nama_pengurus LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fd_tanggal_buat DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}