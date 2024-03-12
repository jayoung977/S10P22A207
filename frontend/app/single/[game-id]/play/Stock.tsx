export default function Stock ({ id, data, isSelected,isHovered, onClick } :any) {
    const style = isSelected ? { backgroundColor:'blue', color: 'white' } : {};
    // console.log(data);
    return (
        <div 
            className="row-span-1 grid grid-cols-8 items-center justify-center border border-black m-1" 
            style={style} 
            onClick={onClick}>
            <div className="col-span-1 flex items-center justify-center">{id+1}.</div>
            <div className="col-span-2 flex items-center justify-center">{data.종목명}</div>
            <div className="col-span-2 flex items-center justify-center">{data.얼마올랐니}%</div>
            <div className="col-span-3 flex items-center justify-center">{data.얼마니}</div>
        </div>
    )
}