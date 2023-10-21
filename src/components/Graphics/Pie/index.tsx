import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

const ChartPie: React.FC<any> = ({ series, labels }) => {
  const options = {
    series: series[0]?.data || [0],
    labels: labels || [],
    colors: [
      '#FF6B6B',
      '#3498DB',
      '#F39C12',
      '#9B59B6',
      '#2ECC71',
      '#E74C3C',
      '#2980B9',
      '#F1C40F',
      '#1ABC9C',
      '#E67E22',
      '#8E44AD',
      '#27AE60',
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            labels: {
              colors: '#fff',
            },
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
