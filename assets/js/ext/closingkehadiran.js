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
			url: 'closingkehadiran/gridakseslokasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLokasi').getValue()
				});
			}
		}
	});

	// POPUP AKSES LOKASI
	var winGrid = Ext.create('Ext.grid.Panel', {
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
					winCari.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
				
				winCari.hide();

				// RELOAD EMPLOYE
				grupEmploye.load();
				
				// GET TOTAL CLOSING
				fnTotalClosing();
				
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
				grupAksesLokasi.load();
				vMask.show();
			}
		}
	});

	// COMPONENT FORM CLOSING KEHADIRAN	
	var txtKdLokasi = {
		id: 'txtKdLokasi',
		name: 'txtKdLokasi',
		xtype: 'textfield',
		hidden: true
	};

	var cboLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		editable: false,
		emptyText: 'Lokasi',
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
					winCari.show();
					winCari.center();
				}
			}
		}
	};

	var btnClosingHarian = {
		anchor: '100%',
		id: 'btnClosingHarian',
		name: 'btnClosingHarian',
		scale: 'medium',
		text: 'Update Closing Harian',
		xtype: 'button',
		iconCls: 'icon-closing',
		handler: fnClosingHarian
	};

    var txtTotalSDM = {
		anchor: '100%',
		fieldLabel: 'TOTAL DATA BELUM CLOSING',
		fieldStyle: 'background-color: #eee; background-image: none;',
		labelWidth: 180,
		readOnly: true,
		id: 'txtTotalSDM',
		name: 'txtTotalSDM',
		xtype: 'textfield'
    };

    Ext.define('DataGridEmploye', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_lokasi', type: 'string'},
			{name: 'fs_bulan_tahun', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fs_status_closing', type: 'string'}
		]
	});

	var grupEmploye = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridEmploye',
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
			url: 'closingkehadiran/gridemploye'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue(),
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var grupTotal = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: ['fn_total_closing'],
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
			url: 'closingkehadiran/hitungclosing'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue()
				});
			}
		}
	});

	var gridClosingKehadiran = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupEmploye,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Periode Bulan',
			dataIndex: 'fs_bulan_tahun',
			menuDisabled: true,
			locked: true,
			width: 100
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			locked: true,
			width: 90
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			locked: true,
			width: 230
		},{
			text: 'Sakit',
			align: 'center',
			xtype: 'actioncolumn',
			width: 45,
			locked: true,
			items: [{
				iconCls: 'icon-view',
				tooltip: 'Detail',
				handler: function(grid, rowIndex, colIndex, e) {
					var rec = grid.getStore().getAt(rowIndex);

					var xlokasi = rec.get('fs_kode_lokasi');
					var xnik = rec.get('fn_nik');
					var xnama = rec.get('fs_nama_karyawan');
					var xtanggal = rec.get('fd_tanggal');
					var xperiode = rec.get('fs_bulan_tahun').toUpperCase();

					Ext.define('DataGridSakit', {
						extend: 'Ext.data.Model',
						fields: [
							{name: 'fn_nik', type: 'string'},
							{name: 'fs_nama', type: 'string'},
							{name: 'fd_tanggal', type: 'string'},
							{name: 'fs_hari', type: 'string'},
							{name: 'fs_keterangan', type: 'string'}
						]
					});

					var grupGridSakit = Ext.create('Ext.data.Store', {
						autoLoad: false,
						model: 'DataGridSakit',
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
							url: 'closingkehadiran/gridreport'
						},
						listeners: {
							beforeload: function(store) {
								Ext.apply(store.getProxy().extraParams, {
									'fs_kode_lokasi': xlokasi,
									'fn_nik': xnik,
									'fs_nama': xnama,
									'fd_mmyy': xtanggal
								});
							}
						}
					});

					var winGridSakit = Ext.create('Ext.grid.Panel', {
						defaultType: 'textfield',
						height: 300,
						sortableColumns: false,
						store: grupGridSakit,
						columns: [{
							xtype: 'rownumberer',
							width: 30
						},{
							text: 'NIK',
							dataIndex: 'fn_nik',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Nama Karyawan',
							dataIndex: 'fs_nama',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Tanggal',
							dataIndex: 'fd_tanggal',
							menuDisabled: true,
							locked: true,
							width: 80
						},{
							text: 'Hari',
							dataIndex: 'fs_hari',
							menuDisabled: true,
							locked: true,
							width: 60
						},{
							align: 'center',
							text: 'Sakit',
							dataIndex: 'fb_sakit',
							id: 'checkSakit',
							name: 'checkSakit',
							menuDisabled: true,
							xtype: 'checkcolumn',
							width: 50
						},{
							text: 'Keterangan',
							dataIndex: 'fs_keterangan',
							editor: {
								xtype: 'textfield'
							},
							width: 230
						}],
						plugins: [
        					Ext.create('Ext.grid.plugin.CellEditing', {
            					clicksToEdit: 1
        					})
    					],
						viewConfig: {
							getRowClass: function() {
								return 'rowwrap';
							},
							markDirty: false,
							stripeRows: true
						}
					});

					var winCariSakit = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						draggable: true,
						frame: false,
						layout: 'fit',
						resizable: false,
						title: xnama,
						width: 550,
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 50,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [
								winGridSakit
							]
						}],
						listeners: {
							beforehide: function() {
								vMask.hide();
							},
							beforeshow: function() {
								grupGridSakit.load();
								vMask.show();
							}
						},
						buttons: [{
							text: 'Submit Closing',
							handler: function() {
								// CALLBACK FUNCTION
								var xnik = '';
								var xnama = '';
								var xtanggal = '';
								var xketerangan = '';
								var xcheck = '';
								var xsakit = '';

								var store = winGridSakit.getStore();
								store.each(function(record, idx) {
									xcheck = record.get('fb_sakit');
									if (xcheck === true) {
										xnik = xnik +'|'+ record.get('fn_nik');
										xnama = xnama +'|'+ record.get('fs_nama');
										xtanggal = xtanggal +'|'+ record.get('fd_tanggal');
										xketerangan = xketerangan +'|'+ record.get('fs_keterangan');
										xsakit = xsakit +'|'+ '1';
									}
								});

								Ext.Ajax.request({
									method: 'POST',
									url: 'closingkehadiran/ceksubmit',
									params: {
										'fn_nik': xnik,
										'fs_nama': xnama,
										'fd_tanggal': xtanggal
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

														Ext.Ajax.on('beforerequest', fnMaskShow);
														Ext.Ajax.on('requestcomplete', fnMaskHide);
														Ext.Ajax.on('requestexception', fnMaskHide);

														Ext.Ajax.request({
															method: 'POST',
															url: 'closingkehadiran/submitsakit',
															params: {
																'fn_nik': xnik,
																'fs_nama': xnama,
																'fd_tanggal': xtanggal,
																'fs_flag_sakit': xsakit,
																'fs_keterangan': xketerangan
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
																// RELOAD DATA
																grupEmploye.load();
																
																// GET TOTAL CLOSING
																fnTotalClosing();

																vMask.hide();
																winCariSakit.hide();
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

								/*
								vMask.hide();
								winCariSakit.hide();
								*/
							}
						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winCariSakit.hide();
							}
						}]
					});

					winCariSakit.show();
					winCariSakit.center();
				},
				scope: this
			}]
		},{
			text: 'Ijin',
			align: 'center',
			xtype: 'actioncolumn',
			width: 45,
			locked: true,
			items: [{
				iconCls: 'icon-view',
				tooltip: 'Detail',
				handler: function(grid, rowIndex, colIndex, e) {
					var rec = grid.getStore().getAt(rowIndex);

					var xlokasi = rec.get('fs_kode_lokasi');
					var xnik = rec.get('fn_nik');
					var xnama = rec.get('fs_nama_karyawan');
					var xtanggal = rec.get('fd_tanggal');
					var xperiode = rec.get('fs_bulan_tahun').toUpperCase();

					Ext.define('DataGridIjin', {
						extend: 'Ext.data.Model',
						fields: [
							{name: 'fn_nik', type: 'string'},
							{name: 'fs_nama', type: 'string'},
							{name: 'fd_tanggal', type: 'string'},
							{name: 'fs_hari', type: 'string'},
							{name: 'fs_keterangan', type: 'string'}
						]
					});

					var grupGridIjin = Ext.create('Ext.data.Store', {
						autoLoad: false,
						model: 'DataGridIjin',
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
							url: 'closingkehadiran/gridreport'
						},
						listeners: {
							beforeload: function(store) {
								Ext.apply(store.getProxy().extraParams, {
									'fs_kode_lokasi': xlokasi,
									'fn_nik': xnik,
									'fs_nama': xnama,
									'fd_mmyy': xtanggal
								});
							}
						}
					});

					var winGridIjin = Ext.create('Ext.grid.Panel', {
						defaultType: 'textfield',
						height: 300,
						sortableColumns: false,
						store: grupGridIjin,
						columns: [{
							xtype: 'rownumberer',
							width: 30
						},{
							text: 'NIK',
							dataIndex: 'fn_nik',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Nama Karyawan',
							dataIndex: 'fs_nama',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Tanggal',
							dataIndex: 'fd_tanggal',
							menuDisabled: true,
							locked: true,
							width: 80
						},{
							text: 'Hari',
							dataIndex: 'fs_hari',
							menuDisabled: true,
							locked: true,
							width: 60
						},{
							align: 'center',
							text: 'Ijin',
							dataIndex: 'fb_ijin',
							id: 'checkIjin',
							name: 'checkIjin',
							menuDisabled: true,
							xtype: 'checkcolumn',
							width: 50
						},{
							text: 'Keterangan',
							dataIndex: 'fs_keterangan',
							editor: {
								xtype: 'textfield'
							},
							width: 230
						}],
						plugins: [
        					Ext.create('Ext.grid.plugin.CellEditing', {
            					clicksToEdit: 1
        					})
    					],
						viewConfig: {
							getRowClass: function() {
								return 'rowwrap';
							},
							markDirty: false,
							stripeRows: true
						}
					});

					var winCariIjin = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						draggable: true,
						frame: false,
						layout: 'fit',
						resizable: false,
						title: xnama,
						width: 550,
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 50,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [
								winGridIjin
							]
						}],
						listeners: {
							beforehide: function() {
								vMask.hide();
							},
							beforeshow: function() {
								grupGridIjin.load();
								vMask.show();
							}
						},
						buttons: [{
							text: 'Submit Closing',
							handler: function() {
								// CALLBACK FUNCTION
								var xnik = '';
								var xnama = '';
								var xtanggal = '';
								var xketerangan = '';
								var xcheck = '';
								var xijin = '';

								var store = winGridIjin.getStore();
								store.each(function(record, idx) {
									xcheck = record.get('fb_ijin');
									if (xcheck === true) {
										xnik = xnik +'|'+ record.get('fn_nik');
										xnama = xnama +'|'+ record.get('fs_nama');
										xtanggal = xtanggal +'|'+ record.get('fd_tanggal');
										xketerangan = xketerangan +'|'+ record.get('fs_keterangan');
										xijin = xijin +'|'+ '1';
									}
								});

								Ext.Ajax.request({
									method: 'POST',
									url: 'closingkehadiran/ceksubmit',
									params: {
										'fn_nik': xnik,
										'fs_nama': xnama,
										'fd_tanggal': xtanggal
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

														Ext.Ajax.on('beforerequest', fnMaskShow);
														Ext.Ajax.on('requestcomplete', fnMaskHide);
														Ext.Ajax.on('requestexception', fnMaskHide);

														Ext.Ajax.request({
															method: 'POST',
															url: 'closingkehadiran/submitijin',
															params: {
																'fn_nik': xnik,
																'fs_nama': xnama,
																'fd_tanggal': xtanggal,
																'fs_flag_ijin': xijin,
																'fs_keterangan': xketerangan
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

																// RELOAD DATA
																grupEmploye.load();

																// GET TOTAL CLOSING
																fnTotalClosing();
																
																vMask.hide();
																winCariIjin.hide();
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

								/*
								vMask.hide();
								winCariIjin.hide();
								*/
							}
						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winCariIjin.hide();
							}
						}]
					});

					winCariIjin.show();
					winCariIjin.center();
				},
				scope: this
			}]
		},{
			text: 'Lupa',
			align: 'center',
			xtype: 'actioncolumn',
			width: 45,
			locked: true,
			items: [{
				iconCls: 'icon-view',
				tooltip: 'Detail',
				handler: function(grid, rowIndex, colIndex, e) {
					var rec = grid.getStore().getAt(rowIndex);

					var xlokasi = rec.get('fs_kode_lokasi');
					var xnik = rec.get('fn_nik');
					var xnama = rec.get('fs_nama_karyawan');
					var xtanggal = rec.get('fd_tanggal');
					var xperiode = rec.get('fs_bulan_tahun').toUpperCase();

					Ext.define('DataGridLupa', {
						extend: 'Ext.data.Model',
						fields: [
							{name: 'fn_nik', type: 'string'},
							{name: 'fs_nama', type: 'string'},
							{name: 'fd_tanggal', type: 'string'},
							{name: 'fs_hari', type: 'string'},
							{name: 'fs_keterangan', type: 'string'}
						]
					});

					var grupGridLupa = Ext.create('Ext.data.Store', {
						autoLoad: false,
						model: 'DataGridLupa',
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
							url: 'closingkehadiran/gridreport'
						},
						listeners: {
							beforeload: function(store) {
								Ext.apply(store.getProxy().extraParams, {
									'fs_kode_lokasi': xlokasi,
									'fn_nik': xnik,
									'fs_nama': xnama,
									'fd_mmyy': xtanggal
								});
							}
						}
					});

					var winGridLupa = Ext.create('Ext.grid.Panel', {
						defaultType: 'textfield',
						height: 300,
						sortableColumns: false,
						store: grupGridLupa,
						columns: [{
							xtype: 'rownumberer',
							width: 30
						},{
							text: 'NIK',
							dataIndex: 'fn_nik',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Nama Karyawan',
							dataIndex: 'fs_nama',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Tanggal',
							dataIndex: 'fd_tanggal',
							menuDisabled: true,
							locked: true,
							width: 80
						},{
							text: 'Hari',
							dataIndex: 'fs_hari',
							menuDisabled: true,
							locked: true,
							width: 60
						},{
							align: 'center',
							text: 'Lupa Absen',
							dataIndex: 'fb_lupa',
							id: 'checkLupa',
							name: 'checkLupa',
							menuDisabled: true,
							xtype: 'checkcolumn',
							width: 75
						},{
							text: 'Keterangan',
							dataIndex: 'fs_keterangan',
							editor: {
								xtype: 'textfield'
							},
							width: 230
						}],
						plugins: [
        					Ext.create('Ext.grid.plugin.CellEditing', {
            					clicksToEdit: 1
        					})
    					],
						viewConfig: {
							getRowClass: function() {
								return 'rowwrap';
							},
							markDirty: false,
							stripeRows: true
						}
					});

					var winCariLupa = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						draggable: true,
						frame: false,
						layout: 'fit',
						resizable: false,
						title: xnama,
						width: 550,
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 50,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [
								winGridLupa
							]
						}],
						listeners: {
							beforehide: function() {
								vMask.hide();
							},
							beforeshow: function() {
								grupGridLupa.load();
								vMask.show();
							}
						},
						buttons: [{
							text: 'Submit Closing',
							handler: function() {
								// CALLBACK FUNCTION
								var xnik = '';
								var xnama = '';
								var xtanggal = '';
								var xketerangan = '';
								var xcheck = '';
								var xlupa = '';

								var store = winGridLupa.getStore();
								store.each(function(record, idx) {
									xcheck = record.get('fb_lupa');
									if (xcheck === true) {
										xnik = xnik +'|'+ record.get('fn_nik');
										xnama = xnama +'|'+ record.get('fs_nama');
										xtanggal = xtanggal +'|'+ record.get('fd_tanggal');
										xketerangan = xketerangan +'|'+ record.get('fs_keterangan');
										xlupa = xlupa +'|'+ '1';
									}
								});

								Ext.Ajax.request({
									method: 'POST',
									url: 'closingkehadiran/ceksubmit',
									params: {
										'fn_nik': xnik,
										'fs_nama': xnama,
										'fd_tanggal': xtanggal
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

														Ext.Ajax.on('beforerequest', fnMaskShow);
														Ext.Ajax.on('requestcomplete', fnMaskHide);
														Ext.Ajax.on('requestexception', fnMaskHide);

														Ext.Ajax.request({
															method: 'POST',
															url: 'closingkehadiran/submitlupa',
															params: {
																'fn_nik': xnik,
																'fs_nama': xnama,
																'fd_tanggal': xtanggal,
																'fs_flag_lupa': xlupa,
																'fs_keterangan': xketerangan
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

																// RELOAD DATA
																grupEmploye.load();

																// GET TOTAL CLOSING
																fnTotalClosing();

																vMask.hide();
																winCariLupa.hide();
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
						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winCariLupa.hide();
							}
						}]
					});

					winCariLupa.show();
					winCariLupa.center();

				},
				scope: this
			}]
		},{
			text: 'Alpa',
			align: 'center',
			xtype: 'actioncolumn',
			width: 45,
			locked: true,
			items: [{
				iconCls: 'icon-view',
				tooltip: 'Detail',
				handler: function(grid, rowIndex, colIndex, e) {
					var rec = grid.getStore().getAt(rowIndex);

					var xlokasi = rec.get('fs_kode_lokasi');
					var xnik = rec.get('fn_nik');
					var xnama = rec.get('fs_nama_karyawan');
					var xtanggal = rec.get('fd_tanggal');
					var xperiode = rec.get('fs_bulan_tahun').toUpperCase();

					Ext.define('DataGridAlpa', {
						extend: 'Ext.data.Model',
						fields: [
							{name: 'fn_nik', type: 'string'},
							{name: 'fs_nama', type: 'string'},
							{name: 'fd_tanggal', type: 'string'},
							{name: 'fs_hari', type: 'string'},
							{name: 'fs_keterangan', type: 'string'}
						]
					});

					var grupGridAlpa = Ext.create('Ext.data.Store', {
						autoLoad: false,
						model: 'DataGridAlpa',
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
							url: 'closingkehadiran/gridreport'
						},
						listeners: {
							beforeload: function(store) {
								Ext.apply(store.getProxy().extraParams, {
									'fs_kode_lokasi': xlokasi,
									'fn_nik': xnik,
									'fs_nama': xnama,
									'fd_mmyy': xtanggal
								});
							}
						}
					});

					var winGridAlpa = Ext.create('Ext.grid.Panel', {
						defaultType: 'textfield',
						height: 300,
						sortableColumns: false,
						store: grupGridAlpa,
						columns: [{
							xtype: 'rownumberer',
							width: 30
						},{
							text: 'NIK',
							dataIndex: 'fn_nik',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Nama Karyawan',
							dataIndex: 'fs_nama',
							menuDisabled: true,
							hidden: true
						},{
							text: 'Tanggal',
							dataIndex: 'fd_tanggal',
							menuDisabled: true,
							locked: true,
							width: 80
						},{
							text: 'Hari',
							dataIndex: 'fs_hari',
							menuDisabled: true,
							locked: true,
							width: 60
						},{
							align: 'center',
							text: 'Alpa',
							dataIndex: 'fb_alpa',
							id: 'checkAlpa',
							name: 'checkAlpa',
							menuDisabled: true,
							xtype: 'checkcolumn',
							width: 50
						},{
							text: 'Keterangan',
							dataIndex: 'fs_keterangan',
							editor: {
								xtype: 'textfield'
							},
							width: 230
						}],
						plugins: [
        					Ext.create('Ext.grid.plugin.CellEditing', {
            					clicksToEdit: 1
        					})
    					],
						viewConfig: {
							getRowClass: function() {
								return 'rowwrap';
							},
							markDirty: false,
							stripeRows: true
						}
					});

					var winCariAlpa = Ext.create('Ext.window.Window', {
						border: false,
						closable: false,
						draggable: true,
						frame: false,
						layout: 'fit',
						resizable: false,
						title: xnama,
						width: 550,
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 50,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							xtype: 'fieldset',
							items: [
								winGridAlpa
							]
						}],
						listeners: {
							beforehide: function() {
								vMask.hide();
							},
							beforeshow: function() {
								grupGridAlpa.load();
								vMask.show();
							}
						},
						buttons: [{
							text: 'Submit Closing',
							handler: function() {
								// CALLBACK FUNCTION
								var xnik = '';
								var xnama = '';
								var xtanggal = '';
								var xketerangan = '';
								var xcheck = '';
								var xalpa = '';

								var store = winGridAlpa.getStore();
								store.each(function(record, idx) {
									xcheck = record.get('fb_alpa');
									if (xcheck === true) {
										xnik = xnik +'|'+ record.get('fn_nik');
										xnama = xnama +'|'+ record.get('fs_nama');
										xtanggal = xtanggal +'|'+ record.get('fd_tanggal');
										xketerangan = xketerangan +'|'+ record.get('fs_keterangan');
										xalpa = xalpa +'|'+ '1';
									}
								});

								Ext.Ajax.request({
									method: 'POST',
									url: 'closingkehadiran/ceksubmit',
									params: {
										'fn_nik': xnik,
										'fs_nama': xnama,
										'fd_tanggal': xtanggal
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

														Ext.Ajax.on('beforerequest', fnMaskShow);
														Ext.Ajax.on('requestcomplete', fnMaskHide);
														Ext.Ajax.on('requestexception', fnMaskHide);

														Ext.Ajax.request({
															method: 'POST',
															url: 'closingkehadiran/submitalpa',
															params: {
																'fn_nik': xnik,
																'fs_nama': xnama,
																'fd_tanggal': xtanggal,
																'fs_flag_alpa': xalpa,
																'fs_keterangan': xketerangan
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

																// RELOAD DATA
																grupEmploye.load();

																// GET TOTAL CLOSING
																fnTotalClosing();

																vMask.hide();
																winCariAlpa.hide();
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
						},{
							text: 'Exit',
							handler: function() {
								vMask.hide();
								winCariAlpa.hide();
							}
						}]
					});

					winCariAlpa.show();
					winCariAlpa.center();
				},
				scope: this
			}]
		},{
			text: 'Status Closing',
			dataIndex: 'fs_status_closing',
			menuDisabled: true,
			width: 150
		},{
			text: 'Potongan Absen',
			dataIndex: 'fs_ke_lokasi',
			menuDisabled: true,
			width: 90
		}],
		tbar: [{
			flex: 2,
			layout: 'anchor',
			xtype: 'container',
			items: [
				txtKdLokasi,
				cboLokasi
			]
		},{
			flex: 2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
				id: 'txtCari',
				name: 'txtCari',
				xtype: 'textfield'
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search',
				xtype: 'button',
				handler: function() {
					if (this.up('form').getForm().isValid()) {
						grupEmploye.load();

						// GET TOTAL CLOSING
						fnTotalClosing();
					}
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
			store: grupEmploye
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	function fnClosingHarian() {
		Ext.Ajax.setTimeout(600000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'closingkehadiran/closingharian',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue()
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

	function fnClosingPeriode() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'closingkehadiran/closingperiode',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
			}
		});
	}

	function fnTotalClosing() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'closingkehadiran/hitungclosing',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
				if (xtext.sukses === true) {
					Ext.getCmp('txtTotalSDM').setValue(xtext.fn_total_closing);
				}
			},
			failure: function(response) {
				var xText = Ext.decode(response.responseText);
				Ext.getCmp('txtTotalSDM').setValue(xtext.fn_total_closing);
			}
		});
	}
	

	function fnPrintClosing() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'closingkehadiran/printclosing',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue()
			},
			success: function(response) {
				var xtext = Ext.decode(response.responseText);
			},
			failure: function(response) {
				var xtext = Ext.decode(response.responseText);
			}
		});
	}

	var frmClosingKehadiran = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Closing Attendance',
		width: 930,
		items: [{
			fieldDefaults: {
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 100,
				msgTarget: 'side'
			},
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Closing Attendance',
			xtype: 'fieldset',
			items: [
				gridClosingKehadiran
			]
		},{
			style: 'padding: 1px;',
			border: false,
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 3,
					layout: 'anchor',
					xtype: 'container',
					items: [
						btnClosingHarian
					]
				},{
					flex: 0.5,
					layout: 'anchor',
					xtype: 'container'
				},{
					flex: 3,
					layout: 'anchor',
					xtype: 'container',
					items: [
						txtTotalSDM
					]
				}]
			}]
		}],
		buttons: [{
			text: 'Closing',
			scale: 'medium',
			iconCls: 'icon-complete',
			scale: 'medium',
			handler: ''
		},{
			text: 'Print',
			scale: 'medium',
			iconCls: 'icon-print',
			scale: 'medium',
			handler: ''
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmClosingKehadiran
	});

	function fnMaskShow() {
		frmClosingKehadiran.mask('Please wait...');
	}

	function fnMaskHide() {
		frmClosingKehadiran.unmask();
	}
	
	frmClosingKehadiran.render(Ext.getBody());
	Ext.get('loading').destroy();
	
});