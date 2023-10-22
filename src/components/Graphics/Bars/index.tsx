import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
interface ChartBarProps {
  series: any[]
  categories: any[]
}
const ChartBar: React.FC<ChartBarProps> = ({ series, categories }) => {
  const options = {
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
        gradientToColors: ['#6078ea', '#6094ea'],
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
        style: {
          colors: '#fff', // Cor dos rótulos no eixo X
        },
      },
    },
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {typeof window !== 'undefined' && (
            <Chart options={options} series={series} type="bar" width="500" />
          )}
        </div>
      </div>
    </div>
  )
}

export { ChartBar }
