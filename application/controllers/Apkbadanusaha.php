<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Apkbadanusaha extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vapkbadanusaha');
	}

	// COMPONENT SELECT
	public function select() {
		$kode = trim($this->input->post('fs_kode_referensi'));
		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->getReferensi($kode);
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode' => trim($xRow->fs_nilai1_referensi),
						'fs_nama' => trim($xRow->fs_nama_referensi)
					);
			}
		}
		echo json_encode($xArr);
	}

	public function combo() {
		// NON AKTIF
		$array = array(1 => array('Y','YA'), 2 => array('N','TIDAK'));
		$out = array_values($array);
		echo json_encode($out);
	}

	// SELECT POLA TRANSAKSI
	public function pola() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->getProduk($cabang);
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode' => trim($xRow->fs_nilai_1),
						'fs_nama' => trim($xRow->fs_nilai_1)
					);
			}
		}
		echo json_encode($xArr);
	}

	public function getapk() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$this->load->model('MSearch');
		$counterapk = $this->MSearch->getCounter($cabang, 'APK', 0);
		return $counterapk->fn_counter;
	}

	public function getpjj($pola) {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$this->load->model('MSearch');
		$counterpjj = $this->MSearch->getCounter($cabang, 'PJJ', $pola);
		return $counterpjj->fn_counter;
	}

	public function setapk($newapk) {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$apk = $newapk + 1;
		$set = array(
			'fn_counter' => trim($apk)
		);
		$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_jenis_counter = 'APK'";
		$this->db->where($where);
		$this->db->update('tm_counter', $set);
	}

	public function setpjj($newpjj, $jenis) {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$pjj = $newpjj + 1;
		$set = array(
			'fn_counter' => trim($pjj)
		);
		$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_jenis_counter = 'PJJ' AND fs_no_jenis_counter = '".trim($jenis)."'";
		$this->db->where($where);
		$this->db->update('tm_counter', $set);
	}

	public function gridbadanusaha() {
		$sCabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->listBadanUsahaAll($sCabang, $sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MApkBadanUsaha->listBadanUsaha($sCabang, $sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_nama_lembaga_keuangan' => trim($xRow->fs_nama_lembaga_keuangan),
					'fs_kode_lokasi' => trim($xRow->fs_kode_lokasi),
					'fs_nomor_dealer' => trim($xRow->fs_nomor_dealer),
					'fs_jenis_piutang' => trim($xRow->fs_jenis_piutang),
					'fs_pola_transaksi' => trim($xRow->fs_pola_transaksi),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_fleet' => trim($xRow->fs_fleet),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_kode_dati_konsumen' => trim($xRow->fs_kode_dati_konsumen),
					'fs_propinsi_konsumen' => trim($xRow->fs_propinsi_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_npwp_konsumen' => trim($xRow->fs_npwp_konsumen),
					'fs_siup_perusahaan' => trim($xRow->fs_siup_perusahaan),
					'fs_tdp_perusahaan' => trim($xRow->fs_tdp_perusahaan),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_email_konsumen' => trim($xRow->fs_email_konsumen),
					'fs_group_perusahaan' => trim($xRow->fs_group_perusahaan),
					'fs_telfon_usaha_konsumen' => trim($xRow->fs_telfon_usaha_konsumen),
					'fs_nama_usaha_konsumen' => trim($xRow->fs_nama_usaha_konsumen),
					'fs_kategori_usaha_konsumen' => trim($xRow->fs_kategori_usaha_konsumen),
					'fs_skala_perusahaan_konsumen' => trim($xRow->fs_skala_perusahaan_konsumen),
					'fs_status_perusahaan' => trim($xRow->fs_status_perusahaan),
					'fs_bentuk_perusahaan' => trim($xRow->fs_bentuk_perusahaan),
					'fs_tempat_perusahaan' => trim($xRow->fs_tempat_perusahaan),
					'fs_beroperasi_sejak' => trim($xRow->fs_beroperasi_sejak),
					'fn_jumlah_karyawan_perusahaan' => trim($xRow->fn_jumlah_karyawan_perusahaan),
					'fs_keterangan_usaha_konsumen' => trim($xRow->fs_keterangan_usaha_konsumen),
					'fn_pendapatan_konsumen' => trim($xRow->fn_pendapatan_konsumen),
					'fn_biaya_konsumen' => trim($xRow->fn_biaya_konsumen),
					'fs_penanggungjawab_perusahaan' => trim($xRow->fs_penanggungjawab_perusahaan),
					'fs_jabatan_penanggungjawab_perusahaan' => trim($xRow->fs_jabatan_penanggungjawab_perusahaan),
					'fs_ktp_penanggungjawab_perusahaan' => trim($xRow->fs_ktp_penanggungjawab_perusahaan),
					'fs_npwp_penanggungjawab_perusahaan' => trim($xRow->fs_npwp_penanggungjawab_perusahaan),
					'fs_alamat_penanggungjawab_perusahaan' => trim($xRow->fs_alamat_penanggungjawab_perusahaan),
					'fs_kodepos_penanggungjawab_perusahaan' => trim($xRow->fs_kodepos_penanggungjawab_perusahaan),
					'fs_kota_penanggungjawab_perusahaan' => trim($xRow->fs_kota_penanggungjawab_perusahaan),
					'fs_telepon_penanggungjawab_perusahaan' => trim($xRow->fs_telepon_penanggungjawab_perusahaan),
					'fs_handphone_penanggungjawab_perusahaan' => trim($xRow->fs_handphone_penanggungjawab_perusahaan),
					'fs_repeat_order' => trim($xRow->fs_repeat_order),
					'fs_repeat_order_ke' => trim($xRow->fs_repeat_order_ke),
					'fs_alamat_korespondensi' => trim($xRow->fs_alamat_korespondensi),
					'fs_kodepos_korespondensi' => trim($xRow->fs_kodepos_korespondensi),
					'fs_kota_korespondensi' => trim($xRow->fs_kota_korespondensi),
					'fs_model_kendaraan' => trim($xRow->fs_model_kendaraan),
					'fs_kode_kendaraan' => trim($xRow->fs_kode_kendaraan),
					'fs_jenis_kendaraan' => trim($xRow->fs_jenis_kendaraan),
					'fs_silinder_kendaraan' => trim($xRow->fs_silinder_kendaraan),
					'fn_tahun_kendaraan' => trim($xRow->fn_tahun_kendaraan),
					'fs_warna_kendaraan' => trim($xRow->fs_warna_kendaraan),
					'fs_no_rangka' => trim($xRow->fs_no_rangka),
					'fs_no_mesin' => trim($xRow->fs_no_mesin),
					'fs_komersial' => trim($xRow->fs_komersial),
					'fs_nama_sesuai_kontrak' => trim($xRow->fs_nama_sesuai_kontrak),
					'fs_nama_bpkb' => trim($xRow->fs_nama_bpkb),
					'fs_alamat_bpkb' => trim($xRow->fs_alamat_bpkb),
					'fs_kota_bpkb' => trim($xRow->fs_kota_bpkb),
					'fs_nomor_bpkb' => trim($xRow->fs_nomor_bpkb),
					'fs_no_polisi' => trim($xRow->fs_no_polisi),
					'fs_kode_wilayah_no_polisi' => trim($xRow->fs_kode_wilayah_no_polisi),
					'fs_kode_akhir_wilayah_no_polisi' => trim($xRow->fs_kode_akhir_wilayah_no_polisi),
					'fs_salesman' => trim($xRow->fs_salesman),
					'fs_jenis_asuransi' => trim($xRow->fs_jenis_asuransi),
					'fs_nama_perusahaan_asuransi' => trim($xRow->fs_nama_perusahaan_asuransi),
					'fs_kode_asuransi1' => trim($xRow->fs_kode_asuransi1),
					'fs_kode_asuransi2' => trim($xRow->fs_kode_asuransi2),
					'fs_nama_dealer' => trim($xRow->fs_nama_dealer),
					'fn_cabang_dealer' => trim($xRow->fn_cabang_dealer),
					'fs_kode_dealer1' => trim($xRow->fs_kode_dealer1),
					'fs_kode_dealer2' => trim($xRow->fs_kode_dealer2),
					'fs_pola_angsuran' => trim($xRow->fs_pola_angsuran),
					'fs_cara_bayar' => trim($xRow->fs_cara_bayar),
					'fs_angsuran_dimuka' => trim($xRow->fs_angsuran_dimuka),
					'fn_kali_angsuran_dimuka' => trim($xRow->fn_kali_angsuran_dimuka),
					'fn_jumlah_angsuran_dimuka' => trim($xRow->fn_jumlah_angsuran_dimuka),
					'fn_biaya_tjh' => trim($xRow->fn_biaya_tjh),
					'fn_selisih_dp' => trim($xRow->fn_selisih_dp),
					'fs_angsuran_dimuka_potong_pencairan' => trim($xRow->fs_angsuran_dimuka_potong_pencairan),
					'fn_dp_bayar' => trim($xRow->fn_dp_bayar),
					'fs_angsuran_dibayar_dealer' => trim($xRow->fs_angsuran_dibayar_dealer),
					'fn_biaya_adm' => trim($xRow->fn_biaya_adm),
					'fn_premi_asuransi_gross' => trim($xRow->fn_premi_asuransi_gross),
					'fn_premi_asuransi' => trim($xRow->fn_premi_asuransi),
					'fn_premi_asuransi_gross_perluasan' => trim($xRow->fn_premi_asuransi_gross_perluasan),
					'fn_premi_asuransi_netto' => trim($xRow->fn_premi_asuransi_netto),
					'fn_denda_perhari' => trim($xRow->fn_denda_perhari),
					'fn_harga_otr' => trim($xRow->fn_harga_otr),
					'fn_uang_muka_dealer' => trim($xRow->fn_uang_muka_dealer),
					'fn_asuransi_dikredit_dealer' => trim($xRow->fn_asuransi_dikredit_dealer),
					'fn_pokok_pembiayaan_dealer' => trim($xRow->fn_pokok_pembiayaan_dealer),
					'fn_persen_bunga_efektif_dealer' => trim($xRow->fn_persen_bunga_efektif_dealer),
					'fn_bulan_masa_angsuran_dealer' => trim($xRow->fn_bulan_masa_angsuran_dealer),
					'fn_kali_masa_angsuran_dealer' => trim($xRow->fn_kali_masa_angsuran_dealer),
					'fn_bunga_dealer' => trim($xRow->fn_bunga_dealer),
					'fn_angsuran_dealer' => trim($xRow->fn_angsuran_dealer),
					'fn_angsuran_tidak_sama_dealer' => trim($xRow->fn_angsuran_tidak_sama_dealer),
					'fn_uang_muka_konsumen' => trim($xRow->fn_uang_muka_konsumen),
					'fn_asuransi_dikredit_konsumen' => trim($xRow->fn_asuransi_dikredit_konsumen),
					'fn_pokok_pembiayaan_konsumen' => trim($xRow->fn_pokok_pembiayaan_konsumen),
					'fn_persen_bunga_flat_konsumen' => trim($xRow->fn_persen_bunga_flat_konsumen),
					'fn_persen_bunga_efektif_konsumen' => trim($xRow->fn_persen_bunga_efektif_konsumen),
					'fn_bulan_masa_angsuran_konsumen' => trim($xRow->fn_bulan_masa_angsuran_konsumen),
					'fn_kali_masa_angsuran_konsumen' => trim($xRow->fn_kali_masa_angsuran_konsumen),
					'fn_bunga_konsumen' => trim($xRow->fn_bunga_konsumen),
					'fn_angsuran_konsumen' => trim($xRow->fn_angsuran_konsumen),
					'fn_angsuran_tidak_sama_konsumen' => trim($xRow->fn_angsuran_tidak_sama_konsumen),
					'fd_tanggal_perjanjian' => trim($xRow->fd_tanggal_perjanjian),
					'fd_tanggal_angsuran_pertama' => trim($xRow->fd_tanggal_angsuran_pertama),
					'fn_tanggal_jatuhtempo_perbulan' => trim($xRow->fn_tanggal_jatuhtempo_perbulan),
					'fs_cair_ke' => trim($xRow->fs_cair_ke),
					'fs_uang_muka_bayar_di' => trim($xRow->fs_uang_muka_bayar_di),
					'fs_deposit_potong_pencairan' => trim($xRow->fs_deposit_potong_pencairan),
					'fs_atasnama_bank_pencairan' => trim($xRow->fs_atasnama_bank_pencairan),
					'fs_nama_bank_pencairan' => trim($xRow->fs_nama_bank_pencairan),
					'fs_rekening_bank_pencairan' => trim($xRow->fs_rekening_bank_pencairan),
					'fn_nilai_pencairan' => trim($xRow->fn_nilai_pencairan),
					'fs_flag_apk' => trim($xRow->fs_flag_apk)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridlembaga() {
		$sKode = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listLembagaAll($sKode, $sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listLembaga($sKode, $sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_lembaga_keuangan1' => trim($xRow->fs_kode_lembaga_keuangan1),
					'fs_kode_lembaga_keuangan2' => trim($xRow->fs_kode_lembaga_keuangan2),
					'fs_nama_lembaga_keuangan' => trim($xRow->fs_nama_lembaga_keuangan)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridkodepos() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listDatiAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listDati($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_dati' => trim($xRow->fs_kode_dati),
					'fs_nama_dati' => trim($xRow->fs_nama_dati),
					'fs_kodepos' => trim($xRow->fs_kodepos),
					'fs_kelurahan' => trim($xRow->fs_kelurahan),
					'fs_kecamatan' => trim($xRow->fs_kecamatan),
					'fs_propinsi' => trim($xRow->fs_propinsi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridkategori() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listKategoriUsahaAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listKategoriUsaha($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_sektor_ekonomi' => trim($xRow->fs_kode_sektor_ekonomi),
					'fs_nama_sektor_ekonomi' => trim($xRow->fs_nama_sektor_ekonomi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpengurus() {
		$nApk = $this->input->post('fn_no_apk');
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->listPengurusAll($nApk, $sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MApkBadanUsaha->listPengurus($nApk, $sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_kode_jabatan' => trim($xRow->fs_kode_jabatan),
					'fs_nama_jabatan' => trim($xRow->fs_nama_jabatan),
					'fs_nama_pengurus' => trim($xRow->fs_nama_pengurus),
					'fs_alamat_pengurus' => trim($xRow->fs_alamat_pengurus),
					'fs_kodepos_pengurus' => trim($xRow->fs_kodepos_pengurus),
					'fs_kota_pengurus' => trim($xRow->fs_kota_pengurus),
					'fs_ktp_pengurus' => trim($xRow->fs_ktp_pengurus),
					'fs_npwp_pengurus' => trim($xRow->fs_npwp_pengurus),
					'fn_persen_saham' => trim($xRow->fn_persen_saham),
					'fs_aktif' => trim($xRow->fs_aktif)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridkendaraan() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listKendaraanAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listKendaraan($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_kendaraan' => trim($xRow->fs_kode_kendaraan),
					'fs_kode_kendaraan_lama' => trim($xRow->fs_kode_kendaraan_lama),
					'fs_model_kendaraan' => trim($xRow->fs_model_kendaraan),
					'fs_jenis_kendaraan' => trim($xRow->fs_jenis_kendaraan),
					'fs_merek_kendaraan' => trim($xRow->fs_merek_kendaraan),
					'fs_silinder_kendaraan' => trim($xRow->fs_silinder_kendaraan)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridasuransi() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listPerusahaanAsuransiAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listPerusahaanAsuransi($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_asuransi1' => trim($xRow->fs_kode_asuransi1),
					'fs_kode_asuransi2' => trim($xRow->fs_kode_asuransi2),
					'fs_nama_perusahaan_asuransi' => trim($xRow->fs_nama_perusahaan_asuransi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridplatkendaraan() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listPlatKendaraanAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listPlatKendaraan($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_plat' => trim($xRow->fs_kode_plat),
					'fs_wilayah' => trim($xRow->fs_wilayah),
					'fs_kode_wilayah' => trim($xRow->fs_kode_wilayah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function griddealer() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listDealerAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listDealer($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_dealer1' => trim($xRow->fs_kode_dealer1),
					'fs_kode_dealer2' => trim($xRow->fs_kode_dealer2),
					'fn_cabang_dealer' => trim($xRow->fn_cabang_dealer),
					'fs_nama_dealer' => trim($xRow->fs_nama_dealer),
					'fs_alamat_dealer' => trim($xRow->fs_alamat_dealer),
					'fs_kota_dealer' => trim($xRow->fs_kota_dealer),
					'fs_nama_pemilik' => trim($xRow->fs_nama_pemilik),
					'fs_nama_bank_pencairan' => trim($xRow->fs_nama_bank_pencairan),
					'fs_rekening_bank_pencairan' => trim($xRow->fs_rekening_bank_pencairan),
					'fs_atasnama_bank_pencairan' => trim($xRow->fs_atasnama_bank_pencairan),
					'fn_persen_refund_bunga' => trim($xRow->fn_persen_refund_bunga),
					'fn_persen_refund_asuransi' => trim($xRow->fn_persen_refund_asuransi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridperluasan() {
		$sKdCab = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$nApk = $this->input->post('fn_no_apk');

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listPerluasanAll($sKdCab, $nApk);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listPerluasan($sKdCab, $nApk, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_jenis_perluasan' => trim($xRow->fs_jenis_perluasan),
					'fn_tahun_ke' => trim($xRow->fn_tahun_ke)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridmastertrans() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listMasterTransAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listMasterTrans($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_transaksi' => trim($xRow->fs_kode_transaksi),
					'fs_nama_transaksi' => trim($xRow->fs_nama_transaksi),
					'fs_kode_perkiraan' => trim($xRow->fs_kode_perkiraan),
					'fs_penjelasan_transaksi' => trim($xRow->fs_penjelasan_transaksi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridtransaksi() {
		$sKdCab = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$nApk = $this->input->post('fn_no_apk');

		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listTransaksiAll($sKdCab, $nApk);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listTransaksi($sKdCab, $nApk, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_transaksi' => trim($xRow->fs_kode_transaksi),
					'fs_nama_transaksi' => trim($xRow->fs_nama_transaksi),
					'fn_persentase_nilai_transaksi' => trim($xRow->fn_persentase_nilai_transaksi),
					'fn_nilai_transaksi' => trim($xRow->fn_nilai_transaksi),
					'fs_tagih_ke_konsumen' => trim($xRow->fs_tagih_ke_konsumen),
					'fs_cair_ke_dealer' => trim($xRow->fs_cair_ke_dealer)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// SHOW PREVIEW APK
	public function preview($cabang, $noapk) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['user'] = $this->encryption->decrypt($this->session->userdata('username'));
		$data['cabang'] = $this->MReport->cabang($cabang, $noapk);
		$data['detail'] = $this->MReport->detail($cabang, $noapk);
		$data['pjj'] = $this->MReport->pjj($cabang, $noapk);

		// referensi
		$data['jenis_piutang'] = $this->MReport->ref_jenis_piutang($cabang, $noapk);
		$data['pola_transaksi'] = $this->MReport->ref_pola_transaksi($cabang, $noapk);
		$data['pola_angsuran'] = $this->MReport->ref_pola_angsuran($cabang, $noapk);
		$data['agama'] = $this->MReport->ref_agama($cabang, $noapk);
		$data['pendidikan'] = $this->MReport->ref_pendidikan($cabang, $noapk);
		$data['cara_bayar'] = $this->MReport->ref_cara_bayar($cabang, $noapk);
		$data['status_konsumen'] = $this->MReport->ref_status_konsumen($cabang, $noapk);
		$data['status_rumah'] = $this->MReport->ref_status_rumah($cabang, $noapk);
		$data['skala_perusahaan'] = $this->MReport->ref_skala_perusahaan($cabang, $noapk);
		$data['kondisi_lingkungan'] = $this->MReport->ref_kondisi_lingkungan($cabang, $noapk);
		$data['kondisi_kantor'] = $this->MReport->ref_kondisi_kantor($cabang, $noapk);
		$data['jenis_asuransi'] = $this->MReport->ref_jenis_asuransi($cabang, $noapk);
		$data['keputusan_kredit'] = $this->MReport->ref_keputusan_kredit($cabang, $noapk);

		// bidang usaha
		$data['lembaga_keuangan'] = $this->MReport->lembaga_keuangan($cabang, $noapk);
		$data['dealer'] = $this->MReport->dealer($cabang, $noapk);
		$data['dati'] = $this->MReport->dati($cabang, $noapk);
		$data['kategori_usaha'] = $this->MReport->kategori_usaha($cabang, $noapk);
		$data['usaha_konsumen'] = $this->MReport->usaha_konsumen($cabang, $noapk);
		$data['usaha_pasangan'] = $this->MReport->usaha_pasangan($cabang, $noapk);
		$data['usaha_penjamin'] = $this->MReport->usaha_penjamin($cabang, $noapk);
		$data['kendaraan'] = $this->MReport->kendaraan($cabang, $noapk);
		$data['denda_perhari'] = $this->MReport->denda_perhari();
		$data['detailltransaksi'] = $this->MReport->detailltransaksi($cabang, $noapk);
		$data['asuransi'] = $this->MReport->asuransi($cabang, $noapk);
		$data['pengurus'] = $this->MReport->pengurus($cabang, $noapk);
		$data['data_asuransi'] = $this->MReport->data_asuransi($cabang, $noapk);
		$data['data_asuransi_notmix'] = $this->MReport->data_asuransi_notmix($cabang, $noapk);
		$data['data_perluasan'] = $this->MReport->data_perluasan($cabang, $noapk);
		$data['internal_checking'] = $this->MReport->internal_checking($cabang, $noapk);
		$data['reject_checking'] = $this->MReport->reject_checking($cabang, $noapk);
		$data['family_checking'] = $this->MReport->family_checking($cabang, $noapk);
		$data['tanggal_cetak_spk'] = $this->MReport->tanggal_cetak_spk($cabang, $noapk);
		$data['tanggal_cetak_spo'] = $this->MReport->tanggal_cetak_spo($cabang, $noapk);

		$html = $this->load->view('print/vbadanusaha', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR PEMERIKSAAN APK');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-fpd-cabang.pdf', 'I');
	}

	public function duplikasi() {
		
	}

	// TAB DATA UTAMA
	public function ceksavedatautama() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkBadanUsaha');
			$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Data Konsumen sudah ada, apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => true,
					'hasil' => 'Data Konsumen belum ada, apakah Anda ingin menambah baru?'
				);
			echo json_encode($hasil);
		}
	}

	public function savedatautama() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$tanggal = $this->input->post('fd_tgl_apk');
		$jenis = $this->input->post('fs_jenis_pembiayaan');
		$piutang = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');
		$lokasi = $this->input->post('fs_kode_lokasi');
		$nodealer = $this->input->post('fs_nomor_dealer');
		$lembaga = $this->input->post('fs_nama_lembaga_keuangan');
		$nopjj = $this->input->post('fn_nomor_perjanjian');
		$fleet = $this->input->post('fs_fleet');
		$nama = $this->input->post('fs_nama_konsumen');
		$alamat = $this->input->post('fs_alamat_konsumen');
		$kelurahan = $this->input->post('fs_kelurahan_konsumen');
		$kecamatan = $this->input->post('fs_kecamatan_konsumen');
		$dati = $this->input->post('fs_kode_dati_konsumen');
		$propinsi = $this->input->post('fs_propinsi_konsumen');
		$kota = $this->input->post('fs_kota_konsumen');
		$kodepos = $this->input->post('fs_kodepos_konsumen');
		$npwp = $this->input->post('fs_npwp_konsumen');
		$siup = $this->input->post('fs_siup_perusahaan');
		$tdp = $this->input->post('fs_tdp_perusahaan');
		$telephone = $this->input->post('fs_telepon_konsumen');
		$email = $this->input->post('fs_email_konsumen');
		$group = $this->input->post('fs_group_perusahaan');

		$update = false;
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fd_tgl_apk' => trim($tanggal),
			'fs_jenis_pembiayaan' => trim($jenis),
			'fs_jenis_piutang' => trim($piutang),
			'fs_pola_transaksi' => trim($pola),
			'fs_kode_lokasi' => trim($lokasi),
			'fs_nomor_dealer' => trim($nodealer),
			'fs_nama_lembaga_keuangan' => trim($lembaga),
			'fs_fleet' => trim($fleet),
			'fs_nama_konsumen' => trim($nama),
			'fs_alamat_konsumen' => trim($alamat),
			'fs_kelurahan_konsumen' => trim($kelurahan),
			'fs_kecamatan_konsumen' => trim($kecamatan),
			'fs_kode_dati_konsumen' => trim($dati),
			'fs_propinsi_konsumen' => trim($propinsi),
			'fs_kota_konsumen' => trim($kota),
			'fs_kodepos_konsumen' => trim($kodepos),
			'fs_npwp_konsumen' => trim($npwp),
			'fs_siup_perusahaan' => trim($siup),
			'fs_tdp_perusahaan' => trim($tdp),
			'fs_telepon_konsumen' => trim($telephone),
			'fs_email_konsumen' => trim($email),
			'fs_group_perusahaan' => trim($group)
		);

		if ($update == false) {
			// GET COUNTER
			$newapk = $this->getapk();
			$newpjj = $this->getpjj($pola);

			$dt1 = array(
				'fs_kode_cabang' => trim($cabang),
				'fn_no_apk' => trim($newapk),
				'fn_nomor_perjanjian' => trim($newpjj),
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt1);
			$this->db->insert('tx_apk', $data);

			// UPDATE COUNTER
			$this->setapk($newapk);
			$this->setpjj($newpjj, $pola);

			$hasil = array(
						'sukses' => true,
						'noapk' => trim($newapk),
						'nopjj' => trim($newpjj),
						'hasil' => 'Simpan Data APK Baru, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);

			$hasil = array(
						'sukses' => true,
						'noapk' => trim($noapk),
						'nopjj' => trim($nopjj),
						'hasil' => 'Update Data APK '.trim($noapk).', Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	// TAB DATA BADAN USAHA
	public function ceksavebadanusaha() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkBadanUsaha');
			$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, APK Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savebadanusaha() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$teleponperusahaan = $this->input->post('fs_telfon_usaha_konsumen');
		$statusperusahaan = $this->input->post('fs_status_perusahaan');
		$bentukperusahaan = $this->input->post('fs_bentuk_perusahaan');
		$tempatperusahaan = $this->input->post('fs_tempat_perusahaan');
		$sejak = $this->input->post('fs_beroperasi_sejak');
		$skala = $this->input->post('fs_skala_perusahaan_konsumen');
		$namausaha = $this->input->post('fs_nama_usaha_konsumen');
		$kategoriusaha = $this->input->post('fs_kategori_usaha_konsumen');
		$jumlah = $this->input->post('fn_jumlah_karyawan_perusahaan');
		$keterangan = $this->input->post('fs_keterangan_usaha_konsumen');
		$pendapatan = $this->input->post('fn_pendapatan_konsumen');
		$biaya = $this->input->post('fn_biaya_konsumen');
		$debet = $this->input->post('fn_mutasi_debet');
		$kredit = $this->input->post('fn_mutasi_kredit');
		$penanggungjawab = $this->input->post('fs_penanggungjawab_perusahaan');
		$jabatan = $this->input->post('fs_jabatan_penanggungjawab_perusahaan');
		$ktp = $this->input->post('fs_ktp_penanggungjawab_perusahaan');
		$npwp = $this->input->post('fs_npwp_penanggungjawab_perusahaan');
		$alamat = $this->input->post('fs_alamat_penanggungjawab_perusahaan');
		$kodepos = $this->input->post('fs_kodepos_penanggungjawab_perusahaan');
		$kota = $this->input->post('fs_kota_penanggungjawab_perusahaan');
		$telepon = $this->input->post('fs_telepon_penanggungjawab_perusahaan');
		$handphone = $this->input->post('fs_handphone_penanggungjawab_perusahaan');
		$alamatkorespondensi = $this->input->post('fs_alamat_korespondensi');
		$kodeposkorespondensi = $this->input->post('fs_kodepos_korespondensi');
		$kotakorespondensi = $this->input->post('fs_kota_korespondensi');
		$repeatorder = $this->input->post('fs_repeat_order');
		$repeatke = $this->input->post('fs_repeat_order_ke');

		$update = false;
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_telfon_usaha_konsumen' => trim($teleponperusahaan),
			'fs_status_perusahaan' => trim($statusperusahaan),
			'fs_nama_usaha_konsumen' => trim($namausaha),
			'fs_kategori_usaha_konsumen' => trim($kategoriusaha),
			'fs_skala_perusahaan_konsumen' => trim($skala),
			'fs_bentuk_perusahaan' => trim($bentukperusahaan),
			'fs_tempat_perusahaan' => trim($tempatperusahaan),
			'fs_beroperasi_sejak' => trim($sejak),
			'fn_jumlah_karyawan_perusahaan' => trim($jumlah),
			'fs_keterangan_usaha_konsumen' => trim($keterangan),
			'fn_pendapatan_konsumen' => trim($pendapatan),
			'fn_biaya_konsumen' => trim($biaya),
			'fn_mutasi_debet' => trim($debet),
			'fn_mutasi_kredit' => trim($kredit),
			'fs_penanggungjawab_perusahaan' => trim($penanggungjawab),
			'fs_jabatan_penanggungjawab_perusahaan' => trim($jabatan),
			'fs_ktp_penanggungjawab_perusahaan' => trim($ktp),
			'fs_npwp_penanggungjawab_perusahaan' => trim($npwp),
			'fs_alamat_penanggungjawab_perusahaan' => trim($alamat),
			'fs_kodepos_penanggungjawab_perusahaan' => trim($kodepos),
			'fs_kota_penanggungjawab_perusahaan' => trim($kota),
			'fs_telepon_penanggungjawab_perusahaan' => trim($telepon),
			'fs_handphone_penanggungjawab_perusahaan' => trim($handphone),
			'fs_alamat_korespondensi' => trim($alamatkorespondensi),
			'fs_kodepos_korespondensi' => trim($kodeposkorespondensi),
			'fs_kota_korespondensi' => trim($kotakorespondensi),
			'fs_repeat_order' => trim($repeatorder),
			'fs_repeat_order_ke' => trim($repeatke)
		);

		if ($update == true) {
			$dt1 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data APK '.trim($noapk).', Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, APK Tidak Ada...'
					);
			echo json_encode($hasil);
		}
	}

	// TAB DATA KENDARAAN
	public function ceksavedatakendaraan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkBadanUsaha');
			$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, APK Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savedatakendaraan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$kode = $this->input->post('fs_kode_kendaraan');
		$model = $this->input->post('fs_model_kendaraan');
		$jenis = $this->input->post('fs_jenis_kendaraan');
		$silinder = $this->input->post('fs_silinder_kendaraan');
		$tahun = $this->input->post('fn_tahun_kendaraan');
		$warna = $this->input->post('fs_warna_kendaraan');
		$rangka = $this->input->post('fs_no_rangka');
		$mesin = $this->input->post('fs_no_mesin');
		$komersial = $this->input->post('fs_komersial');
		$sesuai = $this->input->post('fs_nama_sesuai_kontrak');
		$namabpkb = $this->input->post('fs_nama_bpkb');
		$alamatbpkb = $this->input->post('fs_alamat_bpkb');
		$nobpkb = $this->input->post('fs_nomor_bpkb');
		$nopolisi = $this->input->post('fs_no_polisi');
		$kdwilayah = $this->input->post('fs_kode_wilayah_no_polisi');
		$kdakhirwilayah = $this->input->post('fs_kode_akhir_wilayah_no_polisi');
		$sales = $this->input->post('fs_salesman');
		$jnsasuransi = $this->input->post('fs_jenis_asuransi');
		$asuransi = $this->input->post('fs_nama_perusahaan_asuransi');
		$kdasuransi1 = $this->input->post('fs_kode_asuransi1');
		$kdasuransi2 = $this->input->post('fs_kode_asuransi2');
		$dealer = $this->input->post('fs_nama_dealer');
		$cabdealer = $this->input->post('fn_cabang_dealer');
		$kddealer1 = $this->input->post('fs_kode_dealer1');
		$kddealer2 = $this->input->post('fs_kode_dealer2');

		$update = false;
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_kendaraan' => trim($kode),
			'fs_model_kendaraan' => trim($model),
			'fs_jenis_kendaraan' => trim($jenis),
			'fs_silinder_kendaraan' => trim($silinder),
			'fn_tahun_kendaraan' => trim($tahun),
			'fs_warna_kendaraan' => trim($warna),
			'fs_no_rangka' => trim($rangka),
			'fs_no_mesin' => trim($mesin),
			'fs_komersial' => trim($komersial),
			'fs_nama_sesuai_kontrak' => trim($sesuai),
			'fs_nama_bpkb' => trim($namabpkb),
			'fs_alamat_bpkb' => trim($alamatbpkb),
			'fs_nomor_bpkb' => trim($nobpkb),
			'fs_no_polisi' => trim($nopolisi),
			'fs_kode_wilayah_no_polisi' => trim($kdwilayah),
			'fs_kode_akhir_wilayah_no_polisi' => trim($kdakhirwilayah),
			'fs_salesman' => trim($sales),
			'fs_jenis_asuransi' => trim($jnsasuransi),
			'fs_nama_perusahaan_asuransi' => trim($asuransi),
			'fs_kode_asuransi1' => trim($kdasuransi1),
			'fs_kode_asuransi2' => trim($kdasuransi2),
			'fs_nama_dealer' => trim($dealer),
			'fn_cabang_dealer' => trim($cabdealer),
			'fs_kode_dealer1' => trim($kddealer1),
			'fs_kode_dealer2' => trim($kddealer2)
		);

		if ($update == true) {
			$dt1 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data APK '.trim($noapk).', Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, APK Tidak Ada...'
					);
			echo json_encode($hasil);
		}
	}

	// TAB DATA STRUKTUR KREDIT
	public function ceksavedatastrukturkredit() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkBadanUsaha');
			$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, APK Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savedatastrukturkredit() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$pola = $this->input->post('fs_pola_angsuran');
		$carabayar = $this->input->post('fs_cara_bayar');
		$angsdimuka = $this->input->post('fs_angsuran_dimuka');
		$kaliangsuran = $this->input->post('fn_kali_angsuran_dimuka');
		$jmlangsuran = $this->input->post('fn_jumlah_angsuran_dimuka');
		$biayatjh = $this->input->post('fn_biaya_tjh');
		$selisihdp = $this->input->post('fn_selisih_dp');
		$angsdimukapotong = $this->input->post('fs_angsuran_dimuka_potong_pencairan');
		$dpbayar = $this->input->post('fn_dp_bayar');
		$angsdibayar = $this->input->post('fs_angsuran_dibayar_dealer');
		$biayaadm = $this->input->post('fn_biaya_adm');
		$premiasuransigross = $this->input->post('fn_premi_asuransi_gross');
		$premiasuransi = $this->input->post('fn_premi_asuransi');
		$premiasuransigrossperluasan = $this->input->post('fn_premi_asuransi_gross_perluasan');
		$premiasuransinetto = $this->input->post('fn_premi_asuransi_netto');
		$dendaperhari = $this->input->post('fn_denda_perhari');
		$hargaotr = $this->input->post('fn_harga_otr');
		$uangmukadealer = $this->input->post('fn_uang_muka_dealer');
		$asuransidikreditdealer = $this->input->post('fn_asuransi_dikredit_dealer');
		$persenbungaflatdealer = $this->input->post('fn_persen_bunga_flat_dealer');
		$pokokpembiayaandealer = $this->input->post('fn_pokok_pembiayaan_dealer');
		$persenbungaefektifdealer = $this->input->post('fn_persen_bunga_efektif_dealer');
		$bulanmasaangsurandealer = $this->input->post('fn_bulan_masa_angsuran_dealer');
		$kalimasaangsurandealer = $this->input->post('fn_kali_masa_angsuran_dealer');
		$bungadealer = $this->input->post('fn_bunga_dealer');
		$angsurandealer = $this->input->post('fn_angsuran_dealer');
		$angsurantidaksamadealer = $this->input->post('fn_angsuran_tidak_sama_dealer');
		$uangmukakonsumen = $this->input->post('fn_uang_muka_konsumen');
		$asuransidikreditkonsumen = $this->input->post('fn_asuransi_dikredit_konsumen');
		$pokokpembiayaankonsumen = $this->input->post('fn_pokok_pembiayaan_konsumen');
		$persenbungaflatkonsumen = $this->input->post('fn_persen_bunga_flat_konsumen');
		$persenbungaefektifkonsumen = $this->input->post('fn_persen_bunga_efektif_konsumen');
		$bulanmasaangsurankonsumen = $this->input->post('fn_bulan_masa_angsuran_konsumen');
		$kalimasaangsurankonsumen = $this->input->post('fn_kali_masa_angsuran_konsumen');
		$bungakonsumen = $this->input->post('fn_bunga_konsumen');
		$angsurankonsumen = $this->input->post('fn_angsuran_konsumen');
		$angsurantidaksamakonsumen = $this->input->post('fn_angsuran_tidak_sama_konsumen');

		$update = false;
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_pola_angsuran' => trim($pola),
			'fs_cara_bayar' => trim($carabayar),
			'fs_angsuran_dimuka' => trim($angsdimuka),
			'fn_kali_angsuran_dimuka' => trim($kaliangsuran),
			'fn_jumlah_angsuran_dimuka' => trim($jmlangsuran),
			'fn_biaya_tjh' => trim($biayatjh),
			'fn_selisih_dp' => trim($selisihdp),
			'fs_angsuran_dimuka_potong_pencairan' => trim($angsdimukapotong),
			'fn_dp_bayar' => trim($dpbayar),
			'fs_angsuran_dibayar_dealer' => trim($angsdibayar),
			'fn_biaya_adm' => trim($biayaadm),
			'fn_premi_asuransi_gross' => trim($premiasuransigross),
			'fn_premi_asuransi' => trim($premiasuransi),
			'fn_premi_asuransi_gross_perluasan' => trim($premiasuransigrossperluasan),
			'fn_premi_asuransi_netto' => trim($premiasuransinetto),
			'fn_denda_perhari' => trim($dendaperhari),
			'fn_harga_otr' => trim($hargaotr),
			'fn_uang_muka_dealer' => trim($uangmukadealer),
			'fn_asuransi_dikredit_dealer' => trim($asuransidikreditdealer),
			'fn_persen_bunga_flat_dealer' => trim($persenbungaflatdealer),
			'fn_pokok_pembiayaan_dealer' => trim($pokokpembiayaandealer),
			'fn_persen_bunga_efektif_dealer' => trim($persenbungaefektifdealer),
			'fn_bulan_masa_angsuran_dealer' => trim($bulanmasaangsurandealer),
			'fn_kali_masa_angsuran_dealer' => trim($kalimasaangsurandealer),
			'fn_bunga_dealer' => trim($bungadealer),
			'fn_angsuran_dealer' => trim($angsurandealer),
			'fn_angsuran_tidak_sama_dealer' => trim($angsurantidaksamadealer),
			'fn_uang_muka_konsumen' => trim($uangmukakonsumen),
			'fn_asuransi_dikredit_konsumen' => trim($asuransidikreditkonsumen),
			'fn_pokok_pembiayaan_konsumen' => trim($pokokpembiayaankonsumen),
			'fn_persen_bunga_flat_konsumen' => trim($persenbungaflatkonsumen),
			'fn_persen_bunga_efektif_konsumen' => trim($persenbungaefektifkonsumen),
			'fn_bulan_masa_angsuran_konsumen' => trim($bulanmasaangsurankonsumen),
			'fn_kali_masa_angsuran_konsumen' => trim($kalimasaangsurankonsumen),
			'fn_bunga_konsumen' => trim($bungakonsumen),
			'fn_angsuran_konsumen' => trim($angsurankonsumen),
			'fn_angsuran_tidak_sama_konsumen' => trim($angsurantidaksamakonsumen)
		);

		if ($update == true) {

			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			// update data struktur kredit 
			$dt1 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->where($where);
			$this->db->update('tx_apk', $data);


			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data APK '.trim($noapk).', Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, APK Tidak Ada...'
					);
			echo json_encode($hasil);
		}
	}

	// POPUP DATA PERLUASAN
	public function ceksavedataperluasan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkPerluasan($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			} else {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin tambah baru?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, Data Perluasan Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savedataperluasan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		// detail perluasan
		$tahunke = explode('|', $this->input->post('fn_tahun_ke'));
		$jenisperluasan = explode('|', $this->input->post('fs_jenis_perluasan'));

		$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		// hapus detail perluasan
		$this->db->where($where);
		$this->db->delete('tx_apk_perluasan');

		// simpan detail perluasan
		$jml = count($jenisperluasan) - 1;
		if ($jml <> 0) {
			for ($i=1; $i<=$jml; $i++) {
				$data = array(
					'fs_kode_cabang' => trim($cabang),
					'fn_no_apk' => trim($noapk),
					'fn_tahun_ke' => trim($tahunke[$i]),
					'fs_jenis_perluasan' => trim($jenisperluasan[$i]),
					'fs_user_buat' => trim($user),
					'fd_tanggal_buat' => date('Y-m-d H:i:s')
				);
				$this->db->insert('tx_apk_perluasan', $data);
			}
		}

		$hasil = array(
					'sukses' => true,
					'hasil' => 'Update Data Perluasan, Sukses!!'
				);
		echo json_encode($hasil);
	}

	// POPUP DATA TRANSAKSI
	public function ceksavedatatransaksi() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkTransaksi($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			} else {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin tambah baru?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, Detail Transaksi Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savedatatransaksi() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		// detail transaksi
		$kodetransaksi = explode('|', $this->input->post('fs_kode_transaksi'));
		$namatransaksi = explode('|', $this->input->post('fs_nama_transaksi'));
		$persentasenilaitransaksi = explode('|', $this->input->post('fn_persentase_nilai_transaksi'));
		$nilaitransaksi = explode('|', $this->input->post('fn_nilai_transaksi'));
		$tagihkekonsumen = explode('|', $this->input->post('fs_tagih_ke_konsumen'));
		$cairkedealer = explode('|', $this->input->post('fs_cair_ke_dealer'));

		$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			
		// hapus detail transaksi
		$this->db->where($where);
		$this->db->delete('tx_apk_detailtransaksi');

		// simpan detail transaksi
		$jml = count($kodetransaksi) - 1;
		if ($jml <> 0) {
			for ($i=1; $i<=$jml; $i++) {
				$data = array(
					'fs_kode_cabang' => trim($cabang),
					'fn_no_apk' => trim($noapk),
					'fs_kode_transaksi' => trim($kodetransaksi[$i]),
					'fs_nama_transaksi' => trim($namatransaksi[$i]),
					'fn_persentase_nilai_transaksi' => trim($persentasenilaitransaksi[$i]),
					'fn_nilai_transaksi' => trim($nilaitransaksi[$i]),
					'fs_tagih_ke_konsumen' => trim($tagihkekonsumen[$i]),
					'fs_cair_ke_dealer' => trim($cairkedealer[$i]),
					'fs_user_buat' => trim($user),
					'fd_tanggal_buat' => date('Y-m-d H:i:s')
				);
				$this->db->insert('tx_apk_detailtransaksi', $data);
			}
		}

		$hasil = array(
					'sukses' => true,
					'hasil' => 'Update Data Transaksi, Sukses!!'
				);
		echo json_encode($hasil);
	}

	// TAB DATA PENGURUS
	public function ceksavedatapengurus() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
		$jabatan = $this->input->post('fs_kode_jabatan');
		$nama = $this->input->post('fs_nama_pengurus');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkBadanUsaha');
			$sSQL = $this->MApkBadanUsaha->checkPengurus($cabang, $noapk, $jabatan, $nama);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			} else {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin tambah baru?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, APK Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savedatapengurus() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$jabatan = $this->input->post('fs_kode_jabatan');
		$nama = $this->input->post('fs_nama_pengurus');
		$alamat = $this->input->post('fs_alamat_pengurus');
		$kodepos = $this->input->post('fs_kodepos_pengurus');
		$kota = $this->input->post('fs_kota_pengurus');
		$ktp = $this->input->post('fs_ktp_pengurus');
		$npwp = $this->input->post('fs_npwp_pengurus');
		$persen = $this->input->post('fn_persen_saham');
		$aktif = $this->input->post('fs_aktif');

		$update = false;
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->checkPengurus($cabang, $noapk, $jabatan, $nama);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_jabatan' => trim($jabatan),
			'fs_nama_pengurus' => trim($nama),
			'fs_alamat_pengurus' => trim($alamat),
			'fs_kodepos_pengurus' => trim($kodepos),
			'fs_kota_pengurus' => trim($kota),
			'fs_ktp_pengurus' => trim($ktp),
			'fs_npwp_pengurus' => trim($npwp),
			'fn_persen_saham' => trim($persen),
			'fs_aktif' => trim($aktif)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_kode_cabang' => trim($cabang),
				'fn_no_apk' => trim($noapk),
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tx_apk_pengurus', $data);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data Pengurus, Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);

			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."' AND fs_kode_jabatan = '".trim($jabatan)."' AND fs_nama_pengurus = '".trim($nama)."'";

			$this->db->where($where);
			$this->db->update('tx_apk_pengurus', $data);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data Pengurus, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	public function removepengurus() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
		$jabatan = $this->input->post('fs_kode_jabatan');
		$nama = $this->input->post('fs_nama_pengurus');

		if (!empty($cabang) && !empty($noapk) && !empty($jabatan) && !empty($nama)) {
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."' AND fs_kode_jabatan = '".trim($jabatan)."' AND fs_nama_pengurus = '".trim($nama)."'";
			$this->db->where($where);
			$this->db->delete('tx_apk_pengurus');
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Data Pengurus dihapus!'
					);
			echo json_encode($hasil);
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Hapus Gagal'
					);
			echo json_encode($hasil);
		}
	}

	// TAB DATA PENCAIRAN
	public function ceksavedatapencairan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkBadanUsaha');
			$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
					'sukses' => false,
					'hasil' => 'Gagal Simpan, APK Tidak ada...'
				);
			echo json_encode($hasil);
		}
	}

	public function savedatapencairan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$tanggalperjanjian = $this->input->post('fd_tanggal_perjanjian');
		$tanggalangsuranpertama = $this->input->post('fd_tanggal_angsuran_pertama');
		$tanggaljatuhtempoperbulan = $this->input->post('fn_tanggal_jatuhtempo_perbulan');
		$cairke = $this->input->post('fs_cair_ke');
		$uangmukabayardi = $this->input->post('fs_uang_muka_bayar_di');
		$depositpotongpencairan = $this->input->post('fs_deposit_potong_pencairan');
		$atasnamabankpencairan = $this->input->post('fs_atasnama_bank_pencairan');
		$namabankpencairan = $this->input->post('fs_nama_bank_pencairan');
		$rekeningbankpencairan = $this->input->post('fs_rekening_bank_pencairan');
		$nilaipencairan = $this->input->post('fn_nilai_pencairan');
		
		$update = false;
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fd_tanggal_perjanjian' => trim($tanggalperjanjian),
			'fd_tanggal_angsuran_pertama' => trim($tanggalangsuranpertama),
			'fn_tanggal_jatuhtempo_perbulan' => trim($tanggaljatuhtempoperbulan),
			'fs_cair_ke' => trim($cairke),
			'fs_uang_muka_bayar_di' => trim($uangmukabayardi),
			'fs_deposit_potong_pencairan' => trim($depositpotongpencairan),
			'fs_atasnama_bank_pencairan' => trim($atasnamabankpencairan),
			'fs_nama_bank_pencairan' => trim($namabankpencairan),
			'fs_rekening_bank_pencairan' => trim($rekeningbankpencairan),
			'fn_nilai_pencairan' => trim($nilaipencairan)
		);

		if ($update == true) {
			$dt1 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data APK '.trim($noapk).', Sukses!!'
					);
			echo json_encode($hasil);
		} else {
			$hasil = array(
						'sukses' => false,
						'hasil' => 'Simpan Gagal, APK Tidak Ada...'
					);
			echo json_encode($hasil);
		}
	}

}