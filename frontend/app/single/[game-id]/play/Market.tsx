export default function Market ({ data } :any) {

    return (
        <div className="grid grid-cols-6 items-center justify-center border border-black m-1">
            <div className="col-span-1 flex items-center justify-center">{data.정보}</div>
            <div className="col-span-5 flex items-center justify-center ">{data.가격} $</div>
        </div>
    )
}
