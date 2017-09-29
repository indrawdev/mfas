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

	function tglDMY(text) {
		var x = '-';
		return text.substr(0,2).concat(x,text.substr(3,2),x,text.substr(6,4));
	}

	Ext.define('DataGridPengajuanCuti', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_lokasi', type: 'string'},
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_kode_cuti', type: 'string'},
			{name: 'fs_nama_cuti', type: 'string'},
			{name: 'fd_cuti_dari', type: 'string'},
			{name: 'fd_cuti_sampai', type: 'string'},
			{name: 'fs_file_cuti', type: 'string'},
			{name: 'fs_catatan_cuti', type: 'string'},
			{name: 'fs_status', type: 'string'}
		]	
	});

	var grupPengajuanCuti = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPengajuanCuti',
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
			url: 'pengajuancuti/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridPengajuanCuti = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupPengajuanCuti,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'Jenis Cuti',
			dataIndex: 'fs_nama_cuti',
			menuDisabled: true,
			width: 170
		},{
			text: 'Dari',
			dataIndex: 'fd_cuti_dari',
			menuDisabled: true,
			width: 90
		},{
			text: 'Sampai',
			dataIndex: 'fd_cuti_sampai',
			menuDisabled: true,
			width: 90			
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 140
		},{
			text: 'Kode Cuti',
			dataIndex: 'fs_kode_cuti',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Catatan Cuti',
			dataIndex: 'fs_catatan_cuti',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
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
					grupPengajuanCuti.load();
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
			store: grupPengajuanCuti
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboAksesLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtKdCuti').setValue(record.get('fs_kode_cuti'));
				Ext.getCmp('cboJnsCuti').setValue(record.get('fs_nama_cuti'));
				Ext.getCmp('cboTglDari').setValue(record.get('fd_cuti_dari'));
				Ext.getCmp('cboTglSampai').setValue(record.get('fd_cuti_sampai'));
				Ext.getCmp('txtCatatan').setValue(record.get('fs_catatan_cuti'));

				Ext.getCmp('btnUpload').setDisabled(false);

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

	// POPUP PENGAJUAN CUTI
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
			url: 'pengajuancuti/gridakseslokasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLokasi').getValue()
				});
			}
		}
	});

	var grupKaryawan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_nik','fs_nama_karyawan'
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
			url: 'pengajuancuti/gridkaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKaryawan').getValue()
				});
			}
		}
	});

	var grupCuti = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cuti','fs_nama_cuti'
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
			url: 'masterattendance/gridmastercuti'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
				});
			}
		}
	});

	var winGrid1 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupAksesLokasi,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Lokasi", dataIndex: 'fs_kode_lokasi', menuDisabled: true, flex: 1},
			{text: "Nama Lokasi", dataIndex: 'fs_nama_lokasi', menuDisabled: true, flex: 2},
		],
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
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboAksesLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
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
				grupAksesLokasi.load();
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
		store: grupKaryawan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "NIK", dataIndex: 'fn_nik', menuDisabled: true, flex: 1},
			{text: "Nama Karyawan", dataIndex: 'fs_nama_karyawan', menuDisabled: true, flex: 2},
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
				id: 'txtCariKaryawan',
				name: 'txtCariKaryawan',
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
					grupKaryawan.load();
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
			store: grupKaryawan,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
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
				grupKaryawan.load();
				vMask.show();
			}
		}
	});

	var winGrid3 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCuti,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Cuti", dataIndex: 'fs_kode_cuti', menuDisabled: true, flex: 1},
			{text: "Nama Cuti", dataIndex: 'fs_nama_cuti', menuDisabled: true, flex: 2},
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCuti,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('txtKdCuti').setValue(record.get('fs_kode_cuti'));
				Ext.getCmp('cboJnsCuti').setValue(record.get('fs_nama_cuti'));
				winCari3.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCuti.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM PENGAJUAN CUTI
	var cboAksesLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
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
					winCari1.show();
					winCari1.center();
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

	var cboNIK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Nomor Induk Karyawan',
		fieldLabel: 'NIK',
		editable: false,
		id: 'cboNIK',
		name: 'cboNIK',
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

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var txtKdCuti = {
		id: 'txtKdCuti',
		name: 'txtKdCuti',
		xtype: 'textfield',
		hidden: true
	};

	var cboJnsCuti = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Jenis Cuti',
		fieldLabel: 'Jenis Cuti',
		editable: false,
		id: 'cboJnsCuti',
		name: 'cboJnsCuti',
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
					winCari3.show();
					winCari3.center();
				}
			}
		}
	};

	var cboTglDari = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Dari',
		format: 'd-m-Y',
		id: 'cboTglDari',
		name: 'cboTglDari',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var cboTglSampai = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Sampai',
		format: 'd-m-Y',
		id: 'cboTglSampai',
		name: 'cboTglSampai',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtCatatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 40,
		fieldLabel: '',
		labelWidth: 0,
		id: 'txtCatatan',
		name: 'txtCatatan',
		xtype: 'textareafield',
	};

	var fileImage = {
		anchor : '100%',
		emptyText: 'Select File Image',
		id: 'fileImage',
		name: 'fileImage',
		xtype: 'fileuploadfield',
		buttonCfg: {
			text: 'Browse',
			iconCls: 'upload-icon'
		}
	};

	var btnUpload = {
		id: 'btnUpload',
		name: 'btnUpload',
		anchor: '100%',
		scale: 'small',
		iconCls: 'icon-add',
		xtype: 'button',
		text: 'Upload',
		disabled: true,
		handler: function () {
			var form = this.up('form').getForm();
			form.submit({
				clientValidation: false,
				url: 'pengajuancuti/uploadfile',
				waitMsg: 'Uploading your file...',
				success: function (form, action) {
					var result = action.result; 
					var data = result.data;
					var name = data.name;
					var message = Ext.String.format('<b>Message:</b> {0}<br>'+'<b>File:</b> {1}', result.msg, name);
					Ext.Msg.alert('Success', message);
				},
				failure: function (form, action) {
					Ext.Msg.alert('Failure', action.result.msg);
				}
			});
		}
	};

	function fnReset() {
		Ext.getCmp('cboAksesLokasi').setValue('');
		Ext.getCmp('txtKdLokasi').setValue('');
		Ext.getCmp('cboNIK').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtKdCuti').setValue('');
		Ext.getCmp('cboJnsCuti').setValue('');
		Ext.getCmp('cboTglDari').setValue('');
		Ext.getCmp('cboTglSampai').setValue('');
		Ext.getCmp('txtCatatan').setValue('');
		// DISABLE BUTTON UPLOAD
		Ext.getCmp('btnUpload').setDisabled(true);
		// RELOAD GRID
		grupPengajuanCuti.load();
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'pengajuancuti/ceksave',
				params: {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fs_kode_cuti': Ext.getCmp('txtKdCuti').getValue(),
					'fd_cuti_dari': Ext.getCmp('cboTglDari').getValue()
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
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		Ext.Ajax.request({
			method: 'POST',
			url: 'pengajuancuti/save',
			params: {
				'fn_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_kode_cuti': Ext.getCmp('txtKdCuti').getValue(),
				'fd_cuti_dari': Ext.getCmp('cboTglDari').getValue(),
				'fd_cuti_sampai': Ext.getCmp('cboTglSampai').getValue(),
				'fs_catatan_cuti': Ext.getCmp('txtCatatan').getValue()
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
				
				// REFRESH AFTER SAVE
				grupPengajuanCuti.load();
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

	var frmPengajuanCuti = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Pengajuan Cuti',
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
				xtype: 'form',
				title: 'Form Pengajuan Cuti',
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
								title: 'Karyawan',
								xtype: 'fieldset',
								items: [
									cboAksesLokasi,
									txtKdLokasi,
									cboNIK,
									txtNama
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Jenis & Waktu Cuti',
								xtype: 'fieldset',
								items: [
									txtKdCuti,
									cboJnsCuti,
									cboTglDari,
									cboTglSampai,
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Keterangan',
								xtype: 'fieldset',
								items: [
									txtCatatan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Lampiran',
								xtype: 'fieldset',
								items: [
									fileImage,
									btnUpload
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
				xtype: 'form',
				title: 'Daftar Pengajuan Cuti',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Daftar Pengajuan Cuti',
					xtype: 'fieldset',
					items: [
						gridPengajuanCuti
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmPengajuanCuti
	});

	function fnMaskShow() {
		frmPengajuanCuti.mask('Please wait...');
	}

	function fnMaskHide() {
		frmPengajuanCuti.unmask();
	}
	
	frmPengajuanCuti.render(Ext.getBody());
	Ext.get('loading').destroy();

});