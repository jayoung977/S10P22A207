"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

interface RoomInfo {
  title: string,
  roundNumber: number,
  isOpen: string,
  password: number
}

export default function MakeRoomModal({ isOpen, onClose }: any) {
  const { 
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm<RoomInfo>({
    mode: 'onChange',
    defaultValues: {
      roundNumber: 3,
    }
  });

  const openRoom = watch('isOpen')

  const router = useRouter();
  if (!isOpen) return null;

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    // 숫자만 허용하는 정규식 패턴
    const pattern = /^[0-9]*$/;

    if (!pattern.test(inputValue)) {
      // 숫자가 아닌 문자를 제거합니다.
      e.target.value = inputValue.replace(/[^0-9]/g, '');
    }
  }

  const onSubmit = async(data: RoomInfo) => {
    const password = Number(data.password) || null;
    const formData = {
      roomTitle: data.title,
      maxRoundNumber: Number(data.roundNumber), 
      isOpen: data.isOpen === 'true' ? true : false,
      password: password,
    }
    
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch("https://j10a207.p.ssafy.io/api/multi/create-room",{
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json();
      console.log(result)
      const roomId = result.result.multiGameId
      router.push(`multi/room/${roomId}`)
    } catch (error) {
      console.error(error)
    }
    reset()

  }

  return (
    <div
      id="gameroom-modal" tabIndex={-1}
      className="z-40 fixed -translate-x-1/4 -translate-y-1/2 inset-0 left-1/2 top-1/2 justify-center items-center">
      <div className="relative p-4 w-[500px] max-h-full">
        <div className="relative bg-white rounded-lg border shadow dark:bg-gray-700">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 md:p-5">
            <div className="space-y-4">
              <div className="grid grid-cols-12 items-center gap-y-8 gap-x-2">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    방제목
                  </label>
                </div>
                <div className="col-span-9">
                  <input
                    type="name"
                    id="name"
                    {...register('title',{
                      required: '방이름은 2자에서 최대 30자입니다.',
                      minLength: {
                        value: 2,
                        message: '2글자 이상 입력해주세요.'
                      },
                      maxLength: {
                        value: 20,
                        message: '20자 이상 작성할 수 없습니다.'
                      }
                    })}
                    placeholder="방의 제목을 입력해 주세요."

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                  <p className="text-xs text-small-3 p-1">{errors.title?.message}</p>

                </div>
                <div className="col-span-12">라운드</div>
                {/* 라운드 */}
                <div className="col-span-12">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 flex items-center h-5">
                      <input
                        id="3round"
                        type="radio"
                        value={3}
                        {...register('roundNumber', { required: true })}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <label htmlFor="3round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        3라운드
                      </label>
                    </div>
                    <div className="col-span-1 flex items-center h-5">
                      <input
                        id="5round"
                        type="radio"
                        value={5}
                        {...register('roundNumber', { required: true })}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <label htmlFor="5round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        5라운드
                      </label>
                    </div>
                    <div className="col-span-1 flex items-center h-5">
                      <input
                        id="7round"
                        type="radio"
                        value={7}
                        {...register('roundNumber', { required: true })}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <label htmlFor="7round" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        7라운드
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-12">공개 여부</div>
                <div className="col-span-12">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1 flex items-center h-5">
                      <input
                        id="공개"
                        type="radio"
                        value="true"
                        {...register('isOpen',{ required: true })}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <label
                        htmlFor="공개"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        공개
                      </label>
                    </div>
                    <div className="col-span-1 flex items-center h-5">
                      <input
                        id="비공개"
                        type="radio"
                        value="false"
                        {...register('isOpen', { required: true })}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                      <label
                        htmlFor="비공개"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        비공개
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    비밀번호
                  </label>
                </div>
                <div className="col-span-6">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    {...register('password',{
                      required: openRoom === 'false',
                      disabled: openRoom === 'true'
                    })}
                    onChange={handlePasswordChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4">
                <div className="col-span-1">
                  <button type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    방만들기
                  </button>
                </div>
                <div className="col-span-1">
                  <button
                    onClick={() => {
                      reset()
                      onClose();
                    }}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
