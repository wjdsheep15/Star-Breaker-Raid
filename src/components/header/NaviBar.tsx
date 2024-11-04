import Link from 'next/link'

export default function NaviBar() {
  return (
    <div className='flex h-8 w-auto items-center justify-center gap-12 text-base sm:text-lg'>
      <Link href={'/'}>
        <span className='hover:text-blue-500 sm:text-xl'>메인</span>
      </Link>
      <Link href={'/raidguide'}>
        <span className='hover:text-blue-500 sm:text-xl'>공략</span>
      </Link>
      <Link href={'/raidpost'}>
        <span className='hover:text-blue-500 sm:text-xl'>모집글</span>
      </Link>
      <Link href={'/mypage'}>
        <span className='hover:text-blue-500 sm:text-xl'>마이페이지</span>
      </Link>
    </div>
  )
}
