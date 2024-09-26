'use client'

import { useCharacterInfoList } from '@/store/characterStore'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Under from '@image/icon/under.svg'
import { useRaidSelect } from '@/store/raidSelectStore'
import RaidLevel from '@/components/utils/raidLevel'

const undetermined = {
  character_name: '캐릭터 미정',
  server_name: '캐릭터 미정',
  user_id: '캐릭터 미정',
  character_level: '캐릭터 미정',
  character_class: '캐릭터 미정',
  class_image: '/icon/ellipsis.svg',
  class_icon_url: '/icon/ellipsis.svg',
  transcendence: 0,
  elixir: 0,
  leap: 0,
  enlightenment: 0,
  evolution: 0,
  disable: false,
}

const noCharacters = {
  character_name: '캐릭터 없음',
  server_name: '캐릭터 없음',
  user_id: '캐릭터 없음',
  character_level: '캐릭터 없음',
  character_class: '캐릭터 없음',
  class_image: '/icon/ellipsis.svg',
  class_icon_url: '/icon/ellipsis.svg',
  transcendence: 0,
  elixir: 0,
  leap: 0,
  enlightenment: 0,
  evolution: 0,
  disable: false,
}

export default function RaidCharacterSelect() {
  const { characterAllList, setCharacterInfo, characterInfo } = useCharacterInfoList()
  const { raidSelect, setRaidLimitLevel } = useRaidSelect()
  const [hidden, setHidden] = useState(true)
  const handlerHidden = () => {
    setHidden(!hidden)
  }

  const handler = (name: string) => {
    if (name === '캐릭터 미정') {
      setCharacterInfo([undetermined])
      setHidden(!hidden)
    } else {
      const selectedCharacter = characterAllList.find((char) => char.character_name === name)
      if (selectedCharacter) {
        setCharacterInfo([selectedCharacter])
        setHidden(!hidden)
      }
    }
  }

  useEffect(() => {
    const raidLevel = RaidLevel(raidSelect)
    setRaidLimitLevel(raidLevel)
    var maxCharacterLevel = 0

    characterAllList.map((char) => {
      const characterLevel = parseFloat(char.character_level.replace(/,/g, ''))

      if (characterLevel > maxCharacterLevel) {
        maxCharacterLevel = characterLevel
      }

      if (raidLevel > characterLevel) {
        char.disable = true
      } else {
        char.disable = false
      }
    })

    if (raidLevel > maxCharacterLevel) {
      setCharacterInfo([noCharacters])
    } else {
      setCharacterInfo([characterAllList[0]])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [, raidSelect])

  return (
    <div className='flex flex-col'>
      <label className='text-lg'>캐릭터 선택</label>
      {characterAllList.length > 0 && characterInfo.length > 0 ? (
        <div className='relative w-full flex-col rounded-md bg-gray-900'>
          <button
            className='flex h-16 w-full items-center justify-between rounded-md border border-gray-500 px-1 shadow-md'
            onClick={handlerHidden}
          >
            <div className='flex items-center gap-4'>
              <div className='h-12 w-12 overflow-hidden rounded-full'>
                <Image
                  src={characterInfo[0].class_image}
                  alt={characterInfo[0].character_name}
                  width={70}
                  height={70}
                  className='h-full w-full object-cover'
                />
              </div>
              <Image
                src={characterInfo[0].class_icon_url}
                alt={characterInfo[0].character_name}
                width={40}
                height={40}
                className='p-1'
              />
              <span className='text-lg text-white'>{characterInfo[0].character_name}</span>
              <span className='hidden text-lg text-black text-white sm:block'>
                {characterInfo[0].character_level}
              </span>
            </div>
            <Under className='h-4 w-4 text-white' />
          </button>
          <div
            className={`absolute left-0 top-full z-10 mt-1 w-full rounded-md bg-gray-300 text-white shadow-md ${hidden ? 'hidden' : ''}`}
          >
            <div
              key={'캐릭터 미정'}
              className={`flex cursor-pointer items-center gap-4 p-2 text-black hover:bg-gray-200 ${characterInfo[0].character_name === '캐릭터 없음' ? 'hidden' : ''}`}
              onClick={() => handler('캐릭터 미정')}
            >
              <div className='h-12 w-12 overflow-hidden rounded-full'>
                <Image
                  src={'/icon/ellipsis.svg'}
                  alt={'캐릭터 미정'}
                  width={70}
                  height={70}
                  className='h-full w-full object-cover'
                />
              </div>
              <Image
                src={'/icon/ellipsis.svg'}
                alt={'캐릭터 미정'}
                width={30}
                height={30}
                className='p-1'
              />
              <span className='flex h-12 items-center'>캐릭터 미정</span>
            </div>
            {characterAllList.map((char) => (
              <div
                key={char.character_name}
                className={`flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-200 ${char.disable ? 'hidden' : ''}`}
                onClick={() => handler(char.character_name)}
              >
                <div className='h-12 w-12 overflow-hidden rounded-full'>
                  <Image
                    src={char.class_image}
                    alt={char.character_name}
                    width={70}
                    height={70}
                    className='h-full w-full object-cover'
                  />
                </div>
                <Image
                  src={char.class_icon_url}
                  alt={char.character_name}
                  width={30}
                  height={30}
                  className='p-1'
                />
                <span className='text-black'>{char.character_name}</span>
                <span className='hidden text-black sm:block'>{char.character_level}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex h-14 w-full items-center rounded-md bg-gray-900 px-1 text-white'>
          캐릭터 없음
        </div>
      )}
    </div>
  )
}
