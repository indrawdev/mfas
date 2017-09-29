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

	Ext.Ajax.request({
		method: 'POST',
		url: 'changekey/enkripsi',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			if (xtext.sukses === true) {
				Ext.getCmp('txtEncryptText').setValue(xtext.fs_encrypt);
			}
		},
		failure: function(response) {
			var xText = Ext.decode(response.responseText);
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.OK,
				closable: false,
				icon: Ext.MessageBox.INFO,
				message: 'Load default value Failed, Connection Failed!!',
				title: 'HRD'
			});
		}
	});

	var txtPlainText = {
		anchor: '100%',
		fieldLabel: 'Sample Text',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPlainText',
		name: 'txtPlainText',
		value: '8000000',
		xtype: 'textfield'
	};

	var txtEncryptText = {
		anchor: '100%',
		fieldLabel: 'Encrypt Text',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtEncryptText',
		name: 'txtEncryptText',
		xtype: 'textfield'
	};

	var btnCopyTemp = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnCopyTemp',
		name: 'btnCopyTemp',
		text: 'Copy to Temporary DB',
		iconCls: 'icon-copy',
		handler: fnCopy
	};

	var txtOldKey = {
		anchor: '100%',
		fieldLabel: 'EXISTS KEY',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtOldKey',
		name: 'txtOldKey',
		xtype: 'textfield'
	};

	var txtNewKey = {
		anchor: '100%',
		fieldLabel: 'NEW KEY',
		id: 'txtNewKey',
		name: 'txtNewKey',
		xtype: 'textfield'
	};

	var btnChangeKey = {
		anchor: '100%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnChangeKey',
		name: 'btnChangeKey',
		text: 'Change Key',
		iconCls: 'icon-key',
		disabled: true,
		handler: fnChange
	};

	var lblIntro1 = {
		anchor: '100%',
		xtype: 'label',
		text: '1. Klik Tombol Copy to Temporary DB'
	};

	var lblIntro2 = {
		anchor: '100%',
		xtype: 'label',
		text: '2. Jika ingin diganti, Isi New KEY'
	};

	var lblIntro3 = {
		anchor: '100%',
		xtype: 'label',
		text: '3. Klik Tombol Change Key'
	};

	// FUNCTION FORM CHANGE KEY
	function fnReset() {
		Ext.getCmp('txtOldKey').setValue('');
		Ext.getCmp('txtNewKey').setValue('');
	}

	function fnCopy() {
		Ext.Ajax.setTimeout(120000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'changekey/copytempdb',
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				if (xtext.sukses === true) {
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: xtext.hasil,
						title: 'HRD'
					});
				}

				Ext.getCmp('txtOldKey').setValue(xtext.fs_realkey);
				Ext.getCmp('txtNewKey').setValue(xtext.fs_realkey);

				Ext.getCmp('btnCopyTemp').setDisabled(true);
				Ext.getCmp('btnChangeKey').setDisabled(false);
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
			}
		});
	}

	function fnChange() {
		Ext.Ajax.setTimeout(120000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'changekey/changekey',
			params: {
				'fs_newkey': Ext.getCmp('txtNewKey').getValue()
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

				Ext.getCmp('txtEncryptText').setValue(xtext.fs_encrypt);
				
				fnReset();

				Ext.getCmp('btnCopyTemp').setDisabled(false);
				Ext.getCmp('btnChangeKey').setDisabled(true);
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
			}
		});
	}

	var frmChangeKey = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Change Key',
		width: 550,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 80,
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
					flex: 2,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '98%',
						style: 'padding: 5px;',
						title: 'Sample Value',
						xtype: 'fieldset',
						items: [
							txtPlainText,
							txtEncryptText
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
						anchor: '98%',
						style: 'padding: 5px;',
						title: 'Copy',
						xtype: 'fieldset',
						items: [
							btnCopyTemp
						]
					}]
				}]
			},{
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
						title: 'Exists Key',
						xtype: 'fieldset',
						items: [
							txtOldKey
						]
					}]
				},{
					flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '98%',
						style: 'padding: 5px;',
						title: 'New Key',
						xtype: 'fieldset',
						items: [
							txtNewKey
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
						anchor: '98%',
						style: 'padding: 5px;',
						title: 'Change Key',
						xtype: 'fieldset',
						items: [
							btnChangeKey
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
						anchor: '100%',
						border: false,
						xtype: 'fieldset',
						items: [
							lblIntro1
						]
					},{
						anchor: '100%',
						border: false,
						xtype: 'fieldset',
						items: [
							lblIntro2
						]
					},{
						anchor: '100%',
						border: false,
						xtype: 'fieldset',
						items: [
							lblIntro3
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmChangeKey
	});

	function fnMaskShow() {
		frmChangeKey.mask('Please wait...');
	}

	function fnMaskHide() {
		frmChangeKey.unmask();
	}
	
	frmChangeKey.render(Ext.getBody());
	Ext.get('loading').destroy();

});