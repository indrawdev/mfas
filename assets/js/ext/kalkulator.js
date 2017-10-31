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

	Ext.define('DataGridPerluasan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fn_tahun_ke', type: 'string'},
			{name: 'fs_jenis_perluasan', type: 'string'}
		]
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
			url: 'kalkulator/pola'
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
			url: 'kalkulator/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'kalkulator': 'jenis_piutang'
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
			url: 'kalkulator/gridkendaraan'
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
			url: 'kalkulator/combo'
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
			url: 'kalkulator/gridasuransi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariAsuransi').getValue()
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
			url: 'kalkulator/select'
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
			url: 'kalkulator/combo'
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
			url: 'kalkulator/select'
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
			url: 'kalkulator/combo'
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
			url: 'kalkulator/combo'
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
			url: 'kalkulator/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pencairan_ke'
				});
			}
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
			url: 'kalkulator/select'
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
			url: 'kalkulator/gridperluasan'
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
			url: 'kalkulator/combo'
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
			url: 'kalkulator/select'
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
			url: 'kalkulator/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'uangmuka_ke'
				});
			}
		}
	});

	// COMPONENT FORM TAB UTAMA
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

	// COMPONENT FORM TAB STRUKTUR KREDIT
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
		anchor: '100%',
		fieldLabel: 'Biaya Administrasi',
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

	// COMPONENT FORM TAB PENCAIRAN
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


	// FUNCTION BUTTON POPUP
	function fnShowPerluasan() {
		winCari11.show();
		winCari11.center();
	}

	function fnShowTransaksi() {
		winCari12.show();
		winCari12.center();
	}

	// FUNCTION FORM TAB KENDARAAN


	// FUNCTION FORM TAB STRUKTUR KREDIT


	// FUNCTION FORM TAB PENCAIRAN

	var frmKalkulator = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Kalkulator Kredit',
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
				title: 'Data Utama & Kendaraan',
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
								title: 'Form Data Utama',
								xtype: 'fieldset',
								items: [
									cboTglAPK,
									cboJnsPiutang,
									cboPolaTransaksi
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
								title: 'Form Data Kendaraan',
								xtype: 'fieldset',
								items: [
									cboModelKendaraan,
									txtJnsKendaraan,
									txtTahunKendaraan,
									cboKomersil

								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Struktur Kredit',
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
								title: '',
								xtype: 'fieldset',
								items: [
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
				}]
			},{
				id: 'tab3',
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
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKalkulator
	});

	function fnMaskShow() {
		frmKalkulator.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKalkulator.unmask();
	}
	
	frmKalkulator.render(Ext.getBody());
	Ext.get('loading').destroy();
});