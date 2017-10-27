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

	public function angsuran($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		$html = $this->load->view('print/vangsuran', $data, true);
		$pdf = new Pdfcustom('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERJANJIAN PEMBELIAN DENGAN PEMBAYARAN SECARA ANGSURAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(true);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
		$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7.88, '', false);
		$pdf->setCellHeightRatio(1.14);
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('perjanjian-pembelian-dengan-pembayaran-secara-angsuran.pdf', 'I');
	}

	public function struktur($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// referensi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$data['dealer'] = $this->MReport->dealer($kdcab, $apk);
		$data['asuransi'] = $this->MReport->asuransi($kdcab, $apk);
		$data['pola_transaksi'] = $this->MReport->ref_pola_transaksi($kdcab, $apk);
		$data['jenis_asuransi'] = $this->MReport->ref_jenis_asuransi($kdcab, $apk);
		$data['kategori_usaha'] = $this->MReport->kategori_usaha($kdcab, $apk);
		$data['denda_perhari'] = $this->MReport->denda_perhari($kdcab, $apk);
		$data['pinalti_lunas'] = $this->MReport->pinalti_lunas($kdcab, $apk);
		$data['asuransi_mix'] = $this->MReport->data_asuransi_mix($kdcab, $apk);
		$data['asuransi_notmix'] = $this->MReport->data_asuransi_notmix($kdcab, $apk);
		
		// biaya
		$data['biaya_survey'] = $this->MReport->biaya_survey($kdcab, $apk);
		$data['biaya_asuransi'] = $this->MReport->biaya_asuransi($kdcab, $apk);
		$data['biaya_provisi'] = $this->MReport->biaya_provisi($kdcab, $apk);
		$data['biaya_notaris'] = $this->MReport->biaya_notaris($kdcab, $apk);

		$html = $this->load->view('print/vstruktur_old', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('STRUKTUR PERJANJIAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 8.5, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.23);
		} else {
			$pdf->setCellHeightRatio(1.28);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('struktur-perjanjian.pdf', 'I');	
	}

	public function tambahan($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		$html = $this->load->view('print/vtambahan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERJANJIAN TAMBAHAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.31);
		} else {
			$pdf->setCellHeightRatio(1.38);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('perjanjian-tambahan.pdf', 'I');	
	}

	public function syaratumum($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		$html = $this->load->view('print/vsyaratumum', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SYARAT-SYARAT UMUM');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 7, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.25);
		} else {
			$pdf->setCellHeightRatio(1.30);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('syarat-syarat-umum.pdf', 'I');
	}

	public function persetujuankuasa($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);

		// referensi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vpersetujuankuasa', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERNYATAAN PERSETUJUAN DAN KUASA');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.42);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('pernyataan-persetujuan-dan-kuasa.pdf', 'I');
	}

	public function fidusia($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// referensi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vfidusia', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PERJANJIAN PENYERAHAN HAK MILIK SECARA FIDUSIA');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.35);
		} else {
			$pdf->setCellHeightRatio(1.40);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('perjanjian-penyerahan-hak-milih-secara-fidusia.pdf', 'I');
	}

	public function jaminanfidusia($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);
		$data['pk_nama'] = $this->MReport->penerima_kuasa('N');
		$data['pk_alamat'] = $this->MReport->penerima_kuasa('A');
		$data['pk_jabatan'] = $this->MReport->penerima_kuasa('J');

		// referensi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vjaminanfidusia', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT KUASA PEMBERIAN JAMINAN FIDUSIA');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.35);
		} else {
			$pdf->setCellHeightRatio(1.40);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-kuasa-pemberian-jaminan-fidusia.pdf', 'I');	
	}

	public function asuransi($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);

		$html = $this->load->view('print/vasuransi', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN ASURANSI');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.45);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-asuransi.pdf', 'I');
	}

	public function bedadata($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);

		$html = $this->load->view('print/vbedadata', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN BERHUBUNGAN DENGAN AD');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.25);
		} else {
			$pdf->setCellHeightRatio(1.32);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-beda-data-identitas-perorangan.pdf', 'I');
	}

	public function berhubunganad($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);

		$html = $this->load->view('print/vberhubunganad', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN BERHUBUNGAN DENGAN AD');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.32);
		} else {
			$pdf->setCellHeightRatio(1.40);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-berhubungan-dengan-ad.pdf', 'I');
	}

	public function jualbeli($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$data['dealer'] = $this->MReport->dealer($kdcab, $apk);

		$html = $this->load->view('print/vjualbeli', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN JUAL BELI');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-jual-beli.pdf', 'I');
	}

	public function masatenggang($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);

		$html = $this->load->view('print/vmasatenggang', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN MASA TENGGANG');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.42);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-masa-tenggang.pdf', 'I');
	}

	public function unitmilikpribadi($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$data['pekerjaan'] = $this->MReport->ref_pekerjaan($kdcab, $apk);
		$data['usaha_konsumen'] = $this->MReport->usaha_konsumen($kdcab, $apk);
		$data['dealer'] = $this->MReport->dealer($kdcab, $apk);

		$html = $this->load->view('print/vunitmilikpribadi', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PERNYATAAN UNIT MILIK PRIBADI');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pernyataan-unit-milik-pribadi.pdf', 'I');
	}

	public function pemesanan($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$html = $this->load->view('print/vpemesanan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PEMESANAN KENDARAAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pemesanan-kendaraan.pdf', 'I');
	}

	public function purchase($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['dealer'] = $this->MReport->dealer($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$html = $this->load->view('print/vpurchase', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PURCHASE ORDER');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('purchase-order.pdf', 'I');
	}

	public function pemblokiran($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);

		// relasi
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$data['pola_transaksi'] = $this->MReport->ref_pola_transaksi($kdcab, $apk);
		
		$html = $this->load->view('print/vpemblokiran', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('PURCHASE ORDER');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
		$pdf->SetDisplayMode('real', 'default');
		$pdf->SetFont('', '', 9, '', false);
		if ($kop == 1) {
			$pdf->setCellHeightRatio(1.40);
		} else {
			$pdf->setCellHeightRatio(1.50);
		}
		$pdf->AddPage('P', 'A4');
		$pdf->writeHTML($html, true, false, true, false, '');
		$pdf->lastPage();
		$pdf->Output('surat-pemblokiran-bpkb.pdf', 'I');
	}

	public function penolakan($kdcab, $apk, $kop) {
		$this->load->library('Pdf');
		$this->load->model('MReport');

		$data['kop'] = $kop;
		$data['cabang'] = $this->MReport->cabang($kdcab, $apk);
		$data['detail'] = $this->MReport->detail($kdcab, $apk);
		$data['pjj'] = $this->MReport->pjj($kdcab, $apk);
		$data['dealer'] = $this->MReport->dealer($kdcab, $apk);
		$data['kendaraan'] = $this->MReport->kendaraan($kdcab, $apk);
		$data['nama'] = $this->MReport->check_nama($kdcab, $apk);
		
		$html = $this->load->view('print/vpenolakan', $data, true);
		$pdf = new Pdf('P', 'mm', 'A4', true, 'UTF-8', false);
		$pdf->SetTitle('SURAT PENOLAKAN');
		$pdf->SetPrintHeader(false);
		$pdf->SetPrintFooter(false);
		$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_RIGHT);
		$pdf->SetAutoPageBreak(True, PDF_MARGIN_FOOTER);
		$pdf->SetAuthor('MFAS');
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