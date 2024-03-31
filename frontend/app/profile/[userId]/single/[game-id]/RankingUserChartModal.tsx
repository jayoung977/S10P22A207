"use client";
import { useEffect } from "react";
import anychart from "anychart";
import SingleReviewStore from "@/public/src/stores/profile/SingleReviewStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


function filteringLowPriceZero(data :any) {
  const newData = data?.map((item :any) => {
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

function calculateMovingAverage(data :any, period :any) {
    const result = [];
    for (let i = 0; i < data?.length; i++) {
        if (i > period) {
          const sum = data.slice(i - period + 1, i + 1).reduce((acc :any, curr:any) => acc + curr.endPrice, 0);
          const average = (sum / period).toFixed(2);
          result.push([data[i].date, parseFloat(average)]);

        } else {
        }
    }
    return result;
}


function Chart({ tradeList, data }: any) {
    const { selectedIndex, stockInfoDtoList } = SingleReviewStore();
    useEffect(() => {

        const purifiedData = filteringLowPriceZero(data);
        // 차트 생성
        const chart = anychart.stock();
        // 차트를 담을 컨테이너 생성
        const container = chart.container("container")
        const creditsElement = document.querySelector('.anychart-credits');
        if (creditsElement) {
        creditsElement.remove();
        }
        chart.contextMenu(false);
        chart.width("95%");
        // 스크롤러
        const scroller = chart.scroller();
        scroller.selectedFill({
        src: 'https://static.anychart.com/images/beach.png',
        mode: 'stretch',
        opacity: 0.5
        });
        
        // 툴 팁
        const tooltip = chart.tooltip();

        // 첫 번재 plot 생성(line, OHLC, 이동평균선)
        const plot1 = chart.plot(0);
        plot1.title("주가, OHLC, 이동평균선")
        plot1.yAxis().orientation("right");
        plot1.yAxis().labels().fontSize(15);

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
    
    let eventMarkerData :any = [];
    tradeList?.map((x :any) => {
        if (x.tradeType == "BUY") {
            eventMarkerData.push({
                symbol : 'B',
                date : x.date,
                description : `주가 : ${x.price}` + '\n' + `수량 : ${x.amount}`,
                normal : { fill : 'red' }

            })
        } else {
            eventMarkerData.push({
                symbol : 'S',
                date : x.date,
                description : `주가 : ${x.price}` + '\n' + `수량 : ${x.amount}`,
                normal : { fill : 'blue' }
            })
        }
    })

    if (eventMarkerData.length > 0) {
        plot1.eventMarkers({"groups": [
            {
            "data": eventMarkerData,
            }
        ]});
    }
    
    // set the symbol of event markers
    plot1.eventMarkers().format(function( this :any ) {
        return this.getData("symbol");
    });
    
    
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
        plot1.height("70%");
        plot2.height("30%");
        
        chart.draw();

        return () => {
            chart.dispose();
        };
    }, [tradeList, data]);

 
  
  return (
    <div className="row-span-11 grid grid-rows-12">
        <div id="container" className="row-span-12 flex items-center justify-center"></div>
    </div>

  );
}

export default function RankingUserChartModal({ isOpen, onClose, data } :any) {
    console.log(data);
    if (!isOpen) return null;
    return (
        <div 
            className="grid grid-rows-12 transform -translate-x-1/2 -translate-y-1/2 border border-black bg-white p-3 rounded-lg z-20"
            style={{ width: "80%", height: "90%", position: "absolute", top: "54%", left: "50%"}}
        >
            <div className="row-span-1 grid grid-cols-12">
                <div className="col-start-4 col-end-10 flex items-center justify-center">{data.nickname} 님의 매매기록</div>
                <div className="col-start-12 col-end-13 flex items-center text-center justify-center">
                    <FontAwesomeIcon 
                        icon={faCircleXmark} 
                        size="2xl" 
                        style={{ color: "#FF0000",  cursor: "pointer" }} 
                        onClick={onClose}
                    />

                </div>
            </div>
            <Chart tradeList={data?.tradeList} data={data?.stockChartList} />
        </div>
    )
}