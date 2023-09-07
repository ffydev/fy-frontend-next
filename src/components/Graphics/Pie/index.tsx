import React, { Component } from 'react'
import Chart from 'react-apexcharts'

interface ChartPieState {
  options: {
    labels: string[]
    colors: string[]
    title: {
      text: string
      align: 'center' | 'left' | 'right' | undefined
    }
    responsive: {
      breakpoint: number
      options: {
        legend: {
          position: string
        }
      }
    }[]
  }
  series: number[]
}

class ChartPie extends Component<{}, ChartPieState> {
  constructor(props: any) {
    super(props)

    this.state = {
      options: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        colors: [
          '#F44F5E',
          '#2b2f5a',
          '#6b44c7',
          '#0b7ce6',
          '#0025cc',
          '#8D95EB',
          '#62ACEA',
          '#4BC3E6',
        ],
        title: {
          text: 'Pie Chart',
          align: 'center',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
      series: [60, 63, 66, 64, 66, 16, 16, 16],
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
              type="pie"
              width="380"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default ChartPie
