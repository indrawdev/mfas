<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterkewenangan extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterkewenangan');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterKewenangan');
		$sSQL = $this->MMasterKewenangan->listKewenanganAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterKewenangan->listKewenangan($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_pola_transaksi' => trim($xRow->fs_pola_transaksi),
					'fn_maks_plafon' => trim($xRow->fn_maks_plafon),
					'fs_maks_score' => trim($xRow->fs_maks_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$cabang = $this->input->post('fs_kode_cabang');
		$pola = $this->input->post('fs_pola_transaksi');

		if (!empty($cabang) && !empty($pola)) {
			$this->load->model('MMasterKewenangan');
			$sSQL = $this->MMasterKewenangan->checkKewenangan($cabang, $pola);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Master Kewenangan sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Master Kewenangan belum ada, Apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Master Kewenangan Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$pola = $this->input->post('fs_pola_transaksi');
		$plafon = $this->input->post('fn_maks_plafon');
		$score = $this->input->post('fs_maks_score');

		$update = false;
		$this->load->model('MMasterKewenangan');
		$sSQL = $this->MMasterKewenangan->checkKewenangan($cabang, $pola);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_pola_transaksi' => trim($pola),
			'fn_maks_plafon' => trim($plafon),
			'fs_maks_score' => trim($score)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_kewenangan', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Kewenangan, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_pola_transaksi = '".trim($pola)."'";
			$this->db->where($where);
			$this->db->update('tm_kewenangan', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Kewenangan, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}
}