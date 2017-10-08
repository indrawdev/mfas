<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		if ($this->session->userdata('kdcabang') <> '00') {
			$this->load->view('vdashboardcabang');
		} else {
			$this->load->view('vdashboardpusat');
		}
	}

	public function setuju() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->statusDisetujui();
		$xTotal = $sSQL->num_rows();
		$xArr = array();

		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'name' => trim(substr($xRow->bulan, 0, 3)),
					'value' => trim($xRow->jumlah)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function tolak() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->statusDitolak();
		$xTotal = $sSQL->num_rows();

	}

	public function proses() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->statusDiproses();
		$xTotal = $sSQL->num_rows();
	}

	public function batal() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->statusDibatal();
		$xTotal = $sSQL->num_rows();
	}

	public function monthgrade() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->gradeMonthly();
		$xTotal = $sSQL->num_rows();
	}

	public function yeargrade() {
		$this->load->model('MDashboard');

		$sSQL = $this->MDashboard->gradeYearly();
		$xTotal = $sSQL->num_rows();
	}
}