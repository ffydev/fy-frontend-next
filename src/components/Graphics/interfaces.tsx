export interface AppState {
  options: {
    chart: {
      id: string
      foreColor: string
      toolbar: {
        show: boolean
      }
    }
    grid: {
      borderColor: string
    }
    fill: {
      type: string
      gradient: {
        gradientToColors: string[]
      }
    }
    tooltip: {
      theme: string
    }
    dataLabels: {
      enabled: boolean
    }
    stroke: {
      width: number
    }
    colors: string[]
    xaxis: {
      axisTicks: {
        color: string
      }
      axisBorder: {
        color: string
      }
      categories: string[]
      labels: {
        show: boolean
      }
    }
  }
  series: {
    name: string
    data: number[]
  }[]
}
