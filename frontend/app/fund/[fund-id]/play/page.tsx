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
            { date: '2022-01-01', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-02', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-01-03', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-01-04', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-01-05', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-06', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-07', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-01-08', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-01-09', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-01-10', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-11', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-12', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-01-13', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-01-14', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-01-15', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-16', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-17', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-01-18', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-01-19', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-01-20', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-21', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-22', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-01-23', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-01-24', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-01-25', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-26', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-27', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-01-28', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-01-29', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-01-30', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-01-31', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-01', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-02-02', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-02-03', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-02-04', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-05', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-06', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-02-07', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-02-08', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-02-09', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-10', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-11', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-02-12', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-02-13', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-02-14', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-15', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-16', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-02-17', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-02-18', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-02-19', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-20', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-21', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-02-22', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-02-23', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-02-24', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-25', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-02-26', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-02-27', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-02-28', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-01', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-02', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-03', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-03-04', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-03-05', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-06', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-07', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-08', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-03-09', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-03-10', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-11', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-12', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-13', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-03-14', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-03-15', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-16', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-17', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-18', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-03-19', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-03-20', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-21', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-22', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-23', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-03-24', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-03-25', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-26', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-27', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-03-28', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-03-29', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-03-30', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-03-31', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-01', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-04-02', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-04-03', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-04-04', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-05', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-06', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-04-07', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-04-08', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-04-09', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-10', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-11', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-04-12', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-04-13', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-04-14', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-15', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-16', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-04-17', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-04-18', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-04-19', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-20', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-21', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-22', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-04-23', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-04-24', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-04-25', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-26', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-04-27', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-04-28', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-04-29', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-04-30', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
            { date: '2022-05-01', open: 110, high: 130, low: 70, close: 140, volume: 2000 },
            { date: '2022-05-02', open: 150, high: 170, low: 100, close: 160, volume: 3000 },
            { date: '2022-05-03', open: 140, high: 140, low: 80, close: 80, volume: 1000 },
            { date: '2022-05-04', open: 100, high: 120, low: 90, close: 110, volume: 1000 },
        ]
        setData(newData);
    }, [])

    return (
        <div className="grid grid-rows-12 h-screen border-separate">
            {/* navbar */}
            <Navbar />
            <div className="row-span-11 grid grid-cols-12 border border-t-black">
                {/* left aside */}
                <aside className="col-span-3 grid grid-rows-3">
                    <FundTotalAssets />
                    <FundAssetsHeld />
                    <FundSalesHistory />
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
                    <SaleBtn />
                    <StockList />
                    <MarketAndTrends />
                </aside>
            </div>
        </div>
    )
}