"use client";
// 현재 턴/종목에 대한 차트 정보 (main - 1)
import { useState, useEffect } from "react";
import anychart from "anychart";
import SingleGameStore from "@/public/src/stores/single/SingleGameStore";
import useClickSound from "@/public/src/components/clickSound/DefaultClick";



// 주어진 데이터 정제
function filteringLowPriceZero(data :any) {
  const newData = data.map((item :any) => {
    if (item.lowPrice == 0) {
      return {
        ...item,
        lowPrice: item.endPrice,
        marketPrice: item.endPrice,
        highPrice: item.endPrice,
      };
    }
    return item;
  });
  return newData;
}

// 이동평균선 데이터 생성 함수
function calculateMovingAverage(data :any, period :any) {
    const result = [];
    for (let i = 0; i < data?.length; i++) {
        if (i > period) {
          const sum = data.slice(i - period + 1, i + 1).reduce((acc :any, curr:any) => acc + curr.endPrice, 0);
          const average = (sum / period).toFixed(2);
          result.push([data[i].date, parseFloat(average)]);

        } else {
          // result.push([data[i].date, 0]);
        }

    }
    return result;
}


// rsi 데이터 생성 함수
function calculateRSI(data :any, period :number) {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= period) {
      let avgGain = 0;
      let avgLoss = 0;
  
      for (let j = i - period; j < i; j++) {
        let change;
        if (j > 0) {
          change = data[j].endPrice - data[j - 1].endPrice;
          if (change > 0) {
            avgGain += change;
          } else {
            avgLoss -= change;
          }
        }
      }
      avgGain /= period;
      avgLoss /= period;
      let rs;
      if (avgLoss === 0) {
        rs = 1; // avgLoss가 0인 경우에 대비하여 rs를 1로 설정
      } else {
        rs = avgGain / avgLoss;
      }
      let rsi = parseFloat((100 - (100 / (1 + rs))).toFixed(2));
      result.push([data[i].date, rsi]);
    } else {
      // result.push([data[i].date, 0]);
    }
  }
  return result;
}


function calculateEMA(data :any, period :number) {
  const emaValues = [];
  let sum = 0;

  // 초기 EMA 값은 첫 번째 날짜의 종가로 설정
  let initialEMA = data[0].endPrice;
  emaValues.push([data[0].date, parseFloat(initialEMA.toFixed(2))]);

  // 첫 번째 EMA를 제외한 나머지 EMA 값을 계산
  for (let i = 1; i < period; i++) {
    let k = 2 / (i + 1);
    let ema :any = data[i].endPrice * k + emaValues[i-1][1] * (1 - k);
    emaValues.push([data[i].date, parseFloat(ema.toFixed(2))]);
    sum += data[i].endPrice;
  }

  // 나먨지 날짜에 대한 EMA 값을 계산
  for (let i = period; i < data.length; i++) {
    let k = 2 / (period + 1);
    let ema :any = (data[i].endPrice - emaValues[i-1][1]) * k + emaValues[i-1][1];
    emaValues.push([data[i].date, parseFloat(ema.toFixed(2))]);
  }

  return emaValues;
}

function calculateMACD(data :any, shortPeriod :number, longPeriod :number) {
  const shortEMA = calculateEMA(data, shortPeriod);
  const longEMA = calculateEMA(data, longPeriod);

  const result = []
  for (let i = 0; i < data.length; i++) {
    result.push([data[i].date, shortEMA[i][1] - longEMA[i][1]])
  }

  return result;
}


function calculateSignal(macdData :any, signalPeriod :number) {
  const result = [];
  for (let i = 0; i < signalPeriod - 1; i++) {
    result.push([macdData[i][0], NaN]);
  }
  for (let i = signalPeriod - 1; i < macdData.length; i++) {
    const slice = macdData.slice(i - signalPeriod + 1, i + 1);
    let sum = 0;
    for (let j = 0; j < slice.length; j++) {
      sum += slice[j][1]; // shortEMA - longEMA 값들의 합
    }
    const signalEMA = sum / signalPeriod; // 9일간의 EMA 계산
    result.push([macdData[i][0], parseFloat(signalEMA.toFixed(2))]); // 해당 날짜의 EMA 값을 Signal 데이터에 추가
  }

  return result;
}

function calculateHist(macdData :any, signalData :any) {
  const result = [];
  for (let i = 0; i < macdData.length; i++) {
    result.push([macdData[i][0], macdData[i][1] - signalData[i][1]]);
  }
  return result;
}


