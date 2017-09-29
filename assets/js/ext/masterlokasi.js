Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.form.NumericField',
	'Ext.ux.ProgressBarPager',
	'Ext.ux.GMapPanel',
	'Ext.ProgressBar',
	'Ext.view.View'
]);

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.util.Format.thousandSeparator = ',';
	Ext.util.Format.decimalSeparator = '.';

	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

	Ext.define('DataGridLokasi', {
		extend: 'Ext.data.Model',
		fields: [
			{name: 'fs_kode_lokasi', type: 'string'},
			{name: 'fs_nama_lokasi', type: 'string'},
			{name: 'fs_alamat_lokasi', type: 'string'},
			{name: 'fs_telepon_lokasi', type: 'string'},
			{name: 'fs_latitude', type: 'string'},
			{name: 'fs_longitude', type: 'string'}
		]	
	});

	var grupLokasi = Ext.create('Ext.data.Store', {
		autoLoad: true,
		model: 'DataGridLokasi',
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
			url: 'masterlokasi/grid'
		},
		listeners: {
			beforeload: function(store) {
				Ext.apply(store.getProxy().extraParams, {
					'fs_cari': Ext.getCmp('txtCari').getValue()
				});
			}
		}
	});

	var gridLokasi = Ext.create('Ext.grid.Panel', {
		defaultType: 'textfield',
		height: 350,
		sortableColumns: false,
		store: grupLokasi,
		columns: [{
			xtype: 'rownumberer',
			width: 25
		},{
			text: 'Kode Lokasi',
			dataIndex: 'fs_kode_lokasi',
			menuDisabled: true,
			width: 80
		},{
			text: 'Nama Lokasi',
			dataIndex: 'fs_nama_lokasi',
			menuDisabled: true,
			width: 220
		},{
			text: 'Alamat Lokasi',
			dataIndex: 'fs_alamat_lokasi',
			menuDisabled: true,
			width: 380
		},{
			text: 'No. Telepon',
			dataIndex: 'fs_no_tlp',
			menuDisabled: true,
			width: 120
		},{
			xtype:'actioncolumn',
			width: 20,
			items: [{
				iconCls: 'icon-delete',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex, e) {
					var str = grid.getStore().getAt(rowIndex).get('fs_kode_lokasi');
					if (str) {
						Ext.MessageBox.show({
							title:'Delete record',
							msg: 'Would you like to delete?',
							buttons: Ext.Msg.YESNO,
							icon: Ext.Msg.QUESTION,
							fn: function(btn) {
								if (btn == "yes") {
									Ext.Ajax.request({
										url : 'masterlokasi/remove/',
			            				params : {
											'fs_kode_lokasi': str
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
											fnReset();
											grupLokasi.load();  
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
			text: 'Latitude',
			dataIndex: 'fs_latitude',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Longitude',
			dataIndex: 'fs_longitude',
			menuDisabled: true,
			hidden: true
		},{
			text: 'Aktif',
			dataIndex: 'fs_aktif',
			menuDisabled: true,
			hidden: true
		}],
		bbar: Ext.create('Ext.PagingToolbar', {
			displayInfo: true,
			pageSize: 25,
			plugins: Ext.create('Ext.ux.ProgressBarPager', {}),
			store: grupLokasi
		}),
		tbar: [{
			flex: 1.4,
			layout: 'anchor',
			xtype: 'container',
			items: [{
				anchor: '98%',
				emptyText: 'Kode / Nama Lokasi',
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
					grupLokasi.load();
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
				Ext.getCmp('txtKodeLokasi').setValue(record.get('fs_kode_lokasi'));
				Ext.getCmp('txtNamaLokasi').setValue(record.get('fs_nama_lokasi'));
				Ext.getCmp('txtAlamatLokasi').setValue(record.get('fs_alamat_lokasi'));
				Ext.getCmp('txtTeleponLokasi').setValue(record.get('fs_no_tlp'));
				Ext.getCmp('txtLongitude').setValue(record.get('fs_longitude'));
				Ext.getCmp('txtLatitude').setValue(record.get('fs_latitude'));
				Ext.getCmp('cboAktif').setValue(record.get('fs_aktif'));

				// CHANGE TAB
				var tabPanel = Ext.ComponentQuery.query('tabpanel')[0];
				tabPanel.setActiveTab('tab2');
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
			url: 'masterlokasi/select'
		}
	});

	// COMPONENT FORM MASTER LOKASI
	var txtKodeLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '50%',
		fieldLabel: 'Kode Lokasi',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtKodeLokasi',
		name: 'txtKodeLokasi',
		xtype: 'textfield',
		minLength: '1',
		maxLength: '5',
		enforceMaxLength: true,
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtNamaLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Nama Lokasi',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtNamaLokasi',
		name: 'txtNamaLokasi',
		xtype: 'textfield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtAlamatLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		height : 50,
		fieldLabel: 'Alamat',
		fieldStyle: 'text-transform: uppercase;',
		id: 'txtAlamatLokasi',
		name: 'txtAlamatLokasi',
		xtype: 'textareafield',
		listeners: {
			change: function(field, newValue) {
				field.setValue(newValue.toUpperCase());
			}
		}
	};

	var txtTeleponLokasi = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		fieldLabel: 'Telepon',
		id: 'txtTeleponLokasi',
		name: 'txtTeleponLokasi',
		xtype: 'textfield',
		minValue: 0,
		maxLength: 15,
		enforceMaxLength: true
	};

	var txtLatitude = {
		anchor: '100%',
		fieldLabel: 'Latitude',
		id: 'txtLatitude',
		name: 'txtLatitude',
		xtype: 'textfield'
	};

	var txtLongitude = {
		anchor: '100%',
		fieldLabel: 'Longitude',
		id: 'txtLongitude',
		name: 'txtLongitude',
		xtype: 'textfield'
	};

	var cboAktif = {
		afterLabelTextTpl: required,
		allowBlank: false,
		anchor: '100%',
		displayField: 'fs_nama',
		editable: false,
		fieldLabel: 'Aktif',
		id: 'cboAktif',
		name: 'cboAktif',
		store: grupSelect,
		valueField: 'fs_kode',
		xtype: 'combobox',
	};

	var lokasiMap = {
			width: '100%',
			height: 300,
			xtype: 'gmappanel',
			id: 'lokasiMap',
			gmapType: 'map',
			zoomLevel: 15,
	        useCurrentLocation: true,
			enableDragDrop: true,
			getLocation: true,
			mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging', 'enableDragDrop'],
			mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'], 
			mapOptions : {
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
	        },
			center: {
				geoCodeAddr: '465 Huntington Avenue, Boston, MA, 02215-5597, USA',
			},
			markers: [{
				lat: 42.339119,
			    lng: -71.09277,
			    marker: {title: 'Boston Museum of Fine Arts'},
			    listeners: {
			        click: function(e){
			            Ext.Msg.alert('Its fine', 'and its art.');
			        }
			    }
			},{
			    lat: 42.339419,
			    lng: -71.09077,
			    marker: {title: 'Northeastern University'}
			}],
			listeners: {
				click: {
					element: 'el', //bind to the underlying el property on the panel
			            fn: function() { 
			            	//console.log('click el');
			        	}
			    },
			    dblclick: {
			    	element: 'body', //bind to the underlying body property on the panel
			            fn: function(){ 
			            	//console.log('dblclick body');
			       	 	}
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

	// FUNCTION FORM MASTER LOKASI
	function fnReset() {
		Ext.getCmp('txtKodeLokasi').setValue('');
		Ext.getCmp('txtNamaLokasi').setValue('');
		Ext.getCmp('txtAlamatLokasi').setValue('');
		Ext.getCmp('txtTeleponLokasi').setValue('');
		Ext.getCmp('txtLongitude').setValue('');
		Ext.getCmp('txtLatitude').setValue('');
		Ext.getCmp('cboAktif').setValue('');
	}

	function fnCekSave() {
		if (this.up('form').getForm().isValid()) {
			Ext.Ajax.on('beforerequest', fnMaskShow);
			Ext.Ajax.on('requestcomplete', fnMaskHide);
			Ext.Ajax.on('requestexception', fnMaskHide);

			Ext.Ajax.request({
				method: 'POST',
				url: 'masterlokasi/ceksave',
				params: {
					'fs_kode_lokasi': Ext.getCmp('txtKodeLokasi').getValue()
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
									fnSave();
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

	function fnSave() {
		Ext.Ajax.on('beforerequest', fnMaskShow);
		Ext.Ajax.on('requestcomplete', fnMaskHide);
		Ext.Ajax.on('requestexception', fnMaskHide);

		Ext.Ajax.request({
			method: 'POST',
			url: 'masterlokasi/save',
			params: {
				'fs_kode_lokasi': Ext.getCmp('txtKodeLokasi').getValue(),
				'fs_nama_lokasi': Ext.getCmp('txtNamaLokasi').getValue(),
				'fs_alamat_lokasi': Ext.getCmp('txtAlamatLokasi').getValue(),
				'fs_no_tlp': Ext.getCmp('txtTeleponLokasi').getValue(),
				'fs_longitude': Ext.getCmp('txtLongitude').getValue(),
				'fs_latitude': Ext.getCmp('txtLatitude').getValue(),
				'fs_aktif': Ext.getCmp('cboAktif').getValue()
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
				fnReset();

				// REFRESH AFTER SAVE
				grupLokasi.load();

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

	var frmMasterLokasi = Ext.create('Ext.form.Panel', {
		border: false,
		frame: true,
		region: 'center',
		title: 'Daftar Lokasi',
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
				title: 'Daftar Lokasi',
				items: [{
					fieldDefaults: {
						labelAlign: 'right',
						labelSeparator: '',
						labelWidth: 140,
						msgTarget: 'side'
					},
					anchor: '100%',
					style: 'padding: 5px;',
					title: 'Daftar Lokasi',
					xtype: 'fieldset',
					items: [
						gridLokasi
					]	
				}]
			},{
				id: 'tab2',
				bodyStyle: 'background-color: '.concat(gBasePanel),
				border: false,
				frame: false,
				title: 'Setup Lokasi',
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
								title: 'Setup Lokasi',
								xtype: 'fieldset',
								items: [
									txtKodeLokasi,
									txtNamaLokasi,
									txtAlamatLokasi,
									txtTeleponLokasi,
									txtLongitude,
									txtLatitude,
									cboAktif
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
							flex: 1,
							layout: 'anchor',
							xtype: 'container',
							items: [{
								anchor: '98%',
								style: 'padding: 5px;',
								title: 'Google Map',
								xtype: 'fieldset',
								items: [
									lokasiMap,
								
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
		target: frmMasterLokasi
	});

	function fnMaskShow() {
		frmMasterLokasi.mask('Please wait...');
	}

	function fnMaskHide() {
		frmMasterLokasi.unmask();
	}
	
	frmMasterLokasi.render(Ext.getBody());
	Ext.get('loading').destroy();

});