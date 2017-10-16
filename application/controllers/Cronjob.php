<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cronjob extends CI_Controller {
	
	public function index() {
		if (!$this->input->is_cli_request()) {
			echo "can only be accessed via the command line";
		} else {
			
		}
	}

}