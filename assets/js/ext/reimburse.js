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

	Ext.define('DataGridReimburse', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_lokasi', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fn_nominal', type: 'string'},
			{name: 'fs_keterangan', type: 'string'}
		]	
	});

	var grupReimburse = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridReimburse',
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
			url: 'reimburse/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var grupTipe = Ext.create('Ext.data.Store', {
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
			url: 'reimburse/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'tipe_klaim'
				});
			}
		}
	});

	Ext.define('DataGridFileReimburse', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_file', type: 'string'},
			{name: 'fs_filename', type: 'string'},
			{name: 'fd_uploaded', type: 'string'}
		]
	});

	var grupFileReimburse = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridFileReimburse',
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
			url: 'reimburse/gridfile'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fd_tanggal': Ext.getCmp('cboTglReimburse').getValue()
				});
			}
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
			url: 'reimburse/gridakseslokasi'
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
			url: 'reimburse/gridkaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKaryawan').getValue()
				});
			}
		}
	});

	// POPUP FORM KARYAWAN
	var winGrid1 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupAksesLokasi,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Lokasi", dataIndex: 'fs_kode_lokasi', menuDisabled: true, flex: 1},
			{text: "Nama Lokasi", dataIndex: 'fs_nama_lokasi', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Lokasi',
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

	var winGrid2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKaryawan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "NIK", dataIndex: 'fn_nik', menuDisabled: true, flex: 1},
			{text: "Nama Karyawan", dataIndex: 'fs_nama_karyawan', menuDisabled: true, flex: 2}
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
			itemdblclick: function(grid, record) {
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
		width: 530,
		sortableColumns: false,
		store: grupFileReimburse,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: 'Nama File', dataIndex: 'fs_nama_file', menuDisabled: true, flex: 1.3},
			{text: 'Tanggal Upload', dataIndex: 'fd_uploaded', menuDisabled: true, flex: 0.5},
			{text: 'File', dataIndex: 'fs_filename', menuDisabled: true, hidden: true},
			{
				xtype: 'actioncolumn',
			    width: 20,
			    items: [{
			        iconCls: 'icon-delete',
			        tooltip: 'Delete',
			        handler: function(grid, rowIndex, colIndex, e) {
			        	var str = grid.getStore().getAt(rowIndex).get('fs_filename');
			        	if (str) {
			        		Ext.MessageBox.show({
			            		title:'Delete file',
			            		msg: 'Would you like to delete?',
			            		buttons: Ext.Msg.YESNO,
			            		icon: Ext.Msg.QUESTION,
			            		fn: function(btn){
			            			if (btn == "yes") {
			            				Ext.Ajax.request({
											url : 'reimburse/removefile',
											params : {
												'fs_filename' : str
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

												// RELOAD AFTER DELETE
												grupFileReimburse.load();  
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
			        },
			        scope: this
			    }]
			}
		],
		tbar: [{
			anchor: '100%',
			layout: 'hbox',
			xtype: 'form',
			enctype : 'multipart/form-data', 
			method: 'POST',
			fileUpload: true,
			items: [{
				flex: 2,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					width: 140,
					afterLabelTextTpl: required,
					allowBlank: false,
					emptyText: 'Nama File',
					id: 'txtNamaFile',
					name: 'txtNamaFile',
					xtype: 'textfield',
					listeners: {
						change: function(field, newValue) {
							field.setValue(newValue.toUpperCase());
						}
					}
				},{
					id: 'txtNIK',
					name: 'txtNIK',
					xtype: 'textfield',
					hidden: true
				},{
					id: 'txtTanggal',
					name: 'txtTanggal',
					xtype: 'textfield',
					hidden: true
				}]
			},{
				flex: 3,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					width: 270,
					afterLabelTextTpl: required,
					allowBlank: false,
					emptyText: 'Select File Image',
					id: 'fileReimburse',
					name: 'fileReimburse',
					xtype: 'fileuploadfield',
					buttonCfg: {
						text: 'Browse',
						iconCls: 'upload-icon'
					}
				}]
			},{
				flex: 1,
				layout: 'anchor',
				xtype: 'container',
				style: 'padding: 5px;',
				items: [{
					xtype: 'buttongroup',
					columns: 1,
					defaults: {
						scale: 'small'
					},
					items: [{
						iconCls: 'icon-add',
						text: 'Upload',
						handler: function() {
							var form = this.up('form').getForm();
							if (form.isValid()) {
							 	form.submit({
							 		url: 'reimburse/uploadfile',
							 		waitMsg: 'Uploading your file...',
							 		success: function (form, action) {
							 			var result = action.result;
							 			var data = result.data;
							 			var name = data.name;
							 			var message = Ext.String.format('<b>Message:</b> {0}<br>' +'<b>File:</b> {1}', result.msg, name);
							 			Ext.Msg.alert('Success', message);
							 			
							 			// RESET FIELD
							 			fnResetUploadFile();
							 			
							 			// RELOAD DATA FILE
							 			grupFileReimburse.load();

							 		},
							 		failure: function (form, action) {
							 			Ext.Msg.alert('Failure', action.result.msg);
							 		}
							 	});
							}
						}
					}]
				}]
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupFileReimburse,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
				var nama = record.get('fs_nama_file');
				var file = 'uploads/reimburse/' + record.get('fs_filename');

				var viewImage =  Ext.create('Ext.Panel', {
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
							'<div style="overflow: auto; width:888; height:465; text-align:center;">',
					        '<img src="' + file + '" height:"100%" width:"100%"/>',
					        '</div>'
					    	],
					})
				});

				var winImage = Ext.create('Ext.window.Window', {
					title: nama,
					border: false,
					frame: false,
					autoScroll: false,
					width: 900,
					height: 500,
					collapsible: false,
					resizable: true,
					layout: 'fit',
					items: [
						viewImage
					]
				});

				winImage.show();
			}
		},
		viewConfig: {
			enableTextSelection: true
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
		title: 'Upload File',
		items: [
			winGrid3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupFileReimburse.load();
				vMask.show();
			}
		}
	});

	// COMPONENT TAB FORM REIMBURSE
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

	var cboTglReimburse = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: false,
		fieldLabel: 'Tanggal Reimburse',
		format: 'd-m-Y',
		id: 'cboTglReimburse',
		name: 'cboTglReimburse',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var cboTipe = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Tipe Klaim',
		id: 'cboTipe',
		name: 'cboTipe',
		store: grupTipe,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtNominal = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nominal',
		id: 'txtNominal',
		name: 'txtNominal',
		xtype: 'textfield',
		maxLength: 8,
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtCatatan = {
		anchor: '100%',
		height : 40,
		emptyText: 'Catatan...',
		labelWidth: 0,
		id: 'txtCatatan',
		name: 'txtCatatan',
		xtype: 'textareafield'
	};

	function fnPopup() {
		winCari3.show();
		winCari3.center();
	}

	var btnFile = {
		id: 'btnFile',
		name: 'btnFile',
		anchor: '100%',
		scale: 'medium',
		text: 'Upload File Reimburse',
		xtype: 'button',
		disabled: true,
		handler: fnPopup
	};

	var gridReimburse = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupReimburse,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			flex: 0.5,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			flex: 1.2
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			flex: 0.6
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			flex: 1.2
		},{
			align: 'right',
			text: 'Nominal',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			flex: 0.4,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			flex: 0.8
		},{
			text: 'Catatan',
			dataIndex: 'fs_keterangan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Tipe Klaim',
			dataIndex: 'fs_tipe_klaim',
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
					grupReimburse.load();
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
			store: grupReimburse
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboAksesLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('cboTglReimburse').setValue(record.get('fd_tanggal'));
				Ext.getCmp('cboTipe').setValue(record.get('fs_tipe_klaim'));
				Ext.getCmp('txtNominal').setValue(record.get('fn_nominal'));
				Ext.getCmp('txtCatatan').setValue(record.get('fs_keterangan'));

				// SET INTO HIDDEN FIELD POPUP
				Ext.getCmp('txtNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtTanggal').setValue(record.get('fd_tanggal'));

				// SET ENABLE
				Ext.getCmp('btnFile').setDisabled(false);

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

	function fnReset() {
		Ext.getCmp('cboAksesLokasi').setValue('');
		Ext.getCmp('txtKdLokasi').setValue('');
		Ext.getCmp('cboNIK').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('cboTglReimburse').setValue(new Date());
		Ext.getCmp('cboTipe').setValue('');
		Ext.getCmp('txtNominal').setValue('');
		Ext.getCmp('txtCatatan').setValue('');
		
		// SET DISABLE
		Ext.getCmp('btnFile').setDisabled(true);
	}

	function fnResetUploadFile() {
		Ext.getCmp('txtNamaFile').setValue('');
		Ext.getCmp('fileReimburse').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'reimburse/ceksave',
				params: {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fd_tanggal': Ext.getCmp('cboTglReimburse').getValue()
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
			url: 'reimburse/save',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue(),
				'fn_nik': Ext.getCmp('cboNIK').getValue(),
				'fd_tanggal': Ext.getCmp('cboTglReimburse').getValue(),
				'fs_tipe_klaim': Ext.getCmp('cboTipe').getValue(),
				'fn_nominal': Ext.getCmp('txtNominal').getValue(),
				'fs_keterangan': Ext.getCmp('txtCatatan').getValue()
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
				grupReimburse.load();
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

	var frmReimburse = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Reimbursement',
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
				title: 'Form Reimbursement',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
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
								title: 'Upload File Reimbursement',
								xtype: 'fieldset',
								items: [
									btnFile
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Reimbursement',
								xtype: 'fieldset',
								items: [
									cboTglReimburse,
									cboTipe,
									txtNominal,
									txtCatatan
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
				title: 'Daftar Reimbursement',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Daftar Reimbursement',
					xtype: 'fieldset',
					items: [
						gridReimburse
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmReimburse
	});

	function fnMaskShow() {
		frmReimburse.mask('Please wait...');
	}

	function fnMaskHide() {
		frmReimburse.unmask();
	}
	
	frmReimburse.render(Ext.getBody());
	Ext.get('loading').destroy();
});