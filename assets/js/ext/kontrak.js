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

	Ext.define('DataGridKonsumen', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_no_apk', type: 'string'},
			{name: 'fs_pjj', type: 'string'},
			{name: 'fd_tgl_apk', type: 'string'},
			{name: 'fs_nama_konsumen', type: 'string'}
		]
	});

	Ext.define('DataGridDokumen', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_dokumen', type: 'string'},
			{name: 'fs_nama_dokumen', type: 'string'},
			{name: 'fs_template_dokumen', type: 'string'},
			{name: 'fn_batas_cetak', type: 'string'}
		]
	});

	var grupKonsumen = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKonsumen',
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
			url: 'kontrak/gridkonsumen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari1').getValue()
				});
			}
		}
	});

	var grupDokumen = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridDokumen',
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
			url: 'kontrak/griddokumen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari2').getValue(),
					'fs_keputusan_kredit': Ext.getCmp('txtKeputusan').getValue()
				});
			}
		}
	});

	// POPUP 
	var winGrid1= Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupKonsumen,
		columns: [{
			xtype: 'rownumberer', 
			width: 45
		},{
			text: 'No. PJJ', 
			dataIndex: 'fs_pjj', 
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nama Konsumen',
			dataIndex: 'fs_nama_konsumen', 
			menuDisabled: true,
			flex: 2.5
		},{
			text: 'Kode Cabang',
			dataIndex: 'fs_kode_cabang',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. APK',
			dataIndex: 'fn_no_apk', 
			menuDisabled: true,
			hidden: true
		},{
			text: 'Keputusan Kredit',
			dataIndex: 'fs_keputusan_kredit', 
			menuDisabled: true, 
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Konsumen',
				id: 'txtCari1',
				name: 'txtCari1',
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
					grupKonsumen.load();
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
			store: grupKonsumen,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKdCab').setValue(record.get('fs_kode_cabang'));
				Ext.getCmp('txtNoApk').setValue(record.get('fn_no_apk'));
				Ext.getCmp('cboKonsumen').setValue(record.get('fs_nama_konsumen'));
				Ext.getCmp('txtKeputusan').setValue(record.get('fs_keputusan_kredit'));
				Ext.getCmp('cboDokumen').setValue('');
				Ext.getCmp('txtKdDok').setValue('');

				winCari1.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupDokumen,
		columns: [{
			xtype: 'rownumberer', 
			width: 45
		},{
			text: 'Kode', 
			dataIndex: 'fs_kode_dokumen', 
			menuDisabled: true, 
			width: 50, 
			hidden: true
		},{
			text: 'Nama Dokumen', 
			dataIndex: 'fs_nama_dokumen', 
			menuDisabled: true, 
			width: 450
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Dokumen',
				id: 'txtCari2',
				name: 'txtCari2',
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
					grupDokumen.load();
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
			store: grupDokumen,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboDokumen').setValue(record.get('fs_nama_dokumen'));
				Ext.getCmp('txtKdDok').setValue(record.get('fs_kode_dokumen'));
				winCari2.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari1 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid1
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupKonsumen.load();
				vMask.show();
			}
		}
	});

	var winCari2 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid2
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupDokumen.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM KONTRAK
	var cboKonsumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: '',
		fieldLabel: 'Nama Konsumen',
		id: 'cboKonsumen',
		name: 'cboKonsumen',
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
					winCari1.show();
					winCari1.center();
				}
			}
		}
	};

	var cboDokumen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: '',
		fieldLabel: 'Nama Dokumen',
		id: 'cboDokumen',
		name: 'cboDokumen',
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
					winCari2.show();
					winCari2.center();
				}
			}
		}
	};
	
	var cekKop = {
		boxLabel: 'Kop',
		checked: false,
		id: 'cekKop',
		name: 'cekKop',
		xtype: 'checkboxfield'
	};

	var txtNamaCA = {
		anchor: '95%',
		fieldLabel: 'Penanda Tangan',
		emptyText: 'JIKA DIKOSONGKAN, AKAN DIISI NAMA KEPALA CABANG',
		id: 'txtNamaCA',
		name: 'txtNamaCA',
		xtype: 'textfield'
	};

	var txtJabatanCA = {
		anchor: '95%',
		fieldLabel: 'Jabatan',
		emptyText: 'JIKA DIKOSONGKAN, AKAN DIISI JABATAN KEPALA CABANG',
		id: 'txtJabatanCA',
		name: 'txtJabatanCA',
		xtype: 'textfield'
	};

	var txtKdCab = {
		id: 'txtKdCab',
		name: 'txtKdCab',
		xtype: 'textfield',
		hidden: true
	};

	var txtNoApk = {
		id: 'txtNoApk',
		name: 'txtNoApk',
		xtype: 'textfield',
		hidden: true
	};

	var txtKdDok = {
		id: 'txtKdDok',
		name: 'txtKdDok',
		xtype: 'textfield',
		hidden: true
	};

	var txtKeputusan = {
		id: 'txtKeputusan',
		name: 'txtKeputusan',
		xtype: 'textfield',
		hidden: true
	};

	// FUNCTIONS
	function fnReset() {

	}

	function fnShowPrint() {

	}

	function fnCekPrint() {
		if (this.up('form').getForm().isValid()) {

		}
	}

	function fnPrint() {
		var kdcab = Ext.getCmp('txtKdCab').getValue();
		var noapk = Ext.getCmp('txtNoApk').getValue();
		var cek = Ext.getCmp('cekKop').getValue();
		var kop = 0;

		if (cek == true) {
			kop = 1;
		}

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'kontrak/print',
			params: {
				'fs_kode_cabang': kdcab,
				'fn_no_apk': noapk,
				'fs_kode_dokumen': Ext.getCmp('txtKdDok').getValue(),
				'fs_nama_ca': Ext.getCmp('txtNamaCA').getValue(),
				'fs_jabatan_ca': Ext.getCmp('txtJabatanCA').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				var url = xtext.url;
				var title = xtext.title;

				if (xtext.sukses === true) {
					var popUp = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						frame: false,
						width: 950,
	                    height: 500,
	                    layout:'anchor',
	                    title: title,
	                    buttons: [{
	                    	text: 'OK',
							handler: function() {
								vMask.hide();
								popUp.hide();
							}
	                    }]
					});

					popUp.add({html: '<iframe width="942" height="500" src="'+ url + kdcab + '/' + noapk + '/' + kop +'"></iframe>'});
					popUp.show();

					fnReset();
				}
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
				Ext.MessageBox.show({
					buttons: Ext.MessageBox.OK,
					closable: false,
					icon: Ext.MessageBox.INFO,
					msg: 'Printing Failed, Connection Failed!!',
					title: 'MFAS'
				});
				fnMaskHide();
			}
		});
	}

	var frmKontrak = Ext.create('Ext.form.Panel', {
		bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
		border: false,
		frame: true,
		region: 'center',
		title: 'Kontrak & Kelengkapan',
		width: 550,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 140,
				msgTarget: 'side'
			},
			style: 'padding: 5px;',
			xtype: 'fieldset',
			title: 'Kontrak dan Kelengkapan',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 8,
					layout: 'anchor',
					xtype: 'container',
					items: [
						txtKdCab,
						cboKonsumen,
						txtNoApk,
						cboDokumen,
						txtKdDok,
						txtNamaCA,
						txtJabatanCA,
						txtKeputusan
					]
				},{
					flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [
						cekKop
					]
				}]
			}]
		}],
		buttons: [{
			iconCls: 'icon-print',
			text: 'Print',
			scale: 'medium',
			handler: fnCekPrint
		},{
			iconCls: 'icon-reset',
			text: 'Reset',
			scale: 'medium',
			handler: fnReset
		}]
	});


	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKontrak
	});

	function fnMaskShow() {
		frmKontrak.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKontrak.unmask();
	}
	
	frmKontrak.render(Ext.getBody());
	Ext.get('loading').destroy();
});