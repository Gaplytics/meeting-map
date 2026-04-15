const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/interest', async (req, res) => {
  const { email, phone, label, size } = req.body;

  try {
    const response = await fetch("https://api.zeptomail.in/v1.1/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Zoho-enczapikey PHtE6r0IRuHpjGB98hNRtqW9Qs/wM9ws+e40JAIVsItKWaMBTU0B+NovkjHmq0svBPJKEfDJz9hg5e/KsL2GIz68MGZIXWqyqK3sx/VYSPOZsbq6x00ftFkecUHcUo7scNRj0CXfvN+X"
      },
      body: JSON.stringify({
        from: { address: "noreply@orbithyre.com", name: "MeetingMap" },
        to: [{ email_address: { address: "biswa@4thorbit.com", name: "Biswa" } }],
        subject: "New Early Access Interest - MeetingMap",
        htmlbody: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
            <h2 style="color: #075E54; margin-top: 0;">New Interest Shown!</h2>
            <p>A new user has requested early access to MeetingMap.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p><b>Email:</b> ${email}</p>
            <p><b>Phone:</b> +91 ${phone}</p>
            <p><b>Role:</b> ${label}</p>
            <p><b>Company Size:</b> ${size}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">This is an automated notification from MeetingMap Landing Page.</p>
          </div>
        `
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      res.status(200).json({ success: true, data });
    } else {
      console.error('ZeptoMail Error:', data);
      res.status(response.status).json({ success: false, error: data });
    }
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
