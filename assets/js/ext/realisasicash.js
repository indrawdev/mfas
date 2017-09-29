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

	var gridRealisasiCash = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: '',
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			locked: true,
			width: 80
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			locked: true,
			width: 250
		},{
			text: 'Dokumen Upload',
			dataIndex: 'fs_dokumen_upload',
			menuDisabled: true,
			width: 250
		},{
			text: 'Tanggal Upload',
			dataIndex: 'fd_tanggal_upload',
			menuDisabled: true,
			width: 90
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				afterLabelTextTpl: required,
				allowBlank: false,
				emptyText: 'NIK / Nama Karyawan',
				id: 'cboNIK',
				name: 'cboNIK',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
					}
				},
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

						}
					}
				}
			}]
		},{
			flex: 1.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				afterLabelTextTpl: required,
				allowBlank: false,
				emptyText: 'Pilih File',
				id: 'fileDok',
				name: 'fileDok',
				xtype: 'fileuploadfield',
				buttonCfg: {
		            text: 'Browse',
		            iconCls: 'icon-upload'
		        }
			}]
		},{
			flex: 0.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				xtype: 'buttongroup',
				defaults: {
					scale: 'small'
				},
				items: [{
					iconCls: 'icon-add',
					itemId: 'addData',
					text: 'Upload',
					handler: function () {

					}
				}]
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: ''
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM REALISASI CASH ADVANCE

	var frmRealisasiCash = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Realisasi Cash Advance',
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
				title: 'Form Realisasi Cash Advance',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Realisasi Cash Advance',
					xtype: 'fieldset',
					items: [
						gridRealisasiCash
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmRealisasiCash
	});

	function fnMaskShow() {
		frmRealisasiCash.mask('Please wait...');
	}

	function fnMaskHide() {
		frmRealisasiCash.unmask();
	}
	
	frmRealisasiCash.render(Ext.getBody());
	Ext.get('loading').destroy();

});