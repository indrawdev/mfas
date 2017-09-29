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
		target: frmMasterKewenangan
	});

	function fnMaskShow() {
		frmMasterKewenangan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterKewenangan.unmask();
	}
	
	frmMasterKewenangan.render(Ext.getBody());
	Ext.get('loading').destroy();
});