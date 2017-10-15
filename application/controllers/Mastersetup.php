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

	public function gridcabang() {

	}

	public function grid() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		// PARAMS
		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_counter');
		$nojen = $this->input->post('fs_no_jenis_counter');

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
		$array = array(
			2 => array('APK','APK'),
			4 => array('BATCH','BATCH'),
			6 => array('PJJ','PJJ')
		);
		$out = array_values($array);
		echo json_encode($out);
	}

	public function cb_nojen() {

	}

	public function ceksave() {

	}

	public function cekreset() {

	}

	public function save() {

	}

	public function reset() {

	}

}