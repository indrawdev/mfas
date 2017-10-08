<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Apkperorangan extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vapkperorangan');
	}

	// TAB DATA UTAMA
	public function ceksavedatautama() {

	}

	public function savedatautama() {

	}

	// TAB DATA KONSUMEN
	public function ceksavedatakonsumen() {

	}

	public function savedatakonsumen() {

	}

	// TAB DATA KENDARAAN
	public function ceksavedatakendaraan() {

	}

	public function savedatakendaraan() {

	}

	// TAB DATA STRUKTUR KREDIT
	public function ceksavestrukturkredit() {

	}

	public function savestrukturkredit() {

	}

	// TAB DATA TAMBAHAN
	public function ceksavedatatambahan() {

	}

	public function savedatatambahan() {

	}

	// TAB DATA PENCAIRAN
	public function ceksavedatapencairan() {

	}

	public function savedatapencairan() {
		
	}
}