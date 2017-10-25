Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager',
	'Ext.ProgressBar',
	'Ext.view.View',
]);

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	Ext.define('DataGridBadanUsaha', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fd_tgl_apk', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_pjj', type: 'string'}
		]
	});

	Ext.define('DataGridKodePos', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_dati', type: 'string'},
			{name: 'fs_nama_dati', type: 'string'},
			{name: 'fs_kodepos', type: 'string'},
			{name: 'fs_kelurahan', type: 'string'},
			{name: 'fs_kecamatan', type: 'string'},
			{name: 'fs_dati', type: 'string'},
			{name: 'fs_propinsi', type: 'string'}
		]
	});

	Ext.define('DataGridKategori', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_sektor_ekonomi', type: 'string'},
			{name: 'fs_nama_sektor_ekonomi', type: 'string'}
		]
	});

	Ext.define('DataGridKendaraan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_kendaraan', type: 'string'},
			{name: 'fs_kode_kendaraan_lama', type: 'string'},
			{name: 'fs_model_kendaraan', type: 'string'},
			{name: 'fs_jenis_kendaraan', type: 'string'},
			{name: 'fs_merek_kendaraan', type: 'string'},
			{name: 'fs_silinder_kendaraan', type: 'string'}
		]
	});

	Ext.define('DataGridAsuransi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_asuransi1', type: 'string'},
			{name: 'fs_kode_asuransi2', type: 'string'},
			{name: 'fs_nama_perusahaan_asuransi', type: 'string'}
		]
	});

	Ext.define('DataGridPlatKendaraan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_plat', type: 'string'},
			{name: 'fs_wilayah', type: 'string'},
			{name: 'fs_kode_wilayah', type: 'string'}
		]
	});

	Ext.define('DataGridDealer', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_dealer1', type: 'string'},
			{name: 'fs_kode_dealer2', type: 'string'},
			{name: 'fn_cabang_dealer', type: 'string'},
			{name: 'fs_nama_dealer', type: 'string'},
			{name: 'fs_alamat_dealer', type: 'string'},
			{name: 'fs_kota_dealer', type: 'string'},
			{name: 'fs_nama_pemilik', type: 'string'},
			{name: 'fs_nama_bank_pencairan', type: 'string'},
			{name: 'fs_rekening_bank_pencairan', type: 'string'},
			{name: 'fs_atasnama_bank_pencairan', type: 'string'},
			{name: 'fn_persen_refund_bunga', type: 'string'},
			{name: 'fn_persen_refund_asuransi', type: 'string'}
		]
	});

	Ext.define('DataGridPengurus', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fs_nama_pengurus', type: 'string'},
			{name: 'fs_alamat_pengurus', type: 'string'},
			{name: 'fs_kodepos_pengurus', type: 'string'},
			{name: 'fs_kota_pengurus', type: 'string'},
			{name: 'fs_ktp_pengurus', type: 'string'},
			{name: 'fs_npwp_pengurus', type: 'string'},
			{name: 'fn_persen_saham', type: 'string'},
			{name: 'fs_aktif', type: 'string'}
		]
	});


	var grupBadanUsaha = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridBadanUsaha',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridbadanusaha'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	// GRID BADAN USAHA
	var gridBadanUsaha = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 400,
		sortableColumns: false,
		store: grupBadanUsaha,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'No. APK', dataIndex: 'fn_no_apk', menuDisabled: true, width: 90},
			{text: 'Nama Badan Usaha', dataIndex: 'fs_nama_konsumen', menuDisabled: true, width: 240},
			{text: 'Tanggal APK', dataIndex: 'fd_tgl_apk', menuDisabled: true, width: 90, renderer: Ext.util.Format.dateRenderer('d-m-Y')},
			{text: 'Kode Lokasi', dataIndex: 'fs_kode_lokasi', menuDisabled: true, hidden: true},
			{text: 'Nomor Dealer', dataIndex: 'fs_nomor_dealer', menuDisabled: true, hidden: true},
			{text: 'Nama Lembaga', dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, hidden: true},
			{text: 'Jenis Usaha', dataIndex: 'fs_jenis_usaha', menuDisabled: true, hidden: true},
			{text: 'Jenis Piutang', dataIndex: 'fs_jenis_piutang', menuDisabled: true, hidden: true},
			{text: 'Pola Transaksi', dataIndex: 'fs_pola_transaksi', menuDisabled: true, hidden: true},
			{text: 'Jenis Pembiayaan', dataIndex: 'fs_jenis_pembiayaan', menuDisabled: true, hidden: true},
			{text: 'No. PJJ', dataIndex: 'fs_pjj',menuDisabled: true, hidden: true},
			{text: 'Fleet', dataIndex: 'fs_fleet', menuDisabled: true, hidden: true},
			{text: 'Alamat Badan Usaha', dataIndex: 'fs_alamat_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kode Dati', dataIndex: 'fs_kode_dati_konsumen', menuDisabled: true, hidden: true},
			{text: 'Propinsi', dataIndex: 'fs_propinsi_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kota', dataIndex: 'fs_kota_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan_konsumen', menuDisabled: true, hidden: true},
			{text: 'NPWP B.U', dataIndex: 'fs_npwp_konsumen', menuDisabled: true, hidden: true},
			{text: 'SIUP B.U', dataIndex: 'fs_siup_perusahaan', menuDisabled: true, hidden: true},
			{text: 'TDP B.U', dataIndex: 'fs_tdp_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Telp. B.U', dataIndex: 'fs_telepon_konsumen', menuDisabled: true, hidden: true},
			{text: 'Email B.U', dataIndex: 'fs_email_konsumen', menuDisabled: true, hidden: true},
			{text: 'Group B.U', dataIndex: 'fs_group_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Telp. Usaha B.U', dataIndex: 'fs_telfon_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kategori Usaha B.U', dataIndex: 'fs_kategori_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Nama Usaha B.U', dataIndex: 'fs_nama_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Skala Usaha B.U', dataIndex: 'fs_skala_perusahaan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Status Usaha', dataIndex: 'fs_status_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Bentuk Usaha B.U', dataIndex: 'fs_bentuk_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Status Tempat Usaha B.U', dataIndex: 'fs_tempat_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Operasi Sejak', dataIndex: 'fs_beroperasi_sejak', menuDisabled: true, hidden: true},
			{text: 'Jml. Karyawan', dataIndex: 'fn_jumlah_karyawan_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Keterangan Usaha', dataIndex: 'fs_keterangan_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Omzet Perbulan', dataIndex: 'fn_pendapatan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Biaya Perbulan', dataIndex: 'fn_biaya_konsumen', menuDisabled: true, hidden: true},
			{text: 'Nama P.J', dataIndex: 'fs_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Jabatan P.J', dataIndex: 'fs_jabatan_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'KTP P.J', dataIndex: 'fs_ktp_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'NPWP P.J', dataIndex: 'fs_npwp_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Alamat P.J', dataIndex: 'fs_alamat_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'KodePos P.J', dataIndex: 'fs_kodepos_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Kota P.J', dataIndex: 'fs_kota_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Telp. P.J', dataIndex: 'fs_telepon_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'HP. P.J', dataIndex: 'fs_handphone_penanggungjawab_perusahaan', menuDisabled: true, hidden: true},
			{text: 'Repeat Order', dataIndex: 'fs_repeat_order', menuDisabled: true, hidden: true},
			{text: 'Repeat Order Ke', dataIndex: 'fs_repeat_order_ke', menuDisabled: true, hidden: true},
			{text: 'Alamat Surat', dataIndex: 'fs_alamat_korespondensi', menuDisabled: true, hidden: true},
			{text: 'KodePos Surat', dataIndex: 'fs_kodepos_korespondensi', menuDisabled: true, hidden: true},
			{text: 'Kota Surat', dataIndex: 'fs_kota_korespondensi', menuDisabled: true, hidden: true},
			{text: 'Model Kend.', dataIndex: 'fs_model_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Kode Kend.', dataIndex: 'fs_kode_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Jenis Kend.', dataIndex: 'fs_jenis_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Silinder', dataIndex: 'fs_silinder_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Tahun Kend.', dataIndex: 'fn_tahun_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Warna Kend.', dataIndex: 'fs_warna_kendaraan', menuDisabled: true, hidden: true},
			{text: 'No. Rangka', dataIndex: 'fs_no_rangka', menuDisabled: true, hidden: true},
			{text: 'No. Mesin', dataIndex: 'fs_no_mesin', menuDisabled: true, hidden: true},
			{text: 'Komersil', dataIndex: 'fs_komersial', menuDisabled: true, hidden: true},
			{text: 'Sesuai Kontrak', dataIndex: 'fs_nama_sesuai_kontrak', menuDisabled: true, hidden: true},
			{text: 'Nama BPKB', dataIndex: 'fs_nama_bpkb', menuDisabled: true, hidden: true},
			{text: 'Alamat BPKB', dataIndex: 'fs_alamat_bpkb', menuDisabled: true, hidden: true},
			{text: 'Kota BPKB', dataIndex: 'fs_kota_bpkb', menuDisabled: true, hidden: true},
			{text: 'Nomor BPKB', dataIndex: 'fs_nomor_bpkb', menuDisabled: true, hidden: true},
			{text: 'No. Polisi', dataIndex: 'fs_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Wilayah No. Plat', dataIndex: 'fs_kode_wilayah_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Wilayah Akhir No. Plat', dataIndex: 'fs_kode_akhir_wilayah_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Sales', dataIndex: 'fs_salesman', menuDisabled: true, hidden: true},
			{text: 'Jenis Asuransi', dataIndex: 'fs_jenis_asuransi', menuDisabled: true, hidden: true},
			{text: 'Nama Asuransi', dataIndex: 'fs_nama_perusahaan_asuransi', menuDisabled: true, hidden: true},
			{text: 'Kode Asuransi 1', dataIndex: 'fs_kode_asuransi1', menuDisabled: true, hidden: true},
			{text: 'Kode Asuransi 2', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, hidden: true},
			{text: 'Nama Dealer', dataIndex: 'fs_nama_dealer', menuDisabled: true, hidden: true},
			{text: 'Cabang Dealer', dataIndex: 'fn_cabang_dealer', menuDisabled: true, hidden: true},
			{text: 'Kode Dealer 1', dataIndex: 'fs_kode_dealer1', menuDisabled: true, hidden: true},
			{text: 'Kode Dealer 2', dataIndex: 'fs_kode_dealer2', menuDisabled: true, hidden: true},
			{text: 'Pola Angsuran', dataIndex: 'fs_pola_angsuran', menuDisabled: true, hidden: true},
			{text: 'Cara Bayar', dataIndex: 'fs_cara_bayar', menuDisabled: true, hidden: true},
			{text: 'Angsuran Dimuka', dataIndex: 'fs_angsuran_dimuka', menuDisabled: true, hidden: true},
			{text: 'Kali Angsuran Dimuka', dataIndex: 'fn_kali_angsuran_dimuka', menuDisabled: true, hidden: true},
			{text: 'Jumlah Angsuran', dataIndex: 'fn_jumlah_angsuran_dimuka', menuDisabled: true, hidden: true},
			{text: 'Biaya TJH', dataIndex: 'fn_biaya_tjh', menuDisabled: true, hidden: true},
			{text: 'Selisih DP', dataIndex: 'fn_selisih_dp', menuDisabled: true, hidden: true},
			{text: 'Potong Pencairan', dataIndex: 'fs_angsuran_dimuka_potong_pencairan', menuDisabled: true, hidden: true},
			{text: 'DP Bayar', dataIndex: 'fn_dp_bayar', menuDisabled: true, hidden: true},
			{text: 'Angs. Dibayar Dealer', dataIndex: 'fs_angsuran_dibayar_dealer', menuDisabled: true, hidden: true},
			{text: 'Biaya ADM', dataIndex: 'fn_biaya_adm', menuDisabled: true, hidden: true},
			{text: 'Premi Ass Gross', dataIndex: 'fn_premi_asuransi_gross', menuDisabled: true, hidden: true},
			{text: 'Premi Ass', dataIndex: 'fn_premi_asuransi', menuDisabled: true, hidden: true},
			{text: 'Premi Ass Gross Perluasan', dataIndex: 'fn_premi_asuransi_gross_perluasan', menuDisabled: true, hidden: true},
			{text: 'Premi Ass Netto', dataIndex: 'fn_premi_asuransi_netto', menuDisabled: true, hidden: true},
			{text: 'Denda perhari', dataIndex: 'fn_denda_perhari', menuDisabled: true, hidden: true},
			{text: 'Harga OTR', dataIndex: 'fn_harga_otr', menuDisabled: true, hidden: true},
			{text: 'Uang Muka Dealer', dataIndex: 'fn_uang_muka_dealer', menuDisabled: true, hidden: true},
			{text: 'Asuransi Dikredit Dealer', dataIndex: 'fn_asuransi_dikredit_dealer', menuDisabled: true, hidden: true},
			{text: 'Pokok Pembiayaan Dealer', dataIndex: 'fn_pokok_pembiayaan_dealer', menuDisabled: true, hidden: true},
			{text: 'Persen Bunga Flat Dealer', dataIndex: 'fn_persen_bunga_flat_dealer', menuDisabled: true, hidden: true},
			{text: 'Persen Bunga Efektif Dealer', dataIndex: 'fn_persen_bunga_efektif_dealer', menuDisabled: true, hidden: true},
			{text: 'Bulan Masa Angs. Dealer', dataIndex: 'fn_bulan_masa_angsuran_dealer', menuDisabled: true, hidden: true},
			{text: 'Kali Masa Angs. Dealer', dataIndex: 'fn_kali_masa_angsuran_dealer', menuDisabled: true, hidden: true},
			{text: 'Bunga Dealer', dataIndex: 'fn_bunga_dealer', menuDisabled: true, hidden: true},
			{text: 'Angsuran Dealer', dataIndex: 'fn_angsuran_dealer', menuDisabled: true, hidden: true},
			{text: 'Angs. Tidak Sama Dealer', dataIndex: 'fn_angsuran_tidak_sama_dealer', menuDisabled: true, hidden: true},
			{text: 'Uang Muka Konsumen', dataIndex: 'fn_uang_muka_konsumen', menuDisabled: true, hidden: true},
			{text: 'Asuransi Dikredit Konsumen', dataIndex: 'fn_asuransi_dikredit_konsumen', menuDisabled: true, hidden: true},
			{text: 'Pokok Pembiayaan Konsumen', dataIndex: 'fn_pokok_pembiayaan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Persen Bunga Flat Konsumen', dataIndex: 'fn_persen_bunga_flat_konsumen', menuDisabled: true, hidden: true},
			{text: 'Persen Bunga Efektif Konsumen', dataIndex: 'fn_persen_bunga_efektif_konsumen', menuDisabled: true, hidden: true},
			{text: 'Bulan Masa Angs. Konsumen', dataIndex: 'fn_bulan_masa_angsuran_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kali Masa Angs. Konsumen', dataIndex: 'fn_kali_masa_angsuran_konsumen', menuDisabled: true, hidden: true},
			{text: 'Bunga Konsumen', dataIndex: 'fn_bunga_konsumen', menuDisabled: true, hidden: true},
			{text: 'Angsuran Konsumen', dataIndex: 'fn_angsuran_konsumen', menuDisabled: true, hidden: true},
			{text: 'Angs. Tidak Sama Konsumen', dataIndex: 'fn_angsuran_tidak_sama_konsumen', menuDisabled: true, hidden: true},
			{text: 'Tanggal Perjanjian', dataIndex: 'fd_tanggal_perjanjian', menuDisabled: true, hidden: true},
			{text: 'Tanggal Angs. Pertama', dataIndex: 'fd_tanggal_angsuran_pertama', menuDisabled: true, hidden: true},
			{text: 'Tanggal Jatuh Tempo perbulan', dataIndex: 'fn_tanggal_jatuhtempo_perbulan', menuDisabled: true, hidden: true},
			{text: 'Cair Ke', dataIndex: 'fs_cair_ke', menuDisabled: true, hidden: true},
			{text: 'Uang Muka Bayar Di', dataIndex: 'fs_uang_muka_bayar_di', menuDisabled: true, hidden: true},
			{text: 'Deposit Potong Pencairan', dataIndex: 'fs_deposit_potong_pencairan', menuDisabled: true, hidden: true},
			{text: 'A/N Bank Pencairan', dataIndex: 'fs_atasnama_bank_pencairan', menuDisabled: true, hidden: true},
			{text: 'Nama Bank Pencairan', dataIndex: 'fs_nama_bank_pencairan', menuDisabled: true, hidden: true},
			{text: 'Rek. Bank Pencairan', dataIndex: 'fs_rekening_bank_pencairan', menuDisabled: true, hidden: true},
			{text: 'Nilai Pencairan', dataIndex: 'fn_nilai_pencairan', menuDisabled: true, hidden: true},
			{text: 'Flag APK', dataIndex: 'fs_flag_apk', menuDisabled: true, hidden: true},
		],
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'No. APK / Nama Badan Usaha',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupBadanUsaha.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBadanUsaha
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				// SET RECORD IN TAB DATA UTAMA
				Ext.getCmp('txtNoAPK').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboTglAPK').setValue(record.get('fd_tgl_apk'));
				Ext.getCmp('cboJnsUsaha').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboJnsPiutang').setValue(record.get('fs_jenis_piutang'));
				Ext.getCmp('txtKdLembaga1').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('txtKdLembaga2').setValue(record.get('fs_nomor_dealer'));
				Ext.getCmp('cboLembaga').setValue(record.get('fs_nama_lembaga_keuangan'));
				Ext.getCmp('cboPolaTransaksi').setValue(record.get('fs_pola_transaksi'));
				Ext.getCmp('txtNoPJJ').setValue(record.get('fs_pjj'));
				Ext.getCmp('cboFleet').setValue(record.get('fs_fleet'));
				Ext.getCmp('txtNamaBadanUsaha').setValue(record.get('fs_nama_konsumen'));
				Ext.getCmp('txtAlamatBadanUsaha').setValue(record.get('fs_alamat_konsumen'));
				Ext.getCmp('cboKodePos').setValue(record.get('fs_kodepos_konsumen'));
				Ext.getCmp('txtPropinsi').setValue(record.get('fs_propinsi_konsumen'));
				Ext.getCmp('txtKota').setValue(record.get('fs_kota_konsumen'));
				Ext.getCmp('txtKecamatan').setValue(record.get('fs_kecamatan_konsumen'));
				Ext.getCmp('txtKelurahan').setValue(record.get('fs_kelurahan_konsumen'));
				Ext.getCmp('txtNoNPWP').setValue(record.get('fs_npwp_konsumen'));
				Ext.getCmp('txtNoSIUP').setValue(record.get('fs_siup_perusahaan'));
				Ext.getCmp('txtNoTDP').setValue(record.get('fs_tdp_perusahaan'));
				Ext.getCmp('txtNoTlpBadanUsaha').setValue(record.get('fs_telepon_konsumen'));
				Ext.getCmp('txtEmail').setValue(record.get('fs_email_konsumen'));
				Ext.getCmp('txtGroupUsaha').setValue(record.get('fs_group_perusahaan'));

				// SET RECORD IN TAB DATA BADAN USAHA
				Ext.getCmp('txtNoAPKTab3').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtNoTlpPerusahaan').setValue(record.get('fs_telfon_usaha_konsumen'));
				Ext.getCmp('cboKategoriUsaha').setValue(record.get('fs_nama_usaha_konsumen'));
				Ext.getCmp('txtKdKategoriUsaha').setValue(record.get('fs_kategori_usaha_konsumen'));
				Ext.getCmp('cboSkalaPerusahaan').setValue(record.get('fs_skala_perusahaan_konsumen'));
				Ext.getCmp('cboStatusUsaha').setValue(record.get('fs_status_perusahaan'));
				Ext.getCmp('cboBentukUsaha').setValue(record.get('fs_bentuk_perusahaan'));
				Ext.getCmp('cboStatusTempatUsaha').setValue(record.get('fs_tempat_perusahaan'));
				Ext.getCmp('txtOperasiSejak').setValue(record.get('fs_beroperasi_sejak'));
				Ext.getCmp('txtJumlahKaryawan').setValue(record.get('fn_jumlah_karyawan_perusahaan'));
				Ext.getCmp('txtKetUsaha').setValue(record.get('fs_keterangan_usaha_konsumen'));
				Ext.getCmp('txtOmsetPerBulan').setValue(record.get('fn_pendapatan_konsumen'));
				Ext.getCmp('txtBiayaPerBulan').setValue(record.get('fn_biaya_konsumen'));
				Ext.getCmp('txtNamaPenanggungJawab').setValue(record.get('fs_penanggungjawab_perusahaan'));
				Ext.getCmp('txtJabatanPenanggungJawab').setValue(record.get('fs_jabatan_penanggungjawab_perusahaan'));
				Ext.getCmp('txtNoKTPPenanggungJawab').setValue(record.get('fs_ktp_penanggungjawab_perusahaan'));
				Ext.getCmp('txtNoNPWPPenanggungJawab').setValue(record.get('fs_npwp_penanggungjawab_perusahaan'));
				Ext.getCmp('txtAlamatPenanggungJawab').setValue(record.get('fs_alamat_penanggungjawab_perusahaan'));
				Ext.getCmp('cboKodePosPenanggungJawab').setValue(record.get('fs_kodepos_penanggungjawab_perusahaan'));
				Ext.getCmp('txtKotaPenanggungJawab').setValue(record.get('fs_kota_penanggungjawab_perusahaan'));
				Ext.getCmp('txtTeleponPenanggungJawab').setValue(record.get('fs_telepon_penanggungjawab_perusahaan'));
				Ext.getCmp('txtHandphonePenanggungJawab').setValue(record.get('fs_handphone_penanggungjawab_perusahaan'));
				Ext.getCmp('cboRepeatOrder').setValue(record.get('fs_repeat_order'));
				Ext.getCmp('txtJmlRepeatKe').setValue(record.get('fs_repeat_order_ke'));
				Ext.getCmp('txtAlamatKorespondensi').setValue(record.get('fs_alamat_korespondensi'));
				Ext.getCmp('cboKodePosKorespondensi').setValue(record.get('fs_kodepos_korespondensi'));
				Ext.getCmp('txtKotaKorespondensi').setValue(record.get('fs_kota_korespondensi'));

				// SET RECORD IN TAB DATA KENDARAAN
				Ext.getCmp('txtNoAPKTab4').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboModelKendaraan').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtKdKendaraan').setValue(record.get('fs_kode_kendaraan'));
				Ext.getCmp('txtJnsKendaraan').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('txtSilinder').setValue(record.get('fs_silinder_kendaraan'));
				Ext.getCmp('txtTahunKendaraan').setValue(record.get('fn_tahun_kendaraan'));
				Ext.getCmp('txtWarnaKendaraan').setValue(record.get('fs_warna_kendaraan'));
				Ext.getCmp('txtNoRangka').setValue(record.get('fs_no_rangka'));
				Ext.getCmp('txtNoMesin').setValue(record.get('fs_no_mesin'));
				Ext.getCmp('cboKomersil').setValue(record.get('fs_komersial'));
				Ext.getCmp('cboSesuaiKontrak').setValue(record.get('fs_nama_sesuai_kontrak'));
				Ext.getCmp('txtNamaBPKP').setValue(record.get('fs_nama_bpkb'));
				Ext.getCmp('txtAlamatBPKP').setValue(record.get('fs_alamat_bpkb'));
				Ext.getCmp('txtNoBPKP').setValue(record.get('fs_nomor_bpkb'));
				Ext.getCmp('txtNomorPolisi').setValue(record.get('fs_no_polisi'));
				Ext.getCmp('cboNoPolisi').setValue(record.get('fs_kode_wilayah_no_polisi'));
				Ext.getCmp('txtNoBlkPolisi').setValue(record.get('fs_kode_akhir_wilayah_no_polisi'));
				Ext.getCmp('cboPerusahaanAsuransi').setValue(record.get('fs_nama_perusahaan_asuransi'));
				Ext.getCmp('txtKdAsuransi1').setValue(record.get('fs_kode_asuransi1'));
				Ext.getCmp('txtKdAsuransi2').setValue(record.get('fs_kode_asuransi2'));
				Ext.getCmp('cboDealer').setValue(record.get('fs_nama_dealer'));
				Ext.getCmp('txtKdDealer1').setValue(record.get('fs_kode_dealer1'));
				Ext.getCmp('txtKdDealer2').setValue(record.get('fs_kode_dealer2'));
				Ext.getCmp('txtCabangDealer').setValue(record.get('fn_cabang_dealer'));
				Ext.getCmp('txtSales').setValue(record.get('fs_salesman'));

				// SET RECORD IN TAB DATA STRUKTUR KREDIT
				Ext.getCmp('txtNoAPKTab5').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboPolaAngsuran').setValue(record.get('fs_pola_angsuran'));
				Ext.getCmp('cboCaraBayar').setValue(record.get('fs_cara_bayar'));
				Ext.getCmp('cboAngsuranDimuka').setValue(record.get('fs_angsuran_dimuka'));
				Ext.getCmp('txtTenor').setValue(record.get('fn_kali_angsuran_dimuka'));
				Ext.getCmp('cboPotongPencairan').setValue(record.get('fs_angsuran_dimuka_potong_pencairan'));

				// SET RECORD IN TAB DATA PENGURUS
				Ext.getCmp('txtNoAPKTab6').setValue(record.get('fn_no_apk'));
				// LOAD DATA PENGURUS
				grupPengurus.load();

				// SET RECORD IN TAB DATA PENCAIRAN
				Ext.getCmp('txtNoAPKTab7').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboTglAngsuran').setValue(record.get('fd_tanggal_angsuran_pertama'));
				Ext.getCmp('txtJatuhTempo').setValue(record.get('fn_tanggal_jatuhtempo_perbulan'));
				Ext.getCmp('cboTglCair').setValue(record.get('fd_tanggal_perjanjian'));
				Ext.getCmp('cboPencairanKe').setValue(record.get('fs_cair_ke'));
				Ext.getCmp('cboUangMukaKe').setValue(record.get('fs_uang_muka_bayar_di'));
				Ext.getCmp('cboDepositPotongCair').setValue(record.get('fs_deposit_potong_pencairan'));
				Ext.getCmp('txtNamaRekeningCair').setValue(record.get('fs_atasnama_bank_pencairan'));
				Ext.getCmp('txtNamaBank').setValue(record.get('fs_nama_bank_pencairan'));
				Ext.getCmp('txtNoRekeningCair').setValue(record.get('fs_rekening_bank_pencairan'));

				// SET ENABLED TABPANEL
				Ext.getCmp('tab3').setDisabled(false);
				Ext.getCmp('tab4').setDisabled(false);
				Ext.getCmp('tab5').setDisabled(false);
				Ext.getCmp('tab6').setDisabled(false);
				Ext.getCmp('tab7').setDisabled(false);

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// GROUP SELECT 'TM_LEMBAGAKEUANGAN'
	var grupLembaga = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_lembaga_keuangan1',
			'fs_kode_lembaga_keuangan2',
			'fs_nama_lembaga_keuangan'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridlembaga'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariNamaLembaga').getValue()
				});
			}
		}
	});

	// GROUP TAB FORM DATA UTAMA
	var grupPolaTrans = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/pola'
		}
	});

	var grupJenisUsaha = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkperorangan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jenis_badan'
				});
			}
		}
	});

	var grupJenisPiutang = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jenis_piutang'
				});
			}
		}
	});

	var grupFleet = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupKodePos = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKodePos',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridkodepos'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCariKodePos').getValue(),
					//'fs_cari': Ext.getCmp('txtCariKodePosKonsumen').getValue()
				});
			}
		}
	});

	// GROUP TAB FORM DATA BADAN USAHA
	var grupBentukUsaha = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'bentuk_perusahaan'
				});
			}
		}
	});

	var grupKategoriUsaha = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKategori',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridkategori'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKategori').getValue()
				});
			}
		}
	});

	var grupSkala = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'skala_perusahaan'
				});
			}
		}
	});

	var grupStatusUsaha = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_perusahaan'
				});
			}
		}
	});

	var grupStatusTempat = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_tempat_usaha'
				});
			}
		}
	});

	var grupRepeatOrder = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	// GROUP TAB FORM DATA KENDARAAN
	var grupModelKendaraan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKendaraan',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridkendaraan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKendaraan').getValue()
				});
			}
		}
	});

	var grupKomersil = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupPerusahaanAsuransi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridAsuransi',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridasuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariAsuransi').getValue()
				});
			}
		}
	});

	var grupPlatKendaraan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPlatKendaraan',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridplatkendaraan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariPlat').getValue()
				});
			}
		}
	});

	var grupSesuai = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupDealer = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridDealer',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/griddealer'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariDealer').getValue()
				});
			}
		}
	});

	// GROUP TAB FORM DATA STRUKTUR KREDIT
	var grupPolaAngs = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pola_angsuran'
				});
			}
		}
	});

	var grupDimuka = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupCaraBayar = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'cara_bayar'
				});
			}
		}
	});

	var grupPotongPencairan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupAngsDibayarDealer = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupPencairanKe = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pencairan_ke'
				});
			}
		}
	});

	// GROUP TAB FORM DATA PENGURUS
	var grupPengurus = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPengurus',
		pageSize: 25,
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				rootProperty: 'hasil',
				totalProperty: 'total',
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/gridpengurus'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab6').getValue()
				});
			}
		}
	});

	var grupJabatan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jabatan_pengurus'
				});
			}
		}
	});

	var grupAktif = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_aktif'
				});
			}
		}
	});

	// GROUP TAB FORM DATA PENCAIRAN
	var grupDepositPotong = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/combo'
		}
	});

	var grupPencairanKe = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pencairan_ke'
				});
			}
		}
	});

	var grupUangMukaKe = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode','fs_nama'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'uangmuka_ke'
				});
			}
		}
	});

	// POPUP TAB FORM DATA UTAMA
	var winGrid1 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLembaga,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Lembaga 1", dataIndex: 'fs_kode_lembaga_keuangan1', menuDisabled: true, flex: 1},
			{text: "Kode Lembaga 2", dataIndex: 'fs_kode_lembaga_keuangan2', menuDisabled: true, flex: 1},
			{text: "Nama Lembaga Pembiayaan", dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, flex: 2.5}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Lembaga Pembiayaan',
				id: 'txtCariNamaLembaga',
				name: 'txtCariNamaLembaga',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupLembaga.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupLembaga,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboLembaga').setValue(record.get('fs_nama_lembaga_keuangan'));
				Ext.getCmp('txtKdLembaga1').setValue(record.get('fs_kode_lembaga_keuangan1'));
				Ext.getCmp('txtKdLembaga2').setValue(record.get('fs_kode_lembaga_keuangan2'));
				winCari1.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari1 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid1
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupLembaga.load();
				vMask.show();
			}
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPolaTrans,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pola", dataIndex: 'fs_kode_pola', menuDisabled: true, flex: 1},
			{text: "Nama Pola Transaksi", dataIndex: 'fs_nama_pola', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Pola Transaksi',
				id: 'txtCariPolaTrans',
				name: 'txtCariPolaTrans',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupPolaTrans.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPolaTrans,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				//Ext.getCmp('cboLembaga').setValue(record.get('fs_nama_lembaga_keuangan'));
				//Ext.getCmp('txtKdLembaga1').setValue(record.get('fs_kode_lembaga_keuangan1'));
				winCari2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPolaTrans .load();
				vMask.show();
			}
		}
	});

	var winGrid3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupKodePos,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pos", dataIndex: 'fs_kodepos', menuDisabled: true, flex: 0.5},
			{text: "Kelurahan", dataIndex: 'fs_kelurahan', menuDisabled: true, flex: 1},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan', menuDisabled: true, flex: 1},
			{text: "Kota", dataIndex: 'fs_nama_dati', menuDisabled: true, flex: 1},
			{text: "Propinsi", dataIndex: 'fs_propinsi', menuDisabled: true, flex: 1.3},
			{text: "Kode Dati", dataIndex: 'fs_kode_dati', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Kota / Propinsi',
				id: 'txtCariKodePos',
				name: 'txtCariKodePos',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodePos.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePos').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtPropinsi').setValue(record.get('fs_propinsi'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nama_dati'));
				Ext.getCmp('txtKecamatan').setValue(record.get('fs_kecamatan'));
				Ext.getCmp('txtKelurahan').setValue(record.get('fs_kelurahan'));
				Ext.getCmp('txtKdDati').setValue(record.get('fs_kode_dati'));
				winCari3.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos.load();
				vMask.show();
			}
		}
	});

	// POPUP TAB FORM DATA BADAN USAHA
	var winGrid4 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKategoriUsaha,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Kategori Usaha", dataIndex: 'fs_kode_sektor_ekonomi', menuDisabled: true, hidden: true},
			{text: "Nama Kategori Usaha", dataIndex: 'fs_nama_sektor_ekonomi', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Kategori Usaha',
				id: 'txtCariKategori',
				name: 'txtCariKategori',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKategoriUsaha.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKategoriUsaha,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari4.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKategoriUsaha').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKdKategoriUsaha').setValue(record.get('fs_kode_sektor_ekonomi'));
				winCari4.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari4 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid4
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKategoriUsaha.load();
				vMask.show();
			}
		}
	});

	var winGrid5 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupKodePos,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pos", dataIndex: 'fs_kodepos', menuDisabled: true, flex: 0.5},
			{text: "Kelurahan", dataIndex: 'fs_kelurahan', menuDisabled: true, flex: 1},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan', menuDisabled: true, flex: 1},
			{text: "Kota", dataIndex: 'fs_nama_dati', menuDisabled: true, flex: 1},
			{text: "Propinsi", dataIndex: 'fs_propinsi', menuDisabled: true, flex: 1.3},
			{text: "Kode Dati", dataIndex: 'fs_kode_dati', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Kota / Propinsi',
				id: 'txtCariKodePosKonsumen',
				name: 'txtCariKodePosKonsumen',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodePos.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari5.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePosPenanggungJawab').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPenanggungJawab').setValue(record.get('fs_nama_dati'));
				winCari5.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid5
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos.load();
				vMask.show();
			}
		}
	});

	var winGrid6 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupKodePos,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pos", dataIndex: 'fs_kodepos', menuDisabled: true, flex: 0.5},
			{text: "Kelurahan", dataIndex: 'fs_kelurahan', menuDisabled: true, flex: 1},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan', menuDisabled: true, flex: 1},
			{text: "Kota", dataIndex: 'fs_nama_dati', menuDisabled: true, flex: 1},
			{text: "Propinsi", dataIndex: 'fs_propinsi', menuDisabled: true, flex: 1.3},
			{text: "Kode Dati", dataIndex: 'fs_kode_dati', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Kota / Propinsi',
				id: 'txtCariKodePosKonsumen',
				name: 'txtCariKodePosKonsumen',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodePos.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari6.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePosKorespondensi').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaKorespondensi').setValue(record.get('fs_nama_dati'));
				winCari6.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari6 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid6
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos.load();
				vMask.show();
			}
		}
	});

	// POPUP TAB FORM DATA KENDARAAN
	var winGrid7 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupModelKendaraan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Model Kendaraan", dataIndex: 'fs_model_kendaraan', menuDisabled: true, flex: 1.5},
			{text: "Jenis Kendaraan", dataIndex: 'fs_jenis_kendaraan', menuDisabled: true, flex: 1},
			{text: "Merek Kendaraan", dataIndex: 'fs_merek_kendaraan', menuDisabled: true, flex: 1},
			{text: "Silinder Kendaraan", dataIndex: 'fs_silinder_kendaraan', menuDisabled: true, flex: 1},
			{text: "Kode Baru", dataIndex: 'fs_kode_kendaraan', menuDisabled: true, hidden: true},
			{text: "Kode Lama", dataIndex: 'fs_kode_kendaraan_lama', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Model / Jenis / Merek / Silinder',
				id: 'txtCariKendaraan',
				name: 'txtCariKendaraan',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupModelKendaraan.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupModelKendaraan,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari7.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboModelKendaraan').setValue(record.get('fs_model_kendaraan'));
				Ext.getCmp('txtKdKendaraan').setValue(record.get('fs_kode_kendaraan'));
				Ext.getCmp('txtJnsKendaraan').setValue(record.get('fs_jenis_kendaraan'));
				Ext.getCmp('txtSilinder').setValue(record.get('fs_silinder_kendaraan'));
				winCari7.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari7 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid7
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupModelKendaraan.load();
				vMask.show();
			}
		}
	});

	var winGrid8 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPerusahaanAsuransi,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Asuransi 1", dataIndex: 'fs_kode_asuransi1', menuDisabled: true, hidden: true},
			{text: "Kode Asuransi 2", dataIndex: 'fs_kode_asuransi2', menuDisabled: true, hidden: true},
			{text: "Nama Perusahaan Asuransi", dataIndex: 'fs_nama_perusahaan_asuransi', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Perusahaan',
				id: 'txtCariAsuransi',
				name: 'txtCariAsuransi',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupPerusahaanAsuransi.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerusahaanAsuransi,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari8.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboPerusahaanAsuransi').setValue(record.get('fs_nama_perusahaan_asuransi'));
				Ext.getCmp('txtKdAsuransi1').setValue(record.get('fs_kode_asuransi1'));
				Ext.getCmp('txtKdAsuransi2').setValue(record.get('fs_kode_asuransi2'));
				winCari8.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari8 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid8
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerusahaanAsuransi.load();
				vMask.show();
			}
		}
	});

	var winGrid9 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPlatKendaraan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Plat", dataIndex: 'fs_kode_plat', menuDisabled: true, flex: 1},
			{text: "Wilayah", dataIndex: 'fs_wilayah', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Wilayah',
				id: 'txtCariPlat',
				name: 'txtCariPlat',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupPlatKendaraan.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPlatKendaraan,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari9.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboNoPolisi').setValue(record.get('fs_kode_plat'));
				winCari9.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari9 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid9
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPlatKendaraan.load();
				vMask.show();
			}
		}
	});

	var winGrid10 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupDealer,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode 1", dataIndex: 'fs_kode_dealer1', menuDisabled: true, flex: 0.3},
			{text: "Kode 2", dataIndex: 'fs_kode_dealer2', menuDisabled: true, flex: 0.3},
			{text: "Nama Dealer", dataIndex: 'fs_nama_dealer', menuDisabled: true, flex: 2},
			{text: "Kota Dealer", dataIndex: 'fs_kota_dealer', menuDisabled: true, flex: 1},
			{text: "Cabang Dealer", dataIndex: 'fn_cabang_dealer', menuDisabled: true, hidden: true},
			{text: "Nama Bank", dataIndex: 'fs_nama_bank_pencairan', menuDisabled: true, hidden: true},
			{text: "Rek Bank", dataIndex: 'fs_rekening_bank_pencairan', menuDisabled: true, hidden: true},
			{text: "A/N Bank", dataIndex: 'fs_atasnama_bank_pencairan', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dealer',
				id: 'txtCariDealer',
				name: 'txtCariDealer',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupDealer.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDealer,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari10.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboDealer').setValue(record.get('fs_nama_dealer'));
				Ext.getCmp('txtKdDealer1').setValue(record.get('fs_kode_dealer1'));
				Ext.getCmp('txtKdDealer2').setValue(record.get('fs_kode_dealer2'));
				Ext.getCmp('txtCabangDealer').setValue(record.get('fn_cabang_dealer'));
				Ext.getCmp('txtNamaBank').setValue(record.get('fs_nama_bank_pencairan'));
				Ext.getCmp('txtNoRekeningCair').setValue(record.get('fs_rekening_bank_pencairan'));
				Ext.getCmp('txtNamaRekeningCair').setValue(record.get('fs_atasnama_bank_pencairan'));
				winCari10.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari10 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid10
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDealer.load();
				vMask.show();
			}
		}
	});

	// POPUP TAB FORM DATA PENGURUS
	var winGrid11= Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupKodePos,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pos", dataIndex: 'fs_kodepos', menuDisabled: true, flex: 0.5},
			{text: "Kelurahan", dataIndex: 'fs_kelurahan', menuDisabled: true, flex: 1},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan', menuDisabled: true, flex: 1},
			{text: "Kota", dataIndex: 'fs_nama_dati', menuDisabled: true, flex: 1},
			{text: "Propinsi", dataIndex: 'fs_propinsi', menuDisabled: true, flex: 1.3},
			{text: "Kode Dati", dataIndex: 'fs_kode_dati', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Kelurahan / Kecamatan / Kota / Propinsi',
				id: 'txtCariKodePosPengurus',
				name: 'txtCariKodePosPengurus',
				xtype: 'textfield'
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupKodePos.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKodePos,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari11.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePosPengurus').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPengurus').setValue(record.get('fs_nama_dati'));
				winCari11.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari11 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid11
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKodePos.load();
				vMask.show();
			}
		}
	});

	// GRID PENGURUS
	var gridPengurus = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupPengurus,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'No. APK',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Jabatan',
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nama Pengurus',
			dataIndex: 'fs_nama_pengurus',
			menuDisabled: true,
			flex: 2
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str1 = grid.getStore().getAt(rowIndex).get('fn_no_apk');
					var str2 = grid.getStore().getAt(rowIndex).get('fs_kode_jabatan');
					var str3 = grid.getStore().getAt(rowIndex).get('fs_nama_pengurus');
					if (str1 && str2 && str3) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
			            	icon: Ext.Msg.QUESTION,
			            	fn: function(btn){
			            		if (btn == "yes") {
			            			Ext.Ajax.request({
			            				url : 'apkbadanusaha/removepengurus/',
			            				params : {
											'fn_no_apk': str1,
											'fs_kode_jabatan': str2,
											'fs_nama_pengurus': str3
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'MFAS'
											});
											fnResetDataPengurus();
											grupPengurus.load();  
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'MFAS'
											});
										}
			            			});
			            		}
			            	}
						});
					}
				},
				scope: this
			}]
		},{
			text: 'Alamat Pengurus',
			dataIndex: 'fs_alamat_pengurus',
			menuDisabled: true,
			hidden: true
		},{
			text: 'KodePos',
			dataIndex: 'fs_kodepos_pengurus',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kota Pengurus',
			dataIndex: 'fs_kota_pengurus',
			menuDisabled: true,
			hidden: true
		},{
			text: 'KTP Pengurus',
			dataIndex: 'fs_ktp_pengurus',
			menuDisabled: true,
			hidden: true
		},{
			text: 'NPWP Pengurus',
			dataIndex: 'fs_npwp_pengurus',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Persen Saham',
			dataIndex: 'fn_persen_saham',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Aktif',
			dataIndex: 'fs_aktif',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 2.8,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Pengurus',
				id: 'txtCariPengurus',
				name: 'txtCariPengurus',
				xtype: 'textfield'
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupPengurus.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPengurus
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboJabatan').setValue(record.get('fs_kode_jabatan'));
				Ext.getCmp('txtNamaPengurus').setValue(record.get('fs_nama_pengurus'));
				Ext.getCmp('txtAlamatPengurus').setValue(record.get('fs_alamat_pengurus'));
				Ext.getCmp('cboKodePosPengurus').setValue(record.get('fs_kodepos_pengurus'));
				Ext.getCmp('txtKotaPengurus').setValue(record.get('fs_kota_pengurus'));
				Ext.getCmp('txtNoKTPPengurus').setValue(record.get('fs_ktp_pengurus'));
				Ext.getCmp('txtNoNPWPPengurus').setValue(record.get('fs_npwp_pengurus'));
				Ext.getCmp('txtSahamPersentase').setValue(record.get('fn_persen_saham'));
				Ext.getCmp('cboAktif').setValue(record.get('fs_aktif'));
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM DATA UTAMA
	var txtNoAPK = {
		anchor: '100%',
		fieldLabel: 'No. APK',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNoAPK',
		name: 'txtNoAPK',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '10',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboTglAPK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal. APK',
		format: 'd-m-Y',
		id: 'cboTglAPK',
		name: 'cboTglAPK',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -75),
		xtype: 'datefield',
		value: new Date()
	};

	var cboLembaga = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Lembaga Pembiayaan',
		fieldLabel: 'Lembaga Pembiayaan',
		editable: false,
		id: 'cboLembaga',
		name: 'cboLembaga',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari1.show();
					winCari1.center();
				}
			}
		}
	};

	var txtKdLembaga1 = {
		id: 'txtKdLembaga1',
		name: 'txtKdLembaga1',
		xtype: 'textfield',
		hidden: true
	};

	var txtKdLembaga2 = {
		id: 'txtKdLembaga2',
		name: 'txtKdLembaga2',
		xtype: 'textfield',
		hidden: true
	};

	var cboJnsUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis',
		id: 'cboJnsUsaha',
		name: 'cboJnsUsaha',
		store: grupJenisUsaha,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboBentukUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis Usaha',
		id: 'cboBentukUsaha',
		name: 'cboBentukUsaha',
		store: grupBentukUsaha,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboJnsPiutang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis Piutang',
		id: 'cboJnsPiutang',
		name: 'cboJnsPiutang',
		store: grupJenisPiutang,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboPolaTransaksi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Pola Transaksi',
		id: 'cboPolaTransaksi',
		name: 'cboPolaTransaksi',
		store: grupPolaTrans,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNoPJJ = {
		anchor: '100%',
		fieldLabel: 'No. PJJ',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNoPJJ',
		name: 'txtNoPJJ',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '10',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboFleet = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Fleet',
		id: 'cboFleet',
		name: 'cboFleet',
		store: grupFleet,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNamaBadanUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Badan Usaha',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaBadanUsaha',
		name: 'txtNamaBadanUsaha',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatBadanUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Badan Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatBadanUsaha',
		name: 'txtAlamatBadanUsaha',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePos = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Kode Pos',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePos',
		name: 'cboKodePos',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari3.show();
					winCari3.center();
				}
			}
		}
	};

	var txtKdDati = {
		id: 'txtKdDati',
		name: 'txtKdDati',
		xtype: 'textfield',
		hidden: true
	};

	var txtPropinsi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Propinsi',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtPropinsi',
		name: 'txtPropinsi',
		xtype: 'textfield'
	};

	var txtKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKota',
		name: 'txtKota',
		xtype: 'textfield'
	};

	var txtKecamatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kecamatan',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKecamatan',
		name: 'txtKecamatan',
		xtype: 'textfield'
	};

	var txtKelurahan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kelurahan',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKelurahan',
		name: 'txtKelurahan',
		xtype: 'textfield'
	};

	var txtNoNPWP = {
		anchor: '100%',
		fieldLabel: 'NPWP Badan Usaha',
		emptyText: '',
		id: 'txtNoNPWP',
		name: 'txtNoNPWP',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '20',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoSIUP = {
		anchor: '100%',
		fieldLabel: 'No. SIUP',
		emptyText: '',
		id: 'txtNoSIUP',
		name: 'txtNoSIUP',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '20',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoTDP = {
		anchor: '100%',
		fieldLabel: 'No. TDP',
		emptyText: '',
		id: 'txtNoTDP',
		name: 'txtNoTDP',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '20',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoTlpBadanUsaha = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		emptyText: '',
		id: 'txtNoTlpBadanUsaha',
		name: 'txtNoTlpBadanUsaha',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtEmail = {
		anchor: '100%',
		fieldLabel: 'Email Badan Usaha',
		id: 'txtEmail',
		name: 'txtEmail',
		xtype: 'textfield'
	};

	var txtGroupUsaha = {
		anchor: '100%',
		fieldLabel: 'Group Usaha',
		id: 'txtGroupUsaha',
		name: 'txtGroupUsaha',
		xtype: 'textfield'
	};

	// COMPONENT FORM DATA BADAN USAHA
	var txtNoAPKTab3 = {
		id: 'txtNoAPKTab3',
		name: 'txtNoAPKTab3',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoTlpPerusahaan = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		emptyText: '',
		id: 'txtNoTlpPerusahaan',
		name: 'txtNoTlpPerusahaan',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboKategoriUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Kategori Usaha',
		fieldLabel: 'Kategori Usaha',
		editable: false,
		id: 'cboKategoriUsaha',
		name: 'cboKategoriUsaha',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari4.show();
					winCari4.center();
				}
			}
		}
	};

	var txtKdKategoriUsaha = {
		id: 'txtKdKategoriUsaha',
		name: 'txtKdKategoriUsaha',
		xtype: 'textfield',
		hidden: true
	};

	var cboSkalaPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Skala Perusahaan',
		id: 'cboSkalaPerusahaan',
		name: 'cboSkalaPerusahaan',
		store: grupSkala,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboStatusUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status Usaha',
		id: 'cboStatusUsaha',
		name: 'cboStatusUsaha',
		store: grupStatusUsaha,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboBentukUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Bentuk Usaha',
		id: 'cboBentukUsaha',
		name: 'cboBentukUsaha',
		store: grupBentukUsaha,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboStatusTempatUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status Tempat Usaha',
		id: 'cboStatusTempatUsaha',
		name: 'cboStatusTempatUsaha',
		store: grupStatusTempat,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtOperasiSejak = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Operasi Sejak',
		emptyText: '1987',
		id: 'txtOperasiSejak',
		name: 'txtOperasiSejak',
		xtype: 'textfield'
	};

	var txtJumlahKaryawan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Jumlah Karyawan',
		emptyText: '200',
		id: 'txtJumlahKaryawan',
		name: 'txtJumlahKaryawan',
		xtype: 'textfield'
	};

	var txtKetUsaha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Keterangan Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKetUsaha',
		name: 'txtKetUsaha',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtOmsetPerBulan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Omset per Bulan',
		emptyText: '',
		id: 'txtOmsetPerBulan',
		name: 'txtOmsetPerBulan',
		xtype: 'textfield'
	};

	var txtBiayaPerBulan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Biaya per Bulan',
		emptyText: '',
		id: 'txtBiayaPerBulan',
		name: 'txtBiayaPerBulan',
		xtype: 'textfield'
	};

	var txtNamaPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaPenanggungJawab',
		name: 'txtNamaPenanggungJawab',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtJabatanPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Jabatan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtJabatanPenanggungJawab',
		name: 'txtJabatanPenanggungJawab',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoKTPPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. KTP',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNoKTPPenanggungJawab',
		name: 'txtNoKTPPenanggungJawab',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoNPWPPenanggungJawab = {
		anchor: '100%',
		fieldLabel: 'NPWP',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNoNPWPPenanggungJawab',
		name: 'txtNoNPWPPenanggungJawab',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatPenanggungJawab',
		name: 'txtAlamatPenanggungJawab',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePosPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Kode Pos',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePosPenanggungJawab',
		name: 'cboKodePosPenanggungJawab',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari5.show();
					winCari5.center();
				}
			}
		}
	};

	var txtKotaPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKotaPenanggungJawab',
		name: 'txtKotaPenanggungJawab',
		xtype: 'textfield'
	};

	var txtTeleponPenanggungJawab = {
		anchor: '100%',
		fieldLabel: 'Telepon',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtTeleponPenanggungJawab',
		name: 'txtTeleponPenanggungJawab',
		xtype: 'textfield'
	};

	var txtHandphonePenanggungJawab = {
		anchor: '100%',
		fieldLabel: 'Handphone',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtHandphonePenanggungJawab',
		name: 'txtHandphonePenanggungJawab',
		xtype: 'textfield'
	};

	var cboRepeatOrder = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Repeat Order',
		id: 'cboRepeatOrder',
		name: 'cboRepeatOrder',
		store: grupRepeatOrder,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtJmlRepeatKe = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Repeat Ke',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtJmlRepeatKe',
		name: 'txtJmlRepeatKe',
		xtype: 'textfield'
	};

	var txtAlamatKorespondensi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Korespondensi',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatKorespondensi',
		name: 'txtAlamatKorespondensi',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePosKorespondensi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Kode Pos',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePosKorespondensi',
		name: 'cboKodePosKorespondensi',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari6.show();
					winCari6.center();
				}
			}
		}
	};

	var txtKotaKorespondensi = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKotaKorespondensi',
		name: 'txtKotaKorespondensi',
		xtype: 'textfield'
	};

	// COMPONENT FORM DATA KENDARAAN
	var txtNoAPKTab4 = {
		id: 'txtNoAPKTab4',
		name: 'txtNoAPKTab4',
		xtype: 'textfield',
		hidden: true
	};

	var cboModelKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Model Kendaraan',
		fieldLabel: 'Model Kendaraan',
		editable: false,
		id: 'cboModelKendaraan',
		name: 'cboModelKendaraan',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari7.show();
					winCari7.center();
				}
			}
		}
	};

	var txtKdKendaraan = {
		id: 'txtKdKendaraan',
		name: 'txtKdKendaraan',
		xtype: 'textfield',
		hidden: true
	};

	var txtJnsKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtJnsKendaraan',
		name: 'txtJnsKendaraan',
		xtype: 'textfield'
	};

	var txtSilinder = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Silinder',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtSilinder',
		name: 'txtSilinder',
		xtype: 'textfield'
	};

	var txtTahunKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Tahun Kendaraan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtTahunKendaraan',
		name: 'txtTahunKendaraan',
		xtype: 'textfield'
	};

	var txtWarnaKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Warna Kendaraan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtWarnaKendaraan',
		name: 'txtWarnaKendaraan',
		xtype: 'textfield'
	};

	var txtNoRangka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Rangka',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoRangka',
		name: 'txtNoRangka',
		xtype: 'textfield'
	};

	var txtNoMesin = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Mesin',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoMesin',
		name: 'txtNoMesin',
		xtype: 'textfield'
	};

	var cboSesuaiKontrak = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Nama Sesuai Kontrak',
		id: 'cboSesuaiKontrak',
		name: 'cboSesuaiKontrak',
		store: grupSesuai,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNamaBPKP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama di BPKB',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaBPKP',
		name: 'txtNamaBPKP',
		xtype: 'textfield'
	};

	var txtAlamatBPKP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat BPKB',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatBPKP',
		name: 'txtAlamatBPKP',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoBPKP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. BPKB',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoBPKP',
		name: 'txtNoBPKP',
		xtype: 'textfield'
	};

	var cboKomersil = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Komersil',
		id: 'cboKomersil',
		name: 'cboKomersil',
		store: grupKomersil,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboNoPolisi = {
		anchor: '95%',
		fieldLabel: 'No. Polisi',
		editable: false,
		id: 'cboNoPolisi',
		name: 'cboNoPolisi',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari9.show();
					winCari9.center();
				}
			}
		}
	};

	var txtNomorPolisi = {
		anchor: '95%',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '4 ANGKA',
		id: 'txtNomorPolisi',
		name: 'txtNomorPolisi',
		maxLength: 4,
		xtype: 'numberfield',
		enforceMaxLength: true
	};

	var txtNoBlkPolisi = {
		anchor: '95%',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '3 HURUF',
		id: 'txtNoBlkPolisi',
		name: 'txtNoBlkPolisi',
		maskRe: /[a-z,A-Z]/,
		maxLength: 3,
		xtype: 'textfield',
		enforceMaxLength: true
	};

	var cboJnsAsuransi = {
		anchor: '100%',
		fieldLabel: 'Jenis Asuransi',
		editable: false,
		id: 'cboJnsAsuransi',
		name: 'cboJnsAsuransi',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {

				}
			}
		}
	};

	var cboPerusahaanAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Perusahaan Asuransi',
		editable: false,
		id: 'cboPerusahaanAsuransi',
		name: 'cboPerusahaanAsuransi',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari8.show();
					winCari8.center();
				}
			}
		}
	};

	var txtKdAsuransi1 = {
		id: 'txtKdAsuransi1',
		name: 'txtKdAsuransi1',
		xtype: 'textfield',
		hidden: true
	};

	var txtKdAsuransi2 = {
		id: 'txtKdAsuransi2',
		name: 'txtKdAsuransi2',
		xtype: 'textfield',
		hidden: true
	};

	var cboDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Dealer',
		editable: false,
		id: 'cboDealer',
		name: 'cboDealer',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari10.show();
					winCari10.center();
				}
			}
		}
	};

	var txtKdDealer1 = {
		id: 'txtKdDealer1',
		name: 'txtKdDealer1',
		xtype: 'textfield',
		hidden: true
	};

	var txtKdDealer2 = {
		id: 'txtKdDealer2',
		name: 'txtKdDealer2',
		xtype: 'textfield',
		hidden: true
	};

	var txtCabangDealer = {
		id: 'txtCabangDealer',
		name: 'txtCabangDealer',
		xtype: 'textfield',
		hidden: true
	};

	var txtSales = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Sales',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtSales',
		name: 'txtSales',
		xtype: 'textfield'
	};

	// COMPONENT FORM DATA STRUKTUR KREDIT
	var txtNoAPKTab5 = {
		id: 'txtNoAPKTab5',
		name: 'txtNoAPKTab5',
		xtype: 'textfield',
		hidden: true
	};

	var cboPolaAngsuran = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Pola Angsuran',
		id: 'cboPolaAngsuran',
		name: 'cboPolaAngsuran',
		store: grupPolaAngs,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboCaraBayar = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Cara Bayar',
		id: 'cboCaraBayar',
		name: 'cboCaraBayar',
		store: grupCaraBayar,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtTdkAngsuran = {
		anchor: '100%',
		fieldLabel: 'Tdk Angsuran',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtTdkAngsuran',
		name: 'txtTdkAngsuran',
		xtype: 'textfield'
	};

	var cboAngsuranDimuka = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Dimuka',
		id: 'cboAngsuranDimuka',
		name: 'cboAngsuranDimuka',
		store: grupDimuka,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtKali = {
		anchor: '100%',
		fieldLabel: 'Kali',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKali',
		name: 'txtKali',
		xtype: 'textfield'
	};

	var cboPotongPencairan = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Potong Pencairan',
		id: 'cboPotongPencairan',
		name: 'cboPotongPencairan',
		store: grupPotongPencairan,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtHargaOTR = {
		anchor: '100%',
		fieldLabel: 'Harga OTR',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtHargaOTR',
		name: 'txtHargaOTR',
		xtype: 'textfield'
	};

	var txtTenor = {
		anchor: '100%',
		fieldLabel: 'Tenor',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtTenor',
		name: 'txtTenor',
		xtype: 'textfield'
	};

	var checkTJH = {

	};

	var txtTotalDP = {
		anchor: '100%',
		fieldLabel: 'Total DP',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtTotalDP',
		name: 'txtTotalDP',
		xtype: 'textfield'
	};

	var txtAngsuran = {
		anchor: '100%',
		fieldLabel: 'Angsuran',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtAngsuran',
		name: 'txtAngsuran',
		xtype: 'textfield'
	};

	var txtBiayaADM = {
		anchor: '100%',
		fieldLabel: 'Biaya ADM',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtBiayaADM',
		name: 'txtBiayaADM',
		xtype: 'textfield'
	};

	var txtPremiAsuransi = {
		anchor: '100%',
		fieldLabel: 'Premi Asuransi',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPremiAsuransi',
		name: 'txtPremiAsuransi',
		xtype: 'textfield'
	};

	var txtPremiPerluasan = {
		anchor: '100%',
		fieldLabel: 'Premi Perluasan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPremiPerluasan',
		name: 'txtPremiPerluasan',
		xtype: 'textfield'
	};

	var txtBiayaTJH = {
		anchor: '100%',
		fieldLabel: 'Biaya TJH',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtBiayaTJH',
		name: 'txtBiayaTJH',
		xtype: 'textfield'
	};

	var txtPremiAssGross = {
		anchor: '100%',
		fieldLabel: 'Premi Ass Gross',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPremiAssGross',
		name: 'txtPremiAssGross',
		xtype: 'textfield'
	};

	var txtAngsuranDimuka = {
		anchor: '100%',
		fieldLabel: 'Angsuran Dimuka',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtAngsuranDimuka',
		name: 'txtAngsuranDimuka',
		xtype: 'textfield'
	};

	var txtUangMuka = {
		anchor: '100%',
		fieldLabel: 'Uang Muka',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtUangMuka',
		name: 'txtUangMuka',
		xtype: 'textfield'
	};

	var txtPremiAssNet = {
		anchor: '100%',
		fieldLabel: 'Premi Ass Net',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtPremiAssNet',
		name: 'txtPremiAssNet',
		xtype: 'textfield'
	};

	var cboAngsDibayarDealer = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Angs Dibayar Dealer',
		id: 'cboAngsDibayarDealer',
		name: 'cboAngsDibayarDealer',
		store: grupAngsDibayarDealer,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	// COMPONENT FORM DATA PENGURUS
	var txtNoAPKTab6 = {
		id: 'txtNoAPKTab6',
		name: 'txtNoAPKTab6',
		xtype: 'textfield',
		hidden: true
	};

	var cboJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jabatan',
		id: 'cboJabatan',
		name: 'cboJabatan',
		store: grupJabatan,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNamaPengurus = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Pengurus',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaPengurus',
		name: 'txtNamaPengurus',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatPengurus = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Pengurus',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatPengurus',
		name: 'txtAlamatPengurus',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePosPengurus = {
		anchor: '100%',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePosPengurus',
		name: 'cboKodePosPengurus',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari11.show();
					winCari11.center();
				}
			}
		}
	};
	
	var txtKotaPengurus = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKotaPengurus',
		name: 'txtKotaPengurus',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoKTPPengurus = {
		anchor: '100%',
		fieldLabel: 'No. KTP',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoKTPPengurus',
		name: 'txtNoKTPPengurus',
		xtype: 'textfield'
	};

	var txtNoNPWPPengurus = {
		anchor: '100%',
		fieldLabel: 'NPWP',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoNPWPPengurus',
		name: 'txtNoNPWPPengurus',
		xtype: 'textfield'
	};

	var txtSahamPersentase = {
		anchor: '100%',
		fieldLabel: 'Saham (Persentase %)',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtSahamPersentase',
		name: 'txtSahamPersentase',
		xtype: 'textfield'
	};

	var cboAktif = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Aktif',
		id: 'cboAktif',
		name: 'cboAktif',
		store: grupAktif,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var btnSavePengurus = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSavePengurus',
		name: 'btnSavePengurus',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveDataPengurus
	};

	var btnResetPengurus = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnResetPengurus',
		name: 'btnResetPengurus',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetDataPengurus
	};


	// COMPONENT FORM DATA PENCAIRAN
	var txtNoAPKTab7 = {
		id: 'txtNoAPKTab7',
		name: 'txtNoAPKTab7',
		xtype: 'textfield',
		hidden: true
	};

	var cboTglAngsuran = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Angsuran',
		format: 'd-m-Y',
		id: 'cboTglAngsuran',
		name: 'cboTglAngsuran',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -75),
		xtype: 'datefield',
		value: new Date()
	};

	var txtJatuhTempo = {
		anchor: '100%',
		fieldLabel: 'Jatuh Tempo',
		id: 'txtJatuhTempo',
		name: 'txtJatuhTempo',
		minValue: 0,
		value: 0,
		xtype: 'numberfield'
	};

	var cboTglCair = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Cair',
		format: 'd-m-Y',
		id: 'cboTglCair',
		name: 'cboTglCair',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -75),
		xtype: 'datefield',
		value: new Date()
	};

	var cboPencairanKe = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Pencairan Ke',
		id: 'cboPencairanKe',
		name: 'cboPencairanKe',
		store: grupPencairanKe,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboUangMukaKe = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Uang Muka Ke',
		id: 'cboUangMukaKe',
		name: 'cboUangMukaKe',
		store: grupUangMukaKe,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboDepositPotongCair = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Deposit Potong Cair',
		id: 'cboDepositPotongCair',
		name: 'cboDepositPotongCair',
		store: grupDepositPotong,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNamaRekeningCair = {
		anchor: '100%',
		fieldLabel: 'Nama Rekening Cair',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtNamaRekeningCair',
		name: 'txtNamaRekeningCair',
		xtype: 'textfield'
	};

	var txtNamaBank = {
		anchor: '100%',
		fieldLabel: 'Nama Bank',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtNamaBank',
		name: 'txtNamaBank',
		xtype: 'textfield'
	};

	var txtNoRekeningCair = {
		anchor: '100%',
		fieldLabel: 'No. Rekening Cair',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtNoRekeningCair',
		name: 'txtNoRekeningCair',
		xtype: 'textfield'
	};

	var lblNilaiCair = {

	};

	// FUNCTIONS PERHITUNGAN STRUKTUR KREDIT

	// FUNCTIONS TAB DATA UTAMA
	function fnResetDataUtama() {
		// FORM APK
		Ext.getCmp('txtNoAPK').setValue('');
		Ext.getCmp('cboTglAPK').setValue(new Date());
		Ext.getCmp('cboLembaga').setValue('');
		Ext.getCmp('txtKdLembaga1').setValue('');
		Ext.getCmp('txtKdLembaga2').setValue('');
		Ext.getCmp('cboJnsUsaha').setValue('');
		Ext.getCmp('cboJnsPiutang').setValue('');
		Ext.getCmp('cboPolaTransaksi').setValue('');
		Ext.getCmp('txtNoPJJ').setValue('');
		Ext.getCmp('cboFleet').setValue('');
		// FORM LOKASI BADAN USAHA
		Ext.getCmp('txtNamaBadanUsaha').setValue('');
		Ext.getCmp('txtAlamatBadanUsaha').setValue('');
		Ext.getCmp('cboKodePos').setValue('');
		Ext.getCmp('txtKdDati').setValue('');
		Ext.getCmp('txtPropinsi').setValue('');
		Ext.getCmp('txtKota').setValue('');
		Ext.getCmp('txtKecamatan').setValue('');
		Ext.getCmp('txtKelurahan').setValue('');
		// FORM IDENTITAS BADAN USAHA
		Ext.getCmp('txtNoNPWP').setValue('');
		Ext.getCmp('txtNoSIUP').setValue('');
		Ext.getCmp('txtNoTDP').setValue('');
		// FORM KONTAK BADAN USAHA
		Ext.getCmp('txtNoTlpBadanUsaha').setValue('');
		Ext.getCmp('txtEmail').setValue('');
		Ext.getCmp('txtGroupUsaha').setValue('');
	}

	function fnCekSaveDataUtama() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkbadanusaha/ceksavedatautama',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveDataUtama();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveDataUtama() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkbadanusaha/savedatautama',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
				'fs_jenis_pembiayaan': Ext.getCmp('cboJnsUsaha').getValue(),
				'fd_tgl_apk': Ext.getCmp('cboTglAPK').getValue(),
				'fs_kode_lokasi': Ext.getCmp('txtKdLembaga1').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtKdLembaga2').getValue(),
				'fs_nama_lembaga_keuangan': Ext.getCmp('cboLembaga').getValue(),
				'fs_jenis_piutang': Ext.getCmp('cboJnsPiutang').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPolaTransaksi').getValue(),
				'fs_fleet': Ext.getCmp('cboFleet').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaBadanUsaha').getValue(),
				'fs_alamat_konsumen': Ext.getCmp('txtAlamatBadanUsaha').getValue(),
				'fs_kelurahan_konsumen': Ext.getCmp('txtKelurahan').getValue(),
				'fs_kecamatan_konsumen': Ext.getCmp('txtKecamatan').getValue(),
				'fs_kode_dati_konsumen': Ext.getCmp('txtKdDati').getValue(),
				'fs_propinsi_konsumen': Ext.getCmp('txtPropinsi').getValue(),
				'fs_kota_konsumen': Ext.getCmp('txtKota').getValue(),
				'fs_kodepos_konsumen': Ext.getCmp('cboKodePos').getValue(),
				'fs_npwp_konsumen': Ext.getCmp('txtNoNPWP').getValue(),
				'fs_siup_perusahaan': Ext.getCmp('txtNoSIUP').getValue(),
				'fs_tdp_perusahaan': Ext.getCmp('txtNoTDP').getValue(),
				'fs_telepon_konsumen': Ext.getCmp('txtNoTlpBadanUsaha').getValue(),
				'fs_email_konsumen': Ext.getCmp('txtEmail').getValue(),
				'fs_group_perusahaan': Ext.getCmp('txtGroupUsaha').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				if (xtext.sukses === true) {
					// SET NO APK & NO PJJ
					Ext.getCmp('txtNoAPK').setValue(xtext.noapk);
					Ext.getCmp('txtNoPJJ').setValue(xtext.nopjj);

					// SET NO APK IN ALL TABPANEL
					Ext.getCmp('txtNoAPKTab3').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab4').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab5').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab6').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab7').setValue(xtext.noapk);

					// SET ENABLED TABPANEL
					Ext.getCmp('tab3').setDisabled(false);

					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab3');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTIONS TAB DATA BADAN USAHA
	function fnResetDataBadanUsaha() {
		// FORM PERUSAHAAN
		Ext.getCmp('txtNoAPKTab3').setValue('');
		Ext.getCmp('txtNoTlpPerusahaan').setValue('');
		Ext.getCmp('cboKategoriUsaha').setValue('');
		Ext.getCmp('txtKdKategoriUsaha').setValue('');
		Ext.getCmp('cboSkalaPerusahaan').setValue('');
		Ext.getCmp('cboStatusUsaha').setValue('');
		Ext.getCmp('cboBentukUsaha').setValue('');
		Ext.getCmp('cboStatusTempatUsaha').setValue('');
		Ext.getCmp('txtOperasiSejak').setValue('');
		Ext.getCmp('txtJumlahKaryawan').setValue('');
		Ext.getCmp('txtKetUsaha').setValue('');
		Ext.getCmp('txtOmsetPerBulan').setValue('');
		Ext.getCmp('txtBiayaPerBulan').setValue('');
		// FORM PENANGGUNG JAWAB
		Ext.getCmp('txtNamaPenanggungJawab').setValue('');
		Ext.getCmp('txtJabatanPenanggungJawab').setValue('');
		Ext.getCmp('txtNoKTPPenanggungJawab').setValue('');
		Ext.getCmp('txtNoNPWPPenanggungJawab').setValue('');
		Ext.getCmp('txtAlamatPenanggungJawab').setValue('');
		Ext.getCmp('cboKodePosPenanggungJawab').setValue('');
		Ext.getCmp('txtKotaPenanggungJawab').setValue('');
		Ext.getCmp('txtTeleponPenanggungJawab').setValue('');
		Ext.getCmp('txtHandphonePenanggungJawab').setValue('');
		// FORM LAIN - LAIN
		Ext.getCmp('cboRepeatOrder').setValue('');
		Ext.getCmp('txtJmlRepeatKe').setValue('');
		// FORM ALAMAT SURAT
		Ext.getCmp('txtAlamatKorespondensi').setValue('');
		Ext.getCmp('cboKodePosKorespondensi').setValue('');
		Ext.getCmp('txtKotaKorespondensi').setValue('');
	}

	function fnCekSaveDataBadanUsaha() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkbadanusaha/ceksavebadanusaha',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab3').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveDataBadanUsaha();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveDataBadanUsaha() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkbadanusaha/savebadanusaha',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab3').getValue(),
				'fs_telfon_usaha_konsumen': Ext.getCmp('txtNoTlpPerusahaan').getValue(),
				'fs_status_perusahaan':  Ext.getCmp('cboStatusUsaha').getValue(),
				'fs_bentuk_perusahaan': Ext.getCmp('cboBentukUsaha').getValue(),
				'fs_tempat_perusahaan': Ext.getCmp('cboStatusTempatUsaha').getValue(),
				'fs_beroperasi_sejak': Ext.getCmp('txtOperasiSejak').getValue(),
				'fs_skala_perusahaan_konsumen': Ext.getCmp('cboSkalaPerusahaan').getValue(),
				'fs_nama_usaha_konsumen': Ext.getCmp('cboKategoriUsaha').getValue(),
				'fs_kategori_usaha_konsumen': Ext.getCmp('txtKdKategoriUsaha').getValue(),
				'fn_jumlah_karyawan_perusahaan': Ext.getCmp('txtJumlahKaryawan').getValue(),
				'fs_keterangan_usaha_konsumen': Ext.getCmp('txtKetUsaha').getValue(),
				'fn_pendapatan_konsumen': Ext.getCmp('txtOmsetPerBulan').getValue(),
				'fn_biaya_konsumen': Ext.getCmp('txtBiayaPerBulan').getValue(),
				'fn_mutasi_debet': '',
				'fn_mutasi_kredit': '',
				'fs_penanggungjawab_perusahaan': Ext.getCmp('txtNamaPenanggungJawab').getValue(),
				'fs_jabatan_penanggungjawab_perusahaan': Ext.getCmp('txtJabatanPenanggungJawab').getValue(),
				'fs_ktp_penanggungjawab_perusahaan': Ext.getCmp('txtNoKTPPenanggungJawab').getValue(),
				'fs_npwp_penanggungjawab_perusahaan': Ext.getCmp('txtNoNPWPPenanggungJawab').getValue(),
				'fs_alamat_penanggungjawab_perusahaan': Ext.getCmp('txtAlamatPenanggungJawab').getValue(),
				'fs_kodepos_penanggungjawab_perusahaan': Ext.getCmp('cboKodePosPenanggungJawab').getValue(),
				'fs_kota_penanggungjawab_perusahaan': Ext.getCmp('txtKotaPenanggungJawab').getValue(),
				'fs_telepon_penanggungjawab_perusahaan': Ext.getCmp('txtTeleponPenanggungJawab').getValue(),
				'fs_handphone_penanggungjawab_perusahaan': Ext.getCmp('txtHandphonePenanggungJawab').getValue(),
				'fs_alamat_korespondensi': Ext.getCmp('txtAlamatKorespondensi').getValue(),
				'fs_kodepos_korespondensi': Ext.getCmp('cboKodePosKorespondensi').getValue(),
				'fs_kota_korespondensi': Ext.getCmp('txtKotaKorespondensi').getValue(),
				'fs_repeat_order': Ext.getCmp('cboRepeatOrder').getValue(),
				'fs_repeat_order_ke': Ext.getCmp('txtJmlRepeatKe').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				if (xtext.sukses === true) {
					// SET ENABLED TABPANEL
					Ext.getCmp('tab4').setDisabled(false);

					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab4');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTIONS TAB DATA KENDARAAN
	function fnResetDataKendaraan() {
		// FORM KENDARAAN
		Ext.getCmp('txtNoAPKTab4').setValue('');
		Ext.getCmp('cboModelKendaraan').setValue('');
		Ext.getCmp('txtKdKendaraan').setValue('');
		Ext.getCmp('txtJnsKendaraan').setValue('');
		Ext.getCmp('txtSilinder').setValue('');
		Ext.getCmp('txtTahunKendaraan').setValue('');
		Ext.getCmp('txtWarnaKendaraan').setValue('');
		Ext.getCmp('txtNoRangka').setValue('');
		Ext.getCmp('txtNoMesin').setValue('');
		Ext.getCmp('cboKomersil').setValue('');
		// FORM BPKB
		Ext.getCmp('cboSesuaiKontrak').setValue('');
		Ext.getCmp('txtNamaBPKP').setValue('');
		Ext.getCmp('txtAlamatBPKP').setValue('');
		Ext.getCmp('txtNoBPKP').setValue('');
		Ext.getCmp('cboNoPolisi').setValue('');
		Ext.getCmp('txtNomorPolisi').setValue('');
		Ext.getCmp('txtNoBlkPolisi').setValue('');
		// FORM ASURANSI
		Ext.getCmp('cboJnsAsuransi').setValue('');
		Ext.getCmp('cboPerusahaanAsuransi').setValue('');
		Ext.getCmp('txtKdAsuransi1').setValue('');
		Ext.getCmp('txtKdAsuransi2').setValue('');
		// FORM DEALER
		Ext.getCmp('cboDealer').setValue('');
		Ext.getCmp('txtKdDealer1').setValue('');
		Ext.getCmp('txtKdDealer2').setValue('');
		Ext.getCmp('txtCabangDealer').setValue('');
		Ext.getCmp('txtSales').setValue('');
	}

	function fnCekSaveDataKendaraan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkbadanusaha/ceksavedatakendaraan',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab4').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveDataKendaraan();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveDataKendaraan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkbadanusaha/savedatakendaraan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab4').getValue(),
				'fs_model_kendaraan': Ext.getCmp('cboModelKendaraan').getValue(),
				'fs_kode_kendaraan': Ext.getCmp('txtKdKendaraan').getValue(),
				'fs_jenis_kendaraan': Ext.getCmp('txtJnsKendaraan').getValue(),
				'fs_silinder_kendaraan': Ext.getCmp('txtSilinder').getValue(),
				'fn_tahun_kendaraan': Ext.getCmp('txtTahunKendaraan').getValue(),
				'fs_warna_kendaraan': Ext.getCmp('txtWarnaKendaraan').getValue(),
				'fs_no_rangka': Ext.getCmp('txtNoRangka').getValue(),
				'fs_no_mesin': Ext.getCmp('txtNoMesin').getValue(),
				'fs_komersial': Ext.getCmp('cboKomersil').getValue(),
				'fs_nama_sesuai_kontrak': Ext.getCmp('cboSesuaiKontrak').getValue(),
				'fs_nama_bpkb': Ext.getCmp('txtNamaBPKP').getValue(),
				'fs_alamat_bpkb': Ext.getCmp('txtAlamatBPKP').getValue(),
				'fs_nomor_bpkb': Ext.getCmp('txtNoBPKP').getValue(),
				'fs_no_polisi': Ext.getCmp('txtNomorPolisi').getValue(),
				'fs_kode_wilayah_no_polisi': Ext.getCmp('cboNoPolisi').getValue(),
				'fs_kode_akhir_wilayah_no_polisi': Ext.getCmp('txtNoBlkPolisi').getValue(),
				'fs_salesman': Ext.getCmp('txtSales').getValue(),
				'fs_jenis_asuransi': Ext.getCmp('cboJnsAsuransi').getValue(),
				'fs_nama_perusahaan_asuransi': Ext.getCmp('cboPerusahaanAsuransi').getValue(),
				'fs_kode_asuransi1': Ext.getCmp('txtKdAsuransi1').getValue(),
				'fs_kode_asuransi2': Ext.getCmp('txtKdAsuransi2').getValue(),
				'fs_nama_dealer': Ext.getCmp('cboDealer').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKdDealer1').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtKdDealer2').getValue(),
				'fn_cabang_dealer': Ext.getCmp('txtCabangDealer').getValue(),
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				if (xtext.sukses === true) {
					// SET ENABLED TABPANEL
					Ext.getCmp('tab5').setDisabled(false);

					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab5');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTIONS TAB DATA STRUKTUR KREDIT
	function fnResetDataStrukturKredit() {
		Ext.getCmp('txtNoAPKTab5').setValue('');
		Ext.getCmp('cboPolaAngsuran').setValue('');
		Ext.getCmp('cboAngsuranDimuka').setValue('');
		Ext.getCmp('txtHargaOTR').setValue('');
		Ext.getCmp('txtTotalDP').setValue('');

		Ext.getCmp('cboCaraBayar').setValue('');
		Ext.getCmp('cboSesuaiKontrak').setValue('');
		Ext.getCmp('txtKali').setValue('');
		Ext.getCmp('txtTenor').setValue('');
		Ext.getCmp('txtAngsuran').setValue('');

		Ext.getCmp('txtTdkAngsuran').setValue('');
		Ext.getCmp('cboPotongPencairan').setValue('');

		// FORM APLIKASI TOTAL DP
		Ext.getCmp('txtBiayaADM').setValue('');
		Ext.getCmp('txtPremiAsuransi').setValue('');
		Ext.getCmp('txtPremiPerluasan').setValue('');
		Ext.getCmp('txtBiayaTJH').setValue('');
		Ext.getCmp('txtPremiAssGross').setValue('');
		Ext.getCmp('txtUangMuka').setValue('');
		Ext.getCmp('txtPremiAssNet').setValue('');
		Ext.getCmp('cboAngsDibayarDealer').setValue('');
	}

	function fnCekSaveDataStrukturKredit() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkbadanusaha/ceksavedatastrukturkredit',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab5').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveDataStrukturKredit();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveDataStrukturKredit() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkbadanusaha/savestrukturkredit',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab5').getValue(),
				'fs_pola_angsuran': Ext.getCmp('cboPolaAngsuran').getValue(),
				'fs_cara_bayar': Ext.getCmp('cboCaraBayar').getValue(),
				'fs_angsuran_dimuka': Ext.getCmp('cboAngsuranDimuka').getValue(),
				'fn_jumlah_angsuran_dimuka': '',
				'fn_biaya_tjh': Ext.getCmp('txtBiayaTJH').getValue(),
				'fn_selisih_dp': '',
				'fs_angsuran_dimuka_potong_pencairan': Ext.getCmp('cboPotongPencairan').getValue(),
				'fn_dp_bayar': '',
				'fs_angsuran_dibayar_dealer': '',
				'fn_biaya_adm': '',
				'fn_premi_asuransi_gross': '',
				'fn_premi_asuransi': '',
				'fn_premi_asuransi_gross_perluasan': '',
				'fn_premi_asuransi_netto': '',
				'fn_denda_perhari': '',
				'fn_harga_otr': '',
				'fn_uang_muka_dealer': '',
				'fn_asuransi_dikredit_dealer': '',
				'fn_persen_bunga_flat_dealer': '',
				'fn_pokok_pembiayaan_dealer': '',
				'fn_persen_bunga_efektif_dealer': '',
				'fn_bulan_masa_angsuran_dealer': '',
				'fn_kali_masa_angsuran_dealer': '',
				'fn_bunga_dealer': '',
				'fn_angsuran_dealer': '',
				'fn_angsuran_tidak_sama_dealer': '',
				'fn_uang_muka_konsumen': '',
				'fn_asuransi_dikredit_konsumen': '',
				'fn_pokok_pembiayaan_konsumen': '',
				'fn_persen_bunga_flat_konsumen': '',
				'fn_persen_bunga_efektif_konsumen': '',
				'fn_bulan_masa_angsuran_konsumen': '',
				'fn_kali_masa_angsuran_konsumen': '',
				'fn_bunga_konsumen': '',
				'fn_angsuran_konsumen': '',
				'fn_angsuran_tidak_sama_konsumen': ''
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				if (xtext.sukses === true) {
					// SET ENABLED TABPANEL
					Ext.getCmp('tab6').setDisabled(false);

					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab6');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTIONS TAB DATA PENGURUS
	function fnResetDataPengurus() {
		Ext.getCmp('cboJabatan').setValue('');
		Ext.getCmp('txtNamaPengurus').setValue('');
		Ext.getCmp('txtAlamatPengurus').setValue('');
		Ext.getCmp('cboKodePosPengurus').setValue('');
		Ext.getCmp('txtKotaPengurus').setValue('');
		Ext.getCmp('txtNoKTPPengurus').setValue('');
		Ext.getCmp('txtNoNPWPPengurus').setValue('');
		Ext.getCmp('txtSahamPersentase').setValue('');
		Ext.getCmp('cboAktif').setValue('');
	}

	function fnCekSaveDataPengurus() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkbadanusaha/ceksavedatapengurus',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab6').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveDataPengurus();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveDataPengurus() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkbadanusaha/savedatapengurus',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab6').getValue(),
				'fs_kode_jabatan': Ext.getCmp('cboJabatan').getValue(),
				'fs_nama_pengurus': Ext.getCmp('txtNamaPengurus').getValue(),
				'fs_alamat_pengurus': Ext.getCmp('txtAlamatPengurus').getValue(),
				'fs_kodepos_pengurus': Ext.getCmp('cboKodePosPengurus').getValue(),
				'fs_kota_pengurus': Ext.getCmp('txtKotaPengurus').getValue(),
				'fs_ktp_pengurus': Ext.getCmp('txtNoKTPPengurus').getValue(),
				'fs_npwp_pengurus': Ext.getCmp('txtNoNPWPPengurus').getValue(),
				'fn_persen_saham': Ext.getCmp('txtSahamPersentase').getValue(),
				'fs_aktif': Ext.getCmp('cboAktif').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				if (xtext.sukses === true) {
					// SET ENABLED TABPANEL
					Ext.getCmp('tab7').setDisabled(false);

					// RESET & RELOAD DATA
					fnResetDataPengurus();
					grupPengurus.load();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTIONS TAB DATA PENCAIRAN
	function fnResetDataPencairan() {
		// FORM ANGSURAN
		Ext.getCmp('txtNoAPKTab7').setValue('');
		Ext.getCmp('cboTglAngsuran').setValue(new Date());
		Ext.getCmp('txtJatuhTempo').setValue('');
		// FORM PENCAIRAN
		Ext.getCmp('cboTglCair').setValue(new Date());
		Ext.getCmp('cboPencairanKe').setValue('');
		Ext.getCmp('cboUangMukaKe').setValue('');
		// FORM REKENING
		Ext.getCmp('txtNamaRekeningCair').setValue('');
		Ext.getCmp('txtNamaBank').setValue('');
		Ext.getCmp('txtNoRekeningCair').setValue('');
	}

	function fnCekSaveDataPencairan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkbadanusaha/ceksavedatapencairan',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab7').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveDataPencairan();
								}
							}
						});
					}
				},
				failure: function(response) {
					var xtext = Ext.decode(response.responseText);
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveDataPencairan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkbadanusaha/savedatapencairan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab7').getValue(),
				'fd_tanggal_perjanjian': Ext.Date.format(Ext.getCmp('cboTglCair').getValue(), 'Y-m-d'),
				'fd_tanggal_angsuran_pertama': Ext.Date.format(Ext.getCmp('cboTglAngsuran').getValue(), 'Y-m-d'),
				'fn_tanggal_jatuhtempo_perbulan': Ext.getCmp('txtJatuhTempo').getValue(),
				'fs_cair_ke': Ext.getCmp('cboPencairanKe').getValue(),
				'fs_uang_muka_bayar_di': Ext.getCmp('cboUangMukaKe').getValue(),
				'fs_deposit_potong_pencairan': Ext.getCmp('cboDepositPotongCair').getValue(),
				'fs_atasnama_bank_pencairan': Ext.getCmp('txtNamaRekeningCair').getValue(),
				'fs_nama_bank_pencairan': Ext.getCmp('txtNamaBank').getValue(),
				'fs_rekening_bank_pencairan': Ext.getCmp('txtNoRekeningCair').getValue(),
				'fn_nilai_pencairan': ''
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});

				if (xtext.sukses === true) {
					// SET RESET ALL
					fnResetAll();

					// SET DISABLED TABPANEL
					Ext.getCmp('tab3').setDisabled(true);
					Ext.getCmp('tab4').setDisabled(true);
					Ext.getCmp('tab5').setDisabled(true);
					Ext.getCmp('tab6').setDisabled(true);
					Ext.getCmp('tab7').setDisabled(true);

					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab1');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTIONS ALL
	function fnResetAll() {
		fnResetDataUtama();
		fnResetDataBadanUsaha();
		fnResetDataKendaraan();
		fnResetDataStrukturKredit();
		fnResetDataPengurus();
		fnResetDataPencairan();
	}

	var frmApkBadanUsaha = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'APK Badan Usaha',
		width: 930,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Badan Usaha',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Data APK Badan Usaha',
					xtype: 'fieldset',
					items: [
						gridBadanUsaha
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Utama',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form APK',
								xtype: 'fieldset',
								items: [
									txtNoAPK,
									cboTglAPK,
									cboJnsUsaha,
									cboLembaga,
									txtKdLembaga1,
									txtKdLembaga2,
									cboJnsPiutang,
									cboPolaTransaksi,
									txtNoPJJ,
									cboFleet
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Identitas Badan Usaha',
								xtype: 'fieldset',
								items: [
									txtNoNPWP,
									txtNoSIUP,
									txtNoTDP
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Lokasi Badan Usaha',
								xtype: 'fieldset',
								items: [
									txtNamaBadanUsaha,
									txtAlamatBadanUsaha,
									cboKodePos,
									txtKdDati,
									txtPropinsi,
									txtKota,
									txtKecamatan,
									txtKelurahan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Kontak Badan Usaha',
								xtype: 'fieldset',
								items: [
									txtNoTlpBadanUsaha,
									txtEmail,
									txtGroupUsaha
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataUtama',
					name: 'btnSaveDataUtama',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataUtama
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataUtama
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Badan Usaha',
				xtype: 'form',
				disabled: true,
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Perusahaan',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab3,
									txtNoTlpPerusahaan,
									cboKategoriUsaha,
									txtKdKategoriUsaha,
									cboSkalaPerusahaan,
									cboStatusUsaha,
									cboBentukUsaha,
									cboStatusTempatUsaha,
									txtOperasiSejak,
									txtJumlahKaryawan,
									txtKetUsaha,
									txtOmsetPerBulan,
									txtBiayaPerBulan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Lain - Lain',
								xtype: 'fieldset',
								items: [
									cboRepeatOrder,
									txtJmlRepeatKe
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Penanggung Jawab',
								xtype: 'fieldset',
								items: [
									txtNamaPenanggungJawab,
									txtJabatanPenanggungJawab,
									txtNoKTPPenanggungJawab,
									txtNoNPWPPenanggungJawab,
									txtAlamatPenanggungJawab,
									cboKodePosPenanggungJawab,
									txtKotaPenanggungJawab,
									txtTeleponPenanggungJawab,
									txtHandphonePenanggungJawab
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Alamat Surat',
								xtype: 'fieldset',
								items: [
									txtAlamatKorespondensi,
									cboKodePosKorespondensi,
									txtKotaKorespondensi
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataBadanUsaha',
					name: 'btnSaveDataBadanUsaha',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataBadanUsaha
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataBadanUsaha
				}]
			},{
				id: 'tab4',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Kendaraan',
				xtype: 'form',
				disabled: true,
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Kendaraan',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab4,
									cboModelKendaraan,
									txtKdKendaraan,
									txtJnsKendaraan,
									txtSilinder,
									txtTahunKendaraan,
									txtWarnaKendaraan,
									txtNoRangka,
									txtNoMesin,
									cboKomersil
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Asuransi',
								xtype: 'fieldset',
								items: [
									cboJnsAsuransi,
									cboPerusahaanAsuransi,
									txtKdAsuransi1,
									txtKdAsuransi2
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form BPKB',
								xtype: 'fieldset',
								items: [
									cboSesuaiKontrak,
									txtNamaBPKP,
									txtAlamatBPKP,
									txtNoBPKP,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [
												cboNoPolisi
											]
										},{
											flex: 0.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNomorPolisi
											]
										},{
											flex: 0.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtNoBlkPolisi
											]
										}]
									}
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Dealer',
								xtype: 'fieldset',
								items: [
									cboDealer,
									txtKdDealer1,
									txtKdDealer2,
									txtCabangDealer,
									txtSales
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataKendaraan',
					name: 'btnSaveDataKendaraan',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataKendaraan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataKendaraan
				}]
			},{
				id: 'tab5',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Struktur Kredit',
				xtype: 'form',
				disabled: true,
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 130,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: '',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab5,
									cboPolaAngsuran,
									cboAngsuranDimuka,
									txtHargaOTR,
									txtTotalDP
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: '',
								xtype: 'fieldset',
								items: [
									cboCaraBayar,
									txtKali,
									txtTenor,
									txtAngsuran
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: '',
								xtype: 'fieldset',
								items: [
									txtTdkAngsuran,
									cboPotongPencairan
								]
							}]
						}]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Aplikasi Total DP',
								xtype: 'fieldset',
								items: [
									txtBiayaADM,
									txtPremiAsuransi,
									txtPremiPerluasan,
									txtBiayaTJH,
									txtPremiAssGross,
									txtUangMuka,
									txtPremiAssNet,
									cboAngsDibayarDealer
								]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Hasil Perhitungan',
								xtype: 'fieldset',
								items: [

								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataStrukturKredit',
					name: 'btnSaveDataStrukturKredit',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataStrukturKredit
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataStrukturKredit
				}]
			},{
				id: 'tab6',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pengurus',
				xtype: 'form',
				disabled: true,
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pengurus',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab6,
									cboJabatan,
									txtNamaPengurus,
									txtAlamatPengurus,
									cboKodePosPengurus,
									txtKotaPengurus,
									txtNoKTPPengurus,
									txtNoNPWPPengurus,
									txtSahamPersentase,
									cboAktif
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnSavePengurus
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnResetPengurus
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Data Pengurus',
								xtype: 'fieldset',
								items: [
									gridPengurus
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab7',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pencairan',
				xtype: 'form',
				disabled: true,
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 1px;',
					border: false,
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Angsuran',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab7,
									cboTglAngsuran,
									txtJatuhTempo
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Hasil Nilai Cair',
								xtype: 'fieldset',
								items: [

								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pecairan',
								xtype: 'fieldset',
								items: [
									cboTglCair,
									cboPencairanKe,
									cboUangMukaKe,
									cboDepositPotongCair
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Rekening',
								xtype: 'fieldset',
								items: [
									txtNamaRekeningCair,
									txtNamaBank,
									txtNoRekeningCair
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataPencairan',
					name: 'btnSaveDataPencairan',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataPencairan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataPencairan
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmApkBadanUsaha
	});

	function fnMaskShow() {
		frmApkBadanUsaha.mask('Please wait...');
	}

	function fnMaskHide() {
		frmApkBadanUsaha.unmask();
	}
	
	frmApkBadanUsaha.render(Ext.getBody());
	Ext.get('loading').destroy();
});