//Init Highcharts Functions
function loadPie(data) {
  let pieChart = Highcharts.chart('container-pie', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
        text: 'PIE CHART'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
      name: 'Time',
      colorByPoint: true,
      data: [{
          name: 'Target Time',
          y: data.target_time,
          sliced: true,
          selected: true
      }, {
          name: 'Working Time',
          y: data.working_time
      }, {
          name: 'Achievement',
          y: data.achievement
      }, {
          name: 'Overtime',
          y: data.overtime
      }]
    }]
  })
  return pieChart
}

function loadColumn(data) {
  let columnChart = Highcharts.chart('container-column', {
    chart: {
      type: 'column'
    },
    title: {
      text: 'COLUMN CHART'
    },
    xAxis: {
      categories: data.date,
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Time (hour)'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:  '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} hour</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Target Time',
      data: data.target_time,


    }, {
      name: 'Work Time',
      data: data.working_time

    }, {
      name: 'Achievement',
      data: data.achievement

    }, {
      name: 'Over Time',
      data: data.overtime

    }]
  })
  return columnChart
}

function loadArea(data) {
  let areaChart = Highcharts.chart('container-area', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'AREA CHART'
    },
    xAxis: {
        allowDecimals: false,
        title: {
          text: 'Date'
        },
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        },
    },
    yAxis: {
        title: {
            text: 'Total Time'
        },
        labels: {
            formatter: function () {
                return this.value + ' hours';
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} total <b>{point.y:,.0f}</b><br/>in Day {point.x}'
    },
    plotOptions: {
        area: {
            pointStart: data.date[0],
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 1,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'Target Time',
        data: data.target_time
    }, {
        name: 'Working Time',
        data: data.working_time
    }, {
        name: 'Overtime',
        data: data.overtime
     }, {
        name: 'Achievement',
        data: data.achievement
     }]
  })
  return areaChart
}

//Get Data Function
const getPieData = async () => {
  const columnData = await window.onload()
  const sumData = {}
  const newData = {}
  const isDataEmpty = Object.values(columnData).length === 0
  
  if (isDataEmpty) {
    sumData.target_time = 0
    sumData.working_time = 0
    sumData.achievement = 0
    sumData.overtime = 0
  } else {
    //Mapping Array
    newData.date = columnData.map(data => moment(data.date).format('YYYY MMMM DD'))
    newData.target_time = columnData.map(data => data.target_time)
    newData.working_time = columnData.map(data => data.working_time)
    newData.achievement = columnData.map(data => data.achievement)
    newData.overtime = columnData.map(data => data.overtime)
    newData.day = columnData.map(data => data.day)
    //Sum Array
    sumData.target_time = newData.target_time.reduce((previousValue, currentValue) => previousValue + currentValue)
    sumData.working_time = newData.working_time.reduce((previousValue, currentValue) => previousValue + currentValue)
    sumData.achievement = newData.achievement.reduce((previousValue, currentValue) => previousValue + currentValue)
    sumData.overtime = newData.overtime.reduce((previousValue, currentValue) => previousValue + currentValue)
  }
  return sumData
}

const getColumnData = async () => {
  const columnData = await window.onload()
  const newData = {}
  newData.date = columnData.map(data => moment(data.date).format('YYYY MMMM DD'))
  newData.target_time = columnData.map(data => data.target_time)
  newData.working_time = columnData.map(data => data.working_time)
  newData.achievement = columnData.map(data => data.achievement)
  newData.overtime = columnData.map(data => data.overtime)
  newData.day = columnData.map(data => data.day)
  return newData
}

const getAreaData = async () => {
  const columnData = await window.onload()
  const newData = {}
  newData.date = columnData.map(data => parseInt(moment(data.date).format('DD')))
  newData.target_time = columnData.map(data => data.target_time)
  newData.working_time = columnData.map(data => data.working_time)
  newData.achievement = columnData.map(data => data.achievement)
  newData.overtime = columnData.map(data => data.overtime)
  newData.day = columnData.map(data => data.day)
  return newData
}

const loadChart = async () => {
  const pieData = await getPieData()
  const columnData = await getColumnData()
  const areaData = await getAreaData()
  loadPie(pieData)
  loadColumn(columnData)
  loadArea(areaData)
}

//Function Execution
loadChart()

filterBtn.click( async () => {
  const pieData = await getPieData()
  const columnData = await getColumnData()
  const areaData = await getAreaData()
  const pieChart = await loadPie(pieData)
  const columnChart = await loadColumn(columnData)
  const areaChart = await loadArea(areaData)
  
  //Update Pie Chart
  pieChart.series[0].data[0].update({
    y: pieData.target_time
  })
  pieChart.series[0].data[1].update({
    y: pieData.working_time
  })
  pieChart.series[0].data[2].update({
    y: pieData.achievement
  })
  pieChart.series[0].data[3].update({
    y: pieData.overtime
  })
  pieChart.redraw()
  //Update Column Chart
  columnChart.xAxis[0].setCategories(columnData.date) //update xAxis
  columnChart.series[0].update({
    data: columnData.target_time
  })
  columnChart.series[1].update({
    data: columnData.working_time
  })
  columnChart.series[2].update({
    data: columnData.achievement
  })
  columnChart.series[3].update({
    data: columnData.overtime
  })
  columnChart.redraw()
  //Update Area Chart
  areaChart.plotOptions.area.pointStart.update(areaData.date[0])
  areaChart.series[0].update({
    data: areaData.target_time
  })
  areaChart.series[1].update({
    data: areaData.working_time
  })
  areaChart.series[2].update({
    data: areaData.achievement
  })
  areaChart.series[3].update({
    data: areaData.overtime
  })
  areaChart.redraw()
})


searchBtn.keyup( async () => {
  const pieData = await getPieData()
  const columnData = await getColumnData()
  const areaData = await getAreaData()
  const columnChart = await loadColumn(columnData)
  const pieChart = await loadPie(pieData)
  const areaChart = await loadArea(areaData)
  //Update Pie Chart
  pieChart.series[0].data[0].update({
    y: pieData.target_time
  })
  pieChart.series[0].data[1].update({
    y: pieData.working_time
  })
  pieChart.series[0].data[2].update({
    y: pieData.achievement
  })
  pieChart.series[0].data[3].update({
    y: pieData.overtime
  })
  pieChart.redraw()
  //Update Column Chart
  columnChart.xAxis[0].setCategories(columnData.date) //update xAxis
  columnChart.series[0].update({
    data: columnData.target_time
  })
  columnChart.series[1].update({
    data: columnData.working_time
  })
  columnChart.series[2].update({
    data: columnData.achievement
  })
  columnChart.series[3].update({
    data: columnData.overtime
  })
  columnChart.redraw()

  //Update Area Chart
  areaChart.plotOptions.area.pointStart.update(areaData.date[0])
  areaChart.series[0].update({
    data: areaData.target_time
  })
  areaChart.series[1].update({
    data: areaData.working_time
  })
  areaChart.series[2].update({
    data: areaData.achievement
  })
  areaChart.series[3].update({
    data: areaData.overtime
  })
  areaChart.redraw()
})




