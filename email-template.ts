
export const create_template=  (link:string,email:string,name:string,reset?: boolean | null ) =>{
    

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            color: #666;
            line-height: 1.6;
        }
        .verify-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: #fff !important;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            border-top: 1px solid #e0e0e0;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔒 Auth Toolbox</h1>
        </div>
        <div class="content">
            <h1>Email Verification</h1>
            <p>Hi ${name},</p>
            <p>Thank you for signing up with Auth toolbox. Please click the button below to verify your email address and complete your registration.</p>
            <a href="${link}" class="verify-button">Verify Email</a>
        </div>
        <div class="footer">
            <p>If you didn't sign up for this account, please ignore this email.</p>
            <p>&copy; 2024 Auth Toolbox. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

    `

}

export const create_template_reset = (link: string, email: string, name: string) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
        }
        .header img {
            max-width: 150px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            color: #666;
            line-height: 1.6;
        }
        .reset-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            color: #fff !important;
            background-color: #dc3545;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            border-top: 1px solid #e0e0e0;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔒 Auth Toolbox</h1>
        </div>
        <div class="content">
            <h1>Password Reset</h1>
            <p>Hi ${name},</p>
            <p>It seems like you requested a password reset. Please click the button below to reset your password. If you did not request a password reset, you can safely ignore this email.</p>
            <a href="${link}" class="reset-button">Reset Password</a>
        </div>
        <div class="footer">
            <p>If you didn't request a password reset, please ignore this email.</p>
            <p>&copy; 2024 Auth Toolbox. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
}
