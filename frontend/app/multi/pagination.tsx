import multigameStore from "@/public/src/stores/multi/MultiGameStore";

export default function Pagination(){
  const { pageNumber, setPageNumber } = multigameStore();
  const pages:number[] = [1,2,3,4,5];
  return(
    <div className='mt-2'>
      <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <a onClick={()=> {
            const newPage = Math.max(pageNumber - 1, 1)
            setPageNumber(newPage)
            }} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
          {
            pages.map((page :number, i :number)=> (
              <a onClick={()=>{
                setPageNumber(page)
                }} 
                key={i} 
                className = {`flex items-center justify-center px-3 h-8 leading-tight ${
                  pageNumber === page
                    ? 'bg-gray-700 text-white'
                    : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                } hover:cursor-pointer`}>
                {page}
              </a>
            ))
          }
        <li>
        </li>
        <li>
          <a onClick={()=> {
            const newPage = Math.min(pageNumber + 1, Math.max(...pages))
            setPageNumber(newPage)
            }} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    </div>
  )
}