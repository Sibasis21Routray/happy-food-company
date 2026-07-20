import axios from 'axios';

export const sendOrderEmails = async (order: any, billingAddress: any, shippingAddress: any, customerName: string, customerEmail: string) => {
  const adminEmail = "woohoo@thehappyfoodcompany.com";
  
  // Use sequential order number, pad with leading zeros (e.g., 0001)
  const orderIdStr = order.orderNumber 
    ? order.orderNumber.toString().padStart(4, '0') 
    : (order._id ? order._id.toString().substring(order._id.toString().length - 4) : "2393");
    
  const orderDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  let itemsHtml = '';
  order.items.forEach((item: any) => {
    itemsHtml += `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px;">${item.title || 'Product'}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  });

  const billingHtml = `
    ${billingAddress.name}<br/>
    ${billingAddress.streetAddress}<br/>
    ${billingAddress.locality ? billingAddress.locality + '<br/>' : ''}
    ${billingAddress.city} ${billingAddress.pinCode}<br/>
    ${billingAddress.state}<br/>
    <a href="tel:${billingAddress.phone}" style="color: #6b46c1; text-decoration: none;">${billingAddress.phone}</a><br/>
    <a href="mailto:${billingAddress.email}" style="color: #6b46c1; text-decoration: none;">${billingAddress.email}</a>
  `;

  const shippingHtml = `
    ${shippingAddress.name}<br/>
    ${shippingAddress.streetAddress}<br/>
    ${shippingAddress.locality ? shippingAddress.locality + '<br/>' : ''}
    ${shippingAddress.city} ${shippingAddress.pinCode}<br/>
    ${shippingAddress.state}
  `;

  const getTemplate = (isAdmin: boolean) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://ui-avatars.com/api/?name=Happy+Food+Company&background=6b46c1&color=fff&size=100&font-size=0.33&length=3" alt="The Happy Food Company" style="max-width: 150px; height: auto;" />
      </div>
      
      <div style="background-color: #805ad5; color: white; padding: 24px; border-radius: 4px 4px 0 0;">
        <h1 style="margin: 0; font-size: 24px; font-weight: normal;">
          ${isAdmin ? `New Order: #${orderIdStr}` : 'Thank you for your order'}
        </h1>
      </div>
      
      <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none;">
        ${isAdmin 
          ? `<p style="margin-top: 0; font-size: 14px;">You've received the following order from ${customerName}:</p>`
          : `<p style="margin-top: 0; font-size: 14px;">Hi ${customerName},<br/><br/>Just to let you know — we've received your order #${orderIdStr}, and it is now being processed:</p>`
        }
        
        <h2 style="color: #6b46c1; font-size: 18px; margin-top: 24px;">[Order #${orderIdStr}] (${orderDate})</h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0; color: #4a5568; font-size: 14px;">Product</th>
              <th style="text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0; color: #4a5568; font-size: 14px;">Quantity</th>
              <th style="text-align: left; padding: 12px; border-bottom: 2px solid #e2e8f0; color: #4a5568; font-size: 14px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot style="font-size: 14px;">
            <tr>
              <td colspan="2" style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Subtotal:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">₹${Number(order.subtotal || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Discount:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">-₹${Number(order.discountAmount || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Payment method:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">${order.paymentMethod || 'Online'}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #4a5568;">Total:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569;">₹${Number(order.totalAmount || 0).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 32px;">
          <tr>
            <td style="width: 50%; vertical-align: top; padding-right: 16px;">
              <h3 style="color: #6b46c1; font-size: 18px; margin-top: 0;">Billing address</h3>
              <div style="padding: 16px; border: 1px solid #e2e8f0; font-size: 14px; color: #475569; font-style: italic; line-height: 1.5;">
                ${billingHtml}
              </div>
            </td>
            <td style="width: 50%; vertical-align: top; padding-left: 16px;">
              <h3 style="color: #6b46c1; font-size: 18px; margin-top: 0;">Shipping address</h3>
              <div style="padding: 16px; border: 1px solid #e2e8f0; font-size: 14px; color: #475569; font-style: italic; line-height: 1.5;">
                ${shippingHtml}
              </div>
            </td>
          </tr>
        </table>
        
        <div style="margin-top: 32px; font-size: 14px; color: #475569;">
          ${isAdmin 
            ? 'Congratulations on the sale.<br/><br/>Process your orders on the go. <a href="#" style="color: #6b46c1; text-decoration: underline;">Get the app</a>.' 
            : 'Thanks for using <a href="https://thehappyfoodcompany.com" style="color: #6b46c1; text-decoration: underline;">thehappyfoodcompany.com</a>!'
          }
        </div>
      </div>
      
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #cbd5e1; display: table; width: 100%;">
        <div style="display: table-cell; font-size: 12px; color: #475569; line-height: 1.5;">
          <strong>The Happy Food Company</strong><br/>
          (Angstrohm Foods Private Limited)<br/><br/>
          3rd Floor, Krishna Arcade,<br/>
          No. 17, S K Nagar, Kodigehalli,<br/>
          Bengaluru, Karnataka, 560092<br/>
          <strong>INDIA</strong>
        </div>
        <div style="display: table-cell; text-align: right; vertical-align: bottom;">
          <a href="mailto:woohoo@thehappyfoodcompany.com" style="color: #3182ce; font-size: 12px; text-decoration: underline;">woohoo@thehappyfoodcompany.com</a>
        </div>
      </div>
    </div>
  `;

  try {
    const brevoApiKey = process.env.BREVO_API_KEY || '';
    
    // Check if BREVO_API_KEY is configured
    if (!brevoApiKey) {
      console.error('❌ BREVO_API_KEY is not configured in environment variables');
      throw new Error('BREVO_API_KEY is missing');
    }

    const sender = { 
      name: process.env.BREVO_SENDER_NAME || "The Happy Food Company", 
      email: process.env.BREVO_SENDER_EMAIL || "woohoo@thehappyfoodcompany.com" 
    };

    console.log(`📧 Sending order emails for order #${orderIdStr}`);
    console.log(`📧 Admin email: ${adminEmail}`);
    console.log(`📧 Customer email: ${customerEmail} (${customerName})`);
    
    // Send admin email
    try {
      console.log(`📤 Sending admin email to ${adminEmail}...`);
      const adminResponse = await axios.post('https://api.brevo.com/v3/smtp/email', {
        sender,
        to: [{ email: adminEmail }],
        subject: `[The Happy Food Company]: New order #${orderIdStr}`,
        htmlContent: getTemplate(true)
      }, {
        headers: { 'api-key': brevoApiKey, 'content-type': 'application/json' }
      });
      
      console.log(`✅ Admin email sent successfully to ${adminEmail}`);
      console.log(`📊 Brevo Response (Admin):`, {
        status: adminResponse.status,
        messageId: adminResponse.data?.messageId || 'N/A'
      });
    } catch (adminError: any) {
      console.error(`❌ Failed to send admin email to ${adminEmail}:`);
      console.error(`   Status: ${adminError.response?.status || 'N/A'}`);
      console.error(`   Message: ${adminError.response?.data?.message || adminError.message}`);
      console.error(`   Details:`, adminError.response?.data || adminError);
      throw new Error(`Admin email failed: ${adminError.response?.data?.message || adminError.message}`);
    }

    // Send customer email
    try {
      console.log(`📤 Sending customer email to ${customerEmail}...`);
      const customerResponse = await axios.post('https://api.brevo.com/v3/smtp/email', {
        sender,
        to: [{ email: customerEmail, name: customerName }],
        subject: `Your The Happy Food Company order has been received!`,
        htmlContent: getTemplate(false)
      }, {
        headers: { 'api-key': brevoApiKey, 'content-type': 'application/json' }
      });
      
      console.log(`✅ Customer email sent successfully to ${customerEmail}`);
      console.log(`📊 Brevo Response (Customer):`, {
        status: customerResponse.status,
        messageId: customerResponse.data?.messageId || 'N/A'
      });
    } catch (customerError: any) {
      console.error(`❌ Failed to send customer email to ${customerEmail}:`);
      console.error(`   Status: ${customerError.response?.status || 'N/A'}`);
      console.error(`   Message: ${customerError.response?.data?.message || customerError.message}`);
      console.error(`   Details:`, customerError.response?.data || customerError);
      throw new Error(`Customer email failed: ${customerError.response?.data?.message || customerError.message}`);
    }
    
    console.log(`✅ All emails sent successfully for order #${orderIdStr}`);
    return { success: true, orderId: orderIdStr };
    
  } catch (error: any) {
    console.error(`❌ Transactional email failure for order #${orderIdStr}:`);
    console.error(`   Error Type: ${error.name || 'Unknown'}`);
    console.error(`   Error Message: ${error.message}`);
    
    if (error.response) {
      console.error(`   Response Status: ${error.response.status}`);
      console.error(`   Response Data:`, error.response.data);
    }
    
    if (error.request) {
      console.error(`   Request was made but no response received`);
    }
    
    // Don't throw the error - log it and return failure status
    // This prevents order placement from failing if emails don't send
    console.warn(`⚠️ Order #${orderIdStr} placed successfully but emails failed to send`);
    return { success: false, orderId: orderIdStr, error: error.message };
  }
};