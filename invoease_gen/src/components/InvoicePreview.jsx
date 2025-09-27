import { forwardRef } from "react";
import { formatInvoiceData } from "../util/formatInvoiceData";
import Template1 from "../templates/Template1/Template1";
import { templateComponents } from "../util/invoiceTemplate";

const InvoicePreview = forwardRef(({invoiceData, template}, ref) => {
    const formattedData = formatInvoiceData(invoiceData);

    const SelectedTemplate = templateComponents[template];

    return(
        <div ref={ref} className="invoice-preview container px-2 py-2 overflow-x-auto">
            <SelectedTemplate data={formattedData} />
        </div>
    );
});

export default InvoicePreview;