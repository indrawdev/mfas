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

	public function gridplatnomor() {
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

	// TAB DATA UTAMA
	public function ceksavedatautama() {

	}

	public function savedatautama() {

	}

	// TAB DATA KONSUMEN
	public function ceksavedatakonsumen() {

	}

	public function savedatakonsumen() {

	}

	// TAB DATA KENDARAAN
	public function ceksavedatakendaraan() {

	}

	public function savedatakendaraan() {

	}

	// TAB DATA STRUKTUR KREDIT
	public function ceksavestrukturkredit() {

	}

	public function savestrukturkredit() {

	}

	// TAB DATA TAMBAHAN
	public function ceksavedatatambahan() {

	}

	public function savedatatambahan() {

	}

	// TAB DATA PENCAIRAN
	public function ceksavedatapencairan() {

	}

	public function savedatapencairan() {
		
	}
}