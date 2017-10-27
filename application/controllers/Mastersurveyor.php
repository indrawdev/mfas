<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mastersurveyor extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmastersurveyor');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterSurveyor');
		$sSQL = $this->MMasterSurveyor->listSurveyorAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterSurveyor->listSurveyor($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			
		}
	}

	public function ceksave() {

	}

	public function save() {

	}

	public function remove() {
		
	}
}