<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MHelpDesk extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listBantuanAll($sKdCab, $sUser, $sCari)
	{
		$xSQL = ("
			SELECT a.fs_kode_cabang, a.fs_username, a.fs_judul, a.fs_pesan,
				b.fs_nama_referensi as fs_kategori, c.fs_nama_referensi as fs_status
			FROM tx_bantuan a
			LEFT JOIN tm_referensi b ON b.fs_kode_referensi = 'helpdesk_kategori' AND b.fs_nilai1_referensi = a.fs_kategori
			LEFT JOIN tm_referensi c ON c.fs_kode_referensi = 'helpdesk_status' AND c.fs_nilai1_referensi = a.fs_flag_status
			WHERE a.fs_kode_cabang = '".trim($sKdCab)."' 
			AND a.fs_username = '".trim($sUser)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_judul LIKE '%".trim($sCari)."%' 
					OR a.fs_pesan LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listBantuan($sKdCab, $sUser, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fs_kode_cabang, a.fs_username, a.fs_judul, a.fs_pesan,
				b.fs_nama_referensi as fs_kategori, c.fs_nama_referensi as fs_status
			FROM tx_bantuan a
			LEFT JOIN tm_referensi b ON b.fs_kode_referensi = 'helpdesk_kategori' AND b.fs_nilai1_referensi = a.fs_kategori
			LEFT JOIN tm_referensi c ON c.fs_kode_referensi = 'helpdesk_status' AND c.fs_nilai1_referensi = a.fs_flag_status
			WHERE a.fs_kode_cabang = '".trim($sKdCab)."' 
			AND a.fs_username = '".trim($sUser)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_judul LIKE '%".trim($sCari)."%' 
					OR a.fs_pesan LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fd_tanggal_buat DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}