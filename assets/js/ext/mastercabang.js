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

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterCabang
	});

	function fnMaskShow() {
		frmMasterCabang.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterCabang.unmask();
	}
	
	frmMasterCabang.render(Ext.getBody());
	Ext.get('loading').destroy();
});