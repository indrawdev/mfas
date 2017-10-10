<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Transferapk extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vtransferapk');
	}

	public function gridtransfer() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
	}

	public function createdbf() {
		$this->load->helper('dbf');
		// CALL BACK
		createAPK();
		createAPKJ();
		createAPKK();
		createAPKP();
		createAPKS();
		createAPKT();
		createCAIR();
	}

	public function deletedbf() {
		foreach (glob("temp/*.dbf") as $file) {
			unlink($file);
		}
		unlink("./temp/download.zip");
	}

	public function createzip() {
		$zip = new ZipArchive;
		$zip->open($download, ZipArchive::CREATE);

		foreach (glob("temp/*.dbf") as $file) {
			$zip->addFile($file);
		}

		$zip->close();
	}
	
	public function ceksave() {
	}

	public function save() {
		$kdcabang = '';
		$noapk = explode('|', $this->input->post('fn_no_apk'));
		$total = count($noapk) - 1;

		$this->deleteDBF();
		$this->createDBF();

		$db1 = dbase_open('./temp/DTAPK.dbf', 2);
		$db2 = dbase_open('./temp/DTAPKJ.dbf', 2);
		$db3 = dbase_open('./temp/DTAPKK.dbf', 2);
		$db4 = dbase_open('./temp/DTAPKP.dbf', 2);
		$db5 = dbase_open('./temp/DTAPKS.dbf', 2);
		$db6 = dbase_open('./temp/DTAPKT.dbf', 2);
		$db7 = dbase_open('./temp/DTCAIR.dbf', 2);

		$this->load->model('MTransferApk');

		if ($total > 0) {
			for ($i = 1; $i <= $total; $i++) {
				// DTAPK, DTAPKK, DTAPKS, DTAPKT, DTCAIR
				$sgl = $this->MTransferApk->single($noapk[$i], $kdcabang);
				foreach ($sgl->result() as $row) {
					dbase_add_record($db1, array());

					dbase_add_record($db3, array());

					dbase_add_record($db5, array());

					dbase_add_record($db6, array());

					dbase_add_record($db7, array());
				}
				
				// DTAPKP
				$dbl = $this->MTransferApk->double($noapk[$i], $kdcabang);
				foreach ($dbl->result() as $row) {
					dbase_add_record($db4, array());
				}

				// DTAPKJ
				$dtl = $this->MTransferApk->detail($noapk[$i], $kdcabang);
				foreach ($dtl->result() as $row) {
					dbase_add_record($db2, array());
				}

				$data = array(
					'fs_flag_transfer' => 1,
					'fs_user_edit' => trim($username),
					'fd_user_edit' => date('Y-m-d')
				);

				$where = "fs_kode_cabang = '".trim($kdcabang)."' AND fn_no_apk = '".trim($noapk[$i])."'";
				$this->db->where($where);
				$this->db->update('tx_apk', $data);
			}

			dbase_close($db1);
			dbase_close($db2);
			dbase_close($db3);
			dbase_close($db4);
			dbase_close($db5);
			dbase_close($db6);
			dbase_close($db7);

			$hasil = array(
				'sukses' => true,
				'url' => './temp/download.zip',
				'hasil' => 'Export to DBF Success',
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Export to DBF Failed',
			);
			echo json_encode($hasil);
		}
	}
}