export default function Chart({ data }: any) {
  const { selectedStockIndex, turn, startDate, setStartDate, endDate, setEndDate, isBuySellModalOpen } = SingleGameStore();
  const [selectedSecondaryIndicator, setSelectedSecondaryIndicator] = useState<number>(1);
  useEffect(() => {
    const purifiedData = filteringLowPriceZero(data);
    // 차트 생성
    const chart = anychart.stock();
    // 차트를 담을 컨테이너 생성
    const container = chart.container("chart-container")
    const creditsElement = document.querySelector('.anychart-credits');
    if (creditsElement) {
      creditsElement.remove();
    }
    chart.contextMenu(false);
    chart.width("90%");
    // 스크롤러
    const scroller = chart.scroller();
    scroller.xAxis(false);
    // console.log("startDate : ", anychart.format.dateTime(new Date(startDate), 'yyyy-MM-dd')); // 콘솔 결과 : 2020-09-15
    // console.log("endDate : ",  anychart.format.dateTime(new Date(endDate), 'yyyy-MM-dd')); //  콘솔 결과 : 2020-11-30
    // Store에 저장해놓은 범위를 chart에서 스크롤바가 선택된 범위로 바꿈
    // chart.selectRange(anychart.format.dateTime(new Date(startDate), 'yyyy-MM-dd'), anychart.format.dateTime(new Date(endDate), 'yyyy-MM-dd'));
    // chart.selectRange(startDate, endDate);

    // var range = chart.getSelectedRange();
    // console.log("차트 선택된 범위 시작 : ", anychart.format.dateTime(range.firstSelected, 'yyyy-MM-dd'));
    // console.log("차트 선택된 범위 끝 : ", anychart.format.dateTime(range.lastSelected, 'yyyy-MM-dd'));
    
    // chart.scroller().listen('scrollerChange', function () {
    //   var range = chart.getSelectedRange();
    //   setStartDate(range.firstSelected);
    //   setEndDate(range.lastSelected);
    // })
    scroller.selectedFill({
      src: 'https://static.anychart.com/images/beach.png',
      mode: 'stretch',
      opacity: 0.5
    });
    
    // 툴 팁
    const tooltip = chart.tooltip();
    tooltip.titleFormat("Info");

    // 첫 번재 plot 생성(line, OHLC, 이동평균선)
    const plot1 = chart.plot(0);
    plot1.title("주가, OHLC, 이동평균선")
    plot1.yAxis().orientation("right");
    plot1.yAxis().labels().fontSize(20)

    // 가장 최근 종가 Line
    const todayEndPriceLineMarker = plot1.lineMarker();
    todayEndPriceLineMarker.value(purifiedData[299+turn]?.endPrice);
    todayEndPriceLineMarker.stroke({
      thickness: 2,
      color: "pink",
      dash: "5 5",
    });    
    // 가장 최근 종가 가격 Text
    const todayEndPriceTextMarker = plot1.textMarker();
    todayEndPriceTextMarker.value(purifiedData[299+turn]?.endPrice);
    todayEndPriceTextMarker.text(purifiedData[299+turn]?.endPrice)
    todayEndPriceTextMarker.fontColor("pink");
    todayEndPriceTextMarker.background().enabled(true);
    todayEndPriceTextMarker.background().stroke("2 pink");
    todayEndPriceTextMarker.padding(3);
    todayEndPriceTextMarker.align("right");
    todayEndPriceTextMarker.offsetX(-60);
    todayEndPriceTextMarker.fontSize(15);

    // line series 생성
    const lineSeries = plot1.line(
      purifiedData?.map((item: any) => [item.date, item.endPrice])
    );
    // line series 속성 설정
    lineSeries.name("주가");
    lineSeries.hovered().markers().enabled(true).type("circle").size(3);
    lineSeries.stroke("#86BF15", 1);
    lineSeries.tooltip().useHtml(true);
    lineSeries.tooltip().format(function (this :any) {
      const series = this.series;
      return (
        "주가 : " + this.value + "\n"
      )
    })
    lineSeries.enabled(false);
    // candlestick series 생성
    const candlestickSeries = plot1.candlestick(purifiedData?.map((item: any) => [item.date, item.marketPrice, item.highPrice, item.lowPrice, item.endPrice]));
    // candlestick series 속성 설정
    candlestickSeries.name("OHLC");
    candlestickSeries.legendItem().iconType("risingfalling");
    candlestickSeries.tooltip().useHtml(true);
    candlestickSeries.tooltip().format(function (this: any) {
      return (
        "시가 : " + this.open + "\n" +
        "고가 : " + this.high + "\n" +
        "저가 : " + this.low + "\n" +
        "종가 : " + this.close + "\n"
      );
    });
    // candlestick series 색상 지정
    candlestickSeries.risingFill("#F65742", 1);
    candlestickSeries.risingStroke("#F65742", 1);
    candlestickSeries.fallingFill("#0597FF", 1);
    candlestickSeries.fallingStroke("#0597FF", 1);

    // 이동평균선 그래프 생성(sma)
    const sma5Series = plot1.line(calculateMovingAverage(purifiedData, 5));
    sma5Series.name('5');
    const sma20Series = plot1.line(calculateMovingAverage(purifiedData, 20));
    sma20Series.name('20');
    const sma60Series = plot1.line(calculateMovingAverage(purifiedData, 60));
    sma60Series.name('60');
    const sma120Series = plot1.line(calculateMovingAverage(purifiedData, 120));
    sma120Series.name('120');
    
    // 이동평균선 그래프 색상 지정
    sma5Series.stroke('purple');
    sma20Series.stroke('red');
    sma60Series.stroke('green');
    sma120Series.stroke('blue');
   
    // 이동평균선 툴팁 내용 지정
    sma5Series.tooltip().useHtml(true);
    sma5Series.tooltip().format(function (this :any) {
      if (this.value) {
        return (
          "sma  05 : " + this.value
        ) 
      } else {
        return (
          "sma  05 : " + 0
        )
      }
    }) 
    sma20Series.tooltip().useHtml(true);
    sma20Series.tooltip().format(function (this :any) {
      if (this.value) {
        return (
          "sma 20 : " + this.value
        ) 
      } else {
        return (
          "sma 20 : " + 0
        )
      }
    }) 
    sma60Series.tooltip().useHtml(true);
    sma60Series.tooltip().format(function (this :any) {
      if (this.value) {
        return (
          "sma 60 : " + this.value
        ) 
      } else {
        return (
          "sma 60 :" + 0
        )
      }
    }) 
    sma120Series.tooltip().useHtml(true);
    sma120Series.tooltip().format(function (this :any) {
      if (this.value) {
        return (
          "sma120 : " + this.value + "\n"
        ) 
      } else {
        return (
          "sma120 : " + 0 + "\n"
        )
      }
    }) 

    // 첫 번째 plot 속성 설정
    plot1.legend().title().useHtml(true);
    plot1.legend().titleFormat(<span></span>);
    plot1.legend().useHtml(true);
    plot1.legend().itemsFormat(function (this: any) {
      const series = this.series;
      if (series.getType() == "line") {
        if (this.value) {
          return (
            "<span style='color:#455a64;font-weight:600'>" +
            series.name() +
            ":</span>" +
            this.value
          );
        } else {
          return (
            "<span style='color:#455a64;font-weight:600'>" +
            series.name() +
            ":</span>" +
            0
          )
        }
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

    // 2번째 plot 생성(거래량)
    const plot2 = chart.plot(1);
    plot2.title("거래량")
    plot2.yAxis().orientation("right");
    plot2.yAxis().labels().fontSize(15)

    plot2.legend().title().useHtml(true);
    plot2.legend().titleFormat(<span></span>);
    const columnSeries = plot2.column(
      purifiedData?.map((item: any) => [item.date, item.tradingVolume])
    );
    columnSeries.name("거래량");
    columnSeries.risingFill("#F65742", 1);
    columnSeries.risingStroke("#F65742", 1);
    columnSeries.fallingFill("#0597FF", 1);
    columnSeries.fallingStroke("#0597FF", 1);

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

    // 3번째 plot 생성(RSI)
    const plot3 = chart.plot(2);
    plot3.title("RSI");
    plot3.yAxis().orientation("right");
    plot3.yAxis().labels().fontSize(15)
    plot3.legend().useHtml(true);
    plot3.legend().title().useHtml(true);
    plot3.legend().titleFormat(<span></span>);

    const rsiSeries = plot3.line(calculateRSI(purifiedData, 14));
    rsiSeries.name("RSI");
    rsiSeries.hovered().markers().enabled(true).type("circle").size(2);
    rsiSeries.stroke("blue", 1);

    rsiSeries.tooltip().useHtml(true);
    rsiSeries.tooltip().format(function (this :any) {
      if (this.value) {
        return (
          "RSI : " + this.value
        ) 
      } else {
        return (
          "RSI : " + 0
        )
      }
    }) 

    // RSI 상한선, 하한선
    const rsi70LineMarker = plot3.lineMarker(0);
    rsi70LineMarker.value(70);
    rsi70LineMarker.stroke({
      thickness: 1,
      color: "black",
      dash: "5 5",
    });    
    const rsi30LineMarker = plot3.lineMarker(1);
    rsi30LineMarker.value(30);
    rsi30LineMarker.stroke({
      thickness: 1,
      color: "black",
      dash: "5 5",
    });    

    const plot4 = chart.plot(3);
    plot4.title("MACD 지표")
    plot4.yAxis().orientation("right");
    plot4.yAxis().labels().fontSize(15)
    plot4.legend().title().useHtml(true);
    plot4.legend().titleFormat(<span></span>);

    const macdData = calculateMACD(purifiedData, 12, 26);
    const signalData = calculateSignal(macdData, 9);
    const histData = calculateHist(macdData, signalData);
    const macdSeries = plot4.line(macdData);
    const signalSeries = plot4.line(signalData);
    const histSeries = plot4.column(histData);
    
    macdSeries.name("MACD");
    signalSeries.name("Signal")
    histSeries.name("Hist")

    plot1.height("70%");
    plot2.enabled(true);
    plot2.height("30%") 
    plot3.enabled(false); 
    plot4.enabled(false); 
    chart.draw();

    const showPlot = (plotNumber: number) => {
      switch (plotNumber) {
        case 1:
          setSelectedSecondaryIndicator(1);
          plot2.enabled(true);
          plot2.height("30%");
          plot3.enabled(false);
          plot4.enabled(false);
          break;
        case 2:
          setSelectedSecondaryIndicator(2);
          plot2.enabled(false);
          plot3.enabled(true);
          plot3.height("30%");
          plot4.enabled(false);
          break;
        case 3:
          setSelectedSecondaryIndicator(3);
          plot2.enabled(false);
          plot3.enabled(false);
          plot4.enabled(true);
          plot4.height("30%");

          break;

        default:
          break;
      }
    };
    const handleShowAll = () => {
      chart.selectRange(purifiedData[0].date.split('T')[0], purifiedData[turn+299].date.split('T')[0])
    }
    const handleShowPlot = (plotNumber :number) => {
      showPlot(plotNumber);
      setSelectedSecondaryIndicator(plotNumber);
    }
    const handleKeyPress = (event :KeyboardEvent) => {
      if (event.key == "`" && !isBuySellModalOpen) {
        handleShowAll();
      }
    }
    document.addEventListener('keypress', handleKeyPress);

    (window as any).handleShowAll = handleShowAll;
    (window as any).handleShowPlot = handleShowPlot;
    handleShowPlot(selectedSecondaryIndicator);
    // console.log("purifiedData", purifiedData[turn+249].date.split('T')[0]);
    chart.selectRange(purifiedData[turn+249].date.split('T')[0], purifiedData[turn+299].date.split('T')[0])
    // chart.selectRange(anychart.format.dateTime(new Date(startDate), 'yyyy-MM-dd'), anychart.format.dateTime(new Date(endDate), 'yyyy-MM-dd'))  
    // chart.scroller().listen('scrollerChange', function () {
    //   var range = chart.getSelectedRange();
    //   setStartDate(range.firstSelected);
    //   setEndDate(range.lastSelected);
    // })
    return () => {
      document.removeEventListener('keypress', handleKeyPress);

      // setStartDate(chart.getSelectedRange().firstSelected);
      // setEndDate(chart.getSelectedRange().lastSelected);
      chart.dispose();
      (window as any).handleShowAll = null;
      (window as any).handleShowPlot = null;

    };
    
  }, [data]);

 const playClickSound = useClickSound();
  
  return (
    <div className="row-span-12 grid grid-rows-12">
      <div className="row-span-1 grid grid-cols-8 items-center">
        <div className="text-center">종목 {selectedStockIndex+1}</div>
        <button 
          onClick={() => {
            playClickSound();
            (window as any).handleShowPlot(1)
          }} 
          className={`border ${selectedSecondaryIndicator == 1 ? 'bg-slate-400 text-white border-slate-400' : 'border-black'} m-1 px-1 rounded-md`}>Volume</button>
        <button 
          onClick={() => {
            playClickSound();
            (window as any).handleShowPlot(2)
          }} 
          className={`border ${selectedSecondaryIndicator == 2 ? 'bg-slate-400 text-white border-slate-400' : 'border-black'} m-1 px-1 rounded-md`}>RSI</button>
        <button 
          onClick={() => {
            playClickSound();
            (window as any).handleShowPlot(3)
          }} 
          className={`border ${selectedSecondaryIndicator == 3 ? 'bg-slate-400 text-white border-slate-400' : 'border-black'} m-1 px-1 rounded-md`}>MACD</button>
        <button 
          onClick={() => {
            playClickSound();
            (window as any).handleShowAll()
          }} 
          className="border border-black m-1 px-1 rounded-md">전체보기(`)</button>
      </div>

      <div id="chart-container" className="row-span-12 flex items-center justify-center"></div>
    </div>

  );
}
