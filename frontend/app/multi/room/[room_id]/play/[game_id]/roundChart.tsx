// 차트 컴포넌트
'use client'
import { useEffect } from 'react';
import anychart from 'anychart';

export default function RoundChart ({ data } :any) {
   
    useEffect(() => {
        const chart = anychart.stock();
        const container = chart.container('chart-container-2');

        chart.contextMenu(false);
        chart.credits().enabled(false);
        const plot1 = chart.plot(0);
        plot1.title('일 별 종가 & OHLC')

        const lineSeries = plot1.line(data.map((item :any) => ([item.date, item.close])))
        lineSeries.name('종가');
        lineSeries.hovered().markers().enabled(true).type('circle').size(4);
        lineSeries.tooltip().position('right').anchor('left-center')
        
        const candlestickSeries = plot1.candlestick(data.map((item :any) => ([item.date, item.open, item.high, item.low, item.close])))
        candlestickSeries.name('OHLC');
        candlestickSeries.legendItem().iconType('risingfalling');

        plot1.legend().useHtml(true);
        plot1.legend().itemsFormat(function (this :any) {
            const series = this.series;
            if (series.getType() == "line") {
                return "<span style='color:#455a64;font-weight:600'>" +
                       series.name() + ":</span>" + this.value;
              }
              if (series.getType() == "candlestick") {
                return "<span style='color:#455a64;font-weight:600'>" +
                       series.name() + ":</span>" +
                       this.open + " | " + this.high + " | " +
                       this.low + " | " + this.close;
              }
        })
        const plot2 = chart.plot(1);
        const columnSeries = plot2.column(data.map((item :any) => ([item.date, item.volume])));
        columnSeries.name('거래량');
        
        plot2.legend().useHtml(true);
        plot2.legend().itemsFormat(function (this :any) {
            const series = this.series;
            if (series.getType() == "column") {
                return "<span style='color:#455a64;font-weight:600'>" +
                series.name() + ":</span>" + this.value;
            }
        })
        plot1.height('70%');
        plot2.height('30%');

        chart.draw();
        
        return () => {
            chart.dispose();
        }
    }, [data])
    return (
        <div id="chart-container-2" className="row-span-12 flex items-center justify-center">
        </div>
    )
}
