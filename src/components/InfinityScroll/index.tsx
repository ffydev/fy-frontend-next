import React, { useState, useEffect, useRef } from 'react'
import Loading from '../Loading'

interface InfiniteScrollProps {
  data: unknown[] | any
  renderItem: unknown[] | any
}

const InfiniteScroll = ({ data, renderItem }: InfiniteScrollProps) => {
  const [list, setList] = useState(data.slice(0, 6))
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (
        sentinelRef.current &&
        sentinelRef.current.offsetTop <
          window.innerHeight + document.documentElement.scrollTop
      ) {
        setLoading(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!loading) return
    if (page * 10 >= data.length) return setLoading(false)
    setTimeout(() => {
      setList(list.concat(data.slice(page * 10, page * 10 + 10)))
      setPage(page + 1)
      setLoading(false)
    }, 250)
  }, [loading])

  return (
    <>
      {list.map(renderItem)}
      <div ref={sentinelRef} style={{ height: '1px' }}></div>
      {loading && <Loading />}
    </>
  )
}

export default InfiniteScroll
