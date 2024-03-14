'use client'
// 현재 턴/종목에 대한 차트 정보 (main - 1)
import { useEffect } from 'react';
import anychart from 'anychart';


export default function Chart ({ data } :any) {
   
    useEffect(() => {
 
        const chart = anychart.stock();
        const container = chart.container('chart-container');
        chart.scroller().xAxis(false);
        chart.contextMenu(false);
        const tooltip = chart.tooltip();
        tooltip.titleFormat('');
        const plot1 = chart.plot(0);
        plot1.title('일 별 종가 & OHLC')
        
        const lineSeries = plot1.line(data?.map((item :any) => ([item.date, item.close])))
        lineSeries.name('종가');
        lineSeries.hovered().markers().enabled(true).type('circle').size(4);
        
        const candlestickSeries = plot1.candlestick(data?.map((item :any) => ([item.date, item.open, item.high, item.low, item.close])))
        candlestickSeries.name('OHLC');
        candlestickSeries.legendItem().iconType('risingfalling');
        candlestickSeries.tooltip().useHtml(true);
        candlestickSeries.tooltip().format(function (this :any) {
            const series = this.series;
            return ( 
                        "시가 : " + this.open + "\n" +  
                        "고가 : " + this.high + "\n" +
                        "저가 : " + this.low + "\n" + 
                        "종가 : " + this.close + "\n"
                    )

        })
        console.log(plot1);
        plot1.legend().title().useHtml(true);
        plot1.legend().titleFormat(<span></span>);
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
        plot2.legend().title().useHtml(true);
        plot2.legend().titleFormat(<span></span>);
        const columnSeries = plot2.column(data?.map((item :any) => ([item.date, item.volume])));
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
        <div id="chart-container" className="row-start-2 row-end-13 flex items-center justify-center">
        </div>
    )
}

