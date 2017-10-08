<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Analisa extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		if ($this->session->userdata('kdcabang') <> '00') {
			$this->load->view('vanalisacabang');
		} else {
			$this->load->view('vanalisapusat');
		}
	}

	public function cb_keputusan() {
		$sCari = trim($this->input->post('fs_cari'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->getReferensi($sCari);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kd_strx' => trim($xRow->fs_nilai1_referensi),
					'fs_nm_strx' => trim($xRow->fs_nama_referensi)
				);
			}
		}
		echo json_encode($xArr);
	}

	public function cb_batal() {
		$arr = array(
				2 => array('Y','YA'),
				4 => array('N','TIDAK')
			);
		$out = array_values($arr);
		echo json_encode($out);
	}


	// GRID CABANG
	public function gridcabangretail() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangRetailAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangRetail($sCari, $nStart, $nLimit);
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
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabangfleet() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangFleetAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangFleet($sCari, $nStart, $nLimit);
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
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabangretailbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangRetailBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangRetailBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabangfleetbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangFleetBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangFleetBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->v),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// GRID PUSAT
	public function gridpusatretail() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatRetailAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatRetail($sCari, $nStart, $nLimit);
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
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score),
					'fs_catatan_analisa_cabang' => trim($xRow->fs_catatan_analisa_cabang)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpusatfleet() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatFleetAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatFleet($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score),
					'fs_catatan_analisa_cabang' => trim($xRow->fs_catatan_analisa_cabang)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpusatretailbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatRetailBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatRetailBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpusatfleetbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatFleetBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatFleetBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function checkinternal() {

	}

	public function checkreject() {

	}

	public function checkfamily() {

	}

	public function detailchecking() {

	}

	public function cekprint() {

	}

	public function print() {

	}

	public function predatapendukung() {

	}

	public function detailgrid() {

	}

	// FUNCTION CABANG
	public function ceksavecabang() {

	}

	public function savecabang() {

	}

	public function ceksavebatalcabang() {

	}

	public function savebatalcabang() {
		
	}

	// FUNCTION PUSAT
	public function ceksavepusat() {

	}

	public function savepusat() {

	}

	public function ceksavebatalpusat() {

	}

	public function savebatalpusat() {

	}
}
