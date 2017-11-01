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

	public function select() {

	}

	public function combo() {

	}

	public function grid() {

	}

	public function ceksave() {

	}

	public function save() {
		
	}

}