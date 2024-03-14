export default function Market ({ data } :any) {

    return (
        <div className="grid grid-cols-6 items-center justify-center bg-small-9 rounded-xl m-1">
            <div className="col-span-1 flex items-center justify-center text-textColor-2">{data.name}</div>
            <div className="col-span-5 flex items-center justify-center text-textColor-2">{data.price} $</div>
        </div>
    )
}
