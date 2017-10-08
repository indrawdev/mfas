<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MAnalisa extends CI_Model {

	public function __construct() 
	{
		parent::__construct();
		$this->load->database();
	}

	public function listCabangRetailAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM tx_apk a
			LEFT JOIN tm_blacklist b
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangRetail($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleetAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleet($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangRetailBatalAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangRetailBatal($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleetBatalAll($sCari)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listCabangFleetBatal($sCari, $nStart, $nLimit)
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetailAll()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetail()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleetAll()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleet()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetailBatalAll() 
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatRetailBatal()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleetBatalAll()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");

		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}

	public function listPusatFleetBatal()
	{
		$xSQL = ("
			SELECT DISTINCT
			FROM
			LEFT JOIN 
		");
		
		$sSQL = $this->db->query($xSQL);
		return $sSQL;
	}
}