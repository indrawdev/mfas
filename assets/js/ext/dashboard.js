Ext.Loader.setConfig({
	enabled: true
});

Ext.Loader.setPath('Ext.ux', gBaseUX);

Ext.require([
	'Ext.ux.ProgressBarPager',
	'Ext.ux.window.Notification'
]);

Ext.onReady(function() {

	var jmlKaryawan = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 250,
		store: {
			fields: ['name', 'value'],
		   	data: [{
		   		name: 'Pusat',
		   		value: 90,
		   	},{
		   		name: 'Lokasi 1',
		   		value: 70
		   	},{
		   		name: 'Lokasi 2',
		   		value: 50
		   	}, {
		   		name: 'Lokasi 3',
		   		value: 28
		   	}, {
		   		name: 'Lokasi 4',
		   		value: 56
		   	}, {
		   		name: 'Lokasi 5',
		   		value: 19
		   	},{
		   		name: 'Lokasi 6',
		   		value: 79
		   	},{
		   		name: 'Lokasi 7',
		   		value: 66
		   	},{
		   		name: 'Lokasi 8',
		   		value: 54
		   	}]
		},
		axes: [{
			type: 'numeric3d',
			position: 'left',
			fields: 'value',
			majorTickSteps: 2
		},{
			type: 'category3d',
			position: 'bottom',
			title: {
				text: 'AGUSTUS, 2017',
				fontSize: 13
			},
			fields: 'name'
		}],
		series: {
			type: 'bar3d',
			subStyle: {
				fill: ['#7CFC00'],
				stroke: '#C3C621'
			},
			xField: 'name',
			yField: 'value',
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml(storeItem.get('name') + ': ' + storeItem.get(item.series.getYField()) + ' Karyawan');
				}
			}
		}
	});

	var jmlCuti = Ext.create({
		xtype: 'cartesian',
		width: '100%',
		height: 200,
		store: {
			fields: ['name', 'value'],
			data: [{
				'name': '01',
				'value': 10,
			},{
				'name': '02',
				'value': 7,
			},{
				'name': '03',
				'value': 5,
			},{
				'name': '04',
				'value': 2,
			},{
				'name': '05',
				'value': 16,
			},{
				'name': '06',
				'value': 6,
			},{
				'name': '07',
				'value': 4,
			},{
				'name': '08',
				'value': 16,
			},{
				'name': '09',
				'value': 7,
			}]
		},
		axes: [{
			type: 'numeric',
			position: 'left',
			fields: ['value'],
			title: {
				text: 'TOTAL USER LOGIN',
				fontSize: 11
			},
			grid: true,
			minimum: 0
		},{
			type: 'category',
			position: 'bottom',
			fields: ['name'],
			title: {
				text: 'AGUSTUS, 2017',
				fontSize: 12
			}
		}],
		series: [{
			type: 'line',
			style: {
				stroke: '#30BDA7',
				lineWidth: 2
			},
			xField: 'name',
			yField: 'value',
			marker: {
				type: 'path',
				path: ['M', - 4, 0, 0, 4, 4, 0, 0, - 4, 'Z'],
				stroke: '#30BDA7',
				lineWidth: 2,
				fill: 'white'
			}
		},{
			type: 'line',
			fill: true,
			style: {
				fill: '#96D4C6',
				fillOpacity: .6,
				stroke: '#0A3F50',
				strokeOpacity: .6,
			},
			xField: 'name',
			yField: 'value',
			marker: {
				type: 'circle',
				radius: 4,
				lineWidth: 2,
				fill: 'white'
			},
			tooltip: {
				trackMouse: true,
				style: 'background: #fff',
				renderer: function(storeItem, item) {
					this.setHtml('TANGGAL ' + storeItem.get('name') + ' : ' + storeItem.get(item.series.getYField()) + ' USER');
				}
			}
		}]
	});

	var frmChart = Ext.create('Ext.form.Panel', {
		width: 930,
		border: false,
		frame: true,
		region: 'center',
		title: 'Dashboard',
		items: [{
			anchor: '100%',
			style: 'padding: 5px;',
			title: 'Karyawan',
			xtype: 'fieldset',
			items: [
				jmlKaryawan
			]
		}]
	});

	var vMask = new Ext.LoadMask({
		msg: 'Please wait...',
		target: frmChart
	});

	function fnMaskShow() {
		frmChart.mask('Please wait...');
	}

	function fnMaskHide() {
		frmChart.unmask();
	}

	frmChart.render(Ext.getBody());
	Ext.get('loading').destroy();

});