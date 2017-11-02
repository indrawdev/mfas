<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mastersurveyor extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmastersurveyor');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterSurveyor');
		$sSQL = $this->MMasterSurveyor->listSurveyorAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterSurveyor->listSurveyor($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_kode_surveyor' => trim($xRow->fs_kode_surveyor),
					'fs_kode_surveyor_lama' => trim($xRow->fs_kode_surveyor_lama),
					'fs_nama_surveyor' => trim($xRow->fs_nama_surveyor),
					'fs_alamat_surveyor' => trim($xRow->fs_alamat_surveyor),
					'fs_ktp_surveyor' => trim($xRow->fs_ktp_surveyor),
					'fs_handphone_surveyor' => trim($xRow->fs_handphone_surveyor),
					'fs_aktif' => trim($xRow->fs_aktif)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$cabang = $this->input->post('fs_kode_cabang');
		$surveyor = $this->input->post('fs_kode_surveyor');
		if (!empty($cabang) && !empty($surveyor)) {
			$this->load->model('MMasterSurveyor');
			$sSQL = $this->MMasterSurveyor->checkSurveyor($cabang, $surveyor);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Surveyor sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Surveyor belum ada, apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Surveyor Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$surveyor = $this->input->post('fs_kode_surveyor');
		$kodelama = $this->input->post('fs_kode_surveyor_lama');
		$nama = $this->input->post('fs_nama_surveyor');
		$alamat = $this->input->post('fs_alamat_surveyor');
		$ktp = $this->input->post('fs_ktp_surveyor');
		$handphone = $this->input->post('fs_handphone_surveyor');
		$aktif = $this->input->post('fs_aktif');

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_kode_surveyor' => trim($surveyor),
			'fs_kode_surveyor_lama' => trim($kodelama),
			'fs_nama_surveyor' => trim($nama),
			'fs_alamat_surveyor' => trim($alamat),
			'fs_ktp_surveyor' => trim($ktp),
			'fs_handphone_surveyor' => trim($handphone),
			'fs_aktif' => trim($aktif)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_surveyor', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Surveyor, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_kode_surveyor = '".trim($surveyor)."'";
			$this->db->where($where);
			$this->db->update('tm_surveyor', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Surveyor, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

	public function remove() {
		$cabang = $this->input->post('fs_kode_cabang');
		$surveyor = $this->input->post('fs_kode_surveyor');

		if (!empty($cabang) && !empty($surveyor)) {
			$this->load->model('MMasterSurveyor');
			$sSQL = $this->MMasterSurveyor->checkSurveyor($cabang, $surveyor);
			if ($sSQL->num_rows() > 0) {
				$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_kode_surveyor = '".trim($surveyor)."'";
				$this->db->where($where);
				$this->db->delete('tm_surveyor');

				$hasil = array(
					'sukses' => false, 
					'hasil' => 'Surveyor sudah dihapus!'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false, 
				'hasil' => 'Surveyor tidak bisa dihapus!'
			);
			echo json_encode($hasil);
		}
	}
}