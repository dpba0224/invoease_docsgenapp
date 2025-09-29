import './Landing.css';
import {assets} from "../../assets/assets.js";
import Logo from "../../components/Logo.jsx"
import LogoNegative from "../../components/LogoNegative.jsx"
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { AppContext, initialInvoiceData } from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
import { useContext } from "react";

const Landing = () => {

    const {openSignIn} = useClerk();
    const {setInvoiceData, setSelectedTemplate, setInvoiceTitle} = useContext(AppContext);
    const navigate = useNavigate();

    const openLogin = () => {
        openSignIn({});
    }

    const handleGenerateClick = () => {
        setInvoiceData(initialInvoiceData);
        setSelectedTemplate("template1");
        setInvoiceTitle("New Invoice");

        navigate("/generate");
    }

    return(
        <>
            <header id="hero" className="hero-section text-white text-center">
                <div className="container py-5 d-flex flex-column justify-content-center" style={{ minHeight: '85vh' }}>
                    <div className="row py-lg-5">
                        <div className="col-lg-9 col-md-10 mx-auto">
                            <h1 className="display-3 fw-bold mb-4">
                                Invoicing made easier, <br/> more efficient.
                            </h1>
                            <p className="lead mb-5" style={{ fontSize: '1.3rem' }}>
                                Create professional invoices in seconds with accuracy! <br /> 
                                <span style={{fontWeight: "bold"}}>InvoEase</span> helps you save more time and simplify your invoice with its fast, user-friendly platform.
                            </p>
                            <p>
                                {/* Primary call to action */}
                                <SignedIn>
                                    <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3" onClick={handleGenerateClick}>
                                        Try Now!
                                    </button>
                                </SignedIn>
                                <SignedOut>
                                    <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 mx-1 px-5 py-3" onClick={openLogin}>
                                        Try Now!
                                    </button>
                                </SignedOut>
                                {/* Secondary call to action */}
                                <a href="#how-it-works" className="btn btn-lg btn-outline-light rounded-pill my-2 mx-1 px-5 py-3">
                                    More Info
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <section id="how-it-works" className="py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">Finish your invoice in four easy steps:</h2>
                    <div className="row g-4 justify-content-center">
                        {/* Card 1 */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-primary-soft">
                                    <img
                                        src="https://placehold.co/150x150/FD0D1D/FFFFFF?text=1&font=poppins"
                                        className="rounded-circle"
                                        alt="Enter Details"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Enter Details</h5>
                                    <p className="card-text text-muted small">
                                        Provide the information of your client together with the description, quantities and prices of the items that they will purchase. <span style={{fontWeight: "bold"}}>InvoEase</span> will help you organize it quickly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2*/}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-success-soft">
                                    <img
                                        src="https://placehold.co/150x150/194587/FFFFFF?text=2&font=poppins"
                                        className="rounded-circle"
                                        alt="Select a Template"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Select a Template</h5>
                                    <p className="card-text text-muted small">
                                        <span style={{fontWeight: "bold"}}>InvoEase</span> offers a variety of templates and choose which among of these is well suited in your style and needs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-warning-soft">
                                    <img
                                        src="https://placehold.co/150x150/1CFF07/000000?text=3&font=poppins"
                                        className="rounded-circle"
                                        alt="Preview Invoice"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Check the Preview</h5>
                                    <p className="card-text text-muted small">
                                        <span style={{fontWeight: "bold"}}>InvoEase</span> offers a preview of your invoice before you generate it. Take a look first and make any changes when necessary.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 Card */}
                        <div className="col-md-6 col-lg-3 d-flex">
                            <div className="card h-100 shadow-sm border-0 text-center flex-fill">
                                <div className="card-img-top-container d-flex align-items-center justify-content-center p-4 bg-info-soft">
                                    <img
                                        src="https://placehold.co/150x150/F0B30D/000000?text=4&font=poppins"
                                        className="rounded-circle"
                                        alt="Generate Invoice"
                                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/E0E0E0/000000?text=Error'; }}
                                    />
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title fw-bold mb-2 fs-5">Generate Invoice</h5>
                                    <p className="card-text text-muted small">
                                        Download and save your invoice as a .pdf file. You can send it directly via email, or save it for your records and future references.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5 display-5 fw-bold">Why Choose <u>InvoEase</u> among others?</h2>
                    
                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse">
                        <div className="col-md-6">
                            <img
                                src={assets.landing02}
                                className="img-fluid rounded shadow-lg"
                                alt="More professional branding and organization"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">More professional branding and organization</h3>
                            <p className="lead fs-6 mx-2" style={{ color: "white" }}>
                                Clean, customizable layouts with logos enhance credibility, while centralized, searchable records simplify tracking and reporting.
                            </p>
                            <ul className="list-unstyled" style={{ color: "white" }}>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Curated list of templates from gallery.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Add your logo and invoice details.</li>
                                <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Tailor fields to your needs.</li> 
                            </ul>
                        </div>
                    </div>

                    <div className="row align-items-center gy-4 mt-5">
                        <div className="col-md-6">
                            <img
                                src={assets.landing03}
                                className="img-fluid rounded shadow-lg"
                                alt="Time savings through automation"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Time savings through automation</h3>
                            <p className="lead fs-6 mx-2" style={{ color: "white" }}>
                                Templates, saved client details, and automatic tax/discount calculations cut manual entry and formatting, allowing focus on higher‑value work.
                            </p>
                            <ul className="list-unstyled" style={{ color: "white" }}>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>View the previous invoices.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Your saved invoices with thumbnail.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Reuse one or more invoices.</li>
                                <li><i className="bi bi-check-circle-fill text-primary me-2"></i>Track the invoices.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row align-items-center gy-4 mt-5 flex-row-reverse"> {/* flex-row-reverse alternates image/text */}
                        <div className="col-md-6">
                            <img
                                src={assets.landing04}
                                className="img-fluid rounded shadow-lg"
                                alt="Time Saving"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Preview before sending</h3>
                            <p className="lead fs-6 mx-2" style={{ color: "white" }}>
                                Real-time invoice previews let users catch layout issues, missing line items, incorrect taxes, or branding mismatches before delivery, reducing rework and preventing client confusion.
                            </p>
                            <ul className="list-unstyled" style={{ color: "white" }}> 
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Live preview.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Switch between multiple invoices.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>One click to Save, Download and Delete invoices.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="row align-items-center gy-4">
                        <div className="col-md-6">
                            <img
                                src={assets.landing01}
                                className="img-fluid rounded shadow-lg"
                                alt="Faster payments and healthier cash flown"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/E0E0E0/000000?text=Error'; }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h3 className="fw-bold mx-2">Faster payments and healthier cash flow</h3>
                            <p className="lead fs-6 mx-2" style={{ color: "white" }}>
                                Digital invoices can be sent instantly, include payment links, and automate reminders, which reduces delays and speeds up collections.
                            </p>
                            <ul className="list-unstyled" style={{ color: "white" }}>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Send invoices instantly without leaving the application.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>One click to send invoices.</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Send unlimited invoices.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="generate-invoice" className="py-5 text-center bg-primary text-white">
                <div className="container">
                    <h2 className="display-5 fw-bold mb-3">Are you ready to level up your invoicing experience?</h2>
                    <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Join thousands of businesses and organizations who trust <u><b>InvoEase</b></u>.
                        Start creating your professional invoices today! It is fast, efficient, and reliable!
                    </p>

                     <SignedIn>
                        <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 px-5 py-3" onClick={handleGenerateClick}>
                            Generate your invoice now! 
                        </button>
                    </SignedIn>
                    <SignedOut>
                        <button className="btn btn-lg btn-warning fw-bold rounded-pill my-2 px-5 py-3" onClick={openLogin}>
                            Generate your invoice now! 
                        </button>
                    </SignedOut>
                </div>
            </section>

            <footer className="py-5 bg-dark text-white-50">
                <div className="container text-center">
                    <LogoNegative />
                    <p className="text-white fw-bold mt-2">InvoEase</p>
                    <p className="mb-0">
                        &copy; {new Date().getFullYear()} InvoEase. All Rights Reserved.
                    </p>
                    <p className="mb-0 small">
                        Helping businesses and organizations in managing their workflows.
                    </p>
                </div>
            </footer>
        </>
    );
}

export default Landing;