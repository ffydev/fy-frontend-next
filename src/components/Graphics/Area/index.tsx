import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ChartLineProps {
  series: any[]
  categories: any[]
}

const ChartArea: React.FC<ChartLineProps> = ({ series, categories }) => {
  const options = {
    chart: {
      id: 'basic-area',
      foreColor: '#333',
    },
    xaxis: {
      categories,
    },
    colors: ['#ea1717'],
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
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {typeof window !== 'undefined' && (
            <Chart options={options} series={series} type="area" width="500" />
          )}
        </div>
      </div>
    </div>
  )
}

export { ChartArea }
