import React, { Component } from 'react'
import Chart from 'react-apexcharts'

class ChartBar extends Component<{}, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      options: {
        chart: {
          id: 'basic-bar',
          foreColor: '#fff',
          toolbar: {
            show: false,
          },
        },
        colors: ['#4400ff', '#17ead9', '#f02fc2'],
        dataLabels: {
          enabled: false,
        },
        grid: {
          borderColor: '#40475D',
        },
        fill: {
          type: 'gradient',
          gradient: {
            gradientToColors: ['#e8f808', '#6078ea', '#6094ea'],
          },
        },
        tooltip: {
          theme: 'dark',
        },
        xaxis: {
          axisTicks: {
            color: '#333',
          },
          axisBorder: {
            color: '#333',
          },
          categories: [
            'Semana 1',
            'Semana 2',
            'Semana 3',
            'Semana 4',
            'Semana 5',
            'Semana 6',
            'Semana 7',
            'Semana 8',
            'Semana 9',
          ],
          labels: {
            show: true,
            style: {
              colors: '#fff', // Cor dos rótulos no eixo X
            },
          },
        },
      },
      series: [
        {
          name: 'series-1',
          data: [60, 63, 66, 64, 66, 16, 16, 16],
        },
      ],
    }
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar" // Alterado para gráfico de barras
              width="500"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChartBar
