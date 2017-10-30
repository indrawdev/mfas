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
	var d = new Date();
	var year = d.getFullYear();

	Ext.define('DataGridCounter', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_jenis_counter', type: 'string'},
			{name: 'fs_no_jenis_counter', type: 'string'},
			{name: 'fn_counter', type: 'string'}
		]
	});

	var grupCounter = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridCounter',
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
			url: 'mastersetup/gridcounter'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('cboCabang').getValue(),
					'fs_jenis_counter': Ext.getCmp('cboJenisCo').getValue(),
					'fs_no_jenis_counter': Ext.getCmp('cboNoJen').getValue()
				});
			}
		}
	});

	// GRUP STORE
	var grupCabang = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fs_nama_cabang'
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
			url: 'mastersetup/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupJenisCo = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx','fs_nm_strx'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'mastersetup/select'
		}
	});

	var grupNoJen = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kd_strx','fs_nm_strx'
		],
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'mastersetup/select'
		}
	});

	// GRID COUNTER
	var gridCounter = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupCounter,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jenis Counter',
			dataIndex: 'fs_jenis_counter',
			menuDisabled: true,
			width: 100
		},{
			text: 'No. Jenis',
			dataIndex: 'fs_no_jenis_counter',
			menuDisabled: true,
			width: 100
		},{
			text: 'No. Counter',
			dataIndex: 'fn_counter',
			menuDisabled: true,
			width: 100
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCounter
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('cboJenisCo').setValue(record.get('fs_jenis_counter'));
				Ext.getCmp('cboNoJen').setValue(record.get('fs_no_jenis_counter'));
				Ext.getCmp('txtCounter').setValue(record.get('fn_counter'));
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
	var winGrid = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 500,
		sortableColumns: false,
		store: grupCabang,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Kode Cabang', dataIndex: 'fs_kode_cabang', menuDisabled: true, flex: 1},
			{text: 'Nama Cabang', dataIndex: 'fs_nama_cabang', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Cabang',
				id: 'txtCari1',
				name: 'txtCari1',
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
					winCari.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang1').setValue(record.get('fs_kode_cabang'));
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid
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

	// COMPONENT FORM MASTER SETUP
	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Cabang',
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
					winCari.show();
					winCari.center();
				}
			}
		}
	};

	var cboJenisCo = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'Jenis Counter',
		id: 'cboJenisCo',
		name: 'cboJenisCo',
		store: grupJenisCo,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var cboNoJen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nm_strx',
		editable: false,
		fieldLabel: 'No. Jenis Counter',
		id: 'cboNoJen',
		name: 'cboNoJen',
		store: grupNoJen,
		valueField: 'fs_kd_strx',
		xtype: 'combobox',
	};

	var txtCounter = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Counter',
		id: 'txtCounter',
		name: 'txtCounter',
		xtype: 'numberfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtYear = {
		hidden: true,
		id: 'txtYear',
		name: 'txtYear',
		xtype: 'textfield',
		value: year
	};

	var btnSearch = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch1',
		name: 'btnSearch1',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			grupCounter.load();
		}
	};

	var btnSave = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave1',
		name: 'btnSave1',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave
	};

	var btnReset = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset',
		name: 'btnReset',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset
	};

	var btnUpdate = {
		anchor: '95%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnUpdate1',
		name: 'btnUpdate1',
		text: 'Reset No. Counter by Yearly',
		iconCls: 'icon-reset',
		handler: fnCekUpdate
	};

	// FUNCTIONS
	function fnReset() {
		Ext.getCmp('cboCabang').setValue('');
		Ext.getCmp('cboJenisCo').setValue('');
		Ext.getCmp('cboNoJen').setValue('');
		Ext.getCmp('txtCounter').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'mastersetup/ceksavecounter',
				params: {
					'fs_kode_cabang': Ext.getCmp('cboCabang').getValue(),
					'fs_jenis_counter': Ext.getCmp('cboJenisCo').getValue(),
					'fs_no_jenis_counter': Ext.getCmp('cboNoJen').getValue(),
					'fn_counter': Ext.getCmp('txtCounter').getValue()
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
							icon: Ext.Msg.QUESTION,
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
						msg: 'Saving Failed, Connection Failed!!',
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
			url: 'mastersetup/savecounter',
			params: {
				'fs_kode_cabang': Ext.getCmp('cboCabang').getValue(),
				'fs_jenis_counter': Ext.getCmp('cboJenisCo').getValue(),
				'fs_no_jenis_counter': Ext.getCmp('cboNoJen').getValue(),
				'fn_counter': Ext.getCmp('txtCounter').getValue()
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
					grupCounter.load();
					fnReset();
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

	function fnCekUpdate(){
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersetup/cekresetcounter',
			params: {
				'fn_year': Ext.getCmp('txtYear').getValue()
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
						icon: Ext.Msg.QUESTION,
						msg: xtext.hasil,
						title: 'MFAS',
						fn: function(btn) {
							if (btn == 'yes') {
								fnUpdate();
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
					msg: 'Reset Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	function fnUpdate(){
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastersetup/resetcounter',
			params: {
				'fn_year': Ext.getCmp('txtYear').getValue()
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
					grupCounter.load();
					fnReset();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Reset Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	var frmMasterSetup = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Setup',
		width: 930,
		items: [{
			bodyStyle: 'background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				id: 'tab1',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Master Counter',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
								title: 'Form Counter',
								xtype: 'fieldset',
								items: [
									cboCabang,
									cboJenisCo,
									cboNoJen,
									btnSearch
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtCounter,
									txtYear
								]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								style: 'padding: 5px;',
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
										btnSave
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset
									]
								}]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								style: 'padding: 5px;',
								items: [{
									flex: 2.2,
									layout: 'anchor',
									xtype: 'container',
									items: []
								},{
									flex: 4,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnUpdate
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Counter',
								xtype: 'fieldset',
								items: [
									gridCounter
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
		target: frmMasterSetup
	});

	function fnMaskShow() {
		frmMasterSetup.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterSetup.unmask();
	}
	
	frmMasterSetup.render(Ext.getBody());
	Ext.get('loading').destroy();
});