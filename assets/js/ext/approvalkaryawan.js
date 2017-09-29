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

	var grupCombo = Ext.create('Ext.data.Store', {
		autoLoad: false,
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
			url: 'approvalkaryawan/combo'
		}
	});

	// DAFTAR PENGAJUAN KARYAWAN BARU
	Ext.define('DataGridPengajuanBaru', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'int'},
			{name: 'fd_tanggal_masuk', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fs_nama_departemen', type: 'string'},
			{name: 'fs_nama_jabatan', type: 'string'},
			{name: 'fs_alamat_ktp', type: 'string'},
			{name: 'fs_alamat_tinggal', type: 'string'},
			{name: 'fs_no_tlp', type: 'string'},
			{name: 'fs_no_hp', type: 'string'},
			{name: 'fs_jenis_kelamin', type: 'string'},
			{name: 'fs_tempat_lahir', type: 'string'},
			{name: 'fd_tanggal_lahir', type: 'string'},
			{name: 'fs_agama', type: 'string'},
			{name: 'fs_gol_darah', type: 'string'},
			{name: 'fs_kebangsaan', type: 'string'},
			{name: 'fs_tempat_tinggal', type: 'string'},
			{name: 'fn_no_ktp', type: 'string'},
			{name: 'fn_no_npwp', type: 'string'},
			{name: 'fn_sim_a', type: 'string'},
			{name: 'fn_sim_c', type: 'string'},
			{name: 'fs_status_kendaraan', type: 'string'},
			{name: 'fs_status_nikah', type: 'string'},
			{name: 'fs_status', type: 'string'}
		]	
	});

	var grupPengajuanBaru = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPengajuanBaru',
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
			url: 'approvalkaryawan/gridpengajuanbaru'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariBaru').getValue()
				});
			}
		}
	});

	// DAFTAR PENGAJUAN KARYAWAN KELUAR
	Ext.define('DataGridPengajuanKeluar', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'int'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fd_tanggal_masuk', type: 'string'},
			{name: 'fs_tempat_lahir', type: 'string'},
			{name: 'fd_tanggal_lahir', type: 'string'},
			{name: 'fs_alamat_karyawan', type: 'string'},
			{name: 'fs_jekel_karyawan', type: 'string'},
			{name: 'fs_agama_karyawan', type: 'string'},
			{name: 'fs_golongan_darah', type: 'string'}
		]	
	});

	var grupPengajuanKeluar = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPengajuanKeluar',
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
			url: 'approvalkaryawan/gridpengajuankeluar'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKeluar').getValue()
				});
			}
		}
	});

	Ext.define('DataGridPerubahanData', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'int'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_status', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fs_oleh', type: 'string'},
			{name: 'fs_sebelum', type: 'string'},
			{name: 'fs_setelah', type: 'string'}
		]	
	});

	var grupPerubahanData = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridPerubahanData',
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
			url: 'approvalkaryawan/gridperubahandata'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCariRubah').getValue()
				});
			}
		}
	});

	Ext.define('DataGridMutasiKaryawan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'int'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_status', type: 'string'},
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fs_nama_lokasi_asal', type: 'string'},
			{name: 'fs_nama_lokasi_tujuan', type: 'string'}
		]	
	});

	var grupMutasiKaryawan = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridMutasiKaryawan',
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
			url: 'approvalkaryawan/gridmutasikaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					//'fs_cari': Ext.getCmp('txtCariMutasi').getValue()
				});
			}
		}
	});

	// COMPONENT FORM KARYAWAN BARU
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
		boxLabel: 'Pengajuan Karyawan Masuk Disetujui?',
		checked: false,
		id: 'checkSetuju1',
		name: 'checkSetuju1',
		xtype: 'checkboxfield'
	};

	var cboSetujuBaru = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Di Setujui',
		id: 'cboSetujuBaru',
		name: 'cboSetujuBaru',
		store: grupCombo,
		valueField: 'fs_kode',
		xtype: 'combobox'	
	};

	// COMPONENT FORM BIODATA 1 KARYAWAN BARU
	var txtTglMasuk1 = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Masuk',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		format: 'd-m-Y',
		id: 'txtTglMasuk1',
		name: 'txtTglMasuk1',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
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

	var txtAlamatKTP1 = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat KTP',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAlamatKTP1',
		name: 'txtAlamatKTP1',
		xtype: 'textareafield'
	};

	var txtAlamatTinggal1 = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Tinggal',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAlamatTinggal1',
		name: 'txtAlamatTinggal1',
		xtype: 'textareafield'
	};

	var txtTelepon1 = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtTelepon1',
		name: 'txtTelepon1',
		xtype: 'textfield'
	};

	var txtHandphone1 = {
		anchor: '100%',
		fieldLabel: 'No. Handphone',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtHandphone1',
		name: 'txtHandphone1',
		xtype: 'textfield'
	};

	var txtJekel1 = {
		anchor: '100%',
		fieldLabel: 'Jenis Kelamin',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJekel1',
		name: 'txtJekel1',
		xtype: 'textfield'
	};

	var txtTmptLahir1 = {
		anchor: '100%',
		fieldLabel: 'Tempat Lahir',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtTmptLahir1',
		name: 'txtTmptLahir1',
		xtype: 'textfield'
	};

	var txtTglLahir1 = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Lahir',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		format: 'd-m-Y',
		id: 'txtTglLahir1',
		name: 'txtTglLahir1',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		xtype: 'datefield'
	};

	var txtAgama1 = {
		anchor: '100%',
		fieldLabel: 'Agama',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAgama1',
		name: 'txtAgama1',
		xtype: 'textfield'
	};

	var txtKebangsaan1 = {
		anchor: '100%',
		fieldLabel: 'Kebangsaaan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtKebangsaan1',
		name: 'txtKebangsaan1',
		xtype: 'textfield'
	};

	var txtEmail1 = {
		anchor: '100%',
		fieldLabel: 'Email',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtEmail1',
		name: 'txtEmail1',
		xtype: 'textfield'
	};

	var txtGolDarah1 = {
		anchor: '100%',
		fieldLabel: 'Golongan Darah',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtGolDarah1',
		name: 'txtGolDarah1',
		xtype: 'textfield'
	};

	var txtStatusTinggal1 = {
		anchor: '100%',
		fieldLabel: 'Status Tempat Tinggal',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtStatusTinggal1',
		name: 'txtStatusTinggal1',
		xtype: 'textfield'
	};

	var txtSIMA1 = {
		anchor: '100%',
		fieldLabel: 'SIM A',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtSIMA1',
		name: 'txtSIMA1',
		xtype: 'textfield'
	};

	var txtSIMC1 = {
		anchor: '100%',
		fieldLabel: 'SIM C',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtSIMC1',
		name: 'txtSIMC1',
		xtype: 'textfield'
	};

	var txtNoKTP1 = {
		anchor: '100%',
		fieldLabel: 'KTP No.',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNoKTP1',
		name: 'txtNoKTP1',
		xtype: 'textfield'
	};

	var txtNoNPWP1 = {
		anchor: '100%',
		fieldLabel: 'NPWP No.',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNoNPWP1',
		name: 'txtNoNPWP1',
		xtype: 'textfield'
	};

	var txtJnsKend1 = {
		anchor: '100%',
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJnsKend1',
		name: 'txtJnsKend1',
		xtype: 'textfield'
	};

	var txtThnKend1 = {
		anchor: '100%',
		fieldLabel: 'Tahun Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtThnKend1',
		name: 'txtThnKend1',
		xtype: 'textfield'
	};

	var txtStatusKend1 = {
		anchor: '100%',
		fieldLabel: 'Status Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtStatusKend1',
		name: 'txtStatusKend1',
		xtype: 'textfield'
	};

	var txtStatPerkawinan1 = {
		anchor: '100%',
		fieldLabel: 'Status Perkawinan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtStatPerkawinan1',
		name: 'txtStatPerkawinan1',
		xtype: 'textfield'
	};

	var txtCatatan1 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Catatan',
		id: 'txtCatatan1',
		name: 'txtCatatan1',
		xtype: 'textareafield'
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
			url: 'approvalkaryawan/photokaryawan'
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

	var btnPrint1 = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnPrint1',
		name: 'btnPrint1',
		scale: 'medium',
		text: 'Cetak Data Karyawan',
		xtype: 'button',
		disabled: true,
		handler: fnPrintProfil
	};


	// GRID PENGAJUAN BARU
	var gridPengajuanBaru = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupPengajuanBaru,
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
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 145
		},{
			text: 'Jenis Kelamin',
			dataIndex: 'fs_jenis_kelamin',
			menuDisabled: true,
			width: 80
		},{
			text: 'Tanggal Lahir',
			dataIndex: 'fd_tanggal_lahir',
			menuDisabled: true,
			width: 80,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Alamat Karyawan',
			dataIndex: 'fs_alamat_tinggal',
			menuDisabled: true, 
			width: 550
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
		},{
			text: 'Alamat KTP',
			dataIndex: 'fs_alamat_ktp',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. Telepon',
			dataIndex: 'fs_no_tlp',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. Handphone',
			dataIndex: 'fs_no_hp',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Email',
			dataIndex: 'fs_email_pribadi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Tempat Lahir',
			dataIndex: 'fs_tempat_lahir',
			menuDisabled: true,
			hidden: true			
		},{
			text: 'Agama',
			dataIndex: 'fs_agama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Golongan Darah',
			dataIndex: 'fs_gol_darah',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kebangsaan',
			dataIndex: 'fs_kebangsaan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Status Rumah',
			dataIndex: 'fs_tempat_tinggal',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. KTP',
			dataIndex: 'fn_no_ktp',
			menuDisabled: true,
			hidden: true
		},{
			text: 'No. NPWP',
			dataIndex: 'fn_no_npwp',
			menuDisabled: true,
			hidden: true
		},{
			text: 'SIM A',
			dataIndex: 'fn_sim_a',
			menuDisabled: true,
			hidden: true
		},{
			text: 'SIM C',
			dataIndex: 'fn_sim_c',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Status Kendaraan',
			dataIndex: 'fs_status_kendaraan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Status Nikah',
			dataIndex: 'fs_status_nikah',
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
				id: 'txtCariBaru',
				name: 'txtCariBaru',
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
					if (this.up('form').getForm().isValid()) {
						grupPengajuanBaru.load();
					}
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
			store: grupPengajuanBaru
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK1').setValue(record.get('fn_nik'));
				Ext.getCmp('txtTglMasuk1').setValue(record.get('fd_tanggal_masuk'));
				Ext.getCmp('txtNama1').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtLokasi1').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtDepartemen1').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtJabatan1').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtAlamatKTP1').setValue(record.get('fs_alamat_ktp'));
				Ext.getCmp('txtAlamatTinggal1').setValue(record.get('fs_alamat_tinggal'));
				Ext.getCmp('txtTelepon1').setValue(record.get('fs_no_tlp'));
				Ext.getCmp('txtHandphone1').setValue(record.get('fs_no_hp'));
				Ext.getCmp('txtEmail1').setValue(record.get('fs_email_pribadi'));
				Ext.getCmp('txtJekel1').setValue(record.get('fs_jenis_kelamin'));
				Ext.getCmp('txtTmptLahir1').setValue(record.get('fs_tempat_lahir'));
				Ext.getCmp('txtTglLahir1').setValue(record.get('fd_tanggal_lahir'));
				Ext.getCmp('txtAgama1').setValue(record.get('fs_agama'));
				Ext.getCmp('txtGolDarah1').setValue(record.get('fs_gol_darah'));
				Ext.getCmp('txtKebangsaan1').setValue(record.get('fs_kebangsaan'));
				Ext.getCmp('txtStatusTinggal1').setValue(record.get('fs_tempat_tinggal'));
				Ext.getCmp('txtNoKTP1').setValue(record.get('fn_no_ktp'));
				Ext.getCmp('txtNoNPWP1').setValue(record.get('fn_no_npwp'));
				Ext.getCmp('txtSIMA1').setValue(record.get('fn_sim_a'));
				Ext.getCmp('txtSIMC1').setValue(record.get('fn_sim_c'));
				Ext.getCmp('txtStatusKend1').setValue(record.get('fs_status_kendaraan'));
				Ext.getCmp('txtStatPerkawinan1').setValue(record.get('fs_status_nikah'));


				// LOAD IMAGE PHOTO
				dataImg1.load();

				// ENABLED BUTTON
				Ext.getCmp('btnPrint1').setDisabled(false);

				// SET ENABLED TABPANEL
				Ext.getCmp('tab1-2').setDisabled(false);

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

	// COMPONENT FORM KARYAWAN KELUAR
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
		boxLabel: 'Pengajuan Karyawan Keluar Disetujui?',
		checked: false,
		id: 'checkSetuju2',
		name: 'checkSetuju2',
		xtype: 'checkboxfield'
	};

	var cboSetujuKeluar = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Di Setujui',
		id: 'cboSetujuKeluar',
		name: 'cboSetujuKeluar',
		store: grupCombo,
		valueField: 'fs_kode',
		xtype: 'combobox'	
	};

	// COMPONENT FORM BIODATA 2 KARYAWAN KELUAR
	var txtTglMasuk2 = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Masuk',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		format: 'd-m-Y',
		id: 'txtTglMasuk2',
		name: 'txtTglMasuk2',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
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

	var txtAlamatKTP2 = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat KTP',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAlamatKTP2',
		name: 'txtAlamatKTP2',
		xtype: 'textareafield'
	};

	var txtAlamatTinggal2 = {
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Tinggal',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAlamatTinggal2',
		name: 'txtAlamatTinggal2',
		xtype: 'textareafield'
	};

	var txtTelepon2 = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtTelepon2',
		name: 'txtTelepon2',
		xtype: 'textfield'
	};

	var txtHandphone2 = {
		anchor: '100%',
		fieldLabel: 'No. Handphone',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtHandphone2',
		name: 'txtHandphone2',
		xtype: 'textfield'
	};

	var txtJekel2 = {
		anchor: '100%',
		fieldLabel: 'Jenis Kelamin',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJekel2',
		name: 'txtJekel2',
		xtype: 'textfield'
	};

	var txtTmptLahir2 = {
		anchor: '100%',
		fieldLabel: 'Tempat Lahir',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtTmptLahir2',
		name: 'txtTmptLahir2',
		xtype: 'textfield'
	};

	var txtTglLahir2 = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Lahir',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		format: 'd-m-Y',
		id: 'txtTglLahir2',
		name: 'txtTglLahir2',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		xtype: 'datefield'
	};

	var txtAgama2 = {
		anchor: '100%',
		fieldLabel: 'Agama',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtAgama2',
		name: 'txtAgama2',
		xtype: 'textfield'
	};

	var txtKebangsaan2 = {
		anchor: '100%',
		fieldLabel: 'Kebangsaaan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtKebangsaan2',
		name: 'txtKebangsaan2',
		xtype: 'textfield'
	};

	var txtEmail2 = {
		anchor: '100%',
		fieldLabel: 'Email',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtEmail2',
		name: 'txtEmail2',
		xtype: 'textfield'
	};

	var txtGolDarah2 = {
		anchor: '100%',
		fieldLabel: 'Golongan Darah',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtGolDarah2',
		name: 'txtGolDarah2',
		xtype: 'textfield'
	};

	var txtStatusTinggal2 = {
		anchor: '100%',
		fieldLabel: 'Status Tempat Tinggal',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtStatusTinggal2',
		name: 'txtStatusTinggal2',
		xtype: 'textfield'
	};

	var txtSIMA2 = {
		anchor: '100%',
		fieldLabel: 'SIM A',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtSIMA2',
		name: 'txtSIMA2',
		xtype: 'textfield'
	};

	var txtSIMC2 = {
		anchor: '100%',
		fieldLabel: 'SIM C',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtSIMC2',
		name: 'txtSIMC2',
		xtype: 'textfield'
	};

	var txtNoKTP2 = {
		anchor: '100%',
		fieldLabel: 'KTP No.',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNoKTP2',
		name: 'txtNoKTP2',
		xtype: 'textfield'
	};

	var txtNoNPWP2 = {
		anchor: '100%',
		fieldLabel: 'NPWP No.',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtNoNPWP2',
		name: 'txtNoNPWP2',
		xtype: 'textfield'
	};

	var txtJnsKend2 = {
		anchor: '100%',
		fieldLabel: 'Jenis Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtJnsKend2',
		name: 'txtJnsKend2',
		xtype: 'textfield'
	};

	var txtThnKend2 = {
		anchor: '100%',
		fieldLabel: 'Tahun Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtThnKend2',
		name: 'txtThnKend2',
		xtype: 'textfield'
	};

	var txtStatusKend2 = {
		anchor: '100%',
		fieldLabel: 'Status Kendaraan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtStatusKend2',
		name: 'txtStatusKend2',
		xtype: 'textfield'
	};

	var txtStatPerkawinan2 = {
		anchor: '100%',
		fieldLabel: 'Status Perkawinan',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtStatPerkawinan2',
		name: 'txtStatPerkawinan2',
		xtype: 'textfield'
	};

	var txtCatatan2 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Catatan',
		id: 'txtCatatan2',
		name: 'txtCatatan2',
		xtype: 'textareafield'
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
			url: 'approvalkaryawan/photokaryawan'
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

	var btnPrint2 = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnPrint2',
		name: 'btnPrint2',
		scale: 'medium',
		text: 'Cetak Data Karyawan',
		xtype: 'button',
		disabled: true,
		handler: fnPrintProfil
	};

	// GRID PENGAJUAN KELUAR
	var gridPengajuanKeluar = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupPengajuanKeluar,
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
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Jenis Kelamin',
			dataIndex: 'fs_jekel_karyawan',
			menuDisabled: true,
			width: 80
		},{
			text: 'Tanggal Lahir',
			dataIndex: 'fd_tanggal_lahir',
			menuDisabled: true,
			width: 80,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Alamat Karyawan',
			dataIndex: 'fs_alamat_karyawan',
			menuDisabled: true, 
			width: 300
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
				id: 'txtCariKeluar',
				name: 'txtCariKeluar',
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
					if (this.up('form').getForm().isValid()) {
						grupPengajuanKeluar.load();
					}
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
			store: grupPengajuanKeluar
		}),
		listeners: {
			itemdblclick: function(grid, record) {
			
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

	// COMPONENT FORM MUTASI KARYAWAN
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
		boxLabel: 'Mutasi Karyawan Disetujui?',
		checked: false,
		id: 'checkSetuju3',
		name: 'checkSetuju3',
		xtype: 'checkboxfield'
	};

	var txtTglMasuk3 = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Masuk',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		format: 'd-m-Y',
		id: 'txtTglMasuk3',
		name: 'txtTglMasuk3',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
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

	var txtLokasiLama3 = {
		anchor: '100%',
		fieldLabel: 'Lokasi Lama',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasiLama3',
		name: 'txtLokasiLama3',
		xtype: 'textfield'
	};

	var txtDepartemenLama3 = {
		anchor: '100%',
		fieldLabel: 'Departemen Lama',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemenLama3',
		name: 'txtDepartemenLama3',
		xtype: 'textfield'
	};

	var cboTglMutasi3 = {
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Mutasi',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		format: 'd-m-Y',
		id: 'cboTglMutasi3',
		name: 'cboTglMutasi3',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtKdLokasiBaru3 = {
		id: 'txtKdLokasiBaru3',
		name: 'txtKdLokasiBaru3',
		xtype: 'textfield',
		hidden: true
	};

	var txtLokasiBaru3 = {
		anchor: '100%',
		fieldLabel: 'Lokasi Baru',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtLokasiBaru3',
		name: 'txtLokasiBaru3',
		xtype: 'textfield'
	};

	var txtDepartemenBaru3 = {
		anchor: '100%',
		fieldLabel: 'Departemen Baru',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtDepartemenBaru3',
		name: 'txtDepartemenBaru3',
		xtype: 'textfield'
	};

	var txtKeterangan3 = {
		anchor: '100%',
		fieldStyle: 'background-color: #eee; background-image: none;',
		readOnly: true,
		id: 'txtKeterangan3',
		name: 'txtKeterangan3',
		xtype: 'textareafield'
	};

	var txtCatatan3 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Catatan Approval',
		id: 'txtCatatan3',
		name: 'txtCatatan3',
		xtype: 'textareafield'
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
			url: 'approvalkaryawan/photokaryawan'
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

	var btnPrint3 = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnPrint3',
		name: 'btnPrint3',
		scale: 'medium',
		text: 'Cetak Data Karyawan',
		xtype: 'button',
		disabled: true,
		handler: fnPrintProfil
	};

	// GRID MUTASI KARYAWAN
	var gridMutasiKaryawan = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupMutasiKaryawan,
		columns: [{
			xtype: 'rownumberer',
			width: 50
		},{
			text: 'Tanggal Mutasi',
			dataIndex: 'fd_tanggal_mutasi',
			menuDisabled: true,
			locked: true,
			width: 90,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
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
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 150
		},{
			text: 'Dari Lokasi',
			dataIndex: 'fs_nama_lokasi_lama',
			menuDisabled: true,
			width: 150
		},{
			text: 'Ke Lokasi',
			dataIndex: 'fs_nama_lokasi_baru',
			menuDisabled: true,
			width: 150
		},{
			text: 'Dari Kode Lokasi',
			dataIndex: 'fs_lokasi_lama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Ke Kode Lokasi',
			dataIndex: 'fs_lokasi_baru',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Departemen Lama',
			dataIndex: 'fs_departemen_lama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen Lama',
			dataIndex: 'fs_nama_departemen_lama',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Departemen Baru',
			dataIndex: 'fs_departemen_baru',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen Baru',
			dataIndex: 'fs_nama_departemen_baru',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Catatan Mutasi',
			dataIndex: 'fs_catatan_mutasi',
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
				emptyText: 'Nama Karyawan',
				id: 'txtCari3',
				name: 'txtCari3',
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
					if (this.up('form').getForm().isValid()) {
						grupMutasiKaryawan.load();
					}
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
			store: grupMutasiKaryawan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK3').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNama3').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtLokasiLama3').setValue(record.get('fs_nama_lokasi_lama'));
				Ext.getCmp('txtDepartemenLama3').setValue(record.get('fs_nama_departemen_lama'));
				Ext.getCmp('cboTglMutasi3').setValue(record.get('fd_tanggal_mutasi'));
				Ext.getCmp('txtKdLokasiBaru3').setValue(record.get('fs_lokasi_baru'));
				Ext.getCmp('txtLokasiBaru3').setValue(record.get('fs_nama_lokasi_baru'));
				Ext.getCmp('txtDepartemenBaru3').setValue(record.get('fs_nama_departemen_baru'));
				Ext.getCmp('txtKeterangan3').setValue(record.get('fs_catatan_mutasi'));

				// ENABLED BUTTON
				Ext.getCmp('btnPrint3').setDisabled(false);

				// LOAD IMAGE PHOTO
				dataImg3.load();

				// SET ENABLED TABPANEL
				Ext.getCmp('tab3-2').setDisabled(false);

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


	// COMPONENT FORM PERUBAHAN DATA
	var blnFilter4 = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '98%',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'blnFilter4',
		name: 'blnFilter4',
		format: 'F, Y',
		value: new Date()
	};

	// GRID PERUBAHAN DATA
	var gridPerubahanData = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupPerubahanData,
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
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true,
			width: 90
		},{
			text: 'Tanggal',
			dataIndex: 'fd_tanggal',
			menuDisabled: true,
			width: 90,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Oleh',
			dataIndex: 'fs_user',
			menuDisabled: true,
			width: 100
		},{
			text: 'Sebelum',
			dataIndex: 'fs_sebelum_perubahan',
			menuDisabled: true,
			width: 200
		},{
			text: 'Setelah',
			dataIndex: 'fs_setelah_perubahan',
			menuDisabled: true,
			width: 200
		}],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [
				blnFilter4
			]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Nama Karyawan',
				id: 'txtCari4',
				name: 'txtCari4',
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
					if (this.up('form').getForm().isValid()) {
						grupPerubahanData.load();
					}
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
			store: grupPerubahanData
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// FUNCTION TAB PROFIL KARYAWAN BARU
	function fnResetPengajuanBaru() {
		Ext.getCmp('txtCatatan1').setValue('');
		Ext.getCmp('checkSetuju1').setValue(false);
		Ext.getCmp('btnPrint1').setDisabled(true);
	}

	function fnCekSavePengajuanBaru() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'approvalkaryawan/ceksavepengajuanbaru',
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
									fnSavePengajuanBaru();
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

	function fnSavePengajuanBaru() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'approvalkaryawan/savepengajuanbaru',
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
					fnResetPengajuanBaru();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab1-1');
					// RELOAD DATA
					grupPengajuanBaru.load();
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

	// FUNCTION TAB PROFIL KARYAWAN KELUAR
	function fnResetPengajuanKeluar() {
		Ext.getCmp('txtCatatan2').setValue('');
		Ext.getCmp('checkSetuju2').setValue(false);
		Ext.getCmp('btnPrint2').setDisabled(true);
	}

	function fnCekSavePengajuanKeluar() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'approvalkaryawan/pengajuankeluar',
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
									fnSavePengajuanKeluar();
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

	function fnSavePengajuanKeluar() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'approvalkaryawan/savepengajuankeluar',
			params: {
				'fn_nik': Ext.getCmp('txtNIK2').getValue(),
				'fs_setuju': Ext.getCmp('checkSetuju2').getValue(),
				'fs_catatan': Ext.getCmp('txtCatatan2').getValue(),
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
					fnResetPengajuanKeluar();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab2-1');
					// RELOAD DATA
					grupPengajuanKeluar.load();
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

	// FUNCTION TAB MUTASI KARYAWAN
	function fnResetMutasi() {
		Ext.getCmp('txtTglMasuk3').setValue('');
		Ext.getCmp('txtNIK3').setValue('');
		Ext.getCmp('txtNama3').setValue('');
		Ext.getCmp('txtLokasiLama3').setValue('');
		Ext.getCmp('txtDepartemenLama3').setValue('');
		Ext.getCmp('cboTglMutasi3').setValue('');
		Ext.getCmp('txtLokasiBaru3').setValue('');
		Ext.getCmp('txtKdLokasiBaru3').setValue('');
		Ext.getCmp('txtDepartemenBaru3').setValue('');
		Ext.getCmp('txtKeterangan3').setValue('');
		Ext.getCmp('txtCatatan3').setValue('');
		Ext.getCmp('checkSetuju3').setValue(false);
		Ext.getCmp('btnPrint3').setDisabled(true);
	}

	function fnCekSaveMutasi() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'approvalkaryawan/ceksavemutasi',
				params: {
					'fs_setuju': Ext.getCmp('checkSetuju3').getValue(),
					'fn_nik': Ext.getCmp('txtNIK3').getValue(),
					'fs_lokasi_baru': Ext.getCmp('txtKdLokasiBaru3').getValue()
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
									fnSaveMutasi();
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

	function fnSaveMutasi() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'approvalkaryawan/savemutasi',
			params: {
				'fn_nik': Ext.getCmp('txtNIK3').getValue(),
				'fs_lokasi_baru': Ext.getCmp('txtKdLokasiBaru3').getValue(),
				'fd_tanggal_mutasi': Ext.getCmp('cboTglMutasi3').getValue(),
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
					fnResetMutasi();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[2];
					tabPanel.setActiveTab('tab3-1');
					// RELOAD DATA
					grupMutasiKaryawan.load();
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

	// FUNCTION TAB PERUBAHAN DATA
	function fnCekSavePerubahanData() {
		if (this.up('form').getForm().isValid()) {

		}
	}

	function fnSavePerubahanData() {

	}

	// FUNCTION PRINT PROFIL
	function fnPrintProfil() {
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
						url: 'approvalkaryawan/printprofil',
						params: {
							'fs_kode_dokumen': 'PDK',
							'fn_nik1': Ext.getCmp('txtNIK1').getValue(),
							'fn_nik2': Ext.getCmp('txtNIK2').getValue(),
							'fn_nik3': Ext.getCmp('txtNIK3').getValue()
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

	var frmApprovalKaryawan = Ext.create('Ext.form.Panel', {
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
				title: 'Karyawan Baru',
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
						title: 'Daftar Pengajuan',
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
							title: 'Daftar Pengajuan Karyawan Baru',
							xtype: 'fieldset',
							items: [
								gridPengajuanBaru
							]
						}]
					},{
						id: 'tab1-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Profil Karyawan Baru',
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
										title: 'Biodata',
										xtype: 'fieldset',
										items: [
											txtTglMasuk1,
											txtNIK1,
											txtLokasi1,
											txtDepartemen1,
											txtJabatan1,
											txtNama1,
											txtAlamatKTP1,
											txtAlamatTinggal1
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Catatan',
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
													style: 'padding: 5px;',
													xtype: 'fieldset',
													items: [
														txtCatatan1
													]
												}]
											}]
										}]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Status',
										xtype: 'fieldset',
										items: [
											checkSetuju1
										]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Cetak Data Karyawan',
										xtype: 'fieldset',
										items: [
											btnPrint1
										]
									}]
								}]
							},{
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
											txtTelepon1,
											txtHandphone1,
											txtEmail1,
											txtTmptLahir1,
											txtTglLahir1,
											txtNoNPWP1
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
										items: [
											txtJekel1,
											txtAgama1,
											txtSIMA1,
											txtSIMC1,
											txtNoKTP1
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
										items: [
											txtGolDarah1,
											txtKebangsaan1,
											txtStatusKend1,
											txtStatusTinggal1,
											txtStatPerkawinan1
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
							handler: fnCekSavePengajuanBaru
						},{
							iconCls: 'icon-reset',
							scale: 'medium',
							text: 'Reset',
							handler: fnResetPengajuanBaru
						}]
					}]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Karyawan Keluar',
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
						title: 'Daftar Pengajuan',
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
							title: 'Daftar Pengajuan Karyawan Keluar',
							xtype: 'fieldset',
							items: [
								gridPengajuanKeluar
							]
						}]
					},{
						id: 'tab2-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Profil Karyawan Keluar',
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
										title: 'Biodata',
										xtype: 'fieldset',
										items: [
											txtTglMasuk2,
											txtNIK2,
											txtLokasi2,
											txtDepartemen2,
											txtJabatan2,
											txtNama2,
											txtAlamatKTP2,
											txtAlamatTinggal2
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Catatan',
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
													style: 'padding: 5px;',
													xtype: 'fieldset',
													items: [
														txtCatatan2
													]
												}]
											}]
										}]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Status',
										xtype: 'fieldset',
										items: [
											checkSetuju2
										]
									},{
										anchor: '98%',
										style: 'padding: 5px',
										title: 'Cetak Data Karyawan',
										xtype: 'fieldset',
										items: [
											btnPrint2
										]
									}]
								}]
							},{
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
											txtTelepon2,
											txtHandphone2,
											txtEmail2,
											txtTmptLahir2,
											txtTglLahir2,
											txtNoNPWP2
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
										items: [
											txtJekel2,
											txtAgama2,
											txtSIMA2,
											txtSIMC2,
											txtNoKTP2
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
										items: [
											txtGolDarah2,
											txtKebangsaan2,
											txtStatusKend2,
											txtStatusTinggal2,
											txtStatPerkawinan2
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
							handler: fnCekSavePengajuanKeluar
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: fnResetPengajuanKeluar
						}]
					}]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Mutasi Karyawan',
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
						title: 'Daftar Mutasi Karyawan',
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
							title: 'Daftar Mutasi Karyawan',
							xtype: 'fieldset',
							items: [
								gridMutasiKaryawan
							]
						}]
					},{
						id: 'tab3-2',
						bodyStyle: 'background-color: '.concat(gBasePanel),
						border: false,
						frame: false,
						title: 'Profil Mutasi Karyawan',
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
										title: 'Mutasi Dari',
										xtype: 'fieldset',
										items: [
											txtTglMasuk3,
											txtNIK3,
											txtNama3
										]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Mutasi Dari',
										xtype: 'fieldset',
										items: [
											txtLokasiLama3,
											txtDepartemenLama3
										]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Mutasi Ke',
										xtype: 'fieldset',
										items: [
											cboTglMutasi3,
											txtKdLokasiBaru3,
											txtLokasiBaru3,
											txtDepartemenBaru3
										]
									}]
								},{
									flex: 1,
									layout: 'anchor',
									xtype: 'container',
									items: [{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Catatan',
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
													style: 'padding: 5px;',
													xtype: 'fieldset',
													items: [
														txtKeterangan3,
														txtCatatan3
													]
												}]
											}]
										}]
									},{
										anchor: '98%',
										style: 'padding: 5px;',
										title: 'Status',
										xtype: 'fieldset',
										items: [
											checkSetuju3
										]
									},{
										anchor: '98%',
										style: 'padding: 5px',
										title: 'Cetak Data Karyawan',
										xtype: 'fieldset',
										items: [
											btnPrint3
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
							handler: fnCekSaveMutasi
						},{
							iconCls: 'icon-reset',
							text: 'Reset',
							scale: 'medium',
							handler: fnResetMutasi
						}]
					}]
				}]
			},{
				id: 'tab4',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Perubahan Data',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Perubahan Data',
					xtype: 'fieldset',
					items: [
						gridPerubahanData
					]
				}]
			}]
		}]	
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmApprovalKaryawan
	});

	function fnMaskShow() {
		frmApprovalKaryawan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmApprovalKaryawan.unmask();
	}
	
	frmApprovalKaryawan.render(Ext.getBody());
	Ext.get('loading').destroy();

});