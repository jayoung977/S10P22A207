'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import axios from "axios";
import { UseMutationResult, useMutation } from "react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";


interface NewFund {
  fundName: string,
  period: number,
  capacity: number,
  targetAmount: number,
  minimumAmount: number,
  feeType: string,
  industry: string,
} 


const createFund = async(fund: NewFund) => {
  const token = sessionStorage.getItem('accessToken')
  const { data } = await axios.post(`https://j10a207.p.ssafy.io/api/fund/open`,fund,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return data
}


export default function MakeFundModal({isOpen, onClose}: any){
  const playClickSound = useClickSound();
  const [fundNameCheck, setFundNameCheck] = useState(false)
  const router = useRouter();
  const { 
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset
  } = useForm<NewFund>({mode: 'onChange'});

  
  useEffect(()=> {
    setFundNameCheck(false)
  },[isOpen])
  
  const funName = watch('fundName')


  function handleFundNameCheck(fundName: string){
    if(fundName.length < 2){
      Swal.fire({
        text: '펀드이름을 2자 이상 입력 후 확인하세요.',
        icon: 'error'
      })
      return
    }
    const token = sessionStorage.getItem('accessToken')
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      url: 'https://j10a207.p.ssafy.io/api/fund/fundname/check',
      params: {
        fundName: funName,
      }
    })
    .then((res) => {
      const checked = res.data.result
      if(checked){
        Swal.fire({
          title: `${fundName} 은/는 사용할 수 없는 이름입니다.`,
          icon: 'error'
        })
      } else {
        Swal.fire({
          title: `${fundName} 은/는 사용할 수 있는 이름입니다.`,
          icon: 'success'
        })
        setFundNameCheck(true)
      }
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const onSubmit = (data: NewFund) => {
    // 여기에 폼 데이터를 처리하는 로직을 작성할 수 있습니다.
    if (fundNameCheck == true){
      mutate(data)
    } else {
      Swal.fire({
        html: `펀드이름 중복체크를 하지 않았습니다. <br> 중복확인 후 다시 제출해주세요.`,
        icon: 'error'
      })
    }
  };
  
  const { mutate } 
  = useMutation(createFund
    ,{
      onSuccess: (response) => {
        console.log(response)
        let fundNumber = response.result
        Swal.fire({
          title: "펀드 개설에 성공하였습니다.",
          text: "내 펀드로 이동하시겠습니까?",
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: "내 펀드로 이동",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `recruiting/${fundNumber}`
          } 
        });
        
      },
      onError: (error) => {
        console.error('Error:', error)
        Swal.fire({
          title: "펀드 개설에 실패하였습니다.",
          text: "펀드개설 조건에 문제가 있습니다.",
          icon: "error"
        });
      }
    });

  


  if(!isOpen) return null;

  

  return(
    // Main modal
    <div id="authentication-modal" tabIndex={-1}  className="overflow-y-auto overflow-x-hidden z-50 fixed translate-x-1/3 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative border bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
          <div className="p-4 text-center md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  펀드 개설
              </h3>
          </div>
          {/* Modal body */}
          <form onSubmit={handleSubmit(onSubmit)}  className="p-4 md:p-5">
            <div className="space-y-2" >
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이름</label>
                  <div className="flex">
                    <input
                      type="text"
                      id="fund-name"
                      {...register('fundName', {
                        required: '펀드이름은 2자에서 최대 30자입니다.',
                        minLength: {
                          value: 2,
                          message: '2글자 이상 입력해주세요.'
                        },
                        maxLength: {
                          value: 30,
                          message: '30자 이상 작성할 수 없습니다.'
                        }
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="펀드 이름을 입력해주세요." />
                      <button
                        onClick={()=> {
                          playClickSound();
                          handleFundNameCheck(funName)
                        }}
                        className="w-1/3 m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">중복확인</button>
                  </div>
                     <p className="text-xs text-small-3 p-1">{errors.fundName?.message}</p>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">설명</label>
                  <input 
                    type="text"
                    id="fund-industry"
                    {...register('industry', {
                      required: '펀드설명에 대해서 적어주세요.'
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="펀드설명" />
                    <p className="text-xs text-small-3 p-1">{errors.industry?.message}</p>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">기간(일)</label>
                  <div className="flex items-center justify-around">
                    <input 
                      type="number"
                      id="fund-period"
                      {...register('period',{
                        required: '1~7일 사이로 기간을 정해주세요.',
                        min: {
                          value: 1,
                          message: '1일 이상으로 설정해주세요.'
                        },
                        max: {
                          value: 7,
                          message: '7일 이하로 설정해주세요.'
                        },
                        valueAsNumber: true
                      })}
                      onChange={playClickSound}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="펀드 운영 기간을 설정해주세요." />
                  </div>
                  <p className="text-xs text-small-3 p-1">{errors.period?.message}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">인원</label>
                  <input 
                    type="number"
                    id="fund-members"
                    
                    {...register('capacity',{
                      required: '원하는 펀드 멤버 수를 정해주세요.',
                      min: {
                        value: 2,
                        message: '펀드 멤버 수는 최소 2명 이상이어야 합니다.'
                      },
                      max: {
                        value: 100,
                        message: '펀드 멤버 수는 최대 100명까지 가능합니다.'
                      },
                      valueAsNumber: true,
                    })}
                    onChange={playClickSound}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="펀드 인원"/>
                    <p className="text-xs text-small-3 p-1">{errors.capacity?.message}</p>

                </div>
                <div className="col-span-1">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">펀드수수료 정산</label>
                  <select 
                   id="fund-fee"
                   {...register('feeType',{
                      required: '펀드수수료 지급 방식을 설정해 주세요.'
                   })}
                   onChange={playClickSound}
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" >
                    <option value="PRE">펀드수수료 선지급</option>
                    <option value="POST">펀드수수료 후정산</option>
                  </select>
                </div>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">자금</label>
                  <input
                    type="text"
                    id="fund-target-money"
                    {...register('targetAmount',{
                      required: '운영하려는 자금 액수를 설정해주세요.',
                      min: {
                        value: 10000000,
                        message: '최소 10,000,000원 이상으로 설정해 주세요.'
                      },
                      valueAsNumber: true,
                    })}
                    onChange={playClickSound}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="최소 10,000,000원" />
                    <p className="text-xs text-small-3 p-1">{errors.targetAmount?.message}</p>

              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">1인당 투자금액</label>
                  <input 
                   type="number"
                   id="fund-minimum-money"
                   {...register('minimumAmount',{
                    required: '멤버 별 투자금액을 설정해주세요.',
                    min: {
                      value: 1000000,
                      message: '최소 1,000,000원 이상으로 설정해 주세요.'
                    },
                    valueAsNumber: true,
                  })}
                  onChange={playClickSound}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="1,000,000원 ~ 최대" />
                  <p className="text-xs text-small-3 p-1">{errors.minimumAmount?.message}</p>
              </div>

              <div className="flex justify-around">
                <button 
                  onClick={()=>{
                    playClickSound();
                    reset()
                    onClose()
                    }}
                  type="button" className="w-1/2 m-1 text-textColor-1 bg-button-2 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">취소</button>
                <button type="submit"
                  onClick={playClickSound}
                className="w-1/2 m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">펀드 개설</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> 
  )
}