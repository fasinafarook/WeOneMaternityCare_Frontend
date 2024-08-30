import { useState, useEffect } from 'react';
import { HiChartBar, HiQuestionMarkCircle } from "react-icons/hi";
import { GrTransaction } from "react-icons/gr";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { getPaymentDashboardDetails } from '../../api/serviceProviderAPI';
import WithdrawalModal from '../../components/common_pages/ProviderWithD';
import AppNavbar from "../../components/common_pages/ProviderHeader";
import Footer from "../../components/common_pages/Footer";

interface Transaction {
  date: string;
  user: {
    name: string;
  };
  fromTime: string;
  toTime: string;
  price: number;
}

// interface Wallet {
//   balance: number
// }

const PaymentsDashboard = () => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction []>([]);
  // const [wallet, setWallet] = useState<Wallet>() 
  const [walletBalance, setWalletBalance] = useState(0)
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const labels = transactionHistory.map(bookings => new Date(bookings.date).toLocaleDateString('en-IN', {day:'2-digit', month: 'short'}))
  const dataPoints = transactionHistory.map(bookings => bookings.price)

  const earningsData = {
    labels: labels,
    datasets: [
      {
        label: 'Earnings',
        data: dataPoints,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      }, 
    ],
  };


  useEffect(() => {
    
    const fetchDashboadDetails = async () => {
      const response = await getPaymentDashboardDetails()
      console.log('pamnt', response);
      
      setTransactionHistory(response.data.bookings)
      // setWallet(response.data.wallet)
      console.log('set', response.data.bookings);
      
      setWalletBalance(response.data.wallet.balance)
    }

    fetchDashboadDetails()
  }, [])

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactionHistory.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleWithdrawalClick = () => {
    setIsWithdrawalModalOpen(true);
  };
  const handleBalanceUpdate = (newBalance: number) => {
    setWalletBalance(newBalance);
  };

  return (

    <>
      <AppNavbar />
    <div className="bg-gray-100 min-h-screen">

<WithdrawalModal
      isOpen={isWithdrawalModalOpen}
      onClose={() => setIsWithdrawalModalOpen(false)}
      balance={walletBalance}
      onBalanceUpdate ={handleBalanceUpdate}
    />

      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Payments Dashboard
            </h1>
            <p className="text-gray-600">
              Track your earnings and manage your finances
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#19328F] to-[#2F76FF] shadow-lg rounded-lg p-8 mb-6 relative overflow-hidden">
  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
  
  <div className="relative z-10">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">Total Earnings</h2>
      <svg className="h-10 w-10 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div className="flex items-end justify-between">
      <div> 
        <p className="text-5xl font-bold text-white mb-2">₹{walletBalance}</p>
        <p className="text-sm font-medium text-indigo-100">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      <button 
        className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-md hover:shadow-lg"
        onClick={handleWithdrawalClick}
      >
        Withdraw
      </button>
    </div>
  </div>
  <div className="mt-8 pt-6 border-t border-indigo-400 border-opacity-30">
    <div className="flex justify-between items-center text-indigo-100">
      {/* <span className="text-sm">This month's earnings</span> */}
      {/* <span className="text-lg font-semibold">₹Add this month's earnings</span> */}
    </div>
  </div>
</div>


        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center ">
            <GrTransaction  className='h-6 w-6 text-[#19328F] mr-3'/>
            Transaction History</h2>
          {/* <input className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Search transactions..." /> */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white ">
              <thead className="bg-gray-100 ">
                <tr>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">user</th>
                  <th className="py-3 px-4 text-left">Slot</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString('en-IN', {month: 'long', day: "2-digit"})}</td>
                    <td className="py-3 px-4">{transaction.user.name.toUpperCase()} </td>
                    <td className="py-3 px-4">
                      {new Date(transaction.fromTime).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})} - 
                      {new Date(transaction.toTime).toLocaleTimeString('en-IN', {hour: '2-digit', minute: '2-digit'})}
                      </td> 
                     <td className="py-3 px-4 font-semibold text-green-500">₹{transaction.price}</td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>


                {/* Pagination */}
          <div className="flex justify-end mt-4">
            {Array.from({ length: Math.ceil(transactionHistory.length / itemsPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} rounded-md mr-2`}
              >
                {index + 1}
              </button>
            ))}
          </div>

        </div>


        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <HiChartBar   className="h-6 w-6 text-[#19328F] mr-2" />
            Performance Analytics
          </h2>
          <Line data={earningsData}  />
        </div>

        

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <HiQuestionMarkCircle  className="h-6 w-6 text-[#19328F] mr-2" />
            Support and FAQs
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">How do I withdraw funds?</h3>
              <p className="text-gray-600">Click on the 'Withdraw Funds' button in the dashboard and follow the instructions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Who do I contact for support?</h3>
              <p className="text-gray-600">Email <a href="mailto:support@example.com" className="text-[#19328F] hover:underline">support@materninty.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentsDashboard;