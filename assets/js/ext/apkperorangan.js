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
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'No. APK',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			width: 90
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			width: 240
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			width: 90,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		}],
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

				// SET RECORD IN TAB DATA KONSUMEN

				// SET RECORD IN TAB DATA KENDARAAN

				// SET RECORD IN TAB DATA STRUKTUR KREDIT

				// SET RECORD IN TAB DATA TAMBAHAN

				// SET RECORD IN TAB DATA PENCAIRAN

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
			url: 'apkperorangan/lembaga'
		}
	});

	// GROUP SELECT 'TM_REFERENSI'
	var grupJenisPiutan = Ext.create('Ext.data.Store', {
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
		xtype: 'datefield'
	};

	var cboLembaga = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Lembaga Pembiayaan',
		id: 'cboLembaga',
		name: 'cboLembaga',
		store: '',
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboJnsUsaha = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis Usaha',
		id: 'cboJnsUsaha',
		name: 'cboJnsUsaha',
		store: '',
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
		store: '',
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
		store: '',
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
		store: '',
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

				}
			}
		}
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
		xtype: 'datefield'
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

				}
			}
		}
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
		store: '',
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

				}
			}
		}
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
		store: '',
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
		xtype: 'datefield'
	};
	

	var cboAgama = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Agama',
		id: 'cboAgama',
		name: 'cboAgama',
		store: '',
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
		store: '',
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
		store: '',
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
		store: '',
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

				}
			}
		}
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

				}
			}
		}
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
		store: '',
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

				}
			}
		}
	};

	var cboKomersil = {

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
	var cboPolaAngsuran = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Pola Angsuran',
		id: 'cboPolaAngsuran',
		name: 'cboPolaAngsuran',
		store: '',
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
		store: '',
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

	var cboBayarDimuka = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Dimuka',
		id: 'cboBayarDimuka',
		name: 'cboBayarDimuka',
		store: '',
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
		fieldLabel: 'Dimuka',
		id: 'cboPotongPencairan',
		name: 'cboPotongPencairan',
		store: '',
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
		store: '',
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	// COMPONENT FORM DATA TAMBAHAN
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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

				}
			}
		}
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
		afterLabelTextTpl: required,
		allowBlank: false,
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

				}
			}
		}
	};

	var txtKetUsahaPasangan = {
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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

				}
			}
		}
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
		afterLabelTextTpl: required,
		allowBlank: false,
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

				}
			}
		}
	};

	var txtKetUsahaPenjamin = {
		afterLabelTextTpl: required,
		allowBlank: false,
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
		afterLabelTextTpl: required,
		allowBlank: false,
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
		xtype: 'datefield'
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
		store: '',
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
		store: '',
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
		store: '',
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

	}

	function fnCekSaveDataUtama() {

	}

	function fnSaveDataUtama() {

	}

	// FUNCTIONS TAB DATA PERORANGAN
	function fnResetDataPerorangan() {

	}

	function fnCekSaveDataPerorangan() {

	}

	function fnSaveDataPerorangan() {

	}

	// FUNCTIONS TAB DATA KENDARAAN
	function fnResetDataKendaraan() {

	}

	function fnCekSaveDataKendaraan() {

	}

	function fnSaveDataKendaraan() {

	}

	// FUNCTIONS TAB DATA STRUKTUR KREDIT
	function fnResetDataStrukturKredit() {

	}

	function fnCekSaveDataStrukturKredit() {

	}

	function fnSaveDataStrukturKredit() {

	}

	// FUNCTIONS TAB DATA PENGURUS
	function fnResetDataPengurus() {

	}

	function fnCekSaveDataPengurus() {

	}

	function fnSaveDataPengurus() {

	}

	// FUNCTIONS TAB DATA PENCAIRAN
	function fnResetDataPencairan() {

	}

	function fnCekSaveDataPencairan() {

	}

	function fnSaveDataPencairan() {

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
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Konsumen',
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
									txtNamaPerusahaan,
									txtAlamatPerusahaan,
									txtNoTlpPerusahaan,
									cboKategoriUsaha,
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
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
				}]
			},{
				id: 'tab4',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Kendaraan',
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
									cboModelKendaraan,
									txtJnsKendaraan,
									txtSilinder,
									txtTahunKendaraan,
									txtWarnaKendaraan,
									txtNoRangka,
									txtNoMesin
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
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
				}]
			},{
				id: 'tab5',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Struktur Kredit',
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
									cboPolaAngsuran,
									cboBayarDimuka
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
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
				}]
			},{
				id: 'tab6',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Tambahan',
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
									txtNamaPasangan,
									txtAlamatPasangan,
									cboKodePosPasangan,
									txtKotaPasangan,
									txtNoTlpPasangan,
									cboUsahaPasangan,
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
									txtKotaPenjamin,
									txtNoTlpPenjamin,
									cboUsahaPenjamin,
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
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
				}]
			},{
				id: 'tab7',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pencairan',
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
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
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