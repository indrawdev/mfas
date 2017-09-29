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

	Ext.define('Ext.form.field.Month', {
        extend: 'Ext.form.field.Date',
        alias: 'widget.monthfield',
        requires: ['Ext.picker.Month'],
        alternateClassName: ['Ext.form.MonthField', 'Ext.form.Month'],
        selectMonth: null,
        createPicker: function () {
		    var me = this,
		        format = Ext.String.format,
		        pickerConfig;

		    pickerConfig = {
		        pickerField: me,
		        ownerCmp: me,
		        renderTo: document.body,
		        floating: true,
		        hidden: true,
		        focusOnShow: true,
		        minDate: me.minValue,
		        maxDate: me.maxValue,
		        disabledDatesRE: me.disabledDatesRE,
		        disabledDatesText: me.disabledDatesText,
		        disabledDays: me.disabledDays,
		        disabledDaysText: me.disabledDaysText,
		        format: me.format,
		        showToday: me.showToday,
		        startDay: me.startDay,
		        minText: format(me.minText, me.formatDate(me.minValue)),
		        maxText: format(me.maxText, me.formatDate(me.maxValue)),
		        listeners: {
		            select: { scope: me, fn: me.onSelect },
		            monthdblclick: { scope: me, fn: me.onOKClick },
		            yeardblclick: { scope: me, fn: me.onOKClick },
		            OkClick: { scope: me, fn: me.onOKClick },
		            CancelClick: { scope: me, fn: me.onCancelClick }
		        },
		        keyNavConfig: {
		            esc: function () {
		                me.collapse();
		            }
		        }
		    };

		    if (Ext.isChrome) {
		        me.originalCollapse = me.collapse;
		        pickerConfig.listeners.boxready = {
		            fn: function () {
		                this.picker.el.on({
		                    mousedown: function () {
		                        this.collapse = Ext.emptyFn;
		                    },
		                    mouseup: function () {
		                        this.collapse = this.originalCollapse;
		                    },
		                    scope: this
		                });
		            },
		            scope: me,
		            single: true
		        }
		    }

		    return Ext.create('Ext.picker.Month', pickerConfig);
		},
        onCancelClick: function() {
            var me = this;
            me.selectMonth = null;
            me.collapse();
        },
        onOKClick: function() {
            var me = this;
            if (me.selectMonth) {
                me.setValue(me.selectMonth);
                me.fireEvent('select', me, me.selectMonth);
            }
            me.collapse();
        },
        onSelect: function(m, d) {
            var me = this;
            me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
        }
    });

    Ext.define('DataGridTambahGaji', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_komponen', type: 'string'},
			{name: 'fs_nama_komponen', type: 'string'},
			{name: 'fn_nilai_komponen', type: 'string'},
			{name: 'fs_tambah_salary', type: 'string'}
		]
	});

	var grupTambahGaji = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridTambahGaji',
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
			url: 'masterpayroll/gridkomponentambah'
		}
	});

	var gridKompTambahGaji = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupTambahGaji,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode',
			dataIndex: 'fs_kode_komponen',
			menuDisabled: true,
			flex: 0.7
		},{
			text: 'Nama Komponen',
			dataIndex: 'fs_nama_komponen',
			menuDisabled: true,
			flex: 2
		},{
			align: 'right',
			text: 'Nilai / Nominal',
			dataIndex: 'fn_nilai_komponen',
			menuDisabled: true,
			flex: 1.5,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_komponen');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterpayroll/removekomponen/',
			            				params : {
											'fs_kode_komponen': str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
											
											fnResetKomponen();
											grupTambahGaji.load();  
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
										}
									});
								}
							}
						});
					}
				}
			}]
		},{
			text: 'Tambah Salary',
			dataIndex: 'fs_tambah_salary',
			menuDisabled: true,
			hidden: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupTambahGaji
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodeKomponen').setValue(record.get('fs_kode_komponen'));
				Ext.getCmp('txtNamaKomponen').setValue(record.get('fs_nama_komponen'));
				Ext.getCmp('txtNilaiKomponen').setValue(record.get('fn_nilai_komponen'));
				Ext.getCmp('cboMenambahSalary').setValue(record.get('fs_tambah_salary'));
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

    Ext.define('DataGridKurangGaji', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_komponen', type: 'string'},
			{name: 'fs_nama_komponen', type: 'string'},
			{name: 'fn_nilai_komponen', type: 'string'},
			{name: 'fs_tambah_salary', type: 'string'}
		]
	});

	var grupKurangGaji = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridKurangGaji',
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
			url: 'masterpayroll/gridkomponenkurang'
		}
	});

	var gridKompKurangGaji = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupKurangGaji,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode',
			dataIndex: 'fs_kode_komponen',
			menuDisabled: true,
			flex: 0.7
		},{
			text: 'Nama Komponen',
			dataIndex: 'fs_nama_komponen',
			menuDisabled: true,
			flex: 2
		},{
			align: 'right',
			text: 'Nilai / Nominal',
			dataIndex: 'fn_nilai_komponen',
			menuDisabled: true,
			flex: 1.5,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_komponen');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterpayroll/removekomponen/',
			            				params : {
											'fs_kode_komponen': str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
											
											fnResetKomponen();
											grupKurangGaji.load();  
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
										}
									});
								}
							}
						});
					}
				}
			}]
		},{
			text: 'Tambah Salary',
			dataIndex: 'fs_tambah_salary',
			menuDisabled: true,
			hidden: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKurangGaji
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodeKomponen').setValue(record.get('fs_kode_komponen'));
				Ext.getCmp('txtNamaKomponen').setValue(record.get('fs_nama_komponen'));
				Ext.getCmp('txtNilaiKomponen').setValue(record.get('fn_nilai_komponen'));
				Ext.getCmp('cboMenambahSalary').setValue(record.get('fs_tambah_salary'));
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

    Ext.define('DataGridCaraBayar', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_bayar', type: 'string'},
			{name: 'fs_keterangan', type: 'string'},
			{name: 'fn_norek', type: 'string'}
		]
	});

	var grupCaraBayar = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridCaraBayar',
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
			url: 'masterpayroll/gridcarabayar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariCaraBayar').getValue()
				});
			}
		}
	});

	var gridCaraBayar = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupCaraBayar,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Bayar',
			dataIndex: 'fs_kode_bayar',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Keterangan',
			dataIndex: 'fs_keterangan',
			menuDisabled: true,
			flex: 2
		},{
			text: 'Nomor Rekening',
			dataIndex: 'fn_norek',
			menuDisabled: true,
			flex: 1.5
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_bayar');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterpayroll/removecarabayar/',
			            				params : {
											'fs_kode_bayar': str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
											
											fnResetCaraBayar();
											grupCaraBayar.load();  
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
										}
									});
								}
							}
						});
					}
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupCaraBayar
		}),
		tbar: [{
			flex: 2.8,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Keterangan',
				id: 'txtCariCaraBayar',
				name: 'txtCariCaraBayar',
				xtype: 'textfield'
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupCaraBayar.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodePembayaran').setValue(record.get('fs_kode_bayar'));
				Ext.getCmp('txtKeteranganBayar').setValue(record.get('fs_keterangan'));
				Ext.getCmp('txtNomorRekening').setValue(record.get('fn_norek'));
				Ext.getCmp('cboAktif2').setValue(record.get('fs_aktif'));
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

    Ext.define('DataGridPeriode', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_periode', type: 'string'},
			{name: 'fs_keterangan', type: 'string'},
			{name: 'fs_aktif', type: 'string'}
		]
	});

	var grupPeriode = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPeriode',
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
			url: 'masterpayroll/gridperiode'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariPeriode').getValue()
				});
			}
		}
	});

	var gridPeriode = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 450,
		sortableColumns: false,
		store: grupPeriode,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Periode',
			dataIndex: 'fs_kode_periode',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Keterangan',
			dataIndex: 'fs_keterangan',
			menuDisabled: true,
			flex: 2
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_periode');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterpayroll/removeperiode/',
			            				params : {
											'fs_kode_periode': str
										},
										success: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
											
											fnResetPeriode();
											grupPeriode.load();
										},
										failure: function(response) {
											var xtext = Ext.decode(response.responseText);
											Ext.MessageBox.show({
												buttons: Ext.MessageBox.OK,
												closable: false,
												icon: Ext.MessageBox.INFO,
												message: xtext.hasil,
												title: 'HRD'
											});
										}
									});
								}
							}
						});
					}
				}
			}]
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPeriode
		}),
		tbar: [{
			flex: 2.8,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Keterangan',
				id: 'txtCariPeriode',
				name: 'txtCariPeriode',
				xtype: 'textfield'
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					grupPeriode.load();
				}
			}]
		},{
			flex: 0.1,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtKodePeriode').setValue(record.get('fs_kode_periode'));
				Ext.getCmp('txtKeteranganPeriode').setValue(record.get('fs_keterangan'));
				Ext.getCmp('cboAktif3').setValue(record.get('fs_aktif'));
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

	var grupSelect = Ext.create('Ext.data.Store', {
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
			url: 'masterpayroll/select'
		}
	});

	// COMPONENT FORM KOMPONEN
	var txtKodeKomponen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Komponen',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeKomponen',
		name: 'txtKodeKomponen',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 5,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaKomponen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Komponen',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaKomponen',
		name: 'txtNamaKomponen',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 100,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNilaiKomponen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nilai Komponen',
		id: 'txtNilaiKomponen',
		name: 'txtNilaiKomponen',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 9,
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboMenambahSalary = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Menambah Salary',
		id: 'cboMenambahSalary',
		name: 'cboMenambahSalary',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox',
	};

	// COMPONENT FORM BANK
	var txtKodePembayaran = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Pembayaran',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodePembayaran',
		name: 'txtKodePembayaran',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 30,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtKeteranganBayar = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Keterangan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKeteranganBayar',
		name: 'txtKeteranganBayar',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 200,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNomorRekening = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nomor Rekening',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNomorRekening',
		name: 'txtNomorRekening',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 25,
		maskRe: /[0123456789]/,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboAktif2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Aktif',
		id: 'cboAktif2',
		name: 'cboAktif2',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox',
	};

	var btnSave2 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave2',
		name: 'btnSave2',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSaveCaraBayar
	};

	var btnReset2 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset2',
		name: 'btnReset2',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetCaraBayar
	};
	

	// COMPONENT FORM PERIODE
	var txtKodePeriode = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Kode Periode',
		id: 'txtKodePeriode',
		name: 'txtKodePeriode',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 30,
		enforceMaxLength: true
	};

	var txtKeteranganPeriode = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Keterangan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKeteranganPeriode',
		name: 'txtKeteranganPeriode',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 200,
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var cboAktif3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Aktif',
		id: 'cboAktif3',
		name: 'cboAktif3',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox',
	};

	var btnSave3 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnSave3',
		name: 'btnSave3',
		text: 'Save',
		iconCls: 'icon-save',
		handler: fnCekSavePeriode
	};

	var btnReset3 = {
		anchor: '90%',
		scale: 'medium',
		xtype: 'button',
		id: 'btnReset3',
		name: 'btnReset3',
		text: 'Reset',
		iconCls: 'icon-reset',
		handler: fnResetPeriode
	};


	// FUNCTION FORM SETUP KOMPONEN
	function fnResetKomponen() {
		Ext.getCmp('txtKodeKomponen').setValue('');
		Ext.getCmp('txtNamaKomponen').setValue('');
		Ext.getCmp('cboMenambahSalary').setValue('');
	}

	function fnCekSaveKomponen() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);
			
			Ext.Ajax.request({
				method: 'POST',
				url: 'masterpayroll/ceksavekomponen',
				params: {
					'fs_kode_komponen': Ext.getCmp('txtKodeKomponen').getValue()
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
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'HRD',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveKomponen();
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
						title: 'HRD'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveKomponen() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterpayroll/savekomponen',
			params: {
				'fs_kode_komponen': Ext.getCmp('txtKodeKomponen').getValue(),
				'fs_nama_komponen': Ext.getCmp('txtNamaKomponen').getValue(),
				'fn_nilai_komponen': Ext.getCmp('txtNilaiKomponen').getValue(),
				'fs_tambah_salary': Ext.getCmp('cboMenambahSalary').getValue()
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
				fnResetKomponen();
				// REFRESH AFTER SAVE
				grupTambahGaji.load();
				grupKurangGaji.load();
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

	// FUNCTION FORM SETUP CARA BAYAR
	function fnResetCaraBayar() {
		Ext.getCmp('txtKodePembayaran').setValue('');
		Ext.getCmp('txtKeteranganBayar').setValue('');
		Ext.getCmp('txtNomorRekening').setValue('');
		Ext.getCmp('cboAktif2').setValue('');
	}

	function fnCekSaveCaraBayar() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterpayroll/ceksavecarabayar',
				params: {
					'fs_kode_bayar': Ext.getCmp('txtKodePembayaran').getValue()
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
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'HRD',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSaveCaraBayar();
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
						title: 'HRD'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSaveCaraBayar() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterpayroll/savecarabayar',
			params: {
				'fs_kode_bayar': Ext.getCmp('txtKodePembayaran').getValue(),
				'fs_keterangan': Ext.getCmp('txtKeteranganBayar').getValue(),
				'fn_norek': Ext.getCmp('txtNomorRekening').getValue(),
				'fs_aktif': Ext.getCmp('cboAktif2').getValue()
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
				fnResetCaraBayar();
				// REFRESH AFTER SAVE
				grupCaraBayar.load();
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

	// FUNCTION FORM SETUP PERIODE
	function fnResetPeriode() {
		Ext.getCmp('txtKodePeriode').setValue('');
		Ext.getCmp('txtKeteranganPeriode').setValue('');
		Ext.getCmp('cboAktif3').setValue('');
	}

	function fnCekSavePeriode() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterpayroll/ceksaveperiode',
				params: {
					'fs_kode_periode': Ext.getCmp('txtKodePeriode').getValue()
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
							icon: Ext.MessageBox.QUESTION,
							msg: xtext.hasil,
							title: 'HRD',
							fn: function(btn) {
								if (btn == 'yes') {
									fnSavePeriode();
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
						title: 'HRD'
					});
					fnMaskHide();
				}
			});
		}
	}

	function fnSavePeriode() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterpayroll/saveperiode',
			params: {
				'fs_kode_periode': Ext.getCmp('txtKodePeriode').getValue(),
				'fs_keterangan': Ext.getCmp('txtKeteranganPeriode').getValue(),
				'fs_aktif': Ext.getCmp('cboAktif3').getValue()
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
				fnResetPeriode();
				// REFRESH AFTER SAVE
				grupPeriode.load();
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

	var frmMasterPayroll = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Master Payroll',
		width: 930,
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
				xtype: 'form',
				title: 'Setup Komponen',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
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
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items: [
									txtKodeKomponen,
									txtNamaKomponen
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Komponen menambah gaji',
								xtype: 'fieldset',
								items: [
									gridKompTambahGaji
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								xtype: 'fieldset',
								items:[{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [
											txtNilaiKomponen,
											cboMenambahSalary
										]
									}]
								}] 
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Komponen mengurangi gaji',
								xtype: 'fieldset',
								items: [
									gridKompKurangGaji
								]
							}]
						}]
					}]
				}],	
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSave1',
					name: 'btnSave1',
					scale: 'medium',
					text: 'Save',
					handler: fnCekSaveKomponen
				},{
					iconCls: 'icon-reset',
					scale: 'medium',
					text: 'Reset',
					handler: fnResetKomponen
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				xtype: 'form',
				title: 'Setup Cara Bayar',
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
								title: 'Form Cara Pembayaran',
								xtype: 'fieldset',
								items: [
									txtKodePembayaran,
									txtKeteranganBayar,
									txtNomorRekening,
									cboAktif2
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
										btnSave2
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset2
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Cara Pembayaran',
								xtype: 'fieldset',
								items: [
									gridCaraBayar
								]
							}]
						}]
					}]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				xtype: 'form',
				title: 'Setup Periode',
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
								title: 'Form Periode',
								xtype: 'fieldset',
								items: [
									txtKodePeriode,
									txtKeteranganPeriode,
									cboAktif3
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
										btnSave3
									]
								},{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [
										btnReset3
									]
								}]
							}]
						},{
							flex: 1.5,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								style: 'padding: 5px;',
								title: 'Data Periode',
								xtype: 'fieldset',
								items: [
									gridPeriode
								]
							}]
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmMasterPayroll
	});

	function fnMaskShow() {
		frmMasterPayroll.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterPayroll.unmask();
	}
	
	frmMasterPayroll.render(Ext.getBody());
	Ext.get('loading').destroy();
	
});