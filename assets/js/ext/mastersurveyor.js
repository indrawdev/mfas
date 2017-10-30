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

	Ext.define('DataGridSurveyor', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_kode_surveyor', type: 'string'},
			{name: 'fs_kode_surveyor_lama', type: 'string'},
			{name: 'fs_nama_surveyor', type: 'string'},
			{name: 'fs_alamat_surveyor', type: 'string'},
			{name: 'fs_ktp_surveyor', type: 'string'},
			{name: 'fs_handphone_surveyor', type: 'string'},
			{name: 'fs_aktif', type: 'string'}
		]
	});

	var grupSurveyor = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridSurveyor',
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
			url: 'mastersurveyor/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	// GRID SURVEYOR
	var gridSurveyor = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupSurveyor,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_kode_surveyor',
			menuDisabled: true, 
			text: 'Kode Baru',
			flex: 1
		},{
			dataIndex: 'fs_kode_surveyor_lama',
			menuDisabled: true, 
			text: 'Kode Lama',
			flex: 1
		},{
			dataIndex: 'fs_nama_surveyor',
			menuDisabled: true, 
			text: 'Nama Surveyor',
			flex: 2
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Surveyor',
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
					grupSurveyor.load();
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
			store: grupSurveyor
		}),
		listeners: {
			itemdblclick: function(grid, record) {

			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	// COMPONENT FORM MASTER SURVEYOR
	var txtKodeSurveyor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Baru',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeSurveyor',
		name: 'txtKodeSurveyor',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKodeLama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Lama',
		fieldStyle: 'text-transform: uppercase;',
		labelWidth: 80,
		id: 'txtKodeLama',
		name: 'txtKodeLama',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaSurveyor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaSurveyor',
		name: 'txtNamaSurveyor',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatSurveyor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatSurveyor',
		name: 'txtAlamatSurveyor',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKTPSurveyor = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'KTP',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKTPSurveyor',
		name: 'txtKTPSurveyor',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtHandphone = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Handphone',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtHandphone',
		name: 'txtHandphone',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSave = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave',
		name: 'btnSave',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave
	};

	var btnReset = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset',
		name: 'btnReset',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset
	};

	// FUNCTIONS
	function fnReset() {

	}

	function fnCekSave() {

	}

	function fnSave() {

	}

	var frmMasterSurveyor = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Surveyor',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 120,
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
						title: 'Form Surveyor',
						xtype: 'fieldset',
						items: [
							{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 1.5,
									layout: 'anchor',
									xtype: 'container',
									items: [
										txtKodeSurveyor
									]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [
										txtKodeLama
									]
								}]
							},
							txtNamaSurveyor,
							txtAlamatSurveyor,
							txtKTPSurveyor,
							txtHandphone
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
								btnSave
							]
						},{
							flex: 2,
							layout: 'anchor',
							xtype: 'container',
							items: [
								btnReset
							]
						}]
					}]
				},{
					flex: 1.5,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '98%',
						style: 'padding: 5px;',
						title: 'Data Surveyor',
						xtype: 'fieldset',
						items: [
							gridSurveyor
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterSurveyor
	});

	function fnMaskShow() {
		frmMasterSurveyor.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterSurveyor.unmask();
	}
	
	frmMasterSurveyor.render(Ext.getBody());
	Ext.get('loading').destroy();
});