import Navbar from "@/app/Navbar"
import FundMainComponent from "../FundMainComponent"
import FundTabs from "../fundTabs"
import FundTable from "./fundTable"

export default function Page(){
  return (
    <div className='relative bg-background-1'>
      <div className="grid grid-rows-12 h-screen border-separate">
        <Navbar/>
        <div className='bg-big-1 p-2 rounded-md row-span-11 grid grid-rows-12 gap-2 mx-auto xl:max-w-screen-xl'>
         <FundMainComponent/>
          <FundTabs/>
          <main className='row-span-7'>
            <FundTable/>
          </main>
        </div>
      </div>
    </div>
  )
}