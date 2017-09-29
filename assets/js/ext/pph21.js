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

	Ext.define('DataGridCSV', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_nama', type: 'string'}
		]
	});

	Ext.define('DataGridKaryawan', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'int'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_jenis_kelamin', type: 'string'},
			{name: 'fn_npwp', type: 'string'},
			{name: 'fs_metode', type: 'string'},
			{name: 'fd_tanggal_masuk', type: 'string'},
			{name: 'fn_gaji_kotor', type: 'string'},
			{name: 'fn_pajak_bulanan', type: 'string'},
			{name: 'fn_gaji_bersih', type: 'string'}
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
			url: 'pph21/gridkaryawan'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCariKaryawan').getValue()
				});
			}
		}
	});
	
	// COMPONENT FORM KARYAWAN
	var gridKaryawan = Ext.create('Ext.grid.Panel', {
		anchor: '100%',
		defaultType: 'textfield',
		height: 400,
		sortableColumns: false,
		store: grupKaryawan,
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			dataIndex: 'fn_nik',
			text: 'NIK',
			menuDisabled: true,
			hidden: true
		},{
			dataIndex: 'fs_nama_karyawan',
			text: 'Nama Karyawan',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'Jenis Kelamin',
			dataIndex: 'fs_jenis_kelamin',
			menuDisabled: true,
			locked: true,
			width: 120
		},{
			text: 'NPWP',
			dataIndex: 'fn_npwp',
			menuDisabled: true,
			locked: true,
			width: 120
		},{
			text: 'Metode',
			dataIndex: 'fs_metode',
			menuDisabled: true,
			width: 120
		},{
			text: 'Tanggal Masuk',
			dataIndex: 'fd_tanggal_masuk',
			menuDisabled: true,
			width: 100
		},{
			text: 'Gaji Kotor',
			dataIndex: 'fn_gaji_kotor',
			menuDisabled: true,
			width: 100
		},{
			text: 'Pajak Bulanan',
			dataIndex: 'fn_pajak_bulanan',
			menuDisabled: true,
			width: 100
		},{
			text: 'Gaji Bersih',
			dataIndex: 'fn_gaji_bersih',
			menuDisabled: true,
			width: 100
		}],
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'NIK / Nama Karyawan',
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
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	// COMPONENT FORM SETOR PAJAK

	// COMPONENT FORM LAPOR PAJAK

	var frmPPh21 = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'PPh 21',
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
				title: 'Karyawan',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Karyawan',
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
				title: 'Setor Pajak',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Setor Pajak',
					xtype: 'fieldset',
					items: [
						
					]
				}]
			},{
				id: 'tab3',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Lapor Pajak',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Lapor Pajak',
					xtype: 'fieldset',
					items: [
						
					]
				}]
			}]
		}]
	});
	
	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmPPh21
	});

	function fnMaskShow() {
		frmPPh21.mask('Please wait...');
	}

	function fnMaskHide() {
		frmPPh21.unmask();
	}
	
	frmPPh21.render(Ext.getBody());
	Ext.get('loading').destroy();
});