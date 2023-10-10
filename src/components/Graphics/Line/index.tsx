import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
interface ChartLineProps {
  series: any[]
  categories: any[]
}
const ChartLine: React.FC<ChartLineProps> = ({ series, categories }) => {
  const options = {
    chart: {
      id: 'basic-line',
      foreColor: '#fff',
      toolbar: {
        show: false,
      },
    },
    colors: ['#4400ff', '#17ead9', '#f02fc2'],
    stroke: {
      width: 3,
    },
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
      categories,
      labels: {
        show: true,
      },
    },
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {typeof window !== 'undefined' && (
            <Chart options={options} series={series} type="line" width="500" />
          )}
        </div>
      </div>
    </div>
  )
}

export { ChartLine }
