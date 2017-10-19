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

	public function gridbadanusaha() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->listBadanUsahaAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MApkBadanUsaha->listBadanUsaha($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
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
		echo json_encode($xArr);
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
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MApkBadanUsaha');
		$sSQL = $this->MApkBadanUsaha->listPengurusAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MApkBadanUsaha->listPengurus($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_kode_jabatan' => trim($xRow->fs_kode_jabatan),
					'fs_nama_referensi' => trim($xRow->fs_nama_referensi),
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
						'hasil' => 'Data Badan Usaha sudah ada, apakah Anda ingin meng-update?'
					);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Data Badan Usaha belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Data, Gagal...'
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
		$pola = $this->input->post('fs_pola_transaksi');
		$lokasi = $this->input->post('fs_kode_lokasi');
		$nodealer = $this->input->post('fs_nomor_dealer');
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
		$handphone = $this->input->post('fs_handphone_konsumen');
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
			'fs_kode_lokasi' => trim($lokasi),
			'fs_nomor_dealer' => trim($nodealer),
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
			'fs_handphone_konsumen' => trim($handphone),
			'fs_email_konsumen' => trim($email),
			'fs_group_perusahaan' => trim($group)
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

			$hasil = array(
						'sukses' => true,
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
						'hasil' => 'Update Data APK, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	// TAB DATA BADAN USAHA
	public function ceksavebadanusaha() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
	}

	public function savebadanusaha() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$teleponkonsumen = $this->input->post('fs_telepon_konsumen');
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
			'fs_telepon_konsumen' => trim($teleponkonsumen),
			'fs_status_perusahaan' => trim($statusperusahaan),
			'fs_bentuk_perusahaan' => trim($bentukperusahaan),
			'fs_tempat_perusahaan' => trim($tempatperusahaan),
			'fs_beroperasi_sejak' => trim($sejak),
			'fs_skala_perusahaan_konsumen' => trim($skala),
			'fs_nama_usaha_konsumen' => trim($namausaha),
			'fs_kategori_usaha_konsumen' => trim($kategoriusaha),
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
						'hasil' => 'Update Data APK, Sukses!!'
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
	}

	public function savedatakendaraan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$kode = $this->input->post('fs_kode_kendaraan');
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
		$kdasuransi1 = $this->input->post('fs_kode_asuransi1');
		$kdasuransi2 = $this->input->post('fs_kode_asuransi2');
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
			'fs_kode_asuransi1' => trim($kdasuransi1),
			'fs_kode_asuransi2' => trim($kdasuransi2),
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
						'hasil' => 'Update Data APK, Sukses!!'
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
						'hasil' => 'Update Data APK, Sukses!!'
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

	// TAB DATA PENGURUS
	public function ceksavedatapengurus() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
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
		$sSQL = $this->MApkBadanUsaha->checkPengurus($cabang, $noapk);

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
			$this->db->update('tx_apk_pengurus', $data);
			$hasil = array(
						'sukses' => true,
						'hasil' => 'Update Data APK, Sukses!!'
					);
			echo json_encode($hasil);
		}
	}

	// TAB DATA PENCAIRAN
	public function ceksavedatapencairan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
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
						'hasil' => 'Update Data APK, Sukses!!'
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