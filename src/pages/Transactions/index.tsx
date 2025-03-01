import { useContext } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions(){

    const {transactions} = useContext(TransactionsContext)

    return(
        <>
            <Header/>
            <Summary/>

            <TransactionsContainer>
                <SearchForm/>
                <TransactionsTable>
                    <tbody>
                        {transactions.map(({id, description, type, category, price, createdAt}) => (
                            <tr key={id}>
                                <td width="50%">{description}</td>
                                <td>
                                    <PriceHighLight variant={type}>
                                        {type == 'outcome' && '- '}
                                        {priceFormatter.format(price)}
                                    </PriceHighLight>
                                </td>
                                <td>{category}</td>
                                <td>{dateFormatter.format(new Date(createdAt))}</td>
                            </tr>
                        ))}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </>
    )
}