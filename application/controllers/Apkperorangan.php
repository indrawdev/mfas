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

	public function lembaga() {
		$kode = $this->input->post('fs_kode_cabang');
		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->getLembaga($kode);
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode' => trim($xRow->fs_kode_lembaga_keuangan1),
						'fs_nama' => trim($xRow->fs_nama_lembaga_keuangan)
					);
			}
		}
		echo json_encode($xArr);
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