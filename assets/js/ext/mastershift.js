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

	Ext.define('DataGridMasterShift', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_shift', type: 'string'},
			{name: 'fs_nama_shift', type: 'string'},
			{name: 'ft_jam_masuk', type: 'string'},
			{name: 'ft_jam_pulang', type: 'string'},
			{name: 'fs_keterangan', type: 'string'}
		]	
	});

	var grupMasterShift = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridMasterShift',
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
			url: 'mastershift/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridMasterShift = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupMasterShift,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Shift',
			dataIndex: 'fs_kode_shift',
			menuDisabled: true,
			width: 100
		},{
			text: 'Nama Shift',
			dataIndex: 'fs_nama_shift',
			menuDisabled: true,
			width: 240
		},{
			text: 'Jam Masuk',
			dataIndex: 'ft_jam_masuk',
			menuDisabled: true,
			width: 100
		},{
			text: 'Jam Pulang',
			dataIndex: 'ft_jam_pulang',
			menuDisabled: true,
			width: 100
		},{
			text: 'Keterangan',
			dataIndex: 'fs_keterangan',
			menuDisabled: true,
			width: 280
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_shift');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'mastershift/remove/',
			            				params : {
											'fs_kode_shift': str,
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

											fnReset();
											grupMasterShift.load();
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
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Shift',
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
					if (this.up('form').getForm().isValid()) {
						grupMasterShift.load();
					}
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
			store: grupMasterShift
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodeShift').setValue(record.get('fs_kode_shift'));
				Ext.getCmp('txtNamaShift').setValue(record.get('fs_nama_shift'));
				Ext.getCmp('cboJamMasuk').setValue(record.get('ft_jam_masuk'));
				Ext.getCmp('cboJamPulang').setValue(record.get('ft_jam_pulang'));
				Ext.getCmp('txtKeterangan').setValue(record.get('fs_keterangan'));

				// LOAD DATA HARI
				grupHariLibur.load();

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1');
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

	var grupHari = Ext.create('Ext.data.Store', {
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
			url: 'mastershift/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'hari'
				});
			}
		}
	});

	Ext.define('DataGridHariLibur', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_hari', type: 'int'}
		]
	});

	var grupHariLibur = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridHariLibur',
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
			url: 'mastershift/gridhari'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_shift': Ext.getCmp('txtKodeShift').getValue()
				});
			}
		}
	});

	var gridHariLibur = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 150,
		sortableColumns: false,
		store: grupHariLibur,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fn_hari',
			text: 'Hari',
			flex: 2,
			menuDisabled: true
		}],
		listeners: {
			selectionchange: function(view, records) {
				gridHariLibur.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingHari
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipHari
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Hari Libur',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboHari',
				name: 'cboHari',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupHari,
				valueField: 'fs_kode',
				xtype: 'combobox'
			}]
		},{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Add',
				handler: function() {
					var total = grupHariLibur.getCount();

					var data = Ext.create('DataGridHariLibur', {
						fn_hari: Ext.getCmp('cboHari').getValue(),
					});

					var harilibur = Ext.getCmp('cboHari').getValue();
					if (harilibur === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Hari libur belum diisi',
							title: 'HRD'
						});
						return;
					}

					grupHariLibur.insert(total, data);

					Ext.getCmp('cboHari').setValue('');
					total = grupHariLibur.getCount() - 1;
					gridHariLibur.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridHariLibur.getSelectionModel();
					grupHariLibur.remove(sm.getSelection());
					gridHariLibur.getView().refresh();
					if (grupHariLibur.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM MASTER SHIFT
	var txtKodeShift = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Shift',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtKodeShift',
		name: 'txtKodeShift',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaShift = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Shift',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNamaShift',
		name: 'txtNamaShift',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKeterangan = {
		anchor: '100%',
		height : 50,
		fieldLabel: '',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKeterangan',
		name: 'txtKeterangan',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboJamMasuk = {
		afterLabelTextTpl: required,
		allowBlank: false,
        anchor: '100%',
        id: 'cboJamMasuk',
        name: 'cboJamMasuk',
        fieldLabel: 'Jam Masuk',
		xtype: 'timefield',
		increment: 30,
        minValue: '7:00 AM',
        maxValue: '2:00 PM'
	};

	var cboJamPulang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
        id: 'cboJamPulang',
        name: 'cboJamPulang',
        fieldLabel: 'Jam Pulang',
		xtype: 'timefield',
		increment: 30,
        minValue: '2:00 PM',
        maxValue: '11:00 PM'
	};


	// FUNCTION MASTER SHIFT
	function fnReset() {
		Ext.getCmp('txtKodeShift').setValue('');
		Ext.getCmp('txtNamaShift').setValue('');
		Ext.getCmp('cboJamMasuk').setValue('');
		Ext.getCmp('cboJamPulang').setValue('');
		Ext.getCmp('txtKeterangan').setValue('');

		// DETAIL HARI
		grupHariLibur.removeAll();
		gridHariLibur.getView().refresh();

		grupHariLibur.load();
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'mastershift/ceksave',
				params: {
					'fs_kode_shift': Ext.getCmp('txtKodeShift').getValue()
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
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'HRD',
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
						title: 'HRD'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSave() {
		var xhari = '';

		var store = gridHariLibur.getStore();
		store.each(function(record, idx) {
			xhari = xhari +'|'+ record.get('fn_hari');
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'mastershift/save',
			params: {
				'fs_kode_shift': Ext.getCmp('txtKodeShift').getValue(),
				'fs_nama_shift': Ext.getCmp('txtNamaShift').getValue(),
				'ft_jam_masuk': Ext.getCmp('cboJamMasuk').getValue(),
				'ft_jam_pulang': Ext.getCmp('cboJamPulang').getValue(),
				'fs_keterangan': Ext.getCmp('txtKeterangan').getValue(),
				'fn_hari': xhari
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
				fnReset();

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');

				// RELOAD DATA
				grupMasterShift.load();
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

	var frmMasterShift = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Shift',
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
				title: 'Form Shift',
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
								title: 'Shift',
								xtype: 'fieldset',
								items: [
									txtKodeShift,
									txtNamaShift
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Jam',
								xtype: 'fieldset',
								items: [
									cboJamMasuk,
									cboJamPulang
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Keterangan',
								xtype: 'fieldset',
								items: [
									txtKeterangan
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Hari Libur',
								xtype: 'fieldset',
								items: [
									gridHariLibur
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
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Daftar Shift',
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
					title: 'Daftar Shift',
					xtype: 'fieldset',
					items: [
						gridMasterShift
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterShift
	});

	function fnMaskShow() {
		frmMasterShift.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterShift.unmask();
	}
	
	frmMasterShift.render(Ext.getBody());
	Ext.get('loading').destroy();
});