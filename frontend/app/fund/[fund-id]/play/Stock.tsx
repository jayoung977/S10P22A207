export default function Stock ({ id, data, isSelected, onClick } :any) {
    const bgColor = isSelected ? 'small-1' : 'small-14';
    const textColor = isSelected ? 'textColor-2' : 'textColor-1'
    return (
        <div 
            className={`row-span-1 grid grid-cols-8 items-center justify-center rounded-full bg-${bgColor} text-${textColor} hover:bg-small-1 hover:text-textColor-2 active:bg-small-11 active:text-textColor-2 m-1`} 
            onClick={onClick}
        >
            <div className="col-span-1 flex items-center justify-center">{id+1}.</div>
            <div className="col-span-2 flex items-center justify-center">{data.name}</div>
            <div className="col-span-2 flex items-center justify-center">{data.riseRate}%</div>
            <div className="col-span-3 flex items-center justify-center">{data.price}</div>
        </div>
    )
}