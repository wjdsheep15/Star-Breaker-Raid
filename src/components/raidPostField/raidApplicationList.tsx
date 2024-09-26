'use client'

import { useTrigger } from '@/store/triggerStore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  postId: number
  post_user: string
}

interface ApplicationList {
  applicants_id: number
  user_id: string
  character_name: string
  hope: string
  post_id: number
  character_image: string
  character_icon: string
  character_elixir: number
  character_transcendence: number
  character_check: boolean
  character_level: string
}

export default function RaidApplicationList({ postId, post_user }: Props) {
  const { data: session } = useSession()
  const { applicationTrigger, setApplicationTrigger } = useTrigger()
  const [applicationList, setApplicationList] = useState<ApplicationList[]>([])

  const applicationDelteHandler = async (userId: string) => {
    try {
      const response = await fetch(`/api/applicationDelete?post_id=${postId}&user_id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      if (response.ok && response.status === 201) {
        setApplicationTrigger(!applicationTrigger)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const checkUpdateHandler = async (userId: string, characterName: string) => {
    try {
      const res = await fetch(
        `/api/applicationUpdate?postId=${postId}&userId=${userId}&characterName=${characterName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (res && res.status === 201) {
        setApplicationTrigger(!applicationTrigger)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const applicationGet = async () => {
    try {
      const res = await fetch(`/api/applicationGet?postId=${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      if (res.ok && res.status === 201) {
        setApplicationList(data.result)
      }
    } catch (error) {
      console.error(error)
      return []
    }
  }

  useEffect(() => {
    applicationGet()
  }, [, applicationTrigger])

  return (
    <div className='flex h-auto w-full flex-col items-center justify-center gap-4'>
      {applicationList.length > 0 ? (
        <div className='w-full'>
          {applicationList.map((char, key) => (
            <div
              className='flex w-full flex-col items-center justify-center gap-2 rounded-md border p-2 text-lg shadow-lg md:flex-row md:gap-8'
              key={key}
            >
              <div className='flex items-center gap-4'>
                <Image src={char.character_image} alt={'이미지'} height={40} width={40} />
                <Image
                  src={char.character_icon}
                  alt={'아이콘'}
                  height={30}
                  width={30}
                  className='hidden md:block'
                />
                <span>{char.character_name}</span>
                <span className='hidden sm:block'>{char.character_level}</span>
                <Image
                  src={'/엘릭서.png'}
                  alt={'엘릭서'}
                  height={30}
                  width={30}
                  className='hidden sm:block'
                />
                <span className='hidden sm:block'>{char.character_elixir}</span>
                <Image
                  src={'/초월.png'}
                  alt={'초월'}
                  height={30}
                  width={30}
                  className='hidden sm:block'
                />
                <span className='hidden sm:block'>{char.character_transcendence}</span>
              </div>

              <span>희망사항 : {char.hope}</span>
              <span className={`${char.character_check ? 'text-blue-500' : 'text-red-500'}`}>
                {char.character_check ? '승인 완료' : '승인 대기 중'}
              </span>
              {session && session.user.id ? (
                <>
                  <button
                    className={`rounded-md bg-gray-900 p-1 px-2 text-white ${post_user === session.user.id ? '' : 'hidden'}`}
                    onClick={() => {
                      checkUpdateHandler(char.user_id, char.character_name)
                    }}
                  >
                    승인
                  </button>
                  <button
                    className={`rounded-md bg-gray-900 p-1 px-2 text-white ${char.user_id === session.user.id ? '' : 'hidden'}`}
                    onClick={() => {
                      applicationDelteHandler(char.user_id)
                    }}
                  >
                    신청 취소
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='text-lg'>신청자가 아직 없습니다. ㅠㅠ</div>
      )}
    </div>
  )
}
