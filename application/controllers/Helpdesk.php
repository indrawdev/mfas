<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Helpdesk extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vhelpdesk');
	}

	public function username() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$hasil = array(
			'sukses' => true,
			'fs_kode_cabang' => trim($cabang),
			'fs_username' => trim($user)
		);
		echo json_encode($hasil);
	}

	public function select() {
		$kode = trim($this->input->post('fs_kode_referensi'));
		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->getReferensi($kode);
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode' => trim($xRow->fs_nilai1_referensi),
						'fs_nama' => trim($xRow->fs_nama_referensi)
					);
			}
		}
		echo json_encode($xArr);
	}

	public function grid() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$this->db->trans_start();
		$this->load->model('MHelpDesk');
		$sSQL = $this->MHelpDesk->listBantuanAll($sCabang, $sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MHelpDesk->listBantuan($sCabang, $sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {

			}
		}
	}

	public function ceksave() {

	}

	public function save() {
		
	}

	// SENDER EMAIL
	public function sendemail($to, $subject, $content, $file) {
		$this->load->model('MEmail');
		$email = $this->MEmail->config('N');

		$this->load->library('email');
		$config = array(
			'protocol' => $email->protocol,
			'smtp_crypto' => $email->smtp_crypto,
			'smtp_host' => $email->smtp_host,
			'smtp_user' => $email->smtp_user,
			'smtp_pass' => $email->smtp_pass,
			'smtp_port' => $email->smtp_port,
			'mailtype' => $email->mailtype,
			'smtp_timeout' => $email->smtp_timeout,
			'charset' => $email->charset,
		);
		$config['newline'] = "\r\n";

		$this->email->clear(TRUE);
		$this->email->initialize($config);
		$this->email->from($email->smtp_user, "MFAS Helpdesk");
		$this->email->to($to);
		$this->email->subject($subject);
		$this->email->message($content);
		$this->email->attach($file);
		$this->email->set_crlf("\r\n");
		$this->email->set_newline("\r\n");

		if (!$this->email->send()) {
			show_error($this->email->print_debugger());
		}
	}

	// SEND EMAIL NOTIF HELPDESK
	public function sendnotif($to) {
		$this->load->model('MHelpDesk');
		$data['helpdesk'] = $this->MHelpDesk->getBantuan($username);
		$subject = 'NOTIF HELPDESK';
		$content = $this->load->view('email/vhelpdesk', $data);
		$this->sendemail($to, $subject, $content, $file);
	}

}