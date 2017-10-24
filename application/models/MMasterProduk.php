<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MMasterProduk extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkProduk($sKdCab)
	{
		$xSQL = ("
			SELECT fs_kode_cabang
			FROM tm_produk
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPolaAll($sCari)
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nilai2_referensi, fs_nama_referensi
			FROM tm_referensi
			WHERE fs_kode_referensi = 'pola_transaksi'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPola($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nilai2_referensi, fs_nama_referensi
			FROM tm_referensi
			WHERE fs_kode_referensi = 'pola_transaksi'
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nilai1_referensi ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listProdukAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nilai_1, fs_nilai_2, fs_nama_produk
			FROM tm_produk
			WHERE fs_kode_cabang = '".trim($sCari)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listProduk($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_nilai_1, fs_nilai_2, fs_nama_produk
			FROM tm_produk
			WHERE fs_kode_cabang = '".trim($sCari)."'
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nilai_1 ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

}