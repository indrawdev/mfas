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

	var grupCabang = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang','fs_nama_cabang',
			'fs_alamat_cabang','fs_kota_cabang'
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
			url: 'login/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var winGrid = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Cabang", dataIndex: 'fs_kode_cabang', menuDisabled: true, flex: 0.5},
			{text: "Nama Cabang", dataIndex: 'fs_nama_cabang', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Cabang',
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
					grupCabang.load();
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCabang,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKdCabang').setValue(record.get('fs_kode_cabang'));
				winCari.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'CABANG',
		fieldLabel: 'Cabang',
		editable: false,
		id: 'cboCabang',
		name: 'cboCabang',
		xtype: 'textfield',
		triggers: {
			reset: {
				cls: 'x-form-clear-trigger',
				handler: function(field) {
					field.setValue('');
					Ext.getCmp('txtKdCabang').setValue('');
				}
			},
			cari: {
				cls: 'x-form-search-trigger',
				handler: function() {
					winCari.show();
					winCari.center();
				}
			}
		}
	};

	var txtKdCabang = {
		id: 'txtKdCabang',
		name: 'txtKdCabang',
		xtype: 'textfield',
		hidden: true
	};

	var txtUserName = {
		afterLabelTextTpl: required,
		allowBlank: false,
		emptyText: 'Username',
		fieldLabel: 'Username',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtUserName',
		name: 'txtUserName',
		value: '',
		width: '100%',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtUserPass = {
		afterLabelTextTpl: required,
		allowBlank: false,
		emptyText: 'Password',
		fieldLabel: 'Password',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtUserPass',
		inputType: 'password',
		name: 'txtUserPass',
		value: '',
		width: '100%',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtCaptcha = {
		afterLabelTextTpl: required,
		allowBlank: false,
		fieldLabel: 'Type Captcha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtCaptcha',
		labelWidth: 90,
		name: 'txtCaptcha',
		width: '100%',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	Ext.define('Image', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'src', type: 'string'}
		]
	});

	var dataImg = Ext.create('Ext.data.Store', {
		autoLoad: true,
		id: 'imagesStore',
		model: 'Image',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'login/buat_captcha'
		}
	});

	var imageTpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div style="margin-bottom: 10px;" class="thumb-wrap">',
				'<img src="{src}" />',
				'<br/><span>{caption}</span>',
			'</div>',
		'</tpl>'
	);

	var gambar = Ext.create('Ext.view.View', {
		itemSelector: 'div.thumb-wrap',
		store: dataImg,
		tpl: imageTpl
	});

	var cmdRefresh = {
		iconCls: 'icon-refresh',
		id: 'cmdRefresh',
		name: 'cmdRefresh',
		text: 'Refresh Captcha',
		xtype: 'button',
		handler: function() {
			dataImg.load();
		}
	};

	function fnReset() {
		Ext.getCmp('txtUserName').setValue('');
		Ext.getCmp('txtUserPass').setValue('');
		Ext.getCmp('txtCaptcha').setValue('');
	}

	function fnLogin() {
		var xForm = Ext.getCmp('frmLogin').getForm();
		if (xForm.isValid()) {
			xForm.submit({
				waitTitle: 'Connecting',
				waitMsg: 'Validate User and Password...',
				success: function() {
						window.location.href = 'mainmenu';
				},
				failure: function(form, action) {
					Ext.MessageBox.show({
						buttons: Ext.MessageBox.OK,
						closable: false,
						icon: Ext.MessageBox.INFO,
						msg: 'Login Failed, ' + action.response.responseText,
						title: 'MFAS'
					});
					winLogin.unmask();
				}
			});
		}
	}

	var winLogin = Ext.create('Ext.window.Window', {
		closable: false,
		draggable: true,
		id: 'winLogin',
		name: 'winLogin',
        layout: 'border',
        plain: true,
        resizable: false,
        title: 'Login Form',
        width: 400,
        height: 300,
        items: [
			Ext.create('Ext.form.Panel', {
				bodyStyle: 'padding:15px 35px;',
				border: false,
				defaultType: 'textfield',
				fieldDefaults: {
					msgTarget: 'side',
					labelAlign: 'right',
					labelSeparator: '',
					labelWidth: 90
				},
				frame: false,
				id: 'frmLogin',
				method: 'POST',
				region: 'center',
				url: 'login/ceklogin',
				items:[
					cboCabang,
					txtKdCabang,
					txtUserName,
					txtUserPass,
					txtCaptcha,
					gambar,
					cmdRefresh
				],
				buttons: [{
					text: 'Login',
					handler: fnLogin
				},{
					text: 'Reset',
					handler: fnReset
				}]
			})
		]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: winLogin
	});

	function fnMaskShow() {
		winLogin.mask('Please wait...');
	}

	function fnMaskHide() {
		winLogin.unmask();
	}
	
	winLogin.show();
	Ext.get('loading').destroy();
});