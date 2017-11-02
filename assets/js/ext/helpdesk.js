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
		url: 'helpdesk/username',
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
				title: 'MFAS'
			});
		}
	});

	Ext.define('DataGridBantuan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_username', type: 'string'},
			{name: 'fs_subjek', type: 'string'},
			{name: 'fs_pesan', type: 'string'}
		]
	});

	var grupBantuan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridBantuan',
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
			url: 'helpdesk/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKodeCabang').getValue(),
					'fs_username': Ext.getCmp('txtUser').getValue()
				});
			}
		}
	});

	var grupKategori = Ext.create('Ext.data.Store', {
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
			url: 'helpdesk/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'helpdesk_kategori'
				});
			}
		}
	});

	var grupStatus = Ext.create('Ext.data.Store', {
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
			url: 'helpdesk/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'helpdesk_status'
				});
			}
		}
	});

	var gridResultBantuan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 400,
		sortableColumns: false,
		store: grupBantuan,
		columns: [{
			width: 45,
			xtype: 'rownumberer'
		},{
			dataIndex: 'fs_judul',
			menuDisabled: true, 
			text: 'Subject',
			flex: 2
		},{
			dataIndex: 'fs_kategori',
			menuDisabled: true, 
			text: 'Kategori',
			flex: 1.5
		},{
			dataIndex: 'fs_flag_status',
			menuDisabled: true, 
			text: 'Status',
			flex: 1
		},{
			dataIndex: 'fs_pesan',
			menuDisabled: true, 
			text: 'Status',
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Subjek',
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
					grupBantuan.load();
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
			store: grupBantuan
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

	// COMPONENT FORM BANTUAN
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

	var cboKategori = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Kategori',
		id: 'cboKategori',
		name: 'cboKategori',
		store: grupKategori,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtJudul = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Judul',
		fieldLabel: 'Judul',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtJudul',
		name: 'txtJudul',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboStatus = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelWidth: 80,
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status',
		id: 'cboStatus',
		name: 'cboStatus',
		store: grupStatus,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtPesan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Pesan',
		height : 160,
		fieldLabel: '',
		labelWidth: 0,
		id: 'txtPesan',
		name: 'txtPesan',
		xtype: 'textareafield',
	};

	// FUNCTIONS
	function fnReset() {

	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'helpdesk/ceksave',
				params: {
					'fs_username': Ext.getCmp('txtUser').getValue()
				},
				success: function(response) {
					var xtext = Ext.decode(response.responseText);
					if (xtext.sukses === false) {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.MessageBox.INFO,
							msg: xtext.hasil,
							title: 'MFAS'
						});
					} else {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.YESNO,
							closable: false,
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'MFAS',
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
						msg: 'Simpan Gagal, Koneksi Gagal',
						title: 'MFAS'
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
			url: 'helpdesk/save',
			params: {
				'fs_username': Ext.getCmp('txtUser').getValue(),
				'fs_kategori': Ext.getCmp('cboKategori').getValue(),
				'fs_judul': Ext.getCmp('txtJudul').getValue(),
				'fs_pesan': Ext.getCmp('txtPesan').getValue(),
				'fs_flag_status': Ext.getCmp('cboStatus').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: xtext.hasil,
					title: 'MFAS'
				});
				if (xtext.sukses === true) {
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab2');
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Saving Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	var frmHelpdesk = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Bantuan',
		width: 550,
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
				title: 'Form',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Form Bantuan',
					xtype: 'fieldset',
					items: [
						txtUser,
						{
							anchor: '100%',
							layout: 'hbox',
							xtype: 'container',
							items: [{
								flex: 1.5,
								layout: 'anchor',
								xtype: 'container',
								items: [
									cboKategori
								]
							},{
								flex: 1,
								layout: 'anchor',
								xtype: 'container',
								items: [
									cboStatus
								]
							}]
						},
						txtJudul,
						txtPesan
					]
				}],
				buttons: [{
					iconCls: 'icon-send',
					id: 'btnSend',
					name: 'btnSend',
					text: 'Send',
					scale: 'medium',
					handler: fnCekSave
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnReset
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Result',
				xtype: 'form',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 80,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Result Helpdesk',
					xtype: 'fieldset',
					items: [
						gridResultBantuan
					]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmHelpdesk
	});

	function fnMaskShow() {
		frmHelpdesk.mask('Please wait...');
	}

	function fnMaskHide() {
		frmHelpdesk.unmask();
	}
	
	frmHelpdesk.render(Ext.getBody());
	Ext.get('loading').destroy();

});