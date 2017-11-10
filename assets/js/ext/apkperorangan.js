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

	Ext.define('DataGridDataPendukung', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_kode_dokumen', type: 'string'},
			{name: 'fs_nama_dokumen', type: 'string'},
			{name: 'fs_jenis_pembiayaan', type: 'string'},
			{name: 'fs_dokumen_upload', type: 'string'}
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

	Ext.define('DataGridPerluasan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fn_tahun_ke', type: 'string'},
			{name: 'fs_jenis_perluasan', type: 'string'}
		]
	});

	Ext.define('DataGridMasterTrans', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_transaksi', type: 'string'},
			{name: 'fs_nama_transaksi', type: 'string'},
			{name: 'fs_kode_perkiraan', type: 'string'},
			{name: 'fs_penjelasan_transaksi', type: 'string'}
		]
	});

	Ext.define('DataGridTransaksi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_kode_transaksi', type: 'string'},
			{name: 'fs_nama_transaksi', type: 'string'},
			{name: 'fn_persentase_nilai_transaksi', type: 'string'},
			{name: 'fn_nilai_transaksi', type: 'string'},
			{name: 'fs_tagih_ke_konsumen', type: 'string'},
			{name: 'fs_cair_ke_dealer', type: 'string'}
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
			{text: 'Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, hidden: true},
			{text: 'No. APK', dataIndex: 'fn_no_apk', menuDisabled: true, width: 90},
			{text: 'Nama Konsumen', dataIndex: 'fs_nama_konsumen', menuDisabled: true, width: 240},
			{text: 'Tanggal APK', dataIndex: 'fd_tgl_apk', menuDisabled: true, width: 90, renderer: Ext.util.Format.dateRenderer('d-m-Y')},
			{
				width: 80,
				align: 'center',
				renderer: function(val, meta, rec) {
					var id = Ext.id();
					Ext.defer(function() {
						Ext.widget('button', {
							renderTo: id,
							text: 'PREVIEW',
							scale: 'small',
							handler: function() {
								var xkdcabang = rec.get('fs_kode_cabang');
								var xnoapk = rec.get('fn_no_apk');
								// CALLBACK
								fnShowPreview(xkdcabang, xnoapk);
							}
						});
					}, 50);
					return Ext.String.format('<div id="{0}"></div>', id);
				}
			},
			{
				width: 80,
				align: 'center',
				renderer: function(val, meta, rec) {
					var id = Ext.id();
					Ext.defer(function() {
						Ext.widget('button', {
							renderTo: id,
							text: 'DUPLIKASI',
							scale: 'small',
							handler: function() {
								var xkdcabang = rec.get('fs_kode_cabang');
								var xnoapk = rec.get('fn_no_apk');
								// CALLBACK
								fnCekDuplikasi(xkdcabang, xnoapk);
							}
						});
					}, 50);
					return Ext.String.format('<div id="{0}"></div>', id);
				}
			},{
				width: 120,
				align: 'center',
				renderer: function(val, meta, rec) {
					var id = Ext.id();
					Ext.defer(function() {
						Ext.widget('button', {
							renderTo: id,
							text: 'DATA PENDUKUNG',
							scale: 'small',
							handler: function() {
								var xkdcabang = rec.get('fs_kode_cabang');
								var xnoapk = rec.get('fn_no_apk');

								// CALLBACK
								fnShowDataPendukung(xkdcabang, xnoapk);
							}
						});
					}, 50);
					return Ext.String.format('<div id="{0}"></div>', id);
				}
			},
			{text: 'Kode Lokasi', dataIndex: 'fs_kode_lokasi', menuDisabled: true, hidden: true},
			{text: 'Nomor Dealer', dataIndex: 'fs_nomor_dealer', menuDisabled: true, hidden: true},
			{text: 'Nama Lembaga', dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, hidden: true},
			{text: 'Jenis Usaha', dataIndex: 'fs_jenis_usaha', menuDisabled: true, hidden: true},
			{text: 'Jenis Piutang', dataIndex: 'fs_jenis_piutang', menuDisabled: true, hidden: true},
			{text: 'Pola Transaksi', dataIndex: 'fs_pola_transaksi', menuDisabled: true, hidden: true},
			{text: 'Jenis Pembiayaan', dataIndex: 'fs_jenis_pembiayaan', menuDisabled: true, hidden: true},
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
			{text: 'Kode Kategori Usaha', dataIndex: 'fs_kategori_usaha_konsumen', menuDisabled: true, hidden: true},
			{text: 'Kategori Usaha', dataIndex: 'fs_nama_usaha_konsumen', menuDisabled: true, hidden: true},
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
			{text: 'Model Kendaraan', dataIndex: 'fs_model_kendaraan', menuDisabled: true, hidden: true},
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
			{text: 'No. Polisi', dataIndex: 'fs_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Wilayah No. Plat', dataIndex: 'fs_kode_wilayah_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Wilayah Akhir No. Plat', dataIndex: 'fs_kode_akhir_wilayah_no_polisi', menuDisabled: true, hidden: true},
			{text: 'Sales', dataIndex: 'fs_salesman', menuDisabled: true, hidden: true},
			{text: 'Jenis Asuransi', dataIndex: 'fs_jenis_asuransi', menuDisabled: true, hidden: true},
			{text: 'Nama Asuransi', dataIndex: 'fs_nama_perusahaan_asuransi', menuDisabled: true, hidden: true},
			{text: 'Kode Asuransi 1', dataIndex: 'fs_kode_asuransi1', menuDisabled: true, hidden: true},
			{text: 'Kode Asuransi 2', dataIndex: 'fs_kode_asuransi2', menuDisabled: true, hidden: true},
			{text: 'Nama Dealer', dataIndex: 'fs_nama_dealer', menuDisabled: true, hidden: true},
			{text: 'Kode Dealer 1', dataIndex: 'fs_kode_dealer1', menuDisabled: true, hidden: true},
			{text: 'Kode Dealer 2', dataIndex: 'fs_kode_dealer2', menuDisabled: true, hidden: true},
			{text: 'Cabang Dealer', dataIndex: 'fn_cabang_dealer', menuDisabled: true, hidden: true},
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
			{text: 'Alamat Pasangan', dataIndex: 'fs_alamat_pasangan', menuDisabled: true, hidden: true},
			{text: 'KodePos Pasangan', dataIndex: 'fs_kodepos_pasangan', menuDisabled: true, hidden: true},
			{text: 'Kota Pasangan', dataIndex: 'fs_kota_pasangan', menuDisabled: true, hidden: true},
			{text: 'HP Pasangan', dataIndex: 'fs_handphone_pasangan', menuDisabled: true, hidden: true},
			{text: 'Usaha Pasangan', dataIndex: 'fs_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Nama Usaha Pasangan', dataIndex: 'fs_nama_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Ket. Usaha Pasangan', dataIndex: 'fs_keterangan_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Alamat Usaha Pasangan', dataIndex: 'fs_alamat_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Telp. Usaha Pasangan', dataIndex: 'fs_telepon_usaha_pasangan', menuDisabled: true, hidden: true},
			{text: 'Pendapatan Pasangan', dataIndex: 'fn_pendapatan_pasangan', menuDisabled: true, hidden: true},
			{text: 'Nama Penjamin', dataIndex: 'fs_nama_penjamin', menuDisabled: true, hidden: true},
			{text: 'Alamat Penjamin', dataIndex: 'fs_alamat_penjamin', menuDisabled: true, hidden: true},
			{text: 'KodePos Penjamin', dataIndex: 'fs_kodepos_penjamin', menuDisabled: true, hidden: true},
			{text: 'Kota Penjamin', dataIndex: 'fs_kota_penjamin', menuDisabled: true, hidden: true},
			{text: 'Telp. Penjamin', dataIndex: 'fs_telepon_penjamin', menuDisabled: true, hidden: true},
			{text: 'Usaha Penjamin', dataIndex: 'fs_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Nama Usaha Penjamin', dataIndex: 'fs_nama_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Ket. Usaha Penjamin', dataIndex: 'fs_keterangan_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Alamat Usaha Penjamin', dataIndex: 'fs_alamat_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Telp. Usaha Penjamin', dataIndex: 'fs_telepon_usaha_penjamin', menuDisabled: true, hidden: true},
			{text: 'Pendapatan Penjamin', dataIndex: 'fn_pendapatan_penjamin', menuDisabled: true, hidden: true},
			{text: 'Status Penjamin', dataIndex: 'fs_status_penjamin', menuDisabled: true, hidden: true},
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
				Ext.getCmp('cboJnsUsaha').setValue(record.get('fs_jenis_pembiayaan'));
				Ext.getCmp('cboJnsPiutang').setValue(record.get('fs_jenis_piutang'));
				Ext.getCmp('txtKdLembaga1').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('txtKdLembaga2').setValue(record.get('fs_nomor_dealer'));
				Ext.getCmp('cboLembaga').setValue(record.get('fs_nama_lembaga_keuangan'));
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
				Ext.getCmp('txtNoTlpPerusahaan').setValue(record.get('fs_telfon_usaha_konsumen'));
				Ext.getCmp('cboKategoriUsaha').setValue(record.get('fs_nama_usaha_konsumen'));
				Ext.getCmp('txtKdKategoriUsaha').setValue(record.get('fs_kategori_usaha_konsumen'));
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

				// SET RECORD IN POPUP PERLUASAN
				Ext.getCmp('txtNoAPKPerluasan').setValue(record.get('fn_no_apk'));
				grupPerluasan.load();

				// SET RECORD IN POPUP TRANSAKSI
				Ext.getCmp('txtNoAPKTransaksi').setValue(record.get('fn_no_apk'));
				grupTransaksi.load();

				// SET RECORD IN TAB DATA TAMBAHAN
				Ext.getCmp('txtNoAPKTab6').setValue(record.get('fn_no_apk'));
				Ext.getCmp('txtNamaPasangan').setValue(record.get('fs_nama_pasangan'));
				Ext.getCmp('txtAlamatPasangan').setValue(record.get('fs_alamat_pasangan'));
				Ext.getCmp('cboKodePosPasangan').setValue(record.get('fs_kodepos_pasangan'));
				Ext.getCmp('txtKotaPasangan').setValue(record.get('fs_kota_pasangan'));
				Ext.getCmp('txtNoHpPasangan').setValue(record.get('fs_handphone_pasangan'));
				Ext.getCmp('cboUsahaPasangan').setValue(record.get('fs_nama_usaha_pasangan'));
				Ext.getCmp('txtKdUsahaPasangan').setValue(record.get('fs_usaha_pasangan'));
				Ext.getCmp('txtKetUsahaPasangan').setValue(record.get('fs_keterangan_usaha_pasangan'));
				Ext.getCmp('txtAlamatUsahaPasangan').setValue(record.get('fs_alamat_usaha_pasangan'));
				Ext.getCmp('txtNoTlpUsahaPasangan').setValue(record.get('fs_telepon_usaha_pasangan'));
				Ext.getCmp('txtPendapatanPasangan').setValue(record.get('fn_pendapatan_pasangan'));
				Ext.getCmp('txtNamaPenjamin').setValue(record.get('fs_nama_penjamin'));
				Ext.getCmp('txtAlamatPenjamin').setValue(record.get('fs_alamat_penjamin'));
				Ext.getCmp('cboKodePosPenjamin').setValue(record.get('fs_kodepos_penjamin'));
				Ext.getCmp('txtKotaPenjamin').setValue(record.get('fs_kota_penjamin'));
				Ext.getCmp('txtNoTlpPenjamin').setValue(record.get('fs_telepon_penjamin'));
				Ext.getCmp('cboUsahaPenjamin').setValue(record.get('fs_nama_usaha_penjamin'));
				Ext.getCmp('txtKdUsahaPenjamin').setValue(record.get('fs_usaha_penjamin'));
				Ext.getCmp('txtKetUsahaPenjamin').setValue(record.get('fs_keterangan_usaha_penjamin'));
				Ext.getCmp('txtAlamatUsahaPenjamin').setValue(record.get('fs_alamat_usaha_penjamin'));
				//Ext.getCmp('txtNoTlpUsahaPenjamin').setValue(record.get('fs_telepon_usaha_penjamin'));
				Ext.getCmp('txtPendapatanPenjamin').setValue(record.get('fn_pendapatan_penjamin'));
				Ext.getCmp('txtStatusPenjamin').setValue(record.get('fs_status_penjamin'));

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

	var grupDataPendukung = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridDataPendukung',
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
			url: 'apkperorangan/pendukungapk'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue(),
					'fn_no_apk': Ext.getCmp('txtNoAPKTab1').getValue(),
					'fs_cari': Ext.getCmp('txtCariPendukung').getValue()
				});
			}
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
			url: 'apkperorangan/gridlembaga'
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
			url: 'apkperorangan/pola'
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

	var grupJenisPerluasan = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'perluasan_asuransi'
				});
			}
		}
	});

	var grupPerluasan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPerluasan',
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
			url: 'apkperorangan/gridperluasan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab5').getValue()
				});
			}
		}
	});

	var grupMasterTrans = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridMasterTrans',
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
			url: 'apkperorangan/gridmastertrans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariMasterTrans').getValue()
				});
			}
		}
	});

	var grupTagihKonsumen = Ext.create('Ext.data.Store', {
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

	var grupCairDealer = Ext.create('Ext.data.Store', {
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
					'fs_kode_referensi': 'cairke_dealer'
				});
			}
		}
	});

	var grupTransaksi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridTransaksi',
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
			url: 'apkperorangan/gridtransaksi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_apk': Ext.getCmp('txtNoAPKTab5').getValue()
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
		store: grupDataPendukung,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, flex: 1},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, flex: 2},
			{text: "File Upload", dataIndex: 'fs_dokumen_upload', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dokumen',
				id: 'txtCariPendukung',
				name: 'txtCariPendukung',
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
					grupDataPendukung.load();
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
			store: grupDataPendukung,
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
				grupDataPendukung.load();
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

	// POPUP TAB FORM DATA STRUKTUR KREDIT
	var winGridMTrans = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupMasterTrans,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode", dataIndex: 'fs_kode_transaksi', menuDisabled: true, flex: 1},
			{text: "Nama Transaksi", dataIndex: 'fs_nama_transaksi', menuDisabled: true, flex: 2},
			{text: "Perkiraan", dataIndex: 'fs_kode_perkiraan', menuDisabled: true, hidden: true},
			{text: "Penjelasan", dataIndex: 'fs_penjelasan_transaksi', menuDisabled: true, hidden: true}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Transaksi',
				id: 'txtCariMasterTrans',
				name: 'txtCariMasterTrans',
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
					grupMasterTrans.load();
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
			store: grupMasterTrans,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCariMTrans.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodeTransaksi').setValue(record.get('fs_kode_transaksi'));
				Ext.getCmp('txtNamaTransaksi').setValue(record.get('fs_nama_transaksi'));
				winCariMTrans.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCariMTrans = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGridMTrans
		],
		listeners: {
			beforehide: function() {
				//vMask.hide();
			},
			beforeshow: function() {
				grupMasterTrans.load();
				vMask.show();
			}
		}
	});

	var winGrid11 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPerluasan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Jenis Perluasan", dataIndex: 'fs_jenis_perluasan', menuDisabled: true, flex: 1},
			{text: "Tenor", dataIndex: 'fn_tahun_ke', menuDisabled: true, flex: 1},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				id: 'txtNoAPKPerluasan',
				name: 'txtNoAPKPerluasan',
				xtype: 'textfield',
				hidden: true
			},{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Jenis Perluasan',
				id: 'cboJnsPerluasan',
				name: 'cboJnsPerluasan',
				labelAlign: 'top',
				store: grupJenisPerluasan,
				valueField: 'fs_kode',
				xtype: 'combobox'
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Tenor',
				fieldLabel: 'Tenor',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtTenorPerluasan',
				name: 'txtTenorPerluasan',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Add',
				handler: function() {
					var total = grupPerluasan.getCount();

					var xjenis = Ext.getCmp('cboJnsPerluasan').getValue();
					var data = Ext.create('DataGridPerluasan', {
						fs_jenis_perluasan: Ext.getCmp('cboJnsPerluasan').getValue(),
						fn_tahun_ke: Ext.getCmp('txtTenorPerluasan').getValue(),
					});

					var store = winGrid11.getStore();
					var xlanjut = true;

					store.each(function(record, idx) {
						var xtext = record.get('fs_jenis_perluasan');
						if (xtext == xjenis) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.OK,
								closable: false,
								icon: Ext.Msg.WARNING,
								msg: 'Jenis perluasan sudah ada di List...',
								title: 'MFAS'
							});
							xlanjut = false;
						}
					});

					if (xlanjut === false) {
						return;
					}

					var fs_jenis_perluasan = Ext.getCmp('cboJnsPerluasan').getValue();
					if (fs_jenis_perluasan === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jenis Perluasan, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					var fn_tahun_ke = Ext.getCmp('txtTenorPerluasan').getValue();
					if (fn_tahun_ke === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tenor, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					grupPerluasan.insert(total, data);

					Ext.getCmp('cboJnsPerluasan').setValue('');
					Ext.getCmp('txtTenorPerluasan').setValue('');

					total = grupPerluasan.getCount() - 1;
					winGrid11.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = winGrid11.getSelectionModel();
					grupPerluasan.remove(sm.getSelection());
					winGrid11.getView().refresh();

					if (grupPerluasan.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerluasan,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari11.hide();
				}
			}]
		}),
		listeners: {
			selectionchange: function(view, records) {
				winGrid11.down('#removeData').setDisabled(!records.length);
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
		title: 'Perluasan Asuransi',
		items: [
			winGrid11
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerluasan.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'Save',
			handler: function() {
				fnCekSaveDataPerluasan();
			}
		},{
			text: 'Close',
			handler: function() {
				winCari11.hide();
			}
		}]
	});

	var winGrid12 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 750,
		sortableColumns: false,
		store: grupTransaksi,
		columns: [
			{xtype: 'rownumberer', width: 25},
			{text: "Kode", dataIndex: 'fs_kode_transaksi', menuDisabled: true, flex: 0.5},
			{text: "Nama Transaksi", dataIndex: 'fs_nama_transaksi', menuDisabled: true, flex: 2},
			{text: "Persentase", dataIndex: 'fn_persentase_nilai_transaksi', menuDisabled: true, flex: 1},
			{text: "Nilai Transaksi", dataIndex: 'fn_nilai_transaksi', menuDisabled: true, flex: 1},
			{text: "Ditagih Konsumen", dataIndex: 'fs_tagih_ke_konsumen', menuDisabled: true, flex: 1},
			{text: "Cair ke Dealer", dataIndex: 'fs_cair_ke_dealer', menuDisabled: true, flex: 1},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				id: 'txtNoAPKTransaksi',
				name: 'txtNoAPKTransaksi',
				xtype: 'textfield',
				hidden: true
			},{
				anchor: '95%',
				emptyText: 'Kode',
				fieldLabel: 'Kode',
				editable: false,
				id: 'cboKodeTransaksi',
				name: 'cboKodeTransaksi',
				labelAlign: 'top',
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
							winCariMTrans.show();
							winCariMTrans.center();
						}
					}
				}
			}]
		},{
			flex: 2.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Nama Transaksi',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaTransaksi',
				name: 'txtNamaTransaksi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Persentase',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtPersentase',
				name: 'txtPersentase',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Nilai Transaksi',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNilaiTransaksi',
				name: 'txtNilaiTransaksi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Termasuk DP',
				id: 'cboDitagihKonsumen',
				name: 'cboDitagihKonsumen',
				labelAlign: 'top',
				store: grupTagihKonsumen,
				valueField: 'fs_kode',
				xtype: 'combobox'
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Tambah Cair',
				id: 'cboCairKeDealer',
				name: 'cboCairKeDealer',
				labelAlign: 'top',
				store: grupCairDealer,
				valueField: 'fs_kode',
				xtype: 'combobox'
			}]
		},{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Add',
				handler: function() {
					var total = grupTransaksi.getCount();
					var xkode = Ext.getCmp('cboKodeTransaksi').getValue();

					var data = Ext.create('DataGridTransaksi', {
						fs_kode_transaksi: Ext.getCmp('cboKodeTransaksi').getValue(),
						fs_nama_transaksi: Ext.getCmp('txtNamaTransaksi').getValue(),
						fn_persentase_nilai_transaksi: Ext.getCmp('txtPersentase').getValue(),
						fn_nilai_transaksi: Ext.getCmp('txtNilaiTransaksi').getValue(),
						fs_tagih_ke_konsumen: Ext.getCmp('cboDitagihKonsumen').getValue(),
						fs_cair_ke_dealer: Ext.getCmp('cboCairKeDealer').getValue()
					});

					var store = winGrid12.getStore();
					var xlanjut = true;

					store.each(function(record, idx) {
						var xtext = record.get('fs_kode_transaksi');
						if (xtext == xkode) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.OK,
								closable: false,
								icon: Ext.Msg.WARNING,
								msg: 'Kode Transaksi sudah ada di List...',
								title: 'MFAS'
							});
							xlanjut = false;
						}
					});

					if (xlanjut === false) {
						return;
					}

					var fs_kode_transaksi = Ext.getCmp('cboKodeTransaksi').getValue();
					if (fs_kode_transaksi === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Kode Transaksi, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					var fs_nama_transaksi = Ext.getCmp('txtNamaTransaksi').getValue();
					if (fs_nama_transaksi === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama Transaksi, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					var fn_persentase_nilai_transaksi = Ext.getCmp('txtPersentase').getValue();
					if (fn_persentase_nilai_transaksi === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Persentase, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					var fn_nilai_transaksi = Ext.getCmp('txtNilaiTransaksi').getValue();
					if (fn_nilai_transaksi === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai Transaksi, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					var fs_tagih_ke_konsumen = Ext.getCmp('cboDitagihKonsumen').getValue();
					if (fs_tagih_ke_konsumen === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Termasuk DP, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					var fs_cair_ke_dealer = Ext.getCmp('cboCairKeDealer').getValue();
					if (fs_cair_ke_dealer === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tambah Cair, belum diisi!',
							title: 'MFAS'
						});
						return;
					}

					grupTransaksi.insert(total, data);

					Ext.getCmp('cboKodeTransaksi').setValue('');
					Ext.getCmp('txtNamaTransaksi').setValue('');
					Ext.getCmp('txtPersentase').setValue('');
					Ext.getCmp('txtNilaiTransaksi').setValue('');
					Ext.getCmp('cboDitagihKonsumen').setValue('');
					Ext.getCmp('cboCairKeDealer').setValue('');

					total = grupTransaksi.getCount() - 1;
					winGrid12.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = winGrid12.getSelectionModel();
					grupTransaksi.remove(sm.getSelection());
					winGrid12.getView().refresh();

					if (grupTransaksi.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupTransaksi,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari12.hide();
				}
			}]
		}),
		listeners: {
			selectionchange: function(view, records) {
				winGrid12.down('#removeData').setDisabled(!records.length);
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
		title: 'Penambahan Kode Transaksi',
		items: [
			winGrid12
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupTransaksi.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'Save',
			handler: function() {
				fnCekSaveDataTransaksi();
			}
		},{
			text: 'Close',
			handler: function() {
				winCari12.hide();
			}
		}]
	});

	// POPUP TAB FORM DATA TAMBAHAN
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
					winCari13.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePosPasangan').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPasangan').setValue(record.get('fs_nama_dati'));
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
					winCari14.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboUsahaPasangan').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKdUsahaPasangan').setValue(record.get('fs_kode_sektor_ekonomi'));
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

	var winGrid15 = Ext.create('Ext.grid.Panel', {
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
					winCari15.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePosPenjamin').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKotaPenjamin').setValue(record.get('fs_nama_dati'));
				winCari15.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari15 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid15
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

	var winGrid16 = Ext.create('Ext.grid.Panel', {
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
					winCari16.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboUsahaPenjamin').setValue(record.get('fs_nama_sektor_ekonomi'));
				Ext.getCmp('txtKdUsahaPenjamin').setValue(record.get('fs_kode_sektor_ekonomi'));
				winCari16.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari16 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid16
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

	// COUNTING FUNCTION STRUKTUR KREDIT

	// COMPONENT GRID DAFTAR PERORANGAN
	var txtKodeCabang = {
		id: 'txtKodeCabang',
		name: 'txtKodeCabang',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoAPKTab1 = {
		id: 'txtNoAPKTab1',
		name: 'txtNoAPKTab1',
		xtype: 'textfield',
		hidden: true
	};

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
		xtype: 'combobox',
		listeners: {
			select: function(combo, record, index) {
				if (combo.getValue() == 'K') {
					// CALL BACK
					fnDisablePenjamin();
				} else {
					fnDisablePasangan();
				}
			}
		}
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

	var btnPerluasan = {
		anchor: '100%',
		id: 'btnPerluasan',
		name: 'btnPerluasan',
		text: 'Tambah Perluasan Asuransi',
		xtype: 'button',
		handler: fnShowPerluasan
	};

	var checkTJH = {
		boxLabel: 'TJH (Ya/Tidak)',
		checked: false,
		id: 'checkTJH',
		name: 'checkTJH',
		xtype: 'checkboxfield',
		listeners : {

		}
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
		alwaysDisplayDecimals: true,
		anchor: '100%',
		currencySymbol: '',
		decimalPrecision: 0,
		decimalSeparator: '.',
		editable: true,
		fieldLabel: 'Biaya Administrasi',
		hideTrigger: true,
		id: 'txtBiayaADM',
		name: 'txtBiayaADM',
		xtype: 'numericfield',
		keyNavEnabled: false,
		mouseWheelEnabled: false,
		thousandSeparator: ',',
		useThousandSeparator: true,
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

	var btnTambahTransaksi = {
		anchor: '100%',
		id: 'btnTambahTransaksi',
		name: 'btnTambahTransaksi',
		text: 'Tambah Kode Transaksi',
		xtype: 'button',
		handler: fnShowTransaksi
	};

	var txtSelisihTotalDP = {
		anchor: '100%',
		fieldLabel: 'SELISIH TOTAL DP',
		fieldStyle: 'text-transform: uppercase;',
		labelAlign: 'top',
		id: 'txtSelisihTotalDP',
		name: 'txtSelisihTotalDP',
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
		anchor: '95%',
		fieldLabel: 'Harga OTR',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		anchor: '95%',
		fieldLabel: 'Uang Muka',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		anchor: '95%',
		fieldLabel: 'Asuransi',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		fieldLabel: '',
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
		anchor: '95%',
		fieldLabel: 'Pokok Pembiayaan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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

	var txtBungaFlatDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: 'Bunga (%Flat/Efektif)',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtBungaFlatDealer',
		name: 'txtBungaFlatDealer',
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

	var txtBungaEfektifDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '85%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtBungaEfektifDealer',
		name: 'txtBungaEfektifDealer',
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

	var txtBungaFlatKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtBungaFlatKonsumen',
		name: 'txtBungaFlatKonsumen',
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

	var txtBungaEfektifKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtBungaEfektifKonsumen',
		name: 'txtBungaEfektifKonsumen',
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

	var txtTenorBulanDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: 'Tenor (bln/kali)',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtTenorBulanDealer',
		name: 'txtTenorBulanDealer',
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

	var txtTenorKaliDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '85%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtTenorKaliDealer',
		name: 'txtTenorKaliDealer',
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

	var txtTenorBulanKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtTenorBulanKonsumen',
		name: 'txtTenorBulanKonsumen',
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

	var txtTenorKaliKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtTenorKaliKonsumen',
		name: 'txtTenorKaliKonsumen',
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
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: 'Bunga',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtBungaDealer',
		name: 'txtBungaDealer',
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

	var txtBungaKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
		readOnly: true,
		hideTrigger: true,
		id: 'txtBungaKonsumen',
		name: 'txtBungaKonsumen',
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

	var txtAngsuranDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		fieldLabel: 'Angsuran /Bulan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		anchor: '95%',
		fieldLabel: 'Piutang Pembiayaan',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		fieldLabel: '',
		fieldStyle: 'text-align:right; background-color: #eee; background-image: none;',
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
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
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
					winCari13.show();
					winCari13.center();
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

	var txtNoHpPasangan = {
		anchor: '100%',
		fieldLabel: 'No. Handphone',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoHpPasangan',
		name: 'txtNoHpPasangan',
		xtype: 'textfield'
	};

	var txtKotaPasangan = {
		anchor: '100%',
		fieldLabel: 'Kota / Kabupaten',
		fieldStyle: 'text-transform: uppercase; background-color: #eee; background-image: none;',
		readOnly: true,
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
					winCari14.show();
					winCari14.center();
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
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
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
					winCari15.show();
					winCari15.center();
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
		fieldStyle: 'text-transform: uppercase; background-color: #eee; background-image: none;',
		readOnly: true,
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
					winCari16.show();
					winCari16.center();
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
		anchor: '100%',
		fieldLabel: 'Status Penjamin',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtStatusPenjamin',
		name: 'txtStatusPenjamin',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
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
		fieldLabel: 'Tanggal Angsuran 1',
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

	// FUNCTION BUTTON POPUP
	function fnShowPerluasan() {
		winCari11.show();
		winCari11.center();
	}

	function fnShowTransaksi() {
		winCari12.show();
		winCari12.center();
	}

	// FUNCTION GRID DAFTAR PERORANGAN
	function fnShowPreview(xkdcabang, xnoapk) {
		var popUp = Ext.create('Ext.window.Window', {
			modal: true,
			width: 950,
			height: 600,
			closable: false,
			layout:'anchor',
			title: 'DAFTAR PEMERIKSAAN APK',
			buttons: [{
				text: 'Close',
				handler: function() {
					vMask.hide();
					popUp.hide();
				}
			}]
		});

		popUp.add({html: '<iframe width="950" height="600" src="apkperorangan/preview/'+ xkdcabang +'/'+ xnoapk +'"></iframe>'});
		popUp.show();
	}

	function fnCekDuplikasi(xkdcabang, xnoapk) {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'GET',
			url: 'apkperorangan/cekduplikasi/' + xkdcabang + '/' + xnoapk,
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
						icon: Ext.Msg.QUESTION,
						msg: xtext.hasil,
						title: 'MFAS',
						fn: function(btn) {
							if (btn == 'yes') {
								fnDuplikasi(xkdcabang, xnoapk);
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
					message: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
			}
		});
	}

	function fnDuplikasi(xkdcabang, xnoapk) {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'GET',
			url: 'apkperorangan/duplikasi/' + xkdcabang + '/' + xnoapk,
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});

				// LOAD DATA
				grupPerorangan.load();
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					message: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
			}
		});
	}

	// SHOW POPUP DATA PENDUKUNG
	function fnShowDataPendukung(xkdcabang, xnoapk) {
		// SET VALUE
		Ext.getCmp('txtKodeCabang').setValue(xkdcabang);
		Ext.getCmp('txtNoAPKTab1').setValue(xnoapk);
		
		winCari2.show();
		winCari2.center();
	}

	// FUNCTIONS FIELD DISABLED
	function fnDisablePasangan() {
		// FIELDSET PASANGAN DISABLE
		Ext.getCmp('txtNamaPasangan').setDisabled(true);
		Ext.getCmp('txtAlamatPasangan').setDisabled(true);
		Ext.getCmp('cboKodePosPasangan').setDisabled(true);
		Ext.getCmp('txtKotaPasangan').setDisabled(true);
		Ext.getCmp('txtNoHpPasangan').setDisabled(true);
		Ext.getCmp('cboUsahaPasangan').setDisabled(true);
		Ext.getCmp('txtKetUsahaPasangan').setDisabled(true);
		Ext.getCmp('txtAlamatUsahaPasangan').setDisabled(true);
		Ext.getCmp('txtNoTlpUsahaPasangan').setDisabled(true);
		Ext.getCmp('txtPendapatanPasangan').setDisabled(true);
		// FIELDSET PENJAMIN ENABLE
		Ext.getCmp('txtNamaPenjamin').setDisabled(false);
		Ext.getCmp('txtAlamatPenjamin').setDisabled(false);
		Ext.getCmp('cboKodePosPenjamin').setDisabled(false);
		Ext.getCmp('txtKotaPenjamin').setDisabled(false);
		Ext.getCmp('txtNoTlpPenjamin').setDisabled(false);
		Ext.getCmp('cboUsahaPenjamin').setDisabled(false);
		Ext.getCmp('txtKetUsahaPenjamin').setDisabled(false);
		Ext.getCmp('txtAlamatUsahaPenjamin').setDisabled(false);
		Ext.getCmp('txtPendapatanPenjamin').setDisabled(false);
		Ext.getCmp('txtStatusPenjamin').setDisabled(false);
	}

	function fnDisablePenjamin() {
		// FIELDSET PASANGAN ENABLE
		Ext.getCmp('txtNamaPasangan').setDisabled(false);
		Ext.getCmp('txtAlamatPasangan').setDisabled(false);
		Ext.getCmp('cboKodePosPasangan').setDisabled(false);
		Ext.getCmp('txtKotaPasangan').setDisabled(false);
		Ext.getCmp('txtNoHpPasangan').setDisabled(false);
		Ext.getCmp('cboUsahaPasangan').setDisabled(false);
		Ext.getCmp('txtKetUsahaPasangan').setDisabled(false);
		Ext.getCmp('txtAlamatUsahaPasangan').setDisabled(false);
		Ext.getCmp('txtNoTlpUsahaPasangan').setDisabled(false);
		Ext.getCmp('txtPendapatanPasangan').setDisabled(false);
		// FIELDSET PENJAMIN DISABLE
		Ext.getCmp('txtNamaPenjamin').setDisabled(true);
		Ext.getCmp('txtAlamatPenjamin').setDisabled(true);
		Ext.getCmp('cboKodePosPenjamin').setDisabled(true);
		Ext.getCmp('txtKotaPenjamin').setDisabled(true);
		Ext.getCmp('txtNoTlpPenjamin').setDisabled(true);
		Ext.getCmp('cboUsahaPenjamin').setDisabled(true);
		Ext.getCmp('txtKetUsahaPenjamin').setDisabled(true);
		Ext.getCmp('txtAlamatUsahaPenjamin').setDisabled(true);
		Ext.getCmp('txtPendapatanPenjamin').setDisabled(true);
		Ext.getCmp('txtStatusPenjamin').setDisabled(true);
	}

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
				'fs_jenis_pembiayaan': Ext.getCmp('cboJnsUsaha').getValue(),
				'fs_kode_lokasi': Ext.getCmp('txtKdLembaga1').getValue(),
				'fs_nomor_dealer': Ext.getCmp('txtKdLembaga2').getValue(),
				'fs_nama_lembaga_keuangan': Ext.getCmp('cboLembaga').getValue(),
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
					// SET NO APK & NO PJJ
					Ext.getCmp('txtNoAPK').setValue(xtext.noapk);
					Ext.getCmp('txtNoPJJ').setValue(xtext.nopjj);

					// SET NO APK IN ALL TABPANEL
					Ext.getCmp('txtNoAPKTab3').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab4').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab5').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab6').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTab7').setValue(xtext.noapk);

					// SET NO APK IN POPUP
					Ext.getCmp('txtNoAPKPerluasan').setValue(xtext.noapk);
					Ext.getCmp('txtNoAPKTransaksi').setValue(xtext.noapk);

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
				'fs_nama_usaha_konsumen': Ext.getCmp('cboKategoriUsaha').getValue(),
				'fs_kategori_usaha_konsumen': Ext.getCmp('txtKdKategoriUsaha').getValue(),
				'fs_skala_perusahaan_konsumen': Ext.getCmp('cboSkalaPerusahaan').getValue(),
				'fs_kerja_sejak_konsumen': Ext.getCmp('txtKerjaSejak').getValue(),
				'fn_pendapatan_konsumen': Ext.getCmp('txtPendapatan').getValue(),
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
		Ext.getCmp('txtNomorPolisi').setValue('');
		Ext.getCmp('txtNoBlkPolisi').setValue('');
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
				'fs_jenis_asuransi': Ext.getCmp('cboJnsAsuransi').getValue(),
				'fs_nama_perusahaan_asuransi': Ext.getCmp('cboPerusahaanAsuransi').getValue(),
				'fs_kode_asuransi1': Ext.getCmp('txtKdAsuransi1').getValue(),
				'fs_kode_asuransi2': Ext.getCmp('txtKdAsuransi2').getValue(),
				'fs_nama_dealer': Ext.getCmp('cboDealer').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKdDealer1').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtKdDealer2').getValue(),
				'fn_cabang_dealer': Ext.getCmp('txtCabangDealer').getValue(),
				'fs_salesman': Ext.getCmp('txtSales').getValue()
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

	function fnCekSaveDataPerluasan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkperorangan/ceksavedataperluasan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKPerluasan').getValue()
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
								fnSaveDataPerluasan();
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

	function fnSaveDataPerluasan() {
		var xjenis_perluasan = '';
		var xtahun_ke = '';

		var store = winGrid11.getStore();
		store.each(function(record, idx) {
			xjenis_perluasan = xjenis_perluasan +'|'+ record.get('fs_jenis_perluasan');
			xtahun_ke = xtahun_ke +'|'+ record.get('fn_tahun_ke');
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkperorangan/savedataperluasan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKPerluasan').getValue(),
				'fs_jenis_perluasan': xjenis_perluasan,
				'fn_tahun_ke': xtahun_ke
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

				// LOAD DATA
				grupPerluasan.load();
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

	function fnCekSaveDataTransaksi() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkperorangan/ceksavedatatransaksi',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTransaksi').getValue()
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
								fnSaveDataTransaksi();
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

	function fnSaveDataTransaksi() {
		var xkode_transaksi = '';
		var xnama_transaksi = '';
		var xpersentase_nilai_transaksi = '';
		var xnilai_transaksi = '';
		var xtagih_ke_konsumen = '';
		var xcair_ke_dealer = '';

		var store = winGrid12.getStore();
		store.each(function(record, idx) {
			xkode_transaksi = xkode_transaksi +'|'+ record.get('fs_kode_transaksi');
			xnama_transaksi = xnama_transaksi +'|'+ record.get('fs_nama_transaksi');
			xpersentase_nilai_transaksi = xpersentase_nilai_transaksi +'|'+ record.get('fn_persentase_nilai_transaksi');
			xnilai_transaksi = xnilai_transaksi +'|'+ record.get('fn_nilai_transaksi');
			xtagih_ke_konsumen = xtagih_ke_konsumen +'|'+ record.get('fs_tagih_ke_konsumen');
			xcair_ke_dealer = xcair_ke_dealer +'|'+ record.get('fs_cair_ke_dealer');
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'apkperorangan/savedatatransaksi',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPKTransaksi').getValue(),
				'fs_kode_transaksi': xkode_transaksi,
				'fs_nama_transaksi': xnama_transaksi,
				'fn_persentase_nilai_transaksi': xpersentase_nilai_transaksi,
				'fn_nilai_transaksi': xnilai_transaksi,
				'fs_tagih_ke_konsumen': xtagih_ke_konsumen,
				'fs_cair_ke_dealer': xcair_ke_dealer
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

				// LOAD DATA
				grupTransaksi.load();
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
		Ext.getCmp('txtNoHpPasangan').setValue('');
		Ext.getCmp('cboUsahaPasangan').setValue('');
		Ext.getCmp('txtKdUsahaPasangan').setValue('');
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
		Ext.getCmp('txtKdUsahaPenjamin').setValue('');
		Ext.getCmp('txtKetUsahaPenjamin').setValue('');
		Ext.getCmp('txtAlamatUsahaPenjamin').setValue('');
		Ext.getCmp('txtPendapatanPenjamin').setValue('');
		Ext.getCmp('txtStatusPenjamin').setValue('');
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
				'fs_alamat_pasangan': Ext.getCmp('txtAlamatPasangan').getValue(),
				'fs_kodepos_pasangan': Ext.getCmp('cboKodePosPasangan').getValue(),
				'fs_kota_pasangan': Ext.getCmp('txtKotaPasangan').getValue(),
				'fs_handphone_pasangan': Ext.getCmp('txtNoHpPasangan').getValue(),
				'fs_nama_usaha_pasangan': Ext.getCmp('cboUsahaPasangan').getValue(),
				'fs_usaha_pasangan': Ext.getCmp('txtKdUsahaPasangan').getValue(),
				'fs_keterangan_usaha_pasangan': Ext.getCmp('txtKetUsahaPasangan').getValue(),
				'fs_alamat_usaha_pasangan': Ext.getCmp('txtAlamatUsahaPasangan').getValue(),
				'fs_telepon_usaha_pasangan': Ext.getCmp('txtNoTlpUsahaPasangan').getValue(),
				'fn_pendapatan_pasangan': Ext.getCmp('txtPendapatanPasangan').getValue(),
				'fs_nama_penjamin': Ext.getCmp('txtNamaPenjamin').getValue(),
				'fs_alamat_penjamin': Ext.getCmp('txtAlamatPenjamin').getValue(),
				'fs_kota_penjamin': Ext.getCmp('txtKotaPenjamin').getValue(),
				'fs_kodepos_penjamin': Ext.getCmp('cboKodePosPenjamin').getValue(),
				'fs_telepon_penjamin': Ext.getCmp('txtNoTlpPenjamin').getValue(),
				'fs_nama_usaha_penjamin': Ext.getCmp('cboUsahaPenjamin').getValue(),
				'fs_usaha_penjamin': Ext.getCmp('txtKdUsahaPenjamin').getValue(),
				'fs_keterangan_usaha_penjamin': Ext.getCmp('txtKetUsahaPenjamin').getValue(),
				'fs_alamat_usaha_penjamin': Ext.getCmp('txtAlamatUsahaPenjamin').getValue(),
				'fs_telepon_usaha_penjamin': '',
				'fn_pendapatan_penjamin': Ext.getCmp('txtPendapatanPenjamin').getValue(),
				'fs_status_penjamin': Ext.getCmp('txtStatusPenjamin').getValue()
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
				'fd_tanggal_angsuran_pertama': Ext.Date.format(Ext.getCmp('cboTglAngsuran').getValue(), 'Y-m-d'),
				'fd_tanggal_perjanjian': Ext.Date.format(Ext.getCmp('cboTglCair').getValue(), 'Y-m-d'),
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
						gridPerorangan,
						txtKodeCabang,
						txtNoAPKTab1
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
								xtype: 'fieldset',
								items: [
									txtTdkAngsuran,
									cboPotongPencairan,
									btnPerluasan,
									checkTJH
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
									txtAngsuranDimuka,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												anchor: '100%',
												style: 'padding: 5px;',
												xtype: 'fieldset',
												items: [
													btnTambahTransaksi
												]
											}]
										}]
									},
									txtUangMuka,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 1,
											layout: 'anchor',
											xtype: 'container',
											items: [{
												anchor: '100%',
												style: 'padding: 5px;',
												xtype: 'fieldset',
												items: [
													txtSelisihTotalDP
												]
											}]
										}]
									},
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
								title: 'Hasil Perhitungan Dealer & Konsumen',
								xtype: 'fieldset',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtHargaOTRDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtHargaOTRKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtUangMukaDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtUangMukaKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtAsuransiDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtAsuransiKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtPokokPembiayaanDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtPokokPembiayaanKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtBungaFlatDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtBungaEfektifDealer
										]
									},{
										flex: 0.9,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtBungaFlatKonsumen
										]
									},{
										flex: 0.9,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtBungaEfektifKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtTenorBulanDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtTenorKaliDealer
										]
									},{
										flex: 0.9,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtTenorBulanKonsumen
										]
									},{
										flex: 0.9,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtTenorKaliKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtBungaDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtBungaKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtAngsuranDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtAngsuranKonsumen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.7,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtPiutangDealer
										]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtPiutangKonsumen
										]
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
								title: 'Form Suami / Istri',
								xtype: 'fieldset',
								items: [
									txtNoAPKTab6,
									txtNamaPasangan,
									txtAlamatPasangan,
									cboKodePosPasangan,
									txtKdDatiPasangan,
									txtKotaPasangan,
									txtNoHpPasangan,
									cboUsahaPasangan,
									txtKdUsahaPasangan,
									txtKetUsahaPasangan,
									txtAlamatUsahaPasangan,
									txtNoTlpUsahaPasangan,
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
									txtPendapatanPenjamin,
									txtStatusPenjamin
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