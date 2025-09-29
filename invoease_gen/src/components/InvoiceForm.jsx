import { useContext, useEffect } from "react";
import { assets } from "../assets/assets.js";
import { Trash2 } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

const InvoiceForm = () => {
    const {invoiceData, setInvoiceData} = useContext(AppContext);

    const addItem = () => {
        setInvoiceData((previous) => ({
            ...previous,
            items: [
                ...previous.items,
                {
                    name: "",
                    qty: "",
                    amount: "",
                    description: "",
                    total: 0
                },
            ]
        }))
    }

    const deleteItem = (index) => {
       const items =  invoiceData.items.filter((_, i) => i !== index);
       setInvoiceData((previous) => ({...previous, items}));
    }

    const handleChange = (section, field, value) => {
        setInvoiceData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleSameAsBilling = () => {
        setInvoiceData((prev) => ({
            ...prev,
            shipping : {...prev.billing}
        }))
    }

    const handleItemChange = (index, field, value) => {
        const items = [...invoiceData.items];
        items[index][field] = value;

        if(field === "qty" || field === "amount"){
            items[index].total = (items[index].qty || 0) * (items[index].amount || 0);
        }

        setInvoiceData((previous) => ({...previous, items}));
    }


    const calculateTotals = () => {
        const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.total || 0), 0);
        const taxRate = Number(invoiceData.tax || 0);
        const taxAmount = (subtotal * taxRate) / 100;
        const grandTotal = subtotal + taxAmount;
        return {subtotal, taxAmount, grandTotal};
    }

    const {subtotal, taxAmount, grandTotal} = calculateTotals();

    const handleUploadLogo = (e) => {
        const file = e.target.files[0];

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData((previous) => ({
                    ...previous,
                    logo: reader.result
                }))
            };

            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        if(!invoiceData.invoice.number){
            const randomNumber = `IE-${Math.floor(100000 + Math.random() * 900000)}`;
            setInvoiceData((previous)  => ({
                ...previous,
                invoice: {...previous.invoice, number: randomNumber},
            }))
        }
    }, []);

    

    return(
        <div className="invoiceform container py-4">

            {/* Business logo */}
            <div className="mb-4">
                <h5>Business Logo</h5>

                <div className="d-flex align-items-center gap-3">
                    <label htmlFor="image" className="form-label">
                        <img src={invoiceData.logo ? invoiceData.logo : assets.upload_area} alt="upload" width={120} style={{ cursor: "pointer" }}/>
                    </label>

                    <input type="file" name="logo" id="image" hidden 
                        className="form-control" accept="image/*" onChange={handleUploadLogo}/>
                </div>
            </div>


            {/* Business information */}
            <div className="mb-4">
                <h5>Your Business:</h5>

                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Business Name" 
                            onChange={(e) => handleChange("business", "name", e.target.value)} value={invoiceData.business.name}/>
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Business Contact Number" 
                            onChange={(e) => handleChange("business", "contact", e.target.value)} value={invoiceData.business.contact}/>
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Business Address"
                            onChange={(e) => handleChange("business", "address", e.target.value)} value={invoiceData.business.address}/>
                    </div>
                </div>
            </div>


            {/* Billing section */}
            <div className="mb-4">
                <h5>Bill To:</h5>

                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"
                            onChange={(e) => handleChange("billing", "name", e.target.value)} value={invoiceData.billing.name}/>
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Contact Number"
                            onChange={(e) => handleChange("billing", "contact", e.target.value)} value={invoiceData.billing.contact}/>
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Address"
                            onChange={(e) => handleChange("billing", "address", e.target.value)} value={invoiceData.billing.address}/>
                    </div>
                </div>
            </div>


            {/* Ship to section */}
            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5>Ship To:</h5>
                
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="sameAsBilling" onChange={handleSameAsBilling}/>

                        <label htmlFor="sameAsBilling" className="form-check-label" style={{paddingLeft: "10px"}}>
                            Same as Billing Address
                        </label>
                    </div>
                </div>
                
                <div className="row g-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Name"
                            value={invoiceData.shipping.name} onChange={(e) => handleChange("shipping", "name", e.target.value)} />
                    </div>

                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Contact Number"
                            value={invoiceData.shipping.contact} onChange={(e) => handleChange("shipping", "contact", e.target.value)} />
                    </div>

                    <div className="col-md-12">
                        <input type="text" className="form-control" placeholder="Shipping Address"
                           value={invoiceData.shipping.address} onChange={(e) => handleChange("shipping", "address", e.target.value)} />
                    </div>
                </div>
            </div>


            {/* Invoice information */}
            <div className="mb-4">
                <h5>Invoice Information:</h5>

                <div className="row g-3">
                    <div className="col-md-4">
                        <label htmlFor="invoiceNumber" className="form-label">Invoice Number</label>
                        <input type="text" disabled className="form-control"  id="invoiceNumber"
                            value={invoiceData.invoice.number} onChange={(e) => handleChange("invoice", "number", e.target.value)}/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="invoiceDate" className="form-label">Invoice Date</label>
                        <input type="date" className="form-control" id="invoiceDate"
                            value={invoiceData.invoice.date} onChange={(e) => handleChange("invoice", "date", e.target.value)}/>
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="invoiceDueDate" className="form-label">Invoice Due Date</label>
                        <input type="date" className="form-control" id="invoiceDueDate"
                            value={invoiceData.invoice.dueDate} onChange={(e) => handleChange("invoice", "dueDate", e.target.value)}/>
                    </div>
                </div>
            </div>


            {/* Details for the item */}
            <div className="mb-4">
                <h5>Item Details</h5>

                {invoiceData.items.map((item, index) => (
                    <div className="card p-3 mb-3" key={index}>
                        <div className="row g-3 mb-2">
                            <div className="col-md-3">
                                <input type="text" className="form-control" placeholder="Item Name"
                                    value = {item.name} onChange={(e) => handleItemChange(index, "name", e.target.value)}/>
                            </div>

                            <div className="col-md-3">
                                <input type="number" className="form-control" placeholder="Quantity"
                                    value = {item.qty} onChange={(e) => handleItemChange(index, "qty", e.target.value)}/>
                            </div>

                            <div className="col-md-3">
                                <input type="number" className="form-control" placeholder="Amount"
                                    value = {item.amount} onChange={(e) => handleItemChange(index, "amount", e.target.value)}/>
                            </div>

                            <div className="col-md-3">
                                <input type="number" className="form-control" placeholder="Total"
                                    value = {item.total} disabled/>
                            </div>
                        </div>

                        <div className="d-flex gap-2">
                            <textarea className="form-control" placeholder="Description"
                                value = {item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)}>
                            </textarea>
                            {invoiceData.items.length > 1 && (
                                <button className="btn btn-outline-danger" type="button" onClick={() => deleteItem(index)}>
                                    <Trash2 size={18}/>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                
                <button className="btn btn-primary" type="button" onClick={addItem}>Add Item</button>
            </div>


            {/* Bank account section */}
            <div className="mb-4">
                <h5>Bank Account Details:</h5>

                <div className="row g-3">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Account Name"
                            value = {invoiceData.account.name} onChange={(e) => handleChange("account", "name", e.target.value)}/>
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Account Number"
                            value = {invoiceData.account.number} onChange={(e) => handleChange("account", "number", e.target.value)}/>
                    </div>

                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Code (If Applicable)"
                            value = {invoiceData.account.code} onChange={(e) => handleChange("account", "code", e.target.value)}/>
                    </div>
                </div>
            </div>


            {/* Totals */}
            <div className="mb-4">
                <h5>Totals</h5>
                <div className="d-flex justify-content-end">
                    <div className="w-100 w-md-50">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>Php {subtotal.toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center my-2">
                            <label htmlFor="taxInput" className="me-2">Tax Rate (%)</label>
                            <input type="number" id="taxInput" className="form-control w-50 text-end" placeholder="2" 
                                value = {invoiceData.tax} onChange={(e) => setInvoiceData((previous) => ({...previous, tax : e.target.value}))}/>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span>Tax amount</span>
                            <span>Php {taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2">
                            <span>Grand Total</span>
                            <span>Php {grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Notes */}
            <div className="mb-4">
                <h5>Notes:</h5>

                <div className="w-100">
                    <textarea name="notes" className="form-control" rows={3}
                        value={invoiceData.notes} onChange={(e) => setInvoiceData((previous) => ({...previous, notes: e.target.value}))}>
                    </textarea>
                </div>
            </div>

            
        </div>
    );
}

export default InvoiceForm;