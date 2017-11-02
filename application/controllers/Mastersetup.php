<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mastersetup extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmastersetup');
	}

	public function grid() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		// PARAMS
		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_counter');
		$nojen = $this->input->post('fs_no_jenis_counter');

		$this->db->trans_start();
		$this->load->model('MMasterSetup');
		$sSQL = $this->MMasterSetup->listSetupAll($cabang, $jenis, $nojen);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterSetup->listSetup($cabang, $jenis, $nojen, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_jenis_counter' => trim($xRow->fs_jenis_counter),
					'fs_no_jenis_counter' => trim($xRow->fs_no_jenis_counter),
					'fn_counter' => trim($xRow->fn_counter)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function cb_jenisco() {
		$array = array(1 => array('APK', "APK"), 2 => array('BATCH', "BATCH"), 3 => array('PJJ', "PJJ"));
		$out = array_values($array);
		echo json_encode($out);
	}

	public function cb_nojen() {
		$array = array(1 => array(0, '0'), 2 => array(91,'91'), 3 => array(92,'92'), 4 => array(93,'93'), 5 => array(95,'95'), 6 => array(96,'96'), 7 => array(97,'97'));
		$out = array_values($array);
		echo json_encode($out);
	}

	public function ceksavecounter() {
		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_counter');
		$nojen = $this->input->post('fs_no_jenis_counter');
		$counter = $this->input->post('fn_counter');

		if (!empty($cabang) && !empty($jenis) && $nojen <> '' && !empty($counter)) {
			$this->load->model('MMasterSetup');
			$sSQL = $this->MMasterSetup->checkSetup($cabang, $jenis, $nojen, $counter);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Master Setup sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Master Setup belum ada, Apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Master Setup Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function savecounter() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_counter');
		$nojen = $this->input->post('fs_no_jenis_counter');
		$counter = $this->input->post('fn_counter');

		$update = false;
		$this->load->model('MMasterSetup');
		$sSQL = $this->MMasterSetup->checkSetup($cabang, $jenis, $nojen, $counter);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_jenis_counter' => trim($jenis),
			'fs_no_jenis_counter' => trim($nojen),
			'fn_counter' => trim($counter)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_counter', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Counter, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_jenis_counter = '".trim($jenis)."' AND fs_no_jenis_counter = '".trim($nojen)."'";
			$this->db->where($where);
			$this->db->update('tm_counter', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Counter, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

	public function cekresetcounter() {
		$this->load->model('MMasterSetup');
		$sSQL = $this->MMasterSetup->checkYear();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$data[] = $xRow->yy;
			}

			$check = count(array_unique($data));
			if ($check == 1) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Prefix nomor counter '.$data[0].', berdasarkan tahun ini akan di reset semua.'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => false,
					'hasil' => 'Prefix nomor counter '.$data[0].' tidak berurutan!!, silakan edit kembali nomor counternya.'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Reset Counter, Gagal...'
			);
			echo json_encode($hasil);
		}
	}

	public function resetcounter() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$year = trim($this->input->post('fn_year'));
		$yy = substr($year, 2, 2);

		$this->load->model('MMasterSetup');
		$sSQL = $this->MMasterSetup->checkYear();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$data[] = $xRow->yy;
			}

			$check = count(array_unique($data));
			if ($check == 1) {
				$yeardb = $data[0];
				if ($yy > $yeardb) {
					$newval = $yy . '0000';

					$dt = array(
						'fn_counter' => $newval,
						'fs_user_edit' => trim($user),
						'fd_tanggal_edit' => date('Y-m-d H:i:s')
					);
					$this->db->update('tm_counter', $dt);
					$hasil = array(
						'sukses' => true,
						'hasil' => 'Reset Prefix Nomor Counter, Sukses!!'
					);
					echo json_encode($hasil);
				} else {
					$hasil = array(
						'sukses' => false,
						'hasil' => 'Reset Prefix Nomor Counter, tidak ada perubahan!!'
					);
					echo json_encode($hasil);
				}
			} else {
				$hasil = array(
					'sukses' => false,
					'hasil' => 'Reset Gagal!!'
				);
				echo json_encode($hasil);
			}
		}
	}

}