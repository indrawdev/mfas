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
				emptyText: 'Model / Jenis / Merek / Kota / Silinder',
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
		xtype: 'datefield'
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
					winCari7.show();
					winCari7.center();
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

	var cboBayarDimuka = {
		afterLabelTextTpl: required,
		allowBlank: false,
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
		Ext.getCmp('cboTglAPK').setValue('');
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
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
					'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
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
				'fn_no_apk': '',
				'fn_no_pjj': '',
				'': '',
				'': '',
				'': '',
				'': '',
				'': '',
				'': '',
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
					tabPanel.setActiveTab('tab2');
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

	// FUNCTIONS TAB DATA PERORANGAN
	function fnResetDataPerorangan() {
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
		Ext.getCmp('cboStatusPerkawinan').setValue('');
		Ext.getCmp('cboStatusRumah').setValue('');
		Ext.getCmp('cboAgama').setValue('');
		Ext.getCmp('cboPendidikan').setValue('');
		Ext.getCmp('txtNamaIbu').setValue('');
		// FORM ALAMAT SURAT
		Ext.getCmp('txtAlamatSurat').setValue('');
		Ext.getCmp('cboKodePosKonsumen').setValue('');
		Ext.getCmp('txtKotaKonsumen').setValue('');
	}

	function fnCekSaveDataPerorangan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'apkperorangan/ceksavedataperorangan',
				params: {
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
					'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
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
									fnSaveDataPerorangan();
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

	function fnSaveDataPerorangan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
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
		// FORM ASURANSI
		Ext.getCmp('cboJnsAsuransi').setValue('');
		Ext.getCmp('cboPerusahaanAsuransi').setValue('');
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
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
					'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
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
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
					'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
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

	// FUNCTIONS TAB DATA TAMBAHAN
	function fnResetDataTambahan() {
		// FORM PASANGAN
		Ext.getCmp('txtNamaPasangan').setValue('');
		Ext.getCmp('txtAlamatPasangan').setValue('');
		Ext.getCmp('cboKodePosPasangan').setValue('');
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
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
					'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
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
			url: 'apkperorangan/ceksavedatatambahan',
			params: {
				'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
				'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
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
					'fn_no_apk': Ext.getCmp('txtNoAPK').getValue(),
					'fn_no_pjj': Ext.getCmp('txtNoPJJ').getValue()
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
					handler: fnCekSaveDataPerorangan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetDataPerorangan
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
									txtNamaPasangan,
									txtAlamatPasangan,
									cboKodePosPasangan,
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