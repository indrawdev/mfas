<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kalkulator extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vkalkulator');
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
}