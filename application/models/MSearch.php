<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MSearch extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
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

	public function listLembagaAll($sKode, $sCari)
	{
		$xSQL = ("
			SELECT fs_kode_lembaga_keuangan1, 
				fs_kode_lembaga_keuangan2, fs_nama_lembaga_keuangan
			FROM tm_lembaga_keuangan
			WHERE fs_kode_cabang = '".trim($sKode)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_lembaga_keuangan LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listLembaga($sKode, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_lembaga_keuangan1, 
				fs_kode_lembaga_keuangan2, fs_nama_lembaga_keuangan
			FROM tm_lembaga_keuangan
			WHERE fs_kode_cabang = '".trim($sKode)."'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_lembaga_keuangan LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nama_lembaga_keuangan ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDatiAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_dati, fs_nama_dati, fs_kodepos, fs_kelurahan, fs_kecamatan, fs_propinsi
			FROM tm_dati
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (fs_nama_dati LIKE '%".trim($sCari)."%'
					OR fs_kodepos LIKE '%".trim($sCari)."%'
					OR fs_kelurahan LIKE '%".trim($sCari)."%'
					OR fs_kecamatan LIKE '%".trim($sCari)."%'
					OR fs_propinsi LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDati($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_dati, fs_nama_dati, fs_kodepos, fs_kelurahan, fs_kecamatan, fs_propinsi
			FROM tm_dati
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE (fs_nama_dati LIKE '%".trim($sCari)."%'
					OR fs_kodepos LIKE '%".trim($sCari)."%'
					OR fs_kelurahan LIKE '%".trim($sCari)."%'
					OR fs_kecamatan LIKE '%".trim($sCari)."%'
					OR fs_propinsi LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_id ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKategoriUsahaAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_sektor_ekonomi, fs_nama_sektor_ekonomi
			FROM tm_usaha
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_nama_sektor_ekonomi LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKategoriUsaha($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_sektor_ekonomi, fs_nama_sektor_ekonomi
			FROM tm_usaha
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_nama_sektor_ekonomi LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_sektor_ekonomi ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPekerjaanAll($sCari)
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nama_referensi
			FROM tm_referensi
			WHERE fs_kode_referensi = 'kode_pekerjaan'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_referensi LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPekerjaan($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_nilai1_referensi, fs_nama_referensi
			FROM tm_referensi
			WHERE fs_kode_referensi = 'kode_pekerjaan'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_referensi LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_nilai1_referensi ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKendaraanAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_kendaraan, fs_kode_kendaraan_lama,
				fs_model_kendaraan, fs_jenis_kendaraan,
				fs_merek_kendaraan, fs_silinder_kendaraan
			FROM tm_kendaraan
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_model_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_jenis_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_merek_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_silinder_kendaraan LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKendaraan($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_kendaraan, fs_kode_kendaraan_lama,
				fs_model_kendaraan, fs_jenis_kendaraan,
				fs_merek_kendaraan, fs_silinder_kendaraan
			FROM tm_kendaraan
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_model_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_jenis_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_merek_kendaraan LIKE '%".trim($sCari)."%'
					OR fs_silinder_kendaraan LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_kendaraan ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPerusahaanAsuransiAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_asuransi1, fs_kode_asuransi2,
				fs_nama_perusahaan_asuransi, fs_alamat_perusahaan_asuransi,
				fs_kota_perusahaan_asuransi, fs_kodepos_perusahaan_asuransi,
				fs_perwakilan_perusahaan_asuransi, fs_email_perwakilan_perusahaan_asuransi,
				fs_telfon_perusahaan_asuransi, fs_fax_perusahaan_asuransi
			FROM tm_perusahaan_asuransi
			WHERE fs_aktif = '1'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_perusahaan_asuransi LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPerusahaanAsuransi($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_asuransi1, fs_kode_asuransi2,
				fs_nama_perusahaan_asuransi, fs_alamat_perusahaan_asuransi,
				fs_kota_perusahaan_asuransi, fs_kodepos_perusahaan_asuransi,
				fs_perwakilan_perusahaan_asuransi, fs_email_perwakilan_perusahaan_asuransi,
				fs_telfon_perusahaan_asuransi, fs_fax_perusahaan_asuransi
			FROM tm_perusahaan_asuransi
			WHERE fs_aktif = '1'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_perusahaan_asuransi LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_asuransi1 ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPlatKendaraanAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_plat, fs_wilayah, fs_kode_wilayah
			FROM tm_plat_kendaraan
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_wilayah LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPlatKendaraan($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_plat, fs_wilayah, fs_kode_wilayah
			FROM tm_plat_kendaraan
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				WHERE fs_wilayah LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_plat ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDealerAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_dealer1, fs_kode_dealer2,
				fn_cabang_dealer, fs_nama_dealer, fs_alamat_dealer,
				fs_kota_dealer, fs_kodepos_dealer, fs_telepon_dealer,
				fs_handphone_dealer, fs_nama_pemilik, fs_npwp_pemilik,
				fs_ktp_pemilik, fs_nama_bank_pencairan, fs_rekening_bank_pencairan,
				fs_atasnama_bank_pencairan, fn_persen_refund_bunga, fn_persen_refund_asuransi
			FROM tm_dealer
			WHERE fs_aktif = '1'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_dealer LIKE '%".trim($sCari)."%'
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDealer($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_cabang, fs_kode_dealer1, fs_kode_dealer2,
				fn_cabang_dealer, fs_nama_dealer, fs_alamat_dealer,
				fs_kota_dealer, fs_kodepos_dealer, fs_telepon_dealer,
				fs_handphone_dealer, fs_nama_pemilik, fs_npwp_pemilik,
				fs_ktp_pemilik, fs_nama_bank_pencairan, fs_rekening_bank_pencairan,
				fs_atasnama_bank_pencairan, fn_persen_refund_bunga, fn_persen_refund_asuransi
			FROM tm_dealer
			WHERE fs_aktif = '1'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND fs_nama_dealer LIKE '%".trim($sCari)."%'
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fs_kode_dealer1 ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPerluasanAll($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT fs_jenis_perluasan, fn_tahun_ke
			FROM tx_apk_perluasan
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPerluasan($sKdCab, $nApk, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_jenis_perluasan, fn_tahun_ke
			FROM tx_apk_perluasan
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
		");

		$xSQL = $xSQL.("
			ORDER BY fd_tanggal_buat DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listMasterTransAll($sCari)
	{
		$xSQL = ("
			SELECT fs_kode_transaksi, fs_nama_transaksi, 
				fs_kode_perkiraan, fs_penjelasan_transaksi 
			FROM tm_detailtransaksi
			WHERE fs_aktif = '1'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listMasterTrans($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_transaksi, fs_nama_transaksi, 
				fs_kode_perkiraan, fs_penjelasan_transaksi 
			FROM tm_detailtransaksi
			WHERE fs_aktif = '1'
		");

		$xSQL = $xSQL.("
			ORDER BY fs_kode_transaksi ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listTransaksiAll($sKdCab, $nApk)
	{
		$xSQL = ("
			SELECT fs_kode_transaksi, fs_nama_transaksi, 
				fn_persentase_nilai_transaksi, fn_nilai_transaksi, 
				fs_tagih_ke_konsumen, fs_cair_ke_dealer
			FROM tx_apk_detailtransaksi
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listTransaksi($sKdCab, $nApk, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT fs_kode_transaksi, fs_nama_transaksi, 
				fn_persentase_nilai_transaksi, fn_nilai_transaksi, 
				fs_tagih_ke_konsumen, fs_cair_ke_dealer
			FROM tx_apk_detailtransaksi
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
		");

		$xSQL = $xSQL.("
			ORDER BY fd_tanggal_buat DESC LIMIT ".$nStart.",".$nLimit."
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

	public function getProduk($sKdCab)
	{
		$xSQL = ("
			SELECT fs_nilai_1, fs_nilai_2, fs_nama_produk
			FROM tm_produk
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
		");

		$xSQL = $xSQL.("
			ORDER BY fs_nilai_1 ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function getCounter($sKdCab, $sJnsCtr, $nNoJns)
	{
		$xSQL = ("
			SELECT fn_counter
			FROM tm_counter
			WHERE fs_kode_cabang = '".trim($sKdCab)."'
			AND fs_jenis_counter = '".trim($sJnsCtr)."'
			AND fs_no_jenis_counter = '".trim($nNoJns)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL->row();
	}

}