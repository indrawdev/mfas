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

	// DAFTAR REIMBURSMENT
	Ext.define('DataGridReimbursment', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fs_nama_departemen', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fn_nominal', type: 'string'},
			{name: 'fs_flag_setuju', type: 'string'}
		]	
	});

	var grupReimbursment = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridReimbursment',
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
			url: 'approvalpayroll/gridreimbursment'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariReimbursment').getValue()
				});
			}
		}
	});

	Ext.define('DataGridHistoryReimbursment', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fn_nominal', type: 'string'}
		]	
	});

	var grupHistoryReimbursment = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridHistoryReimbursment',
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
			url: 'approvalpayroll/gridhistoryreimbursment'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK1').getValue()
				});
			}
		}
	});

	// DAFTAR LOAN
	Ext.define('DataGridLoan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fs_nama_departemen', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fn_nominal', type: 'string'},
			{name: 'fs_flag_setuju', type: 'string'}
		]	
	});

	var grupLoan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridLoan',
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
			url: 'approvalpayroll/gridloan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLoan').getValue()
				});
			}
		}
	});

	Ext.define('DataGridHistoryLoan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fs_nama_departemen', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fn_nominal', type: 'string'}
		]	
	});

	var grupHistoryLoan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridHistoryLoan',
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
			url: 'approvalpayroll/gridhistoryloan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK2').getValue()
				});
			}
		}
	});

	// DAFTAR GAJI & THR
	Ext.define('DataGridSalary', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fs_nama_departemen', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fn_salary', type: 'string'},
			{name: 'fs_flag_setuju', type: 'string'}
		]	
	});

	var grupSalary = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridSalary',
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
			url: 'approvalpayroll/gridsalary'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariSalary').getValue()
				});
			}
		}
	});

	Ext.define('DataGridHistorySalary', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fn_salary', type: 'string'}
		]	
	});

	var grupHistorySalary = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridHistorySalary',
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
			url: 'approvalpayroll/gridhistorysalary'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK3').getValue()
				});
			}
		}
	});

	// COMPONENT FORM REIMBURSMENT
	var blnFilter1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter1',
		name: 'blnFilter1',
		format: 'F, Y',
		value: new Date()
	};

	var checkSetuju1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		boxLabel: 'Pengajuan Reimbursment Disetujui?',
		checked: false,
		id: 'checkSetuju1',
		name: 'checkSetuju1',
		xtype: 'checkboxfield'
	};

	var txtNIK1 = {
		anchor: '100%',
		fieldLabel: 'NIK',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNIK1',
		name: 'txtNIK1',
		xtype: 'textfield'
	};

	var txtNama1 = {
		anchor: '100%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama1',
		name: 'txtNama1',
		xtype: 'textfield'
	};

	var txtLokasi1 = {
		anchor: '100%',
		fieldLabel: 'Lokasi',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasi1',
		name: 'txtLokasi1',
		xtype: 'textfield'
	};

	var txtDepartemen1 = {
		anchor: '100%',
		fieldLabel: 'Departemen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemen1',
		name: 'txtDepartemen1',
		xtype: 'textfield'
	};

	var txtJabatan1 = {
		anchor: '100%',
		fieldLabel: 'Jabatan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJabatan1',
		name: 'txtJabatan1',
		xtype: 'textfield'
	};

	var txtCatatan1 = {
		anchor: '100%',
		fieldLabel: '',
		emptyText: 'Keterangan',
		id: 'txtCatatan1',
		name: 'txtCatatan1',
		xtype: 'textareafield'
	};

	var txtNominal1 = {
		anchor: '100%',
		fieldLabel: 'Jumlah Reimbursment',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNominal1',
		name: 'txtNominal1',
		xtype: 'textfield'
	};

	Ext.define('Image1', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'src', type: 'string'}
		]
	});

	var dataImg1 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'Image1',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'approvalpayroll/photokaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK1').getValue()
				});
			}
		}
	});

	var imageTpl1 = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="thumb-wrap">',
				'<img src="{src}" width="110px" height="110px" />',
			'</div>',
		'</tpl>'
	);

	var changingImage1 = Ext.create('Ext.view.View', {
		itemSelector: 'div.thumb-wrap',
		store: dataImg1,
		tpl: imageTpl1
	});

	// GRID REIMBURSMENT
	var gridReimbursment = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupReimbursment,
		columns: [{
			xtype: 'rownumberer',
			width: 50
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
			width: 240
		},{
			text: 'Tanggal Reimburs',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			align: 'right',
			text: 'Nominal',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter1
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
				id: 'txtCariReimbursment',
				name: 'txtCariReimbursment',
				xtype: 'textfield'
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					grupReimbursment.load();
				}
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupReimbursment
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK1').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama1').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtLokasi1').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtDepartemen1').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtJabatan1').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtNominal1').setValue(record.get('fn_nominal'));

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1-2');
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

	// GRID HISTORY REIMBURSMENT
	var gridHistoryReimbursment = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 150,
		sortableColumns: false,
		store: grupHistoryReimbursment,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Tanggal Reimbursment',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nominal',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			flex: 1
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupHistoryReimbursment
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM LOAN
	var blnFilter2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter2',
		name: 'blnFilter2',
		format: 'F, Y',
		value: new Date()
	};

	var checkSetuju2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		boxLabel: 'Pengajuan Pinjaman Disetujui?',
		checked: false,
		id: 'checkSetuju2',
		name: 'checkSetuju2',
		xtype: 'checkboxfield'
	};

	var txtNIK2 = {
		anchor: '100%',
		fieldLabel: 'NIK',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNIK2',
		name: 'txtNIK2',
		xtype: 'textfield'
	};

	var txtNama2 = {
		anchor: '100%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama2',
		name: 'txtNama2',
		xtype: 'textfield'
	};

	var txtLokasi2 = {
		anchor: '100%',
		fieldLabel: 'Lokasi',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasi2',
		name: 'txtLokasi2',
		xtype: 'textfield'
	};

	var txtDepartemen2 = {
		anchor: '100%',
		fieldLabel: 'Departemen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemen2',
		name: 'txtDepartemen2',
		xtype: 'textfield'
	};

	var txtJabatan2 = {
		anchor: '100%',
		fieldLabel: 'Jabatan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJabatan2',
		name: 'txtJabatan2',
		xtype: 'textfield'
	};

	var txtCatatan2 = {
		anchor: '100%',
		fieldLabel: '',
		emptyText: 'Keterangan',
		id: 'txtCatatan2',
		name: 'txtCatatan2',
		xtype: 'textareafield'
	};

	var txtNominal2 = {
		anchor: '100%',
		fieldLabel: 'Jumlah Pinjaman',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNominal2',
		name: 'txtNominal2',
		xtype: 'textfield'
	};

	Ext.define('Image2', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'src', type: 'string'}
		]
	});

	var dataImg2 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'Image2',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'approvalpayroll/photokaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK2').getValue()
				});
			}
		}
	});

	var imageTpl2 = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="thumb-wrap">',
				'<img src="{src}" width="110px" height="110px" />',
			'</div>',
		'</tpl>'
	);

	var changingImage2 = Ext.create('Ext.view.View', {
		itemSelector: 'div.thumb-wrap',
		store: dataImg2,
		tpl: imageTpl2
	});

	// GRID LOAN
	var gridLoan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupLoan,
		columns: [{
			xtype: 'rownumberer',
			width: 50
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
			width: 240
		},{
			text: 'Tanggal Pinjaman',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			align: 'right',
			text: 'Nominal',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			width: 100,
			renderer: Ext.util.Format.numberRenderer('0,000,000,-')
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter2
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
				id: 'txtCariLoan',
				name: 'txtCariLoan',
				xtype: 'textfield'
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					grupLoan.load();
				}
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupLoan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK2').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama2').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtLokasi2').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtDepartemen2').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtJabatan2').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtNominal2').setValue(record.get('fn_nominal'));

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[1];
				tabPanel.setActiveTab('tab2-2');
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

	// GRID HISTORY LOAN
	var gridHistoryLoan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 150,
		sortableColumns: false,
		store: grupHistoryLoan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Tanggal Pinjaman',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nominal Pinjaman',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			flex: 1
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupHistoryLoan
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM GAJI & THR
	var blnFilter3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter3',
		name: 'blnFilter3',
		format: 'F, Y',
		value: new Date()
	};

	var checkSetuju3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		boxLabel: 'Pengajuan Gaji & THR Disetujui?',
		checked: false,
		id: 'checkSetuju3',
		name: 'checkSetuju3',
		xtype: 'checkboxfield'
	};

	var txtNIK3 = {
		anchor: '100%',
		fieldLabel: 'NIK',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNIK3',
		name: 'txtNIK3',
		xtype: 'textfield'
	};

	var txtNama3 = {
		anchor: '100%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNama3',
		name: 'txtNama3',
		xtype: 'textfield'
	};

	var txtLokasi3 = {
		anchor: '100%',
		fieldLabel: 'Lokasi',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasi3',
		name: 'txtLokasi3',
		xtype: 'textfield'
	};

	var txtDepartemen3 = {
		anchor: '100%',
		fieldLabel: 'Departemen',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemen3',
		name: 'txtDepartemen3',
		xtype: 'textfield'
	};

	var txtJabatan3 = {
		anchor: '100%',
		fieldLabel: 'Jabatan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJabatan3',
		name: 'txtJabatan3',
		xtype: 'textfield'
	};

	var txtCatatan3 = {
		anchor: '100%',
		fieldLabel: '',
		emptyText: 'Keterangan',
		id: 'txtCatatan3',
		name: 'txtCatatan3',
		xtype: 'textareafield'
	};

	var txtNominal3 = {
		anchor: '100%',
		fieldLabel: 'Jumlah Pengajuan Gaji',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNominal3',
		name: 'txtNominal3',
		xtype: 'textfield'
	};

	Ext.define('Image3', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'src', type: 'string'}
		]
	});

	var dataImg3 = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'Image3',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'approvalpayroll/photokaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK3').getValue()
				});
			}
		}
	});

	var imageTpl3 = new Ext.XTemplate(
		'<tpl for=".">',
			'<div class="thumb-wrap">',
				'<img src="{src}" width="110px" height="110px" />',
			'</div>',
		'</tpl>'
	);

	var changingImage3 = Ext.create('Ext.view.View', {
		itemSelector: 'div.thumb-wrap',
		store: dataImg3,
		tpl: imageTpl3
	});

	// GRID GAJI & THR
	var gridSalary = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupSalary,
		columns: [{
			xtype: 'rownumberer',
			width: 50
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
			width: 240
		},{
			text: 'Gaji & THR',
			dataIndex: 'fn_salary',
			menuDisabled: true,
			width: 100
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter3
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
				id: 'txtCariSalary',
				name: 'txtCariSalary',
				xtype: 'textfield'
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '100%',
				text: 'Search All',
				xtype: 'button',
				handler: function() {
					grupSalary.load();
				}
			}]
		},{
			flex: 0.4,
			layout: 'anchor',
			xtype: 'container',
			items: []
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupSalary
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK3').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama3').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtLokasi3').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtDepartemen3').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtJabatan3').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtNominal3').setValue(record.get('fn_nominal'));

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[2];
				tabPanel.setActiveTab('tab3-2');
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

	// GRID HISTORY GAJI & THR
	var gridHistorySalary = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 150,
		sortableColumns: false,
		store: grupHistorySalary,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Tanggal Pengajuan',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Nominal Salary',
			dataIndex: 'fn_nominal',
			menuDisabled: true,
			flex: 1
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			flex: 1
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupHistorySalary
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});


	// FUNCTION TAB REIMBURSMENT
	function fnResetReimburs() {
		Ext.getCmp('txtNIK1').setValue('');
		Ext.getCmp('txtNama1').setValue('');
		Ext.getCmp('txtLokasi1').setValue('');
		Ext.getCmp('txtDepartemen1').setValue('');
		Ext.getCmp('txtJabatan1').setValue('');
		Ext.getCmp('txtNominal1').setValue('');
		Ext.getCmp('checkSetuju1').setValue(false);
		Ext.getCmp('txtCatatan1').setValue('');
	}

	function fnCekSaveReimburs() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'approvalpayroll/pengajuanreimburs',
				params: {
					'fn_nik': Ext.getCmp('txtNIK1').getValue(),
					'fs_setuju': Ext.getCmp('checkSetuju1').getValue()
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
									fnSaveReimburs();
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

	function fnSaveReimburs() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'approvalpayroll/savepengajuanreimburs',
			params: {
				'fn_nik': Ext.getCmp('txtNIK1').getValue(),
				'fs_setuju': Ext.getCmp('checkSetuju1').getValue(),
				'fs_catatan': Ext.getCmp('txtCatatan1').getValue()
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
				if (xtext.sukses === true) {
					fnResetReimburs();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab1-1');
					// RELOAD DATA
					grupReimbursment.load();
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

	// FUNCTION TAB LOAN / PINJAMAN
	function fnResetLoan() {
		Ext.getCmp('txtNIK2').setValue('');
		Ext.getCmp('txtNama2').setValue('');
		Ext.getCmp('txtLokasi2').setValue('');
		Ext.getCmp('txtDepartemen2').setValue('');
		Ext.getCmp('txtJabatan2').setValue('');
		Ext.getCmp('txtNominal2').setValue('');
		Ext.getCmp('checkSetuju2').setValue(false);
		Ext.getCmp('txtCatatan2').setValue('');
	}

	function fnCekSaveLoan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'approvalpayroll/pengajuanloan',
				params: {
					'fn_nik': Ext.getCmp('txtNIK2').getValue(),
					'fs_setuju': Ext.getCmp('checkSetuju2').getValue()
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
									fnSaveLoan();
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

	function fnSaveLoan() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'approvalpayroll/savepengajuanloan',
			params: {
				'fn_nik': Ext.getCmp('txtNIK2').getValue(),
				'fs_setuju': Ext.getCmp('checkSetuju2').getValue(),
				'fs_catatan': Ext.getCmp('txtCatatan2').getValue()
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
				if (xtext.sukses === true) {
					fnResetLoan();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab2-1');
					// RELOAD DATA
					grupLoan.load();
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

	// FUNCTION TAB GAJI & THR
	function fnResetSalary() {
		Ext.getCmp('txtNIK3').setValue('');
		Ext.getCmp('txtNama3').setValue('');
		Ext.getCmp('txtLokasi3').setValue('');
		Ext.getCmp('txtDepartemen3').setValue('');
		Ext.getCmp('txtJabatan3').setValue('');
		Ext.getCmp('txtNominal3').setValue('');
		Ext.getCmp('checkSetuju3').setValue(false);
		Ext.getCmp('txtCatatan3').setValue('');
	}

	function fnCekSaveSalary() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'approvalpayroll/pengajuansalary',
				params: {
					'fn_nik': Ext.getCmp('txtNIK3').getValue(),
					'fs_setuju': Ext.getCmp('checkSetuju3').getValue()
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
									fnSaveSalary();
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

	function fnSaveSalary() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'approvalpayroll/savepengajuansalary',
			params: {
				'fn_nik': Ext.getCmp('txtNIK3').getValue(),
				'fs_setuju': Ext.getCmp('checkSetuju3').getValue(),
				'fs_catatan': Ext.getCmp('txtCatatan3').getValue()
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
				if (xtext.sukses === true) {
					fnResetLoan();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab3-1');
					// RELOAD DATA
					grupSalary.load();
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

	var frmApprovalPayroll = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Approval',
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
				title: 'Reimbursment',
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
						title: 'Daftar Reimbursment',
						xtype: 'form',
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 140,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							title: 'Daftar Reimbursment',
							xtype: 'fieldset',
							items: [
								gridReimbursment
							]
						}]
					},{
						id: 'tab1-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Detail Reimbursment',
						xtype: 'form',
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
										title: 'Biodata',
										xtype: 'fieldset',
										items: [
											txtNIK1,
											txtNama1,
											txtLokasi1,
											txtDepartemen1,
											txtJabatan1
										]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Nominal',
										xtype: 'fieldset',
										items: [
											txtNominal1
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Status',
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
														changingImage1
													]
												}]
											},{
												flex: 2.1,
												layout: 'anchor',
												xtype: 'container',
												style: 'padding: 5px;',
												items: [{
													style: 'padding: 1px;',
													border: false,
													xtype: 'fieldset',
													items: [
														checkSetuju1
													]
												},{
													style: 'padding: 1px;',
													border: false,
													xtype: 'fieldset',
													items: [
														txtCatatan1
													]
												}]
											}]
										}]
									}]
								}]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '99%',
										style: 'padding: 5px;',
										title: 'History Reimbursment',
										xtype: 'fieldset',
										items: [
											gridHistoryReimbursment
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
							handler: fnCekSaveReimburs
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: fnResetReimburs
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Loan',
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
						title: 'Daftar Pinjaman',
						xtype: 'form',
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 140,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							title: 'Daftar Pinjaman',
							xtype: 'fieldset',
							items: [
								gridLoan
							]
						}]
					},{
						id: 'tab2-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Detail Pinjaman',
						xtype: 'form',
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
										title: 'Biodata',
										xtype: 'fieldset',
										items: [
											txtNIK2,
											txtNama2,
											txtLokasi2,
											txtDepartemen2,
											txtJabatan2
										]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Nominal',
										xtype: 'fieldset',
										items: [
											txtNominal2
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Status',
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
														changingImage2
													]	
												}]
											},{
												flex: 2.1,
												layout: 'anchor',
												xtype: 'container',
												style: 'padding: 5px;',
												items: [{
													style: 'padding: 1px;',
													border: false,
													xtype: 'fieldset',
													items: [
														checkSetuju2
													]
												},{
													style: 'padding: 1px;',
													border: false,
													xtype: 'fieldset',
													items: [
														txtCatatan2
													]
												}]
											}]
										}]
									}]
								}]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '99%',
										style: 'padding: 5px;',
										title: 'History Pinjaman',
										xtype: 'fieldset',
										items: [
											gridHistoryLoan
										]
									}]
								}]
							}]
						}],
						buttons: [{
							iconCls: 'icon-save',
							id: 'btnSave2',
							name: 'btnSave2',
							scale: 'medium',
							text: 'Save',
							handler: fnCekSaveLoan
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: fnResetLoan
						}]
					}]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Gaji & THR',
				items: [{
					activeTab: 0,
					bodyStyle: 'padding: 5px; background-color: '.concat(gBasePanel),
					border: false,
					plain: true,
					xtype: 'tabpanel',
					items: [{
						id: 'tab3-1',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Daftar Gaji & THR',
						xtype: 'form',
						items: [{
							fieldDefaults: {
								labelAlign: 'right',
								labelSeparator: '',
								labelWidth: 140,
								msgTarget: 'side'
							},
							anchor: '100%',
							style: 'padding: 5px;',
							title: 'Daftar Gaji & THR',
							xtype: 'fieldset',
							items: [
								gridSalary
							]
						}]
					},{
						id: 'tab3-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Detail Gaji & THR',
						xtype: 'form',
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
										title: 'Biodata',
										xtype: 'fieldset',
										items: [
											txtNIK3,
											txtNama3,
											txtLokasi3,
											txtDepartemen3,
											txtJabatan3
										]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Nominal',
										xtype: 'fieldset',
										items: [
											txtNominal3
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Status',
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
														changingImage3
													]
												}]
											},{
												flex: 2.1,
												layout: 'anchor',
												xtype: 'container',
												style: 'padding: 5px;',
												items: [{
													style: 'padding: 1px;',
													border: false,
													xtype: 'fieldset',
													items: [
														checkSetuju3
													]
												},{
													style: 'padding: 1px;',
													border: false,
													xtype: 'fieldset',
													items: [
														txtCatatan3
													]
												}]
											}]
										}]
									}]
								}]
							},{
								anchor: '100%',
								layout: 'hbox',
								xtype: 'container',
								items: [{
									flex: 2,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '99%',
										style: 'padding: 5px;',
										title: 'History Kenaikan Salary',
										xtype: 'fieldset',
										items: [
											gridHistorySalary
										]
									}]
								}]
							}]
						}],
						buttons: [{
							iconCls: 'icon-save',
							id: 'btnSave3',
							name: 'btnSave3',
							scale: 'medium',
							text: 'Save',
							handler: fnCekSaveSalary
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: fnResetSalary
						}]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmApprovalPayroll
	});

	function fnMaskShow() {
		frmApprovalPayroll.mask('Please wait...');
	}

	function fnMaskHide() {
		frmApprovalPayroll.unmask();
	}
	
	frmApprovalPayroll.render(Ext.getBody());
	Ext.get('loading').destroy();

});