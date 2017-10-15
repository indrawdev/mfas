<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MDashboard extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function statusDisetujui()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, 
			COUNT(fn_no_apk) as jumlah
			FROM tx_apk
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
			AND fs_keputusan_kredit = 'Y'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function statusDitolak()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, 
			COUNT(fn_no_apk) as jumlah
			FROM tx_apk
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
			AND fs_keputusan_kredit = 'N'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function statusDiproses()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, 
			COUNT(fn_no_apk) as jumlah
			FROM tx_apk
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
			AND fs_keputusan_kredit = ''
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function statusDibatal()
	{
		$xSQL = ("
			SELECT DISTINCT MONTHNAME(fd_tgl_apk) as bulan, 
			COUNT(fn_no_apk) as jumlah 
			FROM tx_apk 
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
			AND fs_keputusan_kredit = 'B'
		");

		$xSQL = $xSQL.("
			GROUP BY MONTH(fd_tgl_apk)
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function gradeMonthly()
	{
		$xSQL = ("
			SELECT fs_grade as grade, 
			COUNT(fs_grade) as jumlah 
			FROM tx_apk 
			WHERE MONTH(fd_tgl_apk) = MONTH(CURRENT_DATE())
		");

		$xSQL = $xSQL.("
			GROUP BY fs_grade
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function gradeYearly()
	{
		$xSQL = ("
			SELECT fs_grade as grade, 
			COUNT(fs_grade) as jumlah 
			FROM tx_apk 
			WHERE YEAR(fd_tgl_apk) = YEAR(CURRENT_DATE())
		");

		$xSQL = $xSQL.("
			GROUP BY fs_grade
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}