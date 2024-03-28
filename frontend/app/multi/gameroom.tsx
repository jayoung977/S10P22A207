'use client'

import { MultiRoom } from "@/public/src/stores/multi/MultiGameStore";
import Swal from "sweetalert2";
import axios from "axios";

export default function GameRoom (props: {color: string, room: MultiRoom}) {
  const { color, room } = props
  const password = '1234'
  const roomNumber = room.roomNumber
  const handleClick = () => {
    const token = sessionStorage.getItem('accessToken')
    Swal.fire({
      title: "비밀번호를 입력하세요.",
      input: "password",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "입장",
      showLoaderOnConfirm: true,
      
    }).then((result) => {
      if (String(result.value) === password) {
        axios.get(`https://j10a207.p.ssafy.io/api/multi/${roomNumber}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res)=> {
          console.log(res.data)
        })
        .catch((error)=>{
          console.error(error)
        })
        window.location.href = `/multi/${roomNumber}/room`
      } else {
        Swal.fire({
          title: '비밀번호가 일치하지 않습니다.',
          icon: 'error'
        })
      }
    });
  }
  return (
    <div className={`hover:-translate-y-1 transition ease-in-out duration-500 h-auto rounded-md shadow-md text-textColor-2 ${color}`}>
      <div onClick={()=> {handleClick()}} className="block p-2  border rounded-lg shadow hover:cursor-pointer">
        <h5 className="mb-1 text-md font-bold tracking-tight">{room.roomNumber} 번방</h5>
        <div className="flex justify-end gap-4 text-sm">
          <div>{room.roundNumber}라운드</div>
          <div>{room.participantsIds.length}명</div>
        </div>
      </div>
    </div>
  );
}
