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

	var gridResultEmail = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: '',
		columns: [{
			xtype: 'rownumberer',
			width: 35
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 90
		},{
			text: 'Lokasi',
			dataIndex: 'fs_lokasi',
			menuDisabled: true,
			width: 90
		},{
			text: 'Judul',
			dataIndex: 'fs_title',
			menuDisabled: true,
			width: 200
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 70
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

	var gridResultApps = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: '',
		columns: [{
			xtype: 'rownumberer',
			width: 35
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 90
		},{
			text: 'Lokasi',
			dataIndex: 'fs_lokasi',
			menuDisabled: true,
			width: 90
		},{
			text: 'Judul',
			dataIndex: 'fs_title',
			menuDisabled: true,
			width: 200
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 70
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

	// COMPONENT FORM EMAIL
	var cboLokasi1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Lokasi',
		fieldLabel: 'Lokasi',
		editable: false,
		id: 'cboLokasi1',
		name: 'cboLokasi1',
		xtype: 'textfield',
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
					//winCari.show();
					//winCari.center();
				}
			}
		}
	};

	var txtTitle1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Judul Broadcast',
		fieldLabel: 'Judul',
		id: 'txtTitle1',
		name: 'txtTitle1',
		xtype: 'textfield'
	};

	var txtMessage1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Pesan',
		height : 160,
		fieldLabel: '',
		labelWidth: 0,
		id: 'txtMessage1',
		name: 'txtMessage1',
		xtype: 'textareafield',
	};

	var fileAttach = {
		anchor : '100%',
		afterLabelTextTpl: required,
		allowBlank: false,
		emptyText: 'Select File',
		id: 'fileAttach',
		name: 'fileAttach',
		xtype: 'fileuploadfield',
		buttonCfg: {
			text: 'Browse',
			iconCls: 'upload-icon'
		}
	};

	var btnUpload = {
		anchor: '100%',
		scale: 'small',
		iconCls: 'icon-add',
		xtype: 'button',
		text: 'Upload',
		handler: function () {
			var form = this.up('form').getForm();
			if (form.isValid()) {
				form.submit({
					url: '',
					waitMsg: 'Uploading your file...',
					success: function (form, action) {
						var result = action.result; 
						var data = result.data;
						var name = data.name;
						var message = Ext.String.format('<b>Message:</b> {0}<br>'+'<b>FileName:</b> {1}', result.msg, name);
						Ext.Msg.alert('Success', message);
                    },
                    failure: function (form, action) {
                        Ext.Msg.alert('Failure', action.result.msg);
                    }
				});
			}
		}
	};

	// COMPONENT FORM APPS
	var cboLokasi2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Lokasi',
		fieldLabel: 'Lokasi',
		editable: false,
		id: 'cboLokasi2',
		name: 'cboLokasi2',
		xtype: 'textfield',
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
					//winCari.show();
					//winCari.center();
				}
			}
		}
	};

	var txtTitle2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Judul Broadcast',
		fieldLabel: 'Judul',
		id: 'txtTitle2',
		name: 'txtTitle2',
		xtype: 'textfield'
	};

	var txtMessage2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Pesan',
		height : 160,
		fieldLabel: '',
		labelWidth: 0,
		id: 'txtMessage2',
		name: 'txtMessage2',
		xtype: 'textareafield',
	};


	// FUNCTION TAB BROADCAST VIA EMAIL
	function fnResetEmail() {

	}

	function fnCekSaveEmail() {

	}

	function fnSaveEmail() {

	}

	// FUNCTION TAB BROADCAST VIA APPS
	function fnResetApp() {

	}

	function fnCekSaveApp() {

	}

	function fnSaveApp() {
		
	}


	var frmBroadcast = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Broadcast',
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
				title: 'Broadcast via Email',
				items: [{
					activeTab: 0,
					bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
					border: false,
					plain: true,
					xtype: 'tabpanel',
					items: [{
						id: 'tab1-1',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Form',
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
							title: 'Form Broadcast Email',
							xtype: 'fieldset',
							items: [
								cboLokasi1,
								txtTitle1,
								txtMessage1
							]
						},{
							anchor: '100%',
							style: 'padding: 5px;',
							title: 'Email Attachment',
							xtype: 'fieldset',
							items: [
								fileAttach,
								btnUpload
							]
						}],
						buttons: [{
							iconCls: 'icon-send',
							id: 'btnSend1',
							name: 'btnSend1',
							text: 'Send Email',
							scale: 'medium',
							handler: ''
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: ''
						}]
					},{
						id: 'tab1-2',
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
							title: 'Result Broadcast Email',
							xtype: 'fieldset',
							items: [
								gridResultEmail
							]
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Broadcast via Apps',
				items: [{
					activeTab: 0,
					bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
					border: false,
					plain: true,
					xtype: 'tabpanel',
					items: [{
						id: 'tab2-1',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Form',
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
							title: 'Form Broadcast Apps',
							xtype: 'fieldset',
							items: [
								cboLokasi2,
								txtTitle2,
								txtMessage2
							]
						}],
						buttons: [{
							iconCls: 'icon-send',
							id: 'btnSend2',
							name: 'btnSend2',
							text: 'Send to Apps',
							scale: 'medium',
							handler: ''
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: ''
						}]
					},{
						id: 'tab2-2',
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
							title: 'Result Broadcast Apps',
							xtype: 'fieldset',
							items: [
								gridResultApps
							]
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmBroadcast
	});

	function fnMaskShow() {
		frmBroadcast.mask('Please wait...');
	}

	function fnMaskHide() {
		frmBroadcast.unmask();
	}
	
	frmBroadcast.render(Ext.getBody());
	Ext.get('loading').destroy();
	
});