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

				// SET RECORD IN TAB DATA BADAN USAHA

				// SET RECORD IN TAB DATA KENDARAAN

				// SET RECORD IN TAB DATA STRUKTUR KREDIT

				// SET RECORD IN TAB DATA PENGURUS

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
			url: 'apkbadanusaha/gridlembaga'
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
			url: 'apkbadanusaha/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pola_transaksi'
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
		autoLoad: true,
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
					'fs_cari': Ext.getCmp('txtCariPengurus').getValue()
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
			{text: "Nama Lembaga Keuangan", dataIndex: 'fs_nama_lembaga_keuangan', menuDisabled: true, flex: 2.5}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Lembaga Keuangan',
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
			text: 'Jabatan',
			dataIndex: 'fs_jabatan_pengurus',
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
					var str2 = grid.getStore().getAt(rowIndex).get('fs_nama_pengurus');
					if (str1 && str2) {
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
											'fs_nama_pengurus': str2
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
				//Ext.getCmp('txtKdRef').setValue(record.get('fs_kode_referensi'));
				//Ext.getCmp('txtNilai1').setValue(record.get('fs_nilai1_referensi'));
				//Ext.getCmp('txtNilai2').setValue(record.get('fs_nilai2_referensi'));
				//Ext.getCmp('txtNamaRef').setValue(record.get('fs_nama_referensi'));
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
		xtype: 'datefield'
	};

	var cboLembaga = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Lembaga Keuangan',
		fieldLabel: 'Lembaga Keuangan',
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
		emptyText: '',
		id: 'txtNamaPenanggungJawab',
		name: 'txtNamaPenanggungJawab',
		xtype: 'textfield'
	};

	var txtJabatanPenanggungJawab = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Jabatan',
		emptyText: '',
		id: 'txtJabatanPenanggungJawab',
		name: 'txtJabatanPenanggungJawab',
		xtype: 'textfield'
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

	var cboBayarDimuka = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Dimuka',
		id: 'cboBayarDimuka',
		name: 'cboBayarDimuka',
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
	var cboJabatan = {
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
		anchor: '100%',
		fieldLabel: 'Nama Pengurus',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaPengurus',
		name: 'txtNamaPengurus',
		xtype: 'textfield'
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
		xtype: 'textfield'
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

	// FUNCTIONS TAB DATA UTAMA
	function fnResetDataUtama() {
		// FORM APK
		Ext.getCmp('txtNoAPK').setValue('');
		Ext.getCmp('cboTglAPK').setValue(new Date());
		Ext.getCmp('cboLembaga').setValue('');
		Ext.getCmp('txtKdLembaga1').setValue('');
		Ext.getCmp('txtKdLembaga2').setValue('');
		Ext.getCmp('cboJnsPiutang').setValue('');
		Ext.getCmp('cboPolaTransaksi').setValue('');
		Ext.getCmp('txtNoPJJ').setValue('');
		Ext.getCmp('cboFleet').setValue('');
		// FORM LOKASI BADAN USAHA
		Ext.getCmp('txtNamaBadanUsaha').setValue('');
		Ext.getCmp('txtAlamatBadanUsaha').setValue('');
		Ext.getCmp('cboKodePos').setValue('');
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
					'fn_no_apk':''
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
		Ext.getCmp('txtNoTlpPerusahaan').setValue('');
		Ext.getCmp('cboKategoriUsaha').setValue('');
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
				url: 'apkbadanusaha/ceksavedatabadanusaha',
				params: {
					'fn_no_apk':''
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
			url: 'apkbadanusaha/savedatabadanusaha',
			params: {

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
		// FORM ASURANSI
		Ext.getCmp('cboJnsAsuransi').setValue('');
		Ext.getCmp('cboPerusahaanAsuransi').setValue('');
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
				url: 'apkbadanusaha/ceksavedatakendaraan',
				params: {
					'fn_no_apk':''
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
	}

	// FUNCTIONS TAB DATA STRUKTUR KREDIT
	function fnResetDataStrukturKredit() {
		Ext.getCmp('cboPolaAngsuran').setValue('');
		Ext.getCmp('cboBayarDimuka').setValue('');
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
					'fn_no_apk':''
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
					'fn_no_apk':''
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
					'fn_no_apk':''
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
								title: '',
								xtype: 'fieldset',
								items: [
									cboPolaAngsuran,
									cboBayarDimuka,
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