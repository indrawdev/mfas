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

	Ext.define('DataGridRetail', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'},
			{name: 'fs_jenis_pembiayaan', type: 'string'}
		]
	});

	Ext.define('DataGridFleet', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_no_batch', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'},
			{name: 'fs_jenis_pembiayaan', type: 'string'}
		]
	});

	Ext.define('DataGridHasil', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_alamat_konsumen', type: 'string'},
			{name: 'fd_tanggal_survey', type: 'string'},
			{name: 'fs_petugas_survey', type: 'string'},
			{name: 'fn_lama_survey', type: 'string'},
			{name: 'fs_kondisi_lingkungan', type: 'string'}
		]
	});

	var grupRetail = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridRetail',
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
			url: 'inputsurvey/gridretail'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariRetail').getValue()
				});
			}
		}
	});

	var grupFleet = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridFleet',
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
			url: 'inputsurvey/gridfleet'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariFleet').getValue()
				});
			}
		}
	});

	var grupHasil = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridHasil',
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
			url: 'inputsurvey/gridhasil'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariHasil').getValue()
				});
			}
		}
	});

	// GRID RETAIL
	var gridRetail = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 200,
		sortableColumns: false,
		store: grupRetail,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'No. PJJ',
			dataIndex: 'fs_pjj',
			menuDisabled: true,
			locked: true,
			width: 140
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'KTP Konsumen',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true, 
			width: 100
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		},{
			text: 'No. APK',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
				id: 'txtCariRetail',
				name: 'txtCariRetail',
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
					grupRetail.load();
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
			store: grupRetail
		}),
		listeners: {
			itemclick: function(grid, record) {

				// change tab
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

	// GRID FLEET
	var gridFleet =  Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 200,
		sortableColumns: false,
		store: grupFleet,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'No. Batch',
			dataIndex: 'fn_no_batch',
			menuDisabled: true,
			locked: true,
			width: 140
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'KTP Konsumen',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			width: 140
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true, 
			width: 100
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
				id: 'txtCariFleet',
				name: 'txtCariFleet',
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
					grupFleet.load();
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
			store: grupFleet
		}),
		listeners: {
			itemclick: function(grid, record) {
				Ext.getCmp('txtKdCabang').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApk').setValue('');
				Ext.getCmp('txtNoBatch').setValue(record.get('fn_no_batch'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_konsumen'));
				Ext.getCmp('txtJnsPembiayaan').setValue(record.get('fs_jenis_pembiayaan'));

				// fiedl clear before
				Ext.getCmp('cboSurveyor').setValue('');
				Ext.getCmp('txtLama').setValue('');
				Ext.getCmp('cboLingkungan').setValue('');
				Ext.getCmp('txtJumlah').setValue('');
				Ext.getCmp('cboLingkungan').setValue('');
				Ext.getCmp('cboGarasi').setValue('');
				Ext.getCmp('cboKantor').setValue('');
				Ext.getCmp('txtCatTinggal').setValue('');
				Ext.getCmp('txtCatLingkungan').setValue('');
				Ext.getCmp('txtCatTempat').setValue('');
				Ext.getCmp('cboKodeDoc').setValue('');

				// change tab
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

	// GRID HASIL
	var gridHasil = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupHasil,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			text: 'No. PJJ', 
			dataIndex: 'fs_pjj',
			locked: true, 
			menuDisabled: true, 
			width: 140
		},{
			text: 'Nama Konsumen', 
			dataIndex: 'fs_nama_konsumen',
			locked: true, 
			menuDisabled: true, 
			width: 240
		},{
			text: 'Petugas Survey',
			dataIndex: 'fs_petugas_survey',
			menuDisabled: true,
			width: 150
		},{
			text: 'Lama Survey',
			dataIndex: 'fn_lama_survey',
			menuDisabled: true,
			width: 100
		},{
			text: 'Lingkungan',
			dataIndex: 'fs_kondisi_lingkungan',
			menuDisabled: true,
			width: 150
		},{
			text: 'Jumlah Kendaraan',
			dataIndex: 'fn_jumlah_kendaraan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Rumah Bergarasi',
			dataIndex: 'fs_garasi',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kondisi Kantor',
			dataIndex: 'fs_kondisi_kantor',
			menuDisabled: true,
			width: 100
		},{
			text: 'Catatan Tempat Tinggal',
			dataIndex: 'fs_catatan_tempat_tinggal',
			menuDisabled: true,
			hidden: true,
			width: 100
		},{
			text: 'Catatan Lingkungan',
			dataIndex: 'fs_catatan_lingkungan',
			hidden: true,
			menuDisabled: true,
			width: 100
		},{
			text: 'Catatan Tempat Usaha',
			dataIndex: 'fs_catatan_tempat_usaha',
			hidden: true,
			menuDisabled: true,
			width: 100
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
				id: 'txtCariHasil',
				name: 'txtCariHasil',
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
					grupHasil.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
				/*
				var xnamakonsumen = record.get('fs_nama_konsumen');

				Ext.define('Survey', {
    				extend: 'Ext.data.Model',
    				fields: ['label', 'hasil']
				});

				var viewDetail = Ext.create('Ext.grid.Panel', {
					anchor: '100%',
					sortableColumns: false,
					store: {
					   	model: 'Survey',
					    data: [
					        {label: 'Nama Konsumen', hasil: record.get('fs_nama_konsumen')},
					        {label: 'Petugas Survey', hasil: record.get('fs_petugas_survey')},
					        {label: 'Lama Survey', hasil: record.get('fn_lama_survey')},
					        {label: 'Lingkungan', hasil: record.get('fs_kondisi_lingkungan')},
					        {label: 'Jumlah Kendaraan', hasil: record.get('fn_jumlah_kendaraan')},
					        {label: 'Rumah Bergarasi', hasil: record.get('fs_garasi')},
					        {label: 'Kondisi Kantor', hasil: record.get('fs_kondisi_kantor')},
					        {label: 'Catatan Tempat Tinggal', hasil: record.get('fs_catatan_tempat_tinggal')},
					        {label: 'Catatan Lingkungan', hasil: record.get('fs_catatan_lingkungan')},
					        {label: 'Catatan Tempat Usaha', hasil: record.get('fs_catatan_tempat_usaha')}
					    ]},
					columns: [{
					    dataIndex: 'label',
					    text: 'Label',
					    locked: true,
					    width: 160
					}, {
					    dataIndex: 'hasil',
					    text: 'Hasil',
					    width: 380,
					    flex: 1
					}],
					viewConfig: {
						getRowClass: function() {
							return 'rowwrap';
						},
						markDirty: false
					}
				});

			    var winDetail = Ext.create('Ext.window.Window', {
			        title: xnamakonsumen,
			        width: 550,
			        height: 400,
			        plain: true,
			        autoScroll: true,
			        collapsible: false,
			        draggable: false,
    				resizable: false,
			        headerPosition: 'top',
			        layout: 'fit',
			        items: [
			        	viewDetail
			        ]
			    });

			    winDetail.show();
			    winDetail.center();
			    */
			}
		},
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupHasil
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	// COMPONENT FORM INPUT SURVEY
	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Konsumen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var cboTglSurvey = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Survey',
		format: 'd-m-Y',
		id: 'cboTglSurvey',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -1),
		name: 'cboTglSurvey',
		value: new Date(),
		xtype: 'datefield'
	};

	var cboSurveyor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Petugas Survey',
		editable: false,
		id: 'cboSurveyor',
		name: 'cboSurveyor',
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
					winCari.show();
					winCari.center();
				}
			}
		}
	};

	var txtLama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false,
		anchor: '100%',
		fieldLabel: 'Lama Survey',
		id: 'txtLama',
		name: 'txtLama',
		xtype: 'numberfield',
		maxValue: 99,
		minValue: 0,
		maxLength: 2,
		enforceMaxLength: true
	};

	var txtJumlah = {
		afterLabelTextTpl: required,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false,
		anchor: '100%',
		fieldLabel: 'Jumlah Kendaraan',
		id: 'txtJumlah',
		name: 'txtJumlah',
		xtype: 'numberfield',
		maxValue: 9999,
		minValue: 0,
		maxLength: 4,
		enforceMaxLength: true
	};

	var cboLingkungan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Lingkungan Setempat',
		id: 'cboLingkungan',
		name: 'cboLingkungan',
		store: '',
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboGarasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Rumah Memiliki Garasi',
		id: 'cboGarasi',
		name: 'cboGarasi',
		store: '',
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboKantor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Kondisi Kantor',
		id: 'cboKantor',
		name: 'cboKantor',
		store: '',
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCatatanTinggal = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		xtype: 'textareafield',
		id: 'txtCatatanTinggal',
		name: 'txtCatatanTinggal',
		maxLength: 255,
		enforceMaxLength: true
	};

	var txtCatatanLingkungan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		xtype: 'textareafield',
		id: 'txtCatatanLingkungan',
		name: 'txtCatatanLingkungan',
		maxLength: 255,
		enforceMaxLength: true
	};

	var txtCatatanTempat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		xtype: 'textareafield',
		id: 'txtCatatanTempat',
		name: 'txtCatatanTempat',
		maxLength: 255,
		enforceMaxLength: true
	};

	// FUNCTIONS FORM INPUT SURVEY
	function fnReset() {
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('cboTglSurvey').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
		}
	}

	function fnSave() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
	}

	var frmInputSurvey = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Input Survey',
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
				title: 'Daftar Survey',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Retail',
					xtype: 'fieldset',
					items: [
						gridRetail
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Fleet',
					xtype: 'fieldset',
					items: [
						gridFleet
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Form Survey',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
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
								title: 'Form Survey',
								xtype: 'fieldset',
								items: [
									txtNama,
									cboTglSurvey,
									cboSurveyor,
									txtLama,
									cboLingkungan,
									txtJumlah,
									cboGarasi,
									cboKantor
								]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Catatan Tempat Tinggal',
								xtype: 'fieldset',
								items: [
									txtCatatanTinggal
								]
							},{
								style: 'padding: 5px;',
								title: 'Catatan Kondisi Lingkungan',
								xtype: 'fieldset',
								items: [
									txtCatatanLingkungan
								]
							},{
								style: 'padding: 5px;',
								title: 'Catatan Tempat Kerja / Usaha',
								xtype: 'fieldset',
								items: [
									txtCatatanTempat
								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSave',
					name: 'btnSave',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSave
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnReset
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Hasil Survey',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Hasil Survey',
					xtype: 'fieldset',
					items: [
						gridHasil
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmInputSurvey
	});

	function fnMaskShow() {
		frmInputSurvey.mask('Please wait...');
	}

	function fnMaskHide() {
		frmInputSurvey.unmask();
	}
	
	frmInputSurvey.render(Ext.getBody());
	Ext.get('loading').destroy();
});