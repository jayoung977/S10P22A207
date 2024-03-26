export default function Trend ({ rank, data } :any) {

    return (
        <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
            <div className="col-span-1 text-center text-textColor-2">{rank}.</div>
            <div className="col-span-5 text-start text-textColor-2">{data.트렌드}</div>
        </div>
    )
}