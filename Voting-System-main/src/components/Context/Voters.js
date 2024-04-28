import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
let SymbolContext = createContext();

const Symbols = ({ children }) => {
  let [symbols, setSymbols] = useState([]);
  async function getsymbols() {
    // console.log("Context Hook Function RUn!");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_server}/getsymbols`,
        { withCredentials: true }
      );
      if (data.success) {
        // console.log("user detail is :", data);
        let result = data.symbols;
        setSymbols([...result]);
      } else {
        console.log(data);
      }
    } catch (error) {
      //   setSymbols((prev) => {
      //     return { ...prev, user: false, success: false };
      //   });
      //   console.log(error);
    }
  }
  useEffect(() => {
    getsymbols();
  }, []);
  return (
    <SymbolContext.Provider value={[symbols]}>
      {children}
    </SymbolContext.Provider>
  );
};

export default Symbols;
let useSymbols = () => useContext(SymbolContext);

export { useSymbols };
