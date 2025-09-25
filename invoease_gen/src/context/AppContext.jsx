import {createContext, useState} from "react";

export const AppContext = createContext();

export const initialInvoiceData = {
    title: "New Invoice",
    billing: {
        name: "",
        contact: "",
        address: ""
    },
    shipping: {
        name: "",
        contact: "",
        address: ""
    },
    invoice: {
        number: "",
        date: "",
        dueDate: ""
    },
    account: {
        name: "",
        number: "",
        code: ""
    },
    business:{
        name: "",
        contact: "",
        address: ""
    },
    tax: 0,
    notes: "",
    items: [
        {
            name: "",
            qty: "",
            amount: "",
            description: "",
            total: 0
        }
    ],
    logo: ""
}

export const AppContextProvider = ({children}) => {

    const [invoiceTitle, setInvoiceTitle] = useState("New Invoice");
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [selectedTempate, setSelectedTemplate] = useState("template1");

    const contextValue = {
        invoiceTitle, setInvoiceTitle,
        invoiceData, setInvoiceData,
        selectedTempate, setSelectedTemplate,
        initialInvoiceData,
    }

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}