import axios from 'axios';
import { useContext } from 'react';


export const uploadInvoiceThumbnail = async (imageData) => {
    
    const formData  = new FormData();

    formData.append('file', imageData);
    formData.append('upload_preset', 'invoices-thumbnail');
    formData.append('cloud-name', 'dzo5ux7y7');

    const response = await axios.post(`https://api.cloudinary.com/v1_1/dzo5ux7y7/image/upload`, formData);

    return response.data.secure_url;
} 