import { create } from "zustand";
import axios from "axios";

type Store = {
  toggleTab: string;
  setToggleTab: (value: string) => void;
  searchFriend: string;
  setSearchFriend: (value: string) => void;
  receiveMessage: any;
  setReceiveMessage: (value: any) => void;
  sendMessage: string;
  setSendMessage: (value: string) => void;
  lobbyModal: boolean;
  setLobbyModal: (value: boolean) => void;
  userId: number;
  setUserId: (value: number) => void;
  pageNumber: number;
  setPageNumber: (value: number) => void;
  isWaiting: boolean;
  setIsWaiting: (value: boolean) => void;

  stockId :number,
  setStockId :(value :number) => void;
  stockChartList :stockChartInterface[] | any;
  setStockChartList :(value :stockChartInterface[]) => void;
  roundNumber :number;
  setRoundNumber :(value :number) => void;
  maxRoundNumber :number;
  setMaxRoundNumber :(value :number) => void;
  turn :number;
  setTurn :(value :number) => void;
  
  getMultigameRoomInfo: (value: number) => void;
  
};

export interface MultiGameRoomInfoList {
  roomId: number;
  roomTitle: string;
  roundNumber: number;
  participantsIds: number[];
  isOpen: boolean;
  password: number;
}

export interface ResultType {
  multiWaitRoomInfoList: MultiGameRoomInfoList[];
  multiGameRoomInfoList: MultiGameRoomInfoList[];
  totalGameRoomCounts: number;
  totalWaitRoomCounts: number;
}
export interface MultiRoomInfo {
  result: ResultType;
}

// 종목의 각 날짜별 금액 데이터(OHLC, Volume)
export interface stockChartInterface {
  date :string;
  markerPrice :number;
  highPrice :number;
  lowPrice :number;
  endPrice :number;
  tradingVolume :number;
}

// stockId값을 종목 id로 가지는 종목의 350일 간의 차트 데이터
export interface stockChartDataInterface {
  stockId :number,
  stockChartList :stockChartInterface[];
}

// 게임 페이지 렌더링 시 api 요청으로 받는 response.data.result
export interface stockInfoDataInterface {
  gameId :number;
  stockChartData :stockChartDataInterface;
}

const multigameStore = create<Store>((set: any) => ({
  toggleTab: "all",
  setToggleTab: (value) => set({ toggleTab: value }),
  searchFriend: "",
  setSearchFriend: (value) => set({ searchFriend: value }),
  receiveMessage: [],
  setReceiveMessage: (value) => set({ receiveMessage: value }),
  sendMessage: "",
  setSendMessage: (value) => set({ sendMessage: value }),
  lobbyModal: false,
  setLobbyModal: (value) => set({ lobbyModal: value }),
  userId: 0,
  setUserId: (value) => set({ userId: value }),
  pageNumber: 1,
  setPageNumber: (value) => set({ pageNumber: value }),
  isWaiting: true,
  setIsWaiting: (value) => set({ isWaiting: value }),
  // multi game state value
  stockId :0,
  setStockId: (value) => set({ stockId: value }),
  stockChartList: [],
  setStockChartList: (value) => set({ stockChartList: value }),
  roundNumber: 0,
  setRoundNumber :(value) => set({ roundNumber: value }),
  maxRoundNumber :0,
  setMaxRoundNumber: (value) => set({ maxRoundNumber: value }),
  turn: 1,
  setTurn: (value) => set({ turn: value }),
  
  getMultigameRoomInfo: (value: number) => {
    axios({
      method: 'post',
      url: `https://j10a207.p.ssafy.io/api/multi/room-info?roomId=${value}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
      }
    })
    .then((res)=> {
      console.log(res.data)
    })
    .catch((e)=> {
      console.error(e)
    })
  }
}));

export default multigameStore;
