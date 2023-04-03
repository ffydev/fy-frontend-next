import React, { useState, useEffect, useRef, useCallback } from 'react'
import Loading from '../Loading'

interface InfiniteScrollProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
}

export default function InfiniteScroll<T extends unknown>({
  data,
  renderItem,
}: InfiniteScrollProps<T>) {
  const [list, setList] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (
      sentinelRef.current &&
      sentinelRef.current.offsetTop <
        window.innerHeight + document.documentElement.scrollTop
    ) {
      setLoading(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!loading) return

    if (page * 10 >= data.length) {
      setLoading(false)
      return
    }

    const newData = data.slice(page * 10, page * 10 + 10)
    setList((prevList) => [...prevList, ...newData])
    setPage((prevPage) => prevPage + 1)
    setLoading(false)
  }, [loading, data, page])

  useEffect(() => {
    const newData = data.slice(0, 6)
    setList(newData)
    setPage(1)
  }, [data])

  return (
    <>
      {list.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
      <div ref={sentinelRef} style={{ height: '1px' }}></div>
      {loading && <Loading key="loading" />}
    </>
  )
}
