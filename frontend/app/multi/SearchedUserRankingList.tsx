'use client'
import { easeInOut } from 'framer-motion/dom';
import { useState } from 'react';
import UserRanking from './userRanking';

interface userType {
    memberId: number;
    nickname: string;
    assets: number;
}
  
const userRankingList :userType[] = [
    {
        memberId: 10,
        nickname : "십재용",
        assets : 100000000,
    },
    {
        memberId: 100,
        nickname : "백재용",
        assets : 100000000,
    },
    {
        memberId: 1000,
        nickname : "천재용",
        assets : 100000000,
    },
    {
        memberId: 10000,
        nickname : "만재용",
        assets : 100000000,
    },
    {
        memberId: 100000000,
        nickname : "억재용",
        assets : 100000000,
    },
]

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

export default function SearchedUserRankingList () {
    const [searchedUserList, setSearchedUserList] = useState<userType[]>([]);
    const [search, setSearch] = useState<string>('');

    function findMatchingValues(inputText :string, userRankingList :userType[]) {
        const searched :userType[] = []
        for (const value of userRankingList) {
            if (kmpSearch(value.nickname, inputText)) {
                searched.push(value);
            }
        }
        setSearchedUserList(searched);
    }

    return (
        <div className="row-span-9 grid grid-rows-12">
            <div className="row-span-2 flex ms-3 items-center mt-1">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <input 
                    type="text" 
                    id="simple-search" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 ps-3 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  
                    required
                    placeholder='사용자 닉네임을 검색하세요.' 
                    onChange={(e) => {setSearch(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key=='Enter') {
                            return findMatchingValues(search, userRankingList);
                        }
                    }}
                    />
                <button 
                    type="submit" 
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {findMatchingValues(search, userRankingList)}}    
                >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
            <div className="row-span-10 overflow-auto border" style={{ height: 'calc(38vh)'}}>
                {
                    searchedUserList.length > 0 ? (
                        searchedUserList.map((x, index) => (
                            <UserRanking key={x.memberId} user={x}/>
                        ))
                    ) : (
                        <div>없음</div>
                    )
                }
            </div>
        </div>
    )
}