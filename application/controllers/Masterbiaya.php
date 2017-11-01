<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Masterbiaya extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vmasterbiaya');
	}

	// COMPONENT SELECT
	public function select() {
		$kode = trim($this->input->post('fs_kode_referensi'));
		$this->db->trans_start();
		$this->load->model('MSearch');
		$sSQL = $this->MSearch->getReferensi($kode);
		$this->db->trans_complete();
		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
						'fs_kode' => trim($xRow->fs_nilai1_referensi),
						'fs_nama' => trim($xRow->fs_nama_referensi)
					);
			}
		}
		echo json_encode($xArr);
	}

	public function combo() {
		// NON AKTIF
		$array = array(1 => array('Y','YA'), 2 => array('N','TIDAK'));
		$out = array_values($array);
		echo json_encode($out);
	}

	public function gridadmin() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');
		$lama = $this->input->post('fd_lama_angsuran');

		$this->db->trans_start();
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->listAdminAll($cabang, $jenis, $pola, $lama);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterBiaya->listAdmin($cabang, $jenis, $pola, $lama, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_jenis_piutang' => trim($xRow->fs_jenis_piutang),
					'fs_pola_transaksi' => trim($xRow->fs_pola_transaksi),
					'fd_lama_angsuran' => trim($xRow->fd_lama_angsuran),
					'fs_biaya_admin' => trim($xRow->fs_biaya_admin)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridfidusia() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');

		$this->db->trans_start();
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->listFidusiaAll($cabang, $jenis, $pola);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterBiaya->listFidusia($cabang, $jenis, $pola, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_jenis_piutang' => trim($xRow->fs_jenis_piutang),
					'fs_pola_transaksi' => trim($xRow->fs_pola_transaksi),
					'fs_min_otr' => trim($xRow->fs_min_otr),
					'fs_max_otr' => trim($xRow->fs_max_otr),
					'fs_biaya_fidusia' => trim($xRow->fs_biaya_fidusia)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridasuransi() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kode = $this->input->post('fs_kode_asuransi');
		$wilayah = $this->input->post('fs_wilayah_asuransi');
		$jenis = $this->input->post('fs_jenis_kendaraan');
		$komersial = $this->input->post('fs_komersial');

		$this->db->trans_start();
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->listAsuransiAll($kode, $wilayah, $jenis, $komersial);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterBiaya->listAsuransi($kode, $wilayah, $jenis, $komersial, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_asuransi' => trim($xRow->fs_kode_asuransi),
					'fs_wilayah_asuransi' => trim($xRow->fs_wilayah_asuransi),
					'fs_jenis_kendaraan' => trim($xRow->fs_jenis_kendaraan),
					'fs_komersial' => trim($xRow->fs_komersial),
					'fs_min_otr' => trim($xRow->fs_min_otr),
					'fs_max_otr' => trim($xRow->fs_max_otr),
					'fs_persentase_premi' => trim($xRow->fs_persentase_premi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridperluasan() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kode = trim($this->input->post('fs_kode_asuransi'));
		$wilayah = trim($this->input->post('fs_wilayah_asuransi'));
		$perluasan = trim($this->input->post('fs_perluasan'));

		$this->db->trans_start();
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->listPerluasanAll($kode, $wilayah, $perluasan);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterBiaya->listPerluasan($kode, $wilayah, $perluasan, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_asuransi' => trim($xRow->fs_kode_asuransi),
					'fs_wilayah_asuransi' => trim($xRow->fs_wilayah_asuransi),
					'fs_perluasan' => trim($xRow->fs_perluasan),
					'fs_rate_kontribusi' => trim($xRow->fs_rate_kontribusi)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridtjh() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$jenis = $this->input->post('fs_jenis_kendaraan');

		$this->db->trans_start();
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->listTjhAll($jenis);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MMasterBiaya->listTjh($jenis, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_jenis_kendaraan' => trim($xRow->fs_jenis_kendaraan),
					'fs_min_otr' => trim($xRow->fs_min_otr),
					'fs_max_otr' => trim($xRow->fs_max_otr),
					'fs_rate_tjh' => trim($xRow->fs_rate_tjh)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function ceksaveadmin() {
		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');
		$lama = $this->input->post('fd_lama_angsuran');

		if (!empty($cabang) && !empty($jenis) && !empty($pola) && !empty($lama)) {
			$this->load->model('MMasterBiaya');
			$sSQL = $this->MMasterBiaya->checkBiayaAdmin($cabang, $jenis, $pola, $lama);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Admin sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Admin belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Gagal, Biaya Admin tidak diketahui...'
			);
			echo json_encode($hasil);
		}
	}

	public function saveadmin() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');
		$lama = $this->input->post('fd_lama_angsuran');
		$biaya = $this->input->post('fs_biaya_admin');

		$update = false;
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->checkBiayaAdmin($cabang, $jenis, $pola, $lama);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_jenis_piutang' => trim($jenis),
			'fs_pola_transaksi' => trim($pola),
			'fd_lama_angsuran' => trim($lama),
			'fs_biaya_admin' => trim($biaya)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_biaya_admin', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Biaya Admin, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_jenis_piutang = '".trim($jenis)."' AND fs_pola_transaksi = '".trim($pola)."' AND fd_lama_angsuran = '".trim($lama)."'";
			$this->db->where($where);
			$this->db->update('tm_biaya_admin', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Biaya Admin, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

	public function ceksavefidusia() {
		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');
		$minotr = $this->input->post('fs_min_otr');
		$maxotr = $this->input->post('fs_max_otr');

		if (!empty($cabang) && !empty($jenis) && !empty($pola) && !empty($minotr) && !empty($maxotr)) {
			$this->load->model('MMasterBiaya');
			$sSQL = $this->MMasterBiaya->checkBiayaFidusia($cabang, $jenis, $pola, $minotr, $maxotr);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Fidusia sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Fidusia belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Gagal, Biaya Fidusia tidak diketahui...'
			);
			echo json_encode($hasil);
		}
	}

	public function savefidusia() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('fs_kode_cabang');
		$jenis = $this->input->post('fs_jenis_piutang');
		$pola = $this->input->post('fs_pola_transaksi');
		$minotr = $this->input->post('fs_min_otr');
		$maxotr = $this->input->post('fs_max_otr');
		$biaya = $this->input->post('fs_biaya_fidusia');

		$update = false;
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->checkBiayaFidusia($cabang, $jenis, $pola, $minotr, $maxotr);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_cabang' => trim($cabang),
			'fs_jenis_piutang' => trim($jenis),
			'fs_pola_transaksi' => trim($pola),
			'fs_min_otr' => trim($minotr),
			'fs_max_otr' => trim($maxotr),
			'fs_biaya_fidusia' => trim($biaya)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_biaya_fidusia', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Biaya Fidusia, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_jenis_piutang = '".trim($jenis)."' AND fs_pola_transaksi = '".trim($pola)."' AND fs_min_otr = '".trim($minotr)."' AND fs_max_otr = '".trim($maxotr)."'";
			$this->db->where($where);
			$this->db->update('tm_biaya_fidusia', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Biaya Fidusia, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

	public function ceksaveasuransi() {
		$kode = $this->input->post('fs_kode_asuransi');
		$wilayah = $this->input->post('fs_wilayah_asuransi');
		$jenis = $this->input->post('fs_jenis_kendaraan');
		$komersial = $this->input->post('fs_komersial');
		$minotr = $this->input->post('fs_min_otr');
		$maxotr = $this->input->post('fs_max_otr');

		if (!empty($kode) && !empty($wilayah) && !empty($jenis) && !empty($komersial) && !empty($minotr) && !empty($maxotr)) {
			$this->load->model('MMasterBiaya');
			$sSQL = $this->MMasterBiaya->checkBiayaAsuransi($kode, $wilayah, $jenis, $komersial, $minotr, $maxotr);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Asuransi sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Asuransi belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Gagal, Biaya Asuransi tidak diketahui...'
			);
			echo json_encode($hasil);
		}
	}

	public function saveasuransi() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$kode = $this->input->post('fs_kode_asuransi');
		$wilayah = $this->input->post('fs_wilayah_asuransi');
		$jenis = $this->input->post('fs_jenis_kendaraan');
		$komersial = $this->input->post('fs_komersial');
		$minotr = $this->input->post('fs_min_otr');
		$maxotr = $this->input->post('fs_max_otr');
		$premi = $this->input->post('fs_persentase_premi');

		$update = false;
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->checkBiayaAsuransi($kode, $wilayah, $jenis, $komersial, $minotr, $maxotr);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_asuransi' => trim($kode),
			'fs_wilayah_asuransi' => trim($wilayah),
			'fs_jenis_kendaraan' => trim($jenis),
			'fs_komersial' => trim($komersial),
			'fs_min_otr' => trim($minotr),
			'fs_max_otr' => trim($maxotr),
			'fs_persentase_premi' => trim($premi)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_biaya_asuransi', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Biaya Asuransi, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_asuransi = '".trim($kode)."' AND fs_wilayah_asuransi = '".trim($wilayah)."' AND fs_jenis_kendaraan = '".trim($jenis)."' AND fs_komersial = '".trim($komersial)."' AND fs_min_otr = '".trim($minotr)."' AND fs_max_otr = '".trim($maxotr)."'";
			$this->db->where($where);
			$this->db->update('tm_biaya_asuransi', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Biaya Asuransi, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

	public function ceksaveperluasan() {
		$kode = trim($this->input->post('fs_kode_asuransi'));
		$wilayah = trim($this->input->post('fs_wilayah_asuransi'));
		$perluasan = trim($this->input->post('fs_perluasan'));

		if (!empty($kode) && !empty($wilayah) && !empty($perluasan)) {
			$this->load->model('MMasterBiaya');
			$sSQL = $this->MMasterBiaya->checkBiayaPerluasan($kode, $wilayah, $perluasan);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Perluasan sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya Perluasan belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Gagal, Biaya Perluasan tidak diketahui...'
			);
			echo json_encode($hasil);
		}
	}

	public function saveperluasan() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$kode = trim($this->input->post('fs_kode_asuransi'));
		$wilayah = trim($this->input->post('fs_wilayah_asuransi'));
		$perluasan = trim($this->input->post('fs_perluasan'));
		$rate = trim($this->input->post('fs_rate_kontribusi'));

		$update = false;
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->checkBiayaPerluasan($kode, $wilayah, $perluasan);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_kode_asuransi' => trim($kode),
			'fs_wilayah_asuransi' => trim($wilayah),
			'fs_perluasan' => trim($perluasan),
			'fs_rate_kontribusi' => trim($rate)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_biaya_perluasan', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Biaya Perluasan, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_asuransi = '".trim($kode)."' AND fs_wilayah_asuransi = '".trim($wilayah)."' AND fs_perluasan = '".trim($perluasan)."'";
			$this->db->where($where);
			$this->db->update('tm_biaya_perluasan', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Biaya Perluasan, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}

	public function ceksavetjh() {
		$jenis = $this->input->post('fs_jenis_kendaraan');
		$minotr = $this->input->post('fs_min_otr');
		$maxotr = $this->input->post('fs_max_otr');

		if (!empty($jenis) && !empty($minotr) && !empty($maxotr)) {
			$this->load->model('MMasterBiaya');
			$sSQL = $this->MMasterBiaya->checkBiayaTJH($jenis, $minotr, $maxotr);
			if ($sSQL->num_rows() > 0) {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya TJH sudah ada, apakah Anda ingin meng-update?'
				);
				echo json_encode($hasil);
			} else {
				$hasil = array(
					'sukses' => true,
					'hasil' => 'Biaya TJH belum ada, apakah Anda ingin menambah baru?'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Gagal, Biaya TJH tidak diketahui...'
			);
			echo json_encode($hasil);
		}
	}

	public function savetjh() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$jenis = $this->input->post('fs_jenis_kendaraan');
		$minotr = $this->input->post('fs_min_otr');
		$maxotr = $this->input->post('fs_max_otr');
		$rattjh = $this->input->post('fs_rate_tjh');

		$update = false;
		$this->load->model('MMasterBiaya');
		$sSQL = $this->MMasterBiaya->checkBiayaTJH($jenis, $minotr, $maxotr);

		if ($sSQL->num_rows() > 0) {
			$update = true;
		}

		$dt = array(
			'fs_jenis_kendaraan' => trim($jenis),
			'fs_min_otr' => trim($minotr),
			'fs_max_otr' => trim($maxotr),
			'fs_rate_tjh' => trim($rattjh)
		);

		if ($update == false) {
			$dt1 = array(
				'fs_user_buat' => trim($user),
				'fd_tanggal_buat' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt1);
			$this->db->insert('tm_biaya_tjh', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Biaya TJH, Sukses!!'
			);
			echo json_encode($hasil);
		} else {
			$dt2 = array(
				'fs_user_edit' => trim($user),
				'fd_tanggal_edit' => date('Y-m-d H:i:s')
			);
			$data = array_merge($dt, $dt2);
			$where = "fs_jenis_kendaraan = '".trim($jenis)."' AND fs_min_otr = '".trim($minotr)."' AND fs_max_otr = '".trim($maxotr)."'";
			$this->db->where($where);
			$this->db->update('tm_biaya_tjh', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Update Biaya TJH, Sukses!!'
			);
			echo json_encode($hasil);
		}
	}
}