import { createContext, useEffect, useState } from "react";

// Creating the CoinContext with the createContext hook
export const CoinContext = createContext();

const CoinContextProvider = (props)=>{

    // We initialize this state with an empty array,
    // Because, we get the data from API in the form of an array.
    // Then we store that array in the state variable 'allCoin'
    const [allCoin, setAllCoin] = useState([]);

    // We initialize this state with an object
    const [currency, setCurrency] = useState({
        name: 'usd',
        symbol: '$'
    });

    // Fetching data from the API
    const fetchAllCoin = async ()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-zbKwBYfsTkWoATeJGwfE4Vm7'}
          };
          
        //   fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options)

          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            // .then(response => console.log(response))
            .then(response => setAllCoin(response)) // Insted of printing the response, we set the response into the allCoin state variable
            .catch(err => console.error(err));
    }

    // Executing the 'fetchAllCoin' function whenever the component get loaded
    useEffect(()=>{
        // Calls the function and fetches data
        fetchAllCoin();
    },[currency])

    const contextValue = {
        allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;

