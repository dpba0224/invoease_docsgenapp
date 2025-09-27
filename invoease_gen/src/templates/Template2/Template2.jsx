import './Template2.css'

const Template2 = ({data}) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return(
        <div className="template2 border rounded mx-auto my-4 px-sm-4 py-3 w-100">
            {/* Header section */}
            <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                    {data.businessLogo && (
                        <div className="mb-2">
                            <img src={data.businessLogo} alt="Company logo" width={90}/>
                        </div>
                    )}

                    <h2 className="mb-1 company-title2">{data.businessName}</h2>

                    <p className="mb-1">{data.businessAddress}</p>

                    <p className="mb-0">Contact number: {data.businessContact}</p>
                </div>

                <div className="col-md-6 text-start text-md-end">
                    <h1 className="mb-2 invoice-title2">Invoice</h1>

                    <div className="d-flex flex-column flex-md-row justify-content-md-end gap-2 gap-md-4">
                        <div className="w-100 w-md-50 mb-3 mb-md-0">
                            <p className="mb-1">
                                <strong>Invoice #:</strong> {data.invoiceNumber}
                            </p>

                            <p className="mb-1">
                                <strong>Invoice Date:</strong> {data.invoiceDate}
                            </p>

                            <p className="mb-1">
                                <strong>Invoice Due Date:</strong> {data.paymentDate}
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <hr className="my-3 red-border" />


            {/* Billing section */}
            <div className="row g-3 mb-4">
                {data.shippingName && data.shippingContact && data.shippingAddress && (
                    <div className="col-md-6">
                        <div className="p-3 rounded h-100 billing-box2">
                            <h3 className="mb-2 billing-title2">Shipped To:</h3>

                            <p className="mb-1">
                                <strong>{data.shippingName}</strong>
                            </p>

                            <p className="mb-1">{data.shippingAddress}</p>

                            <p className="mb-0">Phone: {data.shippingContact}</p>
                        </div>
                    </div>
                )}

                <div className="col-md-6">
                    <div className="p-3 rounded h-100 billing-box2">
                        <h3 className="mb-2 billing-title2">Billed to:</h3>

                        <p className="mb-1">
                            <strong>{data.billingName}</strong>
                        </p>

                        <p className="mb-1">{data.billingAddress}</p>

                        <p className="mb-0">Contact No.: {data.billingContact}</p>
                    </div>
                </div>
            </div>


            {/* Items section */}
            <div className="mb-4">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className='p-2 table-header2'>Item No./Item Description</th>
                                <th className='p-2 text-center table-header2'>Qty.</th>
                                <th className='p-2 text-end table-header2'>Rate</th>
                                <th className='p-2 text-end table-header2'>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2 text-center">{item.qty}</td>
                                    <td className="p-2 text-end">Php {formatCurrency(item.amount)}</td>
                                    <td className="p-2 text-end">Php {formatCurrency(item.qty * item.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            {/* Totals section */}
            <div className="mb-4">
                <div className="d-flex justify-content-end">
                    <div className="p-3 w-100 totals-box2" style={{maxWidth : "300px"}}>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal: </span>
                            <span> ₱ {data.subtotal.toFixed(2)}</span>
                        </div>

                        {data.tax > 0 && (
                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax ({data.tax}%):</span>
                                <span> ₱ {data.taxAmount.toFixed(2)}</span>
                            </div>
                        )}

                        <div className="d-flex justify-content-between fw-bold total-highlight2">
                            <span>Total :</span>
                            <span> ₱ {data.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Bank account section */}
            {(data.accountName || data.accountNumber || data.accountCode) && (
                <div className="mt-4">
                <h3 className="mb-2 billing-title2">Bank Account Details</h3>
                {data.accountName && (
                    <p className="mb-1">
                    <strong>Account Holder:</strong> {data.accountName}
                    </p>
                )}
                {data.accountNumber && (
                    <p className="mb-1">
                    <strong>Account Number:</strong> {data.accountNumber}
                    </p>
                )}
                {data.accountCode && (
                    <p className="mb-0">
                    <strong>Account Code:</strong> {data.accountCode}
                    </p>
                )}
                </div>
            )}



            {/* Notes section */}
            {data.notes && (
                <div className="mt-4">
                    <h3 className="mb-2 billing-title2">
                        Remarks:
                    </h3>
                    <p className="mb-0">
                        {data.notes}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Template2;