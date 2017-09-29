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

	var gridPengajuanCash = Ext.create('Ext.grid.Panel', {
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
			width: 240
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Tujuan Travel',
			dataIndex: 'fs_tujuan_travel',
			menuDisabled: true,
			width: 150
		},{
			text: 'Dari Lokasi',
			dataIndex: 'fs_dari_lokasi',
			menuDisabled: true,
			width: 150
		},{
			text: 'Ke Lokasi',
			dataIndex: 'fs_ke_lokasi',
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
	
	// COMPONENT FORM PENGAJUAN CASH ADVANCE

	var frmPengajuanCash = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Pengajuan Cash Advance',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 100,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Pengajuan Cash Advance',
			xtype: 'fieldset',
			items: [
				gridPengajuanCash
			]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmPengajuanCash
	});

	function fnMaskShow() {
		frmPengajuanCash.mask('Please wait...');
	}

	function fnMaskHide() {
		frmPengajuanCash.unmask();
	}
	
	frmPengajuanCash.render(Ext.getBody());
	Ext.get('loading').destroy();

});