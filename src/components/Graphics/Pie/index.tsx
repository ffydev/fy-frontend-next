import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ChartPie: React.FC<any> = ({ series, labels }) => {
  const options = {
    series: series[0]?.data || [0],
    labels: labels || [],
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
  }

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {typeof window !== 'undefined' && (
            <Chart
              options={options}
              series={options.series}
              type="pie"
              width="380"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export { ChartPie }
