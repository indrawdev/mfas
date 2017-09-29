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
		url: 'uploadkehadiran/periode',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			if (xtext.sukses === true) {
				Ext.getCmp('txtPeriode').setValue(xtext.fn_periode);
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

	var grupAksesLokasi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_lokasi','fs_nama_lokasi'
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
			url: 'uploadkehadiran/gridakseslokasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLokasi').getValue()
				});
			}
		}
	});

	// POPUP AKSES LOKASI
	var winGrid = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 500,
		sortableColumns: false,
		store: grupAksesLokasi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			flex: 0.7
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			flex: 2
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Lokasi',
				id: 'txtCariLokasi',
				name: 'txtCariLokasi',
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
					grupAksesLokasi.load();
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
			store: grupAksesLokasi,
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
				Ext.getCmp('cboAksesLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
				// RELOAD GRID KEHADIRAN
				grupKehadiran.load();
				// HIDE POPUP
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
				grupAksesLokasi.load();
				vMask.show();
			}
		}
	});

	Ext.define('DataGridKehadiran', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_userid', type: 'int'},
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama', type: 'string'},
			{name: 'fd_checktime', type: 'string'}
		]
	});

	var grupKehadiran = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKehadiran',
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
			url: 'uploadkehadiran/gridkehadiran'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue(),
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridKehadiran = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupKehadiran,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			width: 80
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			width: 100
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama',
			menuDisabled: true,
			width: 240
		},{
			text: 'Waktu Masuk & Keluar',
			dataIndex: 'fd_checktime',
			menuDisabled: true, 
			width: 200
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
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
					grupKehadiran.load();
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
			store: grupKehadiran
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var txtPeriode = {
		anchor: '100%',
		fieldLabel: 'Periode Bulan',
		id: 'txtPeriode',
		name: 'txtPeriode',
		xtype: 'textfield',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		maxValue: 99,
		enforceMaxLength: true
	};

	var cboAksesLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '99%',
		emptyText: 'Lokasi',
		fieldLabel: 'Lokasi',
		editable: false,
		id: 'cboAksesLokasi',
		name: 'cboAksesLokasi',
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

	var txtKdLokasi = {
		id: 'txtKdLokasi',
		name: 'txtKdLokasi',
		xtype: 'textfield',
		hidden: true
	};

	var fileXml = {
		afterLabelTextTpl: required,
		allowBlank: false,
		width: 338,
		emptyText: 'Select XML File',
		id: 'fileXml',
		name: 'fileXml',
		xtype: 'fileuploadfield',
		buttonCfg: {
			text: 'Browse',
			iconCls: 'upload-icon'
		}
	};

	var btnUpload = {
		anchor: '100%',
		scale: 'small',
		iconCls: 'icon-add',
		xtype: 'button',
		text: 'Upload',
		handler: function () {
			var form = this.up('form').getForm();
			if (form.isValid()) {
				form.submit({
					url: 'uploadkehadiran/uploadfile',
					waitMsg: 'Uploading your file...',
					success: function (form, action) {
						var result = action.result; 
						var data = result.data;
						var name = data.name;
						var message = Ext.String.format('<b>Message:</b> {0}<br>'+'<b>FileName:</b> {1}', result.msg, name);
						Ext.Msg.alert('Success', message);

						// CLEAR FIELD
						Ext.getCmp('cboAksesLokasi').setValue('');
						Ext.getCmp('txtKdLokasi').setValue('');
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert('Failure', action.result.msg);
                    }
				});
			}
		}
	};

	var lblSync = {
		xtype: 'label',
        forId: 'btnSync',
        text: '* Upload File XML before Synchronize Data'
	};

	var btnSync = {
		anchor: '100%',
		id: 'btnSync',
		name: 'btnSync',
		scale: 'medium',
		text: 'Synchronize Data Absensi',
		xtype: 'button',
		handler: fnSyncData
	};

	function fnSyncData() {
		Ext.Ajax.setTimeout(360000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'uploadkehadiran/syncxml',
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'HRD'
				});
				grupKehadiran.load();
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
				grupKehadiran.load();
			}
		});
	}

	var frmKehadiran = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Absensi',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 80,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Manage File',
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2,
					layout: 'anchor',
					xtype: 'container',
					style: 'padding: 5px;',
					items: [{
						style: 'padding: 5px;',
						xtype: 'fieldset',
						items: [
							cboAksesLokasi,
							txtKdLokasi,
							fileXml,
							btnUpload
						]
					}]
				},{
					flex: 3,
					layout: 'anchor',
					xtype: 'container',
					style: 'padding: 5px;',
					items: [{
						style: 'padding: 5px;',
						xtype: 'fieldset',
						items: [
							txtPeriode,
							btnSync,
							lblSync
						]
					}]
				}]
			}]
		},{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 100,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Kehadiran Karyawan',
			xtype: 'fieldset',
			items: [
				gridKehadiran
			]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKehadiran
	});

	function fnMaskShow() {
		frmKehadiran.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKehadiran.unmask();
	}
	
	frmKehadiran.render(Ext.getBody());
	Ext.get('loading').destroy();
});