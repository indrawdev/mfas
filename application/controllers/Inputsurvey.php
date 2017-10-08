<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inputsurvey extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vinputsurvey');
	}

	// FUNCTION SELECT / DROPDOWN
	public function cb_lingkungan() {

	}

	public function cb_garasi() {

	}

	public function cb_kantor() {

	}

	public function gridretail() {

	}

	public function gridfleet() {

	}

	public function gridsurveyor() {

	}

	public function gridkonsumen() {

	}

	public function datapendukung() {

	}

	public function apkpendukung() {

	}

	public function griddetail() {

	}

	public function uploadfile() {

	}

	public function removefile() {

	}

	public function ceksave() {

	}

	public function save() {

	}

}