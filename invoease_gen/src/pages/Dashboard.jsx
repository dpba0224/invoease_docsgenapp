import { useContext, useEffect, useState } from "react";
import { AppContext, initialInvoiceData } from "../context/AppContext.jsx";
import { getAllInvoices } from "../service/invoiceService";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { formatDate } from "../util/formatInvoiceData.js";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const { baseURL, setInvoiceData, setSelectedTemplate, setInvoiceTitle } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try{
                const response =  await getAllInvoices(baseURL);
                setInvoices(response.data);
            }
            catch(error){
                toast.error('Failed to load the invoices', error);
            }
        }

        fetchInvoices();
    }, [baseURL]);

    const handleViewClick = (invoice) => {
        setInvoiceData(invoice);
        setSelectedTemplate(invoice.template || "template1");
        setInvoiceTitle(invoice.title || "New Invoice");
        navigate(`/preview`);
    }

    const handleCreateNew = () => {
        // Reset to the initial state from context
        setInvoiceTitle("New Invoice");
        setSelectedTemplate("template1");
        setInvoiceData(initialInvoiceData);
        navigate('/generate');
    }

    return(
        <div className="container py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
                {/* Invoice Card creation */}
                <div className="col">
                    <div className="card h-100 d-flex justify-content-center align-items-center border border-2 border-light shadow-sm cursor-pointer"
                        style={{ minHeight: '270px' }}
                        onClick={handleCreateNew}
                    >
                            <Plus size={48}/>

                            <p className="mt-3 fw-medium">Create New Invoice</p>
                    </div>
                </div>
                
                {/* Render of existing invoices */}
                {invoices.map((invoice, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 shadow-sm cursor-pointer" 
                            style={{ minHeight: '270px' }}
                            onClick={() => handleViewClick(invoice)}
                        >
                            {invoice.thumbnailUrl && (
                                <img src={invoice.thumbnailUrl} alt="Invoice thumbnail" 
                                    className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                            )}

                            <div className="card-body">
                                <h6 className="card-title mb-1">{invoice.title}</h6>
                                <small className="text-muted">
                                    Last Updated: {formatDate(invoice.lastUpdatedAt)}
                                </small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;