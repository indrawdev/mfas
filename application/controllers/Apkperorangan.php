<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Apkperorangan extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vapkperorangan');
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

	public function gridperorangan() {
		$sCabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->listPeroranganAll($sCabang, $sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MApkPerorangan->listPerorangan($sCabang, $sCari, $nStart, $nLimit);
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
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_npwp_konsumen' => trim($xRow->fs_npwp_konsumen),
					'fs_kartu_keluarga' => trim($xRow->fs_kartu_keluarga),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_email_konsumen' => trim($xRow->fs_email_konsumen),
					'fs_nama_perusahaan_konsumen' => trim($xRow->fs_nama_perusahaan_konsumen),
					'fs_alamat_usaha_konsumen' => trim($xRow->fs_alamat_usaha_konsumen),
					'fs_telfon_usaha_konsumen' => trim($xRow->fs_telfon_usaha_konsumen),
					'fs_kategori_usaha_konsumen' => trim($xRow->fs_kategori_usaha_konsumen),
					'fs_nama_usaha_konsumen' => trim($xRow->fs_nama_usaha_konsumen),
					'fs_skala_perusahaan_konsumen' => trim($xRow->fs_skala_perusahaan_konsumen),
					'fs_kerja_sejak_konsumen' => trim($xRow->fs_kerja_sejak_konsumen),
					'fs_usaha_pekerjaan_konsumen' => trim($xRow->fs_usaha_pekerjaan_konsumen),
					'fs_keterangan_usaha_konsumen' => trim($xRow->fs_keterangan_usaha_konsumen),
					'fn_pendapatan_konsumen' => trim($xRow->fn_pendapatan_konsumen),
					'fs_jenis_kelamin_konsumen' => trim($xRow->fs_jenis_kelamin_konsumen),
					'fd_tanggal_lahir_konsumen' => trim($xRow->fd_tanggal_lahir_konsumen),
					'fs_tempat_lahir_konsumen' => trim($xRow->fs_tempat_lahir_konsumen),
					'fs_status_konsumen' => trim($xRow->fs_status_konsumen),
					'fs_status_rumah' => trim($xRow->fs_status_rumah),
					'fs_agama_konsumen' => trim($xRow->fs_agama_konsumen),
					'fs_pendidikan_konsumen' => trim($xRow->fs_pendidikan_konsumen),
					'fs_nama_ibu_kandung' => trim($xRow->fs_nama_ibu_kandung),
					'fs_alamat_korespondensi' => trim($xRow->fs_alamat_korespondensi),
					'fs_kodepos_korespondensi' => trim($xRow->fs_kodepos_korespondensi),
					'fs_kota_korespondensi' => trim($xRow->fs_kota_korespondensi),
					'fn_biaya_konsumen' => trim($xRow->fn_biaya_konsumen),
					'fs_tinggal_sejak' => trim($xRow->fs_tinggal_sejak),
					'fn_tanggungan_konsumen' => trim($xRow->fn_tanggungan_konsumen),
					'fs_kode_kendaraan' => trim($xRow->fs_kode_kendaraan),
					'fs_model_kendaraan' => trim($xRow->fs_model_kendaraan),
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
					'fs_kode_dealer1' => trim($xRow->fs_kode_dealer1),
					'fs_kode_dealer2' => trim($xRow->fs_kode_dealer2),
					'fn_cabang_dealer' => trim($xRow->fn_cabang_dealer),
					'fs_pertama_kali_kredit' => trim($xRow->fs_pertama_kali_kredit),
					'fn_jumlah_kali_kredit' => trim($xRow->fn_jumlah_kali_kredit),
					'fn_mutasi_debet' => trim($xRow->fn_mutasi_debet),
					'fn_mutasi_kredit' => trim($xRow->fn_mutasi_kredit),
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
					'fn_persen_bunga_flat_dealer' => trim($xRow->fn_persen_bunga_flat_dealer),
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
					'fs_nama_pasangan' => trim($xRow->fs_nama_pasangan),
					'fs_alamat_pasangan' => trim($xRow->fs_alamat_pasangan),
					'fs_kodepos_pasangan' => trim($xRow->fs_kodepos_pasangan),
					'fs_kota_pasangan' => trim($xRow->fs_kota_pasangan),
					'fs_handphone_pasangan' => trim($xRow->fs_handphone_pasangan),
					'fs_nama_usaha_pasangan' => trim($xRow->fs_nama_usaha_pasangan),
					'fs_usaha_pasangan' => trim($xRow->fs_usaha_pasangan),
					'fs_keterangan_usaha_pasangan' => trim($xRow->fs_keterangan_usaha_pasangan),
					'fs_alamat_usaha_pasangan' => trim($xRow->fs_alamat_usaha_pasangan),
					'fs_telepon_usaha_pasangan' => trim($xRow->fs_telepon_usaha_pasangan),
					'fn_pendapatan_pasangan' => trim($xRow->fn_pendapatan_pasangan),
					'fs_nama_penjamin' => trim($xRow->fs_nama_penjamin),
					'fs_alamat_penjamin' => trim($xRow->fs_alamat_penjamin),
					'fs_kota_penjamin' => trim($xRow->fs_kota_penjamin),
					'fs_kodepos_penjamin' => trim($xRow->fs_kodepos_penjamin),
					'fs_telepon_penjamin' => trim($xRow->fs_telepon_penjamin),
					'fs_nama_usaha_penjamin' => trim($xRow->fs_nama_usaha_penjamin),
					'fs_usaha_penjamin' => trim($xRow->fs_usaha_penjamin),
					'fs_keterangan_usaha_penjamin' => trim($xRow->fs_keterangan_usaha_penjamin),
					'fs_alamat_usaha_penjamin' => trim($xRow->fs_alamat_usaha_penjamin),
					'fs_telepon_usaha_penjamin' => trim($xRow->fs_telepon_usaha_penjamin),
					'fn_pendapatan_penjamin' => trim($xRow->fn_pendapatan_penjamin),
					'fs_status_penjamin' => trim($xRow->fs_status_penjamin),
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

	public function gridpekerjaan() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listPekerjaanAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listPekerjaan($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_nilai1_referensi' => trim($xRow->fs_nilai1_referensi),
					'fs_nama_referensi' => trim($xRow->fs_nama_referensi)
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
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listPerluasanAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listPerluasan($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fn_no_apk' => trim($xRow->fn_no_apk),
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridtransaksi() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listTransaksiAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listTransaksi($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fn_no_apk' => trim($xRow->fn_no_apk),
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// TAB DATA UTAMA
	public function ceksavedatautama() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);
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
		$noktp = $this->input->post('fs_ktp_konsumen');
		$tglktp = $this->input->post('fs_masa_ktp_konsumen');
		$npwp = $this->input->post('fs_npwp_konsumen');
		$nokk = $this->input->post('fs_kartu_keluarga');
		$telephone = $this->input->post('fs_telepon_konsumen');
		$handphone = $this->input->post('fs_handphone_konsumen');
		$email = $this->input->post('fs_email_konsumen');

		$update = false;
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

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
			'fs_ktp_konsumen' => trim($noktp),
			'fs_masa_ktp_konsumen' => trim($tglktp),
			'fs_npwp_konsumen' => trim($npwp),
			'fs_kartu_keluarga' => trim($nokk),
			'fs_telepon_konsumen' => trim($telephone),
			'fs_handphone_konsumen' => trim($handphone),
			'fs_email_konsumen' => trim($email)
		);

		if ($update == false) {
			// GET COUNTER
			$this->load->model('MSearch');
			$counterapk = $this->MSearch->getCounter($cabang, 'APK', 0);
			$counterpjj = $this->MSearch->getCounter($cabang, 'PJJ', $pola);
			$newapk = $counterapk->fn_counter;
			$newpjj = $counterpjj->fn_counter;

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

	// TAB DATA KONSUMEN
	public function ceksavedatakonsumen() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);
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

	public function savedatakonsumen() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$perusahaan = $this->input->post('fs_nama_perusahaan_konsumen');
		$alamat = $this->input->post('fs_alamat_usaha_konsumen');
		$telephone = $this->input->post('fs_telfon_usaha_konsumen');
		$kdkategori = $this->input->post('fs_kategori_usaha_konsumen');
		$kategori = $this->input->post('fs_nama_usaha_konsumen');
		$skala = $this->input->post('fs_skala_perusahaan_konsumen');
		$sejak = $this->input->post('fs_kerja_sejak_konsumen');
		$pendapatan = $this->input->post('fn_pendapatan_konsumen');
		$jekel = $this->input->post('fs_jenis_kelamin_konsumen');
		$tempat = $this->input->post('fs_tempat_lahir_konsumen');
		$tanggal = $this->input->post('fd_tanggal_lahir_konsumen');
		$status = $this->input->post('fs_status_konsumen');
		$rumah = $this->input->post('fs_status_rumah');
		$agama = $this->input->post('fs_agama_konsumen');
		$pendidikan = $this->input->post('fs_pendidikan_konsumen');
		$ibukandung = $this->input->post('fs_nama_ibu_kandung');
		$usaha = $this->input->post('fs_usaha_pekerjaan_konsumen');
		$keterangan = $this->input->post('fs_keterangan_usaha_konsumen');
		$almtkorespondensi = $this->input->post('fs_alamat_korespondensi');
		$kdposkorespondensi = $this->input->post('fs_kodepos_korespondensi');
		$kotakorespondensi = $this->input->post('fs_kota_korespondensi');

		$update = false;
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_nama_perusahaan_konsumen' => trim($perusahaan),
			'fs_alamat_usaha_konsumen' => trim($alamat),
			'fs_telfon_usaha_konsumen' => trim($telephone),
			'fs_kategori_usaha_konsumen' => trim($kdkategori),
			'fs_nama_usaha_konsumen' => trim($kategori),
			'fs_skala_perusahaan_konsumen' => trim($skala),
			'fs_kerja_sejak_konsumen' => trim($sejak),
			'fn_pendapatan_konsumen' => trim($pendapatan),
			'fs_usaha_pekerjaan_konsumen' => trim($usaha),
			'fs_keterangan_usaha_konsumen' => trim($keterangan),
			'fs_jenis_kelamin_konsumen' => trim($jekel),
			'fs_tempat_lahir_konsumen' => trim($tempat),
			'fd_tanggal_lahir_konsumen' => trim($tanggal),
			'fs_status_konsumen' => trim($status),
			'fs_status_rumah' => trim($rumah),
			'fs_agama_konsumen' => trim($agama),
			'fs_pendidikan_konsumen' => trim($pendidikan),
			'fs_nama_ibu_kandung' => trim($ibukandung),
			'fs_alamat_korespondensi' => trim($almtkorespondensi),
			'fs_kodepos_korespondensi' => trim($kdposkorespondensi),
			'fs_kota_korespondensi' => trim($kotakorespondensi)
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
						'noapk' => trim($noapk),
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
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);
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
		$kddealer1 = $this->input->post('fs_kode_dealer1');
		$kddealer2 = $this->input->post('fs_kode_dealer2');
		$cabdealer = $this->input->post('fn_cabang_dealer');

		$update = false;
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

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
			'fs_kode_dealer1' => trim($kddealer1),
			'fs_kode_dealer2' => trim($kddealer2),
			'fn_cabang_dealer' => trim($cabdealer)
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
						'noapk' => trim($noapk),
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
	public function ceksavestrukturkredit() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);
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

	public function savestrukturkredit() {
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
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_pola_angsuran' => trim($pola),
			'fs_cara_bayar' => trim($carabayar),
			'fs_angsuran_dimuka' => trim($angsdimuka),
			'fn_kali_angsuran_dimuka' => trim($kaliangsuran),
			'fn_jumlah_angsuran_dimuka' => trim($jmlangsuran),
			'fn_harga_otr' => trim($hargaotr),
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
						'noapk' => trim($noapk),
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

	// TAB DATA TAMBAHAN
	public function ceksavedatatambahan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);
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

	public function savedatatambahan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$namapasangan = $this->input->post('fs_nama_pasangan');
		$alamatpasangan = $this->input->post('fs_alamat_pasangan');
		$kodepospasangan = $this->input->post('fs_kodepos_pasangan');
		$kotapasangan = $this->input->post('fs_kota_pasangan');
		$handphonepasangan = $this->input->post('fs_handphone_pasangan');
		$usahapasangan = $this->input->post('fs_nama_usaha_pasangan');
		$kodeusahapasangan = $this->input->post('fs_usaha_pasangan');
		$alamatusahapasangan = $this->input->post('fs_alamat_usaha_pasangan');
		$keteranganusahapasangan = $this->input->post('fs_keterangan_usaha_pasangan');
		$teleponusahapasangan = $this->input->post('fs_telepon_usaha_pasangan');
		$pendapatanpasangan = $this->input->post('fn_pendapatan_pasangan');
		$namapenjamin = $this->input->post('fs_nama_penjamin');
		$alamatpenjamin = $this->input->post('fs_alamat_penjamin');
		$kotapenjamin = $this->input->post('fs_kota_penjamin');
		$kodepospenjamin = $this->input->post('fs_kodepos_penjamin');
		$teleponpenjamin = $this->input->post('fs_telepon_penjamin');
		$usahapenjamin = $this->input->post('fs_nama_usaha_penjamin');
		$kodeusahapenjamin = $this->input->post('fs_usaha_penjamin');
		$keteranganusahapenjamin = $this->input->post('fs_keterangan_usaha_penjamin');
		$alamatusahapenjamin = $this->input->post('fs_alamat_usaha_penjamin');
		$teleponusahapenjamin = $this->input->post('fs_telepon_usaha_penjamin');
		$pendapatanpenjamin = $this->input->post('fn_pendapatan_penjamin');
		$statuspenjamin = $this->input->post('fs_status_penjamin');

		$update = false;
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_nama_pasangan' => trim($namapasangan),
			'fs_alamat_pasangan' => trim($alamatpasangan),
			'fs_kodepos_pasangan' => trim($kodepospasangan),
			'fs_kota_pasangan' => trim($kotapasangan),
			'fs_handphone_pasangan' => trim($handphonepasangan),
			'fs_nama_usaha_pasangan' => trim($usahapasangan),
			'fs_usaha_pasangan' => trim($kodeusahapasangan),
			'fs_keterangan_usaha_pasangan' => trim($keteranganusahapasangan),
			'fs_alamat_usaha_pasangan' => trim($alamatusahapasangan),
			'fs_telepon_usaha_pasangan' => trim($teleponusahapasangan),
			'fn_pendapatan_pasangan' => trim($pendapatanpasangan),
			'fs_nama_penjamin' => trim($namapenjamin),
			'fs_alamat_penjamin' => trim($alamatpenjamin),
			'fs_kodepos_penjamin' => trim($kodepospenjamin),
			'fs_kota_penjamin' => trim($kotapenjamin),
			'fs_telepon_penjamin' => trim($teleponpenjamin),
			'fs_nama_usaha_penjamin' => trim($usahapenjamin),
			'fs_usaha_penjamin' => trim($kodeusahapenjamin),
			'fs_keterangan_usaha_penjamin' => trim($keteranganusahapenjamin),
			'fs_alamat_usaha_penjamin' => trim($alamatusahapenjamin),
			'fs_telepon_usaha_penjamin' => trim($teleponusahapenjamin),
			'fn_pendapatan_penjamin' => trim($pendapatanpenjamin),
			'fs_status_penjamin' => trim($statuspenjamin)
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
						'noapk' => trim($noapk),
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

	// TAB DATA PENCAIRAN
	public function ceksavedatapencairan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		if (!empty($cabang) && !empty($noapk)) {
			$this->load->model('MApkPerorangan');
			$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);
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
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

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
			'fn_nilai_pencairan' => trim($nilaipencairan),
			'fs_flag_apk' => '1'
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
						'noapk' => trim($noapk),
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