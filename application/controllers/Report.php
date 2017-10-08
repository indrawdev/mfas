<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vreport');
	}

	public function previewbadanusaha($kdcab, $apk) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$html = $this->load->view('print/vbadanusaha', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('DAFTAR PEMERIKSAAN APK');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.4, '', false);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('daftar-pemeriksaan-badan-usaha.pdf', 'I');
	}

	public function previewperorangan($kdcab, $apk) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function angsuran($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function struktur($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function tambahan($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function syaratumum($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function persetujuankuasa($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function fidusia($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function jaminanfidusia($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function asuransi($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function bedadata($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function berhubunganad($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function jualbeli($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function masatenggang($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function unitmilikpribadi($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function pemesanan($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function purchase($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function pemblokiran($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');
	}

	public function penolakan($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$html = $this->load->view('print/vpenolakan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PENOLAKAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('SIAP');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 11, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-penolakan.pdf', 'I');
	}

}