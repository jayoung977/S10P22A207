'use client'
import { useState, useEffect } from 'react';

// navbar
import Navbar from '@/app/Navbar';

// left 
import FundTotalAssets from './FundTotalAssets';
import FundAssetsHeld from './FundAssetsHeld'; 
import FundSalesHistory from './FundSalesHistory';
// middle
import Chart from './Chart';
import StockMarket from './StockMarket';
// right
import SaleBtn from './SaleBtn';
import StockList from './StockList';
import MarketAndTrends from './MarketAndTrends';

type dataType = {
    date: string,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
}

export default function SinglePlay () {
    const [data, setData] = useState<dataType[]>([]);
    useEffect(() => {
      const newData = [
        { date: "2022-01-01", open: 110, high: 120, low: 90, close: 110, volume: 1000 },
        { date: "2022-01-02", open: 110, high: 130, low: 70, close: 140, volume: 2000 },
        { date: "2022-01-03", open: 140, high: 170, low: 100, close: 160, volume: 3000 },
        { date: "2022-01-04", open: 160, high: 190, low: 150, close: 180, volume: 2500 },
        { date: "2022-01-05", open: 180, high: 210, low: 170, close: 200, volume: 3000 },
        { date: "2022-01-06", open: 200, high: 230, low: 190, close: 220, volume: 3500 },
        { date: "2022-01-07", open: 220, high: 240, low: 210, close: 230, volume: 3000 },
        { date: "2022-01-08", open: 230, high: 250, low: 220, close: 240, volume: 3200 },
        { date: "2022-01-10", open: 240, high: 300, low: 220, close: 290, volume: 3200 },
        { date: "2022-01-11", open: 290, high: 400, low: 280, close: 350, volume: 3500 },
        { date: "2022-01-12", open: 350, high: 650, low: 325, close: 600, volume: 3500 },
        { date: "2022-01-13", open: 700, high: 750, low: 450, close: 500, volume: 3000 },
        { date: "2022-01-14", open: 500, high: 550, low: 400, close: 450, volume: 2500 },
        { date: "2022-01-15", open: 450, high: 500, low: 420, close: 480, volume: 2000 },
        { date: "2022-01-16", open: 480, high: 510, low: 470, close: 500, volume: 1800 },
        { date: "2022-01-17", open: 500, high: 530, low: 490, close: 520, volume: 2200 },
        { date: "2022-01-18", open: 520, high: 550, low: 510, close: 540, volume: 2300 },
        { date: "2022-01-19", open: 540, high: 570, low: 530, close: 560, volume: 2400 },
        { date: "2022-01-20", open: 560, high: 590, low: 550, close: 580, volume: 2500 },
        { date: "2022-01-21", open: 560, high: 590, low: 250, close: 300, volume: 2500 },
        { date: "2022-01-22", open: 305, high: 350, low: 300, close: 340, volume: 2000 },
        { date: "2022-01-23", open: 340, high: 370, low: 335, close: 360, volume: 1800 },
        { date: "2022-01-24", open: 360, high: 390, low: 355, close: 385, volume: 2200 },
        { date: "2022-01-25", open: 385, high: 415, low: 380, close: 400, volume: 2400 },
        { date: "2022-01-26", open: 400, high: 430, low: 395, close: 425, volume: 2600 },
        { date: "2022-01-27", open: 425, high: 700, low: 425, close: 650, volume: 2600 },
        { date: "2022-01-28", open: 650, high: 1100, low: 610, close: 940, volume: 2600 },
        { date: "2022-01-29", open: 940, high: 1540, low: 830, close: 1230, volume: 2600 },
    ];
      
        setData(newData);
    }, [])

    return (
        <div className="grid grid-rows-12 h-screen border-separate">
            {/* navbar */}
            <Navbar />
            <div className="row-span-11 grid grid-cols-12">
                {/* left aside */}
                <aside className="col-span-3 grid grid-rows-3">
                    <FundTotalAssets />
                    <FundAssetsHeld />
                    <FundSalesHistory />
                </aside>
                {/* main */}
                <main className="col-span-7 grid grid-rows-12">
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
                    <SaleBtn />
                    <StockList />
                    <MarketAndTrends />
                </aside>
            </div>
        </div>
    )
}