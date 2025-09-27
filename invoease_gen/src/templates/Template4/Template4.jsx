import React from 'react';
import './Template4.css';

const Template4 = ({ data }) => {
    const subtotal = data.items.reduce((acc, item) => acc + item.qty * item.amount, 0);
    const taxAmount = (subtotal * parseFloat(data.tax || 0)) / 100;
    const total = subtotal + taxAmount;

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="template4 border rounded mx-auto my-4 px-2 px-sm-4 py-3 template4-container">
            {/* Header Section */}
            <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
                <div className="w-100 w-md-50 mb-3 mb-md-0">
                    <h1 className="template4-heading">Invoice</h1>
                    <p className="mb-1"><strong>Invoice#:</strong> {data.invoiceNumber}</p>
                    <p className="mb-1"><strong>Invoice Date:</strong> {formatDate(data.invoiceDate)}</p>
                    <p className="mb-1"><strong>Due Date:</strong> {formatDate(data.paymentDate)}</p>
                </div>
                <div className="text-md-end w-100 w-md-50">
                    {data.companyLogo && (
                        <div className="mb-2">
                            <img
                                src={data.companyLogo}
                                alt="Company Logo"
                                width={98}
                            />
                        </div>
                    )}
                    <h2 className="h5 company-title">{data.companyName}</h2>
                    <p className="mb-1">{data.companyAddress}</p>
                    <p className="mb-1">{data.companyPhone}</p>
                </div>
            </div>

            {/* Billing Information Section */}
            <div className="d-flex flex-column flex-md-row gap-3 mb-4">
                {data.shippingName && data.shippingAddress && data.shippingPhone && <div className="p-3 rounded w-50 w-md-50 template4-bill-box">
                    <h5 className="template4-subheading">Shipped To</h5>
                    <p className="mb-1">{data.shippingName}</p>
                    <p className="mb-1">{data.shippingAddress}</p>
                    <p className="mb-1">{data.shippingPhone}</p>
                </div>}

                <div className="p-3 rounded w-50 w-md-50 template4-bill-box">
                    <h5 className="template4-subheading">Billed to</h5>
                    <p className="mb-1">{data.billingName}</p>
                    <p className="mb-1">{data.billingAddress}</p>
                    <p className="mb-1">{data.billingPhone}</p>
                </div>
            </div>

            {/* Invoice Items Table */}
            <div className="table-responsive mb-4">
                <table className="table table-bordered mb-0">
                    <thead>
                    <tr>
                        <th className="p-3 template4-table-header">Item #/Description</th>
                        <th className="p-3 text-center template4-table-header">Qty.</th>
                        <th className="p-3 text-center template4-table-header">Rate</th>
                        <th className="p-3 text-end template4-table-header">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.items.map((item, index) => (
                        <tr key={index}>
                            <td className="p-3">
                                <div className="fw-bold">{index + 1}. {item.name}</div>
                                <div className="text-muted">{item.description}</div>
                            </td>
                            <td className="p-3 text-center">{item.qty}</td>
                            <td className="p-3 text-center">{data.currencySymbol}{item.amount}</td>
                            <td className="p-3 text-end">{data.currencySymbol}{(item.qty * item.amount)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Totals Section */}
            <div className="d-flex justify-content-end mb-4">
                <div className="template4-total-box">
                    <div className="d-flex justify-content-between mb-2">
                        <span>Sub Total:</span>
                        <span>{data.currencySymbol}{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Tax ({data.tax}%):</span>
                        <span>{data.currencySymbol}{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold template4-total">
                        <span>Total:</span>
                        <span>{data.currencySymbol}{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Bank Account Details Section */}
            {(data.accountName || data.accountNumber || data.accountIfscCode) && (
                <div className="mt-4">
                    <h6 className="mb-2 template4-subheading fw-semibold">Bank Account Details</h6>
                    {data.accountName && <p className="mb-1"><strong>Account Holder:</strong> {data.accountName}</p>}
                    {data.accountNumber && <p className="mb-1"><strong>Account Number:</strong> {data.accountNumber}</p>}
                    {data.accountIfscCode && <p className="mb-0"><strong>IFSC / Branch Code:</strong> {data.accountIfscCode}</p>}
                </div>
            )}

            {/* Notes Section */}
            {data.notes && (
                <div className="pt-3 border-top mt-4">
                    <h5 className="template4-subheading">Note</h5>
                    <p>{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template4;
