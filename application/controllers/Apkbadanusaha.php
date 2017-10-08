<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Apkbadanusaha extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vapkbadanusaha');
	}

	public function gridbadanusaha() {

	}

	// TAB DATA UTAMA
	public function ceksavedatautama() {

	}

	public function savedatautama() {

	}

	// TAB DATA BADAN USAHA
	public function ceksavebadanusaha() {

	}

	public function savebadanusaha() {

	}

	// TAB DATA KENDARAAN
	public function ceksavedatakendaraan() {

	}

	public function savedatakendaraan() {

	}

	// TAB DATA STRUKTUR KREDIT
	public function ceksavedatastrukturkredit() {

	}

	public function savedatastrukturkredit() {

	}

	// TAB DATA PENGURUS
	public function ceksavedatapengurus() {

	}

	public function savedatapengurus() {

	}

	// TAB DATA PENCAIRAN
	public function ceksavedatapencairan() {

	}

	public function savedatapencairan() {
		
	}

}