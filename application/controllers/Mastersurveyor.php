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

	}

	public function ceksave() {

	}

	public function save() {

	}

	public function remove() {
		
	}
}