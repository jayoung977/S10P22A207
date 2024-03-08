export default function BoardList () {

    return (
        <div className="row-span-11 grid grid-rows-11">
            <div className="row-span-1 flex items-center justify-center">짧글, 노가리, 정보공유</div>
            <div className="row-span-10 grid grid-cols-12 border border-black">
                <div className="col-start-3 col-end-11 grid grid-cols-12 border border-black rounded-lg m-5">
                    <div className="col-start-3 col-end-11 grid grid-cols-12 border border-black rounded-md ">
                        <div className="col-start-2 col-end-10 border border-black rounded-lg m-2">
                            게시글 입력 공간
                        </div>
                        <div className="col-start-11 col-end-13 grid grid-rows-5">
                            <button className="row-start-2 row-end-3 border border-black mr-1">이미지 첨부</button>
                            <button className="row-start-4 row-end-5 border border-black mr-1">게시글 작성</button>
                        </div>
                    </div>
                    <div className="col-start-2 col-end-10 border border-black rounded-md bg-yellow-100 m-2 w-200 h-100">글 말풍선</div>                
                    <div className="col-start-4 col-end-12 border border-black rounded-md bg-orange-200 m-2 w-200 h-100">글 말풍선</div>
                    <div className="col-start-2 col-end-10 border border-black rounded-md bg-yellow-100 m-2 w-200 h-100">글 말풍선</div>                
                </div>
            </div>

        </div>
    )
}