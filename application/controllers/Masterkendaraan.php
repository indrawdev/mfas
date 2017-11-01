<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterkendaraan extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterkendaraan');
	}

	public function gridkendaraan() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterKendaraan');
		$sSQL = $this->MMasterKendaraan->listKendaraanAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterKendaraan->listKendaraan($sCari, $nStart, $nLimit);
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

	public function gridmerk() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterKendaraan');
		$sSQL = $this->MMasterKendaraan->listMerkAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterKendaraan->listMerk($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_kendaraan' => trim($xRow->fs_kode_kendaraan),
					'fs_negara' => trim($xRow->fs_negara),
					'fs_merek_kendaraan' => trim($xRow->fs_merek_kendaraan)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksavekendaraan() {
		$kendaraan = $this->input->post('fs_kode_kendaraan');
		if (!empty($kendaraan)) {
			$this->load->model('MMasterKendaraan');
			$sSQL = $this->MMasterKendaraan->checkKendaraan($kendaraan);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Kendaraan sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Kendaraan belum ada, Apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Kendaraan Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function savekendaraan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
	}

	public function ceksavemerk() {

	}

	public function savemerk() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
	}
}