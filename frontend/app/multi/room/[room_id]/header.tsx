"use client";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import logo from "@/public/src/assets/images/logo.png"
import axios from "axios";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";
import socketStore from "@/public/src/stores/websocket/socketStore";
import { useEffect, useState } from "react";
import userStore from "@/public/src/stores/user/userStore";
import Swal from "sweetalert2";

export default function Header() {
  const { memberId } = userStore();
  const playClickSound = useClickSound();
  const router = useRouter();
  const params = useParams<{ room_id?: string }>();
  const room_id: string | undefined = params.room_id;
  const { deleteReceiveMessages, readyState } = socketStore();
  const { roomId, roomTitle, hostId, roundNumber, maxRoundNumber } =
    socketStore();
  const [allReady, setAllReady] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    Object.keys(readyState).map((item) => {
      if (!readyState[Number(item)]) {
        setAllReady(false);
        return;
      }
    });
    setAllReady(true);
  }, [readyState]);

  const handleGameReady = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `https://j10a207.p.ssafy.io/api/multi/ready?roomId=${params.room_id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      const myReady = result.result;
      setReady(myReady);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGameStart = async () => {
    const numberKeys = Object.keys(readyState).map(Number);
    // if(numberKeys.length > 1){
      const token = sessionStorage.getItem("accessToken");
      await axios({
        url: "https://j10a207.p.ssafy.io/api/multi/start-game",
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          maxRoundNumber: maxRoundNumber,
          roundNumber: 1,
          roomId: params.room_id
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch ((error) => {
        console.error(error)
      })
    // } else {
    //   Swal.fire({
    //     title: '2명 이상일 때 시작 가능합니다.',
    //     icon: 'error'
    //   })
      // return
    // }
  }

  const [receiveMessage, setReceiveMessage] = useState<any>([]);
  function handleExit() {
    axios({
      method: "delete",
      url: `https://j10a207.p.ssafy.io/api/multi/exit?roomId=${room_id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      deleteReceiveMessages();
    });
  }

  return (
    <header className="row-span-1 grid grid-cols-12 border items-center gap-2">
      <div className="col-start-2 col-end-3 flex items-center">
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="Logo" className="h-8" width={32} height={32} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            지금이니
          </span>
        </div>
      </div>
      <div className="col-span-8 flex justify-center font-bold text-xl">
        <div>{roomTitle}</div>
      </div>
      <div className="col-span-2 flex justify-center gap-4">
        {memberId === hostId ? (
          <button
            className="border p-2 rounded-md bg-small-1 text-white hover:bg-blue-400"
            disabled={!allReady}
            onClick={() => {
              playClickSound();
              handleGameStart();
            }}
          >
            시작하기
          </button>
        ) : (
          <div>
            {ready ? (
              <button
                className="p-2 rounded-md bg-small-3 text-textColor-2 hover:bg-red-400"
                disabled={!allReady}
                onClick={() => {
                  playClickSound();
                  handleGameReady();
                }}
              >
                준비취소
              </button>
            ) : (
              <button
                className="border p-2 rounded-md bg-small-1 text-white hover:bg-blue-400"
                onClick={() => {
                  playClickSound();
                  handleGameReady();
                }}
              >
                준비하기
              </button>
            )}
          </div>
        )}
        <button
          onClick={() => {
            playClickSound();
            handleExit();
            router.back();
          }}
          className="border p-2 rounded-md border-gray-400 hover:bg-gray-100 hover:border-2"
        >
          나가기
        </button>
      </div>
    </header>
  );
}
