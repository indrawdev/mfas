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
			{name: 'fs_nama_konsumen', type: 'string'}
		]
	});

	Ext.define('DataGridFleet', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_no_batch', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'}
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
			url: 'analisa/gridretailpusat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariRetail').getValue(),
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
			url: 'analisa/gridfleetpusat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariFleet').getValue(),
				});
			}
		}
	});

	var grupBatalRetail = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang', 'fn_no_apk', 'fs_pjj', 
			'fs_nama_konsumen', 'fs_score', 'fs_grade', 
			'fs_internal_checking', 'fs_reject_checking', 
			'fs_family_checking', 'fs_jenis_pembiayaan'
		],
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
			url: 'analisa/gridretailbatalpusat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariBatalRetail').getValue()
				});
			}
		}
	});

	var grupBatalFleet = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang', 'fn_no_apk', 'fs_pjj',
			'fn_no_batch', 'fs_nama_konsumen', 'fs_score', 
			'fs_grade', 'fs_internal_checking', 'fs_reject_checking', 
			'fs_family_checking', 'fs_jenis_pembiayaan'
		],
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
			url: 'analisa/gridfleetbatalpusat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariBatalFleet').getValue()
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
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			locked: true,
			width: 100
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
			text: 'Status APK',
			dataIndex: 'fs_status_konsumen',
			menuDisabled: true,
			width: 80
		},{
			text: 'No. APK',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Catatan Analisa Cabang',
			dataIndex: 'fs_catatan_analisa_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'APK Grade',
			dataIndex: 'fs_grade',
			menuDisabled: true,
			hidden: true,
		},{
			text: 'APK Score',
			dataIndex: 'fs_score',
			menuDisabled: true,
			hidden: true,
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
			itemdblclick: function(grid, record) {

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
			text: 'Apk',
			dataIndex: 'fn_no_apk',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			locked: true,
			width: 100
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
			text: 'Status APK',
			dataIndex: 'fs_status_konsumen',
			menuDisabled: true,
			width: 80
		},{
			text: 'Catatan Analisa Cabang',
			dataIndex: 'fs_catatan_analisa_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'APK Grade',
			dataIndex: 'fs_grade',
			menuDisabled: true,
			hidden: true,
		},{
			text: 'APK Score',
			dataIndex: 'fs_score',
			menuDisabled: true,
			hidden: true,
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'No. Batch / Nama Konsumen',
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
			itemdblclick: function(grid, record) {

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

	// POPUP

	function fnPreviewData() {

	}

	function fnShowParsial() {

	}

	function fnCheckingInternal() {

	}

	function fnCheckingReject() {

	}

	function fnCheckingFamily() {

	} 


	// COMPONENT FORM ANALISA KREDIT
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

	var cboInternalChecking = {
		anchor: '100%',
		fieldLabel: 'Internal Checking',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboInternalChecking',
		name: 'cboInternalChecking',
		xtype: 'textfield'
	};

	var cboRejectChecking = {
		anchor: '100%',
		fieldLabel: 'Reject Checking',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboRejectChecking',
		name: 'cboRejectChecking',
		xtype: 'textfield'
	};

	var cboFamilyChecking = {
		anchor: '100%',
		fieldLabel: 'Family Checking',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboFamilyChecking',
		name: 'cboFamilyChecking',
		xtype: 'textfield'
	};

	var cboAPKGrade = {
		anchor: '60%',
		fieldLabel: 'APK Grade',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboAPKGrade',
		name: 'cboAPKGrade',
		xtype: 'textfield'
	};

	var cboAPKScore = {
		anchor: '60%',
		fieldLabel: 'APK Score',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'cboAPKScore',
		name: 'cboAPKScore',
		xtype: 'textfield'
	};

	var txtKdCabang = {
		id: 'txtKdCabang',
		name: 'txtKdCabang',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoApk = {
		id: 'txtNoApk',
		name: 'txtNoApk',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoBatch = {
		id: 'txtNoBatch',
		name: 'txtNoBatch',
		xtype: 'textfield',
		hidden: true
	};

	var txtPJJ = {
		id: 'txtPJJ',
		name: 'txtPJJ',
		xtype: 'textfield',
		hidden: true
	};

	var txtJnsPembiayaan = {
		id: 'txtJnsPembiayaan',
		name: 'txtJnsPembiayaan',
		xtype: 'textfield',
		hidden: true
	};

	var btnPrevP = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnPrevP',
		name: 'btnPrevP',
		text: 'Preview Pemeriksaan APK',
		xtype: 'button',
		height: 28,
		handler: ''
	};

	var btnPrevD = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnPrevD',
		name: 'btnPrevD',
		text: 'Preview Data Pendukung',
		xtype: 'button',
		height: 28,
		handler: ''
	};

	var btnParsial = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnParsial',
		name: 'btnParsial',
		text: 'Disetujui Parsial',
		xtype: 'button',
		height: 28,
		handler: ''
	};

	var btnInternal = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnInternal',
		name: 'btnInternal',
		text: 'Internal Checking',
		xtype: 'button',
		height: 26,
		handler: ''
	};

	var btnReject = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnReject',
		name: 'btnReject',
		text: 'Reject Checking',
		xtype: 'button',
		height: 26,
		handler: ''
	};

	var btnFamily = {
		anchor: '100%',
		scale: 'medium',
		id: 'btnFamily',
		name: 'btnFamily',
		text: 'Family Checking',
		xtype: 'button',
		height: 26,
		handler: ''
	};

	// COMPONENT FORM BATAL KEPUTUSAN

	// FUNCTIONS ANALISA KREDIT
	function fnResetAnalisaKredit() {

	}

	function fnCekSaveAnalisaKredit() {
		if (this.up('form').getForm().isValid()) {

		}
	}

	function fnSaveAnalisaKredit() {

	}

	// FUNCTIONS BATAL KEPUTUSAN
	function fnResetBatalKeputusan() {

	}

	function fnCekSaveBatalKeputusan() {
		if (this.up('form').getForm().isValid()) {

		}
	}

	function fnSaveBatalKeputusan() {

	}

	var frmAnalisa = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Analisa dan Keputusan Kredit',
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
				title: 'Daftar Analisa Kredit',
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
				title: 'Form Analisa Kredit',
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
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: '',
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
								title: '',
								xtype: 'fieldset',
								items: [

								]
							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveAnalisaKredit',
					name: 'btnSaveAnalisaKredit',
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
				title: 'Batal Keputusan',
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
					title: 'Batal Keputusan',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [{

							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{

							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{

							}]
						}]
					}]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Keputusan Kredit',
					xtype: 'fieldset',
					items: [{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [{

							}]
						}]
					}]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveBatalKeputusan',
					name: 'btnSaveBatalKeputusan',
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
		target: frmAnalisa
	});

	function fnMaskShow() {
		frmAnalisa.mask('Please wait...');
	}

	function fnMaskHide() {
		frmAnalisa.unmask();
	}
	
	frmAnalisa.render(Ext.getBody());
	Ext.get('loading').destroy();
});