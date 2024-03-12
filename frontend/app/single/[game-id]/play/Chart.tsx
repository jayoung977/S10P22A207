// 차트 컴포넌트
'use client'
import { useEffect } from 'react';
import anychart from 'anychart';


export default function Chart ({ data } :any) {
   
    useEffect(() => {
       
        const chart = anychart.stock();
        const container = chart.container('chart-container');
        // anychart-credit selector : #chart-container > div > div.anychart-credits
        chart.contextMenu(false);
        chart.credits().enabled(false);
        const plot1 = chart.plot(0);
        plot1.title('일 별 종가, OHIC')
        plot1.line(data.map((item :any) => ([item.date, item.close]))).name('종가');
        plot1.candlestick(data.map((item :any) => ([item.date, item.open, item.high, item.low, item.close]))).name('OHLC');

        const plot2 = chart.plot(1);
        plot2.column(data.map((item :any) => ([item.date, item.volume]))).name('거래량');
        
        plot1.height('70%');
        plot2.height('30%');
        chart.draw();
        
        return () => {
            chart.dispose();
        }
    }, [data])
    return (
        <div className="row-start-1 row-end-12 grid grid-rows-12 border border-black">
            <div className="row-start-1 row-end-2 border border-b-black flex items-center p-2">
                차트 이름
            </div>
            <div id="chart-container" className="row-start-2 row-end-13 border border-black flex items-center justify-center">
            </div>
        </div>
    )
}