<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Statusapk extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		if ($this->session->userdata('kdcabang') <> '00') { 
			$this->load->view('vstatusapkcabang');
		} else {
			$this->load->view('vstatusapkpusat');
		}
	}

	// GRID CABANG
	public function gridcabangstatus() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MStatusApk');
		$sSQL = $this->MStatusApk->listCabangStatusAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MStatusApk->listCabangStatus($sCari, $nStart, $nLimit);
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
					'fs_status_survey' => trim($xRow->fs_status_survey),
					'fs_status_keputusan' => trim($xRow->fs_status_keputusan),
					'fs_status_transfer' => trim($xRow->fs_status_transfer),
					'fs_keputusan_kredit' => trim($xRow->fs_keputusan_kredit),
					'fs_catatan_analisa' => trim($xRow->fs_catatan_analisa)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// GRID PUSAT
	public function gridpusatstatus() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MStatusApk');
		$sSQL = $this->MStatusApk->listPusatStatusAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MStatusApk->listPusatStatus($sCari, $nStart, $nLimit);
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
					'fs_status_survey' => trim($xRow->fs_status_survey),
					'fs_status_keputusan' => trim($xRow->fs_status_keputusan),
					'fs_status_transfer' => trim($xRow->fs_status_transfer),
					'fs_keputusan_kredit_pusat' => trim($xRow->fs_keputusan_kredit_pusat)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}
}