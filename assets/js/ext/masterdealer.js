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

	Ext.define('DataGridDealer', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_kode_dealer1', type: 'string'},
			{name: 'fs_kode_dealer2', type: 'string'},
			{name: 'fn_cabang_dealer', type: 'string'},
			{name: 'fs_nama_dealer', type: 'string'},
			{name: 'fs_alamat_dealer', type: 'string'},
			{name: 'fs_kota_dealer', type: 'string'},
			{name: 'fs_kodepos_dealer', type: 'string'},
			{name: 'fs_telepon_dealer', type: 'string'},
			{name: 'fs_handphone_dealer', type: 'string'}
		]
	});

	var grupDealer = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDealer',
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
			url: 'masterdealer/grid'
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
			url: 'masterdealer/combo'
		}
	});

	var grupCabang = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
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
			url: 'masterdealer/cabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariCabang').getValue()
				});
			}
		}
	});

	var grupKodePos = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_dati','fs_nama_dati','fs_kodepos',
			'fs_kelurahan', 'fs_kecamatan', 'fs_propinsi'
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
			url: 'masterdealer/dati'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariDati').getValue()
				});
			}
		}
	});

	// GRID DEALER
	var gridDealer = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupDealer,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true, 
			text: 'Kode Cabang',
			flex: 1
		},{
			dataIndex: 'fs_kode_dealer',
			menuDisabled: true, 
			text: 'Kode Dealer',
			flex: 1
		},{
			dataIndex: 'fs_nama_dealer',
			menuDisabled: true, 
			text: 'Nama Dealer',
			flex: 3
		},{
			dataIndex: 'fs_nama_pemilik',
			menuDisabled: true, 
			text: 'Pemilik',
			flex: 3
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Dealer / Nama Dealer / Nama Pemilik',
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
			store: grupDealer
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
	var winGrid1 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		columns: [

		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Cabang / Nama Cabang',
				id: 'txtCariCabang',
				name: 'txtCariCabang',
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
			store: grupCabang,
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
				Ext.getCmp('cboCabang').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKdCabang').setValue(record.get('fs_kode_cabang'));

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
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKodePos,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Pos", dataIndex: 'fs_kodepos', menuDisabled: true, locked:true, width: 100},
			{text: "Propinsi", dataIndex: 'fs_propinsi', menuDisabled: true, width: 150},
			{text: "Kecamatan", dataIndex: 'fs_kecamatan', menuDisabled: true, width: 150},
			{text: "Kabupaten", dataIndex: 'fs_nama_dati', menuDisabled: true, width: 250},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode Pos / Propinsi / Kecamatan / Kabupaten',
				id: 'txtCariDati',
				name: 'txtCariDati',
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
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboKodePos').setValue(record.get('fs_kodepos'));
				Ext.getCmp('txtKota').setValue(record.get('fs_nama_dati'));

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
				grupKodePos.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM MASTER DEALER
	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Nama Cabang',
		fieldLabel: 'Nama Cabang',
		editable: false,
		id: 'cboCabang',
		name: 'cboCabang',
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

	var txtKdCabang = {
		id: 'txtKdCabang',
		name: 'txtKdCabang',
		xtype: 'textfield',
		hidden: true
	};

	var txtKodeDealer1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode 1',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKodeDealer1',
		name: 'txtKodeDealer1',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKodeDealer2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode 2',
		fieldStyle: 'text-transform: uppercase;',
		labelWidth: 80,
		emptyText: '',
		id: 'txtKodeDealer2',
		name: 'txtKodeDealer2',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtCabangDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Cabang Dealer',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtCabangDealer',
		name: 'txtCabangDealer',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Dealer',
		id: 'txtNamaDealer',
		name: 'txtNamaDealer',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '30', 
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatDealer = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Dealer',
		id: 'txtAlamatDealer',
		name: 'txtAlamatDealer',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboKodePos = {
		anchor: '100%',
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
					winCari2.show();
					winCari2.center();
				}
			}
		}
	};

	var txtKota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kota',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtKota',
		name: 'txtKota',
		xtype: 'textfield'
	};

	var txtTelphone = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Telephone',
		id: 'txtTelphone',
		name: 'txtTelphone',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtHandphone = {
		anchor: '100%',
		fieldLabel: 'Handphone',
		id: 'txtHandphone',
		name: 'txtHandphone',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
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

	// COMPONENT FORM PEMILIK
	var txtNamaPemilik = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Pemilik',
		id: 'txtNamaPemilik',
		name: 'txtNamaPemilik',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '30',
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNPWPPemilik = {
		anchor: '100%',
		fieldLabel: 'No. NPWP',
		id: 'txtNPWPPemilik',
		name: 'txtNPWPPemilik',
		xtype: 'textfield'
	};

	var txtKTPPemilik = {
		anchor: '100%',
		fieldLabel: 'No. KTP',
		id: 'txtKTPPemilik',
		name: 'txtKTPPemilik',
		xtype: 'textfield',
		maxLength: 50,
		enforceMaxLength: true
	};

	// COMPONENT FORM PENCAIRAN
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

	var txtRefundBunga = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Persen Refund Bunga',
		id: 'txtRefundBunga',
		name: 'txtRefundBunga',
		xtype: 'textfield'
	};

	var txtRefundAss = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Persen Refund Ass',
		id: 'txtRefundAss',
		name: 'txtRefundAss',
		xtype: 'textfield'
	};

	// FUNCTIONS
	function fnReset() {
		// FIELDSET DEALER
		Ext.getCmp('cboCabang').setValue('');
		Ext.getCmp('txtKdCabang').setValue('');
		Ext.getCmp('txtKodeDealer1').setValue('');
		Ext.getCmp('txtKodeDealer2').setValue('');
		Ext.getCmp('txtCabangDealer').setValue('');
		Ext.getCmp('txtNamaDealer').setValue('');
		Ext.getCmp('txtAlamatDealer').setValue('');
		Ext.getCmp('cboKodePos').setValue('');
		Ext.getCmp('txtKota').setValue('');
		Ext.getCmp('txtTelphone').setValue('');
		Ext.getCmp('txtHandphone').setValue('');
		Ext.getCmp('cboAktif').setValue('');
		// FIELDSET PEMILIK
		Ext.getCmp('txtNamaPemilik').setValue('');
		Ext.getCmp('txtNPWPPemilik').setValue('');
		Ext.getCmp('txtKTPPemilik').setValue('');
		// FIELDSET PENCAIRAN
		Ext.getCmp('txtNamaBank').setValue('');
		Ext.getCmp('txtNoRek').setValue('');
		Ext.getCmp('txtNamaRek').setValue('');
		Ext.getCmp('txtRefundBunga').setValue('');
		Ext.getCmp('txtRefundAss').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterdealer/ceksave',
				params: {
					'fs_kode_cabang': Ext.getCmp('txtKdCabang').getValue(),
					'fs_kode_dealer1': Ext.getCmp('txtKodeDealer1').getValue(),
					'fs_kode_dealer2': Ext.getCmp('txtKodeDealer2').getValue(),
					'fn_cabang_dealer': Ext.getCmp('txtCabangDealer').getValue()
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
					}
					else {
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
			url: 'masterdealer/save',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKdCabang').getValue(),
				'fs_kode_dealer1': Ext.getCmp('txtKodeDealer1').getValue(),
				'fs_kode_dealer2': Ext.getCmp('txtKodeDealer2').getValue(),
				'fn_cabang_dealer': Ext.getCmp('txtCabangDealer').getValue(),
				'fs_nama_dealer': Ext.getCmp('txtNamaDealer').getValue(),
				'fs_alamat_dealer': Ext.getCmp('txtAlamatDealer').getValue(),
				'fs_kota_dealer': Ext.getCmp('txtKota').getValue(),
				'fs_kodepos_dealer': Ext.getCmp('cboKodePos').getValue(),
				'fs_telepon_dealer': Ext.getCmp('txtTelphone').getValue(),
				'fs_handphone_dealer': Ext.getCmp('txtHandphone').getValue(),
				'fs_nama_pemilik': Ext.getCmp('txtNamaPemilik').getValue(),
				'fs_npwp_pemilik': Ext.getCmp('txtNPWPPemilik').getValue(),
				'fs_ktp_pemilik': Ext.getCmp('txtKTPPemilik').getValue(),
				'fs_nama_bank_pencairan': Ext.getCmp('txtNamaBank').getValue(),
				'fs_rekening_bank_pencairan': Ext.getCmp('txtNoRek').getValue(),
				'fs_atasnama_bank_pencairan': Ext.getCmp('txtNamaRek').getValue(),
				'fn_persen_refund_bunga': Ext.getCmp('txtRefundBunga').getValue(),
				'fn_persen_refund_asuransi': Ext.getCmp('txtRefundAss').getValue(),
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
					grupDealer.load();
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

	var frmMasterDealer = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Dealer',
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
				title: 'Daftar Dealer',
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
					title: 'Daftar Dealer',
					xtype: 'fieldset',
					items: [
						gridDealer
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Form Dealer',
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
								title: 'Form Dealer',
								xtype: 'fieldset',
								items: [
									cboCabang,
									txtKdCabang,
									{
										anchor: '100%',
										layout: 'hbox',
										xtype: 'container',
										items: [{
											flex: 2,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeDealer1
											]
										},{
											flex: 1.5,
											layout: 'anchor',
											xtype: 'container',
											items: [
												txtKodeDealer2
											]
										}]
									},
									txtCabangDealer,
									txtNamaDealer,
									txtAlamatDealer,
									cboKodePos,
									txtKota,
									txtTelphone,
									txtHandphone
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pemilik',
								xtype: 'fieldset',
								items: [
									txtNamaPemilik,
									txtNPWPPemilik,
									txtKTPPemilik
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Form Pencairan',
								xtype: 'fieldset',
								items: [
									txtNamaBank,
									txtNoRek,
									txtNamaRek,
									txtRefundBunga,
									txtRefundAss
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
		target: frmMasterDealer
	});

	function fnMaskShow() {
		frmMasterDealer.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterDealer.unmask();
	}
	
	frmMasterDealer.render(Ext.getBody());
	Ext.get('loading').destroy();
});