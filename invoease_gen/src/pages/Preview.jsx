import { useContext, useRef, useState } from "react";
import { templates } from "../assets/assets.js";
import { AppContext } from '../context/AppContext';
import InvoicePreview from "../components/InvoicePreview.jsx";
import { saveInvoice, deleteInvoice, sendInvoice } from "../service/invoiceService.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { uploadInvoiceThumbnail } from "../service/cloudinaryService";
import html2canvas from "html2canvas";
import { generatePdfFromElement } from "../util/pdfUtils.js";

const Preview = () => {
    const previewRef = useRef();
    const {selectedTemplate, setSelectedTemplate, invoiceData, baseURL} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [customerEmail, setCustomerEmail] = useState("");
    const [emailing, setEmailing] = useState(false);
    const navigate = useNavigate();

    const handleSaveAndExit = async () => {
        try{
            setLoading(true);

            // Create thumbnail url
            const canvas = await html2canvas(previewRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#fff",
                scrollY: -window.scrollY
            });
            const imageData = canvas.toDataURL("image/png");
            const thumbnailUrl = await uploadInvoiceThumbnail(imageData);

            const payload = {
                ...invoiceData,
                thumbnailUrl,
                template: selectedTemplate,
            }

            const response = await saveInvoice(baseURL, payload);
            if(response.status === 200){
                toast.success("The invoice has been saved successfully!");
                navigate("/dashboard");
            }
            else{
                toast.error("Something went wrong.")
            }
        }
        catch(error){   
            console.error(error);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        try{
            const response = await deleteInvoice(baseURL, invoiceData.id);
            
            if(response.status === 204){
                toast.success("Invoice deleted successfully!");
                navigate("/dashboard");
            }
            else{
                toast.error("Unable to delete the invoice.");
            }
        }
        catch(error){
            toast.error("Failed to delete the invoice", error.message);
        }
    }

    const handleDownloadPdf = async () => {
        if(!previewRef.current){
            return;
        }
        
        try{
            setDownloading(true);
            await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`);
        }
        catch(error){
            toast.error("Failed to generate invoice", error.message);
        }
        finally{
            setDownloading(false);
        }
    }

    const handleSendEmail = async () => {
        if(!previewRef.current || !customerEmail){
            return toast.error("Please enter a valid e-mail address and try again!");
        }

        try{
            setEmailing(true);
            const pdfBlob = await generatePdfFromElement(previewRef.current, `invoice_${Date.now()}.pdf`, true);
            
            const formData = new FormData();
            formData.append("file", pdfBlob);
            formData.append("email", customerEmail);

            const response = await sendInvoice(baseURL, formData);

            if(response.status === 200){
                toast.success("E-mail is sent successfully!");
                setShowModal(false);
                setCustomerEmail("");
            }
            else{
                toast.error("Failed to send the e-mail.");
            }
        }
        catch(error){
            toast.error("Failed to send the e-mail", error.message);
        }
        finally{
            setEmailing(false);
        }
    }

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
                    <button className="btn btn-primary d-flex align-items-center justify-content-center" 
                        onClick={handleSaveAndExit} disabled={loading}>
                        {loading && <Loader2 className="me-2 spin-animation" size={18}/>}
                        {loading ? "Saving..." : "Save And Exit"}
                    </button>

                    <button className="btn btn-success d-flex align-items-center justify-content-center"
                        disabled={loading}
                        onClick={handleDownloadPdf}
                    >
                        {downloading && (
                            <Loader2 className="me-2 spin-animation" size={18}/>
                        )}
                        {downloading ? "Downloading..." : "Download PDF"}
                    </button>

                    <button className="btn btn-info" onClick={() => setShowModal(true)}>
                        Send to Email
                    </button>

                    {invoiceData.id && (
                        <button className="btn btn-danger" onClick={handleDelete}>
                            Delete
                        </button>
                    )}

                    <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>


            {/* For PDF Preview */}
            <div className="flex-grow-1 overflow-auto d-flex justify-content-center align-items-start bg-light py-3">
                {/* Used for printing purpose; Passed to the parent component */}
                <div ref={previewRef} className="invoice-preview">
                    <InvoicePreview invoiceData={invoiceData} template={selectedTemplate}/>
                </div>
            </div>

            {showModal && (
                <div className="modal d-block" tabIndex="-1" role="dialog"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Send Invoice</h5>
                                <button type="button" className="btn-close" 
                                    onClick={() => setShowModal(false)}>
                                </button>
                            </div>

                            <div className="modal-body">
                                <input type="email" className="form-control" placeholder="Customer email" 
                                    onChange={(e) => setCustomerEmail(e.target.value)} value={customerEmail}/>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleSendEmail} disabled={emailing}>
                                    {emailing ? "Sending..." : "Send"}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Preview;