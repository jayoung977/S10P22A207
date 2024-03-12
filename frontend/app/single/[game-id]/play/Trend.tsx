export default function Trend ({ rank, data } :any) {

    return (
        <div className="grid grid-cols-6 items-center justify-center border border-black m-1">
            <div className="col-span-1 flex items-center justify-center">{rank}.</div>
            <div className="col-span-5 flex items-center justify-start ">{data.트렌드}</div>
        </div>
    )
}