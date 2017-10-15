<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Group extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vgroup');
	}

	public function gridgroup() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
		
		$this->db->trans_start();
		$this->load->model('MGroup');
		$sSQL = $this->MGroup->listGroupAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MGroup->listGroup($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_npwp_konsumen' => trim($xRow->fs_npwp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridungroup() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MGroup');
		$sSQL = $this->MGroup->listUngroupAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MGroup->listUngroup($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_npwp_konsumen' => trim($xRow->fs_npwp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen)
				);
			}
		}
	}

	public function ceksavegroup() {
		$jenis = explode('|', $this->input->post('fs_jenis_pembiayaan'));
		$ktp = explode('|', $this->input->post('fs_ktp_konsumen'));
		$npwp = explode('|', $this->input->post('fs_npwp_konsumen'));

		$arr_jenis = count(array_unique($jenis)) - 1;
		$arr_ktp = count(array_unique($ktp)) - 1;
		$arr_npwp = count(array_unique($npwp)) - 1;

		if ($arr_jenis == 1) {
			$split = array_unique($jenis);
			if ($split[1] == 'P' || $split[1] == 'W') {
				if ($arr_ktp == 1) {
					$hasil = array();
					echo json_encode($hasil);
				} else {
					$hasil = array();
					echo json_encode($hasil);
				}
			} else {
				if ($arr_npwp == 1) {
					
				}
			}
		}
	}

	public function ceksaveungroup() {

	}

	public function savegroup() {

	}

	public function saveungroup() {
		$cabang = explode('|', $this->input->post('fs_kode_cabang'));
		$batch = explode('|', $this->input->post('fn_no_batch'));

		$this->load->model('MGroup');
		$count = count($batch) - 1;

		if ($count > 0) {
			for ($i = 1; $i <= $count; $i++) {
				$data = array(
					'fn_no_batch' => NULL,
					'fs_user_edit' => '',
					'fd_tanggal_edit' => ''
				);
				$where = "fn_no_batch = '".trim($batch[$i])."' AND fs_kode_cabang = '".trim($cabang[$i])."'";
				$this->db->where($where);
				$this->db->update('tx_apk', $data);
			}
		}
		
		$hasil = array(
			'sukses' => true,
			'hasil' => 'UnGrouping Success!...'
		);
		echo json_encode($hasil);
	}
}