export default function Market ({ data } :any) {

    return (
        <div className="grid grid-cols-6 bg-small-9 rounded-xl m-1">
            <div className="col-span-2  text-center  text-textColor-2">{data.name}</div>
            <div className="col-span-4 text-center  text-textColor-2">{data.price} $</div>
        </div>
    )
}
