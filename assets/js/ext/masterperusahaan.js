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

	Ext.define('DataGridPerusahaan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_perusahaan', type: 'string'},
			{name: 'fs_nama_perusahaan', type: 'string'},
			{name: 'fs_singkatan', type: 'string'},
			{name: 'fs_alamat_perusahaan', type: 'string'},
			{name: 'fs_logo_perusahaan', type: 'string'},
			{name: 'fs_no_tlp', type: 'string'},
			{name: 'fs_no_fax', type: 'string'},
			{name: 'fs_website', type: 'string'},
			{name: 'fs_aktif', type: 'string'}
		]	
	});

	var grupPerusahaan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPerusahaan',
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
			url: 'masterperusahaan/gridperusahaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariPerusahaan').getValue()
				});
			}
		}
	});

	var gridPerusahaan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupPerusahaan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Perusahaan',
			dataIndex: 'fs_kode_perusahaan',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Perusahaan',
			dataIndex: 'fs_nama_perusahaan',
			menuDisabled: true,
			locked: true,
			width: 230
		},{
			text: 'Singkatan',
			dataIndex: 'fs_singkatan',
			menuDisabled: true,
			locked: true,
			width: 80
		},{
			xtype:'actioncolumn',
			locked: true,
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_perusahaan');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterperusahaan/removeperusahaan/',
			            				params : {
											'fs_kode_perusahaan': str
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
											fnResetPerusahaan();
											grupPerusahaan.load();  
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
		},{
			text: 'Alamat Perusahaan',
			dataIndex: 'fs_alamat_perusahaan',
			menuDisabled: true,
			width: 450
		},{
			text: 'Telepon',
			dataIndex: 'fs_no_tlp',
			menuDisabled: true,
			width: 100
		},{
			text: 'Fax',
			dataIndex: 'fs_no_fax',
			menuDisabled: true,
			width: 100
		},{
			text: 'Website',
			dataIndex: 'fs_website',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Aktif',
			dataIndex: 'fs_aktif',
			menuDisabled: true,
			hidden: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerusahaan
		}),
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Perusahaan',
				id: 'txtCariPerusahaan',
				name: 'txtCariPerusahaan',
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
					grupPerusahaan.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodePerusahaan1').setValue(record.get('fs_kode_perusahaan'));
				Ext.getCmp('txtNamaPerusahaan1').setValue(record.get('fs_nama_perusahaan'));
				Ext.getCmp('txtInisialPerusahaan').setValue(record.get('fs_singkatan'));
				Ext.getCmp('txtAlamatPerusahaan').setValue(record.get('fs_alamat_perusahaan'));
				Ext.getCmp('txtTeleponPerusahaan').setValue(record.get('fs_no_tlp'));
				Ext.getCmp('txtFaxPerusahaan').setValue(record.get('fs_no_fax'));
				Ext.getCmp('txtDomainPerusahaan').setValue(record.get('fs_website'));
				Ext.getCmp('cboAktif').setValue(record.get('fs_aktif'));
				Ext.getCmp('btnUpload').setDisabled(false);

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1-2');

				// LOAD IMAGE LOGO
				dataImg.load();
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

	Ext.define('DataGridDepartemen', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_departemen', type: 'string'},
			{name: 'fs_nama_departemen', type: 'string'},
			{name: 'fs_kd_parent', type: 'string'},
			{name: 'fs_kd_child', type: 'string'},
			{name: 'fn_nourut', type: 'string'}
		]	
	});

	var grupDepartemen = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDepartemen',
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
			url: 'masterperusahaan/griddepartemen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCariDepartemen').getValue()
				});
			}
		}
	});

	var gridDepartemen = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupDepartemen,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Departemen',
			dataIndex: 'fs_kode_departemen',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			locked: true,
			width: 300
		},{
			text: 'Parent Departemen',
			dataIndex: 'fs_parent_departemen',
			menuDisabled: true,
			width: 300
		},{
			xtype:'actioncolumn',
			width: 20,
			locked: true,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_departemen');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterperusahaan/removedepartemen/',
			            				params : {
											'fs_kode_departemen': str
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
											fnResetDepartemen();
											grupDepartemen.load();  
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
			store: grupDepartemen
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

	Ext.define('DataGridJabatan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_jabatan', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fs_kd_parent', type: 'string'},
			{name: 'fs_kd_child1', type: 'string'},
			{name: 'fs_kd_child2', type: 'string'},
			{name: 'fn_nourut', type: 'string'}
		]	
	});

	var grupJabatan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridJabatan',
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
			url: 'masterperusahaan/gridjabatan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCariJabatan').getValue()
				});
			}
		}
	});

	var gridJabatan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupJabatan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Jabatan',
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			locked: true,
			width: 300
		},{
			xtype:'actioncolumn',
			locked: true,
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_jabatan');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterperusahaan/removejabatan/',
			            				params : {
											'fs_kode_jabatan': str
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
											fnResetJabatan();
											grupJabatan.load();  
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
		},{
			text: 'Parent Jabatan',
			dataIndex: 'fs_parent_jabatan',
			menuDisabled: true,
			width: 300
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupJabatan
		}),
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
			url: 'masterlokasi/select'
		}
	});	

	var grupAktif = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_perusahaan','fs_nama_perusahaan'
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
			url: 'masterperusahaan/gridaktif'
		}
	});

	var grupParentDep = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_departemen','fs_nama_departemen'
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
			url: 'masterperusahaan/gridparentdepartemen'
		}
	});

	var grupParentJab = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_jabatan','fs_nama_jabatan'
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
			url: 'masterperusahaan/gridparentjabatan'
		}
	});

	// POPUP TAB SETUP DEPARTEMEN
	var winGrid1 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupAktif,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Perusahaan", dataIndex: 'fs_kode_perusahaan', menuDisabled: true, flex: 1},
			{text: "Nama Perusahaan", dataIndex: 'fs_nama_perusahaan', menuDisabled: true, flex: 2},
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupAktif,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('txtKodePerusahaan2').setValue(record.get('fs_kode_perusahaan'));
				Ext.getCmp('cboNamaPerusahaan2').setValue(record.get('fs_nama_perusahaan'));
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
				grupAktif.load();
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
		store: grupParentDep,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Departemen", dataIndex: 'fs_kode_departemen', menuDisabled: true, flex: 1},
			{text: "Nama Departemen", dataIndex: 'fs_nama_departemen', menuDisabled: true, flex: 2}
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupParentDep,
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
				Ext.getCmp('txtKodeParentDepartemen').setValue(record.get('fs_kode_departemen'));
				Ext.getCmp('cboParentDepartemen').setValue(record.get('fs_nama_departemen'));
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
				grupParentDep.load();
				vMask.show();
			}
		}
	});

	// POPUP TAB SETUP JABATAN
	var winGrid3 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupAktif,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Perusahaan", dataIndex: 'fs_kode_perusahaan', menuDisabled: true, flex: 1},
			{text: "Nama Perusahaan", dataIndex: 'fs_nama_perusahaan', menuDisabled: true, flex: 2},
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupAktif,
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
				Ext.getCmp('txtKodePerusahaan3').setValue(record.get('fs_kode_perusahaan'));
				Ext.getCmp('cboNamaPerusahaan3').setValue(record.get('fs_nama_perusahaan'));
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
				grupAktif.load();
				vMask.show();
			}
		}
	});

	var winGrid4 = Ext.create('Ext.grid.Panel',{
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupParentJab,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Jabatan", dataIndex: 'fs_kode_jabatan', menuDisabled: true, flex: 1},
			{text: "Nama Jabatan", dataIndex: 'fs_nama_jabatan', menuDisabled: true, flex: 2}
		],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupParentJab,
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
				Ext.getCmp('txtKodeParentJabatan').setValue(record.get('fs_kode_jabatan'));
				Ext.getCmp('cboParentJabatan').setValue(record.get('fs_nama_jabatan'));
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
				grupParentJab.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM SETUP PERUSAHAAN
	var txtKodePerusahaan1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Kode Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodePerusahaan1',
		name: 'txtKodePerusahaan1',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 5,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaPerusahaan1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaPerusahaan1',
		name: 'txtNamaPerusahaan1',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 50,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtInisialPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Singkatan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtInisialPerusahaan',
		name: 'txtInisialPerusahaan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 10,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatPerusahaan',
		name: 'txtAlamatPerusahaan',
		xtype: 'textareafield',
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtTeleponPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Telepon',
		id: 'txtTeleponPerusahaan',
		name: 'txtTeleponPerusahaan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtFaxPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Fax',
		id: 'txtFaxPerusahaan',
		name: 'txtFaxPerusahaan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtDomainPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Domain Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: 'www.website.com',
		id: 'txtDomainPerusahaan',
		name: 'txtDomainPerusahaan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 50,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboAktif = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Aktif',
		id: 'cboAktif',
		name: 'cboAktif',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	Ext.define('Image', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'src', type: 'string'}
		]
	});

	var dataImg = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'Image',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'masterperusahaan/logoperusahaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_perusahaan': Ext.getCmp('txtKodePerusahaan1').getValue()
				});
			}
		}
	});

	var imageTpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div style="margin-bottom: 5px;" class="thumb-wrap">',
				'<img src="{src}" width="125px" height="100px" />',
			'</div>',
		'</tpl>'
	);

	var changingImage = Ext.create('Ext.view.View', {
		itemSelector: 'div.thumb-wrap',
		store: dataImg,
		tpl: imageTpl
	});

	var fileLogo = {
		anchor : '100%',
		emptyText: 'Select File Image',
		id: 'fileLogo',
		name: 'fileLogo',
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
				url: 'masterperusahaan/uploadphoto',
				waitMsg: 'Uploading your file...',
				success: function (form, action) {
					var result = action.result; 
					var data = result.data;
					var name = data.name;
					var message = Ext.String.format('<b>Message:</b> {0}<br>'+'<b>FileName:</b> {1}', result.msg, name);
					Ext.Msg.alert('Success', message);
					// AFTER UPLOAD REFRESH IMAGE LOGO
					dataImg.load();
				},
				failure: function (form, action) {
					Ext.Msg.alert('Failure', action.result.msg);
				}
			});
		}
	}

	// COMPONENT FORM SETUP DEPARTEMEN
	var txtKodePerusahaan2 = {
		id: 'txtKodePerusahaan2',
		name: 'txtKodePerusahaan2',
		xtype: 'textfield',
		hidden: true
	};

	var cboNamaPerusahaan2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'cboNamaPerusahaan2',
		name: 'cboNamaPerusahaan2',
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

	var txtKodeDepartemen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Kode Departemen',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeDepartemen',
		name: 'txtKodeDepartemen',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 5,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaDepartemen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Departemen',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaDepartemen',
		name: 'txtNamaDepartemen',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 45,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKodeParentDepartemen = {
		id: 'txtKodeParentDepartemen',
		name: 'txtKodeParentDepartemen',
		xtype: 'textfield',
		hidden: true
	};

	var cboParentDepartemen = {
		anchor: '100%',
		editable: false,
		fieldLabel: 'Parent Departemen',
		id: 'cboParentDepartemen',
		name: 'cboParentDepartemen',
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

	var txtNoUrutDepartemen = {
		anchor: '100%',
		fieldLabel: 'No. Urut Departemen',
		id: 'txtNoUrutDepartemen',
		name: 'txtNoUrutDepartemen',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 3,
		maskRe: /[0123456789]/,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSave2 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave2',
		name: 'btnSave2',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveDepartemen
	};

	var btnReset2 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset2',
		name: 'btnReset2',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetDepartemen
	};

	// COMPONENT FORM SETUP JABATAN
	var txtKodePerusahaan3 = {
		id: 'txtKodePerusahaan3',
		name: 'txtKodePerusahaan3',
		xtype: 'textfield',
		hidden: true
	};

	var cboNamaPerusahaan3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'cboNamaPerusahaan3',
		name: 'cboNamaPerusahaan3',
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

	var txtKodeJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Kode Jabatan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeJabatan',
		name: 'txtKodeJabatan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 5,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Jabatan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaJabatan',
		name: 'txtNamaJabatan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 50,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKodeParentJabatan = {
		id: 'txtKodeParentJabatan',
		name: 'txtKodeParentJabatan',
		xtype: 'textfield',
		hidden: true
	};

	var cboParentJabatan = {
		anchor: '100%',
		editable: false,
		fieldLabel: 'Parent Jabatan',
		id: 'cboParentJabatan',
		name: 'cboParentJabatan',
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

	var txtNoUrutJabatan = {
		anchor: '100%',
		fieldLabel: 'No. Urut Jabatan',
		id: 'txtNoUrutJabatan',
		name: 'txtNoUrutJabatan',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 3,
		maskRe: /[0123456789]/,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSave3 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave3',
		name: 'btnSave3',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveJabatan
	};

	var btnReset3 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset3',
		name: 'btnReset3',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetJabatan
	};

	// FUNCTION TAB SETUP PERUSAHAAN
	function fnResetPerusahaan() {
		Ext.getCmp('txtKodePerusahaan1').setValue('');
		Ext.getCmp('txtNamaPerusahaan1').setValue('');
		Ext.getCmp('txtInisialPerusahaan').setValue('');
		Ext.getCmp('txtAlamatPerusahaan').setValue('');
		Ext.getCmp('txtTeleponPerusahaan').setValue('');
		Ext.getCmp('txtFaxPerusahaan').setValue('');
		Ext.getCmp('txtDomainPerusahaan').setValue('');
		Ext.getCmp('cboAktif').setValue('');
		Ext.getCmp('btnUpload').setDisabled(true);
	}

	function fnCekSavePerusahaan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterperusahaan/ceksaveperusahaan',
				params: {
					'fs_kode_perusahaan': Ext.getCmp('txtKodePerusahaan1').getValue()
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
									fnSavePerusahaan();
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

	function fnSavePerusahaan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterperusahaan/saveperusahaan',
			params: {
				'fs_kode_perusahaan': Ext.getCmp('txtKodePerusahaan1').getValue(),
				'fs_nama_perusahaan': Ext.getCmp('txtNamaPerusahaan1').getValue(),
				'fs_singkatan': Ext.getCmp('txtInisialPerusahaan').getValue(),
				'fs_alamat_perusahaan': Ext.getCmp('txtAlamatPerusahaan').getValue(),
				'fs_no_tlp': Ext.getCmp('txtTeleponPerusahaan').getValue(),
				'fs_no_fax': Ext.getCmp('txtFaxPerusahaan').getValue(),
				'fs_website': Ext.getCmp('txtDomainPerusahaan').getValue(),
				'fs_aktif': Ext.getCmp('cboAktif').getValue()
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
				fnResetDepartemen();
				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1-1');
				// REFRESH AFTER SAVE
				grupPerusahaan.load();
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

	// FUNCTION TAB DEPARTEMEN
	function fnResetDepartemen() {
		Ext.getCmp('txtKodeDepartemen').setValue('');
		Ext.getCmp('txtNamaDepartemen').setValue('');
		Ext.getCmp('txtKodeParentDepartemen').setValue('');
		Ext.getCmp('cboParentDepartemen').setValue('');
		Ext.getCmp('txtNoUrutDepartemen').setValue('');
	}

	function fnCekSaveDepartemen() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterperusahaan/ceksavedepartemen',
				params: {
					'fs_kode_departemen': Ext.getCmp('txtKodeDepartemen').getValue(),
					'fs_nama_departemen': Ext.getCmp('txtNamaDepartemen').getValue()
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
									fnSaveDepartemen();
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

	function fnSaveDepartemen() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterperusahaan/savedepartemen',
			params: {
				'fs_kode_departemen': Ext.getCmp('txtKodeDepartemen').getValue(),
				'fs_nama_departemen': Ext.getCmp('txtNamaDepartemen').getValue(),
				'fs_kd_parent': Ext.getCmp('txtKodeParentDepartemen').getValue(),
				'fn_nourut': Ext.getCmp('txtNoUrutDepartemen').getValue()
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
				fnResetDepartemen();
				// REFRESH AFTER SAVE
				grupDepartemen.load();
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

	// FUNCTION TAB JABATAN
	function fnResetJabatan() {
		Ext.getCmp('txtKodeJabatan').setValue('');
		Ext.getCmp('txtNamaJabatan').setValue('');
		Ext.getCmp('txtKodeParentJabatan').setValue('');
		Ext.getCmp('cboParentJabatan').setValue('');
		Ext.getCmp('txtNoUrutJabatan').setValue('');
	} 

	function fnCekSaveJabatan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterperusahaan/ceksavejabatan',
				params: {
					'fs_kode_jabatan': Ext.getCmp('txtKodeJabatan').getValue()
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
									fnSaveJabatan();
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

	function fnSaveJabatan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterperusahaan/savejabatan',
			params: {
				'fs_kode_jabatan': Ext.getCmp('txtKodeJabatan').getValue(),
				'fs_nama_jabatan': Ext.getCmp('txtNamaJabatan').getValue(),
				'fs_kd_parent': Ext.getCmp('txtKodeParentJabatan').getValue(),
				'fn_nourut': Ext.getCmp('txtNoUrutJabatan').getValue()
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
				fnResetJabatan();
				// REFRESH AFTER SAVE
				grupJabatan.load();
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

	var frmMasterPerusahaan = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Perusahaan',
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
				title: 'Perusahaan',
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
						title: 'Daftar Perusahaan',
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
							title: 'Daftar Perusahaan',
							xtype: 'fieldset',
							items: [
								gridPerusahaan
							]
						}]
					},{
						id: 'tab1-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Setup Perusahaan',
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
										title: 'Setup Perusahaan',
										xtype: 'fieldset',
										items: [
											txtKodePerusahaan1,
											txtNamaPerusahaan1,
											txtInisialPerusahaan,
											txtAlamatPerusahaan,
											txtTeleponPerusahaan,
											txtFaxPerusahaan,
											txtDomainPerusahaan,
											cboAktif
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '100%',
										style: 'padding: 5px;',
										title: 'Logo',
										xtype: 'fieldset',
										items: [{
											anchor: '100%',
											layout: 'hbox',
											xtype: 'container',
											items: [{
												flex: 1,
												layout: 'anchor',
												xtype: 'container',
												style: 'padding: 5px;',
												items: [{
													style: 'padding: 5px;',
													xtype: 'fieldset',
													items: [
														changingImage
													]
												}]
											},{
												flex: 2,
												layout: 'anchor',
												xtype: 'container',
												style: 'padding: 5px;',
												items: [{
													style: 'padding: 5px;',
													xtype: 'fieldset',
													items: [
														fileLogo,
														btnUpload,
													]
												}]
											}]
										}]
									}]
								}]
							}]
						}],
						buttons: [{
							iconCls: 'icon-save',
							id: 'btnSave1',
							name: 'btnSave1',
							text: 'Save',
							scale: 'medium',
							handler: fnCekSavePerusahaan
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: fnResetPerusahaan
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				xtype: 'form',
				title: 'Departemen',
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
								xtype: 'fieldset',
								items: [
									txtKodeDepartemen,
									txtNamaDepartemen
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtKodeParentDepartemen,
											cboParentDepartemen,
											txtNoUrutDepartemen
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: []
									},{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: [
											btnSave2
										]
									},{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: [
											btnReset2
										]
									}]
								}]
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
								anchor: '100%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									gridDepartemen
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
				xtype: 'form',
				title: 'Jabatan',
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
								xtype: 'fieldset',
								items: [
									txtKodeJabatan,
									txtNamaJabatan
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtKodeParentJabatan,
											cboParentJabatan,
											txtNoUrutJabatan
										]
									}]
								},{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: []
									},{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: [
											btnSave3
										]
									},{
										flex: 2,
										layout: 'anchor',
										xtype: 'container',
										items: [
											btnReset3
										]
									}]
								}]
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
								anchor: '100%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									gridJabatan
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
		target: frmMasterPerusahaan
	});

	function fnMaskShow() {
		frmMasterPerusahaan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterPerusahaan.unmask();
	}
	
	frmMasterPerusahaan.render(Ext.getBody());
	Ext.get('loading').destroy();

});