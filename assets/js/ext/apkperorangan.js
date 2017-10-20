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

	Ext.define('DataGridPerorangan', {
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

	Ext.define('DataGridPekerjaan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_referensi', type: 'string'},
			{name: 'fs_nilai1_referensi', type: 'string'},
			{name: 'fs_nilai2_referensi', type: 'string'},
			{name: 'fs_nama_referensi', type: 'string'}
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

	var grupPerorangan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPerorangan',
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
			url: 'apkperorangan/gridperorangan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridPerorangan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 400,
		sortableColumns: false,
		store: grupPerorangan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'No. APK', dataIndex: 'fn_no_apk', menuDisabled: true, width: 90},
			{text: 'Nama Konsumen', dataIndex: 'fs_nama_konsumen', menuDisabled: true, width: 240},
			{text: 'Tanggal APK', dataIndex: 'fd_tgl_apk', menuDisabled: true, width: 90, renderer: Ext.util.Format.dateRenderer('d-m-Y')},
			{text: 'Nama Lembaga', dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, hidden: true},
			{text: 'Jenis Usaha', dataIndex: 'fs_jenis_usaha', menuDisabled: true, hidden: true},
			{text: 'Jenis Piutang', dataIndex: 'fs_jenis_piutang', menuDisabled: true, hidden: true},
			{text: 'Pola Transaksi', dataIndex: 'fs_pola_transaksi', menuDisabled: true, hidden: true},
			{text: 'No. PJJ', dataIndex: 'fs_pjj',menuDisabled: true, hidden: true},
			{text: 'Fleet', dataIndex: 'fs_fleet', menuDisabled: true, hidden: true},
			{text: 'Alamat Konsumen', dataIndex: 'fs_alamat_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kode Pos', dataIndex: 'fs_kodepos_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kode Dati', dataIndex: 'fs_kode_dati_konsumen', menuDisabled: true, hidden: true},
			{text: 'Propinsi', dataIndex: 'fs_propinsi_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kota', dataIndex: 'fs_kota_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kecamatan', dataIndex: 'fs_kecamatan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kelurahan', dataIndex: 'fs_kelurahan_konsumen', menuDisabled: true, hidden: true},
			{text: 'No. KTP', dataIndex: 'fs_ktp_konsumen', menuDisabled: true, hidden: true},
			{text: 'Tanggal Berlaku', dataIndex: 'fs_masa_ktp_konsumen', menuDisabled: true, hidden: true},
			{text: 'NPWP Konsumen', dataIndex: 'fs_npwp_konsumen', menuDisabled: true, hidden: true},
			{text: 'No. KK', dataIndex: 'fs_kartu_keluarga', menuDisabled: true, hidden: true},
			{text: 'No. Telepon', dataIndex: 'fs_telepon_konsumen', menuDisabled: true, hidden: true},
			{text: 'No. Handphone', dataIndex: 'fs_handphone_konsumen', menuDisabled: true, hidden: true},
			{text: 'Email', dataIndex: 'fs_email_konsumen', menuDisabled: true, hidden: true},
			{text: 'Nama Perusahaan', dataIndex: 'fs_nama_perusahaan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Alamat Perusahaan', dataIndex: 'fs_alamat_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'No. Tlp Perusahaan', dataIndex: 'fs_telfon_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kategori Usaha', dataIndex: 'fs_kategori_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Skala Perusahaan', dataIndex: 'fs_skala_perusahaan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kerja Sejak', dataIndex: 'fs_kerja_sejak_konsumen', menuDisabled: true, hidden: true},
			{text: 'Usaha Konsumen', dataIndex: 'fs_usaha_pekerjaan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Pendapatan', dataIndex: 'fn_pendapatan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Jenis Kelamin', dataIndex: 'fs_jenis_kelamin_konsumen', menuDisabled: true, hidden: true},
			{text: 'Tanggal Lahir', dataIndex: 'fd_tanggal_lahir_konsumen', menuDisabled: true, hidden: true},
			{text: 'Tempat Lahir', dataIndex: 'fs_tempat_lahir_konsumen', menuDisabled: true, hidden: true},
			{text: 'Status Perkawinan', dataIndex: 'fs_status_konsumen', menuDisabled: true, hidden: true},
			{text: 'Status Rumah', dataIndex: 'fs_status_rumah', menuDisabled: true, hidden: true},
			{text: 'Agama', dataIndex: 'fs_agama_konsumen', menuDisabled: true, hidden: true},
			{text: 'Pendidikan', dataIndex: 'fs_pendidikan_konsumen', menuDisabled: true, hidden: true},
			{text: 'Ibu Kandung', dataIndex: 'fs_nama_ibu_kandung', menuDisabled: true, hidden: true},
			{text: 'Alamat Surat', dataIndex: 'fs_alamat_korespondensi', menuDisabled: true, hidden: true},
			{text: 'Kode Pos Surat', dataIndex: 'fs_kodepos_korespondensi', menuDisabled: true, hidden: true},
			{text: 'Kota Surat', dataIndex: 'fs_kota_korespondensi', menuDisabled: true, hidden: true},
			{text: 'Kode Kendaraan', dataIndex: 'fs_kode_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Jenis Kendaraan', dataIndex: 'fs_jenis_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Silinder', dataIndex: 'fs_silinder_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Tahun Kendaraan', dataIndex: 'fn_tahun_kendaraan', menuDisabled: true, hidden: true},
			{text: 'Warna Kendaraan', dataIndex: 'fs_warna_kendaraan', menuDisabled: true, hidden: true},
			{text: 'No. Rangka', dataIndex: 'fs_no_rangka', menuDisabled: true, hidden: true},
			{text: 'No. Mesin', dataIndex: 'fs_no_mesin', menuDisabled: true, hidden: true},
			{text: 'Komersil', dataIndex: 'fs_komersial', menuDisabled: true, hidden: true},
			{text: 'Sesuai Kontrak', dataIndex: 'fs_nama_sesuai_kontrak', menuDisabled: true, hidden: true},
			{text: 'Nama BPKB', dataIndex: 'fs_nama_bpkb', menuDisabled: true, hidden: true},
			{text: 'Alamat BPKB', dataIndex: 'fs_alamat_bpkb', menuDisabled: true, hidden: true},
			{text: 'Kota BPKB', dataIndex: 'fs_kota_bpkb', menuDisabled: true, hidden: true},
			{text: 'No. Plat', dataIndex: 'fs_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Wilayah No. Plat', dataIndex: 'fs_kode_wilayah_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Wilayah Akhir No. Plat', dataIndex: 'fs_kode_akhir_wilayah_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Sales', dataIndex: 'fs_salesman', menuDisabled: true, hidden: true},
			{text: 'Jenis Asuransi', dataIndex: 'fs_jenis_asuransi', menuDisabled: true, hidden: true},
			{text: 'Kode Asuransi 1', dataIndex: 'fs_kode_asuransi1', menuDisabled: true, hidden: true},
			{text: 'Kode Asuransi 2', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, hidden: true},
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
			{text: 'Nama Pasangan', dataIndex: 'fs_nama_pasangan', menuDisabled: true, hidden: true},
			{text: 'Kota Pasangan', dataIndex: 'fs_kota_pasangan', menuDisabled: true, hidden: true},
			{text: 'HP Pasangan', dataIndex: 'fs_handphone_pasangan', menuDisabled: true, hidden: true},
			{text: 'Usaha Pasangan', dataIndex: 'fs_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Ket. Usaha Pasangan', dataIndex: 'fs_keterangan_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Alamat Usaha Pasangan', dataIndex: 'fs_alamat_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Telp. Usaha Pasangan', dataIndex: 'fs_telepon_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Pendapatan Pasangan', dataIndex: 'fn_pendapatan_pasangan', menuDisabled: true, hidden: true},
			{text: 'Nama Penjamin', dataIndex: 'fs_nama_penjamin', menuDisabled: true, hidden: true},
			{text: 'Alamat Penjamin', dataIndex: 'fs_alamat_penjamin', menuDisabled: true, hidden: true},
			{text: 'Kota Penjamin', dataIndex: 'fs_kota_penjamin', menuDisabled: true, hidden: true},
			{text: 'KodePos Penjamin', dataIndex: 'fs_kodepos_penjamin', menuDisabled: true, hidden: true},
			{text: 'Telp. Penjamin', dataIndex: 'fs_telepon_penjamin', menuDisabled: true, hidden: true},
			{text: 'Usaha Penjamin', dataIndex: 'fs_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Ket. Usaha Penjamin', dataIndex: 'fs_keterangan_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Alamat Usaha Penjamin', dataIndex: 'fs_alamat_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Telp. Usaha Penjamin', dataIndex: 'fs_telepon_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Pendapatan Penjamin', dataIndex: 'fn_pendapatan_penjamin', menuDisabled: true, hidden: true},
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
				emptyText: 'No. APK / Nama Konsumen',
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
					grupPerorangan.load();
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
			store: grupPerorangan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				// SET RECORD IN TAB DATA UTAMA
				Ext.getCmp('txtNoAPK').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboTglAPK').setValue(record.get('fd_tgl_apk'));
				Ext.getCmp('cboJnsPiutang').setValue(record.get('fs_jenis_piutang'));
				Ext.getCmp('cboPolaTransaksi').setValue(record.get('fs_pola_transaksi'));
				Ext.getCmp('txtNoPJJ').setValue(record.get('fs_pjj'));
				Ext.getCmp('cboFleet').setValue(record.get('fs_fleet'));
				Ext.getCmp('txtNamaKonsumen').setValue(record.get('fs_nama_konsumen'));
				Ext.getCmp('txtAlamatKonsumen').setValue(record.get('fs_alamat_konsumen'));
				Ext.getCmp('cboKodePos').setValue(record.get('fs_kodepos_konsumen'));
				Ext.getCmp('txtKdDati').setValue(record.get('fs_kode_dati_konsumen'));
				Ext.getCmp('txtPropinsi').setValue(record.get('fs_propinsi_konsumen'));
				Ext.getCmp('txtKota').setValue(record.get('fs_kota_konsumen'));
				Ext.getCmp('txtKecamatan').setValue(record.get('fs_kecamatan_konsumen'));
				Ext.getCmp('txtKelurahan').setValue(record.get('fs_kelurahan_konsumen'));
				Ext.getCmp('txtNoKTP').setValue(record.get('fs_ktp_konsumen'));
				Ext.getCmp('cboTglKTP').setValue(record.get('fs_masa_ktp_konsumen'));
				Ext.getCmp('txtNoNPWP').setValue(record.get('fs_npwp_konsumen'));
				Ext.getCmp('txtNoKK').setValue(record.get('fs_kartu_keluarga'));
				Ext.getCmp('txtNoTlpKonsumen').setValue(record.get('fs_telepon_konsumen'));
				Ext.getCmp('txtNoHPKonsumen').setValue(record.get('fs_handphone_konsumen'));
				Ext.getCmp('txtEmail').setValue(record.get('fs_email_konsumen'));

				// SET RECORD IN TAB DATA KONSUMEN
				Ext.getCmp('txtNoAPKTab3').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtNamaPerusahaan').setValue(record.get('fs_nama_perusahaan_konsumen'));
				Ext.getCmp('txtAlamatPerusahaan').setValue(record.get('fs_alamat_usaha_konsumen'));
				Ext.getCmp('cboKategoriUsaha').setValue(record.get('fs_kategori_usaha_konsumen'));
				Ext.getCmp('cboSkalaPerusahaan').setValue(record.get('fs_skala_perusahaan_konsumen'));
				Ext.getCmp('txtKerjaSejak').setValue(record.get('fs_kerja_sejak_konsumen'));
				Ext.getCmp('txtPendapatan').setValue(record.get('fn_pendapatan_konsumen'));
				Ext.getCmp('cboJekel').setValue(record.get('fs_jenis_kelamin_konsumen'));
				Ext.getCmp('txtTempatLahir').setValue(record.get('fs_tempat_lahir_konsumen'));
				Ext.getCmp('cboTglLahir').setValue(record.get('fd_tanggal_lahir_konsumen'));
				Ext.getCmp('cboStatusPerkawinan').setValue(record.get('fs_status_konsumen'));
				Ext.getCmp('cboStatusRumah').setValue(record.get('fs_status_rumah'));
				Ext.getCmp('cboAgama').setValue(record.get('fs_agama_konsumen'));
				Ext.getCmp('cboPendidikan').setValue(record.get('fs_pendidikan_konsumen'));
				Ext.getCmp('txtNamaIbu').setValue(record.get('fs_nama_ibu_kandung'));
				Ext.getCmp('cboPekerjaan').setValue(record.get('fs_usaha_pekerjaan_konsumen'));
				Ext.getCmp('txtKetPekerjaan').setValue(record.get('fs_keterangan_usaha_konsumen'));
				Ext.getCmp('txtAlamatSurat').setValue(record.get('fs_alamat_korespondensi'));
				Ext.getCmp('cboKodePosKonsumen').setValue(record.get('fs_kodepos_korespondensi'));
				Ext.getCmp('txtKotaKonsumen').setValue(record.get('fs_kota_korespondensi'));

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
				Ext.getCmp('cboNoPolisi').setValue(record.get('fs_no_polisi'));
				Ext.getCmp('txtSales').setValue(record.get('fs_salesman'));

				// SET RECORD IN TAB DATA STRUKTUR KREDIT
				Ext.getCmp('txtNoAPKTab5').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboPolaAngsuran').setValue(record.get('fs_pola_angsuran'));
				Ext.getCmp('cboCaraBayar').setValue(record.get('fs_cara_bayar'));
				Ext.getCmp('cboAngsuranDimuka').setValue(record.get('fs_angsuran_dimuka'));
				Ext.getCmp('txtTenor').setValue(record.get('fn_kali_angsuran_dimuka'));
				Ext.getCmp('cboPotongPencairan').setValue(record.get('fs_angsuran_dimuka_potong_pencairan'));

				// SET RECORD IN TAB DATA TAMBAHAN
				Ext.getCmp('txtNoAPKTab6').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtNamaPasangan').setValue(record.get('fs_nama_pasangan'));
				Ext.getCmp('txtAlamatPasangan').setValue(record.get('fs_alamat_usaha_pasangan'));
				Ext.getCmp('txtKotaPasangan').setValue(record.get('fs_alamat_usaha_pasangan'));
				Ext.getCmp('cboUsahaPasangan').setValue(record.get('fs_usaha_pasangan'));
				Ext.getCmp('txtKetUsahaPasangan').setValue(record.get('fs_keterangan_usaha_pasangan'));
				Ext.getCmp('txtAlamatUsahaPasangan').setValue(record.get('fs_alamat_usaha_pasangan'));
				//Ext.getCmp('txtNoTlpUsahaPasangan').setValue(record.get('fs_telepon_usaha_pasangan'));
				Ext.getCmp('txtPendapatanPasangan').setValue(record.get('fn_pendapatan_pasangan'));
				Ext.getCmp('txtNamaPenjamin').setValue(record.get('fs_nama_penjamin'));
				Ext.getCmp('txtAlamatPenjamin').setValue(record.get('fs_alamat_penjamin'));
				Ext.getCmp('txtKotaPenjamin').setValue(record.get('fs_kota_penjamin'));
				Ext.getCmp('cboKodePosPenjamin').setValue(record.get('fs_kodepos_penjamin'));
				Ext.getCmp('txtNoTlpPenjamin').setValue(record.get('fs_telepon_penjamin'));
				Ext.getCmp('cboUsahaPenjamin').setValue(record.get('fs_usaha_penjamin'));
				Ext.getCmp('txtKetUsahaPenjamin').setValue(record.get('fs_keterangan_usaha_penjamin'));
				Ext.getCmp('txtAlamatUsahaPenjamin').setValue(record.get('fs_alamat_usaha_penjamin'));
				//Ext.getCmp('txtNoTlpUsahaPenjamin').setValue(record.get('fs_telepon_usaha_penjamin'));
				Ext.getCmp('txtPendapatanPenjamin').setValue(record.get('fn_pendapatan_penjamin'));

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

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');

				// SET ENABLED TABPANEL
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
				type: 'json'
			},
			type: 'ajax',
			url: 'apkperorangan/gridlembaga'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': ''
				});
			}
		}
	});

	// GROUP TAB FORM DATA UTAMA
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
					'fs_kode_referensi': 'jenis_usaha'
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
			url: 'apkperorangan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jenis_piutang'
				});
			}
		}
	});

	var grupPolaTrans = Ext.create('Ext.data.Store', {
		autoLoad: false,
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
					'fs_kode_referensi': 'pola_transaksi'
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
			url: 'apkperorangan/combo'
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
			url: 'apkperorangan/gridkodepos'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKodePos').getValue(),
					'fs_cari': Ext.getCmp('txtCariKodePosKonsumen').getValue()
				});
			}
		}
	});

	// GROUP TAB FORM DATA KONSUMEN
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
			url: 'apkperorangan/gridkategori'
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
			url: 'apkperorangan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'skala_perusahaan'
				});
			}
		}
	});

	var grupPekerjaan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPekerjaan',
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
			url: 'apkperorangan/gridpekerjaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariPekerjaan').getValue()
				});
			}
		}
	});

	var grupJekel = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'jenis_kelamin'
				});
			}
		}
	});	

	var grupStatus = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'status_konsumen'
				});
			}
		}
	});

	var grupStatusRumah = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'status_rumah'
				});
			}
		}
	});

	var grupAgama = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'agama'
				});
			}
		}
	});

	var grupPendidikan = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'pendidikan'
				});
			}
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
			url: 'apkperorangan/gridkendaraan'
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
			url: 'apkperorangan/combo'
		}
	});

	var grupJenisAsuransi = Ext.create('Ext.data.Store', {

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
			url: 'apkperorangan/gridasuransi'
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
			url: 'apkperorangan/gridplatkendaraan'
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
			url: 'apkperorangan/combo'
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
			url: 'apkperorangan/griddealer'
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
			url: 'apkperorangan/select'
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
			url: 'apkperorangan/combo'
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
			url: 'apkperorangan/select'
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
			url: 'apkperorangan/combo'
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
			url: 'apkperorangan/combo'
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
			url: 'apkperorangan/combo'
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
			url: 'apkperorangan/select'
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
			url: 'apkperorangan/select'
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
			{text: "Kode Lembaga 2", dataIndex: 'fs_kode_lembaga_keuangan1', menuDisabled: true, flex: 1},
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
				Ext.getCmp('txtKdDati').setValue(record.get('fs_kode_dati'));
				Ext.getCmp('txtPropinsi').setValue(record.get('fs_propinsi'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nama_dati'));
				Ext.getCmp('txtKecamatan').setValue(record.get('fs_kecamatan'));
				Ext.getCmp('txtKelurahan').setValue(record.get('fs_kelurahan'));
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

	// POPUP TAB FORM DATA KONSUMEN
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
		width: 550,
		sortableColumns: false,
		store: grupPekerjaan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pekerjaan", dataIndex: 'fs_nilai1_referensi', menuDisabled: true, hidden: true},
			{text: "Nama Pekerjaan", dataIndex: 'fs_nama_referensi', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Pekerjaan',
				id: 'txtCariPekerjaan',
				name: 'txtCariPekerjaan',
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
					grupPekerjaan.load();
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
			store: grupPekerjaan,
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
				Ext.getCmp('cboPekerjaan').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtKdPekerjaan').setValue(record.get('fs_nilai1_referensi'));
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
				grupPekerjaan.load();
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
				Ext.getCmp('cboKodePosKonsumen').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaKonsumen').setValue(record.get('fs_propinsi'));
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
				Ext.getCmp('txtPropinsi').setValue(record.get('fs_propinsi'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nama_dati'));
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

	// POPUP TAB FORM DATA TAMBAHAN
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
				id: 'txtCariKodePosPasangan',
				name: 'txtCariKodePosPasangan',
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
				Ext.getCmp('cboKodePosPasangan').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPasangan').setValue(record.get('fs_nama_dati'));
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

	var winGrid12 = Ext.create('Ext.grid.Panel', {
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
				id: 'txtCariUsahaPasangan',
				name: 'txtCariUsahaPasangan',
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
					winCari12.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboUsahaPasangan').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKdUsahaPasangan').setValue(record.get('fs_kode_sektor_ekonomi'));
				winCari12.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari12 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid12
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

	var winGrid13 = Ext.create('Ext.grid.Panel', {
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
				id: 'txtCariKodePosPenjamin',
				name: 'txtCariKodePosPenjamin',
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
					winCari13.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePosPenjamin').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPenjamin').setValue(record.get('fs_nama_dati'));
				winCari13.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari13 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid13
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

	var winGrid14 = Ext.create('Ext.grid.Panel', {
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
				id: 'txtCariUsahaPenjamin',
				name: 'txtCariUsahaPenjamin',
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
					winCari14.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboUsahaPenjamin').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKdUsahaPenjamin').setValue(record.get('fs_kode_sektor_ekonomi'));
				winCari14.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari14 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid14
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
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis Usaha',
		id: 'cboJnsUsaha',
		name: 'cboJnsUsaha',
		store: grupJenisUsaha,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboJnsPiutang = {
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

	var txtNamaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Konsumen',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaKonsumen',
		name: 'txtNamaKonsumen',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Konsumen',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatKonsumen',
		name: 'txtAlamatKonsumen',
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
		anchor: '100%',
		fieldLabel: 'Propinsi',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtPropinsi',
		name: 'txtPropinsi',
		xtype: 'textfield'
	};

	var txtKota = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKota',
		name: 'txtKota',
		xtype: 'textfield'
	};

	var txtKecamatan = {
		anchor: '100%',
		fieldLabel: 'Kecamatan',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKecamatan',
		name: 'txtKecamatan',
		xtype: 'textfield'
	};

	var txtKelurahan = {
		anchor: '100%',
		fieldLabel: 'Kelurahan',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		id: 'txtKelurahan',
		name: 'txtKelurahan',
		xtype: 'textfield'
	};

	var txtNoKTP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. KTP',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNoKTP',
		name: 'txtNoKTP',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboTglKTP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Berlaku',
		format: 'd-m-Y',
		id: 'cboTglKTP',
		name: 'cboTglKTP',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -75),
		xtype: 'datefield',
		value: new Date()
	};

	var txtNoNPWP = {
		anchor: '100%',
		fieldLabel: 'NPWP Konsumen',
		emptyText: '',
		id: 'txtNoNPWP',
		name: 'txtNoNPWP',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '20',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoKK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Kartu Keluarga',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNoKK',
		name: 'txtNoKK',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoTlpKonsumen = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		emptyText: '',
		id: 'txtNoTlpKonsumen',
		name: 'txtNoTlpKonsumen',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoHPKonsumen = {
		anchor: '100%',
		fieldLabel: 'No. Handphone',
		emptyText: '',
		id: 'txtNoHPKonsumen',
		name: 'txtNoHPKonsumen',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtEmail = {
		anchor: '100%',
		fieldLabel: 'Email Konsumen',
		id: 'txtEmail',
		name: 'txtEmail',
		xtype: 'textfield'
	};

	// COMPONENT FORM DATA KONSUMEN
	var txtNoAPKTab3 = {
		id: 'txtNoAPKTab3',
		name: 'txtNoAPKTab3',
		xtype: 'textfield',
		hidden: true
	};

	var txtNamaPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaPerusahaan',
		name: 'txtNamaPerusahaan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatPerusahaan',
		name: 'txtAlamatPerusahaan',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
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

	var txtKerjaSejak = {
		anchor: '100%',
		fieldLabel: 'Kerja Sejak',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKerjaSejak',
		name: 'txtKerjaSejak',
		xtype: 'textfield',
	};

	var txtPendapatan = {
		anchor: '100%',
		fieldLabel: 'Pendapatan',
		emptyText: '',
		id: 'txtPendapatan',
		name: 'txtPendapatan',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboSkalaPerusahaan = {
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

	var cboPekerjaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Usaha / Pekerjaan',
		fieldLabel: 'Usaha / Pekerjaan',
		editable: false,
		id: 'cboPekerjaan',
		name: 'cboPekerjaan',
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

	var txtKdPekerjaan = {
		id: 'txtKdPekerjaan',
		name: 'txtKdPekerjaan',
		xtype: 'textfield',
		hidden: true
	};

	var txtKetPekerjaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Keterangan Pekerjaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKetPekerjaan',
		name: 'txtKetPekerjaan',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboJekel = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis Kelamin',
		id: 'cboJekel',
		name: 'cboJekel',
		store: grupJekel,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtTempatLahir = {
		anchor: '100%',
		fieldLabel: 'Tempat Lahir',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtTempatLahir',
		name: 'txtTempatLahir',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboTglLahir = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Lahir',
		format: 'd-m-Y',
		id: 'cboTglLahir',
		name: 'cboTglLahir',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -75),
		xtype: 'datefield',
		value: Ext.Date.add(new Date(), Ext.Date.YEAR, -40),
	};
	

	var cboAgama = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Agama',
		id: 'cboAgama',
		name: 'cboAgama',
		store: grupAgama,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboPendidikan = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Pendidikan',
		id: 'cboPendidikan',
		name: 'cboPendidikan',
		store: grupPendidikan,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNamaIbu = {
		anchor: '100%',
		fieldLabel: 'Nama Ibu Kandung',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaIbu',
		name: 'txtNamaIbu',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboStatusPerkawinan = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status',
		id: 'cboStatusPerkawinan',
		name: 'cboStatusPerkawinan',
		store: grupStatus,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboStatusRumah = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status Rumah',
		id: 'cboStatusRumah',
		name: 'cboStatusRumah',
		store: grupStatusRumah,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtAlamatSurat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Surat',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatSurat',
		name: 'txtAlamatSurat',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePosKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Kode Pos',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePosKonsumen',
		name: 'cboKodePosKonsumen',
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

	var txtKdDatiKonsumen = {
		id: 'txtKdDatiKonsumen',
		name: 'txtKdDatiKonsumen',
		xtype: 'textfield',
		hidden: true
	};

	var txtKotaKonsumen = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		emptyText: '',
		id: 'txtKotaKonsumen',
		name: 'txtKotaKonsumen',
		xtype: 'textfield'
	};

	var cboPertamaKaliKredit = {

	};

	var txtBiayaBulanan = {

	};

	var txtTanggungan = {

	};

	var txtTinggalSejak = {

	};

	var txtKreditKe = {

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
		anchor: '100%',
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		emptyText: '',
		id: 'txtJnsKendaraan',
		name: 'txtJnsKendaraan',
		xtype: 'textfield'
	};

	var txtSilinder = {
		anchor: '100%',
		fieldLabel: 'Silinder',
		fieldStyle: 'background-color: #eee; background-image: none; text-transform: uppercase;',
		readOnly: true,
		emptyText: '',
		id: 'txtSilinder',
		name: 'txtSilinder',
		xtype: 'textfield'
	};

	var txtTahunKendaraan = {
		anchor: '100%',
		fieldLabel: 'Tahun Kendaraan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtTahunKendaraan',
		name: 'txtTahunKendaraan',
		xtype: 'textfield'
	};

	var txtWarnaKendaraan = {
		anchor: '100%',
		fieldLabel: 'Warna Kendaraan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtWarnaKendaraan',
		name: 'txtWarnaKendaraan',
		xtype: 'textfield'
	};

	var txtNoRangka = {
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

	var cboJnsAsuransi = {
		afterLabelTextTpl: required,
		allowBlank: false,
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

	var cboNoPolisi = {
		anchor: '100%',
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

	var txtSales = {
		anchor: '100%',
		fieldLabel: 'Nama Sales',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtSales',
		name: 'txtSales',
		xtype: 'textfield'
	};

	var txtKdDealer1 = {
		anchor: '100%',
		fieldLabel: 'Kode Dealer 1',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKdDealer1',
		name: 'txtKdDealer1',
		xtype: 'textfield'
	};

	var txtKdDealer2 = {
		anchor: '100%',
		fieldLabel: 'Kode Dealer 2',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKdDealer2',
		name: 'txtKdDealer2',
		xtype: 'textfield'
	};

	var txtCabangDealer = {
		anchor: '100%',
		fieldLabel: 'Cabang Dealer',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtCabangDealer',
		name: 'txtCabangDealer',
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
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
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
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
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
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

	// COMPONENT PREVIEW FORM STRUKTUR KREDIT
	var txtHargaOTRDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Harga OTR',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly:true,
		hideTrigger: true,
		id: 'txtHargaOTRDealer',
		name: 'txtHargaOTRDealer',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtHargaOTRKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Harga OTR',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtHargaOTRKonsumen',
		name: 'txtHargaOTRKonsumen',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtUangMukaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Uang Muka',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtUangMukaDealer',
		name: 'txtUangMukaDealer',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	}; 

	var txtUangMukaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Uang Muka',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtUangMukaKonsumen',
		name: 'txtUangMukaKonsumen',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtAsuransiDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Asuransi',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtAsuransiDealer',
		name: 'txtAsuransiDealer',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtAsuransiKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Asuransi',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtAsuransiKonsumen',
		name: 'txtAsuransiKonsumen',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtPokokPembiayaanDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Pokok Pembiayaan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtPokokPembiayaanDealer',
		name: 'txtPokokPembiayaanDealer',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtPokokPembiayaanKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Pokok Pembiayaan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtPokokPembiayaanKonsumen',
		name: 'txtPokokPembiayaanKonsumen',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtBungaDealer = {

	};

	var txtBungaKonsumen = {

	};

	var txtAngsuranDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Angsuran /Bulan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtAngsuranDealer',
		name: 'txtAngsuranDealer',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtAngsuranKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Angsuran /Bulan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtAngsuranKonsumen',
		name: 'txtAngsuranKonsumen',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtPiutangDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Piutang Pembiayaan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtPiutangDealer',
		name: 'txtPiutangDealer',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	var txtPiutangKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Piutang Pembiayaan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		labelWidth: 100,
		readOnly: true,
		hideTrigger: true,
		id: 'txtPiutangKonsumen',
		name: 'txtPiutangKonsumen',
		alwaysDisplayDecimals: true,
		currencySymbol: null,
		decimalPrecision: 2,
		decimalSeparator: '.',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
		value: 0,
		xtype: 'numericfield'
	};

	// COMPONENT FORM DATA TAMBAHAN
	var txtNoAPKTab6 = {
		id: 'txtNoAPKTab6',
		name: 'txtNoAPKTab6',
		xtype: 'textfield',
		hidden: true
	};

	var txtNamaPasangan = {
		anchor: '100%',
		fieldLabel: 'Nama Suami / Istri',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaPasangan',
		name: 'txtNamaPasangan',
		xtype: 'textfield'
	};

	var txtAlamatPasangan = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Suami / Istri',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatPasangan',
		name: 'txtAlamatPasangan',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePosPasangan = {
		anchor: '100%',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePosPasangan',
		name: 'cboKodePosPasangan',
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

	var txtKdDatiPasangan = {
		id: 'txtKdDatiPasangan',
		name: 'txtKdDatiPasangan',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoTlpPasangan = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoTlpPasangan',
		name: 'txtNoTlpPasangan',
		xtype: 'textfield'
	};

	var txtKotaPasangan = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKotaPasangan',
		name: 'txtKotaPasangan',
		xtype: 'textfield'
	};

	var cboUsahaPasangan = {
		anchor: '100%',
		fieldLabel: 'Usaha Pasangan',
		editable: false,
		id: 'cboUsahaPasangan',
		name: 'cboUsahaPasangan',
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
					winCari12.show();
					winCari12.center();
				}
			}
		}
	};

	var txtKdUsahaPasangan = {
		id: 'txtKdUsahaPasangan',
		name: 'txtKdUsahaPasangan',
		xtype: 'textfield',
		hidden: true
	};

	var txtKetUsahaPasangan = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Keterangan Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKetUsahaPasangan',
		name: 'txtKetUsahaPasangan',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatUsahaPasangan = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatUsahaPasangan',
		name: 'txtAlamatUsahaPasangan',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoTlpUsahaPasangan = {
		anchor: '100%',
		fieldLabel: 'Telepon',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoTlpUsahaPasangan',
		name: 'txtNoTlpUsahaPasangan',
		xtype: 'textfield'
	};

	var txtPendapatanPasangan = {
		anchor: '100%',
		fieldLabel: 'Pendapatan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtPendapatanPasangan',
		name: 'txtPendapatanPasangan',
		xtype: 'textfield'
	};

	var txtNamaPenjamin = {
		anchor: '100%',
		fieldLabel: 'Nama Penjamin',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaPenjamin',
		name: 'txtNamaPenjamin',
		xtype: 'textfield'
	};

	var txtAlamatPenjamin = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Penjamin',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatPenjamin',
		name: 'txtAlamatPenjamin',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePosPenjamin = {
		anchor: '100%',
		fieldLabel: 'Kode Pos',
		editable: false,
		id: 'cboKodePosPenjamin',
		name: 'cboKodePosPenjamin',
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
					winCari13.show();
					winCari13.center();
				}
			}
		}
	};

	var txtKdDatiPenjamin = {
		id: 'txtKdDatiPenjamin',
		name: 'txtKdDatiPenjamin',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoTlpPenjamin = {
		anchor: '100%',
		fieldLabel: 'Telepon',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoTlpPenjamin',
		name: 'txtNoTlpPenjamin',
		xtype: 'textfield'
	};

	var txtKotaPenjamin = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKotaPenjamin',
		name: 'txtKotaPenjamin',
		xtype: 'textfield'
	};

	var cboUsahaPenjamin = {
		anchor: '100%',
		fieldLabel: 'Usaha Penjamin',
		editable: false,
		id: 'cboUsahaPenjamin',
		name: 'cboUsahaPenjamin',
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
					winCari14.show();
					winCari14.center();
				}
			}
		}
	};

	var txtKdUsahaPenjamin = {
		id: 'txtKdUsahaPenjamin',
		name: 'txtKdUsahaPenjamin',
		xtype: 'textfield',
		hidden: true
	};

	var txtKetUsahaPenjamin = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Keterangan Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKetUsahaPenjamin',
		name: 'txtKetUsahaPenjamin',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatUsahaPenjamin = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatUsahaPenjamin',
		name: 'txtAlamatUsahaPenjamin',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoTlpUsahaPenjamin = {
		anchor: '100%',
		fieldLabel: 'Telepon',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoTlpUsahaPenjamin',
		name: 'txtNoTlpUsahaPenjamin',
		xtype: 'textfield'
	};

	var txtPendapatanPenjamin = {
		anchor: '100%',
		fieldLabel: 'Pendapatan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtPendapatanPenjamin',
		name: 'txtPendapatanPenjamin',
		xtype: 'textfield'
	};

	var txtStatusPenjamin = {

	};

	// COMPONENT FORM DATA PERCAIRAN
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
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtJatuhTempo',
		name: 'txtJatuhTempo',
		xtype: 'textfield'
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
		xtype: 'datefield'
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
		emptyText: '',
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
		anchor: '100%',
		fieldLabel: 'Nilai Cair',
		fieldStyle: 'text-transform: uppercase;',
        name: 'lblNilaiCair',
        value: '10.000.000',
        fieldCls: 'biggertext',
        labelCls: 'redlabel',
        xtype: 'displayfield'
	};


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
		// FORM LOKASI KONSUMEN
		Ext.getCmp('txtNamaKonsumen').setValue('');
		Ext.getCmp('txtAlamatKonsumen').setValue('');
		Ext.getCmp('cboKodePos').setValue('');
		Ext.getCmp('txtKdDati').setValue('');
		Ext.getCmp('txtPropinsi').setValue('');
		Ext.getCmp('txtKota').setValue('');
		Ext.getCmp('txtKecamatan').setValue('');
		Ext.getCmp('txtKelurahan').setValue('');
		// FORM IDENTITAS KONSUMEN
		Ext.getCmp('txtNoKTP').setValue('');
		Ext.getCmp('cboTglKTP').setValue('');
		Ext.getCmp('txtNoNPWP').setValue('');
		Ext.getCmp('txtNoKK').setValue('');
		// FORM KONTAK KONSUMEN
		Ext.getCmp('txtNoTlpKonsumen').setValue('');
		Ext.getCmp('txtNoHPKonsumen').setValue('');
		Ext.getCmp('txtEmail').setValue('');
	}

	function fnCekSaveDataUtama() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkperorangan/ceksavedatautama',
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
			url: 'apkperorangan/savedatautama',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
				'fd_tgl_apk': Ext.Date.format(Ext.getCmp('cboTglAPK').getValue(), 'Y-m-d'),
				'fs_jenis_piutang': Ext.getCmp('cboJnsPiutang').getValue(),
				'fs_pola_transaksi': Ext.getCmp('cboPolaTransaksi').getValue(),
				'fs_jenis_pembiayaan': 'P',
				'fs_kode_lokasi': '',
				'fs_nomor_dealer': '',
				'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue(),
				'fs_fleet': Ext.getCmp('cboFleet').getValue(),
				'fs_nama_konsumen': Ext.getCmp('txtNamaKonsumen').getValue(),
				'fs_alamat_konsumen': Ext.getCmp('txtAlamatKonsumen').getValue(),
				'fs_kelurahan_konsumen': Ext.getCmp('txtKelurahan').getValue(),
				'fs_kecamatan_konsumen': Ext.getCmp('txtKecamatan').getValue(),
				'fs_kode_dati_konsumen': Ext.getCmp('txtKdDati').getValue(),
				'fs_propinsi_konsumen': Ext.getCmp('txtPropinsi').getValue(),
				'fs_kota_konsumen': Ext.getCmp('txtKota').getValue(),
				'fs_kodepos_konsumen': Ext.getCmp('cboKodePos').getValue(),
				'fs_ktp_konsumen': Ext.getCmp('txtNoKTP').getValue(),
				'fs_masa_ktp_konsumen': Ext.getCmp('cboTglKTP').getValue(),
				'fs_npwp_konsumen': Ext.getCmp('txtNoNPWP').getValue(),
				'fs_kartu_keluarga': Ext.getCmp('txtNoKK').getValue(),
				'fs_telepon_konsumen': Ext.getCmp('txtNoTlpKonsumen').getValue(),
				'fs_handphone_konsumen': Ext.getCmp('txtNoHPKonsumen').getValue(),
				'fs_email_konsumen': Ext.getCmp('txtEmail').getValue(),
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

	// FUNCTIONS TAB DATA KONSUMEN
	function fnResetDataKonsumen() {
		// FORM PERUSAHAAN
		Ext.getCmp('txtNamaPerusahaan').setValue('');
		Ext.getCmp('txtAlamatPerusahaan').setValue('');
		Ext.getCmp('txtNoTlpPerusahaan').setValue('');
		Ext.getCmp('cboKategoriUsaha').setValue('');
		Ext.getCmp('txtKdKategoriUsaha').setValue('');
		Ext.getCmp('cboSkalaPerusahaan').setValue('');
		Ext.getCmp('txtKerjaSejak').setValue('');
		Ext.getCmp('txtPendapatan').setValue('');
		// FORM PEKERJAAN
		Ext.getCmp('cboPekerjaan').setValue('');
		Ext.getCmp('txtKetPekerjaan').setValue('');
		// FORM BIODATA KONSUMEN
		Ext.getCmp('cboJekel').setValue('');
		Ext.getCmp('cboTglLahir').setValue(new Date());
		Ext.getCmp('txtTempatLahir').setValue('');
		Ext.getCmp('cboStatusPerkawinan').setValue('');
		Ext.getCmp('cboStatusRumah').setValue('');
		Ext.getCmp('cboAgama').setValue('');
		Ext.getCmp('cboPendidikan').setValue('');
		Ext.getCmp('txtNamaIbu').setValue('');
		// FORM ALAMAT SURAT
		Ext.getCmp('txtAlamatSurat').setValue('');
		Ext.getCmp('cboKodePosKonsumen').setValue('');
		Ext.getCmp('txtKdDatiKonsumen').setValue('');
		Ext.getCmp('txtKotaKonsumen').setValue('');
	}

	function fnCekSaveDataKonsumen() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkperorangan/ceksavedatakonsumen',
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
									fnSaveDataKonsumen();
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

	function fnSaveDataKonsumen() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkperorangan/savedatakonsumen',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab3').getValue(),
				'fs_nama_perusahaan_konsumen': Ext.getCmp('txtNamaPerusahaan').getValue(),
				'fs_alamat_usaha_konsumen': Ext.getCmp('txtAlamatPerusahaan').getValue(),
				'fs_telfon_usaha_konsumen': Ext.getCmp('txtNoTlpPerusahaan').getValue(),
				'fs_kategori_usaha_konsumen': Ext.getCmp('txtKdKategoriUsaha').getValue(),
				'fs_skala_perusahaan_konsumen': Ext.getCmp('cboSkalaPerusahaan').getValue(),
				'fs_kerja_sejak_konsumen': Ext.getCmp('txtKerjaSejak').getValue(),
				'fs_usaha_pekerjaan_konsumen': Ext.getCmp('cboPekerjaan').getValue(),
				'fs_keterangan_usaha_konsumen': Ext.getCmp('txtKetPekerjaan').getValue(),
				'fs_jenis_kelamin_konsumen': Ext.getCmp('cboJekel').getValue(),
				'fs_tempat_lahir_konsumen': Ext.getCmp('txtTempatLahir').getValue(),
				'fd_tanggal_lahir_konsumen': Ext.Date.format(Ext.getCmp('cboTglLahir').getValue(), 'Y-m-d'),
				'fs_status_konsumen': Ext.getCmp('cboStatusPerkawinan').getValue(),
				'fs_status_rumah': Ext.getCmp('cboStatusRumah').getValue(),
				'fs_agama_konsumen': Ext.getCmp('cboAgama').getValue(),
				'fs_pendidikan_konsumen': Ext.getCmp('cboPendidikan').getValue(),
				'fs_nama_ibu_kandung': Ext.getCmp('txtNamaIbu').getValue(),
				'fs_alamat_korespondensi': Ext.getCmp('txtAlamatSurat').getValue(),
				'fs_kodepos_korespondensi': Ext.getCmp('cboKodePosKonsumen').getValue(),
				'fs_kota_korespondensi': Ext.getCmp('txtKotaKonsumen').getValue(),
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
		Ext.getCmp('cboModelKendaraan').setValue('');
		Ext.getCmp('txtKdKendaraan').setValue('');
		Ext.getCmp('txtJnsKendaraan').setValue('');
		Ext.getCmp('txtSilinder').setValue('');
		Ext.getCmp('txtTahunKendaraan').setValue('');
		Ext.getCmp('txtWarnaKendaraan').setValue('');
		Ext.getCmp('txtNoRangka').setValue('');
		Ext.getCmp('txtNoMesin').setValue('');
		Ext.getCmp('cboKomersil').setValue('');
		// FORM ASURANSI
		Ext.getCmp('cboJnsAsuransi').setValue('');
		Ext.getCmp('cboPerusahaanAsuransi').setValue('');
		// FORM BPKB
		Ext.getCmp('cboSesuaiKontrak').setValue('');
		Ext.getCmp('txtNamaBPKP').setValue('');
		Ext.getCmp('txtAlamatBPKP').setValue('');
		Ext.getCmp('txtNoBPKP').setValue('');
		Ext.getCmp('cboNoPolisi').setValue('');
		// FORM DEALER
		Ext.getCmp('cboDealer').setValue('');
		Ext.getCmp('txtSales').setValue('');
	}

	function fnCekSaveDataKendaraan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkperorangan/ceksavedatakendaraan',
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
			url: 'apkperorangan/savedatakendaraan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab4').getValue(),
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
				'fs_no_polisi': Ext.getCmp('cboNoPolisi').getValue(),
				'fs_kode_wilayah_no_polisi': '',
				'fs_kode_akhir_wilayah_no_polisi': '',
				'fs_salesman': Ext.getCmp('txtSales').getValue(),
				'fs_jenis_asuransi': Ext.getCmp('cboJnsAsuransi').getValue(),
				'fs_kode_asuransi1': '',
				'fs_kode_asuransi2': '',
				'fn_cabang_dealer': '',
				'fs_kode_dealer1': '',
				'fs_kode_dealer2': ''
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
		Ext.getCmp('cboPolaAngsuran').setValue('');
		Ext.getCmp('cboAngsuranDimuka').setValue('');
		Ext.getCmp('txtHargaOTR').setValue('');
		Ext.getCmp('txtTotalDP').setValue('');

		Ext.getCmp('cboCaraBayar').setValue('');
		Ext.getCmp('txtTenor').setValue('');
		Ext.getCmp('txtAngsuran').setValue('');

		Ext.getCmp('txtTdkAngsuran').setValue('');
		Ext.getCmp('cboPotongPencairan').setValue('');

		// FORM APLIKASI TOTAL BIAYA DP
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
				url: 'apkperorangan/ceksavestrukturkredit',
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
			url: 'apkperorangan/savestrukturkredit',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab5').getValue(),
				'fs_pola_angsuran': Ext.getCmp('cboPolaAngsuran').getValue(),
				'fs_cara_bayar': Ext.getCmp('cboCaraBayar').getValue(),
				'fs_angsuran_dimuka': Ext.getCmp('cboAngsuranDimuka').getValue(),
				'fn_kali_angsuran_dimuka': '',
				'fn_jumlah_angsuran_dimuka': '',
				'fn_biaya_tjh': Ext.getCmp('txtBiayaTJH').getValue(),
				'fn_selisih_dp': '',
				'fs_angsuran_dimuka_potong_pencairan': Ext.getCmp('cboPotongPencairan').getValue(),
				'fn_dp_bayar': '',
				'fs_angsuran_dibayar_dealer': '',
				'fn_biaya_adm': Ext.getCmp('txtBiayaADM').getValue(),
				'fn_premi_asuransi_gross': Ext.getCmp('txtPremiAssGross').getValue(),
				'fn_premi_asuransi': Ext.getCmp('txtPremiAsuransi').getValue(),
				'fn_premi_asuransi_gross_perluasan': Ext.getCmp('txtPremiPerluasan').getValue(),
				'fn_premi_asuransi_netto': Ext.getCmp('txtPremiAssNet').getValue(),
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

	// FUNCTIONS TAB DATA TAMBAHAN
	function fnResetDataTambahan() {
		// FORM PASANGAN
		Ext.getCmp('txtNamaPasangan').setValue('');
		Ext.getCmp('txtAlamatPasangan').setValue('');
		Ext.getCmp('cboKodePosPasangan').setValue('');
		Ext.getCmp('txtKdDatiPasangan').setValue('');
		Ext.getCmp('txtKotaPasangan').setValue('');
		Ext.getCmp('txtNoTlpPasangan').setValue('');
		Ext.getCmp('cboUsahaPasangan').setValue('');
		Ext.getCmp('txtKetUsahaPasangan').setValue('');
		Ext.getCmp('txtAlamatUsahaPasangan').setValue('');
		Ext.getCmp('txtPendapatanPasangan').setValue('');
		// FORM PENJAMIN
		Ext.getCmp('txtNamaPenjamin').setValue('');
		Ext.getCmp('txtAlamatPenjamin').setValue('');
		Ext.getCmp('cboKodePosPenjamin').setValue('');
		Ext.getCmp('txtKdDatiPenjamin').setValue('');
		Ext.getCmp('txtKotaPenjamin').setValue('');
		Ext.getCmp('txtNoTlpPenjamin').setValue('');
		Ext.getCmp('cboUsahaPenjamin').setValue('');
		Ext.getCmp('txtKetUsahaPenjamin').setValue('');
		Ext.getCmp('txtAlamatUsahaPenjamin').setValue('');
		Ext.getCmp('txtPendapatanPenjamin').setValue('');
	}

	function fnCekSaveDataTambahan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkperorangan/ceksavedatatambahan',
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
									fnSaveDataTambahan();
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

	function fnSaveDataTambahan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkperorangan/savedatatambahan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab6').getValue(),
				'fs_nama_pasangan': Ext.getCmp('txtNamaPasangan').getValue(),
				'fs_handphone_pasangan': '',
				'fs_usaha_pasangan': Ext.getCmp('cboUsahaPasangan').getValue(),
				'fs_keterangan_usaha_pasangan': Ext.getCmp('txtKetUsahaPasangan').getValue(),
				'fs_alamat_usaha_pasangan': Ext.getCmp('txtAlamatUsahaPasangan').getValue(),
				'fs_telepon_usaha_pasangan': Ext.getCmp('txtNoTlpPasangan').getValue(),
				'fn_pendapatan_pasangan': Ext.getCmp('txtPendapatanPasangan').getValue(),
				'fs_nama_penjamin': Ext.getCmp('txtNamaPenjamin').getValue(),
				'fs_alamat_penjamin': Ext.getCmp('txtAlamatPenjamin').getValue(),
				'fs_kota_penjamin': Ext.getCmp('txtKotaPenjamin').getValue(),
				'fs_kodepos_penjamin': Ext.getCmp('cboKodePosPenjamin').getValue(),
				'fs_telepon_penjamin': Ext.getCmp('txtNoTlpPenjamin').getValue(),
				'fs_usaha_penjamin': Ext.getCmp('cboUsahaPenjamin').getValue(),
				'fs_keterangan_usaha_penjamin': Ext.getCmp('txtKetUsahaPenjamin').getValue(),
				'fs_alamat_usaha_penjamin': Ext.getCmp('txtAlamatUsahaPenjamin').getValue(),
				'fs_telepon_usaha_penjamin': '',
				'fn_pendapatan_penjamin': Ext.getCmp('txtPendapatanPenjamin').getValue(),
				'fs_status_penjamin': ''
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
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab7');
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
		Ext.getCmp('cboTglAngsuran').setValue(new Date());
		Ext.getCmp('txtJatuhTempo').setValue('');
		// FORM PENCAIRAN
		Ext.getCmp('cboTglCair').setValue(new Date());
		Ext.getCmp('cboPencairanKe').setValue('');
		Ext.getCmp('cboUangMukaKe').setValue('');
		Ext.getCmp('cboDepositPotongCair').setValue('');
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
				url: 'apkperorangan/ceksavedatapencairan',
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
			url: 'apkperorangan/savedatapencairan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTab7').getValue(),
				'fd_tanggal_perjanjian': '',
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

	var frmApkPerorangan = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'APK Perorangan',
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
				title: 'Daftar Perorangan',
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
					title: 'Data APK Perorangan',
					xtype: 'fieldset',
					items: [
						gridPerorangan
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
									cboLembaga,
									txtKdLembaga1,
									txtKdLembaga2,
									cboJnsUsaha,
									cboJnsPiutang,
									cboPolaTransaksi,
									txtNoPJJ,
									cboFleet
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Identitas Konsumen',
								xtype: 'fieldset',
								items: [
									txtNoKTP,
									cboTglKTP,
									txtNoNPWP,
									txtNoKK
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Lokasi Konsumen',
								xtype: 'fieldset',
								items: [
									txtNamaKonsumen,
									txtAlamatKonsumen,
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
								title: 'Form Kontak Konsumen',
								xtype: 'fieldset',
								items: [
									txtNoTlpKonsumen,
									txtNoHPKonsumen,
									txtEmail
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
				title: 'Data Konsumen',
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
								title: 'Form Perusahaan',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab3,
									txtNamaPerusahaan,
									txtAlamatPerusahaan,
									txtNoTlpPerusahaan,
									cboKategoriUsaha,
									txtKdKategoriUsaha,
									cboSkalaPerusahaan,
									txtKerjaSejak,
									txtPendapatan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pekerjaan',
								xtype: 'fieldset',
								items: [
									cboPekerjaan,
									txtKdPekerjaan,
									txtKetPekerjaan
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Biodata Konsumen',
								xtype: 'fieldset',
								items: [
									cboJekel,
									txtTempatLahir,
									cboTglLahir,
									cboStatusPerkawinan,
									cboStatusRumah,
									cboAgama,
									cboPendidikan,
									txtNamaIbu
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Alamat Surat',
								xtype: 'fieldset',
								items: [
									txtAlamatSurat,
									cboKodePosKonsumen,
									txtKdDatiKonsumen,
									txtKotaKonsumen
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataKonsumen',
					name: 'btnSaveDataKonsumen',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataKonsumen
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataKonsumen
				}]
			},{
				id: 'tab4',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Kendaraan',
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
									cboPerusahaanAsuransi
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
									cboNoPolisi
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Dealer',
								xtype: 'fieldset',
								items: [
									cboDealer,
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
								xtype: 'fieldset',
								items: [
									cboCaraBayar,
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
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Hasil Perhitungan',
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
											title: 'DEALER',
											style: 'padding: 5px;',
											xtype: 'fieldset',
											items: [
												txtHargaOTRDealer,
												txtUangMukaDealer,
												txtAsuransiDealer,
												txtAngsuranDealer,
												txtPiutangDealer
											]
										}]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [{
											anchor: '98%',
											title: 'KONSUMEN',
											style: 'padding: 5px;',
											xtype: 'fieldset',
											items: [
												txtHargaOTRKonsumen,
												txtUangMukaKonsumen,
												txtAsuransiKonsumen,
												txtAngsuranKonsumen,
												txtPiutangKonsumen
											]
										}]
									}]
								}]
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
				title: 'Data Tambahan',
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
								title: 'Form Suami / Istri',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab6,
									txtNamaPasangan,
									txtAlamatPasangan,
									cboKodePosPasangan,
									txtKdDatiPasangan,
									txtKotaPasangan,
									txtNoTlpPasangan,
									cboUsahaPasangan,
									txtKdUsahaPasangan,
									txtKetUsahaPasangan,
									txtAlamatUsahaPasangan,
									txtPendapatanPasangan
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Penjamin',
								xtype: 'fieldset',
								items: [
									txtNamaPenjamin,
									txtAlamatPenjamin,
									cboKodePosPenjamin,
									txtKdDatiPenjamin,
									txtKotaPenjamin,
									txtNoTlpPenjamin,
									cboUsahaPenjamin,
									txtKdUsahaPenjamin,
									txtKetUsahaPenjamin,
									txtAlamatUsahaPenjamin,
									txtPendapatanPenjamin
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveDataTambahan',
					name: 'btnSaveDataTambahan',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveDataTambahan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataTambahan
				}]
			},{
				id: 'tab7',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pencairan',
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
									lblNilaiCair
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pencairan',
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
		target: frmApkPerorangan
	});

	function fnMaskShow() {
		frmApkPerorangan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmApkPerorangan.unmask();
	}
	
	frmApkPerorangan.render(Ext.getBody());
	Ext.get('loading').destroy();
});