export default function Market ({ data } :any) {

    return (
        <div className="grid grid-cols-6 items-center justify-center border border-black m-1">
            <div className="col-span-1 flex items-center justify-center">{data.name}</div>
            <div className="col-span-5 flex items-center justify-center ">{data.price} $</div>
        </div>
    )
}
