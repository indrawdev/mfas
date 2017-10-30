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

	var grupKendaraan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKendaraan',
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
			url: 'masterkendaraan/gridkendaraan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupMerk = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: [
			'fs_kode_kendaraan','fs_merek_kendaraan'
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
			url: 'masterkendaraan/gridmerk'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var grupNegara = Ext.create('Ext.data.Store', {
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
			url: 'masterkendaraan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'negara_kendaraan'
				});
			}
		}
	}); 

	// GRID KENDARAAN
	var gridKendaraan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupKendaraan,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_kendaraan',
			menuDisabled: true, 
			text: 'Kode',
			flex: 1
		},{
			dataIndex: 'fs_model_kendaraan',
			menuDisabled: true, 
			text: 'Model',
			flex: 2
		},{
			dataIndex: 'fs_jenis_kendaraan',
			menuDisabled: true, 
			text: 'Jenis',
			flex: 1
		},{
			dataIndex: 'fs_merek_kendaraan',
			menuDisabled: true, 
			text: 'Merk',
			flex: 1
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Model / Jenis',
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
					grupKendaraan.load();
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
			store: grupKendaraan
		}),
		listeners: {
			itemdblclick: function(grid, record) {

			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	// GRID MERK
	var gridMerk = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupMerk,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_kendaraan',
			menuDisabled: true, 
			text: 'Kode',
			flex: 1
		},{
			dataIndex: 'fs_negara_kendaraan',
			menuDisabled: true, 
			text: 'Negara',
			flex: 1
		},{
			dataIndex: 'fs_merek_kendaraan',
			menuDisabled: true, 
			text: 'Merk',
			flex: 1
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Negara / Merk',
				id: 'txtCari2',
				name: 'txtCari2',
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
					grupMerk.load();
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
			store: grupMerk
		}),
		listeners: {
			itemdblclick: function(grid, record) {

			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	// COMPONENT FORM MASTER KENDARAAN
	var txtKodeKend = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Kendaraan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKodeKend',
		name: 'txtKodeKend',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKodeLama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Lama',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKodeLama',
		name: 'txtKodeLama',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaModel = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Model',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaModel',
		name: 'txtNamaModel',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboJenisKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Jenis Kendaraan',
		fieldLabel: 'Jenis',
		editable: false,
		id: 'cboJenisKendaraan',
		name: 'cboJenisKendaraan',
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

	var cboMerkKendaraan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Merk Kendaraan',
		fieldLabel: 'Merk',
		editable: false,
		id: 'cboMerkKendaraan',
		name: 'cboMerkKendaraan',
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

	var txtSilinder = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Silinder',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Silinder Kendaraan',
		id: 'txtSilinder',
		name: 'txtSilinder',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSaveKendaraan = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSaveKendaraan',
		name: 'btnSaveKendaraan',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveKendaraan
	};

	var btnResetKendaraan = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnResetKendaraan',
		name: 'btnResetKendaraan',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetKendaraan
	};

	// COMPONENT FORM MASTER MERK
	var cboNegara = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Negara',
		id: 'cboNegara',
		name: 'cboNegara',
		store: grupNegara,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNamaMerk = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Merk',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'Merk Kendaraan',
		id: 'txtNamaMerk',
		name: 'txtNamaMerk',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSaveMerk = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSaveMerk',
		name: 'btnSaveMerk',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveMerk
	};

	var btnResetMerk = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnResetMerk',
		name: 'btnResetMerk',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetMerk
	};

	// FUNCTION KENDARAAN
	function fnResetKendaraan() {
		Ext.getCmp('txtKodeKend').setValue('');
		Ext.getCmp('txtKodeLama').setValue('');
		Ext.getCmp('txtNamaModel').setValue('');
		Ext.getCmp('cboJenisKendaraan').setValue('');
		Ext.getCmp('cboMerkKendaraan').setValue('');
		Ext.getCmp('txtSilinder').setValue('');
	}

	function fnCekSaveKendaraan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterkendaraan/ceksavekendaraan',
				params: {
					'fs_kode_kendaraan': Ext.getCmp('txtKodeKend').getValue()
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
							icon: Ext.Msg.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveKendaraan();
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

	function fnSaveKendaraan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterkendaraan/savekendaraan',
			params: {
				'fs_kode_kendaraan': Ext.getCmp('txtKodeKend').getValue(),
				'fs_kode_kendaraan_lama': Ext.getCmp('txtKodeLama').getValue(),
				'fs_model_kendaraan': Ext.getCmp('txtNamaModel').getValue(),
				'fs_jenis_kendaraan': Ext.getCmp('cboJenisKendaraan').getValue(),
				'fs_merek_kendaraan': Ext.getCmp('cboMerkKendaraan').getValue(),
				'fs_silinder_kendaraan': Ext.getCmp('txtSilinder').getValue()
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
					grupKendaraan.load();
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

	// FUNCTION MERK
	function fnResetMerk() {
		Ext.getCmp('cboNegara').setValue('');
		Ext.getCmp('txtNamaMerk').setValue('');
	}

	function fnCekSaveMerk() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterkendaraan/ceksavemerk',
				params: {
					'fs_negara_kendaraan': Ext.getCmp('cboNegara').getValue(),
					'fs_merek_kendaraan': Ext.getCmp('txtNamaMerk').getValue()
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
							icon: Ext.Msg.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveKendaraan();
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

	function fnSaveMerk() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterkendaraan/savemerk',
			params: {
				'fs_negara_kendaraan': Ext.getCmp('cboNegara').getValue(),
				'fs_merek_kendaraan': Ext.getCmp('txtNamaMerk').getValue()
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
					grupMerk.load();
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

	var frmMasterKendaraan = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Kendaraan',
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
				title: 'Setup Kendaraan',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
									txtKodeKend,
									txtKodeLama,
									txtNamaModel,
									cboJenisKendaraan,
									cboMerkKendaraan,
									txtSilinder
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
										btnSaveKendaraan
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnResetKendaraan
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
								title: 'Data Kendaraan',
								xtype: 'fieldset',
								items: [
									gridKendaraan
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
				title: 'Setup Merk',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
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
								title: 'Form Merk',
								xtype: 'fieldset',
								items: [
									cboNegara,
									txtNamaMerk
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
										btnSaveMerk
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnResetMerk
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
								title: 'Data Merk',
								xtype: 'fieldset',
								items: [
									gridMerk
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
		target: frmMasterKendaraan
	});

	function fnMaskShow() {
		frmMasterKendaraan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterKendaraan.unmask();
	}
	
	frmMasterKendaraan.render(Ext.getBody());
	Ext.get('loading').destroy();
});