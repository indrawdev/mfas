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

	public function gridperorangan() {

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
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Data Konsumen belum ada, apakah Anda ingin menambah baru?'
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
			'fs_ktp_konsumen' => trim($noktp),
			'fs_masa_ktp_konsumen' => trim($tglktp),
			'fs_npwp_konsumen' => trim($npwp),
			'fs_kartu_keluarga' => trim($nokk),
			'fs_telepon_konsumen' => trim($telephone),
			'fs_handphone_konsumen' => trim($handphone),
			'fs_email_konsumen' => trim($email)
		);

		if ($update == false) {
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

	// TAB DATA KONSUMEN
	public function ceksavedatakonsumen() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
	}

	public function savedatakonsumen() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');

		$perusahaan = $this->input->post('fs_nama_perusahaan_konsumen');
		$alamat = $this->input->post('fs_alamat_usaha_konsumen');
		$telephone = $this->input->post('fs_telfon_usaha_konsumen');
		$kategori = $this->input->post('fs_kategori_usaha_konsumen');
		$skala = $this->input->post('fs_skala_perusahaan_konsumen');
		$sejak = $this->input->post('fs_kerja_sejak_konsumen');
		$usaha = $this->input->post('fs_usaha_pekerjaan_konsumen');
		$keterangan = $this->input->post('fs_keterangan_usaha_konsumen');
		$jekel = $this->input->post('fs_jenis_kelamin_konsumen');
		$tempat = $this->input->post('fs_tempat_lahir_konsumen');
		$tanggal = $this->input->post('fd_tanggal_lahir_konsumen');
		$status = $this->input->post('fs_status_konsumen');
		$rumah = $this->input->post('fs_status_rumah');
		$agama = $this->input->post('fs_agama_konsumen');
		$pendidikan = $this->input->post('fs_pendidikan_konsumen');
		$ibukandung = $this->input->post('fs_nama_ibu_kandung');
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
			'fs_kategori_usaha_konsumen' => trim($kategori),
			'fs_skala_perusahaan_konsumen' => trim($skala),
			'fs_kerja_sejak_konsumen' => trim($sejak),
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
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

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
	public function ceksavestrukturkredit() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
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

		$update = false;
		$this->load->model('MApkPerorangan');
		$sSQL = $this->MApkPerorangan->checkAPK($cabang, $noapk);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_pola_angsuran' => '',
			'fs_cara_bayar' => '',
			'fs_angsuran_dimuka' => '',
			'fn_kali_angsuran_dimuka' => '',
			'fn_jumlah_angsuran_dimuka' => '',
			'fn_biaya_tjh' => '',
			'fn_selisih_dp' => '',
			'fs_angsuran_dimuka_potong_pencairan' => '',
			'fn_dp_bayar' => '',
			'fs_angsuran_dibayar_dealer' => '',
			'fn_biaya_adm' => '',
			'fn_premi_asuransi_gross' => '',
			'fn_premi_asuransi' => '',
			'fn_premi_asuransi_gross_perluasan' => '',
			'fn_premi_asuransi_netto' => '',
			'fn_denda_perhari' => '',
			'fn_harga_otr' => '',
			'fn_uang_muka_dealer' => '',
			'fn_asuransi_dikredit_dealer' => '',
			'fn_persen_bunga_flat_dealer' => '',
			'fn_pokok_pembiayaan_dealer' => '',
			'fn_persen_bunga_efektif_dealer' => '',
			'fn_bulan_masa_angsuran_dealer' => '',
			'fn_kali_masa_angsuran_dealer' => '',
			'fn_bunga_dealer' => '',
			'fn_angsuran_dealer' => '',
			'fn_angsuran_tidak_sama_dealer' => '',
			'fn_uang_muka_konsumen' => '',
			'fn_asuransi_dikredit_konsumen' => '',
			'fn_pokok_pembiayaan_konsumen' => '',
			'fn_persen_bunga_flat_konsumen' => '',
			'fn_persen_bunga_efektif_konsumen' => '',
			'fn_bulan_masa_angsuran_konsumen' => '',
			'fn_kali_masa_angsuran_konsumen' => '',
			'fn_bunga_konsumen' => '',
			'fn_angsuran_konsumen' => '',
			'fn_angsuran_tidak_sama_konsumen' => ''
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

	// TAB DATA TAMBAHAN
	public function ceksavedatatambahan() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
	}

	public function savedatatambahan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$noapk = $this->input->post('fn_no_apk');
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
	}
}