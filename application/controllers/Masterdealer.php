<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterdealer extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterdealer');
	}

	public function grid() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MMasterDealer');
		$sSQL = $this->MMasterDealer->listDealerAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterDealer->listDealer($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_kode_dealer1' => trim($xRow->fs_kode_dealer1),
					'fs_kode_dealer2' => trim($xRow->fs_kode_dealer2),
					'fn_cabang_dealer' => trim($xRow->fn_cabang_dealer),
					'fs_nama_dealer' => trim($xRow->fs_nama_dealer),
					'fs_alamat_dealer' => trim($xRow->fs_alamat_dealer),
					'fs_kota_dealer' => trim($xRow->fs_kota_dealer),
					'fs_kodepos_dealer' => trim($xRow->fs_kodepos_dealer),
					'fs_telepon_dealer' => trim($xRow->fs_telepon_dealer),
					'fs_handphone_dealer' => trim($xRow->fs_handphone_dealer),
					'fs_nama_pemilik' => trim($xRow->fs_nama_pemilik),
					'fs_npwp_pemilik' => trim($xRow->fs_npwp_pemilik),
					'fs_nama_bank_pencairan' => trim($xRow->fs_nama_bank_pencairan),
					'fs_rekening_bank_pencairan' => trim($xRow->fs_rekening_bank_pencairan),
					'fs_atasnama_bank_pencairan' => trim($xRow->fs_atasnama_bank_pencairan),
					'fn_persen_refund_bunga' => trim($xRow->fn_persen_refund_bunga),
					'fn_persen_refund_asuransi' => trim($xRow->fn_persen_refund_asuransi),
					'fs_aktif' => trim($xRow->fs_aktif)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksave() {
		$cabang = $this->input->post('fs_kode_cabang');
		$dealer1 = $this->input->post('fs_kode_dealer1');
		$dealer2 = $this->input->post('fs_kode_dealer2');
		$cabang_dealer = $this->input->post('fn_cabang_dealer');

		if (!empty($cabang) && !empty($dealer1) && !empty($dealer2) && !empty($cabang_dealer)) {
			$this->load->model('MMasterDealer');
			$sSQL = $this->MMasterDealer->checkDealer($cabang, $dealer1, $dealer2, $cabang_dealer);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Dealer sudah ada, Apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Dealer belum ada, Apakah Anda ingin tambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan, Dealer Tidak ada...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$dealer1 = $this->input->post('fs_kode_dealer1');
		$dealer2 = $this->input->post('fs_kode_dealer2');
		$cabang_dealer = $this->input->post('fn_cabang_dealer');
		$nama = $this->input->post('fs_nama_dealer');
		$alamat = $this->input->post('fs_alamat_dealer');
		$kota = $this->input->post('fs_kota_dealer');
		$kodepos = $this->input->post('fs_kodepos_dealer');
		$telepon = $this->input->post('fs_telepon_dealer');
		$handphone = $this->input->post('fs_handphone_dealer');
		$pemilik = $this->input->post('fs_nama_pemilik');
		$npwp = $this->input->post('fs_npwp_pemilik');
		$bank = $this->input->post('fs_nama_bank_pencairan');
		$rekening = $this->input->post('fs_rekening_bank_pencairan');
		$atasnama = $this->input->post('fs_atasnama_bank_pencairan');
		$refund_bunga = $this->input->post('fn_persen_refund_bunga');
		$refund_ass = $this->input->post('fn_persen_refund_asuransi');
		$aktif = $this->input->post('fs_aktif');

		$update = false;
		$this->load->model('MMasterDealer');
		$sSQL = $this->MMasterDealer->checkDealer($cabang, $dealer1, $dealer2, $cabang_dealer);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_kode_dealer1' => trim($dealer1),
			'fs_kode_dealer2' => trim($dealer2),
			'fn_cabang_dealer' => trim($cabang_dealer),
			'fs_nama_dealer' => trim($nama),
			'fs_alamat_dealer' => trim($alamat),
			'fs_kota_dealer' => trim($kota),
			'fs_kodepos_dealer' => trim($kodepos),
			'fs_telepon_dealer' => trim($telepon),
			'fs_handphone_dealer' => trim($handphone),
			'fs_nama_pemilik' => trim($pemilik),
			'fs_npwp_pemilik' => trim($npwp),
			'fs_nama_bank_pencairan' => trim($bank),
			'fs_rekening_bank_pencairan' => trim($rekening),
			'fs_atasnama_bank_pencairan' => trim($atasnama),
			'fn_persen_refund_bunga' => trim($refund_bunga),
			'fn_persen_refund_asuransi' => trim($refund_ass),
			'fs_aktif' => trim($aktif)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_dealer', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Dealer, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_kode_dealer1 = '".trim($dealer1)."' AND fs_kode_dealer2 = '".trim($dealer2)."' AND fn_cabang_dealer = '".trim($cabang_dealer)."'";
			$this->db->where($where);
			$this->db->update('tm_dealer', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Data Dealer, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}
}