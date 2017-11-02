<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MInputSurvey extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function checkDataPendukung($nKdCab, $nApk, $nKdDoc)
	{
		$xSQL = ("
			SELECT fn_no_apk, fs_kode_dokumen
			FROM tx_apk_data_pendukung
			WHERE fs_kode_cabang = '".trim($nKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
			AND fs_kode_dokumen = '".trim($nKdDoc)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkDeleteFile($file)
	{
		$xSQL = ("
			SELECT b.fn_no_apk, b.fs_flag_transfer
			FROM tx_apk_data_pendukung a
			LEFT JOIN tx_apk b ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE b.fs_flag_transfer <> '0' AND a.fs_dokumen_upload = '".trim($file)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listRetailAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '0' AND fs_flag_keputusan = '0'
			AND fs_fleet = 'N'
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

	public function listRetail($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '0' AND fs_flag_keputusan = '0'
			AND fs_fleet = 'N'
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

	public function listFleetAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '0' AND fs_flag_keputusan = '0'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
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
			ORDER BY fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listFleet($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_flag_survey = '0' AND fs_flag_keputusan = '0'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
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
			ORDER BY fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKonsumenAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '0'
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

	public function listKonsumen($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '0'
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

	public function listHasilSurveyAll($sCari)
	{
		$xSQL = ("
			SELECT 
				a.fs_nama_konsumen as nama_konsumen, a.fd_tanggal_survey as tanggal_survey,
				a.fs_petugas_survey as petugas_survey, a.fn_lama_survey as lama_survey, 
				a.fn_jumlah_kendaraan as jumlah_kendaraan, b.fs_nama_referensi as kondisi_lingkungan, 
				c.fs_nama_referensi as kondisi_kantor, a.fs_catatan_tempat_tinggal as catatan_tempat_tinggal,
				a.fs_catatan_lingkungan as catatan_lingkungan, a.fs_catatan_tempat_usaha as catatan_tempat_usaha,
				CASE a.fs_garasi WHEN 'Y' THEN 'YA' WHEN 'T' THEN 'TIDAK' END garasi,
				a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian
			FROM tx_apk a JOIN tm_referensi b on b.fs_nilai1_referensi =  a.fs_kondisi_lingkungan
			AND b.fs_kode_referensi = 'kondisi_lingkungan_setempat'
			JOIN tm_referensi c on c.fs_nilai1_referensi = a.fs_kondisi_kantor
			AND c.fs_kode_referensi = 'kondisi_kantor'
			WHERE a.fs_flag_survey = '0' AND a.fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listHasilSurvey($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT 
				a.fs_nama_konsumen as nama_konsumen, a.fd_tanggal_survey as tanggal_survey,
				a.fs_petugas_survey as petugas_survey, a.fn_lama_survey as lama_survey, 
				a.fn_jumlah_kendaraan as jumlah_kendaraan, b.fs_nama_referensi as kondisi_lingkungan, 
				c.fs_nama_referensi as kondisi_kantor, a.fs_catatan_tempat_tinggal as catatan_tempat_tinggal,
				a.fs_catatan_lingkungan as catatan_lingkungan, a.fs_catatan_tempat_usaha as catatan_tempat_usaha,
				CASE a.fs_garasi WHEN 'Y' THEN 'YA' WHEN 'T' THEN 'TIDAK' END garasi,
				a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian
			FROM tx_apk a JOIN tm_referensi b on b.fs_nilai1_referensi =  a.fs_kondisi_lingkungan
			AND b.fs_kode_referensi = 'kondisi_lingkungan_setempat'
			JOIN tm_referensi c on c.fs_nilai1_referensi = a.fs_kondisi_kantor
			AND c.fs_kode_referensi = 'kondisi_kantor'
			WHERE a.fs_flag_survey = '0' AND a.fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listSurveyorAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_surveyor, fs_kode_surveyor_lama, fs_nama_surveyor,
				fs_alamat_surveyor, fs_ktp_surveyor, fs_handphone_surveyor, fs_aktif
			FROM tm_surveyor
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listSurveyor($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_surveyor, fs_kode_surveyor_lama, fs_nama_surveyor,
				fs_alamat_surveyor, fs_ktp_surveyor, fs_handphone_surveyor, fs_aktif
			FROM tm_surveyor
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nama_surveyor LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPendukungAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_dokumen, fs_jenis_pembiayaan, fs_nama_dokumen, fs_jenis_dokumen,
			CASE fs_wajib WHEN '1' THEN 'WAJIB DIISI' WHEN '0' THEN 'PILIHAN' END wajib
			FROM tm_data_pendukung
			WHERE fs_jenis_dokumen = 'SURVEY'
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

	public function listPendukung($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_dokumen, fs_jenis_pembiayaan, fs_nama_dokumen, fs_jenis_dokumen,
			CASE fs_wajib WHEN '1' THEN 'WAJIB DIISI' WHEN '0' THEN 'PILIHAN' END wajib
			FROM tm_data_pendukung
			WHERE fs_jenis_dokumen = 'SURVEY'
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
