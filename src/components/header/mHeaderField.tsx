import LogField from '@/components/header/HeadlogField'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MNaviBar from '@/components/header/MNaviBar'

export default function MHeaderField() {
  return (
    <nav className='flex h-20 w-full flex-col items-center justify-between px-4 sm:hidden'>
      <div className='flex h-full w-full items-center justify-between'>
        <div className='flex items-center gap-3'>
          <MNaviBar />
          <Link href='/' className='relative h-[30px] w-[30px]' scroll={false}>
            <Image
              src={'/logo/favicon.png'}
              alt='Logo 이미지'
              fill
              sizes='(max-width: 640px) 30px, (max-width: 768px) 35px, 50px'
              className='object-contain'
            />
          </Link>
        </div>
        <LogField />
      </div>
    </nav>
  )
}
