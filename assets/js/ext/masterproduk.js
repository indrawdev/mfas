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

	Ext.define('DataGridProduk', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_cabang', type: 'string'},
			{name: 'fs_nilai_1', type: 'string'},
			{name: 'fs_nilai_2', type: 'string'},
			{name: 'fs_nama_produk', type: 'string'}
		]
	});

	var grupProduk = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridProduk',
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
			url: 'masterproduk/gridproduk'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_cabang': Ext.getCmp('txtKdCabang').getValue()
				});
			}
		}
	});

	var grupCabang = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_cabang', 'fs_nama_cabang'
		],
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
			url: 'masterproduk/gridcabang'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariCabang').getValue()
				});
			}
		}
	});

	var grupPola = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_nilai1_referensi', 
			'fs_nilai2_referensi', 'fs_nama_referensi'
		],
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
			url: 'masterproduk/gridpolatrans'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCariPola').getValue()
				});
			}
		}
	});

	// POPUP
	var winGrid1 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupCabang,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Cabang", dataIndex: 'fs_kode_cabang', menuDisabled: true, flex: 1},
			{text: "Nama Cabang", dataIndex: 'fs_nama_cabang', menuDisabled: true, flex: 2.5}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Cabang',
				id: 'txtCariCabang',
				name: 'txtCariCabang',
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
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboCabang').setValue(record.get('fs_nama_cabang'));
				Ext.getCmp('txtKdCabang').setValue(record.get('fs_kode_cabang'));
				winCari1.hide();

				// LOAD DATA
				grupProduk.load();
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
				grupCabang.load();
				vMask.show();
			}
		}
	});

	var winGrid2 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPola,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Nilai 1", dataIndex: 'fs_nilai1_referensi', menuDisabled: true, flex: 1},
			{text: "Nilai 2", dataIndex: 'fs_nilai2_referensi', menuDisabled: true, flex: 1},
			{text: "Nama", dataIndex: 'fs_nama_referensi', menuDisabled: true, flex: 2.5}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama',
				id: 'txtCariReferensi',
				name: 'txtCariReferensi',
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
					grupPola.load();
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
			store: grupPola,
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
				Ext.getCmp('cboPola').setValue(record.get('fs_nama_referensi'));
				Ext.getCmp('txtNilai1').setValue(record.get('fs_nilai1_referensi'));
				Ext.getCmp('txtNilai2').setValue(record.get('fs_nilai2_referensi'));
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
				grupPola.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM MASTER PRODUK
	var cboCabang = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Cabang',
		fieldLabel: 'Nama Cabang',
		editable: false,
		id: 'cboCabang',
		name: 'cboCabang',
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

	var txtKdCabang = {
		id: 'txtKdCabang',
		name: 'txtKdCabang',
		xtype: 'textfield',
		hidden: true
	};

	var cboPola = {
		anchor: '100%',
		emptyText: 'Pola',
		fieldLabel: 'Pola Transaksi',
		labelAlign: 'top',
		editable: false,
		id: 'cboPola',
		name: 'cboPola',
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

	var txtNilai1 = {
		anchor: '95%',
		emptyText: 'Nilai 1',
		fieldLabel: 'Nilai 1',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNilai1',
		name: 'txtNilai1',
		labelAlign: 'top',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNilai2 = {
		anchor: '95%',
		emptyText: 'Nilai 2',
		fieldLabel: 'Nilai 2',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNilai2',
		name: 'txtNilai2',
		labelAlign: 'top',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnSave = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave',
		name: 'btnSave',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSave
	};

	var btnReset = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset',
		name: 'btnReset',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnReset
	};

	// GRID PRODUK
	var gridProduk = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 400,
		sortableColumns: false,
		store: grupProduk,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Nilai 1',
			dataIndex: 'fs_nilai_1',
			menuDisabled: true,
			width: 80
		},{
			text: 'Nilai 2',
			dataIndex: 'fs_nilai_2',
			menuDisabled: true,
			width: 80
		},{
			text: 'Nama Produk',
			dataIndex: 'fs_nama_produk',
			menuDisabled: true,
			width: 270
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtNilai1
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtNilai2
			]
		},{
			flex: 2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				cboPola
			]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		},{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Add',
				handler: function() {
					var total = grupProduk.getCount();

					var data = Ext.create('DataGridProduk', {
						fs_kode_cabang: Ext.getCmp('txtKdCabang').getValue(),
						fs_nilai_1: Ext.getCmp('txtNilai1').getValue(),
						fs_nilai_2: Ext.getCmp('txtNilai2').getValue(),
						fs_nama_produk: Ext.getCmp('cboPola').getValue()
					});

					var kode_cabang = Ext.getCmp('txtKdCabang').getValue();
					if (kode_cabang === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Cabang belum diisi',
							title: 'MFAS'
						});
						return;
					}

					var nilai_1 = Ext.getCmp('txtNilai1').getValue();
					if (nilai_1 === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai 1 belum diisi',
							title: 'MFAS'
						});
						return;
					}

					var nilai_2 = Ext.getCmp('txtNilai2').getValue();
					if (nilai_2 === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai 2 belum diisi',
							title: 'MFAS'
						});
						return;
					}

					var pola_trans = Ext.getCmp('cboPola').getValue();
					if (pola_trans === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Pola Transaksi belum diisi',
							title: 'Pola Transaksi'
						});
						return;
					}

					grupProduk.insert(total, data);

					Ext.getCmp('txtNilai1').setValue('');
					Ext.getCmp('txtNilai2').setValue('');
					Ext.getCmp('cboPola').setValue('');

					total = grupProduk.getCount() - 1;
					gridProduk.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {

					var sm = gridProduk.getSelectionModel();
					grupProduk.remove(sm.getSelection());
					gridProduk.getView().refresh();

					if (grupProduk.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupProduk
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridProduk.down('#removeData').setDisabled(!records.length);
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// FUNCTIONS
	function fnReset() {

		Ext.getCmp('cboCabang').setValue('');
		Ext.getCmp('txtKdCabang').setValue('');
		Ext.getCmp('txtNilai1').setValue('');
		Ext.getCmp('txtNilai2').setValue('');
		Ext.getCmp('cboPola').setValue('');

		// DETAIL PRODUK
		grupProduk.removeAll();
		gridProduk.getView().refresh();

		// LOAD DATA
		grupProduk.load();
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterproduk/ceksave',
				params: {
					'fs_kode_cabang': Ext.getCmp('txtKdCabang').getValue()
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
						if (xtext.sukses === true) {
							Ext.MessageBox.show({
								buttons: Ext.MessageBox.YESNO,
								closable: false,
								icon: Ext.Msg.QUESTION,
								msg: xtext.hasil,
								title: 'MFAS',
								fn: function(btn) {
									if (btn == 'yes') {
										fnSave();
									}
								}
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
						msg: 'Saving Failed, Connection Failed!!',
						title: 'MFAS'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSave() {
		var xnilai1 = '';
		var xnilai2 = '';
		var xpola = '';

		var store = gridProduk.getStore();
		store.each(function(record, idx) {
			xnilai1 = xnilai1 +'|'+ record.get('fs_nilai_1');
			xnilai2 = xnilai2 +'|'+ record.get('fs_nilai_2');
			xpola = xpola +'|'+ record.get('fs_nama_produk');
		});

		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterproduk/save',
			params: {
				'fs_kode_cabang': Ext.getCmp('txtKdCabang').getValue(),
				'fs_nilai_1': xnilai1,
				'fs_nilai_2': xnilai2,
				'fs_nama_produk': xpola
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
				fnReset();
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

	var frmMasterProduk = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Produk',
		width: 930,
		items: [{
			bodyStyle: 'background-color: '.concat(gBasePanel),
			border: false,
			frame: false,
			xtype: 'form',
			items: [{
				fieldDefaults: {
					labelAlign: 'right',
					labelSeparator: '',
					labelWidth: 120,
					msgTarget: 'side'
				},
				xtype: 'fieldset',
				border: false,
				items: [{
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
							title: 'Form Produk',
							xtype: 'fieldset',
							items: [
								cboCabang,
								txtKdCabang
							]
						},{
							anchor: '100%',
							layout: 'hbox',
							xtype: 'container',
							items: [{
								flex: 2.2,
								layout: 'anchor',
								xtype: 'container',
								items: []
							},{
								flex: 2,
								layout: 'anchor',
								xtype: 'container',
								items: [
									btnSave
								]
							},{
								flex: 2,
								layout: 'anchor',
								xtype: 'container',
								items: [
									btnReset
								]
							}]
						}]
					},{
						flex: 1.5,
						layout: 'anchor',
						xtype: 'container',
						items: [{
							style: 'padding: 5px;',
							title: 'Data Produk',
							xtype: 'fieldset',
							items: [
								gridProduk
							]
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterProduk
	});

	function fnMaskShow() {
		frmMasterProduk.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterProduk.unmask();
	}
	
	frmMasterProduk.render(Ext.getBody());
	Ext.get('loading').destroy();
});