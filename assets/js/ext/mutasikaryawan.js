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

	Ext.define('DataGridMutasi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_lokasi_baru', type: 'string'},
			{name: 'fs_nama_lokasi_baru', type: 'string'},
			{name: 'fs_lokasi_lama', type: 'string'},
			{name: 'fs_nama_lokasi_lama', type: 'string'},
			{name: 'fs_catatan_mutasi', type: 'string'},
			{name: 'fs_status', type: 'string'}
		]	
	});

	var grupMutasi = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridMutasi',
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
			url: 'mutasikaryawan/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridMutasi = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupMutasi,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Tanggal Mutasi',
			dataIndex: 'fd_tanggal_mutasi',
			menuDisabled: true,
			locked: true,
			width: 90,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			locked: true,
			width: 90
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			locked: true,
			width: 230
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 150
		},{
			text: 'Lokasi Lama',
			dataIndex: 'fs_nama_lokasi_lama',
			menuDisabled: true,
			width: 180
		},{
			text: 'Lokasi Baru',
			dataIndex: 'fs_nama_lokasi_baru',
			menuDisabled: true,
			width: 180
		},{
			text: 'Catatan Mutasi',
			dataIndex: 'fs_catatan_mutasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Lokasi Lama',
			dataIndex: 'fs_lokasi_lama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Lokasi Baru',
			dataIndex: 'fs_lokasi_baru',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Departemen Lama',
			dataIndex: 'fs_departemen_lama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen Lama',
			dataIndex: 'fs_nama_departemen_lama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Departemen Baru',
			dataIndex: 'fs_departemen_baru',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen Baru',
			dataIndex: 'fs_nama_departemen_baru',
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
					grupMutasi.load();
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
			store: grupMutasi
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_lokasi_lama'));
				Ext.getCmp('cboAksesLokasi').setValue(record.get('fs_nama_lokasi_lama'));
				Ext.getCmp('cboNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtKdLokasiLama').setValue(record.get('fs_lokasi_lama'));
				Ext.getCmp('txtLokasiLama').setValue(record.get('fs_nama_lokasi_lama'));
				Ext.getCmp('txtKdDepartemenLama').setValue(record.get('fs_departemen_lama'));
				Ext.getCmp('txtDepartemenLama').setValue(record.get('fs_nama_departemen_lama'));
				Ext.getCmp('txtKdLokasiBaru').setValue(record.get('fs_lokasi_baru'));
				Ext.getCmp('cboLokasiBaru').setValue(record.get('fs_nama_lokasi_baru'));
				Ext.getCmp('txtKdDepartemenBaru').setValue(record.get('fs_departemen_baru'));
				Ext.getCmp('cboDepartemenBaru').setValue(record.get('fs_nama_departemen_baru'));
				Ext.getCmp('txtCatatan').setValue(record.get('fs_catatan_mutasi'));

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

	// COMPONENT FORM MUTASI KARYAWAN
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
			url: 'mutasikaryawan/gridakseslokasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLokasi').getValue()
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

	var grupKaryawan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_nik','fs_nama_karyawan',
			'fs_kode_lokasi', 'fs_nama_lokasi'
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
			url: 'mutasikaryawan/gridkaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKaryawan').getValue()
				});
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
			{text: "Kode Lokasi", dataIndex: 'fs_kode_lokasi', menuDisabled: true, hidden: true},
			{text: "Nama Lokasi", dataIndex: 'fs_nama_lokasi', menuDisabled: true, hidden: true},
			{text: "Kode Departemen", dataIndex: 'fs_kode_departemen', menuDisabled: true, hidden: true},
			{text: "Nama Departemen", dataIndex: 'fs_nama_departemen', menuDisabled: true, hidden: true}
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
				Ext.getCmp('txtKdLokasiLama').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('txtLokasiLama').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdDepartemenLama').setValue(record.get('fs_kode_departemen'));
				Ext.getCmp('txtDepartemenLama').setValue(record.get('fs_nama_departemen'));
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

	var grupDepartemen = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_departemen', 'fs_nama_departemen'
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
			url: 'mutasikaryawan/griddepartemen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariDepartemen').getValue()
				});
			}
		}
	});

	var winGrid3 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDepartemen,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Departemen", dataIndex: 'fs_kode_departemen', menuDisabled: true, flex: 1},
			{text: "Nama Departemen", dataIndex: 'fs_nama_departemen', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Departemen',
				id: 'txtCariDepartemen',
				name: 'txtCariDepartemen',
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
					grupDepartemen.load();
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
			store: grupDepartemen,
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
				Ext.getCmp('txtKdDepartemenBaru').setValue(record.get('fs_kode_departemen'));
				Ext.getCmp('cboDepartemenBaru').setValue(record.get('fs_nama_departemen'));
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
				grupDepartemen.load();
				vMask.show();
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
					'fs_cari': Ext.getCmp('txtCariLokasiBaru').getValue()
				});
			}
		}
	});

	var winGrid4 = Ext.create('Ext.grid.Panel',{
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
				id: 'txtCariLokasiBaru',
				name: 'txtCariLokasiBaru',
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
			itemdblclick: function(grid, record)  {
				Ext.getCmp('txtKdLokasiBaru').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboLokasiBaru').setValue(record.get('fs_nama_lokasi'));
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

	// COMPONENT FORM MUTASI KARYAWAN
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

	var txtKdLokasiLama = {
		id: 'txtKdLokasiLama',
		name: 'txtKdLokasiLama',
		xtype: 'textfield',
		hidden: true
	};

	var txtLokasiLama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		editable: false,
		anchor: '100%',
		fieldLabel: 'Lokasi Lama',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasiLama',
		name: 'txtLokasiLama',
		xtype: 'textfield'
	};

	var txtKdDepartemenLama = {
		id: 'txtKdDepartemenLama',
		name: 'txtKdDepartemenLama',
		xtype: 'textfield',
		hidden: true
	};

	var txtDepartemenLama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		editable: false,
		anchor: '100%',
		fieldLabel: 'Departemen Lama',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemenLama',
		name: 'txtDepartemenLama',
		xtype: 'textfield'
	};

	var cboTglMutasi = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Mutasi',
		format: 'd-m-Y',
		id: 'cboTglMutasi',
		name: 'cboTglMutasi',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtKdLokasiBaru = {
		id: 'txtKdLokasiBaru',
		name: 'txtKdLokasiBaru',
		xtype: 'textfield',
		hidden: true
	};

	var cboLokasiBaru = {
		afterLabelTextTpl: required,
		allowBlank: false,
		editable: false,
		anchor: '100%',
		emptyText: 'Lokasi Baru',
		fieldLabel: 'Lokasi Baru',
		id: 'cboLokasiBaru',
		name: 'cboLokasiBaru',
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

	var txtKdDepartemenBaru = {
		id: 'txtKdDepartemenBaru',
		name: 'txtKdDepartemenBaru',
		xtype: 'textfield',
		hidden: true
	};

	var cboDepartemenBaru = {
		afterLabelTextTpl: required,
		allowBlank: false,
		editable: false,
		anchor: '100%',
		emptyText: 'Departemen Baru',
		fieldLabel: 'Departemen Baru',
		id: 'cboDepartemenBaru',
		name: 'cboDepartemenBaru',
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

	var txtCatatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 40,
		fieldLabel: 'Catatan Mutasi',
		id: 'txtCatatan',
		name: 'txtCatatan',
		xtype: 'textareafield',
	};

	// FUNCTION FORM MUTASI
	function fnReset() {
		Ext.getCmp('cboAksesLokasi').setValue('');
		Ext.getCmp('txtKdLokasi').setValue('');
		Ext.getCmp('cboNIK').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtKdLokasiLama').setValue('');
		Ext.getCmp('txtLokasiLama').setValue('');
		Ext.getCmp('txtDepartemenLama').setValue('');
		Ext.getCmp('cboTglMutasi').setValue(new Date());
		Ext.getCmp('txtKdLokasiBaru').setValue('');
		Ext.getCmp('cboLokasiBaru').setValue('');
		Ext.getCmp('txtKdDepartemenBaru').setValue('');
		Ext.getCmp('cboDepartemenBaru').setValue('');
		Ext.getCmp('txtCatatan').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'mutasikaryawan/ceksave',
				params: {
					'fn_nik': Ext.getCmp('cboNIK').getValue(),
					'fs_lokasi_baru': Ext.getCmp('txtKdLokasiBaru').getValue()
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
			url: 'mutasikaryawan/save',
			params: {
				'fn_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_lokasi_baru': Ext.getCmp('txtKdLokasiBaru').getValue(),
				'fd_tanggal_mutasi': Ext.getCmp('cboTglMutasi').getValue(),
				'fs_lokasi_lama': Ext.getCmp('txtKdLokasiLama').getValue(),
				'fs_departemen_lama': Ext.getCmp('txtKdDepartemenLama').getValue(),
				'fs_departemen_baru': Ext.getCmp('txtKdDepartemenBaru').getValue(),
				'fs_catatan_mutasi': Ext.getCmp('txtCatatan').getValue()
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
				grupMutasi.load();
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

	var frmMutasiKaryawan = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Mutasi Karyawan',
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
				title: 'Form Mutasi Karyawan',
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
									txtNama,
									txtKdLokasiLama,
									txtLokasiLama,
									txtKdDepartemenLama,
									txtDepartemenLama
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Mutasi Ke',
								xtype: 'fieldset',
								items: [
									cboTglMutasi,
									txtKdLokasiBaru,
									cboLokasiBaru,
									txtKdDepartemenBaru,
									cboDepartemenBaru,
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
				title: 'Daftar Mutasi Karyawan',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Daftar Mutasi Karyawan',
					xtype: 'fieldset',
					items: [
						gridMutasi
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMutasiKaryawan
	});

	function fnMaskShow() {
		frmMutasiKaryawan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMutasiKaryawan.unmask();
	}
	
	frmMutasiKaryawan.render(Ext.getBody());
	Ext.get('loading').destroy();

});