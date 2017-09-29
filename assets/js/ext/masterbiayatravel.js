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

	Ext.define('DataGridBiaya', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_biaya', type: 'string'},
			{name: 'fs_nama_biaya', type: 'string'}
		]
	});

	var gridMasterBiaya = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: '',
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Biaya',
			dataIndex: 'fs_kode_biaya',
			menuDisabled: true,
			width: 100
		},{
			text: 'Nama Biaya',
			dataIndex: 'fs_nama_biaya',
			menuDisabled: true,
			width: 250
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: ''
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

	// COMPONENT FORM BIAYA
	var txtKodeBiaya = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Biaya',
		id: 'txtKodeBiaya',
		name: 'txtKodeBiaya',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 5,
		enforceMaxLength: true
	};

	var txtNamaBiaya = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Biaya',
		id: 'txtNamaBiaya',
		name: 'txtNamaBiaya',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 100,
		enforceMaxLength: true
	};

	var btnSearch = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSearch',
		name: 'btnSearch',
		text: 'Search',
		iconCls: 'icon-preview',
		handler: function() {
			
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
		handler: ''
	};

	var btnReset = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset',
		name: 'btnReset',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: ''
	};

	var frmMasterBiaya = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Biaya',
		width: 930,
		items: [{
			bodyStyle: 'background-color: '.concat(gBasePanel),
			border: false,
			frame: false,
			xtype: 'form',
			items: [{
				fieldDefaults: {
					labelAlign: 'right',
					labelSeparator: '',
					labelWidth: 120,
					msgTarget: 'side'
				},
				xtype: 'fieldset',
				border: false,
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
							title: 'Form Biaya Travel',
							xtype: 'fieldset',
							items: [
								txtKodeBiaya,
								txtNamaBiaya,
								btnSearch
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
							style: 'padding: 5px;',
							title: 'Data Biaya Travel',
							xtype: 'fieldset',
							items: [
								gridMasterBiaya
							]
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterBiaya
	});

	function fnMaskShow() {
		frmMasterBiaya.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterBiaya.unmask();
	}

	frmMasterBiaya.render(Ext.getBody());
	Ext.get('loading').destroy();

});