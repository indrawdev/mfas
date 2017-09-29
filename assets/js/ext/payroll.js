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

	var blnFilter = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter',
		name: 'blnFilter',
		format: 'F, Y',
		value: new Date()
	};

	Ext.define('DataGridKaryawan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'int'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fn_no_npwp', type: 'string'},
			{name: 'fn_no_rekening', type: 'string'}
		]	
	});

	var grupKaryawan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKaryawan',
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
			url: 'payroll/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridKaryawan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupKaryawan,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			flex: 2
		},{
			text: 'NPWP',
			dataIndex: 'fn_no_npwp',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Photo',
			dataIndex: 'fs_photo_karyawan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
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
					if (this.up('form').getForm().isValid()) {
						grupKaryawan.load();
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
			store: grupKaryawan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtDepartemen').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtJabatan').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtNPWP').setValue(record.get('fn_no_npwp'));

				// LOAD IMAGE PHOTO
				dataImg.load();

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');

				// SET ENABLED TABPANEL
				Ext.getCmp('tab2').setDisabled(false);
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

	Ext.define('DataGridPaycheck', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode', type: 'string'},
			{name: 'fs_nama', type: 'string'},
			{name: 'fn_jumlah', type: 'string'},
			{name: 'fn_nilai', type: 'string'}
		]
	});

	var grupPaycheck = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPaycheck',
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
			url: 'payroll/gridpaycheck'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK').getValue()
				});
			}
		}
	});

	var gridPaycheck = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupPaycheck,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_kode',
			text: 'Kode',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama',
			text: 'Nama',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fn_jumlah',
			text: 'Jumlah',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fn_nilai',
			text: 'Nilai',
			flex: 0.7,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPaycheck
		}),
		listeners: {
			selectionchange: function(view, records) {
				//gridPaycheck.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditing
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltip
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM DETAIL
	var txtNIK = {
		anchor: '100%',
		fieldLabel: 'NIK',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNIK',
		name: 'txtNIK',
		xtype: 'textfield'
	};

	var txtNama = {
		anchor: '100%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield'
	};

	var txtLokasi = {
		anchor: '100%',
		fieldLabel: 'Lokasi',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasi',
		name: 'txtLokasi',
		xtype: 'textfield'
	};

	var txtDepartemen = {
		anchor: '100%',
		fieldLabel: 'Departemen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemen',
		name: 'txtDepartemen',
		xtype: 'textfield'
	};

	var txtJabatan = {
		anchor: '100%',
		fieldLabel: 'Jabatan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJabatan',
		name: 'txtJabatan',
		xtype: 'textfield'
	};

	var txtNPWP = {
		anchor: '100%',
		fieldLabel: 'NPWP',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNPWP',
		name: 'txtNPWP',
		xtype: 'textfield'
	};

	var txtNorek = {
		anchor: '100%',
		fieldLabel: 'Nomor Rekening',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNorek',
		name: 'txtNorek',
		xtype: 'textfield'
	};

	Ext.define('Image', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'src', type: 'string'}
		]
	});

	var dataImg = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'Image',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'payroll/photokaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK').getValue()
				});
			}
		}
	});

	var imageTpl = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="thumb-wrap">',
				'<img src="{src}" width="110px" height="110px" />',
			'</div>',
		'</tpl>'
	);

	var changingImage = Ext.create('Ext.view.View', {
		itemSelector: 'div.thumb-wrap',
		store: dataImg,
		tpl: imageTpl
	});

	var txtPeriode = {
		anchor: '100%',
		labelWidth: 60,
		fieldLabel: 'Periode',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtPeriode',
		name: 'txtPeriode',
		xtype: 'textfield'
	};

	var txtAlpha = {
		anchor: '100%',
		labelWidth: 60,
		fieldLabel: 'Alpha',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAlpha',
		name: 'txtAlpha',
		xtype: 'textfield'
	};

	var txtIjin = {
		anchor: '100%',
		labelWidth: 60,
		fieldLabel: 'Ijin',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtIjin',
		name: 'txtIjin',
		xtype: 'textfield'
	};

	var txtSakit = {
		anchor: '100%',
		labelWidth: 60,
		fieldLabel: 'Sakit',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtSakit',
		name: 'txtSakit',
		xtype: 'textfield'
	};

	var txtMasuk = {
		anchor: '100%',
		labelWidth: 60,
		fieldLabel: 'Masuk',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtMasuk',
		name: 'txtMasuk',
		xtype: 'textfield'
	};

	var txtCuti = {
		anchor: '100%',
		labelWidth: 60,
		fieldLabel: 'Cuti',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtCuti',
		name: 'txtCuti',
		xtype: 'textfield'
	};

	var txtSalary = {
		anchor: '100%',
		fieldLabel: 'Gaji Terakhir',
		id: 'txtSalary',
		name: 'txtSalary',
		xtype: 'textfield'
	};

	var btnConfidential = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnConfidential',
		name: 'btnConfidential',
		scale: 'medium',
		text: 'Confidential',
		xtype: 'button',
		handler: ''
	};

	var btnPrint = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnPrint',
		name: 'btnPrint',
		scale: 'medium',
		text: 'Cetak Slip Gaji',
		xtype: 'button',
		handler: fnPrintSlipGaji
	};


	// FUNCTION WINDOWS PIN
	function fnShowWindow() {

		var txtPIN = {
			afterLabelTextTpl: required,
			allowBlank: false,
			emptyText: 'Input PIN...',
			fieldLabel: 'PIN',
			id: 'txtPIN',
			inputType: 'password',
			name: 'txtPIN',
			width: '90%',
			minLength: '0',
			maxLength: '4',
			maskRe: /[0-9]/,
			enforceMaxLength: true
		};

		var winForm = Ext.create('Ext.form.Panel', {
			bodyStyle: 'padding:10px 0;',
			border: false,
			defaultType: 'textfield',
			fieldDefaults: {
				msgTarget: 'side',
				labelAlign: 'right',
				labelSeparator: '',
				labelWidth: 70
			},
			frame: false,
			id: 'frmPIN',
			method: 'POST',
			region: 'center',
			url: 'payroll/pin',
			items:[
				txtPIN
			],
			buttons: [{
				text: 'Submit',
				handler: fnSubmit
			}]
		});

		var winProtect = Ext.create('Ext.window.Window', {
			width: 300,
			height: 100,
			border: false,
			closable: false,
			draggable: false,
			frame: false,
			layout: 'fit',
			plain: true,
			resizable: false,
			title: 'Protect Data',
			items: [
				winForm
			]
		});

		winProtect.show();
		winProtect.center();


		// FUNCTION SUBMIT PIN
		function fnSubmit() {
			var xForm = Ext.getCmp('frmPIN').getForm();
			if (xForm.isValid()) {
				Ext.Ajax.request({
					method: 'POST',
					url: 'payroll/pin',
					params: {
						'fs_pin': Ext.getCmp('txtPIN').getValue()
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
							// CLOSE WINDOW
							winProtect.hide();

							// SET ENABLED TABPANEL
							Ext.getCmp('tab1').setDisabled(false);

							// LOAD DATA 
							grupKaryawan.load();
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
					}
				});
			}
		}
	}

	// FUNCTION PRINT SLIP GAJI
	function fnPrintSlipGaji() {
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
						url: 'payroll/printslip',
						params: {
							'fs_kode_dokumen': 'PSG',
							'fn_nik': Ext.getCmp('txtNIK').getValue()
						},
						success: function(response) {
							var xtext = Ext.decode(response.responseText);

							var url = xtext.url;
							var title = xtext.title;
							var nik = xtext.nik;

							if (xtext.sukses === true) {
								var popUp = Ext.create('Ext.window.Window', {
									closable: false,
									width: 950,
									height: 600,
									modal: true,
									layout:'anchor',
									title: title,
									buttons: [{
										text: 'Close',
										handler: function() {
											vMask.hide();
											popUp.hide();
										}
									}]
								});

								popUp.add({html: '<iframe width="942" height="600" src="'+ url + nik +'"></iframe>'});
								popUp.show();
							} else {
								Ext.MessageBox.show({
									buttons: Ext.MessageBox.OK,
									closable: false,
									icon: Ext.MessageBox.INFO,
									msg: xtext.hasil,
									title: 'HRD'
								});
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
			}
		});
	}

	// FUNCTION SHOW GAJI
	function fnShowSalary() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);
		
		Ext.Ajax.request({
			method: 'POST',
			url: 'payroll/salary',
			params: {
				'fn_nik': Ext.getCmp('txtNIK').getValue()
			},
			success: function(response) {
			
			},
			failure: function(response) {

			}
		});
	}

	var frmPayroll = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Gaji & THR',
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
				title: 'Daftar Karyawan',
				xtype: 'form',
				disabled: true,
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Daftar Karyawan',
					xtype: 'fieldset',
					items: [
						fnShowWindow(),
						gridKaryawan
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Paycheck',
				xtype: 'form',
				disabled: true,
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
								title: 'Karyawan',
								xtype: 'fieldset',
								items: [
									txtNIK,
									txtNama,
									txtLokasi,
									txtDepartemen,
									txtJabatan
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Nomor - Nomor',
								xtype: 'fieldset',
								items: [
									txtNPWP,
									txtNorek
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Kehadiran',
								xtype: 'fieldset',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 0.9,
										layout: 'anchor',
										xtype: 'container',
										style: 'padding: 5px;',
										items: [{
											style: 'padding: 5px;',
											xtype: 'fieldset',
											items: [
												changingImage
											]
										}]
									},{
										flex: 2.1,
										layout: 'anchor',
										xtype: 'container',
										style: 'padding: 5px;',
										items: [
											txtPeriode,
											txtAlpha,
											txtSakit,
											txtIjin,
											txtMasuk
										]
									}]
								}]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Confidential',
								xtype: 'fieldset',
								items: [
									btnConfidential
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Cetak Slip Gaji',
								xtype: 'fieldset',
								items: [
									btnPrint
								]
							}]
						}]
					}]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Detail',
					xtype: 'fieldset',
					items: [
						gridPaycheck
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSave',
					name: 'btnSave',
					text: 'Save',
					scale: 'medium',
					handler: ''
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: ''
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmPayroll
	});

	function fnMaskShow() {
		frmPayroll.mask('Please wait...');
	}

	function fnMaskHide() {
		frmPayroll.unmask();
	}
	
	frmPayroll.render(Ext.getBody());
	Ext.get('loading').destroy();

});