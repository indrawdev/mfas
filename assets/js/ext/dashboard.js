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

	var grupSetuju = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
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
			url: 'dashboard/setuju'
		}
	});

	var grupTolak = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
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
			url: 'dashboard/tolak'
		}
	});

	var grupProses = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
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
			url: 'dashboard/proses'
		}
	});

	var grupBatal = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
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
			url: 'dashboard/batal'
		}
	});

	var grupMGrade = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
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
			url: 'dashboard/monthgrade'
		}
	});

	var grupYGrade = Ext.create('Ext.data.Store', {
		autoLoad: true,
		fields: ['name', 'value'],
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
			url: 'dashboard/yeargrade'
		}
	});

	// VIEW CHART
	var diSetujui = Ext.create({
		xtype: 'cartesian',
		width: 360,
		height: 250,
		plugins: {
			ptype: 'chartitemevents',
			moveEvents: true
		},
		store: grupSetuju,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'APK DISETUJUI',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#54DF14'],
				stroke: '#53C81C'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
				}
			}
		}
	});

	var diTolak = Ext.create({
		xtype: 'cartesian',
		width: 360,
		height: 250,
		store: grupTolak,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'APK DITOLAK',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#EF1515'],
				stroke: '#E41E1E'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
				}
			}
		}
	});

	var diProses = Ext.create({
		xtype: 'cartesian',
		width: 360,
		height: 250,
		store: grupProses,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'APK DALAM PROSES',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#2255AE'],
				stroke: '#1B4184'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
				}
			}
		}
	});

	var diBatal = Ext.create({
		xtype: 'cartesian',
		width: 360,
		height: 250,
		store: grupBatal,
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'APK BATAL',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#E0E41E'],
				stroke: '#C3C621'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' APK');
				}
			}
		}
	});

	var monthGrade = Ext.create({
		xtype: 'polar',
		width: 200,
		height: 200,
		theme: 'green',
		interactions: ['rotate', 'itemhighlight'],
		store: grupMGrade,
		series: {
			type: 'pie',
			highlight: true,
			angleField: 'value',
			label: {
	  			field: 'name',
	  			display: 'inside',
	  			fontSize: 10
	  		},
	  		tooltip: {
	            trackMouse: true,
	            style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get('value') + ' APK');
	                }
	        },
	  		xField: 'number',
	  		donut: 30
		}
	});

	var yearGrade = Ext.create({
		xtype: 'polar',
		width: 200,
		height: 200,
		theme: 'green',
		interactions: ['rotate', 'itemhighlight'],
		store: grupYGrade,
	  	series: {
	  		type: 'pie',
	  		highlight: true,
	  		angleField: 'value',
	  		label: {
	  			field: 'name',
	  			display: 'inside',
	  			fontSize: 10
	  		},
	  		tooltip: {
	            trackMouse: true,
	            style: 'background: #fff',
	                renderer: function(storeItem, item) {
	                    this.setHtml(storeItem.get('name') + ': ' + storeItem.get('value') + ' APK');
	                }
	        },
	  		donut: 30
		}
	});

	// COMPONENT DASHBOARD
	var btnReload = {
		anchor: '100%',
		scale: 'small',
		text: 'Refresh',
		xtype: 'button',
		handler: fnReload
	};

	// FUNCTION
	function fnReload() {

	}

	var frmDashboard = Ext.create('Ext.form.Panel', {
		width: 990,
		border: false,
		frame: true,
		region: 'center',
		title: 'Dashboard',
		items: [{
			anchor: '100%',
			style: 'padding: 1px;',
			border: false,
			xtype: 'fieldset',
			items: [{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Disetujui',
						xtype: 'fieldset',
						items: [
							diSetujui
						]
					}]
				},{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Ditolak',
						xtype: 'fieldset',
						items: [
							diTolak
						]
					}]
				},{
					flex: 1.2,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Monthly Grade',
						xtype: 'fieldset',
						items: [
							monthGrade
						]
					}]
				}]
			},{
				anchor: '100%',
				layout: 'hbox',
				xtype: 'container',
				items: [{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Dalam Proses',
						xtype: 'fieldset',
						items: [
							diProses
						]
					}]
				},{
					flex: 2.1,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Analisa Keputusan Batal',
						xtype: 'fieldset',
						items: [
							diBatal
						]
					}]
				},{
					flex: 1.2,
					layout: 'anchor',
					xtype: 'container',
					items: [{
						anchor: '99%',
						style: 'padding: 5px;',
						title: 'Yearly Grade',
						xtype: 'fieldset',
						items: [
							yearGrade
						]
					},{
						anchor: '99%',
						style: 'padding: 5px;',
						xtype: 'fieldset',
						items: [
							btnReload
						]
					}]
				}]
			}]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmDashboard
	});

	function fnMaskShow() {
		frmDashboard.mask('Please wait...');
	}

	function fnMaskHide() {
		frmDashboard.unmask();
	}
	
	frmDashboard.render(Ext.getBody());
	Ext.get('loading').destroy();
});