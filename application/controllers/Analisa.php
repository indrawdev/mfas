<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Analisa extends CI_Controller {
	
	public function __construct() {
		parent::__construct();
		if ($this->session->userdata('login') <> TRUE) {
			redirect('login');
		}
	}

	public function index() {
		if ($this->session->userdata('kdcabang') <> '00') {
			$this->load->view('vanalisapusat');
		} else {
			$this->load->view('vanalisapusat');
		}
	}

	public function cb_keputusan() {
		$sCari = trim($this->input->post('fs_cari'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->getReferensi($sCari);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kd_strx' => trim($xRow->fs_nilai1_referensi),
					'fs_nm_strx' => trim($xRow->fs_nama_referensi)
				);
			}
		}
		echo json_encode($xArr);
	}

	public function cb_batal() {
		$arr = array(
				2 => array('Y','YA'),
				4 => array('N','TIDAK')
			);
		$out = array_values($arr);
		echo json_encode($out);
	}


	// GRID CABANG
	public function gridcabangretail() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangRetailAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangRetail($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabangfleet() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangFleetAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangFleet($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabangretailbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangRetailBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangRetailBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridcabangfleetbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listCabangFleetBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listCabangFleetBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->v),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// GRID PUSAT
	public function gridpusatretail() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatRetailAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatRetail($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score),
					'fs_catatan_analisa_cabang' => trim($xRow->fs_catatan_analisa_cabang)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpusatfleet() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatFleetAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatFleet($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					'fs_status_reject' => trim($xRow->fs_status_reject),
					'fs_status_family' => trim($xRow->fs_status_family),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score),
					'fs_catatan_analisa_cabang' => trim($xRow->fs_catatan_analisa_cabang)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpusatretailbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatRetailBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatRetailBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function gridpusatfleetbatal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listPusatFleetBatalAll($sCari);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listPusatFleetBatal($sCari, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fs_pjj' => trim($xRow->fs_pjj),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fs_jenis_pembiayaan' => trim($xRow->fs_jenis_pembiayaan),
					'fs_grade' => trim($xRow->fs_grade),
					'fs_score' => trim($xRow->fs_score)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function checkinternal() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kdcabang = $this->input->post('fs_kode_cabang');
		$noapk = $this->input->post('fn_no_apk');

		$this->load->model('MAnalisa');
		$AllAPK = $this->MAnalisa->node($noapk, $kdcabang);
		
		foreach ($AllAPK->result() as $row) {
			$this->db->trans_start();
			$sSQL = $this->MAnalisa->checkInternalAll($row->fs_ktp_konsumen, $sCari);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->MAnalisa->checkInternal($row->fs_ktp_konsumen, $sCari, $nStart, $nLimit);
			$this->db->trans_complete();
			$xArr = array();
			
			if ($sSQL->num_rows() > 0) {
				foreach ($sSQL->result() as $xRow) {
					$xArr[] = array(
						'fn_no_apk' => trim($xRow->fn_no_apk),
						'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
						'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
						'fs_status_blacklist' => trim($xRow->fs_status_blacklist),
					);
				}
			}
		}

		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function checkreject() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kdcabang = $this->input->post('fs_kode_cabang');
		$noapk = $this->input->post('fn_no_apk');

		$this->load->model('MAnalisa');
		$AllAPK = $this->MAnalisa->node($noapk, $kdcabang);

		foreach ($AllAPK->result() as $row) {
			$this->db->trans_start();
			$sSQL = $this->MAnalisa->checkRejectAll($row->fs_ktp_konsumen, $sCari);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->MAnalisa->checkReject($row->fs_ktp_konsumen, $sCari, $nStart, $nLimit);
			$this->db->trans_complete();
			$xArr = array();

			if ($sSQL->num_rows() > 0) {
				foreach ($sSQL->result() as $xRow) {
					$xArr[] = array(
						'fn_no_apk' => trim($xRow->fn_no_apk),
						'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
						'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
						'fs_status_blacklist' => trim($xRow->fs_status_blacklist)
					);
				}
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function checkfamily() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$kdcabang = $this->input->post('fs_kode_cabang');
		$noapk = $this->input->post('fn_no_apk');

		$this->load->model('MAnalisa');
		$AllAPK = $this->MAnalisa->node($noapk, $kdcabang);

		foreach ($AllAPK->result() as $row) {
			$this->db->trans_start();
			$sSQL = $this->MAnalisa->checkFamilyAll($row->fs_ktp_konsumen, $sCari);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->MAnalisa->checkFamily($row->fs_ktp_konsumen, $sCari, $nStart, $nLimit);
			$this->db->trans_complete();
			$xArr = array();

			if ($sSQL->num_rows() > 0) {
				foreach ($sSQL->result() as $xRow) {
					$xArr[] = array(
						'fn_no_apk' => trim($xRow->fn_no_apk),
						'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
						'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
						'fs_status_family' => trim($xRow->fs_status_family)
					);
				}
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function detailchecking() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));
	}

	public function preview() {
		$jenis = $this->input->post('fs_jenis_pembiayaan');
		if ($jenis <> 'B') {
			$hasil = array(
				'sukses' => true,
				'url' => 'report/previewperorangan/'
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => true,
				'url' => 'report/previewbadanusaha/'
			);
			echo json_encode($hasil);
		}
	}

	public function predatapendukung() {
		$sCari = trim($this->input->post('fs_cari'));
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$sKdCab = $this->input->post('fs_kode_cabang');
		$nApk = $this->input->post('fn_no_apk');
		$nBatch = $this->input->post('fn_no_batch');

		if (!empty($nApk)) {
			$this->db->trans_start();
			$this->load->model('MAnalisa');
			$sSQL = $this->MAnalisa->dataPendukungAll($sKdCab, $nApk, $sCari);
			$xTotal = $sSQL->num_rows();
			$sSQL = $this->MAnalisa->dataPendukung($sKdCab, $nApk, $sCari, $nStart, $nLimit);
			$this->db->trans_complete();

			$xArr = array();
			if ($sSQL->num_rows() > 0) {
				foreach ($sSQL->result() as $xRow) {
					$xArr[] = array(
						'fs_kode_dokumen' => trim($xRow->fs_kode_dokumen),
						'fs_nama_dokumen' => trim($xRow->fs_nama_dokumen),
						'fs_dokumen_upload' => trim($xRow->fs_dokumen_upload),
						'fs_kode_dokumen' => trim($xRow->fs_kode_dokumen)
					);
				}
			}
		} else {
			$AllAPK = $this->MAnalisa->detail($sKdCab, $nBatch);
			foreach ($AllAPK->result() as $row) {
				$this->db->trans_start();
				$this->load->model('MAnalisa');
				$sSQL = $this->MAnalisa->dataPendukungAll($sKdCab, $row->fn_no_apk, $sCari);
				$xTotal = $sSQL->num_rows();
				$sSQL = $this->MAnalisa->dataPendukung($sKdCab, $row->fn_no_apk, $sCari, $nStart, $nLimit);
				$this->db->trans_complete();

				$xArr = array();
				if ($sSQL->num_rows() > 0) {
					foreach ($sSQL->result() as $xRow) {
						$xArr[] = array(
							'fs_kode_dokumen' => trim($xRow->fs_kode_dokumen),
							'fs_nama_dokumen' => trim($xRow->fs_nama_dokumen),
							'fs_dokumen_upload' => trim($xRow->fs_dokumen_upload),
							'fs_kode_dokumen' => trim($xRow->fs_kode_dokumen)
						);
					}
				}
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function detailgrid() {
		$nStart = trim($this->input->post('start'));
		$nLimit = trim($this->input->post('limit'));

		$sKdCab = $this->input->post('fs_kode_cabang');
		$nBatch = trim($this->input->post('fn_no_batch'));

		$this->db->trans_start();
		$this->load->model('MAnalisa');
		$sSQL = $this->MAnalisa->listdetailAll($sKdCab, $nBatch);
		$xTotal = $sSQL->num_rows();
		$sSQL = $this->MAnalisa->listdetail($sKdCab, $nBatch, $nStart, $nLimit);
		$this->db->trans_complete();

		$xArr = array();
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fn_no_apk' => trim($xRow->fn_no_apk),
					'fn_no_batch' => trim($xRow->fn_no_batch),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_nama_konsumen' => trim($xRow->fs_nama_konsumen),
					'fd_tgl_apk' => trim($xRow->fd_tgl_apk),
					'fs_alamat_konsumen' => trim($xRow->fs_alamat_konsumen),
					'fs_kelurahan_konsumen' => trim($xRow->fs_kelurahan_konsumen),
					'fs_kecamatan_konsumen' => trim($xRow->fs_kecamatan_konsumen),
					'fs_kota_konsumen' => trim($xRow->fs_kota_konsumen),
					'fs_kodepos_konsumen' => trim($xRow->fs_kodepos_konsumen),
					'fs_ktp_konsumen' => trim($xRow->fs_ktp_konsumen),
					'fs_masa_ktp_konsumen' => trim($xRow->fs_masa_ktp_konsumen),
					'fs_telepon_konsumen' => trim($xRow->fs_telepon_konsumen),
					'fs_handphone_konsumen' => trim($xRow->fs_handphone_konsumen),
					'fb_cek' => true
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	// FUNCTION CABANG
	public function ceksavecabang() {
		$nApk = $this->input->post('fn_no_apk');
		$nBatch = $this->input->post('fn_no_batch');
		$arrApk = explode('|', $this->input->post('arr_no_apk'));

		if (!empty($nApk) || !empty($nBatch) || !empty($arrApk)) {
			$hasil = array(
				'sukses' => true,
				'hasil' => 'lanjut'
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan!!'
			);
			echo json_encode($hasil);
		}
	}

	public function savecabang() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->encryption->decrypt($this->session->userdata('kodecabang'));

		$noapk = $this->input->post('fn_no_apk');
		$nobatch = $this->input->post('fn_no_batch');
		$arrnoapk = explode('|', $this->input->post('arr_no_apk'));

		$keputusan = $this->input->post('fs_keputusan_kredit');
		$grade = $this->input->post('fs_grade');

		$cat_analisa = $this->input->post('fs_catatan_analisa');

		if ($keputusan == 'N') {
			// jika keputusan ditolak. langsung diputus dicabang tanpa ke pusat
			$data = array(
				'fs_keputusan_kredit' => trim($keputusan),
				'fs_catatan_analisa' => trim($cat_analisa),
				'fs_flag_keputusan' => 1,
				// duplicate
				'fs_keputusan_kredit_pusat' => trim($keputusan),
				'fs_catatan_analisa_pusat' => trim($cat_analisa),
				'fs_flag_keputusan_pusat' => 1,
				'fs_user_buat_keputusan' => trim($user),
				'fd_tanggal_buat_keputusan' => date('Y-m-d H:i:s')
			);
		} else {
			if ($grade == 'C' || $grade == 'D') {
				$data = array(
					'fs_keputusan_kredit' => '',
					'fs_catatan_analisa' => trim($cat_analisa),
					'fs_flag_keputusan' => 1,
					'fs_user_buat_keputusan' => trim($user),,
					'fd_tanggal_buat_keputusan' => date('Y-m-d H:i:s')
				);
			} else {
				$data = array(
					'fs_keputusan_kredit' => trim($keputusan),
					'fs_catatan_analisa' => trim($cat_analisa),
					'fs_flag_keputusan' => 1,
					'fs_user_buat_keputusan' => trim($user),
					'fd_tanggal_buat_keputusan' => date('Y-m-d H:i:s')
				);
			}
		}

		if (!empty($noapk) && (empty($nobatch) || empty($arrnoapk))) {
			$where1 = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			$this->db->where($where1);
			$this->db->update('tx_apk', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data, Sukses!!'
			);
			echo json_encode($hasil);
		}
		else if (!empty($arrnoapk) && !empty($nobatch) && !empty($noapk)) {
			$jml = count($arrnoapk) - 1;
			if ($jml > 0) {
				for ($i=1; $i<=$jml; $i++) {
					$where2 = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($arrnoapk[$i])."'";
					$this->db->where($where2);
					$this->db->update('tx_apk', $data);
				}

				$hasil = array(
					'sukses' => true,
					'hasil' => 'Simpan Data, Sukses!!'
				);
				echo json_encode($hasil);
			} else {
				$where3 = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_batch = '".trim($nobatch)."'";
				$this->db->where($where3);
				$this->db->update('tx_apk', $data);

				$hasil = array(
					'sukses' => true,
					'hasil' => 'Simpan Data, Sukses!!'
				);
				echo json_encode($hasil);
			}
		}
		else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan!!'
			);
			echo json_encode($hasil);
		}
	}

	public function ceksavebatalcabang() {

	}

	public function savebatalcabang() {
		
	}

	// FUNCTION PUSAT
	public function ceksavepusat() {
		$nApk = $this->input->post('fn_no_apk');
		$nBatch = $this->input->post('fn_no_batch');

		if (!empty($nApk) || !empty($nBatch)) {
			$hasil = array(
				'sukses' => true,
				'hasil' => 'lanjut'
			);
			echo json_encode($hasil);
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan!!'
			);
			echo json_encode($hasil);
		}
	}

	public function savepusat() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		$cabang = $this->input->post('fs_kode_cabang');

		$noapk = $this->input->post('fn_no_apk');
		$nobatch = $this->input->post('fn_no_batch');
		$arrnoapk = explode('|', $this->input->post('arr_no_apk'));

		$keputusan = $this->input->post('fs_keputusan_kredit');
		$cat_analisa = $this->input->post('fs_catatan_analisa');

		$data = array(
			'fs_keputusan_kredit_pusat' => trim($keputusan),
			'fs_catatan_analisa_pusat' => trim($cat_analisa),
			// duplicate
			'fs_keputusan_kredit' => trim($keputusan),
			'fs_flag_keputusan_pusat' => 1,
			'fs_user_buat_keputusan' => trim($user),
			'fd_tanggal_buat_keputusan' => date('Y-m-d H:i:s')
		);

		if (!empty($noapk) && (empty($nobatch) || empty($arrnoapk))) {
			$where1 = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($noapk)."'";
			$this->db->where($where1);
			$this->db->update('tx_apk', $data);

			$hasil = array(
				'sukses' => true,
				'hasil' => 'Simpan Data, Sukses!!'
			);
			echo json_encode($hasil);
		}
		else if (!empty($arrnoapk) && !empty($nobatch) && !empty($noapk))  {
			$jml = count($arrnoapk) - 1;
			if ($jml > 0) {
				for ($i=1; $i<=$jml; $i++) {
					$where2 = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_apk = '".trim($arrnoapk[$i])."'";
					$this->db->where($where2);
					$this->db->update('tx_apk', $data);

					$hasil = array(
						'sukses' => true,
						'hasil' => 'Simpan Data, Sukses!!'
					);
					echo json_encode($hasil);
				}
			} else {
				$where3 = "fs_kode_cabang = '".trim($cabang)."' AND fn_no_batch = '".trim($nobatch)."'";
				$this->db->where($where3);
				$this->db->update('tx_apk', $data);

				$hasil = array(
					'sukses' => true,
					'hasil' => 'Simpan Data, Sukses!!'
				);
				echo json_encode($hasil);
			}
		} else {
			$hasil = array(
				'sukses' => false,
				'hasil' => 'Gagal Simpan!!'
			);
			echo json_encode($hasil);
		}
	}

	public function ceksavebatalpusat() {

	}

	public function savebatalpusat() {

	}
}
