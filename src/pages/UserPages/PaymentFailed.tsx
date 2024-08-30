import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentFailed = () => {
  return (
    <div className="bg-gradient-to-br  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg viewBox="0 0 24 24" className="text-red-500 w-24 h-24 mx-auto mb-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Zm3.707-13.707a1,1,0,0,1,0,1.414l-1.293,1.293,1.293,1.293a1,1,0,0,1-1.414,1.414L13,12.414l-1.293,1.293a1,1,0,0,1-1.414-1.414l1.293-1.293L10.293,9.707a1,1,0,0,1,1.414-1.414L13,9.586l1.293-1.293a1,1,0,0,1,1.414,1.414Z">
            </path>
          </svg>
        </motion.div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h3>
        <p className="text-gray-600 mb-6">We're sorry, but your payment could not be processed at this time. Please try again or contact support for assistance.</p>
        <p className="text-red-600 font-semibold mb-8">Don't worry, no charges have been made to your account.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* <Link 
              to="/payment" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:shadow-lg"
            >
              Try Again
            </Link> */}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/user/home" 
              className="inline-block px-8 py-3 bg-gray-200 text-gray-800 font-bold rounded-full transition duration-300 ease-in-out transform hover:shadow-lg"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentFailed;