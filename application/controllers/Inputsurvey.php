<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Inputsurvey extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		$this->load->view('vinputsurvey');
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

	public function gridretail() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MInputSurvey');
		$sSQL = $this->MInputSurvey->listRetailAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MInputSurvey->listRetail($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridfleet() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MInputSurvey');
		$sSQL = $this->MInputSurvey->listRetailAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MInputSurvey->listRetail($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridkonsumen() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MInputSurvey');
		$sSQL = $this->MInputSurvey->listKonsumenAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MInputSurvey->listKonsumen($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridsurveyor() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MInputSurvey');
		$sSQL = $this->MInputSurvey->listSurveyorAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MInputSurvey->listSurveyor($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_kode_surveyor' => trim($xRow->fs_kode_surveyor),
					'fs_kode_surveyor_lama' => trim($xRow->fs_kode_surveyor_lama),
					'fs_nama_surveyor' => trim($xRow->fs_nama_surveyor)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function datapendukung() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
	}

	public function apkpendukung() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
	}

	public function gridhasil() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MInputSurvey');
		$sSQL = $this->MInputSurvey->listHasilSurveyAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MInputSurvey->listHasilSurvey($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fd_tanggal_survey' => trim($xRow->fd_tanggal_survey),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_petugas_survey' => trim($xRow->fs_petugas_survey),
					'fn_lama_survey' => trim($xRow->fn_lama_survey),
					'fs_kondisi_lingkungan' => trim($xRow->fs_kondisi_lingkungan),
					'fn_jumlah_kendaraan' => trim($xRow->fn_jumlah_kendaraan),
					'fs_garasi' => trim($xRow->fs_garasi),
					'fs_kondisi_kantor' => trim($xRow->fs_kondisi_kantor),
					'fs_catatan_tempat_tinggal' => trim($xRow->fs_catatan_tempat_tinggal),
					'fs_catatan_lingkungan' => trim($xRow->fs_catatan_lingkungan),
					'fs_catatan_tempat_usaha' => trim($xRow->fs_catatan_tempat_usaha)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function uploadfile() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));

		$cabang = $this->input->post('txtKdCabang');
		$noapk = $this->input->post('txtNoApk');
		$nobatch = $this->input->post('txtNoBatch');
		$kode = $this->input->post('cboKodeDoc');
		$jenis = $this->input->post('txtJnsPembiayaan');

		if(!empty($_FILES['fileDokumen']['name'])) {
			$config['upload_path'] = './uploads/';
			$config['max_size'] = 1000;
			$config['allowed_types'] = 'pdf';
			$config['file_name'] = $_FILES['fileDokumen']['name'];
			$config['encrypt_name'] = TRUE;
			$config['file_ext_tolower'] = TRUE;
			$config['overwrite'] = TRUE;
			$this->load->library('upload', $config);
			$this->upload->initialize($config);

			if ($this->upload->do_upload('fileDokumen')) {
				$file = $this->upload->data();
				$filename = $file['file_name'];

				$this->load->model('MInputSurvey');
				if(!empty($cabang) && !empty($noapk)) {
					$sSQL = $this->MInputSurvey->checkDataPendukung($cabang, $noapk, $kode);
					if ($sSQL->num_rows() > 0) {
						$response = array(
							'success' => false,
							'msg' => 'Dokumen yang sama sudah di upload...'
						);
						echo json_encode($response);
						unlink('uploads/'. $filename);
					} else {
						$data = array(
							'fs_kode_cabang' => trim($cabang),
							'fn_no_apk' => trim($noapk),
							'fs_jenis_pembiayaan' => trim($jenis),
							'fs_kode_dokumen' => trim($kode),
							'fs_dokumen_upload' => trim($filename),
							'fs_user_buat' => trim($user),
							'fd_tanggal_buat' => date('Y-m-d H:i:s')
						);
						$this->db->insert('tx_apk_data_pendukung', $data);

						$response = array(
							'success' => true, 
							'data' => array('name' => $filename),
							'msg' => 'File Uploaded successfully...'
						);
						echo json_encode($response);
					}
				} 
				else if (!empty($cabang) && !empty($nobatch)) {
					$AllAPK = $this->MInputSurvey->listDetail($nobatch);
					foreach ($AllAPK->result() as $row) {
						$sSQL = $this->MInputSurvey->checkDataPendukung($cabang, $row->fn_no_apk, $kode);
						if ($sSQL->num_rows() > 0) {
							$response = array(
								'success' => false,
								'msg' => 'Dokumen yang sama sudah di upload...'
							);
							echo json_encode($response);
							unlink('uploads/'. $filename);
						} else {
							$data = array(
								'fs_kode_cabang' => trim($cabang),
								'fn_no_apk' => trim($row->fn_no_apk),
								'fs_jenis_pembiayaan' => trim($jenis),
								'fs_kode_dokumen' => trim($kode),
								'fs_dokumen_upload' => trim($filename),
								'fs_user_buat' => trim($user),
								'fd_tanggal_buat' => date('Y-m-d H:i:s')
							);

							$this->db->insert('tx_apk_data_pendukung', $data);
						}
					}

					$response = array(
						'success' => true, 
						'data' => array('name' => $filename),
						'msg' => 'File Uploaded successfully...'
					);
					echo json_encode($response);
				}
				else {
					$response = array(
						'success' => false,
						'msg' => 'APK belum dipilih, Silakan pilih di Daftar APK'
						);
					echo json_encode($response);
				}
			}
		} else {
			$response = array(
				'success' => false,
				'msg' => $this->upload->display_errors()
			);
			echo json_encode($response);
		}
	}

	public function previewfile($cabang, $file) {

	}

	public function removefile() {
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$file = $this->input->post('fs_dokumen_upload');
		if (!empty($file)) {
			$where = "fs_kode_cabang = '".trim($cabang)."' AND fs_dokumen_upload = '".trim($file)."'";
			$this->db->where($where);
			$this->db->delete('tx_apk_data_pendukung');

			unlink('uploads/'. $file);
			$hasil = array(
				'sukses' => true,
				'hasil' => 'File data pendukung sudah dihapus'
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Hapus file, gagal....'
			);
			echo json_encode($hasil);
		}
	}

	public function getgrade() {

	}

	public function getscore() {

	}

	public function ceksave() {
		$noapk = $this->input->post('fn_no_apk');
		$nobatch = $this->input->post('fn_no_batch');

		if (!empty($noapk) || !empty($nobatch)) {
			$hasil = array(
				'sukses' => true,
				'hasil' => 'lanjut'
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Data, Gagal...'
			);
			echo json_encode($hasil);
		}
	}

	public function save() {
		$noapk = $this->input->post('fn_no_apk');
		$nobatch = $this->input->post('fn_no_batch');

		$tanggal = $this->input->post('fd_tanggal_survey');
		$petugas = $this->input->post('fs_petugas_survey');
		$lama = $this->input->post('fn_lama_survey');
		$kondisi = $this->input->post('fs_kondisi_lingkungan');
		$jumlah = $this->input->post('fn_jumlah_kendaraan');
		$garasi = $this->input->post('fs_garasi');
		$kantor = $this->input->post('fs_kondisi_kantor');
		$cat_tinggal = $this->input->post('fs_catatan_tempat_tinggal');
		$cat_lingkungan = $this->input->post('fs_catatan_lingkungan');
		$cat_usaha = $this->input->post('fs_catatan_tempat_usaha');

		$data = array(
			'fd_tanggal_survey' => trim($tanggal),
			'fs_petugas_survey' => trim($petugas),
			'fn_lama_survey' => trim($lama),
			'fs_kondisi_lingkungan' => trim($kondisi),
			'fn_jumlah_kendaraan' => trim($jumlah),
			'fs_garasi' => trim($garasi),
			'fs_kondisi_kantor' => trim($kantor),
			'fs_catatan_tempat_tinggal' => trim($cat_tinggal),
			'fs_catatan_lingkungan' => trim($cat_lingkungan),
			'fs_catatan_tempat_usaha' => trim($cat_usaha),
			'fs_flag_survey' => '1'
		);

		if (!empty($noapk)) {
			$where = "fs_kode_cabang = '".trim()."' AND fn_no_apk ='".trim()."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Survey, Sukses!!!'
			);
			echo json_encode($hasil);
		} 
		else if (!empty($nobatch)) {
			$data = array_merge($dt, $dt2);
			$where = "fs_kode_cabang = '".trim()."' AND fn_no_batch ='".trim()."'";
			$this->db->where($where);
			$this->db->update('tx_apk', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data Survey, Sukses!!!'
			);
			echo json_encode($hasil);
		}
		else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Simpan Data Survey, Gagal...'
			);
			echo json_encode($hasil);
		}
	}

}