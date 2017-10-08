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
		
	}

	public function griddokumen() {

	}

	public function cekprint() {

	}

	public function print() {

	}

}