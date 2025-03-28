import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const AtmContext = createContext();

export const AtmProvider = ({children})=>{
    const [balance,setBalance] = useState(0);
    const [transactions,setTransactions] = useState([])
    const [loading,setLoading] = useState(false);
    const [isDepositLoading,setIsDepositLoading] = useState(false);
    const [isWithdrawLoading,setIsWithdrawLoading] = useState(false);

    // deposit money
    async function depositMoney(amount){
        if(amount<=0){
            toast.error("Amount must be greater than zero.")
            return;
        }
        setIsDepositLoading(true);
        try {
            const { data } = await axios.post('/api/atm/deposit',{amount});
            fetchTransactionHistory();
            setBalance(data.balance);
            toast.success(data.message);
            setIsDepositLoading(false);
        } catch (error) {
            toast.error(error.response.data.message)
            setIsDepositLoading(false);            
        }
    }

    // withdraw money
    async function withdrawMoney(amount){
        if(amount<=0){
            toast.error("Amount must be greater than zero.")
            return;
        }
        setIsWithdrawLoading(true);
        try {
            const { data } = await axios.post('/api/atm/withdraw',{amount});
            setBalance(data.balance);
            toast.success(data.message);
            fetchTransactionHistory();
            setIsWithdrawLoading(false);           
        } catch (error) {
            toast.error(error.response.data.message)
            setIsWithdrawLoading(false);                        
        }
    }

    // check balance
    async function checkBalance(){
        setLoading(true);
        try {
            const { data } = await axios.get('/api/atm/check-balance');
            setBalance(data.balance);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
            
        }
    }

    // transfer money
    async function transferMoney(targetMobileNumber,amount){
        if(amount<=0){
            toast.error("Amount must be greater than zero.")
            return;
        } 
        setLoading(true);
        try {
            const { data } = await axios.post('/api/atm/transfer',{targetMobileNumber,amount})
            setBalance(data.sourceBalance);
            toast.success(data.message);
            fetchTransactionHistory();
            setLoading(false);            
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
        }       
    }


    // fetchTransaction history
    async function fetchTransactionHistory() {
        setLoading(true)
        try {
            const { data } = await axios.get('/api/atm/get-trans')
            setTransactions(data.transactions)
            setLoading(false);            
        } catch (error) {
            setLoading(false);            
        }        
    }

    // delete transaction
    const deleteTransactionHistory = async (transactionId, deleteAll) => {
        setLoading(true);
        try {
          const { data } = await axios.post('/api/atm/delete_transaction_history', { transactionId, deleteAll });
          if (deleteAll) {
            setTransactions([]);
            setLoading(false);
          } else {
            setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction._id !== transactionId)); 
            setLoading(false);
          }
          toast.success(data.message);
          setLoading(false);
        } catch (error) {
          toast.error(error.response.data.message);
        } 
    }

    

    // useEffect(()=>{
    //     fetchTransactionHistory()
    // },[])

    return(
        <AtmContext.Provider value={{balance,transactions,loading,depositMoney,withdrawMoney,fetchTransactionHistory,checkBalance,transferMoney,deleteTransactionHistory,isDepositLoading,isWithdrawLoading}}>
            {children}
        </AtmContext.Provider>
    )

}

export const AtmData = () => useContext(AtmContext);