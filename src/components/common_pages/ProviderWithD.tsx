import React, { useState } from "react";
import { updateWallet } from "../../api/serviceProviderAPI";
import toast from "react-hot-toast";

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onBalanceUpdate: (num: number) => void;
}

const WithdrawalModal: React.FC<Iprops> = ({ isOpen, onClose, balance, onBalanceUpdate }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleWithdrawal = async () => {
    if (amount) {
      if (Number(amount) > balance) {
        toast.error("Invalid amount");
        return;
      }

      setLoading(true);
      try {
        const response = await updateWallet(Number(amount));
        console.log('Response from wallet: ', response);
        onBalanceUpdate(response.data.balance);
        toast.success("Withdrawal successful");
        setAmount('');
        onClose();
      } catch (error) {
        toast.error("Withdrawal failed");
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 z-50 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center" onClick={onClose}>
      <div className="relative bg-white p-5 rounded-lg shadow-xl max-w-md w-full m-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
        <p className="mb-4">Available balance: ₹{balance}</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleWithdrawal}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Confirm Withdrawal'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;