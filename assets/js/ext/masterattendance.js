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

	Ext.Ajax.request({
		method: 'POST',
		url: 'masterattendance/periode',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			if (xtext.sukses === true) {
				Ext.getCmp('txtPeriode').setValue(xtext.fs_periode);
			}
		},
		failure: function(response) {
			var xText = Ext.decode(response.responseText);
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.OK,
				closable: false,
				icon: Ext.MessageBox.INFO,
				message: 'Load default value Failed, Connection Failed!!',
				title: 'HRD'
			});
		}
	});

	Ext.define('DataGridMasterCuti', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cuti', type: 'string'},
			{name: 'fs_nama_cuti', type: 'string'},
			{name: 'fn_batas_cuti', type: 'string'},
			{name: 'fs_kuota_tahun', type: 'string'},
			{name: 'fs_potong_payroll', type: 'string'}
		]
	});

	var grupMasterCuti = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridMasterCuti',
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
			url: 'masterattendance/gridmastercuti'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridSetupCuti = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupMasterCuti,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Cuti',
			dataIndex: 'fs_kode_cuti',
			menuDisabled: true,
			width: 70,
			locked: true
		},{
			text: 'Nama Cuti',
			dataIndex: 'fs_nama_cuti',
			menuDisabled: true,
			width: 170,
			locked: true
		},{
			text: 'Batas Hari',
			dataIndex: 'fn_batas_cuti',
			menuDisabled: true,
			width: 70
		},{
			text: 'Kuota pertahun',
			dataIndex: 'fs_kuota_tahun',
			menuDisabled: true,
			width: 95
		},{
			text: 'Potong Payroll',
			dataIndex: 'fs_potong_payroll',
			menuDisabled: true,
			width: 95
		},{
			xtype:'actioncolumn',
			width: 25,
			locked: true,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_cuti');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterattendance/removemastercuti/',
			            				params : {
											'fs_kode_cuti': str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
											fnResetCuti();
											grupMasterCuti.load();  
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
										}
									});
								}
							}
						});
					}
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupMasterCuti
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodeCuti').setValue(record.get('fs_kode_cuti'));
				Ext.getCmp('txtNamaCuti').setValue(record.get('fs_nama_cuti'));
				Ext.getCmp('txtBatasHari').setValue(record.get('fn_batas_cuti'));
				Ext.getCmp('cboKuota').setValue(record.get('fs_kuota_tahun'));
				Ext.getCmp('cboPotong').setValue(record.get('fs_potong_payroll'));
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

	Ext.define('DataGridKalender', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fd_tanggal_libur', type: 'string'},
			{name: 'fs_hari_libur', type: 'string'}
		]
	});

	var grupMasterKalender = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKalender',
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
			url: 'masterattendance/gridkalender'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridSetupKalender = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupMasterKalender,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal_libur',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Tanggal Libur',
			dataIndex: 'fd_tanggal_indo',
			menuDisabled: true,
			flex: 1.2
		},{
			text: 'Hari Libur',
			dataIndex: 'fs_hari',
			menuDisabled: true,
			flex: 0.7
		},{
			text: 'Nama Libur',
			dataIndex: 'fs_hari_libur',
			menuDisabled: true,
			flex: 1.8
		},{
			xtype:'actioncolumn',
			width: 25,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fd_tanggal_libur');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterattendance/removekalender/',
			            				params : {
											'fd_tanggal_libur': str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
											fnResetKalender();
											grupMasterKalender.load();  
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
										}
									});
								}
							}
						});
					}
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupMasterKalender
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboTglLibur').setValue(record.get('fd_tanggal_libur'));
				Ext.getCmp('txtHariLibur').setValue(record.get('fs_hari_libur'));
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
	
	var grupSelect = Ext.create('Ext.data.Store', {
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
			url: 'masterattendance/select'
		}
	});


	// COMPONENT FORM PERIODE ATTENDANCE
	var txtPeriode = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Bulan Periode',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPeriode',
		name: 'txtPeriode',
		xtype: 'textfield'
	};

	var btnClosing = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnClosing',
		name: 'btnClosing',
		scale: 'medium',
		text: 'Closing Periode Attendance',
		xtype: 'button',
		handler: fnClosingPeriode
	};

	// COMPONENT FORM SETUP CUTI/IJIN
	var txtKodeCuti = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Kode Cuti',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeCuti',
		name: 'txtKodeCuti',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 2,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaCuti = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Cuti',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaCuti',
		name: 'txtNamaCuti',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 100,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtBatasHari = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Batas Hari',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtBatasHari',
		name: 'txtBatasHari',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 3,
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboKuota = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Kuota Pertahun',
		id: 'cboKuota',
		name: 'cboKuota',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox'	
	};

	var cboPotong = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Potong Payroll',
		id: 'cboPotong',
		name: 'cboPotong',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox'	
	};

	var btnSaveCuti = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSaveCuti',
		name: 'btnSaveCuti',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveCuti
	};

	var btnResetCuti = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnResetCuti',
		name: 'btnResetCuti',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetCuti
	};

	// COMPONENT FORM HARI LIBUR
	var cboTglLibur = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Libur',
		format: 'd-m-Y',
		id: 'cboTglLibur',
		name: 'cboTglLibur',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtHariLibur = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Hari Libur',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtHariLibur',
		name: 'txtHariLibur',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 120,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSaveKalender = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSaveKalender',
		name: 'btnSaveKalender',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveKalender
	};

	var btnResetKalender = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnResetKalender',
		name: 'btnResetKalender',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetKalender
	};


	// FUNCTION TAB PERIODE ATTENDANCE
	function fnClosingPeriode() {
		Ext.Ajax.setTimeout(360000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterattendance/closingattendance',
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'HRD'
				});

			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'HRD'
				});
			}
		});
	}

	// FUNCTION TAB SETUP/CUTI IZIN
	function fnResetCuti() {
		Ext.getCmp('txtKodeCuti').setValue('');
		Ext.getCmp('txtNamaCuti').setValue('');
		Ext.getCmp('txtBatasHari').setValue('');
		Ext.getCmp('cboKuota').setValue('');
		Ext.getCmp('cboPotong').setValue('');
	}

	function fnCekSaveCuti() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterattendance/ceksavemastercuti',
				params: {
					'fs_kode_cuti': Ext.getCmp('txtKodeCuti').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'HRD'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.Msg.QUESTION,
							msg: xtext.hasil,
							title: 'HRD',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveCuti();
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
						title: 'HRD'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveCuti() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterattendance/savemastercuti',
			params: {
				'fs_kode_cuti': Ext.getCmp('txtKodeCuti').getValue(),
				'fs_nama_cuti': Ext.getCmp('txtNamaCuti').getValue(),
				'fn_batas_cuti': Ext.getCmp('txtBatasHari').getValue(),
				'fs_kuota_tahun': Ext.getCmp('cboKuota').getValue(),
				'fs_potong_payroll': Ext.getCmp('cboPotong').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'HRD'
				});
				fnResetCuti();
				grupMasterCuti.load();
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'HRD'
				});
				fnMaskHide();
			}
		});
	}

	// FUNCTION TAB HARI LIBUR
	function fnResetKalender() {
		Ext.getCmp('cboTglLibur').setValue(new Date());
		Ext.getCmp('txtHariLibur').setValue('');
	}

	function fnCekSaveKalender() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterattendance/ceksavekalender',
				params: {
					'fd_tanggal_libur': Ext.getCmp('cboTglLibur').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'HRD'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.Msg.QUESTION,
							msg: xtext.hasil,
							title: 'HRD',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveKalender();
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
						title: 'HRD'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveKalender() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterattendance/savekalender',
			params: {
				'fd_tanggal_libur': Ext.getCmp('cboTglLibur').getValue(),
				'fs_hari_libur': Ext.getCmp('txtHariLibur').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'HRD'
				});
				fnResetKalender();
				grupMasterKalender.load();
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'HRD'
				});
				fnMaskHide();
			}
		});
	}

	var frmMasterAttendance = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Attendance',
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
				title: 'Periode Attendance',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
						msgTarget: 'side'
					},
					anchor: '50%',
					style: 'padding: 5px;',
					title: 'Periode Attendance',
					xtype: 'fieldset',
					items: [
						txtPeriode,
						btnClosing
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Cuti/Ijin',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
						msgTarget: 'side'
					},
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
								title: 'Form Setup Cuti/Ijin',
								xtype: 'fieldset',
								items: [
									txtKodeCuti,
									txtNamaCuti,
									txtBatasHari,
									cboKuota,
									cboPotong
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
										btnSaveCuti
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnResetCuti
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Cuti/Ijin',
								xtype: 'fieldset',
								items: [
									gridSetupCuti
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Hari Libur',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 120,
						msgTarget: 'side'
					},
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
								title: 'Form Setup Hari Libur Nasional',
								xtype: 'fieldset',
								items: [
									cboTglLibur,
									txtHariLibur
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
										btnSaveKalender
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnResetKalender
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Hari Libur Nasional',
								xtype: 'fieldset',
								items: [
									gridSetupKalender
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
		target: frmMasterAttendance
	});

	function fnMaskShow() {
		frmMasterAttendance.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterAttendance.unmask();
	}
	
	frmMasterAttendance.render(Ext.getBody());
	Ext.get('loading').destroy();

});