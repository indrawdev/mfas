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

	Ext.define('DataGridTransaksiTravel', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_lokasi_asal', type: 'string'},
			{name: 'fs_lokasi_tujuan', type: 'string'},
			{name: 'fd_berangkat', type: 'string'},
			{name: 'fd_kembali', type: 'string'},
			{name: 'fs_tujuan_travel', type: 'string'},
			{name: 'fs_catatan_travel', type: 'string'},
			{name: 'fs_status', type: 'string'}
		]	
	});

	var grupTransaksiTravel = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridTransaksiTravel',
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
			url: 'transaksitravel/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridTransaksiTravel = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupTransaksiTravel,
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
			text: 'Tujuan Travel',
			dataIndex: 'fs_tujuan_travel',
			menuDisabled: true,
			width: 180
		},{
			text: 'Dari Lokasi',
			dataIndex: 'fs_nama_lokasi_asal',
			menuDisabled: true,
			width: 150
		},{
			text: 'Ke Lokasi',
			dataIndex: 'fs_nama_lokasi_tujuan',
			menuDisabled: true,
			width: 150
		},{
			text: 'Berangkat',
			dataIndex: 'fd_berangkat',
			menuDisabled: true,
			width: 100
		},{
			text: 'Kembali',
			dataIndex: 'fd_kembali',
			menuDisabled: true,
			width: 100
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Kode Lokasi Asal',
			dataIndex: 'fs_lokasi_asal',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Lokasi Tujuan',
			dataIndex: 'fs_lokasi_tujuan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Catatan Travel',
			dataIndex: 'fs_catatan_travel',
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
					grupTransaksiTravel.load();
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
			store: grupTransaksiTravel
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboAksesLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtTujuanTravel').setValue(record.get('fs_tujuan_travel'));
				Ext.getCmp('txtKdDariLokasi').setValue(record.get('fs_lokasi_asal'));
				Ext.getCmp('cboDariLokasi').setValue(record.get('fs_nama_lokasi_asal'));
				Ext.getCmp('txtKdKeLokasi').setValue(record.get('fs_lokasi_tujuan'));
				Ext.getCmp('cboKeLokasi').setValue(record.get('fs_nama_lokasi_tujuan'));
				Ext.getCmp('cboTglBerangkat').setValue(record.get('fd_berangkat'));
				Ext.getCmp('cboTglKembali').setValue(record.get('fd_kembali'));
				Ext.getCmp('txtCatatan').setValue(record.get('fs_catatan_travel'));

				// SET INTO HIDDEN FIELD POPUP
				Ext.getCmp('txtNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtAsal').setValue(record.get('fs_lokasi_asal'));
				Ext.getCmp('txtTujuan').setValue(record.get('fs_lokasi_tujuan'));
				Ext.getCmp('txtBerangkat').setValue(record.get('fd_berangkat'));

				// LOAD DATA DETAIL
				grupDetailPengajuan.load();

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
			url: 'transaksitravel/gridakseslokasi'
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
			url: 'transaksitravel/gridkaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKaryawan').getValue()
				});
			}
		}
	});

	var grupLokasi = Ext.create('Ext.data.Store', {
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
			url: 'masterlokasi/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariDariLokasi').getValue(),
					'fs_cari': Ext.getCmp('txtCariKeLokasi').getValue()
				});
			}
		}
	});

	Ext.define('DataGridFileTravel', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_file', type: 'string'},
			{name: 'fs_filename', type: 'string'},
			{name: 'fd_uploaded', type: 'string'}
		]
	});

	var grupFileTravel = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridFileTravel',
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
			url: 'transaksitravel/gridfile'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fs_lokasi_asal': Ext.getCmp('txtKdDariLokasi').getValue(),
					'fs_lokasi_tujuan': Ext.getCmp('txtKdKeLokasi').getValue(),
					'fd_berangkat': Ext.getCmp('cboTglBerangkat').getValue()
				});
			}
		}
	});

	// POPUP AKSES LOKASI
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

	// POPUP KARYAWAN
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

	// POPUP DARI LOKASI
	var winGrid3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLokasi,
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
				id: 'txtCariDariLokasi',
				name: 'txtCariDariLokasi',
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
					grupLokasi.load();
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
			store: grupLokasi,
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
				Ext.getCmp('txtKdDariLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboDariLokasi').setValue(record.get('fs_nama_lokasi'));
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
				grupLokasi.load();
				vMask.show();
			}
		}
	});

	// POPUP TUJUAN LOKASI
	var winGrid4 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLokasi,
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
				id: 'txtCariKeLokasi',
				name: 'txtCariKeLokasi',
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
					grupLokasi.load();
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
			store: grupLokasi,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari4.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('txtKdKeLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboKeLokasi').setValue(record.get('fs_nama_lokasi'));
				winCari4.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari4 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid4
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupLokasi.load();
				vMask.show();
			}
		}
	});

	// POPUP FILE UPLOAD
	var winGrid5 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 530,
		sortableColumns: false,
		store: grupFileTravel,
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
											url : 'transaksitravel/removefile',
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
												grupFileTravel.load();  
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
					id: 'txtAsal',
					name: 'txtAsal',
					xtype: 'textfield',
					hidden: true
				},{
					id: 'txtTujuan',
					name: 'txtTujuan',
					xtype: 'textfield',
					hidden: true
				},{
					id: 'txtBerangkat',
					name: 'txtBerangkat',
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
					id: 'fileTravel',
					name: 'fileTravel',
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
							 		url: 'transaksitravel/uploadfile',
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
							 			grupFileTravel.load();

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
			store: grupFileTravel,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari5.hide();
				}
			}]
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
				var nama = record.get('fs_nama_file');
				var file = 'uploads/travel/' + record.get('fs_filename');

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

	var winCari5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Upload File',
		items: [
			winGrid5
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupFileTravel.load();
				vMask.show();
			}
		}
	});

	// GROUP DETAIL PENGAJUAN CA
	Ext.define('DataGridDetailPengajuan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_lokasi_asal', type: 'string'},
			{name: 'fs_lokasi_tujuan', type: 'string'},
			{name: 'fd_berangkat', type: 'string'},
			{name: 'fs_nama_biaya', type: 'string'},
			{name: 'fn_nominal', type: 'string'}
		]
	});

	var grupDetailPengajuan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridDetailPengajuan',
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
			url: 'transaksitravel/griddetail'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fs_lokasi_asal': Ext.getCmp('txtKdDariLokasi').getValue(),
					'fs_lokasi_tujuan': Ext.getCmp('txtKdKeLokasi').getValue(),
					'fd_berangkat': Ext.getCmp('cboTglBerangkat').getValue()
				});
			}
		}
	});

	// GRID DETAIL PENGAJUAN CA
	var gridDetailPengajuan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupDetailPengajuan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_nama_biaya',
			text: 'Nama Biaya',
			flex: 2,
			menuDisabled: true
		},{
			dataIndex: 'fn_nominal',
			text: 'Nominal',
			flex: 1,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDetailPengajuan
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridDetailPengajuan.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// 
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: 
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama Biaya',
				fieldLabel: 'Nama Biaya',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaBiaya',
				name: 'txtNamaBiaya',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nominal',
				fieldLabel: 'Nominal',
				id: 'txtNominal',
				name: 'txtNominal',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '9',
				maskRe: /[0-9]/,
				enforceMaxLength: true
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
					var total = grupDetailPengajuan.getCount();

					var data = Ext.create('DataGridDetailPengajuan', {
						fs_nama_biaya: Ext.getCmp('txtNamaBiaya').getValue(),
						fn_nominal: Ext.getCmp('txtNominal').getValue()
					});

					var nama_biaya = Ext.getCmp('txtNamaBiaya').getValue();
					if (nama_biaya === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama Biaya, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nominal = Ext.getCmp('txtNominal').getValue();
					if (nominal === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nominal, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupDetailPengajuan.insert(total, data);

					Ext.getCmp('txtNamaBiaya').setValue('');
					Ext.getCmp('txtNominal').setValue('');

					total = grupDetailPengajuan.getCount() - 1;
					gridDetailPengajuan.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridDetailPengajuan.getSelectionModel();
					grupDetailPengajuan.remove(sm.getSelection());
					gridDetailPengajuan.getView().refresh();

					if (grupDetailPengajuan.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM TRANSAKSI TRAVEL
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

	var txtTujuanTravel = {
		anchor: '100%',
		fieldLabel: 'Tujuan Travel',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtTujuanTravel',
		name: 'txtTujuanTravel',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboDariLokasi = {
		anchor: '100%',
		emptyText: 'Lokasi Asal',
		fieldLabel: 'Dari Lokasi',
		editable: false,
		id: 'cboDariLokasi',
		name: 'cboDariLokasi',
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

	var txtKdDariLokasi = {
		id: 'txtKdDariLokasi',
		name: 'txtKdDariLokasi',
		xtype: 'textfield',
		hidden: true
	};

	var cboKeLokasi = {
		anchor: '100%',
		emptyText: 'Lokasi Tujuan',
		fieldLabel: 'Ke Lokasi',
		editable: false,
		id: 'cboKeLokasi',
		name: 'cboKeLokasi',
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
					winCari4.show();
					winCari4.center();
				}
			}
		}
	};

	var txtKdKeLokasi = {
		id: 'txtKdKeLokasi',
		name: 'txtKdKeLokasi',
		xtype: 'textfield',
		hidden: true
	};

	var cboTglBerangkat = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Berangkat',
		format: 'd-m-Y',
		id: 'cboTglBerangkat',
		name: 'cboTglBerangkat',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var cboTglKembali = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Kembali',
		format: 'd-m-Y',
		id: 'cboTglKembali',
		name: 'cboTglKembali',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtCatatan = {
		anchor: '100%',
		height : 40,
		fieldLabel: '',
		emptyText: 'Keterangan',
		labelWidth: 0,
		id: 'txtCatatan',
		name: 'txtCatatan',
		xtype: 'textareafield',
	};

	function fnPopup() {
		winCari5.show();
		winCari5.center();
	}

	var btnFile = {
		id: 'btnFile',
		name: 'btnFile',
		anchor: '100%',
		scale: 'medium',
		text: 'Upload File Transaksi Travel',
		xtype: 'button',
		disabled: true,
		handler: fnPopup
	};


	// FUNCTION RESET TRANSAKSI TRAVEL
	function fnReset() {
		Ext.getCmp('cboAksesLokasi').setValue('');
		Ext.getCmp('txtKdLokasi').setValue('');
		Ext.getCmp('cboNIK').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtTujuanTravel').setValue('');
		Ext.getCmp('txtKdDariLokasi').setValue('');
		Ext.getCmp('cboDariLokasi').setValue('');
		Ext.getCmp('txtKdKeLokasi').setValue('');
		Ext.getCmp('cboKeLokasi').setValue('');
		Ext.getCmp('cboTglBerangkat').setValue(new Date());
		Ext.getCmp('cboTglKembali').setValue(new Date());
		Ext.getCmp('txtCatatan').setValue('');

		// SET DISABLE
		Ext.getCmp('btnFile').setDisabled(true);

		// DETAIL PENGAJUAN CASH ADVANCE
		grupDetailPengajuan.removeAll();
		gridDetailPengajuan.getView().refresh();

		grupDetailPengajuan.load();
	}

	function fnResetUploadFile() {
		Ext.getCmp('txtNamaFile').setValue('');
		Ext.getCmp('fileTravel').setValue('');
	}

	// FUNCTION SAVE TRANSAKSI TRAVEL
	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'transaksitravel/ceksave',
				params: {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fs_lokasi_asal': Ext.getCmp('txtKdDariLokasi').getValue(),
					'fs_lokasi_tujuan': Ext.getCmp('txtKdKeLokasi').getValue(),
					'fd_berangkat': Ext.getCmp('cboTglBerangkat').getValue()
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
		var xnama_biaya = '';
		var xnominal = '';

		var store = gridDetailPengajuan.getStore();
		store.each(function(record, idx) {
			xnama_biaya = xnama_biaya +'|'+ record.get('fs_nama_biaya');
			xnominal = xnominal +'|'+ record.get('fn_nominal');
		});
		
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		Ext.Ajax.request({
			method: 'POST',
			url: 'transaksitravel/save',
			params: {
				'fn_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_lokasi_asal': Ext.getCmp('txtKdDariLokasi').getValue(),
				'fs_lokasi_tujuan': Ext.getCmp('txtKdKeLokasi').getValue(),
				'fd_berangkat': Ext.getCmp('cboTglBerangkat').getValue(),
				'fd_kembali': Ext.getCmp('cboTglKembali').getValue(),
				'fs_tujuan_travel': Ext.getCmp('txtTujuanTravel').getValue(),
				'fs_catatan_travel': Ext.getCmp('txtCatatan').getValue(),
				'fs_nama_biaya': xnama_biaya,
				'fn_nominal': xnominal
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
				grupTransaksiTravel.load();
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

	var frmTransaksiTravel = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Transaksi Travel',
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
				title: 'Form Transaksi Travel',
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
								title: 'Lokasi',
								xtype: 'fieldset',
								items: [
									txtTujuanTravel,
									cboDariLokasi,
									txtKdDariLokasi,
									cboKeLokasi,
									txtKdKeLokasi
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Waktu',
								xtype: 'fieldset',
								items: [
									cboTglBerangkat,
									cboTglKembali,
									txtCatatan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Upload File Transaksi Travel',
								xtype: 'fieldset',
								items: [
									btnFile
								]
							}]
						}]
					},{
						anchor: '100%',
						layout: 'hbox',
						xtype: 'container',
						items: [{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '99%',
								style: 'padding: 5px;',
								title: 'Pengajuan Cash Advance',
								xtype: 'fieldset',
								items: [
									gridDetailPengajuan
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
				title: 'Daftar Transaksi Travel',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Daftar Transaksi Travel',
					xtype: 'fieldset',
					items: [
						gridTransaksiTravel
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmTransaksiTravel
	});

	function fnMaskShow() {
		frmTransaksiTravel.mask('Please wait...');
	}

	function fnMaskHide() {
		frmTransaksiTravel.unmask();
	}
	
	frmTransaksiTravel.render(Ext.getBody());
	Ext.get('loading').destroy();

});