<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterpendukung extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterpendukung');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterPendukung');
		$sSQL = $this->MMasterPendukung->listPendukungAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterPendukung->listPendukung($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_dokumen' => trim($xRow->fs_kode_dokumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_jenis_dokumen' => trim($xRow->fs_jenis_dokumen),
					'fs_nama_dokumen' => trim($xRow->fs_nama_dokumen),
					'fs_wajib' => trim($xRow->fs_wajib)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$dokumen = $this->input->post('fs_kode_dokumen');
		if (!empty($dokumen)) {
			$this->load->model('MMasterPendukung');
			$sSQL = $this->MMasterPendukung->checkPendukung($dokumen);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Master Data Pendukung sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Master Data Pendukung belum ada, Apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Master Data Pendukung Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$dokumen = $this->input->post('fs_kode_dokumen');
		$pembiayaan = $this->input->post('fs_jenis_pembiayaan');
		$jenis = $this->input->post('fs_jenis_dokumen');
		$nama = $this->input->post('fs_nama_dokumen');
		$wajib = $this->input->post('fs_wajib');

		$update = false;
		$this->load->model('MMasterPendukung');
		$sSQL = $this->MMasterPendukung->checkPendukung($dokumen);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_dokumen' => trim($dokumen),
			'fs_jenis_pembiayaan' => trim($pembiayaan),
			'fs_jenis_dokumen' => trim($jenis),
			'fs_nama_dokumen' => trim($nama),
			'fs_wajib' => trim($wajib)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_data_pendukung', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Pendukung, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_dokumen = '".trim($dokumen)."'";
			$this->db->where($where);
			$this->db->update('tm_data_pendukung', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Pendukung, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

}