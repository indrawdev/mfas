<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterproduk extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterproduk');
	}

	public function gridproduk() {
		$sCari = trim($this->input->post('fs_kode_cabang'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterProduk');
		$sSQL = $this->MMasterProduk->listProdukAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterProduk->listProduk($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0)  {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
						'fs_nilai_1' => trim($xRow->fs_nilai_1),
						'fs_nilai_2' => trim($xRow->fs_nilai_2),
						'fs_nama_produk' => trim($xRow->fs_nama_produk)
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabang() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->listCabangAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MSearch->listCabang($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0)  {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
						'fs_nama_cabang' => trim($xRow->fs_nama_cabang)
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpolatrans() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterProduk');
		$sSQL = $this->MMasterProduk->listPolaAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterProduk->listPola($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0)  {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_nilai1_referensi' => trim($xRow->fs_nilai1_referensi),
						'fs_nilai2_referensi' => trim($xRow->fs_nilai2_referensi),
						'fs_nama_referensi' => trim($xRow->fs_nama_referensi)
					);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$cabang = $this->input->post('fs_kode_cabang');
		if (!empty($cabang)) {
			$this->load->model('MMasterProduk');
			$sSQL = $this->MMasterProduk->checkProduk($cabang);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
						'sukses' => true,
						'hasil' => 'Apakah Anda ingin meng-update data produk?'
					);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Apakah Anda ingin menambah baru data produk?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Data, Gagal...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->input->post('fs_kode_cabang');

		// hapus detail pola
		$where = "fs_kode_cabang = '".trim($cabang)."'";
		$this->db->where($where);
		$this->db->delete('tm_produk');

		// simpan detail pola
		$nilai1 = explode('|', $this->input->post('fs_nilai_1'));
		$nilai2 = explode('|', $this->input->post('fs_nilai_2'));
		$pola = explode('|', $this->input->post('fs_nama_produk'));

		$jml = count($pola) - 1;

		if ($jml <> 0) {
			for ($i=1; $i<=$jml; $i++) {
				$data = array(
					'fs_kode_cabang' => trim($cabang),
					'fs_nilai_1' => trim($nilai1[$i]),
					'fs_nilai_2' => trim($nilai2[$i]),
					'fs_nama_produk' => trim($pola[$i]),
					'fs_user_buat' => trim($user),
					'fd_tanggal_buat' => date('Y-m-d H:i:s')
				);
				$this->db->insert('tm_produk', $data);
			}
		}

		$hasil = array(
					'sukses' => true,
					'hasil' => 'Simpan Data Produk, Sukses!!'
				);
		echo json_encode($hasil);
	}

}