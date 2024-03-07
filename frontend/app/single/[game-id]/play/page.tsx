// navbar
import Navbar from '@/app/Navbar';

// left 
import TotalAssets from './TotalAssets';
import AssetsHeld from './AssetsHeld'; 
import SalesHistory from './SalesHistory';
// middle
import Chart from './Chart';
import StockMarket from './StockMarket';
// right
import TurnInfo from './TurnInfo';
import StockList from './StockList';
import MarketAndTrends from './MarketAndTrends';

export default function SinglePlay () {
    return (
        <div className="grid grid-rows-12 h-screen border-separate" style={{ borderCollapse: 'separate' }}>
            {/* navbar */}
            <Navbar />
            <div className="row-start-2 row-end-13 grid grid-cols-12 border border-black">
                {/* left aside */}
                <aside className="col-start-1 col-end-4 grid grid-rows-3 border border-black">
                    <TotalAssets />
                    <AssetsHeld />
                    <SalesHistory />
                </aside>
                {/* main */}
                <main className="col-start-4 col-end-10 grid grid-rows-12 border border-black">
                    <Chart />
                    <StockMarket />
                </main>
                {/* right aside */}
                <aside className="col-start-10 col-end-13 grid grid-rows-6 border border-black">
                    <TurnInfo />
                    <StockList />
                    <MarketAndTrends />
                </aside>
            </div>
        </div>
    )
}