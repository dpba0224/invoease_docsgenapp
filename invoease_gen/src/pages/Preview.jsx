import { useContext, useRef } from "react";
import { templates } from "../assets/assets.js";
import { AppContext } from '../context/AppContext';
import InvoicePreview from "../components/InvoicePreview.jsx";

const Preview = () => {
    const previewRef = useRef();
    const {selectedTemplate, setSelectedTemplate, invoiceData} = useContext(AppContext);

    return(
        <div className="previewpage container-fluid d-flex flex-column p-3 min-vh-100">

            {/* Adding action buttons */}
            <div className="d-flex flex-column align-items-center mb-4 gap-3">

                {/* Template buttons list */}
                <div className="d-flex gap-2 flex-wrap justify-content-center">
                    {templates.map(({id, label}) => (
                        <button key={id} 
                            className={`btn btn-sm rounded-pill p-2 ${selectedTemplate === id ? 'btn-warning' : 'btn-outline-secondary'}`}
                            style={{minWidth: "100px", height: "38px"}}
                            onClick={() => setSelectedTemplate(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Action buttons list */}
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary d-flex align-items-center justify-content-center">Save and Exit</button>
                    <button className="btn btn-success d-flex align-items-center justify-content-center">Download to PDF</button>
                    <button className="btn btn-info">Send to Email</button>
                    <button className="btn btn-danger">Delete</button>
                    <button className="btn btn-secondary">Back to Dashboard</button>
                </div>
            </div>


            {/* For PDF Preview */}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">

                {/* Used for printing purpose; Passed to the parent component */}
                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate}/>
                </div>

            </div>
        </div>
    );
}

export default Preview;