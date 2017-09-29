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

	Ext.define('DataGridStatus', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fn_nik', type: 'string'},
			{name: 'fs_nama_karyawan', type: 'string'},
			{name: 'fs_jenis_cuti', type: 'string'},
			{name: 'fd_tanggal_dari', type: 'string'},
			{name: 'fd_tanggal_sampai', type: 'string'},
			{name: 'fn_slot_cuti', type: 'string'},
		]
	});

	var gridStatusCuti = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: '',
		columns: [{
			xtype: 'rownumberer',
			width: 45
		},{
			text: 'NIK',
			dataIndex: 'fn_nik',
			menuDisabled: true,
			locked: true,
			width: 80
		},{
			text: 'Nama Karyawan',
			dataIndex: 'fs_nama_karyawan',
			menuDisabled: true,
			locked: true,
			width: 240
		},{
			text: 'Jenis Cuti',
			dataIndex: 'fs_jenis_cuti',
			menuDisabled: true,
			width: 150
		},{
			text: 'Dari',
			dataIndex: 'fd_tanggal_dari',
			menuDisabled: true,
			width: 100
		},{
			text: 'Sampai',
			dataIndex: 'fd_tanggal_sampai',
			menuDisabled: true,
			width: 100	
		},{
			text: 'Sisa Cuti',
			dataIndex: 'fn_slot_cuti',
			menuDisabled: true,
			width: 100
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
				emptyText: 'Nama Karyawan',
				id: 'txtCari',
				name: 'txtCari',
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
			store: ''
		}),
		viewConfig: {
			getRowClass: function() {
				return 'rowwrap';
			},
			markDirty: false,
			stripeRows: true
		}
	});

	var frmStatusCuti = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Status Cuti',
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
			title: 'Status Cuti',
			xtype: 'fieldset',
			items: [
				gridStatusCuti
			]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmStatusCuti
	});

	function fnMaskShow() {
		frmStatusCuti.mask('Please wait...');
	}

	function fnMaskHide() {
		frmStatusCuti.unmask();
	}
	
	frmStatusCuti.render(Ext.getBody());
	Ext.get('loading').destroy();

});