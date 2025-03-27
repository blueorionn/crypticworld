'use client'
import dynamic from 'next/dynamic'

const DynamicSideBar = dynamic(() => import('./SideBar'), {
  ssr: false,
})

export default DynamicSideBar
