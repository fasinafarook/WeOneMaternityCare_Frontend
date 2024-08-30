import { useState, useEffect } from 'react';

import 'chart.js/auto';
import { getPaymentDashboardDetails } from '../../api/userAPI';
import Footer from '../../components/common_pages/Footer';
import UserNavbar from '../../components/common_pages/UserHeader';

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

const Wallet = () => {
  const [transactionHistory, setTransactionHistory] = useState<Transaction []>([]);
  // const [wallet, setWallet] = useState<Wallet>() 
  const [walletBalance, setWalletBalance] = useState(0)

  

  
  

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

 
  

 
  return (
    <>
            <UserNavbar />
    <div className="bg-gray-100 min-h-screen">


      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              wallet
            </h1>
            
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#19328F] to-[#2F76FF] shadow-lg rounded-lg p-8 mb-6 relative overflow-hidden">
  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
  
  <div className="relative z-10">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-white">Total Balance</h2>
      <svg className="h-10 w-10 text-white opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div className="flex items-end justify-between">
      <div> 
        <p className="text-5xl font-bold text-white mb-2">₹{walletBalance}</p>
        <p className="text-sm font-medium text-indigo-100">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
      
    </div>
  </div>
  <div className="mt-8 pt-6 border-t border-indigo-400 border-opacity-30">
    <div className="flex justify-between items-center text-indigo-100">
      {/* <span className="text-sm">This month's earnings</span> */}
      {/* <span className="text-lg font-semibold">₹Add this month's earnings</span> */}
    </div>
  </div>
</div>

      </div>
      <Footer />
            </div>
        </>
  );
};

export default Wallet;