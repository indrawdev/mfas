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

	var grupAksesLokasi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_lokasi','fs_nama_lokasi'
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
			url: 'surat/gridakseslokasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLokasi').getValue()
				});
			}
		}
	});

	var grupKaryawan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fn_nik','fs_nama_karyawan'
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
			url: 'surat/gridkaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue(),
					'fs_cari': Ext.getCmp('txtCariKaryawan').getValue()
				});
			}
		}
	});

	var grupPerusahaan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_perusahaan','fs_nama_perusahaan'
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
			url: 'surat/gridperusahaan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariPerusahaan').getValue(),
				});
			}
		}
	});

	var grupSurat = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_nama_surat'
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
			url: 'surat/gridsurat'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariSurat').getValue(),
				});
			}
		}
	});

	// POPUP AKSES LOKASI
	var winGrid1 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 500,
		sortableColumns: false,
		store: grupAksesLokasi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			flex: 0.7
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			flex: 2
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Lokasi',
				id: 'txtCariLokasi',
				name: 'txtCariLokasi',
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
					grupAksesLokasi.load();
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
			store: grupAksesLokasi,
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
				Ext.getCmp('cboLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));

				// CLEAR FIELD
				Ext.getCmp('cboNIK').setValue('');
				Ext.getCmp('txtNama').setValue('');
				
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
				grupAksesLokasi.load();
				vMask.show();
			}
		}
	});

	// POPUP KARYAWAN
	var winGrid2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 500,
		sortableColumns: false,
		store: grupKaryawan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			flex: 0.7
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			flex: 2
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
				id: 'txtCariKaryawan',
				name: 'txtCariKaryawan',
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
					grupKaryawan.load();
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
			store: grupKaryawan,
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
				Ext.getCmp('cboNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				// CLEAR
				Ext.getCmp('cboSurat').setValue('');
				Ext.getCmp('txtKdSurat').setValue('');
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
				grupKaryawan.load();
				vMask.show();
			}
		}
	});

	// POPUP PERUSAHAAN
	var winGrid3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 500,
		sortableColumns: false,
		store: grupPerusahaan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Perusahaan',
			dataIndex: 'fs_kode_perusahaan',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nama Surat',
			dataIndex: 'fs_nama_perusahaan',
			menuDisabled: true,
			flex: 2
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Perusahaan',
				id: 'txtCariPerusahaan',
				name: 'txtCariPerusahaan',
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
					grupPerusahaan.load();
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
			store: grupPerusahaan,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari3.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKdPerusahaan').setValue(record.get('fs_kode_perusahaan'));
				Ext.getCmp('cboPerusahaan').setValue(record.get('fs_nama_perusahaan'));

				winCari3.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari3 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid3
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPerusahaan.load();
				vMask.show();
			}
		}
	});

	// POPUP SURAT & KONTRAK
	var winGrid4 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 500,
		sortableColumns: false,
		store: grupSurat,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Surat',
			dataIndex: 'fs_kode_dokumen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Surat',
			dataIndex: 'fs_nama_dokumen',
			menuDisabled: true,
			flex: 2
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Surat',
				id: 'txtCariSurat',
				name: 'txtCariSurat',
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
					grupSurat.load();
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
			store: grupSurat,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari4.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKdSurat').setValue(record.get('fs_kode_dokumen'));
				Ext.getCmp('cboSurat').setValue(record.get('fs_nama_dokumen'));

				winCari4.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari4 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid4
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupSurat.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM MASTER LOKASI
	var cboLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: 'Lokasi',
		fieldLabel: 'Lokasi',
		editable: false,
		id: 'cboLokasi',
		name: 'cboLokasi',
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

	var txtKdLokasi = {
		id: 'txtKdLokasi',
		name: 'txtKdLokasi',
		xtype: 'textfield',
		hidden: true
	};

	var cboNIK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: 'NIK',
		fieldLabel: 'NIK',
		editable: false,
		id: 'cboNIK',
		name: 'cboNIK',
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

	var txtNama = {
		anchor: '95%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var checkKop = {
		boxLabel: 'Kop',
		checked: false,
		id: 'checkKop',
		name: 'checkKop',
		xtype: 'checkboxfield'
	};

	var txtKdPerusahaan = {
		id: 'txtKdPerusahaan',
		name: 'txtKdPerusahaan',
		xtype: 'textfield',
		hidden: true
	};

	var cboPerusahaan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: 'Perusahaan',
		fieldLabel: 'Perusahaan',
		editable: false,
		id: 'cboPerusahaan',
		name: 'cboPerusahaan',
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
					winCari3.show();
					winCari3.center();
				}
			}
		}
	};

	var txtKdSurat = {
		id: 'txtKdSurat',
		name: 'txtKdSurat',
		xtype: 'textfield',
		hidden: true
	};

	var cboSurat = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '95%',
		emptyText: 'Surat / Kontrak',
		fieldLabel: 'Surat',
		editable: false,
		id: 'cboSurat',
		name: 'cboSurat',
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
					winCari4.show();
					winCari4.center();
				}
			}
		}
	};

	var txtTandaTangan = {
		anchor: '95%',
		fieldLabel: 'Penanda Tangan',
		emptyText: 'JIKA DIKOSONGKAN, AKAN DIISI NAMA KEPALA HRD PUSAT',
		id: 'txtTandaTangan',
		name: 'txtTandaTangan',
		xtype: 'textfield'
	};

	var txtJabatan = {
		anchor: '95%',
		fieldLabel: 'Jabatan',
		emptyText: 'JIKA DIKOSONGKAN, AKAN DIISI JABATAN KEPALA HRD PUSAT',
		id: 'txtJabatan',
		name: 'txtJabatan',
		xtype: 'textfield'
	};

	// FUNCTIONS
	function fnReset() {
		Ext.getCmp('cboLokasi').setValue('');
		Ext.getCmp('cboNIK').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('cboPerusahaan').setValue('');
		Ext.getCmp('txtKdPerusahaan').setValue('');
		Ext.getCmp('cboSurat').setValue(false);
		Ext.getCmp('txtKdSurat').setValue('');
		Ext.getCmp('txtTandaTangan').setValue('');
		Ext.getCmp('txtJabatan').setValue('');
	}

	function fnCekPrint() {
		if (this.up('form').getForm().isValid()) {
			Ext.MessageBox.show({
				buttons: Ext.MessageBox.YESNO,
				closable: false,
				icon: Ext.Msg.QUESTION,
				msg: 'Apakah anda yakin akan mencetak?',
				title: 'HRD',
				fn: function(btn) {
					if (btn == 'yes') {
						Ext.Ajax.on('beforerequest', fnMaskShow);
						Ext.Ajax.on('requestcomplete', fnMaskHide);
						Ext.Ajax.on('requestexception', fnMaskHide);

						Ext.Ajax.request({
							method: 'POST',
							url: 'surat/cekprint',
							params: {
								'fn_nik': Ext.getCmp('cboNIK').getValue(),
								'fs_kode_dokumen': Ext.getCmp('txtKdSurat').getValue()
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
									if (xtext.sukses === true && xtext.hasil == 'lanjut') {
										fnPrint();
									} else {
										Ext.MessageBox.show({
											buttons: Ext.MessageBox.OK,
											closable: false,
											icon: Ext.MessageBox.INFO,
											msg: 'Batas cetak surat sudah habis...',
											title: 'HRD'
										});
									}
								}
							},
							failure: function(response) {
								var xtext = Ext.decode(response.responseText);
								Ext.MessageBox.show({
									buttons: Ext.MessageBox.OK,
									closable: false,
									icon: Ext.MessageBox.INFO,
									msg: 'Printing Failed, Connection Failed!!',
									title: 'HRD'
								});
							}
						});
					}
				}
			});
		}
	}

	function fnPrint() {
		var xnik = Ext.getCmp('cboNIK').getValue();
		var xcheck = Ext.getCmp('checkKop').getValue();
		var xkop = 0;

		if (xcheck == true) {
			xkop = 1;
		}

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'surat/print',
			params: {
				'fn_nik': Ext.getCmp('cboNIK').getValue(),
				'fs_kode_dokumen': Ext.getCmp('txtKdSurat').getValue(),
				'fs_kode_perusahaan': Ext.getCmp('txtKdPerusahaan').getValue(),
				'fs_tanda_tangan': Ext.getCmp('txtTandaTangan').getValue(),
				'fs_jabatan': Ext.getCmp('txtJabatan').getValue()
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
	                    height: 650,
	                    width: 950,
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

                	popUp.add({html: '<iframe height="650", width="942" src="'+ url + xnik + '/' + xkop +'"></iframe>'});
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
					title: 'HRD'
				});
				fnMaskHide();
			}
		});
	}

	var frmSurat = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Surat & Kontrak',
		width: 550,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 140,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Surat & Kontrak',
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 8,
					layout: 'anchor',
					xtype: 'container',
					items: [
						cboLokasi,
						txtKdLokasi,
						cboNIK,
						txtNama,
						cboPerusahaan,
						txtKdPerusahaan,
						cboSurat,
						txtKdSurat,
						txtTandaTangan,
						txtJabatan
					]
				},{
					flex: 1,
					layout: 'anchor',
					xtype: 'container',
					items: [
						checkKop
					]
				}]
			}]
		}],
		buttons: [{
			text: 'Print',
			scale: 'medium',
			iconCls: 'icon-print',
			handler: fnCekPrint
		},{
			text: 'Reset',
			scale: 'medium',
			iconCls: 'icon-reset',
			handler: fnReset
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmSurat
	});

	function fnMaskShow() {
		frmSurat.mask('Please wait...');
	}

	function fnMaskHide() {
		frmSurat.unmask();
	}
	
	frmSurat.render(Ext.getBody());
	Ext.get('loading').destroy();
});