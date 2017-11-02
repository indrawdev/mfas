<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MAnalisa extENDs CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listCabangRetailAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
				a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
				a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (c.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan = '0'
		");


		if (!empty($sCari)) {
			$xSQL = $xSQL.("
			AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangRetail($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleetAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
				a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
				a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'Y' AND a.fn_no_batch IS NOT NULL
			AND a.fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleet($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
				a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
				a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_kode_cabang = a.fs_kode_cabang  
			AND e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'Y' AND a.fn_no_batch IS NOT NULL
			AND a.fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangRetailBatalAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'N' AND (a.fs_grade = 'A' OR a.fs_grade = 'B')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangRetailBatal($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'N' AND (a.fs_grade = 'A' OR a.fs_grade = 'B')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleetBatalAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'Y' AND (a.fs_grade = 'A' OR a.fs_grade = 'B')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleetBatal($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'Y' AND (a.fs_grade = 'A' OR a.fs_grade = 'B')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetailAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
				a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
				a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (c.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
		");

		if(!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetail($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
			a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
			a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
			a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
			a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
			a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND (c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk <= a.fd_tgl_apk)
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'N' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleetAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
				a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
				a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'Y' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND a.fn_no_batch IS NOT NULL
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleet($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk, a.fs_alamat_konsumen,
				a.fs_kelurahan_konsumen, a.fs_kecamatan_konsumen, a.fs_kota_konsumen, a.fs_kodepos_konsumen,
				a.fs_masa_ktp_konsumen, a.fs_telepon_konsumen, a.fs_handphone_konsumen,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_catatan_analisa, a.fs_score,
			CASE 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' ELSE 'MFI BLACKLIST' END as fs_status_blacklist,
			CASE
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				THEN 'TIDAK REJECT' ELSE 'MFI REJECT' END as fs_status_reject,
			CASE 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' ELSE 'PERNAH KREDIT' END as fs_status_family
			FROM tx_apk a
			LEFT JOIN tm_blacklist b 
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN 
				a.fs_npwp_konsumen = b.fs_npwp_konsumen  OR a.fs_siup_perusahaan = b.fs_siup_perusahaan
				ELSE
				a.fs_ktp_konsumen = b.fs_ktp_konsumen 
				OR CONCAT(a.fs_nama_konsumen,a.fd_tanggal_lahir_konsumen) = CONCAT(b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen) 
				OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			END
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND d.fd_tgl_apk < a.fd_tgl_apk
			LEFT JOIN tm_kewenangan e
			ON e.fs_pola_transaksi = a.fs_pola_transaksi
			WHERE a.fs_flag_survey = '1'
			AND a.fs_fleet = 'Y' AND a.fs_flag_keputusan_pusat = '0' AND a.fs_flag_keputusan = '1'
			AND a.fn_no_batch IS NOT NULL
			AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
			AND (a.fn_pokok_pembiayaan_dealer > e.fn_maks_plafon OR e.fs_maks_score != a.fs_score)
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetailBatalAll($sCari) 
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' 
			AND a.fs_flag_keputusan_pusat = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'N' AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetailBatal($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' 
			AND a.fs_flag_keputusan_pusat = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'N' AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleetBatalAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1'
			AND a.fs_flag_keputusan_pusat = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'Y' AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleetBatal($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT 
				a.fs_kode_cabang, a.fn_no_apk, a.fn_no_batch, a.fs_kode_lokasi, a.fs_nomor_dealer,
				a.fs_jenis_piutang, a.fs_pola_transaksi, a.fn_nomor_perjanjian,
				a.fs_nama_konsumen, a.fs_ktp_konsumen, a.fd_tgl_apk,
				a.fs_jenis_pembiayaan, a.fs_grade, a.fs_score
			FROM tx_apk a
			LEFT JOIN tx_apk_batal_keputusan b 
			ON b.fs_kode_cabang = a.fs_kode_cabang AND b.fn_no_apk = a.fn_no_apk
			WHERE a.fs_flag_survey = '1' AND a.fs_flag_keputusan = '1' 
			AND a.fs_flag_keputusan_pusat = '1' AND a.fs_flag_transfer = '0'
			AND a.fs_fleet = 'Y' AND (a.fs_grade = 'C' OR a.fs_grade = 'D')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR a.fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			GROUP BY a.fn_no_batch
			ORDER BY a.fn_no_batch ASC LIMIT ".$nStart.",".$nLimit."
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function node($nKdCab, $nApk)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($nKdCab)."'
			AND fn_no_apk = '".trim($nApk)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function detail($nKdCab, $nBatch)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($nKdCab)."'
			AND fn_no_batch = '".trim($nBatch)."'
			AND fs_fleet = 'Y' AND fn_no_batch IS NOT NULL
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDetailAll($nKdCab, $nBatch)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($nKdCab)."'
			AND fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = '1'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listDetail($nKdCab, $nBatch, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT * 
			FROM tx_apk
			WHERE fs_kode_cabang = '".trim($nKdCab)."'
			AND fn_no_batch = '".trim($nBatch)."'
			AND fs_flag_survey = '1'
		");

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKonsumenAll($sCari)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '1' AND fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listKonsumen($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT *
			FROM tx_apk
			WHERE fs_flag_survey = '1' AND fs_flag_keputusan = '0'
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (fs_nama_konsumen LIKE '%".trim($sCari)."%'
					OR fs_handphone_konsumen LIKE '%".trim($sCari)."%'
					OR fs_telepon_konsumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY fn_no_apk DESC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function dataPendukungAll($nKdCab, $nApk, $sCari)
	{
		$xSQL = ("
			SELECT	*
			FROM tx_apk_data_pendukung a 
			JOIN  tm_data_pendukung b  ON a.fs_kode_dokumen = b.fs_kode_dokumen
			WHERE a.fs_kode_cabang = '".trim($nKdCab)."' AND a.fn_no_apk IN ('".trim($nApk)."')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR b.fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function dataPendukung($nKdCab, $nApk, $sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT	*
			FROM tx_apk_data_pendukung a 
			JOIN  tm_data_pendukung b  ON a.fs_kode_dokumen = b.fs_kode_dokumen
			WHERE a.fs_kode_cabang = '".trim($nKdCab)."' AND a.fn_no_apk IN ('".trim($nApk)."')
		");

		if (!empty($sCari)) {
			$xSQL = $xSQL.("
				AND (a.fs_kode_dokumen LIKE '%".trim($sCari)."%'
					OR b.fs_nama_dokumen LIKE '%".trim($sCari)."%')
			");
		}

		$xSQL = $xSQL.("
			ORDER BY a.fs_kode_dokumen ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkInternalAll($nKtp)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist
			FROM tx_apk a
			LEFT JOIN  tm_blacklist b 
			ON b.fs_ktp_konsumen = a.fs_ktp_konsumen
			OR CONCAT(b.fs_nama_konsumen, b.fd_tanggal_lahir_konsumen) = CONCAT(a.fs_nama_konsumen, a.fd_tanggal_lahir_konsumen)
			OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			OR b.fs_npwp_konsumen = a.fs_npwp_konsumen
			OR b.fs_siup_perusahaan = a.fs_siup_perusahaan
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkInternal($nKtp, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan, 
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(b.fs_npwp_konsumen, b.fs_siup_perusahaan, b.fs_nama_konsumen,b.fd_tanggal_lahir_konsumen,b.fs_tempat_lahir_konsumen, b.fs_nama_ibu_kandung)) 
				THEN 'TIDAK BLACKLIST' else 'MFI BLACKLIST' end as fs_status_blacklist
			FROM tx_apk a
			LEFT JOIN  tm_blacklist b 
			ON b.fs_ktp_konsumen = a.fs_ktp_konsumen
			OR CONCAT(b.fs_nama_konsumen, b.fd_tanggal_lahir_konsumen) = CONCAT(a.fs_nama_konsumen, a.fd_tanggal_lahir_konsumen)
			OR CONCAT(a.fs_tempat_lahir_konsumen, a.fd_tanggal_lahir_konsumen, a.fs_nama_ibu_kandung) = CONCAT(b.fs_tempat_lahir_konsumen, b.fd_tanggal_lahir_konsumen, b.fs_nama_ibu_kandung)
			OR b.fs_npwp_konsumen = a.fs_npwp_konsumen
			OR b.fs_siup_perusahaan = a.fs_siup_perusahaan
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
		");

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");
	}

	public function checkRejectAll($nKtp)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject
			FROM tx_apk a
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkReject($nKtp, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(c.fs_npwp_konsumen,c.fs_siup_perusahaan,c.fs_ktp_konsumen,c.fs_nama_konsumen,c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung))
				OR c.fs_keputusan_kredit != 'N'
				THEN 'TIDAK REJECT' else 'MFI REJECT' end as fs_status_reject
			FROM tx_apk a
			LEFT JOIN tx_apk c
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				c.fs_npwp_konsumen = a.fs_npwp_konsumen OR c.fs_siup_perusahaan = a.fs_siup_perusahaan
				ELSE 	
				c.fs_ktp_konsumen = a.fs_ktp_konsumen 
				OR c.fs_nama_konsumen = a.fs_nama_konsumen 
				OR CONCAT(c.fs_tempat_lahir_konsumen,c.fd_tanggal_lahir_konsumen,c.fs_nama_ibu_kandung) = CONCAT(a.fs_tempat_lahir_konsumen,a.fd_tanggal_lahir_konsumen,a.fs_nama_ibu_kandung)
			END
			AND c.fs_keputusan_kredit = 'N' AND c.fd_tgl_apk < a.fd_tgl_apk
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
		");

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkFamilyAll($nKtp)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function checkFamily($nKtp, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT a.fn_no_apk, a.fs_nama_konsumen, a.fd_tgl_apk, a.fs_npwp_konsumen, a.fs_siup_perusahaan,
			a.fs_ktp_konsumen, a.fs_kode_lokasi, a.fs_nomor_dealer, a.fs_jenis_piutang,
			a.fs_pola_transaksi, a.fn_nomor_perjanjian,
			case 
				WHEN ISNULL(CONCAT(d.fs_kartu_keluarga))
				THEN 'BELUM PERNAH KREDIT' else 'PERNAH KREDIT' end as fs_status_family
			FROM tx_apk a
			LEFT JOIN tx_apk d
			ON 
				CASE a.fs_jenis_pembiayaan WHEN 'B' THEN
				d.fs_kartu_keluarga = '-'
				ELSE
				d.fs_kartu_keluarga = a.fs_kartu_keluarga
			END
			AND (d.fs_keputusan_kredit = 'N' AND d.fd_tgl_apk < a.fd_tgl_apk)
			WHERE a.fs_ktp_konsumen = '".trim($nKtp)."'
		");

		$xSQL = $xSQL.("
			ORDER BY a.fn_no_apk ASC LIMIT ".$nStart.",".$nLimit."
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}