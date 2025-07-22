import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

# Mailtrap SMTP Configuration
MAIL_SERVER = os.getenv("MAIL_SERVER", "sandbox.smtp.mailtrap.io")
MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
MAIL_USERNAME = os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
MAIL_FROM = os.getenv("MAIL_FROM", "noreply@roadmap.dev")
MAIL_TLS = os.getenv("MAIL_TLS", "true").lower() == "true"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

def send_team_invitation_email(email: str, team_name: str, token: str):
    """Send team invitation email using Mailtrap SMTP"""
    invitation_link = f"http://localhost:5173/invite/{token}"
    
    # Check if email credentials are configured
    if not MAIL_USERNAME or not MAIL_PASSWORD:
        print(f"📧 [LOCAL MODE] Team invitation email would be sent to:")
        print(f"   To: {email}")
        print(f"   Subject: You're invited to join {team_name}")
        print(f"   Link: {invitation_link}")
        return {"status": "local_mode", "message": "Email logged to console (no SMTP credentials)"}
    
    # Create message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"You're invited to join {team_name}"
    msg["From"] = MAIL_FROM
    msg["To"] = email
    
    # Create HTML content
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #4CAF50; color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; background-color: #f9f9f9; }}
            .button {{ 
                display: inline-block; 
                background-color: #4CAF50; 
                color: white; 
                padding: 14px 20px; 
                text-decoration: none; 
                border-radius: 4px; 
                margin: 20px 0; 
            }}
            .footer {{ padding: 20px; font-size: 14px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Team Invitation</h1>
            </div>
            <div class="content">
                <h2>You're invited to join {team_name}!</h2>
                <p>You've been invited to join the team <strong>{team_name}</strong>.</p>
                <p>Click the button below to accept the invitation:</p>
                <a href="{invitation_link}" class="button">Accept Invitation</a>
                <p><strong>Note:</strong> This invitation will expire in 7 days.</p>
                <p>If you can't click the button, copy and paste this link into your browser:</p>
                <p><a href="{invitation_link}">{invitation_link}</a></p>
            </div>
            <div class="footer">
                <p>Thanks for using our platform!</p>
                <p>If you have any questions, please contact our support team.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Create HTML part
    html_part = MIMEText(html_content, "html")
    msg.attach(html_part)
    
    try:
        # Create SMTP session
        server = smtplib.SMTP(MAIL_SERVER, MAIL_PORT)
        
        # Enable TLS if configured
        if MAIL_TLS:
            server.starttls()
        
        # Login to server
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(MAIL_FROM, email, text)
        server.quit()
        
        print(f"Email sent successfully to {email}")
        return {"status": "sent", "message": "Email sent successfully"}
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return {"status": "error", "message": f"Failed to send email: {str(e)}"}

def send_verification_email(email: str, token: str):
    """Send email verification using Mailtrap SMTP"""
    verification_link = f"{FRONTEND_URL}/verify/{token}"
    
    # Check if email credentials are configured
    if not MAIL_USERNAME or not MAIL_PASSWORD:
        print(f"📧 [LOCAL MODE] Verification email would be sent to:")
        print(f"   To: {email}")
        print(f"   Subject: Verify your email address")
        print(f"   Link: {verification_link}")
        return {"status": "local_mode", "message": "Email logged to console (no SMTP credentials)"}
    
    # Create message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Verify your email address"
    msg["From"] = MAIL_FROM
    msg["To"] = email
    
    # Create HTML content
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background-color: #2196F3; color: white; padding: 20px; text-align: center; }}
            .content {{ padding: 20px; background-color: #f9f9f9; }}
            .button {{ 
                display: inline-block; 
                background-color: #2196F3; 
                color: white; 
                padding: 14px 20px; 
                text-decoration: none; 
                border-radius: 4px; 
                margin: 20px 0; 
            }}
            .footer {{ padding: 20px; font-size: 14px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Email Verification</h1>
            </div>
            <div class="content">
                <h2>Please verify your email address</h2>
                <p>Thank you for registering! Please click the button below to verify your email address:</p>
                <a href="{verification_link}" class="button">Verify Email</a>
                <p>If you can't click the button, copy and paste this link into your browser:</p>
                <p><a href="{verification_link}">{verification_link}</a></p>
            </div>
            <div class="footer">
                <p>Thanks for using our platform!</p>
                <p>If you didn't create an account, please ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    # Create HTML part
    html_part = MIMEText(html_content, "html")
    msg.attach(html_part)
    
    try:
        # Create SMTP session
        server = smtplib.SMTP(MAIL_SERVER, MAIL_PORT)
        
        # Enable TLS if configured
        if MAIL_TLS:
            server.starttls()
        
        # Login to server
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(MAIL_FROM, email, text)
        server.quit()
        
        print(f"Verification email sent successfully to {email}")
        return {"status": "sent", "message": "Email sent successfully"}
        
    except Exception as e:
        print(f"Error sending verification email: {e}")
        return {"status": "error", "message": f"Failed to send email: {str(e)}"}
        return {"status": "fallback", "message": f"Email failed, logged to console: {str(e)}"}
