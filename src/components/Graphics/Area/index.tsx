import React, { Component } from 'react'
import Chart from 'react-apexcharts'

interface ChartAreaState {
  options: {
    chart: {
      id: string
      foreColor: string
    }
    xaxis: {
      categories: string[]
    }
    colors: string[]
    fill: {
      type: string
      gradient: {
        shade: string
        shadeIntensity: number
        opacityFrom: number
        opacityTo: number
        stops: number[]
      }
    }
    dataLabels: {
      enabled: boolean
    }
    title: {
      text: string
      align: 'center' | 'left' | 'right' | undefined
    }
  }
  series: {
    name: string
    data: number[]
  }[]
}

class ChartArea extends Component<{}, ChartAreaState> {
  constructor(props: any) {
    super(props)

    this.state = {
      options: {
        chart: {
          id: 'basic-area',
          foreColor: '#333',
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        },
        colors: ['#17ead9'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.6,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Area Chart',
          align: 'center',
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
              type="area"
              width="500"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChartArea
