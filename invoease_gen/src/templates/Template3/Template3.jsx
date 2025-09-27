import React from 'react';
import './Template3.css';

const Template3 = ({ data }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className="template3 container border p-4 mt-4 template3-wrapper">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start">
                <h2 className="fw-bold text-success">Invoice</h2>
                <div className="text-end w-50">
                    {data.businessLogo && (
                        <div className="mb-2">
                            <img
                                src={data.businessLogo}
                                alt="Company Logo"
                                width={98}
                            />
                        </div>
                    )}
                    <h6 className="fw-bold company-title">{data?.businessName}</h6>
                    <p className="mb-0">{data?.businessAddress}</p>
                    <p className="mb-0">{data?.businessContact}</p>
                </div>
            </div>

            {/* Client and Invoice Info */}
            <div className="row mt-4">
                <div className="col-md-6">
                    <h6 className="text-success fw-semibold">Billed To</h6>
                    <p className="mb-0 fw-bold">{data?.billingName}</p>
                    <p className="mb-0">{data?.billingAddress}</p>
                    <p className="mb-0">{data?.billingContact}</p>
                </div>
                <div className="col-md-6 text-md-end">
                    <h6 className="text-success fw-semibold">Invoice Details</h6>
                    <p className="mb-0"><strong>Invoice #:</strong> {data?.invoiceNumber}</p>
                    <p className="mb-0"><strong>Invoice Date:</strong> {data?.invoiceDate}</p>
                    <p className="mb-0"><strong>Due Date:</strong> {data?.paymentDate}</p>
                </div>
            </div>

            {/* Items Table */}
            <div className="table-responsive mt-4">
                <table className="table table-bordered" aria-label="Invoice Items Table">
                    <thead className="bg-success text-white">
                    <tr>
                        <th className="col template3-table-header">Item Description</th>
                        <th className="col template3-table-header">Qty</th>
                        <th className="col template3-table-header">Rate</th>
                        <th className="col template3-table-header">Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.items?.map((item, index) => (
                        <tr key={index} className={index % 2 !== 0 ? 'table-light' : ''}>
                            <td>{item.name}</td>
                            <td>{item.qty}</td>
                            <td>{formatCurrency(item.amount)}</td>
                            <td>{formatCurrency(item.qty * item.amount)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Summary */}
            <div className="d-flex justify-content-end mt-3">
                <div className="text-end">
                    <p className="mb-1"><strong>Sub Total:</strong> {formatCurrency(data?.subtotal || 0)}</p>
                    <p className="mb-1"><strong>Tax ({data?.tax || 0}%):</strong> {formatCurrency(data?.taxAmount || 0)}</p>
                    <p className="fw-bold text-success fs-5">Total Due: {formatCurrency(data?.total || 0)}</p>
                </div>
            </div>

            {/* Bank Account Details Section */}
            {(data.accountName || data.accountNumber || data.accountCode) && (
                <div className="mt-4">
                    <h6 className="mb-2 text-success fw-semibold">Bank Account Details</h6>
                    {data.accountName && <p className="mb-1"><strong>Account Holder:</strong> {data.accountName}</p>}
                    {data.accountNumber && <p className="mb-1"><strong>Account Number:</strong> {data.accountNumber}</p>}
                    {data.accountCode && <p className="mb-0"><strong>Account Code:</strong> {data.accountCode}</p>}
                </div>
            )}

            {/* Notes */}
            {data?.notes && (
                <div className="mt-4 p-3 notes-section">
                    <h6 className="text-success fw-semibold">Additional Notes</h6>
                    <p className="mb-0">{data.notes}</p>
                </div>
            )}
        </div>
    );
};

export default Template3;
