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
		url: 'changepin/username',
		success: function(response) {
			var xtext = Ext.decode(response.responseText);
			if (xtext.sukses === true) {
				Ext.getCmp('txtUser').setValue(xtext.fs_username);
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

	// COMPONENT FORM CHANGE PIN
	var txtUser = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Username',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtUser',
		name: 'txtUser',
		xtype: 'textfield'
	};

	var txtOldPIN = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'DIISI 4 ANGKA',
		fieldLabel: 'Old PIN',
		id: 'txtOldPIN',
		name: 'txtOldPIN  ',
		xtype: 'textfield',
		maxLength: 4,
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNewPIN = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'DIISI 4 ANGKA',
		fieldLabel: 'New PIN',
		id: 'txtNewPIN',
		name: 'txtNewPIN',
		xtype: 'textfield',
		maxLength: 4,
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtConfPIN = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'DIISI 4 ANGKA',
		fieldLabel: 'Confirm PIN',
		id: 'txtConfPIN',
		name: 'txtConfPIN',
		xtype: 'textfield',
		maxLength: 4,
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	// FUNCTION FORM CHANGE PIN
	function fnReset() {
		Ext.getCmp('txtOldPIN').setValue('');
		Ext.getCmp('txtNewPIN').setValue('');
		Ext.getCmp('txtConfPIN').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'changepin/ceksave',
				params: {
					'fs_username': Ext.getCmp('txtUser').getValue(),
					'fs_old_pin': Ext.getCmp('txtOldPIN').getValue(),
					'fs_new_pin': Ext.getCmp('txtNewPIN').getValue(),
					'fs_conf_pin': Ext.getCmp('txtConfPIN').getValue()
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
							icon: Ext.Msg.QUESTION,
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
						msg: 'Saving Failed, Connection Failed!!',
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
			url: 'changepin/save',
			params: {
				'fs_username': Ext.getCmp('txtUser').getValue(),
				'fs_old_pin': Ext.getCmp('txtOldPIN').getValue(),
				'fs_new_pin': Ext.getCmp('txtNewPIN').getValue()
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

	var frmChangePIN = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Change PIN',
		width: 450,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 130,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'User',
			xtype: 'fieldset',
			items: [
				txtUser
			]
		},{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 130,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Change PIN',
			xtype: 'fieldset',
			items: [
				txtOldPIN,
				txtNewPIN,
				txtConfPIN
			]
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
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmChangePIN
	});

	function fnMaskShow() {
		frmChangePIN.mask('Please wait...');
	}

	function fnMaskHide() {
		frmChangePIN.unmask();
	}
	
	frmChangePIN.render(Ext.getBody());
	Ext.get('loading').destroy();

});