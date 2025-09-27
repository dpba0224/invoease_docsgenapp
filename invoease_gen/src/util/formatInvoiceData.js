export const formatInvoiceData = (invoiceData) => {
    const {
        title,
        business = {},
        invoice = {},
        account = {},
        billing = {},
        shipping = {},
        tax = 0,
        notes = "",
        items = [],
        logo = ""
    } = invoiceData || {};

    const currencySymbol = "Php";
    const subtotal = items.reduce((acc, item) => acc + (item.qty * item.amount), 0);
    const taxAmount = subtotal * (tax / 100);
    const total = subtotal + taxAmount;

    return {
        title,
        businessName: business.name,
        businessAddress: business.address,
        businessContact: business.contact,
        businessLogo: logo,

        invoiceNumber: invoice.number,
        invoiceDate: invoice.date,
        paymentDate: invoice.dueDate,

        accountName: account.name,
        accountNumber: account.number,
        accountCode: account.code,

        billingName: billing.name,
        billingAddress: billing.address,
        billingContact: billing.contact,

        shippingName: shipping.name,
        shippingAddress: shipping.address,
        shippingContact: shipping.contact,

        currencySymbol,
        tax,
        items,
        notes,
        subtotal,
        taxAmount,
        total
    };
};

export const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";

  const date = new Date(dateStr);
  return date.toLocaleDateString("en-PH", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};