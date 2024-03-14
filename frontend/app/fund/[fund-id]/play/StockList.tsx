'use client'
// 사용자가 받은 10개의 랜덤한 주식 종목 목록 (right side bar - 2)
import { useState } from 'react'
import Stock from "./Stock"

function kmpSearch(text :any, pattern :any) {
    const n = text.length;
    const m = pattern.length;
    const lps = computeLPS(pattern, m);

    let i = 0; // text의 인덱스
    let j = 0; // pattern의 인덱스
    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
            if (j === m) {
                return true; // 패턴이 일치하는 경우
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return false; // 패턴이 일치하지 않는 경우
}

function computeLPS(pattern :any, m :any) {
    const lps = new Array(m).fill(0);
    let length = 0;
    let i = 1;
    while (i < m) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}





export default function StockList () {
    const [selectedStock, setSelectedStock] = useState(0);
    const [searchedStockData, setSearchedStockData] = useState([]);
    const [stockData, setStockData] = useState([
        {
            name : '종목1', 
            riseRate : -1.5,
            price : 70000,
        },
        {
            name : '종목2', 
            riseRate : -2.8,
            price : 50000,
        },
        {
            name : '종목3', 
            riseRate : +3.5,
            price : 80000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        {
            name : '종목4', 
            riseRate : +10.9,
            price : 200000,
        },
        

    ])

    function findMatchingValues(inputText :any, stockData :any) {
        const searched:any = []
        for (const value of stockData) {
            if (kmpSearch(value.name, inputText)) {
                searched.push(value);
            }
        }
        setSearchedStockData(searched);
    }

   return (
        <div className="row-start-2 row-end-5 grid grid-rows-8">
            <div className="row-span-1 flex items-center justify-between pl-2">
                <div className="rounded-t-lg bg-small-1 text-textColor-2"><span className="mx-1">종목</span></div>
            </div>
            <div className="row-span-1 relative">
                <input
                    onChange={(e) => {
                        console.log(e.currentTarget.value)
                        findMatchingValues(e.currentTarget.value, stockData)
                        }}
                    type="search"
                    className="relative m-0 block w-full rounded border border-solid border-neutral-200 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none dark:border-white/10 dark:text-white dark:placeholder:text-neutral-200 dark:autofill:shadow-autofill dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    id="exampleFormControlInput4" />
            </div>
            <div className="row-span-6 overflow-y-auto block" style={{height: 'calc(30vh)'}}>
                {
                    searchedStockData && searchedStockData.map((x, index) => (
                        <Stock 
                            key={index} 
                            id={index}
                            data={x} 
                            isSelected={selectedStock==index}
                            onClick={()=>{setSelectedStock(index)}}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}