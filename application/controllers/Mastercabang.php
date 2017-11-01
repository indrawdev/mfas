<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mastercabang extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmastercabang');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterCabang');
		$sSQL = $this->MMasterCabang->listCabangAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterCabang->listCabang($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_nama_cabang' => trim($xRow->fs_nama_cabang),
					'fs_alamat_cabang' => trim($xRow->fs_alamat_cabang),
					'fs_kota_cabang' => trim($xRow->fs_kota_cabang),
					'fs_kodepos_cabang' => trim($xRow->fs_kodepos_cabang),
					'fs_telfon_cabang' => trim($xRow->fs_telfon_cabang),
					'fs_fax_cabang' => trim($xRow->fs_fax_cabang),
					'fs_email_cabang' => trim($xRow->fs_email_cabang),
					'fs_nama_pimpinan' => trim($xRow->fs_nama_pimpinan),
					'fs_jabatan_pimpinan' => trim($xRow->fs_jabatan_pimpinan),
					'fs_ktp_pimpinan' => trim($xRow->fs_ktp_pimpinan),
					'fs_email_pimpinan' => trim($xRow->fs_email_pimpinan),
					'fs_nama_bank_angsuran' => trim($xRow->fs_nama_bank_angsuran),
					'fs_rekening_bank_angsuran' => trim($xRow->fs_rekening_bank_angsuran),
					'fs_atasnama_bank_angsuran' => trim($xRow->fs_atasnama_bank_angsuran),
					'fs_wilayah_asuransi' => trim($xRow->fs_wilayah_asuransi),
					'fs_aktif' => trim($xRow->fs_aktif)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$cabang = $this->input->post('fs_kode_cabang');
		if (!empty($cabang)) {
			$this->load->model('MMasterCabang');
			$sSQL = $this->MMasterCabang->checkCabang($cabang);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Cabang sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Cabang belum ada, Apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Cabang Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$nama = $this->input->post('fs_nama_cabang');
		$alamat = $this->input->post('fs_alamat_cabang');
		$kota = $this->input->post('fs_kota_cabang');
		$kodepos = $this->input->post('fs_kodepos_cabang');
		$telfon = $this->input->post('fs_telfon_cabang');
		$fax = $this->input->post('fs_fax_cabang');
		$email = $this->input->post('fs_email_cabang');
		$pimpinan = $this->input->post('fs_nama_pimpinan');
		$jabatan = $this->input->post('fs_jabatan_pimpinan');
		$ktp = $this->input->post('fs_ktp_pimpinan');
		$email_pimpinan = $this->input->post('fs_email_pimpinan');
		$bank = $this->input->post('fs_nama_bank_angsuran');
		$rekening = $this->input->post('fs_rekening_bank_angsuran');
		$atasnama = $this->input->post('fs_atasnama_bank_angsuran');
		$wilayah = $this->input->post('fs_wilayah_asuransi');
		$aktif = $this->input->post('fs_aktif');

		$update = false;
		$this->load->model('MMasterCabang');
		$sSQL = $this->MMasterCabang->checkCabang($cabang);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_nama_cabang' => trim($nama),
			'fs_alamat_cabang' => trim($alamat),
			'fs_kota_cabang' => trim($kota),
			'fs_kodepos_cabang' => trim($kodepos),
			'fs_telfon_cabang' => trim($telfon),
			'fs_fax_cabang' => trim($fax),
			'fs_email_cabang' => trim($email),
			'fs_nama_pimpinan' => trim($pimpinan),
			'fs_jabatan_pimpinan' => trim($jabatan),
			'fs_ktp_pimpinan' => trim($ktp),
			'fs_email_pimpinan' => trim($email_pimpinan),
			'fs_nama_bank_angsuran' => trim($bank),
			'fs_rekening_bank_angsuran' => trim($rekening),
			'fs_atasnama_bank_angsuran' => trim($atasnama),
			'fs_wilayah_asuransi' => trim($wilayah),
			'fs_aktif' => trim($aktif)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_cabang', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Cabang, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."'";
			$this->db->where($where);
			$this->db->update('tm_cabang', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Cabang, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}
}