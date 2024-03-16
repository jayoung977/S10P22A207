"use client";
// 현재 턴/종목에 대한 차트 정보 (main - 1)
import { useEffect } from "react";
import anychart from "anychart";

// 이동평균선 데이터 생성 함수
function calculateMovingAverage(data :any, period :any) {
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
        const sum = data.slice(i - period + 1, i + 1).reduce((acc :any, curr:any) => acc + curr.close, 0);
        const average = sum / period;
        result.push([data[i].date, average]);
    }
    return result;
  }

export default function Chart({ data }: any) {
  useEffect(() => {
    // 차트 생성
    const chart = anychart.stock();
    // 차트를 담을 컨테이너 생성
    const container = chart.container("chart-container");
    chart.scroller().xAxis(false);
    chart.contextMenu(false);
    
    // 툴 팁 내용 수정
    const tooltip = chart.tooltip();
    tooltip.titleFormat("");

    // 첫 번재 plot 생성(line, OHLC, 이동평균선)
    const plot1 = chart.plot(0);
    plot1.title("일 별 주가 & OHLC");

    // line series 생성
    const lineSeries = plot1.line(
      data?.map((item: any) => [item.date, item.close])
    );
    // line series 속성 설정
    lineSeries.name("종가");
    lineSeries.hovered().markers().enabled(true).type("circle").size(4);
    lineSeries.stroke("#86BF15", 1);

    // candlestick series 생성
    const candlestickSeries = plot1.candlestick(
      data?.map((item: any) => [
        item.date,
        item.open,
        item.high,
        item.low,
        item.close,
      ])
    );
    // candlestick series 속성 설정
    candlestickSeries.name("OHLC");
    candlestickSeries.legendItem().iconType("risingfalling");
    candlestickSeries.tooltip().useHtml(true);
    candlestickSeries.tooltip().format(function (this: any) {
      const series = this.series;
      return (
        "시가 : " +
        this.open +
        "\n" +
        "고가 : " +
        this.high +
        "\n" +
        "저가 : " +
        this.low +
        "\n" +
        "종가 : " +
        this.close +
        "\n"
      );
    });
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
    plot1.legend().titleFormat(<span></span>);
    plot1.legend().useHtml(true);
    plot1.legend().itemsFormat(function (this: any) {
      const series = this.series;
      if (series.getType() == "line") {
        return (
          "<span style='color:#455a64;font-weight:600'>" +
          series.name() +
          ":</span>" +
          this.value
        );
      }
      if (series.getType() == "candlestick") {
        return (
          "<span style='color:#455a64;font-weight:600'>" +
          series.name() +
          ":</span>" +
          this.open +
          " | " +
          this.high +
          " | " +
          this.low +
          " | " +
          this.close
        );
      }
    });
    const plot2 = chart.plot(1);
    plot2.legend().title().useHtml(true);
    plot2.legend().titleFormat(<span></span>);
    const columnSeries = plot2.column(
      data?.map((item: any) => [item.date, item.volume])
    );
    columnSeries.name("거래량");

    plot2.legend().useHtml(true);
    plot2.legend().itemsFormat(function (this: any) {
      const series = this.series;
      if (series.getType() == "column") {
        return (
          "<span style='color:#455a64;font-weight:600'>" +
          series.name() +
          ":</span>" +
          this.value
        );
      }
    });
    plot1.height("70%");
    plot2.height("30%");
    chart.draw();

    return () => {
      chart.dispose();
    };
  }, [data]);
  return (
    <div
      id="chart-container"
      className="row-start-2 row-end-13 flex items-center justify-center"
    ></div>
  );
}
