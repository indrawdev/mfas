<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	public function index() {
		$this->load->view('vlogin');
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
		if ($sSQL->num_rows() > 0) {
			foreach ($sSQL->result() as $xRow) {
				$xArr[] = array(
					'fs_kode_cabang' => trim($xRow->fs_kode_cabang),
					'fs_nama_cabang' => trim($xRow->fs_nama_cabang),
					'fs_alamat_cabang' => trim($xRow->fs_alamat_cabang),
					'fs_kota_cabang' => trim($xRow->fs_kota_cabang)
				);
			}
		}
		echo '({"total":"'.$xTotal.'","hasil":'.json_encode($xArr).'})';
	}

	public function buat_captcha() {
		$this->load->helper('captcha');
		$this->load->database();
		
		$vals = array(
			'expiration' => 3600,
			'word_length'   => 3,
			'font_path' => './assets/css/font/comic.ttf',
			'img_height' => 70,
			'img_path' => './temp/captcha/',
			'img_url' => './temp/captcha/',
			'img_width' => 270,
			'pool' => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		);

		$cap = create_captcha($vals);
		
		if ($cap) {
			$data = array(
				'captcha_time' => round($cap['time']),
				'ip_address' => $this->input->ip_address(),
				'word' => $cap['word']
			);
			
			$this->db->insert('captcha', $data);
			$this->session->set_userdata('vcpt', round(trim($cap['time'])));
			$pathfile = base_url('/temp/captcha/'.trim($cap['time']).'.jpg');
			$hasil = array(
							'src' => $pathfile
						);
			echo json_encode($hasil);
		}
	}

	public function ceklogin() {
		$this->load->library('form_validation');
		$this->form_validation->set_rules('txtKdCabang', 'Cabang', 'trim|required');
		$this->form_validation->set_rules('txtUserName', 'Username', 'trim|required');
		$this->form_validation->set_rules('txtUserPass', 'Password', 'trim|required');
		$this->form_validation->set_rules('txtCaptcha', 'CAPTCHA', 'trim|required');
		
		if ($this->form_validation->run() == FALSE) {
			echo "Username atau Password Salah!....";
		} else {
			$this->load->database();
			$word = trim($this->input->post('txtCaptcha'));
			
			$exp = time() - 3600;
			$where = "captcha_time < '".trim($exp)."'";
			$this->db->where($where);
			$this->db->delete('captcha');
			
			$this->load->model('MLogin');
			$sSQL = $this->MLogin->checkCaptcha($word);
			$sSQL = $sSQL->row();
			$jml = $sSQL->fn_jml;

			if ($jml > 0) {
				$xkdcabang = trim($this->input->post('txtKdCabang'));
				$xnmcabang = trim($this->input->post('cboCabang'));
				$xusername = str_replace("'",'"',trim($this->input->post('txtUserName')));
				$xuserpass = str_replace("'",'"',trim($this->input->post('txtUserPass')));
				
				$username = strtoupper($xusername);
				$userpass = strtoupper($xuserpass);

				// ENCYRPT MD5
				$xpass = md5($userpass.$username);
				// CHECK USER & PASSWORD
				$this->load->model('MLogin');
				$sSQL = $this->MLogin->validUserPass($username, $xpass);
				if (!empty($sSQL)) {

					$xSQL = $this->MLogin->validAkses($xkdcabang, $username);
					if(!empty($xSQL)) {
						// SET SESSION
						$session = array(
									'login'	=> TRUE,
									'username' => $this->encryption->encrypt($sSQL->fs_username),
									'password' => $this->encryption->encrypt($sSQL->fs_password),
									'leveluser' => $this->encryption->encrypt($sSQL->fs_level_user),
									'kodecabang' => $this->encryption->encrypt($xkdcabang),
									'namacabang' => $this->encryption->encrypt($xnmcabang)
								);
						$this->session->set_userdata($session); 
								
						// UPDATE LAST LOGIN
						$data = array(
								'fs_ip_address' => $this->input->ip_address(),
								'fd_last_login' => date('Y-m-d H:i:s'),
								'fs_user_edit' => trim($username),
								'fd_tanggal_edit' => date('Y-m-d H:i:s')
							);
						$where = "fs_username = '".trim($username)."'";
						$this->db->where($where);
						$this->db->update('tm_user', $data);

						// START LOGGING
						$this->load->model('MLog');
						$this->MLog->logger('LOGIN', $username, 'MASUK KE SISTEM MFAS');
						// END LOGGING

						echo "{success:true}";
					} else {
						echo "Akses Cabang Tidak Ada...";
					}
				}
				else {
					echo "User Name or Password Incorrect...";
				}
			}
			else {
				echo "Captcha Incorrect....";
			}
		}
	}

	public function logout() {
		$user = $this->encryption->decrypt($this->session->userdata('username'));
		
		// START LOGGING
		$this->load->model('MLog');
		$this->MLog->logger('LOGOUT', $user, 'KELUAR DARI SISTEM MFAS');
		// END LOGGING

		$this->session->sess_destroy();
		echo "{success:true}";
	}
	
}
