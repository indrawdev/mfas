<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kontrak extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vkontrak');
	}

	public function gridkonsumen() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MKontrak');
		$sSQL = $this->MKontrak->listKonsumenAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MKontrak->listKonsumen($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function griddokumen() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MKontrak');
		$sSQL = $this->MKontrak->listDokumenAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MKontrak->listDokumen($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_dokumen' => trim($xRow->fs_kode_dokumen),
					'fs_nama_dokumen' => trim($xRow->fs_nama_dokumen),
					'fs_template_dokumen' => trim($xRow->fs_template_dokumen),
					'fn_batas_cetak' => trim($xRow->fn_batas_cetak)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function cekprint() {
		$cabang = $this->input->post('fs_kode_cabang');
		$noapk = $this->input->post('fn_no_apk');
		$kode = $this->input->post('fs_kode_dokumen');

		if (!empty($cabang) && !empty($noapk) && !empty($kode)) {
			$this->load->model('MKontrak');
			$dokumen = $this->MKontrak->dokumen($kode);
			$hitung = $this->MKontrak->hitung($cabang, $noapk, $kode);
			
			if ($hitung->num_rows() > $dokumen->fn_batas_cetak) {
				$hasil = array(
					'sukses' => false,
					'hasil' => 'habis'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'lanjut'
				);
				echo json_encode($hasil);
			}	
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Cetak Kontrak, Gagal...'
			);
			echo json_encode($hasil);
		}
	}

	public function print() {
		$cabang = $this->input->post('fs_kode_cabang');
		$noapk = $this->input->post('fn_no_apk');
		$kode = $this->input->post('fs_kode_dokumen');
		$nama = $this->input->post('fs_nama_ca');
		$jabatan = $this->input->post('fs_jabatan_ca');

		$data = array(
			'fs_kode_cabang' => trim($cabang),
			'fn_no_apk' => trim($noapk),
			'fs_kode_dokumen' => trim($kode),
			'fs_nama_ca' => trim($nama),
			'fs_jabatan_ca' => trim($jabatan),
			'fs_user_cetak' => trim($user),
			'fd_tanggal_cetak' => date('Y-m-d H:i:s')
		);
		$this->db->insert('tx_apk_cetak', $data);
		
		$this->load->model('MKontrak');
		$xdoc = $this->MKontrak->dokumen($kode);
		$hasil = array(
			'sukses' => true,
			'url' => $xdoc->fs_template_dokumen,
			'title' => $xdoc->fs_nama_dokumen,
			'hasil' => 'Cetak Kontrak, Sukses!!'
		);
		echo json_encode($hasil);
	}

}