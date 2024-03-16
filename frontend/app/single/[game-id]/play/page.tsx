"use client";
import { useState, useEffect } from "react";

// navbar
import Navbar from "@/app/Navbar";

// left
import TotalAssets from "./TotalAssets";
import AssetsHeld from "./AssetsHeld";
import SalesHistory from "./SalesHistory";
// middle
import Chart from "./Chart";
import StockMarket from "./StockMarket";
// right
import TurnInfo from "./TurnInfo";
import StockList from "./StockList";
import MarketAndTrends from "./MarketAndTrends";

type dataType = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export default function SinglePlay() {
  const [data, setData] = useState<dataType[]>([]);
  useEffect(() => {
    // 실제 주식 데이터 더미로 들고왔어!!
    const newData = [
      {
        date: "2024-03-15",
        open: 71364.55,
        high: 72339.55,
        low: 66076.8,
        close: 70329.49,
        volume: 79879634944,
      },
      {
        date: "2024-03-14",
        open: 73079.38,
        high: 73750.07,
        low: 68563.02,
        close: 71396.59,
        volume: 59594605698,
      },
      {
        date: "2024-03-13",
        open: 71482.12,
        high: 73637.48,
        low: 71334.09,
        close: 73083.5,
        volume: 48212536929,
      },
      {
        date: "2024-03-12",
        open: 72125.13,
        high: 72825.66,
        low: 68728.85,
        close: 71481.29,
        volume: 62554434520,
      },
      {
        date: "2024-03-11",
        open: 69020.55,
        high: 72850.71,
        low: 67194.88,
        close: 72123.91,
        volume: 65716656765,
      },
      {
        date: "2024-03-10",
        open: 68500.26,
        high: 70005.2,
        low: 68239.98,
        close: 69019.79,
        volume: 35683977532,
      },
      {
        date: "2024-03-09",
        open: 68299.26,
        high: 68673.05,
        low: 68053.13,
        close: 68498.88,
        volume: 21609650379,
      },
      {
        date: "2024-03-08",
        open: 66938.09,
        high: 70083.05,
        low: 66230.45,
        close: 68300.09,
        volume: 59202881172,
      },
      {
        date: "2024-03-07",
        open: 66099.74,
        high: 68029.92,
        low: 65655.53,
        close: 66925.48,
        volume: 46989543159,
      },
      {
        date: "2024-03-06",
        open: 63776.05,
        high: 67637.93,
        low: 62848.67,
        close: 66106.8,
        volume: 68750229073,
      },
      {
        date: "2024-03-05",
        open: 68341.05,
        high: 69170.63,
        low: 59323.91,
        close: 63801.2,
        volume: 102802940877,
      },
      {
        date: "2024-03-04",
        open: 63137.0,
        high: 68537.03,
        low: 62386.52,
        close: 68330.41,
        volume: 70670471105,
      },
      {
        date: "2024-03-03",
        open: 62031.58,
        high: 63230.21,
        low: 61435.02,
        close: 63167.37,
        volume: 26253811450,
      },
      {
        date: "2024-03-02",
        open: 62431.65,
        high: 62458.7,
        low: 61657.29,
        close: 62029.85,
        volume: 23888473685,
      },
      {
        date: "2024-03-01",
        open: 61168.06,
        high: 63155.1,
        low: 60802.53,
        close: 62440.63,
        volume: 40186368423,
      },
      {
        date: "2024-02-29",
        open: 62499.18,
        high: 63585.64,
        low: 60498.73,
        close: 61198.38,
        volume: 65496611844,
      },
      {
        date: "2024-02-28",
        open: 57071.1,
        high: 63913.13,
        low: 56738.43,
        close: 62504.79,
        volume: 83239156760,
      },
      {
        date: "2024-02-27",
        open: 54519.36,
        high: 57537.84,
        low: 54484.2,
        close: 57085.37,
        volume: 49756832031,
      },
      {
        date: "2024-02-26",
        open: 51730.54,
        high: 54938.18,
        low: 50931.03,
        close: 54522.4,
        volume: 34074411896,
      },
      {
        date: "2024-02-25",
        open: 51565.21,
        high: 51950.03,
        low: 51306.17,
        close: 51733.24,
        volume: 15413239245,
      },
      {
        date: "2024-02-24",
        open: 50736.37,
        high: 51684.2,
        low: 50585.45,
        close: 51571.1,
        volume: 15174077879,
      },
      {
        date: "2024-02-23",
        open: 51283.91,
        high: 51497.93,
        low: 50561.78,
        close: 50731.95,
        volume: 21427078270,
      },
      {
        date: "2024-02-22",
        open: 51854.64,
        high: 52009.61,
        low: 50926.29,
        close: 51304.97,
        volume: 25413900611,
      },
      {
        date: "2024-02-21",
        open: 52273.54,
        high: 52368.82,
        low: 50671.76,
        close: 51839.18,
        volume: 28624907020,
      },
      {
        date: "2024-02-20",
        open: 51777.73,
        high: 52945.05,
        low: 50792.31,
        close: 52284.88,
        volume: 33353758256,
      },
      {
        date: "2024-02-19",
        open: 52134.81,
        high: 52483.32,
        low: 51711.82,
        close: 51779.14,
        volume: 21362184346,
      },
      {
        date: "2024-02-18",
        open: 51661.97,
        high: 52356.96,
        low: 51233.71,
        close: 52122.55,
        volume: 17595377311,
      },
      {
        date: "2024-02-17",
        open: 52161.68,
        high: 52191.91,
        low: 50669.67,
        close: 51663.0,
        volume: 20009091006,
      },
      {
        date: "2024-02-16",
        open: 51937.73,
        high: 52537.97,
        low: 51641.37,
        close: 52160.2,
        volume: 28180567298,
      },
      {
        date: "2024-02-15",
        open: 51836.79,
        high: 52820.07,
        low: 51371.63,
        close: 51938.55,
        volume: 38564360533,
      },
      {
        date: "2024-02-14",
        open: 49733.45,
        high: 52021.37,
        low: 49296.83,
        close: 51826.7,
        volume: 39105608050,
      },
      {
        date: "2024-02-13",
        open: 49941.36,
        high: 50358.39,
        low: 48406.5,
        close: 49742.44,
        volume: 35593051468,
      },
      {
        date: "2024-02-12",
        open: 48296.39,
        high: 50280.48,
        low: 47745.76,
        close: 49958.22,
        volume: 34511985805,
      },
      {
        date: "2024-02-11",
        open: 47768.97,
        high: 48535.94,
        low: 47617.41,
        close: 48293.92,
        volume: 19315867136,
      },
      {
        date: "2024-02-10",
        open: 47153.53,
        high: 48146.17,
        low: 46905.32,
        close: 47771.28,
        volume: 16398681570,
      },
      {
        date: "2024-02-09",
        open: 45297.38,
        high: 48152.5,
        low: 45260.82,
        close: 47147.2,
        volume: 39316770844,
      },
      {
        date: "2024-02-08",
        open: 44332.13,
        high: 45575.84,
        low: 44332.13,
        close: 45301.57,
        volume: 26154524080,
      },
      {
        date: "2024-02-07",
        open: 43090.02,
        high: 44341.95,
        low: 42775.96,
        close: 44318.22,
        volume: 21126587775,
      },
      {
        date: "2024-02-06",
        open: 42657.39,
        high: 43344.15,
        low: 42529.02,
        close: 43084.67,
        volume: 16798476726,
      },
      {
        date: "2024-02-05",
        open: 42577.62,
        high: 43494.25,
        low: 42264.82,
        close: 42658.67,
        volume: 18715487317,
      },
      {
        date: "2024-02-04",
        open: 42994.94,
        high: 43097.64,
        low: 42374.83,
        close: 42583.58,
        volume: 14802225490,
      },
      {
        date: "2024-02-03",
        open: 43184.96,
        high: 43359.94,
        low: 42890.81,
        close: 42992.25,
        volume: 11169245236,
      },
      {
        date: "2024-02-02",
        open: 43077.64,
        high: 43422.49,
        low: 42584.34,
        close: 43185.86,
        volume: 18603843039,
      },
      {
        date: "2024-02-01",
        open: 42569.76,
        high: 43243.17,
        low: 41879.19,
        close: 43075.77,
        volume: 21423953779,
      },
      {
        date: "2024-01-31",
        open: 42946.25,
        high: 43717.41,
        low: 42298.95,
        close: 42582.61,
        volume: 24673628793,
      },
      {
        date: "2024-01-30",
        open: 43300.23,
        high: 43838.95,
        low: 42711.37,
        close: 42952.61,
        volume: 23842814518,
      },
      {
        date: "2024-01-29",
        open: 42030.91,
        high: 43305.87,
        low: 41818.33,
        close: 43288.25,
        volume: 20668476578,
      },
      {
        date: "2024-01-28",
        open: 42126.13,
        high: 42797.18,
        low: 41696.91,
        close: 42035.59,
        volume: 16858971687,
      },
      {
        date: "2024-01-27",
        open: 41815.63,
        high: 42195.63,
        low: 41431.28,
        close: 42120.05,
        volume: 11422941934,
      },
      {
        date: "2024-01-26",
        open: 39936.82,
        high: 42209.39,
        low: 39825.69,
        close: 41816.87,
        volume: 25598119893,
      },
      {
        date: "2024-01-25",
        open: 40075.55,
        high: 40254.48,
        low: 39545.66,
        close: 39933.81,
        volume: 18491782013,
      },
      {
        date: "2024-01-24",
        open: 39877.59,
        high: 40483.79,
        low: 39508.8,
        close: 40077.07,
        volume: 22359526178,
      },
      {
        date: "2024-01-23",
        open: 39518.71,
        high: 40127.35,
        low: 38521.89,
        close: 39845.55,
        volume: 29244553045,
      },
      {
        date: "2024-01-22",
        open: 41553.65,
        high: 41651.21,
        low: 39450.12,
        close: 39507.37,
        volume: 31338708143,
      },
      {
        date: "2024-01-21",
        open: 41671.49,
        high: 41855.37,
        low: 41497.01,
        close: 41545.79,
        volume: 9344043642,
      },
      {
        date: "2024-01-20",
        open: 41624.59,
        high: 41877.89,
        low: 41446.82,
        close: 41665.59,
        volume: 11586690904,
      },
      {
        date: "2024-01-19",
        open: 41278.46,
        high: 42134.16,
        low: 40297.46,
        close: 41618.41,
        volume: 25752407154,
      },
      {
        date: "2024-01-18",
        open: 42742.31,
        high: 42876.35,
        low: 40631.17,
        close: 41262.06,
        volume: 25218357242,
      },
      {
        date: "2024-01-17",
        open: 43132.1,
        high: 43189.89,
        low: 42189.31,
        close: 42742.65,
        volume: 20851232595,
      },
      {
        date: "2024-01-16",
        open: 42499.34,
        high: 43566.27,
        low: 42086.0,
        close: 43154.95,
        volume: 24062872740,
      },
    ];
    setData(newData);
  }, []);

  return (
    <div className="grid grid-rows-12 h-screen border-separate">
      {/* navbar */}
      <Navbar />
      <div className="row-span-11 grid grid-cols-12 border border-t-black">
        {/* left aside */}
        <aside className="col-span-3 grid grid-rows-3">
          <TotalAssets />
          <AssetsHeld />
          <SalesHistory />
        </aside>
        {/* main */}
        <main className="col-span-7 grid grid-rows-12 border border-x-black">
          <div className="row-start-1 row-end-12 grid grid-rows-12">
            <div className="row-start-1 row-end-2 flex items-center p-2">
              차트 이름
            </div>
            <Chart data={data} />
          </div>
          <StockMarket />
        </main>
        {/* right aside */}
        <aside className="col-span-2 grid grid-rows-6">
          <TurnInfo />
          <StockList />
          <MarketAndTrends />
        </aside>
      </div>
    </div>
  );
}
