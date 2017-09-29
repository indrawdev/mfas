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

	Ext.define('DataGridKetenagaKerjaan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_lokasi', type: 'string'},
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'}
		]
	});

	var grupKetenagaKerjaan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKetenagaKerjaan',
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
			url: 'bpjs/gridketenagakerjaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var gridKetenagaKerjaan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupKetenagaKerjaan,
		columns: [{
			xtype: 'rownumberer',
			width: 50
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
			width: 240
		},{
			text: 'Tanggal Reimburs',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			align: 'right',
			text: 'Nominal',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				//blnFilter1
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
				id: 'txtCariKetenagaKerjaan',
				name: 'txtCariKetenagaKerjaan',
				xtype: 'textfield'
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					grupKetenagaKerjaan.load();
				}
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKetenagaKerjaan
		}),
		listeners: {
			itemdblclick: function(grid, record) {

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

	Ext.define('DataGridKesehatan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_lokasi', type: 'string'},
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'}
		]
	});

	var grupKesehatan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKesehatan',
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
			url: 'bpjs/gridkesehatan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue()
				});
			}
		}
	});

	var gridKesehatan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupKesehatan,
		columns: [{
			xtype: 'rownumberer',
			width: 50
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
			width: 240
		},{
			text: 'Tanggal Reimburs',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			align: 'right',
			text: 'Nominal',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				//blnFilter2
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
				id: 'txtCariKesehatan',
				name: 'txtCariKesehatan',
				xtype: 'textfield'
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					grupKesehatan.load();
				}
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKesehatan
		}),
		listeners: {
			itemdblclick: function(grid, record) {

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

	// COMPONENT FORM DETAIL KETENAGAKERJAAN
	var txtNIK1 = {

	};

	var txtNama1 = {

	};

	var txtKPJ = {

	};

	// COMPONENT FORM DETAIL KESEHATAN
	var txtNIK2 = {

	};

	var txtNama2 = {

	};

	var frmBPJS = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'BPJS',
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
				title: 'Ketenaga Kerjaan',
				items: [{
					activeTab: 0,
					bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
					border: false,
					plain: true,
					xtype: 'tabpanel',
					items: [{
						id: 'tab1-1',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Daftar BPJS Ketenaga Kerjaan',
						xtype: 'form',
						items: [
							gridKetenagaKerjaan
						]
					},{
						id: 'tab1-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Detail',
						xtype: 'form',
						items: [{

						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Kesehatan',
				items: [{
					activeTab: 0,
					bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
					border: false,
					plain: true,
					xtype: 'tabpanel',
					items: [{
						id: 'tab2-1',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Daftar BPJS Kesehatan',
						xtype: 'form',
						items: [
							gridKesehatan
						]
					},{
						id: 'tab2-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Detail',
						xtype: 'form',
						items: [{

						}]
					}]
				}]
			}]
		}]
	});
	
	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmBPJS
	});

	function fnMaskShow() {
		frmBPJS.mask('Please wait...');
	}

	function fnMaskHide() {
		frmBPJS.unmask();
	}
	
	frmBPJS.render(Ext.getBody());
	Ext.get('loading').destroy();
});