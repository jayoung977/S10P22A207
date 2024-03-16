'use client'
// 현재 턴/종목에 대한 차트 정보 (main - 1)
import { useEffect } from 'react';
import anychart from 'anychart';

function calculateMovingAverage(data :any, period :any) {
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc :any, curr:any) => acc + curr.close, 0);
        const average = sum / period;
        result.push([data[i].date, average]);
    }
    return result;
  }

export default function Chart ({ data } :any) {
    useEffect(() => {
        // 차트 생성
        const chart = anychart.stock();
        // 차트를 넣을 컨테이너 생성
        const container = chart.container('chart-container');
        chart.contextMenu(false);

        // 첫 번째 플롯 생성(line, candlestick, moving average)
        const plot1 = chart.plot(0);
        plot1.title('일 별 주가 & OHLC, 이동평균선')

        // line 그래프 생성
        const lineSeries = plot1.line(data?.map((item :any) => ([item.date, item.close])))
        lineSeries.name('주가');
        lineSeries.hovered().markers().enabled(true).type('circle').size(4);
        
        // candlestick 그래프 생성
        const candlestickSeries = plot1.candlestick(data?.map((item :any) => ([item.date, item.open, item.high, item.low, item.close])))
        candlestickSeries.name('OHLC');
        candlestickSeries.legendItem().iconType('risingfalling');
        candlestickSeries.tooltip().useHtml(true);
        candlestickSeries.tooltip().format(function (this :any) {
            const series = this.series;
            return ( 
                        "시가(O) : " + this.open + "\n" +  
                        "고가(H) : " + this.high + "\n" +
                        "저가(L) : " + this.low + "\n" + 
                        "종가(E) : " + this.close + "\n"
                    )

        })
        // candlestick series 색상 지정
        candlestickSeries.risingFill("#F65742", 1);
        candlestickSeries.risingStroke("#F65742", 1);
        candlestickSeries.fallingFill("#0597FF", 1);
        candlestickSeries.fallingStroke("#0597FF", 1);

        // 이동평균선 그래프 생성(sma)
        const sma10Series = plot1.line(calculateMovingAverage(data, 10));
        sma10Series.name('10일 이동평균선');
        const sma20Series = plot1.line(calculateMovingAverage(data, 20));
        sma20Series.name('20일 이동평균선');

        // 이동평균선 그래프 색상 지정
        sma10Series.stroke('pink');
        sma20Series.stroke('purple');

        // 첫 번째 plot 속성 설정
        plot1.legend().title().useHtml(true);
        plot1.legend().useHtml(true);
        plot1.legend().itemsFormat(function (this :any) {
            const series = this.series;
            if (series.getType() == "line") {
                return "<span style='color:#455a64;font-weight:600'>" +
                       series.name() + " : </span>" + this.value;
              }
              if (series.getType() == "candlestick") {
                return "<span style='color:#455a64;font-weight:600'>" +
                       series.name() + " : </span>" +
                       this.open + " | " + this.high + " | " +
                       this.low + " | " + this.close;
              }
        })

        // 두 번째 플롯 생성(column)
        const plot2 = chart.plot(1);
        plot2.title('거래량')
        plot2.legend().title().useHtml(true);
        
        // column 그래프 생성
        const columnSeries = plot2.column(data?.map((item :any) => ([item.date, item.volume])))
        columnSeries.name('거래량');
        plot2.legend().useHtml(true);
        plot2.legend().itemsFormat(function (this :any) {
            const series = this.series;
            if (series.getType() == "column") {
                return "<span style='color:#455a64;font-weight:600'>" +
                series.name() + " : </span>" + this.value;
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