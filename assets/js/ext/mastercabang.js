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

	Ext.define('DataGridCabang', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nama_cabang', type: 'string'},
			{name: 'fs_alamat_cabang', type: 'string'},
			{name: 'fs_kota_cabang', type: 'string'},
			{name: 'fs_kodepos_cabang', type: 'string'},
			{name: 'fs_telfon_cabang', type: 'string'},
			{name: 'fs_fax_cabang', type: 'string'},
			{name: 'fs_email_cabang', type: 'string'}
		]
	});

	var grupCabang = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridCabang',
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
			url: 'mastercabang/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
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
			url: 'mastercabang/combo'
		}
	});

	var gridCabang = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupCabang,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode Cabang',
			flex: 1
		},{
			dataIndex: 'fs_nama_cabang',
			menuDisabled: true, 
			text: 'Nama Cabang',
			flex: 3
		},{
			dataIndex: 'fs_nama_pimpinan',
			menuDisabled: true, 
			text: 'Pimpinan',
			flex: 3
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang / Nama Pimpinan',
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
					grupCabang.load();
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
			store: grupCabang
		}),
		listeners: {
			itemdblclick: function(grid, record) {

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	// POPUP
	var winGrid = {};

	var winCari = {};

	// COMPONENT FORM MASTER CABANG
	var txtKodeCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKodeCabang',
		name: 'txtKodeCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Cabang',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaCabang',
		name: 'txtNamaCabang',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Cabang',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatCabang',
		name: 'txtAlamatCabang',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Kota Cabang',
		fieldLabel: 'Kota Cabang',
		editable: false,
		id: 'cboKota',
		name: 'cboKota',
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

	var txtKodePos = {
		anchor: '100%',
		fieldLabel: 'Kode Pos',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKodePos',
		name: 'txtKodePos',
		xtype: 'textfield',
	};

	var txtTelphone = {
		anchor: '100%',
		fieldLabel: 'Telepon',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtTelphone',
		name: 'txtTelphone',
		xtype: 'textfield',
	};

	var txtFax = {
		anchor: '100%',
		fieldLabel: 'Fax',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtFax',
		name: 'txtFax',
		xtype: 'textfield',
	};

	var txtEmail = {
		anchor: '100%',
		fieldLabel: 'Email',
		fieldStyle: 'text-transform: lowercase;',
		emptyText: '',
		id: 'txtEmail',
		name: 'txtEmail',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toLowerCase());
			}
		}
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

	// COMPONENT FORM PIMPINAN
	var txtNamaPimpinan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Pimpinan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaPimpinan',
		name: 'txtNamaPimpinan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtJabatanPimpinan = {
		anchor: '100%',
		fieldLabel: 'Jabatan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtJabatanPimpinan',
		name: 'txtJabatanPimpinan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKTPPimpinan = {
		anchor: '100%',
		fieldLabel: 'KTP',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKTPPimpinan',
		name: 'txtKTPPimpinan',
		xtype: 'textfield',
	};

	var txtEmailPimpinan = {
		anchor: '100%',
		fieldLabel: 'Email',
		fieldStyle: 'text-transform: lowercase;',
		emptyText: '',
		id: 'txtEmailPimpinan',
		name: 'txtEmailPimpinan',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toLowerCase());
			}
		}
	};

	// COMPONENT FORM 
	var txtNamaBank = {
		anchor: '100%',
		fieldLabel: 'Nama Bank',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaBank',
		name: 'txtNamaBank',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNoRek = {
		anchor: '100%',
		fieldLabel: 'Nomor Rekening',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNoRek',
		name: 'txtNoRek',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaRek = {
		anchor: '100%',
		fieldLabel: 'A/N Rekening',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaRek',
		name: 'txtNamaRek',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	// FUNCTIONS
	function fnReset() {
		// FIELDSET CABANG
		Ext.getCmp('txtKodeCabang').setValue('');
		Ext.getCmp('txtNamaCabang').setValue('');
		Ext.getCmp('txtAlamatCabang').setValue('');
		Ext.getCmp('cboKota').setValue('');
		Ext.getCmp('txtKodePos').setValue('');
		Ext.getCmp('txtTelphone').setValue('');
		Ext.getCmp('txtFax').setValue('');
		Ext.getCmp('txtEmail').setValue('');
		Ext.getCmp('cboAktif').setValue('');
		// FIELDSET PIMPINAN
		Ext.getCmp('txtNamaPimpinan').setValue('');
		Ext.getCmp('txtJabatanPimpinan').setValue('');
		Ext.getCmp('txtKTPPimpinan').setValue('');
		Ext.getCmp('txtEmailPimpinan').setValue('');
		// FIELDSET ANGSURAN
		Ext.getCmp('txtNamaBank').setValue('');
		Ext.getCmp('txtNoRek').setValue('');
		Ext.getCmp('txtNamaRek').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'mastercabang/ceksave',
				params: {
					'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue()
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
									fnSave();
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

	function fnSave() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastercabang/save',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue(),
				'fs_nama_cabang': Ext.getCmp('txtNamaCabang').getValue(),
				'fs_alamat_cabang': Ext.getCmp('txtAlamatCabang').getValue(),
				'fs_kota_cabang': Ext.getCmp('cboKota').getValue(),
				'fs_kodepos_cabang': Ext.getCmp('txtKodePos').getValue(),
				'fs_telfon_cabang': Ext.getCmp('txtTelphone').getValue(),
				'fs_fax_cabang': Ext.getCmp('txtFax').getValue(),
				'fs_email_cabang': Ext.getCmp('txtEmail').getValue(),
				'fs_nama_pimpinan': Ext.getCmp('txtNamaPimpinan').getValue(),
				'fs_jabatan_pimpinan': Ext.getCmp('txtJabatanPimpinan').getValue(),
				'fs_ktp_pimpinan': Ext.getCmp('txtKTPPimpinan').getValue(),
				'fs_email_pimpinan': Ext.getCmp('txtEmailPimpinan').getValue(),
				'fs_nama_bank_angsuran': Ext.getCmp('txtNamaBank').getValue(),
				'fs_rekening_bank_angsuran': Ext.getCmp('txtNoRek').getValue(),
				'fs_atasnama_bank_angsuran': Ext.getCmp('txtNamaRek').getValue(),
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
					// LOAD DATA
					grupCabang.load();
					fnReset();
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

	var frmMasterCabang = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Cabang',
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
				title: 'Daftar Cabang',
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
					title: 'Daftar Cabang',
					xtype: 'fieldset',
					items: [
						gridCabang
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Form Cabang',
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
								title: 'Form Cabang',
								xtype: 'fieldset',
								items: [
									txtKodeCabang,
									txtNamaCabang,
									txtAlamatCabang,
									cboKota,
									txtKodePos,
									txtTelphone,
									txtFax,
									txtEmail,
									cboAktif
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pimpinan',
								xtype: 'fieldset',
								items: [
									txtNamaPimpinan,
									txtJabatanPimpinan,
									txtKTPPimpinan,
									txtEmailPimpinan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Angsuran',
								xtype: 'fieldset',
								items: [
									txtNamaBank,
									txtNoRek,
									txtNamaRek
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
			}]
		}]
	});
	
	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterCabang
	});

	function fnMaskShow() {
		frmMasterCabang.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterCabang.unmask();
	}
	
	frmMasterCabang.render(Ext.getBody());
	Ext.get('loading').destroy();
});