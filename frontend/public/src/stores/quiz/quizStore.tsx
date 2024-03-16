import { create } from "zustand";

type Quiz = {
  id: number;
  title: string;
  selections: string[];
  answer: number;
};

type Store = {
  success: number;
  setSuccess: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  data: Quiz[];
  setData: (value: Quiz[]) => void;
};

const quizStore = create<Store>((set: any) => ({
  success: 0,
  setSuccess: (value: any) => set({ success: value }),
  page: 0,
  setPage: (value) => set({ page: value }),
  data: [
    {
      id: 0,
      title: "증시에서 ‘텐배거’의 정의로 가장 적절한 것은?",
      selections: ["수익률이 매우 높다", "주가가 극심한 저평가 상태다", "비상장 종목이다", "상장폐지 가능성이 높다"],
      answer: 0,
    },
    {
      id: 1,
      title: "글로벌 금융회사와 다국적기업이 밀집해 시너지 효과를 내면서 금융산업이 발달한 지역을 뜻하는 말은?",
      selections: ["레몬마켓", "역외시장", "갈라파고스", "금융허브"],
      answer: 3,
    },
    {
      id: 2,
      title: "투기 자본이 경영권이 취약한 기업의 지분을 매집한 다음 자기 지분을 높은 가격에 되사갈 것을 요구하는 행위는?",
      selections: ["그린택소노미", "그린워싱", "그린메일", "그린벨트"],
      answer: 2,
    },
    {
      id: 3,
      title: "본사나 생산기지를 해외로 옮긴 자국 기업에 각종 혜택을 제공해 본국으로 돌아오게 하는 정책은?",
      selections: ["디커플링", "리쇼어링", "리파이낸싱", "아웃소싱"],
      answer: 1,
    },
    {
      id: 4,
      title: "다음 중 미국의 3대 주가지수가 아닌 것은?",
      selections: ["다우지수", "S&P500지수", "나스닥지수", "닛케이225지수"],
      answer: 3,
    },
  ],
  setData: (value) => set({ page: value }),
}));

export default quizStore;
