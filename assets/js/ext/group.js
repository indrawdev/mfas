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

	Ext.define('DataGridGroup', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek', type: 'bool'},
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_jenis_pembiayaan', type: 'string'},
			{name: 'fs_jenis', type: 'string'},
			{name: 'fs_npwp_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'},
			{name: 'fd_tgl_apk', type: 'string'}
		]
	});

	Ext.define('DataGridUngroup', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fb_cek', type: 'bool'},
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fn_qty', type: 'float'},
			{name: 'fs_nama_konsumen', type: 'string'},
			{name: 'fs_ktp_konsumen', type: 'string'},
			{name: 'fd_tgl_apk', type: 'string'}
		]
	});

	var grupGroup = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridGroup',
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
			url: 'group/gridgroup'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var grupUngroup = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridUngroup',
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
			url: 'group/gridungroup'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var grupDetail = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang', 'fs_pjj','fs_nama_konsumen', 
			'fs_ktp_konsumen', 'fs_no','fs_nama_dokumen',
			'fd_tgl_apk' 
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
			url: 'group/detailgrid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_no_batch': Ext.getCmp('txtNoBatch').getValue()
				});
			}
		}
	});

	// GRID DETAIL
	var winGrid = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupDetail,
		columns: [{
			xtype: 'rownumberer',
			width: 30
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen',
			menuDisabled: true,
			flex: 2
		},{
			text: 'Nomor KTP',
			dataIndex: 'fs_ktp_konsumen',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Tanggal APK',
			dataIndex: 'fd_tgl_apk',
			menuDisabled: true,
			flex: 1
		}],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var winCari = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		resizable: false,
		title: 'Detail APK',
		width: 600,
		items: [
			winGrid
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDetail.load();
				vMask.show();
			}
		},
		buttons: [{
			text: 'OK',
			handler: function() {
				vMask.hide();
				winCari.hide();
			}
		}]
	});

	// TAB GROUP
	var gridGroup = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 400,
		sortableColumns: false,
		store: grupGroup,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			align: 'center',
			text: 'Add',
			id: 'add',
			dataIndex: 'fb_cek',
			menuDisabled: true,
			stopSelection: false,
			xtype: 'checkcolumn',
			width: 35
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. PJJ', 
			dataIndex: 'fs_pjj', 
			menuDisabled: true,
			width: 140
		},{
			text: 'Nama Konsumen', 
			dataIndex: 'fs_nama_konsumen', 
			menuDisabled: true,
			width: 240
		},{
			text: 'Jenis Pembiayaan', 
			dataIndex: 'fs_jenis', 
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
			text: 'Jenis Pembiayaan',
			dataIndex: 'fs_jenis_pembiayaan',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen / Handphone / Telepon',
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
					grupGroup.load();
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
			store: grupGroup
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// TAB UNGROUP
	var gridUngroup = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 400,
		sortableColumns: false,
		store: grupUngroup,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			align: 'center',
			text: 'Add',
			id: 'add2',
			dataIndex: 'fb_cek',
			menuDisabled: true,
			stopSelection: false,
			xtype: 'checkcolumn',
			width: 35
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. Batch', 
			dataIndex: 'fn_no_batch', 
			menuDisabled: true,
			width: 140,
			editor: {
				editable: false,
				xtype: 'textfield',
				triggers: {
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							var recordgrid = gridUngroup.getSelectionModel().getSelection()[0];
							var xnobatch = recordgrid.get('fn_no_batch');
							Ext.getCmp('txtNoBatch').setValue(xnobatch);

							vMask.show();
							winCari.show();
							winCari.center();
						}
					}
				}
			}
		},{
			text: 'Nama Konsumen', 
			dataIndex: 'fs_nama_konsumen', 
			menuDisabled: true, 
			width: 240,
			editor: {
				editable: false,
				xtype: 'textfield',
				triggers: {
					cari: {
						cls: 'x-form-search-trigger',
						handler: function() {
							var recordgrid = gridUngroup.getSelectionModel().getSelection()[0];
							var xnobatch = recordgrid.get('fn_no_batch');
							Ext.getCmp('txtNoBatch').setValue(xnobatch);

							vMask.show();
							winCari.show();
							winCari.center();
						}
					}
				}
			}
		},{
			text: 'Nomor KTP', 
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
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen / Handphone / Telepon',
				id: 'txtCari2',
				name: 'txtCari2',
				xtype: 'textfield'
			},{
				id: 'txtNoBatch',
				name: 'txtNoBatch',
				xtype: 'textfield',
				hidden: true
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
					grupUngroup.load();
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
			store: grupUngroup
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});


	// FUNCTIONS TAB GROUP
	function fnReset() {
		grupGroup.load();
		grupUngroup.load();
	}

	function fnCekSaveGroup() {
		if (this.up('form').getForm().isValid()) {
			var xnoapk = 0;
			var xjns = '';
			var xktp = '';
			var xnpwp = '';
			var xcek = '';

			var store = gridGroup.getStore();
			store.each(function(record, idx) {
				xcek = record.get('fb_cek');
				if (xcek === true) {
					xnoapk = xnoapk + 1;
					xjns = xjns +'|'+ record.get('fs_jenis_pembiayaan');
					xktp = xktp +'|'+ record.get('fs_ktp_konsumen');
					xnpwp = xnpwp +'|'+ record.get('fs_npwp_konsumen');
				}	
			});

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'group/ceksavegroup',
				params: {
					'is_noapk': xnoapk,
					'fs_jenis_pembiayaan': xjns,
					'fs_ktp_konsumen': xktp,
					'fs_npwp_konsumen': xnpwp
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === true) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.Msg.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveGroup();
								}
							}
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
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

	function fnSaveGroup() {
		var xkdcab = '';
		var xnopjj = '';
		var xnoapk = '';
		var xcek = '';

		var store = gridGroup.getStore();
		store.each(function(record, idx) {
			xcek = record.get('fb_cek');
			if (xcek == true) {
				xkdcab = xkdcab +'|'+ record.get('fs_kode_cabang');
				xnopjj = xnopjj +'|'+ record.get('fs_pjj');
				xnoapk = xnoapk +'|'+ record.get('fn_no_apk');
			}	
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'group/savegroup',
			params: {
				'fs_kode_cabang': xkdcab,
				'fs_pjj': xnopjj,
				'fn_no_apk': xnoapk
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

	// FUNCTION TAB UNGROUP
	function fnCekSaveUnGroup() {
		if (this.up('form').getForm().isValid()) {
			var xcek = '';
			var xnobatch = 0;

			var store = gridUngroup.getStore();
			store.each(function(record, idx) {
				xcek = record.get('fb_cek');
				if (xcek == true) {
					xnobatch = xnobatch + 1;
				}	
			});

			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'group/ceksaveungroup',
				params: {
					'is_nobatch': xnobatch
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === true) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.Msg.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveUnGroup();
								}
							}
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					}
				}
			});
		}
	}

	function fnSaveUnGroup() {
		var xkdcab = '';
		var xnobatch = '';
		var xcek = '';

		var store = gridUngroup.getStore();
		store.each(function(record, idx) {
			xcek = record.get('fb_cek');
			if (xcek == true) {
				xkdcab = xkdcab +'|'+ record.get('fs_kode_cabang');
				xnobatch = xnobatch +'|'+ record.get('fn_no_batch');
			}
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'group/saveungroup',
			params: {
				'fs_kode_cabang': xkdcab,
				'fn_no_batch': xnobatch
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

	var frmFleetGroup = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		title: 'Fleet Group',
		width: 930,
		items: [{
			activeTab: 0,
			bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
			border: false,
			plain: true,
			xtype: 'tabpanel',
			items: [{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Group',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'Group',
					xtype: 'fieldset',
					items: [
						gridGroup
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveGroup',
					name: 'btnSaveGroup',
					text: 'Group',
					scale: 'medium',
					handler: fnCekSaveGroup
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnReset
				}]
			},{
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Batal Group',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					style: 'padding: 5px;',
					title: 'UnGroup / Batal Group',
					xtype: 'fieldset',
					items: [
						gridUngroup
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveUnGroup',
					name: 'btnSaveUnGroup',
					text: 'UnGroup',
					scale: 'medium',
					handler: fnCekSaveUnGroup
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
		target: frmFleetGroup
	});

	function fnMaskShow() {
		frmFleetGroup.mask('Please wait...');
	}

	function fnMaskHide() {
		frmFleetGroup.unmask();
	}
	
	frmFleetGroup.render(Ext.getBody());
	Ext.get('loading').destroy();
});