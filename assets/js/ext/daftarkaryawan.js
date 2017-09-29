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

	Ext.define('DataGridKaryawan', {
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
			{name: 'fs_golongan_darah', type: 'string'},
			{name: 'fs_status', type: 'string'},
		]	
	});

	var grupKaryawan = Ext.create('Ext.data.Store', {
		autoLoad: true,
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
			url: 'daftarkaryawan/gridkaryawan'
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
		height: 450,
		sortableColumns: false,
		store: grupKaryawan,
		columns: [{
			xtype: 'rownumberer',
			width: 45
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
			text: 'Tanggal Masuk',
			dataIndex: 'fd_tanggal_masuk',
			menuDisabled: true,
			locked: true,
			width: 90,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Status',
			dataIndex: 'fs_status',
			menuDisabled: true, 
			width: 145
		},{
			text: 'Tanggal Lahir',
			dataIndex: 'fd_tanggal_lahir',
			menuDisabled: true,
			width: 80,
			renderer: Ext.util.Format.dateRenderer('d-m-Y')
		},{
			text: 'Alamat Tinggal',
			dataIndex: 'fs_alamat_tinggal',
			menuDisabled: true, 
			width: 550
		},{
			text: 'Jenis Kelamin',
			dataIndex: 'fs_jenis_kelamin',
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
			text: 'Tempat Tinggal',
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
			text: 'Kendaraan',
			dataIndex: 'fs_status_kendaraan',
			menuDisabled: true,
			hidden: true			
		},{
			text: 'Status',
			dataIndex: 'fs_status_nikah',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Departemen',
			dataIndex: 'fs_kode_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Departemen',
			dataIndex: 'fs_nama_departemen',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Jabatan',
			dataIndex: 'fs_kode_jabatan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Jabatan',
			dataIndex: 'fs_nama_jabatan',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Kode Shift',
			dataIndex: 'fs_kode_shift',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Nama Shift',
			dataIndex: 'fs_nama_shift',
			menuDisabled: true,
			hidden: true
		}],
		tbar: [{
			flex: 1.4,
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
					grupKaryawan.load();
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
			store: grupKaryawan
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('txtNIK').setValue(record.get('fn_nik'));
				// SET NIK SESUAI TAB
				Ext.getCmp('txtNIK_3').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNIK_4').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNIK_5').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNIK_6').setValue(record.get('fn_nik'));
				Ext.getCmp('txtNIK_9').setValue(record.get('fn_nik'));

				// SET RECORD IN TAB PROFIL
				Ext.getCmp('cboTglMasuk').setValue(record.get('fd_tanggal_masuk'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('cboLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdDepartemen').setValue(record.get('fs_kode_departemen'));
				Ext.getCmp('cboDepartemen').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtKdJabatan').setValue(record.get('fs_kode_jabatan'));
				Ext.getCmp('cboJabatan').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtKdShift').setValue(record.get('fs_kode_shift'));
				Ext.getCmp('cboShift').setValue(record.get('fs_nama_shift'));
				Ext.getCmp('txtNama').setValue(record.get('fs_nama_karyawan'));
				Ext.getCmp('txtAlamatKTP').setValue(record.get('fs_alamat_ktp'));
				Ext.getCmp('txtAlamatTinggal').setValue(record.get('fs_alamat_tinggal'));
				Ext.getCmp('txtTelepon').setValue(record.get('fs_no_tlp'));
				Ext.getCmp('txtHandphone').setValue(record.get('fs_no_hp'));
				Ext.getCmp('txtEmail').setValue(record.get('fs_email_pribadi'));
				Ext.getCmp('txtTmptLahir').setValue(record.get('fs_tempat_lahir'));
				Ext.getCmp('txtTglLahir').setValue(record.get('fd_tanggal_lahir'));
				Ext.getCmp('cboJekel').setValue(record.get('fs_jenis_kelamin'));
				Ext.getCmp('cboAgama').setValue(record.get('fs_agama'));
				Ext.getCmp('cboGolDarah').setValue(record.get('fs_gol_darah'));
				Ext.getCmp('cboKebangsaan').setValue(record.get('fs_kebangsaan'));
				Ext.getCmp('cboStatusTinggal').setValue(record.get('fs_tempat_tinggal'));
				Ext.getCmp('txtNoKTP').setValue(record.get('fn_no_ktp'));
				Ext.getCmp('txtNoNPWP').setValue(record.get('fn_no_npwp'));
				Ext.getCmp('txtSIMA').setValue(record.get('fn_sim_a'));
				Ext.getCmp('txtSIMC').setValue(record.get('fn_sim_c'));
				Ext.getCmp('cboStatusKend').setValue(record.get('fs_status_kendaraan'));
				Ext.getCmp('cboStatPerkawinan').setValue(record.get('fs_status_nikah'));

				Ext.getCmp('btnUpload').setDisabled(false);

				// LOAD IMAGE PHOTO
				dataImg.load();

				// LOAD DETAIL DATA
				fnLoad();

				// ENABLED BUTTON
				Ext.getCmp('btnPrint').setDisabled(false);

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');

				// SET ENABLED TABPANEL
				Ext.getCmp('tab3').setDisabled(false);
				Ext.getCmp('tab4').setDisabled(false);
				Ext.getCmp('tab5').setDisabled(false);
				Ext.getCmp('tab6').setDisabled(false);
				Ext.getCmp('tab7').setDisabled(false);
				Ext.getCmp('tab8').setDisabled(false);
				Ext.getCmp('tab9').setDisabled(false);
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

	var grupLokasi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_lokasi','fs_nama_lokasi',
			'fs_alamat_lokasi','fs_no_tlp'
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
			url: 'daftarkaryawan/gridlokasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariLokasi').getValue()
				});
			}
		}
	});

	var grupDepartemen = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_departemen','fs_nama_departemen'
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
			url: 'daftarkaryawan/griddepartemen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariDepartemen').getValue()
				});
			}
		}
	});

	var grupJabatan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_jabatan','fs_kode_perusahaan',
			'fs_nama_jabatan'
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
			url: 'daftarkaryawan/gridjabatan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariJabatan').getValue()
				});
			}
		}
	});

	var grupShift = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_shift', 'fs_nama_shift',
			'ft_jam_masuk', 'ft_jam_pulang'
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
			url: 'daftarkaryawan/gridshift'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariShift').getValue()
				});
			}
		}
	});

	var grupPendukung = Ext.create('Ext.data.Store', {
		autoLoad: false,
		fields: [
			'fs_kode_dokumen','fs_nama_dokumen'
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
			url: 'daftarkaryawan/griddokumen'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariDokumen').getValue()
				});
			}
		}
	});

	// POPUP FORM BIODATA
	var winGrid1 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupLokasi,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Lokasi", dataIndex: 'fs_kode_lokasi', menuDisabled: true, flex: 1},
			{text: "Nama Lokasi", dataIndex: 'fs_nama_lokasi', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Lokasi',
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
					grupLokasi.load();
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
			store: grupLokasi,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari1.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtKdLokasi').setValue(record.get('fs_kode_lokasi'));
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
				grupLokasi.load();
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
		store: grupDepartemen,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Departemen", dataIndex: 'fs_kode_departemen', menuDisabled: true, flex: 1},
			{text: "Nama Departemen", dataIndex: 'fs_nama_departemen', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Departemen',
				id: 'txtCariDepartemen',
				name: 'txtCariDepartemen',
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
					grupDepartemen.load();
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
			store: grupDepartemen,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari2.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboDepartemen').setValue(record.get('fs_nama_departemen'));
				Ext.getCmp('txtKdDepartemen').setValue(record.get('fs_kode_departemen'));
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
				grupDepartemen.load();
				vMask.show();
			}
		}
	});

	var winGrid3 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupJabatan,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Jabatan", dataIndex: 'fs_kode_jabatan', menuDisabled: true, flex: 1},
			{text: "Nama Jabatan", dataIndex: 'fs_nama_jabatan', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Jabatan',
				id: 'txtCariJabatan',
				name: 'txtCariJabatan',
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
					grupJabatan.load();
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
			store: grupJabatan,
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
				Ext.getCmp('cboJabatan').setValue(record.get('fs_nama_jabatan'));
				Ext.getCmp('txtKdJabatan').setValue(record.get('fs_kode_jabatan'));
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
				grupJabatan.load();
				vMask.show();
			}
		}
	});

	var winGrid4 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupShift,
		columns: [
			{xtype: 'rownumberer', width: 25},
			{text: "Kode Shift", dataIndex: 'fs_kode_shift', menuDisabled: true, flex: 1},
			{text: "Nama Shift", dataIndex: 'fs_nama_shift', menuDisabled: true, flex: 2},
			{text: "Masuk", dataIndex: 'ft_jam_masuk', menuDisabled: true, flex: 0.6},
			{text: "Pulang", dataIndex: 'ft_jam_pulang', menuDisabled: true, flex: 0.6}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Shift',
				id: 'txtCariShift',
				name: 'txtCariShift',
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
					grupShift.load();
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
			store: grupShift,
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
				Ext.getCmp('cboShift').setValue(record.get('fs_nama_shift'));
				Ext.getCmp('txtKdShift').setValue(record.get('fs_kode_shift'));
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
				grupShift.load();
				vMask.show();
			}
		}
	});

	// POPUP FORM DATA PENDUKUNG
	var winGrid5 = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		autoDestroy: true,
		height: 450,
		width: 550,
		sortableColumns: false,
		store: grupPendukung,
		columns: [
			{xtype: 'rownumberer', width: 45},
			{text: "Kode Dokumen", dataIndex: 'fs_kode_dokumen', menuDisabled: true, flex: 1},
			{text: "Nama Dokumen", dataIndex: 'fs_nama_dokumen', menuDisabled: true, flex: 2}
		],
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Dokumen',
				id: 'txtCariDokumen',
				name: 'txtCariDokumen',
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
					grupPendukung.load();
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
			store: grupPendukung,
			items:[
				'-', {
				text: 'Exit',
				handler: function() {
					winCari5.hide();
				}
			}]
		}),
		listeners: {
			itemdblclick: function(grid, record)
			{
				Ext.getCmp('cboJnsPendukung').setValue(record.get('fs_kode_dokumen'));
				Ext.getCmp('txtNamaPendukung').setValue(record.get('fs_nama_dokumen'));
				winCari5.hide();
			}
		},
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false
		}
	});

	var winCari5 = Ext.create('Ext.window.Window', {
		border: false,
		closable: false,
		draggable: true,
		frame: false,
		layout: 'fit',
		plain: true,
		resizable: false,
		title: 'Searching...',
		items: [
			winGrid5
		],
		listeners: {
			beforehide: function() {
				vMask.hide();
			},
			beforeshow: function() {
				grupPendukung.load();
				vMask.show();
			}
		}
	});

	// GROUP SELECT 'TM_REFERENSI'
	var grupJenisKelamin = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'jenis_kelamin'
				});
			}
		}
	});

	var grupAgama = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'agama'
				});
			}
		}
	});

	var grupGolDarah = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'golongan_darah'
				});
			}
		}
	});

	var grupKebangsaan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'kebangsaan'
				});
			}
		}
	});

	var grupKendaraan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_kendaraan'
				});
			}
		}
	});

	var grupKendaraan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_kendaraan'
				});
			}
		}
	});

	var grupRumah = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_rumah'
				});
			}
		}
	});

	var grupNikah = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_nikah'
				});
			}
		}
	});

	var grupAnggotaKel = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'anggota_keluarga'
				});
			}
		}
	});

	var grupPosisiKel = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'posisi_keluarga'
				});
			}
		}
	});

	var grupUmur = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'range_umur'
				});
			}
		}		
	});

	var grupTingkatPendidikan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pendidikan'
				});
			}
		}
	});

	var grupStatPendidikan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'status_pendidikan'
				});
			}
		}
	});

	var grupPekerjaan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'pekerjaan'
				});
			}
		}
	});

	var grupJenisBahasa = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'bahasa'
				});
			}
		}
	});

	var grupTingkatan = Ext.create('Ext.data.Store', {
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
			url: 'daftarkaryawan/select'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_kode_referensi': 'tingkatan'
				});
			}
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
			url: 'daftarkaryawan/combo'
		}
	});

	// GROUP DETAIL KARYAWAN
	Ext.define('DataGridPerkawinan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_posisi_perkawinan', type: 'string'},
			{name: 'fs_nama_perkawinan', type: 'string'},
			{name: 'fs_jenis_kelamin', type: 'string'},
			{name: 'fn_usia', type: 'string'},
			{name: 'fs_pendidikan', type: 'string'},
			{name: 'fs_pekerjaan', type: 'string'}
		]
	});

	var grupPerkawinan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPerkawinan',
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
			url: 'daftarkaryawan/gridperkawinan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK').getValue()
				});
			}
		}
	});

	Ext.define('DataGridKeluarga', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_posisi_keluarga', type: 'string'},
			{name: 'fs_nama_keluarga', type: 'string'},
			{name: 'fs_jenis_kelamin', type: 'string'},
			{name: 'fn_usia', type: 'string'},
			{name: 'fs_pendidikan', type: 'string'},
			{name: 'fs_pekerjaan', type: 'string'}
		]
	});

	var grupKeluarga = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKeluarga',
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
			url: 'daftarkaryawan/gridkeluarga'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK').getValue()
				});
			}
		}
	});

	Ext.define('DataGridPendidikan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_tingkat_pendidikan', type: 'string'},
			{name: 'fs_nama_sekolah', type: 'string'},
			{name: 'fs_tempat_sekolah', type: 'string'},
			{name: 'fs_jurusan', type: 'string'},
			{name: 'fn_dari_tahun', type: 'string'},
			{name: 'fn_sampai_tahun', type: 'string'},
			{name: 'fs_status', type: 'string'}
		]
	});

	var grupPendidikan = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPendidikan',
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
			url: 'daftarkaryawan/gridpendidikan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_3').getValue()
				});
			}
		}
	});

	Ext.define('DataGridKursus', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_jenis_kursus', type: 'string'},
			{name: 'fs_tempat_kursus', type: 'string'},
			{name: 'fs_penyelenggara', type: 'string'},
			{name: 'fn_lama_kursus', type: 'string'},
			{name: 'fn_tahun_kursus', type: 'string'},
			{name: 'fs_biaya_oleh', type: 'string'}
		]
	});

	var grupKursus = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridKursus',
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
			url: 'daftarkaryawan/gridkursus'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_3').getValue()
				});
			}
		}
	});

	Ext.define('DataGridBahasa', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_jenis_bahasa', type: 'string'},
			{name: 'fs_nilai_dengar', type: 'string'},
			{name: 'fs_nilai_baca', type: 'string'},
			{name: 'fs_nilai_bicara', type: 'string'},
			{name: 'fs_nilai_tulis', type: 'string'}
		]
	});

	var grupBahasa = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridBahasa',
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
			url: 'daftarkaryawan/gridbahasa'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_3').getValue()
				});
			}
		}
	});

	Ext.define('DataGridOrganisasi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_organisasi', type: 'string'},
			{name: 'fs_kegiatan', type: 'string'},
			{name: 'fn_tahun', type: 'string'},
			{name: 'fs_jabatan_organisasi', type: 'string'}
		]
	});

	var grupOrganisasi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridOrganisasi',
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
			url: 'daftarkaryawan/gridorganisasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_3').getValue()
				});
			}
		}
	});

	Ext.define('DataGridPengalaman', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_perusahaan', type: 'string'},
			{name: 'fs_alamat_perusahaan', type: 'string'},
			{name: 'fs_jenis_usaha', type: 'string'},
			{name: 'fn_jumlah_karyawan', type: 'string'},
			{name: 'fs_nama_atasan', type: 'string'},
			{name: 'fs_nama_direktur', type: 'string'},
			{name: 'fn_gaji_terakhir', type: 'string'},
			{name: 'fs_alasan_berhenti', type: 'string'}
		]
	});

	var grupPengalamanKerja = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridPengalaman',
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
			url: 'daftarkaryawan/gridpengalaman'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_4').getValue()
				});
			}
		}
	});

	Ext.define('DataGridReferensi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_referensi', type: 'string'},
			{name: 'fs_no_tlp_ref', type: 'string'},
			{name: 'fs_hubungan_referensi', type: 'string'},
			{name: 'fs_jabatan_referensi', type: 'string'}
		]
	});

	var grupReferensi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridReferensi',
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
			url: 'daftarkaryawan/gridreferensi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_4').getValue()
				});
			}
		}
	});

	Ext.define('DataGridDihubungi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama_dihubungi', type: 'string'},
			{name: 'fs_no_tlp_dihub', type: 'string'},
			{name: 'fs_hubungan_dihubungi', type: 'string'},
			{name: 'fs_jabatan_dihubungi', type: 'string'}
		]
	});

	var grupDihubungi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridDihubungi',
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
			url: 'daftarkaryawan/griddihubungi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_4').getValue()
				});
			}
		}
	});

	Ext.define('DataGridDataPendukung', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_jenis_datapendukung', type: 'string'},
			{name: 'fs_nama_datapendukung', type: 'string'},
			{name: 'fs_file_datapendukung', type: 'string'}
		]
	});

	var grupDataPendukung = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridDataPendukung',
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
			url: 'daftarkaryawan/griddatapendukung'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_5').getValue()
				});
			}
		}
	});

	Ext.define('DataGridSertifikasi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_jenis_sertifikasi', type: 'string'},
			{name: 'fs_nama_sertifikasi', type: 'string'}
		]
	});

	var grupSertifikasi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridSertifikasi',
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
			url: 'daftarkaryawan/gridsertifikasi'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fn_nik': Ext.getCmp('txtNIK_6').getValue()
				});
			}
		}
	});

	Ext.define('DataGridHistoryMutasi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fd_tanggal_mutasi', type: 'string'},
			{name: 'fs_dari_lokasi', type: 'string'},
			{name: 'fs_ke_lokasi', type: 'string'},
			{name: 'fs_catatan_mutasi', type: 'string'}
		]
	});

	var grupHistoryMutasi = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridHistoryMutasi',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'daftarkaryawan/gridhistorymutasi'
		}
	});

	Ext.define('DataGridHistoyPerubahanData', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fd_tanggal', type: 'string'},
			{name: 'fs_oleh', type: 'string'},
			{name: 'fs_sebelum_perubahan', type: 'string'},
			{name: 'fs_setelah_perubahan', type: 'string'}
		]
	});

	var grupHistoyPerubahanData = Ext.create('Ext.data.Store', {
		autoLoad: false,
		model: 'DataGridHistoyPerubahanData',
		proxy: {
			actionMethods: {
				read: 'POST'
			},
			reader: {
				type: 'json'
			},
			type: 'ajax',
			url: 'daftarkaryawan/gridhistoryperubahan'
		}
	});

	// COMPONENT FORM BIODATA
	var cboTglMasuk = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Masuk',
		format: 'd-m-Y',
		id: 'cboTglMasuk',
		name: 'cboTglMasuk',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtNIK = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'NIK',
		emptyText: '',
		id: 'txtNIK',
		name: 'txtNIK',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '10',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
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

	var cboDepartemen = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Departemen',
		fieldLabel: 'Departemen',
		editable: false,
		id: 'cboDepartemen',
		name: 'cboDepartemen',
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

	var txtKdDepartemen = {
		id: 'txtKdDepartemen',
		name: 'txtKdDepartemen',
		xtype: 'textfield',
		hidden: true
	};

	var cboJabatan = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Jabatan',
		fieldLabel: 'Jabatan',
		editable: false,
		id: 'cboJabatan',
		name: 'cboJabatan',
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

	var txtKdJabatan = {
		id: 'txtKdJabatan',
		name: 'txtKdJabatan',
		xtype: 'textfield',
		hidden: true
	};

	var cboShift = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		emptyText: 'Shift',
		fieldLabel: 'Shift',
		editable: false,
		id: 'cboShift',
		name: 'cboShift',
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

	var txtKdShift = {
		id: 'txtKdShift',
		name: 'txtKdShift',
		xtype: 'textfield',
		hidden: true
	};

	var txtNama = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Karyawan',
		fieldStyle: 'text-transform: uppercase;',
		emptyText: '',
		id: 'txtNama',
		name: 'txtNama',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatKTP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat KTP',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatKTP',
		name: 'txtAlamatKTP',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatTinggal = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat Tinggal',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatTinggal',
		name: 'txtAlamatTinggal',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var btnPrint = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnPrint',
		name: 'btnPrint',
		scale: 'medium',
		text: 'Cetak Data Karyawan',
		xtype: 'button',
		disabled: true,
		handler: fnPrintProfil
	};

	var txtTelepon = {
		anchor: '100%',
		fieldLabel: 'No. Telepon',
		emptyText: '',
		id: 'txtTelepon',
		name: 'txtTelepon',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtHandphone = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		fieldLabel: 'No. Handphone',
		emptyText: '',
		id: 'txtHandphone',
		name: 'txtHandphone',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var cboJekel = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Jenis Kelamin',
		id: 'cboJekel',
		name: 'cboJekel',
		store: grupJenisKelamin,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtTmptLahir = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Tempat Lahir',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtTmptLahir',
		name: 'txtTmptLahir',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtTglLahir = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		editable: true,
		fieldLabel: 'Tanggal Lahir',
		format: 'd-m-Y',
		id: 'txtTglLahir',
		name: 'txtTglLahir',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -75),
		xtype: 'datefield'
	};

	var cboAgama = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Agama',
		id: 'cboAgama',
		name: 'cboAgama',
		store: grupAgama,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboKebangsaan = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Kebangsaan',
		id: 'cboKebangsaan',
		name: 'cboKebangsaan',
		store: grupKebangsaan,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtEmail = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Email',
		emptyText: '',
		id: 'txtEmail',
		name: 'txtEmail',
		xtype: 'textfield'
	};

	var cboGolDarah = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Golongan Darah',
		id: 'cboGolDarah',
		name: 'cboGolDarah',
		store: grupGolDarah,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboStatusTinggal = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status Tempat Tinggal',
		id: 'cboStatusTinggal',
		name: 'cboStatusTinggal',
		store: grupRumah,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var txtSIMA = {
		anchor: '100%',
		fieldLabel: 'SIM A',
		id: 'txtSIMA',
		name: 'txtSIMA',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtSIMC = {
		anchor: '100%',
		fieldLabel: 'SIM C',
		id: 'txtSIMC',
		name: 'txtSIMC',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '15',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoKTP = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'KTP No.',
		id: 'txtNoKTP',
		name: 'txtNoKTP',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '16',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNoNPWP = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		fieldLabel: 'NPWP No.',
		id: 'txtNoNPWP',
		name: 'txtNoNPWP',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '16',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtJnsKend = {
		anchor: '100%',
		fieldLabel: 'Jenis Kendaraan',
		id: 'txtJnsKend',
		name: 'txtJnsKend',
		xtype: 'textfield'
	};

	var txtThnKend = {
		anchor: '100%',
		fieldLabel: 'Tahun Kendaraan',
		id: 'txtThnKend',
		name: 'txtThnKend',
		xtype: 'textfield'
	};

	var cboStatusKend = {
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status Kendaraan',
		id: 'cboStatusKend',
		name: 'cboStatusKend',
		store: grupKendaraan,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboStatPerkawinan = {
		//afterLabelTextTpl: required,
		//allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Status',
		id: 'cboStatPerkawinan',
		name: 'cboStatPerkawinan',
		store: grupNikah,
		valueField: 'fs_kode',
		xtype: 'combobox'	
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
			url: 'daftarkaryawan/photokaryawan'
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

	var filePhoto = {
		anchor : '100%',
		emptyText: 'Select File Image',
		id: 'filePhoto',
		name: 'filePhoto',
		xtype: 'fileuploadfield',
		buttonCfg: {
			text: 'Browse',
			iconCls: 'upload-icon'
		}
	};

	var btnUpload = {
		id: 'btnUpload',
		name: 'btnUpload',
		anchor: '100%',
		scale: 'small',
		iconCls: 'icon-add',
		xtype: 'button',
		text: 'Upload',
		disabled: true,
		handler: function () {
			var form = this.up('form').getForm();
			form.submit({
				clientValidation: false,
				url: 'daftarkaryawan/uploadphoto',
				waitMsg: 'Uploading your file...',
				success: function (form, action) {
					var result = action.result; 
					var data = result.data;
					var name = data.name;
					var message = Ext.String.format('<b>Message:</b> {0}<br>'+'<b>File:</b> {1}', result.msg, name);
					Ext.Msg.alert('Success', message);
					// AFTER UPLOAD REFRESH IMAGE Photo
					dataImg.load();
				},
				failure: function (form, action) {
					Ext.Msg.alert('Failure', action.result.msg);
				}
			});
		}
	};

	var btnLoad = {
		anchor: '100%',
		fieldLabel: '',
		id: 'btnLoad',
		name: 'btnLoad',
		scale: 'medium',
		text: 'Load Data',
		xtype: 'button',
		handler: fnLoad
	};

	// COMPONENT FORM STATUS PERKAWINAN
	var gridPerkawinan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupPerkawinan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_posisi_perkawinan',
			text: 'Posisi Keluarga',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_perkawinan',
			text: 'Nama',
			flex: 1.2,
			menuDisabled: true
		},{
			align: 'center',
			dataIndex: 'fs_jekel',
			text: 'L / P',
			flex: 0.25,
			menuDisabled: true,
		},{
			align: 'center',
			dataIndex: 'fn_usia',
			text: 'Usia',
			flex: 0.25,
			menuDisabled: true,
		},{
			dataIndex: 'fs_pendidikan',
			text: 'Pendidikan',
			flex: 0.65,
			menuDisabled: true,
		},{
			dataIndex: 'fs_pekerjaan',
			text: 'Pekerjaan',
			flex: 0.65,
			menuDisabled: true,
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPerkawinan
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridPerkawinan.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingPerk
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipPerk
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Posisi',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboPosisiPerk',
				name: 'cboPosisiPerk',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupPosisiKel,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama',
				fieldLabel: 'Nama',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaPerk',
				name: 'txtNamaPerk',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'L / P',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboJekelPerk',
				name: 'cboJekelPerk',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupJenisKelamin,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Usia',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboUsiaPerk',
				name: 'cboUsiaPerk',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupUmur,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.65,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Pendidikan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboPendPerk',
				name: 'cboPendPerk',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatPendidikan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.65,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Pekerjaan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboPkrjPerk',
				name: 'cboPkrjPerk',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupPekerjaan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupPerkawinan.getCount();

					var data = Ext.create('DataGridPerkawinan', {
						fs_posisi_perkawinan: Ext.getCmp('cboPosisiPerk').getValue(),
						fs_nama_perkawinan: Ext.getCmp('txtNamaPerk').getValue(),
						fs_jekel: Ext.getCmp('cboJekelPerk').getValue(),
						fn_usia: Ext.getCmp('cboUsiaPerk').getValue(),
						fs_pendidikan: Ext.getCmp('cboPendPerk').getValue(),
						fs_pekerjaan: Ext.getCmp('cboPkrjPerk').getValue()
					});

					var posisi_perk = Ext.getCmp('cboPosisiPerk').getValue();
					if (posisi_perk === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Posisi belum diisi',
							title: 'HRD'
						});
						return;
					}

					var nama_perk = Ext.getCmp('txtNamaPerk').getValue();
					if (nama_perk === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama belum diisi',
							title: 'HRD'
						});
						return;
					}
					
					var jekel_perk = Ext.getCmp('cboJekelPerk').getValue();
					if (jekel_perk === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jenis kelamin belum diisi',
							title: 'HRD'
						});
						return;
					}
					
					var usia_perk = Ext.getCmp('cboUsiaPerk').getValue();
					if (usia_perk === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Usia belum diisi',
							title: 'HRD'
						});
						return;
					}

					var pend_perk = Ext.getCmp('cboPendPerk').getValue();
					if (pend_perk === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Pendidikan belum diisi',
							title: 'HRD'
						});
						return;
					}
					
					var pkr_perk = Ext.getCmp('cboPkrjPerk').getValue();
					if (pkr_perk === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Pekerjaan belum diisi',
							title: 'HRD'
						});
						return;
					}

					grupPerkawinan.insert(total, data);

					Ext.getCmp('cboPosisiPerk').setValue('');
					Ext.getCmp('txtNamaPerk').setValue('');
					Ext.getCmp('cboJekelPerk').setValue('');
					Ext.getCmp('cboUsiaPerk').setValue('');
					Ext.getCmp('cboPendPerk').setValue('');
					Ext.getCmp('cboPkrjPerk').setValue('');

					total = grupPerkawinan.getCount() - 1;	
					gridPerkawinan.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {

					var sm = gridPerkawinan.getSelectionModel();
					grupPerkawinan.remove(sm.getSelection());
					gridPerkawinan.getView().refresh();
					if (grupPerkawinan.getCount() > 0) {
						sm.select(0);
					}

				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM KELUARGA
	var gridKeluarga = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupKeluarga,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_posisi_keluarga',
			text: 'Posisi Keluarga',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_keluarga',
			text: 'Nama Keluarga',
			flex: 1.2,
			menuDisabled: true
		},{
			align: 'center',
			dataIndex: 'fs_jekel',
			text: 'L / P',
			flex: 0.25,
			menuDisabled: true,
		},{
			align: 'center',
			dataIndex: 'fn_usia',
			text: 'Usia',
			flex: 0.25,
			menuDisabled: true,
		},{
			dataIndex: 'fs_pendidikan',
			text: 'Pendidikan',
			flex: 0.65,
			menuDisabled: true,
		},{
			dataIndex: 'fs_pekerjaan',
			text: 'Pekerjaan',
			flex: 0.65,
			menuDisabled: true,
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKeluarga
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridKeluarga.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingKel
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipKel
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Posisi',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboPosisiKel',
				name: 'cboPosisiKel',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupAnggotaKel,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1.2,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama Keluarga',
				fieldLabel: 'Nama',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaKel',
				name: 'txtNamaKel',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'L / P',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboJekelKel',
				name: 'cboJekelKel',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupJenisKelamin,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Usia',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboUsiaKel',
				name: 'cboUsiaKel',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupUmur,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.65,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Pendidikan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboPendKel',
				name: 'cboPendKel',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatPendidikan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.65,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Pekerjaan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboPkrjKel',
				name: 'cboPkrjKel',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupPekerjaan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupKeluarga.getCount();
					var data = Ext.create('DataGridKeluarga', {
						fs_posisi_keluarga: Ext.getCmp('cboPosisiKel').getValue(),
						fs_nama_keluarga: Ext.getCmp('txtNamaKel').getValue(),
						fs_jekel: Ext.getCmp('cboJekelKel').getValue(),
						fn_usia: Ext.getCmp('cboUsiaKel').getValue(),
						fs_pendidikan: Ext.getCmp('cboPendKel').getValue(),
						fs_pekerjaan: Ext.getCmp('cboPkrjKel').getValue()
					});

					var posisi_kel = Ext.getCmp('cboPosisiKel').getValue();
					if (posisi_kel === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Posisi belum diisi',
							title: 'HRD'
						});
						return;
					}

					var nama_kel = Ext.getCmp('txtNamaKel').getValue();
					if (nama_kel === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama belum diisi',
							title: 'HRD'
						});
						return;
					}

					var jekel_kel = Ext.getCmp('cboJekelKel').getValue();
					if (jekel_kel === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jenis kelamin belum diisi',
							title: 'HRD'
						});
						return;
					}

					var usia_kel = Ext.getCmp('cboUsiaKel').getValue();
					if (usia_kel === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Usia belum diisi',
							title: 'HRD'
						});
						return;
					}

					var pend_kel = Ext.getCmp('cboPendKel').getValue();
					if (pend_kel === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Pendidikan belum diisi',
							title: 'HRD'
						});
						return;
					}

					var pkr_kel = Ext.getCmp('cboPkrjKel').getValue();
					if (pkr_kel === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Pekerjaan belum diisi',
							title: 'HRD'
						});
						return;
					}

					grupKeluarga.insert(total, data);

					Ext.getCmp('cboPosisiKel').setValue('');
					Ext.getCmp('txtNamaKel').setValue('');
					Ext.getCmp('cboJekelKel').setValue('');
					Ext.getCmp('cboUsiaKel').setValue('');
					Ext.getCmp('cboPendKel').setValue('');
					Ext.getCmp('cboPkrjKel').setValue('');

					total = grupKeluarga.getCount() - 1;
					gridKeluarga.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridKeluarga.getSelectionModel();
					grupKeluarga.remove(sm.getSelection());
					gridKeluarga.getView().refresh();
					
					if (grupKeluarga.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM PENDIDIKAN
	var gridPendidikan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupPendidikan,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_tingkat_pendidikan',
			text: 'Tingkat',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_sekolah',
			text: 'Nama Sekolah',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_tempat_sekolah',
			text: 'Tempat / Kota',
			flex: 0.5,
			menuDisabled: true,
		},{
			dataIndex: 'fs_jurusan',
			text: 'Jurusan',
			flex: 0.5,
			menuDisabled: true,
		},{
			dataIndex: 'fn_dari_tahun',
			text: 'Dari',
			flex: 0.25,
			menuDisabled: true,
		},{
			dataIndex: 'fn_sampai_tahun',
			text: 'Sampai',
			flex: 0.25,
			menuDisabled: true,
		},{
			dataIndex: 'fs_status',
			text: 'Status',
			flex: 0.5,
			menuDisabled: true,
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPendidikan
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridPendidikan.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingPend
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipPend
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				id: 'txtNIK_3',
				name: 'txtNIK_3',
				xtype: 'textfield',
				hidden: true
			},{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Tingkat',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboTingkatPend',
				name: 'cboTingkatPend',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatPendidikan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama Sekolah',
				fieldLabel: 'Nama Sekolah',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaSeko',
				name: 'txtNamaSeko',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Kota',
				fieldLabel: 'Tempat / Kota',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtTmptSeko',
				name: 'txtTmptSeko',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Jurusan',
				fieldLabel: 'Jurusan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtJursSeko',
				name: 'txtJursSeko',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				fieldLabel: 'Dari',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtDariSeko',
				name: 'txtDariSeko',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '4',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				fieldLabel: 'Sampai',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtSmpSeko',
				name: 'txtSmpSeko',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '4',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Status',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboStatSeko',
				name: 'cboStatSeko',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupStatPendidikan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupPendidikan.getCount();

					var data = Ext.create('DataGridPendidikan', {
						fs_tingkat_pendidikan: Ext.getCmp('cboTingkatPend').getValue(),
						fs_nama_sekolah: Ext.getCmp('txtNamaSeko').getValue(),
						fs_tempat_sekolah: Ext.getCmp('txtTmptSeko').getValue(),
						fs_jurusan: Ext.getCmp('txtJursSeko').getValue(),
						fn_dari_tahun: Ext.getCmp('txtDariSeko').getValue(),
						fn_sampai_tahun: Ext.getCmp('txtSmpSeko').getValue(),
						fs_status: Ext.getCmp('cboStatSeko').getValue()
					});

					var tingkat_pend = Ext.getCmp('cboTingkatPend').getValue();
					if (tingkat_pend === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tingkat Pendidikan, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nama_sek = Ext.getCmp('txtNamaSeko').getValue();
					if (nama_sek === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama Sekolah, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var tempat_sek = Ext.getCmp('txtTmptSeko').getValue();
					if (tempat_sek === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tempat/Kota Sekolah, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var dari_sek = Ext.getCmp('txtDariSeko').getValue();
					if (dari_sek === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Dari Tahun, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var sampai_sek = Ext.getCmp('txtSmpSeko').getValue();
					if (sampai_sek === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Sampai Tahun, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var status_sek = Ext.getCmp('cboStatSeko').getValue();
					if (status_sek === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Status Lulus, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupPendidikan.insert(total, data);

					Ext.getCmp('cboTingkatPend').setValue('');
					Ext.getCmp('txtNamaSeko').setValue('');
					Ext.getCmp('txtTmptSeko').setValue('');
					Ext.getCmp('txtJursSeko').setValue('');
					Ext.getCmp('txtDariSeko').setValue('');
					Ext.getCmp('txtSmpSeko').setValue('');
					Ext.getCmp('cboStatSeko').setValue('');

					total = grupPendidikan.getCount() - 1;
					gridPendidikan.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridPendidikan.getSelectionModel();
					grupPendidikan.remove(sm.getSelection());
					gridPendidikan.getView().refresh();

					if (grupPendidikan.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM KURSUS
	var gridKursus = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupKursus,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_jenis_kursus',
			text: 'Bidang / Jenis',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_penyelenggara',
			text: 'Penyelenggara',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_tempat_kursus',
			text: 'Tempat / Kota',
			flex: 0.5,
			menuDisabled: true,
		},{
			dataIndex: 'fn_lama_kursus',
			text: 'Lama',
			flex: 0.25,
			menuDisabled: true,
		},{
			dataIndex: 'fn_tahun_kursus',
			text: 'Tahun',
			flex: 0.30,
			menuDisabled: true,
		},{
			dataIndex: 'fs_biaya_oleh',
			text: 'Dibiayai oleh',
			flex: 0.5,
			menuDisabled: true,
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupKursus
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridKursus.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingKurs
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipKurs
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Bidang / Jenis',
				fieldLabel: 'Bidang / Jenis',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtBidangKurs',
				name: 'txtBidangKurs',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Penyelenggara',
				fieldLabel: 'Penyelenggara',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtPenyeKurs',
				name: 'txtPenyeKurs',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Kota',
				fieldLabel: 'Tempat / Kota',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtTmptKurs',
				name: 'txtTmptKurs',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.25,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Lama',
				id: 'txtLamaKurs',
				name: 'txtLamaKurs',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '4',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.30,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Tahun',
				id: 'txtThnKurs',
				name: 'txtThnKurs',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '4',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Dibiayai oleh',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtBiayaKurs',
				name: 'txtBiayaKurs',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupKursus.getCount();

					var data = Ext.create('DataGridKursus', {
						fs_jenis_kursus: Ext.getCmp('txtBidangKurs').getValue(),
						fs_penyelenggara: Ext.getCmp('txtPenyeKurs').getValue(),
						fs_tempat_kursus: Ext.getCmp('txtTmptKurs').getValue(),
						fn_lama_kursus: Ext.getCmp('txtLamaKurs').getValue(),
						fn_tahun_kursus: Ext.getCmp('txtThnKurs').getValue(),
						fs_biaya_oleh: Ext.getCmp('txtBiayaKurs').getValue()
					});

					var jenis_kurs = Ext.getCmp('txtBidangKurs').getValue();
					if (jenis_kurs === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jenis/Bidang, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var penyelenggara = Ext.getCmp('txtPenyeKurs').getValue();
					if (penyelenggara === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Penyelenggara, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var tempat_kurs = Ext.getCmp('txtTmptKurs').getValue();
					if (tempat_kurs === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tempat Kursus, belum diisi!',
							title: 'HRD'
						});
						return;
					}
					
					var lama_kurs = Ext.getCmp('txtLamaKurs').getValue();
					if (lama_kurs === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Lama Kursus, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var tahun_kurs = Ext.getCmp('txtThnKurs').getValue();
					if (tahun_kurs === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tahun Kursus, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var dibiayai_kurs = Ext.getCmp('txtBiayaKurs').getValue();
					if (dibiayai_kurs === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Dibiayai oleh, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupKursus.insert(total, data);

					Ext.getCmp('txtBidangKurs').setValue('');
					Ext.getCmp('txtPenyeKurs').setValue('');
					Ext.getCmp('txtTmptKurs').setValue('');
					Ext.getCmp('txtLamaKurs').setValue('');
					Ext.getCmp('txtThnKurs').setValue('');
					Ext.getCmp('txtBiayaKurs').setValue('');

					total = grupKursus.getCount() - 1;
					gridKursus.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridKursus.getSelectionModel();
					grupKursus.remove(sm.getSelection());
					gridKursus.getView().refresh();

					if (grupKursus.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM PENGETAHUAN BAHASA
	var gridBahasa = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupBahasa,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_jenis_bahasa',
			text: 'Bahasa',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_nilai_dengar',
			text: 'Dengar',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nilai_baca',
			text: 'Baca',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nilai_bicara',
			text: 'Bicara',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nilai_tulis',
			text: 'Tulis',
			flex: 0.5,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupBahasa
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridBahasa.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingBahasa
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipBahasa
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Bahasa',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboBahasa',
				name: 'cboBahasa',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupJenisBahasa,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Dengar',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboDengar',
				name: 'cboDengar',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Baca',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboBaca',
				name: 'cboBaca',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Bicara',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboBicara',
				name: 'cboBicara',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				displayField: 'fs_nama',
				editable: false,
				fieldLabel: 'Tulis',
				fieldStyle: 'text-transform: uppercase;',
				id: 'cboTulis',
				name: 'cboTulis',
				labelAlign: 'top',
				listConfig: {
					maxHeight: 110
				},
				store: grupTingkatan,
				valueField: 'fs_kode',
				xtype: 'combobox',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupBahasa.getCount();

					var data = Ext.create('DataGridBahasa', {
						fs_jenis_bahasa: Ext.getCmp('cboBahasa').getValue(),
						fs_nilai_dengar: Ext.getCmp('cboDengar').getValue(),
						fs_nilai_baca: Ext.getCmp('cboBaca').getValue(),
						fs_nilai_bicara: Ext.getCmp('cboBicara').getValue(),
						fs_nilai_tulis: Ext.getCmp('cboTulis').getValue()
					});

					var jenis_bahasa = Ext.getCmp('cboBahasa').getValue();
					if (jenis_bahasa === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Macam Bahasa, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nilai_dengar = Ext.getCmp('cboDengar').getValue();
					if (nilai_dengar === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai Dengar, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nilai_baca = Ext.getCmp('cboBaca').getValue();
					if (nilai_baca === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai Baca, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nilai_bicara = Ext.getCmp('cboBicara').getValue();
					if (nilai_bicara === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai Bicara, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nilai_tulis = Ext.getCmp('cboTulis').getValue();
					if (nilai_tulis === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nilai Tulis, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupBahasa.insert(total, data);

					Ext.getCmp('cboBahasa').setValue('');
					Ext.getCmp('cboDengar').setValue('');
					Ext.getCmp('cboBaca').setValue('');
					Ext.getCmp('cboBicara').setValue('');
					Ext.getCmp('cboTulis').setValue('');

					total = grupBahasa.getCount() - 1;

					gridBahasa.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridBahasa.getSelectionModel();
					grupBahasa.remove(sm.getSelection());
					gridBahasa.getView().refresh();

					if (grupBahasa.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM KEGIATAN SOSIAL (ORGANISASI)
	var gridOrganisasi = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupOrganisasi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_nama_organisasi',
			text: 'Nama Organisasi',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_kegiatan',
			text: 'Kegiatan',
			flex: 1.5,
			menuDisabled: true
		},{
			dataIndex: 'fn_tahun',
			text: 'Tahun',
			flex: 0.3,
			menuDisabled: true
		},{
			dataIndex: 'fs_jabatan_organisasi',
			text: 'Jabatan',
			flex: 0.9,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupOrganisasi
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridOrganisasi.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingBahasa
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipBahasa
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama Organisasi',
				fieldLabel: 'Nama Organisasi',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaOrganisasi',
				name: 'txtNamaOrganisasi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Kegiatan',
				fieldLabel: 'Kegiatan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtKegiatan',
				name: 'txtKegiatan',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.3,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				fieldLabel: 'Tahun',
				id: 'txtTahun',
				name: 'txtTahun',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '4',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.9,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Jabatan',
				fieldLabel: 'Jabatan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtJabatan',
				name: 'txtJabatan',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupOrganisasi.getCount();

					var data = Ext.create('DataGridOrganisasi', {
						fs_nama_organisasi: Ext.getCmp('txtNamaOrganisasi').getValue(),
						fs_kegiatan: Ext.getCmp('txtKegiatan').getValue(),
						fn_tahun: Ext.getCmp('txtTahun').getValue(),
						fs_jabatan_organisasi: Ext.getCmp('txtJabatan').getValue()
					});

					var nama_organisasi = Ext.getCmp('txtNamaOrganisasi').getValue();
					if (nama_organisasi === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama Organisasi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var kegiatan = Ext.getCmp('txtKegiatan').getValue();
					if (kegiatan === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Kegiatan, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var tahun = Ext.getCmp('txtTahun').getValue();
					if (tahun === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Tahun, belum diisi!',
							title: 'HRD'
						});
						return;
					}
					
					var jabatan = Ext.getCmp('txtJabatan').getValue();
					if (jabatan === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jabatan, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupOrganisasi.insert(total, data);

					Ext.getCmp('txtNamaOrganisasi').setValue('');
					Ext.getCmp('txtKegiatan').setValue('');
					Ext.getCmp('txtTahun').setValue('');
					Ext.getCmp('txtJabatan').setValue('');

					total = grupOrganisasi.getCount() - 1;
					gridOrganisasi.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridOrganisasi.getSelectionModel();
					grupOrganisasi.remove(sm.getSelection());
					gridOrganisasi.getView().refresh();

					if (grupOrganisasi.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM RIWAYAT PEKERJAAN
	var txtNIK_4 = {
		id: 'txtNIK_4',
		name: 'txtNIK_4',
		xtype: 'textfield',
		hidden: true
	};

	var cboDari = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Dari',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'cboDari',
		name: 'cboDari',
		format: 'F, Y',
		value: new Date()
	};

	var cboSampai = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Sampai',
		xtype: 'monthfield',
		submitFormat: 'Y-m-d',
		id: 'cboSampai',
		name: 'cboSampai',
		format: 'F, Y',
		value: new Date()
	};

	var txtNamaPerusahaan = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Nama Perusahaan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaPerusahaan',
		name: 'txtNamaPerusahaan',
		xtype: 'textfield'
	};

	var txtJabatanAwal = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Jabatan Awal',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtJabatanAwal',
		name: 'txtJabatanAwal',
		xtype: 'textfield'
	};

	var txtJabatanAkhir = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Jabatan Akhir',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtJabatanAkhir',
		name: 'txtJabatanAkhir',
		xtype: 'textfield'
	};

	var txtAlamatPerusahaan = {
		anchor: '100%',
		labelWidth: 90,
		labelAlign: 'left',
		height : 20,
		fieldLabel: 'Alamat',
		id: 'txtAlamatPerusahaan',
		name: 'txtAlamatPerusahaan',
		xtype: 'textareafield'
	};

	var txtJnsUsaha = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Jenis Usaha',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtJnsUsaha',
		name: 'txtJnsUsaha',
		xtype: 'textfield'
	};

	var txtJmlKaryawan = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Jumlah Karyawan',
		id: 'txtJmlKaryawan',
		name: 'txtJmlKaryawan',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '5',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtGaji = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Gaji Terakhir',
		id: 'txtGaji',
		name: 'txtGaji',
		xtype: 'textfield',
		minLength: '0',
		maxLength: '10',
		maskRe: /[0-9]/,
		enforceMaxLength: true
	};

	var txtNamaAtasan = {
		anchor: '100%',
		labelWidth: 90,
		labelAlign: 'left',
		fieldLabel: 'Nama Atasan',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaAtasan',
		name: 'txtNamaAtasan',
		xtype: 'textfield'
	};

	var txtNamaDirektur = {
		anchor: '100%',
		labelWidth: 90,
		labelAlign: 'left',
		fieldLabel: 'Nama Direktur',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaDirektur',
		name: 'txtNamaDirektur',
		xtype: 'textfield'
	};

	var txtAlasanBerhenti = {
		anchor: '100%',
		labelAlign: 'top',
		fieldLabel: 'Alasan Berhenti',
		emptyText: 'Alasan Berhenti.....',
		id: 'txtAlasanBerhenti',
		name: 'txtAlasanBerhenti',
		xtype: 'textareafield'
	};

	var btnSavePengalaman = {
		anchor: '100%',
		id: 'btnSavePengalaman',
		name: 'btnSavePengalaman',
		scale: 'medium',
		text: 'Save',
		iconCls: 'icon-save',
		xtype: 'button',
		handler: fnCekSavePengalaman
	};

	var btnResetPengalaman = {
		anchor: '100%',
		id: 'btnResetPengalaman',
		name: 'btnResetPengalaman',
		scale: 'medium',
		text: 'Reset',
		xtype: 'button',
		iconCls: 'icon-reset',
		handler: fnResetPengalaman
	};

	var gridPengalamanKerja = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 150,
		sortableColumns: false,
		store: grupPengalamanKerja,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_nama_perusahaan',
			text: 'Nama Perusahaan',
			width: 300,
			menuDisabled: true,
			locked: true
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str1 = grid.getStore().getAt(rowIndex).get('fs_nama_perusahaan');
					var str2 = grid.getStore().getAt(rowIndex).get('fn_nik');
					if (str1 && str2) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'daftarkaryawan/removepengalaman/',
										params : {
											'fs_nama_perusahaan': str1,
											'fn_nik': str2
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
											grupPengalamanKerja.load();
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
			}],
			locked: true
		},{
			dataIndex: 'fd_dari',
			text: 'Dari',
			width: 100,
			menuDisabled: true
		},{
			dataIndex: 'fd_sampai',
			text: 'Sampai',
			width: 100,
			menuDisabled: true
		},{
			dataIndex: 'fs_jabatan_awal',
			text: 'Jabatan Awal',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_jabatan_akhir',
			text: 'Jabatan',
			width: 200,
			menuDisabled: true
		},{
			dataIndex: 'fn_gaji_terakhir',
			text: 'Gaji',
			width: 100,
			menuDisabled: true
		},{
			dataIndex: 'fn_nik',
			text: 'NIK',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_jenis_usaha',
			text: 'Jenis Usaha',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fn_jumlah_karyawan',
			text: 'Jumlah Karyawan',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_nama_atasan',
			text: 'Nama Atasan',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_nama_direktur',
			text: 'Nama Direktur',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_alamat_perusahaan',
			text: 'Alamat Perusahaan',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_alasan_berhenti',
			text: 'Alasan Berhenti',
			menuDisabled: true,
			hidden: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupPengalamanKerja
		}),
		listeners: {
			itemdblclick: function(grid, record) {
				Ext.getCmp('cboDari').setValue(record.get('fd_dari'));
				Ext.getCmp('cboSampai').setValue(record.get('fd_sampai'));
				Ext.getCmp('txtNamaPerusahaan').setValue(record.get('fs_nama_perusahaan'));
				Ext.getCmp('txtJnsUsaha').setValue(record.get('fs_jenis_usaha'));
				Ext.getCmp('txtJabatanAwal').setValue(record.get('fs_jabatan_awal'));
				Ext.getCmp('txtJabatanAkhir').setValue(record.get('fs_jabatan_akhir'));
				Ext.getCmp('txtJmlKaryawan').setValue(record.get('fn_jumlah_karyawan'));
				Ext.getCmp('txtGaji').setValue(record.get('fn_gaji_terakhir'));
				Ext.getCmp('txtNamaAtasan').setValue(record.get('fs_nama_atasan'));
				Ext.getCmp('txtNamaDirektur').setValue(record.get('fs_nama_direktur'));
				Ext.getCmp('txtAlamatPerusahaan').setValue(record.get('fs_alamat_perusahaan'));
				Ext.getCmp('txtAlasanBerhenti').setValue(record.get('fs_alasan_berhenti'));
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

	// COMPONENT FORM REFERENSI
	var gridReferensi = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupReferensi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_nama_referensi',
			text: 'Nama',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_no_tlp_ref',
			text: 'Telepon',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_hubungan_referensi',
			text: 'Hubungan',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_jabatan_referensi',
			text: 'Jabatan',
			flex: 0.7,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupReferensi
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridReferensi.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingReferensi
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipReferensi
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama',
				fieldLabel: 'Nama',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaReferensi',
				name: 'txtNamaReferensi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Telepon',
				fieldLabel: 'Telepon',
				id: 'txtTlpReferensi',
				name: 'txtTlpReferensi',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '15',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Hubungan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtHubReferensi',
				name: 'txtHubReferensi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Jabatan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtJbtReferensi',
				name: 'txtJbtReferensi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupReferensi.getCount();

					var data = Ext.create('DataGridReferensi', {
						fs_nama_referensi: Ext.getCmp('txtNamaReferensi').getValue(),
						fs_no_tlp_ref: Ext.getCmp('txtTlpReferensi').getValue(),
						fs_hubungan_referensi: Ext.getCmp('txtHubReferensi').getValue(),
						fs_jabatan_referensi: Ext.getCmp('txtJbtReferensi').getValue()
					});

					var nama_ref = Ext.getCmp('txtNamaReferensi').getValue();
					if (nama_ref === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama Referensi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var tlp_ref = Ext.getCmp('txtTlpReferensi').getValue();
					if (tlp_ref === '') { 
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Telepon Referensi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var hubungan_ref = Ext.getCmp('txtHubReferensi').getValue();
					if (hubungan_ref === '') { 
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Hubungan Referensi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var jabatan_ref = Ext.getCmp('txtJbtReferensi').getValue();
					if (jabatan_ref === '') { 
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jabatan Referensi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupReferensi.insert(total, data);

					Ext.getCmp('txtNamaReferensi').setValue('');
					Ext.getCmp('txtTlpReferensi').setValue('');
					Ext.getCmp('txtHubReferensi').setValue('');
					Ext.getCmp('txtJbtReferensi').setValue('');

					total = grupReferensi.getCount() - 1;
					gridReferensi.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridReferensi.getSelectionModel();
					grupReferensi.remove(sm.getSelection());
					gridReferensi.getView().refresh();

					if (grupReferensi.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM DIHUBUNGI
	var gridDihubungi = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 170,
		sortableColumns: false,
		store: grupDihubungi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_nama_dihubungi',
			text: 'Nama',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_no_tlp_dihub',
			text: 'Telepon',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_hubungan_dihubungi',
			text: 'Hubungan',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_jabatan_dihubungi',
			text: 'Jabatan',
			flex: 0.7,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupDihubungi
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridDihubungi.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingDihubungi
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipDihubungi
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama',
				fieldLabel: 'Nama',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaDihubungi',
				name: 'txtNamaDihubungi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Telepon',
				fieldLabel: 'Telepon',
				id: 'txtTlpDihubungi',
				name: 'txtTlpDihubungi',
				labelAlign: 'top',
				xtype: 'textfield',
				minLength: '0',
				maxLength: '15',
				maskRe: /[0-9]/,
				enforceMaxLength: true
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Hubungan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtHubDihubungi',
				name: 'txtHubDihubungi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: '',
				fieldLabel: 'Jabatan',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtJbtDihubungi',
				name: 'txtJbtDihubungi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupDihubungi.getCount();

					var data = Ext.create('DataGridDihubungi', {
						fs_nama_dihubungi: Ext.getCmp('txtNamaDihubungi').getValue(),
						fs_no_tlp_dihub: Ext.getCmp('txtTlpDihubungi').getValue(),
						fs_hubungan_dihubungi: Ext.getCmp('txtHubDihubungi').getValue(),
						fs_jabatan_dihubungi: Ext.getCmp('txtJbtDihubungi').getValue()
					});

					var nama_dihub = Ext.getCmp('txtNamaDihubungi').getValue();
					if (nama_dihub === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var tlp_dihub = Ext.getCmp('txtTlpDihubungi').getValue();
					if (tlp_dihub === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Telepon, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var hubungan_dihub = Ext.getCmp('txtHubDihubungi').getValue();
					if (hubungan_dihub === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Hubungan, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var jabatan_dihub = Ext.getCmp('txtJbtDihubungi').getValue();
					if (jabatan_dihub === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jabatan, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupDihubungi.insert(total, data);

					Ext.getCmp('txtNamaDihubungi').setValue('');
					Ext.getCmp('txtTlpDihubungi').setValue('');
					Ext.getCmp('txtHubDihubungi').setValue('');
					Ext.getCmp('txtJbtDihubungi').setValue('');

					total = grupDihubungi.getCount() - 1;
					gridDihubungi.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridDihubungi.getSelectionModel();
					grupDihubungi.remove(sm.getSelection());
					gridDihubungi.getView().refresh();

					if (grupDihubungi.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	});

	// COMPONENT FORM DATA PENDUKUNG
	var gridDataPendukung = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupDataPendukung,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_jenis_datapendukung',
			text: 'Jenis',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_datapendukung',
			text: 'Nama Data Pendukung',
			flex: 1.5,
			menuDisabled: true
		},{
			dataIndex: 'fd_tanggal_buat',
			text: 'Tanggal Upload',
			flex: 0.4,
			menuDisabled: true
		},{
			dataIndex: 'fs_file_datapendukung',
			text: 'File Data Pendukung',
			menuDisabled: true,
			hidden: true
		},{
			xtype: 'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_file_datapendukung');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete file',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'daftarkaryawan/removefile',
										params : {
											'fs_file_datapendukung' : str
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

											// RELOAD AFTER DELETE
											grupDataPendukung.load();
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
			store: grupDataPendukung
		}),
		listeners: {
			celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
				var nama = record.get('fs_nama_datapendukung');
				var file = 'uploads/files/' + record.get('fs_file_datapendukung');

				var viewImage =  Ext.create('Ext.Panel', {
					items: Ext.create('Ext.view.View', {
						xtype: 'dataview',
						tpl: [
							'<div style="overflow: auto; width:888; height:465; text-align:center;">',
					        '<img src="' + file + '" height:"100%" width:"100%" />',
					        '</div>'
					    ],
					})
				});

				var winImage = Ext.create('Ext.window.Window', {
					title: nama,
					border: false,
					frame: false,
					autoScroll: false,
					width: 900,
					height: 500,
					collapsible: false,
					resizable: true,
					layout: 'fit',
					items: [
						viewImage
					]
				});

				winImage.show();
			}
		},
		plugins: [
			// cellEditingPendukung
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipPendukung
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				id: 'txtNIK_5',
				name: 'txtNIK_5',
				xtype: 'textfield',
				hidden: true
			},{
				afterLabelTextTpl: required,
				allowBlank: false,
				anchor: '95%',
				editable: false,
				emptyText: 'Jenis',
				fieldLabel: 'Jenis',
				id: 'cboJnsPendukung',
				name: 'cboJnsPendukung',
				labelAlign: 'top',
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
							winCari5.show();
							winCari5.center();
						}
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				afterLabelTextTpl: required,
				allowBlank: false,
				emptyText: 'Nama Data Pendukung',
				fieldLabel: 'Nama',
				fieldStyle: 'background-color: #eee; background-image: none;',
				readOnly: true,
				id: 'txtNamaPendukung',
				name: 'txtNamaPendukung',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor : '95%',
				afterLabelTextTpl: required,
				allowBlank: false,
				emptyText: 'Select File Image',
				fieldLabel: 'File',
				id: 'filePendukung',
				name: 'filePendukung',
				labelAlign: 'top',
				xtype: 'fileuploadfield',
				buttonCfg: {
					text: 'Browse',
					iconCls: 'upload-icon'
				}
			}]
		},{
			xtype: 'buttongroup',
			columns: 1,
			defaults: {
				scale: 'small'
			},
			items: [{
				iconCls: 'icon-add',
				text: 'Upload',
				handler: function() {
					var form = this.up('form').getForm();
					if (form.isValid()) {
					 	form.submit({
					 		url: 'daftarkaryawan/uploadfile',
					 		waitMsg: 'Uploading your file...',
					 		success: function (form, action) {
					 			var result = action.result;
					 			var data = result.data;
					 			var name = data.name;
					 			var message = Ext.String.format('<b>Message:</b> {0}<br>' +'<b>File:</b> {1}', result.msg, name);
					 			Ext.Msg.alert('Success', message);
					 			// RESET FIELD
					 			fnResetDataPendukung();
					 			// RELOAD DATA PENDUKUNG
					 			grupDataPendukung.load();
					 		},
					 		failure: function (form, action) {
					 			Ext.Msg.alert('Failure', action.result.msg);
					 		}
					 	});
					}
				}
			}]
		}]
	});

	// COMPONENT FORM SERTIFIKASI
	var gridSertifikasi = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 270,
		sortableColumns: false,
		store: grupSertifikasi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fs_jenis_sertifikasi',
			text: 'Jenis',
			flex: 0.5,
			menuDisabled: true
		},{
			dataIndex: 'fs_nama_sertifikasi',
			text: 'Nama Sertifikasi',
			flex: 1,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupSertifikasi
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridSertifikasi.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingSertifikasi
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipSertifikasi
			},
			markDirty: false,
			stripeRows: true
		},
		tbar: [{
			flex: 0.5,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				id: 'txtNIK_6',
				name: 'txtNIK_6',
				xtype: 'textfield',
				hidden: true
			},{
				anchor: '95%',
				emptyText: 'Jenis',
				fieldLabel: 'Jenis',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtJnsSertifikasi',
				name: 'txtJnsSertifikasi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
		},{
			flex: 1,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '95%',
				emptyText: 'Nama Sertifikasi',
				fieldLabel: 'Nama',
				fieldStyle: 'text-transform: uppercase;',
				id: 'txtNamaSertifikasi',
				name: 'txtNamaSertifikasi',
				labelAlign: 'top',
				xtype: 'textfield',
				listeners: {
					change: function(field, newValue) {
						field.setValue(newValue.toUpperCase());
					}
				}
			}]
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
					var total = grupSertifikasi.getCount();
					var data = Ext.create('DataGridSertifikasi', {
						fs_jenis_sertifikasi: Ext.getCmp('txtJnsSertifikasi').getValue(),
						fs_nama_sertifikasi: Ext.getCmp('txtNamaSertifikasi').getValue()
					});

					var jenis_sert = Ext.getCmp('txtJnsSertifikasi').getValue();
					if (jenis_sert === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Jenis Sertifikasi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					var nama_sert = Ext.getCmp('txtNamaSertifikasi').getValue();
					if (nama_sert === '') {
						Ext.MessageBox.show({
							buttons: Ext.MessageBox.OK,
							closable: false,
							icon: Ext.Msg.WARNING,
							msg: 'Nama Sertifikasi, belum diisi!',
							title: 'HRD'
						});
						return;
					}

					grupSertifikasi.insert(total, data);
					Ext.getCmp('txtJnsSertifikasi').setValue('');
					Ext.getCmp('txtNamaSertifikasi').setValue('');

					total = grupSertifikasi.getCount() - 1;
					gridSertifikasi.getSelectionModel().select(total);
				}
			},{
				iconCls: 'icon-delete',
				itemId: 'removeData',
				text: 'Delete',
				handler: function() {
					var sm = gridSertifikasi.getSelectionModel();
					grupSertifikasi.remove(sm.getSelection());
					gridSertifikasi.getView().refresh();

					if (grupSertifikasi.getCount() > 0) {
						sm.select(0);
					}
				},
				disabled: true
			}]
		}]
	}); 

	// COMPONENT FORM HISTORY MUTASI
	var gridHistoryMutasi = Ext.create('Ext.grid.Panel', { 
		anchor: '100%',
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupHistoryMutasi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fd_tanggal_mutasi',
			text: 'Tanggal',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_dari_cabang',
			text: 'Dari',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_ke_cabang',
			text: 'Ke',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_catatan_mutasi',
			text: 'Catatan Mutasi',
			flex: 2,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupHistoryMutasi
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridHistoryMutasi.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingMutasi
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipMutasi
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM HISTORY PERUBAHAN DATA
	var gridPerubahanData = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 250,
		sortableColumns: false,
		store: grupHistoyPerubahanData,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			dataIndex: 'fd_tanggal_perubahan',
			text: 'Tanggal',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_user',
			text: 'Oleh',
			flex: 1,
			menuDisabled: true
		},{
			dataIndex: 'fs_sebelum_perubahan',
			text: 'Sebelum',
			flex: 2,
			menuDisabled: true
		},{
			dataIndex: 'fs_setelah_perubahan',
			text: 'Setelah',
			flex: 2,
			menuDisabled: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupHistoyPerubahanData
		}),
		listeners: {
			selectionchange: function(view, records) {
				gridPerubahanData.down('#removeData').setDisabled(!records.length);
			}
		},
		plugins: [
			// cellEditingPerubahanData
		],
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			listeners: {
				//render: gridTooltipPerubahanData
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM NON-AKTIF
	var txtNIK_9 = {
		id: 'txtNIK_9',
		name: 'txtNIK_9',
		xtype: 'textfield',
		hidden: true
	};

	var cboNonAktif = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Non Aktif',
		id: 'cboNonAktif',
		name: 'cboNonAktif',
		store: grupCombo,
		valueField: 'fs_kode',
		xtype: 'combobox'
	};

	var cboTglNonAktif = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		editable: true,
		fieldLabel: 'Tanggal Non-Aktif',
		format: 'd-m-Y',
		id: 'cboTglNonAktif',
		name: 'cboTglNonAktif',
		maskRe: /[0-9-]/,
		minValue: Ext.Date.add(new Date(), Ext.Date.YEAR, -50),
		value: new Date(),
		xtype: 'datefield'
	};

	var txtCatatanNonAktif = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Catatan Non Aktif',
		id: 'txtCatatanNonAktif',
		name: 'txtCatatanNonAktif',
		xtype: 'textareafield'
	};

	// FUNCTION LOAD DATA
	function fnLoad() {
		grupPerkawinan.load();
		grupKeluarga.load();
		grupPendidikan.load();
		grupKursus.load();
		grupBahasa.load();
		grupOrganisasi.load();
		grupPengalamanKerja.load();
		grupReferensi.load();
		grupDihubungi.load();
		grupDataPendukung.load();
		grupSertifikasi.load();
		grupHistoryMutasi.load();
		grupHistoyPerubahanData.load();
	}

	// FUNCTION TAB PROFIL
	function fnResetProfil() {
		// FORM BIODATA
		Ext.getCmp('cboTglMasuk').setValue(new Date());
		Ext.getCmp('txtNIK').setValue('');
		Ext.getCmp('cboLokasi').setValue('');
		Ext.getCmp('txtKdLokasi').setValue('');
		Ext.getCmp('cboDepartemen').setValue('');
		Ext.getCmp('txtKdDepartemen').setValue('');
		Ext.getCmp('cboJabatan').setValue('');
		Ext.getCmp('txtKdJabatan').setValue('');
		Ext.getCmp('cboShift').setValue('');
		Ext.getCmp('txtKdShift').setValue('');
		Ext.getCmp('txtNama').setValue('');
		Ext.getCmp('txtAlamatKTP').setValue('');
		Ext.getCmp('txtAlamatTinggal').setValue('');
		Ext.getCmp('txtTelepon').setValue('');
		Ext.getCmp('txtHandphone').setValue('');
		Ext.getCmp('txtEmail').setValue('');
		Ext.getCmp('txtTmptLahir').setValue('');
		Ext.getCmp('txtTglLahir').setValue('');
		Ext.getCmp('txtNoNPWP').setValue('');
		Ext.getCmp('cboJekel').setValue('');
		Ext.getCmp('cboAgama').setValue('');
		Ext.getCmp('txtSIMA').setValue('');
		Ext.getCmp('txtSIMC').setValue('');
		Ext.getCmp('txtNoKTP').setValue('');
		Ext.getCmp('cboGolDarah').setValue('');
		Ext.getCmp('cboKebangsaan').setValue('');
		Ext.getCmp('cboStatusKend').setValue('');
		Ext.getCmp('cboStatusTinggal').setValue('');
		Ext.getCmp('cboStatPerkawinan').setValue('');

		// FORM PERKAWINAN
		Ext.getCmp('cboPosisiPerk').setValue('');
		Ext.getCmp('txtNamaPerk').setValue('');
		Ext.getCmp('cboJekelPerk').setValue('');
		Ext.getCmp('cboUsiaPerk').setValue('');
		Ext.getCmp('cboPendPerk').setValue('');
		Ext.getCmp('cboPkrjPerk').setValue('');

		// FORM KELUARGA
		Ext.getCmp('cboPosisiKel').setValue('');
		Ext.getCmp('txtNamaKel').setValue('');
		Ext.getCmp('cboJekelKel').setValue('');
		Ext.getCmp('cboUsiaKel').setValue('');
		Ext.getCmp('cboPendKel').setValue('');
		Ext.getCmp('cboPkrjKel').setValue('');

		// DETAIL PERKAWINAN
		grupPerkawinan.removeAll();
		gridPerkawinan.getView().refresh();

		// DETAIL KELUARGA
		grupKeluarga.removeAll();
		gridKeluarga.getView().refresh();

		// CHANGE TAB
		var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
		tabPanel.setActiveTab('tab1');

		// SET DISABLE TABPANEL
		Ext.getCmp('tab3').setDisabled(true);
		Ext.getCmp('tab4').setDisabled(true);
		Ext.getCmp('tab5').setDisabled(true);
		Ext.getCmp('tab6').setDisabled(true);
		Ext.getCmp('tab7').setDisabled(true);
		Ext.getCmp('tab8').setDisabled(true);
		Ext.getCmp('tab9').setDisabled(true);
	}

	function fnCekSaveProfil() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'daftarkaryawan/ceksaveprofil',
				params: {
					'fn_nik': Ext.getCmp('txtNIK').getValue()
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
									fnSaveProfil();
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

	function fnSaveProfil() {
		var xposisi_perk = '';
		var xnama_perk = '';
		var xjekel_perk = '';
		var xusia_perk = '';
		var xpendidikan_perk = '';
		var xpekerjaan_perk = '';
		var xposisi_kel = '';
		var xnama_kel = '';
		var xjekel_kel = '';
		var xusia_kel = '';
		var xpendidikan_kel = '';
		var xpekerjaan_kel = '';

		var store = gridPerkawinan.getStore();
		store.each(function(record, idx) {
			xposisi_perk = xposisi_perk +'|'+ record.get('fs_posisi_perkawinan');
			xnama_perk = xnama_perk +'|'+ record.get('fs_nama_perkawinan');
			xjekel_perk = xjekel_perk +'|'+ record.get('fs_jekel');
			xusia_perk = xusia_perk +'|'+ record.get('fn_usia');
			xpendidikan_perk = xpendidikan_perk +'|'+ record.get('fs_pendidikan');
			xpekerjaan_perk = xpekerjaan_perk +'|'+ record.get('fs_pekerjaan');
		});

		store = gridKeluarga.getStore();
		store.each(function(record, idx) {
			xposisi_kel = xposisi_kel +'|'+ record.get('fs_posisi_keluarga');
			xnama_kel = xnama_kel +'|'+ record.get('fs_nama_keluarga');
			xjekel_kel = xjekel_kel +'|'+ record.get('fs_jekel');
			xusia_kel = xusia_kel +'|'+ record.get('fn_usia');
			xpendidikan_kel = xpendidikan_kel +'|'+ record.get('fs_pendidikan');
			xpekerjaan_kel = xpekerjaan_kel +'|'+ record.get('fs_pekerjaan');
		});

		Ext.Ajax.setTimeout(90000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'daftarkaryawan/saveprofil',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue(),
				'fs_kode_departemen': Ext.getCmp('txtKdDepartemen').getValue(),
				'fs_kode_jabatan': Ext.getCmp('txtKdJabatan').getValue(),
				'fs_kode_shift': Ext.getCmp('txtKdShift').getValue(),
				'fn_nik': Ext.getCmp('txtNIK').getValue(),
				'fd_tanggal_masuk': Ext.getCmp('cboTglMasuk').getValue(),
				'fs_nama_karyawan': Ext.getCmp('txtNama').getValue(),
				'fs_alamat_ktp': Ext.getCmp('txtAlamatKTP').getValue(),
				'fs_alamat_tinggal': Ext.getCmp('txtAlamatTinggal').getValue(),
				'fs_no_tlp': Ext.getCmp('txtTelepon').getValue(),
				'fs_no_hp': Ext.getCmp('txtHandphone').getValue(),
				'fs_email_pribadi': Ext.getCmp('txtEmail').getValue(),
				'fs_jenis_kelamin': Ext.getCmp('cboJekel').getValue(),
				'fs_tempat_lahir': Ext.getCmp('txtTmptLahir').getValue(),
				'fd_tanggal_lahir': Ext.getCmp('txtTglLahir').getValue(),
				'fs_status_nikah': Ext.getCmp('cboStatPerkawinan').getValue(),
				'fs_agama': Ext.getCmp('cboAgama').getValue(),
				'fs_gol_darah': Ext.getCmp('cboGolDarah').getValue(),
				'fs_kebangsaan': Ext.getCmp('cboKebangsaan').getValue(),
				'fs_tempat_tinggal': Ext.getCmp('cboStatusTinggal').getValue(),
				'fn_no_ktp': Ext.getCmp('txtNoKTP').getValue(),
				'fn_no_npwp': Ext.getCmp('txtNoNPWP').getValue(),
				'fn_sim_a': Ext.getCmp('txtSIMA').getValue(),
				'fn_sim_c': Ext.getCmp('txtSIMC').getValue(),
				'fs_status_kendaraan': Ext.getCmp('cboStatusKend').getValue(),
				'fs_posisi_perkawinan': xposisi_perk,
				'fs_nama_perkawinan': xnama_perk,
				'fs_jekel_perkawinan': xjekel_perk,
				'fn_usia_perkawinan': xusia_perk,
				'fs_pendidikan_perkawinan': xpendidikan_perk,
				'fs_pekerjaan_perkawinan': xpekerjaan_perk,
				'fs_posisi_keluarga': xposisi_kel,
				'fs_nama_keluarga': xnama_kel,
				'fs_jekel_keluarga': xjekel_kel,
				'fn_usia_keluarga': xusia_kel,
				'fs_pendidikan_keluarga': xpendidikan_kel,
				'fs_pekerjaan_keluarga': xpekerjaan_kel
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
					fnResetProfil();
					// CHANGE TAB
					var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
					tabPanel.setActiveTab('tab1');
					// RELOAD DATA
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
				fnMaskHide();
			}
		});
	}

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
						url: 'daftarkaryawan/printprofil',
						params: {
							'fs_kode_dokumen': 'PDK',
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
 
	// FUNCTION TAB PENDIDIKAN
	function fnResetPendidikan() {
		// FORM PENDIDIKAN
		Ext.getCmp('cboTingkatPend').setValue('');
		Ext.getCmp('txtNamaSeko').setValue('');
		Ext.getCmp('txtTmptSeko').setValue('');
		Ext.getCmp('txtJursSeko').setValue('');
		Ext.getCmp('txtDariSeko').setValue('');
		Ext.getCmp('txtSmpSeko').setValue('');
		Ext.getCmp('cboStatSeko').setValue('');

		// FORM KURSUS
		Ext.getCmp('txtBidangKurs').setValue('');
		Ext.getCmp('txtPenyeKurs').setValue('');
		Ext.getCmp('txtTmptKurs').setValue('');
		Ext.getCmp('txtLamaKurs').setValue('');
		Ext.getCmp('txtThnKurs').setValue('');
		Ext.getCmp('txtBiayaKurs').setValue('');

		// FORM BAHASA
		Ext.getCmp('cboBahasa').setValue('');
		Ext.getCmp('cboDengar').setValue('');
		Ext.getCmp('cboBaca').setValue('');
		Ext.getCmp('cboBicara').setValue('');
		Ext.getCmp('cboTulis').setValue('');

		// DETAIL PENDIDIKAN
		grupPendidikan.removeAll();
		gridPendidikan.getView().refresh();

		// DETAIL KURSUS
		grupKursus.removeAll();
		gridKursus.getView().refresh();

		// DETAIL BAHASA
		grupBahasa.removeAll();
		gridBahasa.getView().refresh();

		// LOAD DATA
		grupPendidikan.load();
		grupKursus.load();
		grupBahasa.load();
	}

	function fnCekSavePendidikan() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'daftarkaryawan/ceksavependidikan',
				params: {
					'fn_nik': Ext.getCmp('txtNIK_3').getValue()
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
									fnSavePendidikan();
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

	function fnSavePendidikan() {
		var xtingkat_pend = '';
		var xnama_seko = '';
		var xtempat_seko = '';
		var xjurusan_seko = '';
		var xdari_seko = '';
		var xsampai_seko = '';
		var xstatus_seko = '';
		var xjnskursus = '';
		var xpenyelenggara = '';
		var xtempat_kurs = '';
		var xlama_kurs = '';
		var xtahun_kurs = '';
		var xbiaya_kurs = '';
		var xjnsbahasa = '';
		var xnilaidengar = '';
		var xnilaibaca = '';
		var xnilaibicara = '';
		var xnilaitulis = '';
		var xnmorganisasi = '';
		var xkegiatan = '';
		var xtahun_org = '';
		var xjabatan_org = '';

		var store = gridPendidikan.getStore();
		store.each(function(record, idx) {
			xtingkat_pend = xtingkat_pend +'|'+ record.get('fs_tingkat_pendidikan');
			xnama_seko = xnama_seko +'|'+ record.get('fs_nama_sekolah');
			xtempat_seko = xtempat_seko +'|'+ record.get('fs_tempat_sekolah');
			xjurusan_seko = xjurusan_seko +'|'+ record.get('fs_jurusan');
			xdari_seko = xdari_seko +'|'+ record.get('fn_dari_tahun');
			xsampai_seko = xsampai_seko +'|'+ record.get('fn_sampai_tahun');
			xstatus_seko = xstatus_seko +'|'+ record.get('fs_status');
		});
		
		store = gridKursus.getStore();
		store.each(function(record, idx) {
			xjnskursus = xjnskursus +'|'+ record.get('fs_jenis_kursus');
			xpenyelenggara = xpenyelenggara +'|'+ record.get('fs_penyelenggara');
			xtempat_kurs = xtempat_kurs +'|'+ record.get('fs_tempat_kursus');
			xlama_kurs = xlama_kurs +'|'+ record.get('fn_lama_kursus');
			xtahun_kurs = xtahun_kurs +'|'+ record.get('fn_tahun_kursus');
			xbiaya_kurs = xbiaya_kurs +'|'+ record.get('fs_biaya_oleh');
		});

		store = gridBahasa.getStore();
		store.each(function(record, idx) {
			xjnsbahasa = xjnsbahasa +'|'+ record.get('fs_jenis_bahasa');
			xnilaidengar = xnilaidengar +'|'+ record.get('fs_nilai_dengar');
			xnilaibaca = xnilaibaca +'|'+ record.get('fs_nilai_baca');
			xnilaibicara = xnilaibicara +'|'+ record.get('fs_nilai_bicara');
			xnilaitulis = xnilaitulis +'|'+ record.get('fs_nilai_tulis');
		});

		store = gridOrganisasi.getStore();
		store.each(function(record, idx) {
			xnmorganisasi = xnmorganisasi +'|'+ record.get('fs_nama_organisasi');
			xkegiatan = xkegiatan +'|'+ record.get('fs_kegiatan');
			xtahun_org = xtahun_org +'|'+ record.get('fn_tahun');
			xjabatan_org = xjabatan_org +'|'+ record.get('fs_jabatan_organisasi');
		});

		Ext.Ajax.setTimeout(90000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'daftarkaryawan/savependidikan',
			params: {
				'fn_nik': Ext.getCmp('txtNIK_3').getValue(),
				'fs_tingkat_pendidikan': xtingkat_pend,
				'fs_nama_sekolah': xnama_seko,
				'fs_kota_sekolah': xtempat_seko,
				'fs_jurusan': xjurusan_seko,
				'fn_dari_tahun': xdari_seko,
				'fn_sampai_tahun': xsampai_seko,
				'fs_status': xstatus_seko,
				'fs_jenis_kursus': xjnskursus,
				'fs_penyelenggara': xpenyelenggara,
				'fs_kota_kursus': xtempat_kurs,
				'fn_lama_kursus': xlama_kurs,
				'fn_tahun_kursus': xtahun_kurs,
				'fs_biaya_oleh': xbiaya_kurs,
				'fs_jenis_bahasa': xjnsbahasa,
				'fs_nilai_dengar': xnilaidengar,
				'fs_nilai_baca': xnilaibaca,
				'fs_nilai_bicara': xnilaibicara,
				'fs_nilai_tulis': xnilaitulis,
				'fs_nama_organisasi': xnmorganisasi,
				'fs_kegiatan': xkegiatan,
				'fn_tahun': xtahun_org,
				'fs_jabatan': xjabatan_org
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

				fnResetPendidikan();

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

	// FUNCTION TAB PENGALAMAN KERJA
	function fnResetPengalaman() {
		Ext.getCmp('txtNamaPerusahaan').setValue('');
		Ext.getCmp('txtAlamatPerusahaan').setValue('');
		Ext.getCmp('txtJabatanAwal').setValue('');
		Ext.getCmp('txtJabatanAkhir').setValue('');
		Ext.getCmp('txtJnsUsaha').setValue('');
		Ext.getCmp('txtJmlKaryawan').setValue('');
		Ext.getCmp('txtNamaAtasan').setValue('');
		Ext.getCmp('txtNamaDirektur').setValue('');
		Ext.getCmp('txtGaji').setValue('');
		Ext.getCmp('txtAlasanBerhenti').setValue('');

		grupPengalamanKerja.load();
	}

	function fnCekSavePengalaman() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'daftarkaryawan/ceksavepengalaman',
				params: {
					'fn_nik': Ext.getCmp('txtNIK_4').getValue()
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
									fnSavePengalaman();
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

	function fnSavePengalaman() {
		Ext.Ajax.setTimeout(90000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'daftarkaryawan/savepengalaman',
			params: {
				'fn_nik': Ext.getCmp('txtNIK_4').getValue(),
				'fd_dari': Ext.getCmp('cboDari').getValue(),
				'fd_sampai': Ext.getCmp('cboSampai').getValue(),
				'fs_nama_perusahaan': Ext.getCmp('txtNamaPerusahaan').getValue(),
				'fs_alamat_perusahaan': Ext.getCmp('txtAlamatPerusahaan').getValue(),
				'fs_jabatan_awal': Ext.getCmp('txtJabatanAwal').getValue(),
				'fs_jabatan_akhir': Ext.getCmp('txtJabatanAkhir').getValue(),
				'fs_jenis_usaha': Ext.getCmp('txtJnsUsaha').getValue(),
				'fn_jumlah_karyawan': Ext.getCmp('txtJmlKaryawan').getValue(),
				'fs_nama_atasan': Ext.getCmp('txtNamaAtasan').getValue(),
				'fs_nama_direktur': Ext.getCmp('txtNamaDirektur').getValue(),
				'fn_gaji_terakhir': Ext.getCmp('txtGaji').getValue(),
				'fs_alasan_berhenti': Ext.getCmp('txtAlasanBerhenti').getValue()
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

				fnResetPengalaman();
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

	// FUNCTION TAB REFERENSI
	function fnResetReferensi() {
		// FORM REFERENSI
		Ext.getCmp('txtNamaReferensi').setValue('');
		Ext.getCmp('txtTlpReferensi').setValue('');
		Ext.getCmp('txtHubReferensi').setValue('');
		Ext.getCmp('txtJbtReferensi').setValue('');

		// FORM DIHUBUNGI
		Ext.getCmp('txtNamaDihubungi').setValue('');
		Ext.getCmp('txtTlpDihubungi').setValue('');
		Ext.getCmp('txtHubDihubungi').setValue('');
		Ext.getCmp('txtJbtDihubungi').setValue('');

		// DETAIL REFERENSI
		grupReferensi.removeAll();
		gridReferensi.getView().refresh();

		// DETAIL DIHUBUNGI
		grupDihubungi.removeAll();
		gridDihubungi.getView().refresh();

		// LOAD DATA
		grupReferensi.load();
		grupDihubungi.load();
	}

	function fnCekSaveReferensi() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'daftarkaryawan/ceksavereferensi',
				params: {
					'fs_kode_lokasi': Ext.getCmp('txtKdLokasi').getValue(),
					'fn_nik': Ext.getCmp('txtNIK').getValue()
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
									fnSaveReferensi();
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

	function fnSaveReferensi() {
		var xnama_ref = '';
		var xtelpon_ref = '';
		var xhubungan_ref = '';
		var xjabatan_ref = '';
		var xnama_dihub = '';
		var xtelpon_dihub = '';
		var xhubungan_dihub = '';
		var xjabatan_dihub = '';

		var store = gridReferensi.getStore();
		store.each(function(record, idx) {
			xnama_ref = xnama_ref +'|'+ record.get('fs_nama_referensi');
			xtelpon_ref = xtelpon_ref +'|'+ record.get('fs_no_tlp_ref');
			xhubungan_ref = xhubungan_ref +'|'+ record.get('fs_hubungan_referensi');
			xjabatan_ref = xjabatan_ref +'|'+ record.get('fs_jabatan_referensi');
		});

		store = gridDihubungi.getStore();
		store.each(function(record, idx) {
			xnama_dihub = xnama_dihub +'|'+ record.get('fs_nama_dihubungi');
			xtelpon_dihub = xtelpon_dihub +'|'+ record.get('fs_no_tlp_dihub');
			xhubungan_dihub = xhubungan_dihub +'|'+ record.get('fs_hubungan_dihubungi');
			xjabatan_dihub = xjabatan_dihub +'|'+ record.get('fs_jabatan_dihubungi');
		});
		
		Ext.Ajax.setTimeout(90000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'daftarkaryawan/savereferensi',
			params: {
				'fn_nik': Ext.getCmp('txtNIK').getValue(),
				'fs_nama_referensi': xnama_ref,
				'fs_no_tlp_ref': xtelpon_ref,
				'fs_hubungan_referensi': xhubungan_ref,
				'fs_jabatan_referensi': xjabatan_ref,
				'fs_nama_dihubungi': xnama_dihub,
				'fs_no_tlp_dihub': xtelpon_dihub,
				'fs_hubungan_dihubungi': xhubungan_dihub,
				'fs_jabatan_dihubungi': xjabatan_dihub
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

				fnResetReferensi();
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

	// FUNCTION TAB DATA PENDUKUNG
	function fnResetDataPendukung() {
		Ext.getCmp('cboJnsPendukung').setValue('');
		Ext.getCmp('txtNamaPendukung').setValue('');
	}

	// FUNCTION TAB SERTIFIKASI
	function fnResetSertifikasi() {
		Ext.getCmp('txtJnsSertifikasi').setValue('');
		Ext.getCmp('txtNamaSertifikasi').setValue('');

		// DETAIL SERTIFIKASI
		grupSertifikasi.removeAll();
		gridSertifikasi.getView().refresh();
		
		grupSertifikasi.load();
	}

	function fnCekSaveSertifikasi() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'daftarkaryawan/ceksavesertifikasi',
				params: {
					'fn_nik': Ext.getCmp('txtNIK_6').getValue()
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
									fnSaveSertifikasi();
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

	function fnSaveSertifikasi() {
		var xjenis_sert = '';
		var xnama_sert = '';

		var store = gridSertifikasi.getStore();
		store.each(function(record, idx) {
			xjenis_sert = xjenis_sert +'|'+ record.get('fs_jenis_sertifikasi');
			xnama_sert = xnama_sert +'|'+ record.get('fs_nama_sertifikasi');
		});

		Ext.Ajax.setTimeout(90000);
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'daftarkaryawan/savesertifikasi',
			params: {
				'fn_nik': Ext.getCmp('txtNIK_6').getValue(),
				'fs_jenis_sertifikasi': xjenis_sert,
				'fs_nama_sertifikasi': xnama_sert
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
				fnResetSertifikasi();
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

	// FUNCTION TAB NON-AKTIF
	function fnResetNonAktif() {
		Ext.getCmp('cboNonAktif').setValue('');
		Ext.getCmp('cboTglNonAktif').setValue('');
		Ext.getCmp('txtCatatanNonAktif').setValue('');
	}

	function fnCekSaveNonAktif() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'daftarkaryawan/ceksavenonaktif',
				params: {
					'fn_nik': Ext.getCmp('txtNIK_9').getValue()
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
									fnSaveNonAktif();
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

	function fnSaveNonAktif() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'daftarkaryawan/savenonaktif',
			params: {
				'fn_nik': Ext.getCmp('txtNIK_9').getValue(),
				'fs_status': Ext.getCmp('cboNonAktif').getValue(),
				'fd_tanggal_nonaktif': Ext.getCmp('cboTglNonAktif').getValue(),
				'fs_catatan': Ext.getCmp('txtCatatanNonAktif').getValue()
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
				fnResetNonAktif();

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab1');
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

	var frmKaryawan = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Daftar Karyawan',
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
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 100,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Data Karyawan',
					xtype: 'fieldset',
					items: [
						gridKaryawan
					]
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Profil',
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
									cboTglMasuk,
									txtNIK,
									txtNama,
									cboLokasi,
									txtKdLokasi,
									cboDepartemen,
									txtKdDepartemen,
									cboJabatan,
									txtKdJabatan,
									txtAlamatKTP,
									txtAlamatTinggal
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '100%',
								style: 'padding: 5px;',
								title: 'Photo',
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
										items: [{
											style: 'padding: 5px;',
											xtype: 'fieldset',
											items: [
												filePhoto,
												btnUpload,
											]
										}]
									}]
								}]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Pola Kerja',
								xtype: 'fieldset',
								items: [
									cboShift,
									txtKdShift
								]
							},{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Cetak Data Karyawan',
								xtype: 'fieldset',
								items: [
									btnPrint
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
									txtTelepon,
									txtHandphone,
									txtEmail,
									txtTmptLahir,
									txtTglLahir,
									txtNoNPWP
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
									cboJekel,
									cboAgama,
									txtSIMA,
									txtSIMC,
									txtNoKTP
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
									cboGolDarah,
									cboKebangsaan,
									cboStatusKend,
									cboStatusTinggal,
									cboStatPerkawinan
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
					title: 'Perkawinan',
					xtype: 'fieldset',
					items: [
						gridPerkawinan
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Keluarga',
					xtype: 'fieldset',
					items: [
						gridKeluarga
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveProfile',
					name: 'btnSaveProfile',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveProfil
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetProfil
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Pendidikan',
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
					title: 'Pendidikan',
					xtype: 'fieldset',
					items: [
						gridPendidikan
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Kursus / Pelatihan',
					xtype: 'fieldset',
					items: [
						gridKursus
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Pengetahuan Bahasa',
					xtype: 'fieldset',
					items: [
						gridBahasa
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Kegiatan Sosial',
					xtype: 'fieldset',
					items: [
						gridOrganisasi
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSavePendidikan',
					name: 'btnSavePendidikan',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSavePendidikan
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetPendidikan
				}]
			},{
				id: 'tab4',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Pengalaman Kerja',
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
					title: 'Form Pengalaman Kerja',
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
								style: 'padding: 1px;',
								border: 0,
								xtype: 'fieldset',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 0.5,
										layout: 'anchor',
										xtype: 'container',
										items: [{
											anchor: '98%',
											style: 'padding: 1px;',
											border: 0,
											xtype: 'fieldset',
											items: [
												txtNIK_4,
												cboDari,
												cboSampai
											]
										}]
									},{
										flex: 1.5,
										layout: 'anchor',
										xtype: 'container',
										items: [{
											anchor: '98%',
											style: 'padding: 1px;',
											border: 0,
											xtype: 'fieldset',
											items: [
												txtNamaPerusahaan,
												txtJnsUsaha
											]
										}]
									}]
								}]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 1px;',
								border: 0,
								xtype: 'fieldset',
								items: [{
									anchor: '100%',
									layout: 'hbox',
									xtype: 'container',
									items: [{
										flex: 1.5,
										layout: 'anchor',
										xtype: 'container',
										items: [{
											anchor: '98%',
											style: 'padding: 1px;',
											border: 0,
											xtype: 'fieldset',
											items: [
												txtJabatanAwal,
												txtJabatanAkhir
											]
										}]
									},{
										flex: 0.5,
										layout: 'anchor',
										xtype: 'container',
										items: [{
											anchor: '98%',
											style: 'padding: 1px;',
											border: 0,
											xtype: 'fieldset',
											items: [
												txtJmlKaryawan,
												txtGaji
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
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 1px;',
								border: 0,
								xtype: 'fieldset',
								items: [
									txtNamaAtasan,
									txtNamaDirektur,
									txtAlamatPerusahaan
								]
							}]
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 1px;',
								border: 0,
								xtype: 'fieldset',
								items: [{
									anchor: '98%',
									style: 'padding: 1px;',
									border: 0,
									xtype: 'fieldset',
									items: [
										txtAlasanBerhenti
									]
								}]
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
							items: []
						},{
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 1px;',
								border: 0,
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
											style: 'padding: 1px;',
											border: 0,
											xtype: 'fieldset',
											items: [
												btnSavePengalaman
											]
										}]
									},{
										flex: 1,
										layout: 'anchor',
										xtype: 'container',
										items: [{
											anchor: '98%',
											style: 'padding: 1px;',
											border: 0,
											xtype: 'fieldset',
											items: [
												btnResetPengalaman
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
								anchor: '100%',
								style: 'padding: 1px;',
								border: 0,
								xtype: 'fieldset',
								items: [
									gridPengalamanKerja
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
					title: 'Referensi',
					xtype: 'fieldset',
					items: [
						gridReferensi
					]
				},{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Orang yang dapat dihubungi dalam keadaan darurat',
					xtype: 'fieldset',
					items: [
						gridDihubungi
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveReferensi',
					name: 'btnSaveReferensi',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveReferensi
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetReferensi
				}]
			},{
				id: 'tab5',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Data Pendukung',
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
					title: 'Data Pendukung',
					xtype: 'fieldset',
					items: [
						gridDataPendukung
					]
				}]
			},{
				id: 'tab6',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Sertifikasi',
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
					title: 'Sertifikasi',
					xtype: 'fieldset',
					items: [
						gridSertifikasi
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveSertifikasi',
					name: 'btnSaveSertifikasi',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveSertifikasi
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetReferensi
				}]
			},{
				id: 'tab7',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'History Mutasi',
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
					title: 'History Mutasi',
					xtype: 'fieldset',
					items: [
						gridHistoryMutasi
					]
				}]
			},{
				id: 'tab8',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Perubahan Data',
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
					title: 'Perubahan Data',
					xtype: 'fieldset',
					items: [
						gridPerubahanData
					]
				}]
			},{
				id: 'tab9',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Non-Aktif',
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
					title: 'Non Aktif',
					xtype: 'fieldset',
					items: [
						txtNIK_9,
						cboNonAktif,
						cboTglNonAktif,
						txtCatatanNonAktif
					]
				}],
				buttons: [{
					iconCls: 'icon-save',
					id: 'btnSaveNonAktif',
					name: 'btnSaveNonAktif',
					text: 'Save',
					scale: 'medium',
					handler: fnCekSaveNonAktif
				},{
					iconCls: 'icon-reset',
					text: 'Reset',
					scale: 'medium',
					handler: fnResetNonAktif
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmKaryawan
	});

	function fnMaskShow() {
		frmKaryawan.mask('Please wait...');
	}

	function fnMaskHide() {
		frmKaryawan.unmask();
	}
	
	frmKaryawan.render(Ext.getBody());
	Ext.get('loading').destroy();
});