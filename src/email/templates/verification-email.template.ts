export interface VerificationEmailData {
  userName: string;
  verificationUrl: string;
  expiryHours: number;
}

export function generateVerificationEmailHtml(data: VerificationEmailData): string {
  const { userName, verificationUrl, expiryHours } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email - Brendon Network</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f7fa;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🚀 Brendon Network
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">
                Connecting Entrepreneurs Worldwide
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a2e; font-size: 24px; font-weight: 600;">
                Welcome, ${escapeHtml(userName)}! 👋
              </h2>
              
              <p style="margin: 0 0 25px 0; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Thank you for joining Brendon Network! To get started and connect with other entrepreneurs, please verify your email address.
              </p>

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center; padding: 10px 0 30px 0;">
                    <a href="${escapeHtml(verificationUrl)}" 
                       style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                      ✉️ Verify My Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 15px 0; color: #718096; font-size: 14px; line-height: 1.6;">
                Or copy and paste this link into your browser:
              </p>
              <p style="margin: 0 0 25px 0; padding: 15px; background-color: #f7fafc; border-radius: 6px; word-break: break-all;">
                <a href="${escapeHtml(verificationUrl)}" style="color: #667eea; text-decoration: none; font-size: 13px;">
                  ${escapeHtml(verificationUrl)}
                </a>
              </p>

              <!-- Expiry Notice -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 20px; background-color: #fff8e1; border-radius: 8px; border-left: 4px solid #ffc107;">
                    <p style="margin: 0; color: #856404; font-size: 14px;">
                      ⏰ <strong>Important:</strong> This verification link will expire in <strong>${expiryHours} hours</strong>. Please verify your email before then.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #718096; font-size: 14px; line-height: 1.6;">
                If you didn't create an account with Brendon Network, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #a0aec0; font-size: 13px;">
                © ${new Date().getFullYear()} Brendon Network. All rights reserved.
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                This email was sent to verify your account registration.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function generateVerificationEmailText(data: VerificationEmailData): string {
  const { userName, verificationUrl, expiryHours } = data;

  return `
Welcome to Brendon Network, ${userName}!

Thank you for joining our network of entrepreneurs. To get started, please verify your email address by clicking the link below:

${verificationUrl}

⏰ IMPORTANT: This verification link will expire in ${expiryHours} hours.

If you didn't create an account with Brendon Network, you can safely ignore this email.

---
© ${new Date().getFullYear()} Brendon Network. All rights reserved.
  `.trim();
}

function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char]);
}
