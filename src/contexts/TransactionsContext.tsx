import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction{
    id: number,
    description: string,
    type: 'income' | 'outcome',
    category: string,
    price: number,
    createdAt: string
}

interface CreateTransactionInput{
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}

interface TransactionsContextType{
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>,
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps{
    children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}: TransactionProviderProps){

    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    async function fetchTransactions(query?:string){
        const response = await api.get("/transactions", {
        params:{
            _sort: 'createdAt',
            _order: 'asc',
            description: query
        }
        })

        setTransactions(response.data)
    }

    async function createTransaction(data: CreateTransactionInput){
        const {description, type, category, price} = data
        const response = await api.post("/transactions", {
            description,
            type,
            category,
            price,
            createdAt: new Date()
        })

        setTransactions(state => [response.data, ...state])
    }

    useEffect(() => {
        fetchTransactions()
    },[])

    return(
        <TransactionsContext.Provider value={{transactions, fetchTransactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}