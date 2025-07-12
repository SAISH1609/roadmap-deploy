import os
import ssl
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@roadmap.dev")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

def send_team_invitation_email(email: str, team_name: str, token: str):
    """Send team invitation email"""
    invitation_link = f"{FRONTEND_URL}/invite/{token}"
    
    if not SENDGRID_API_KEY:
        print(f"📧 [LOCAL MODE] Team invitation email would be sent to:")
        print(f"   To: {email}")
        print(f"   Subject: You're invited to join {team_name}")
        print(f"   Link: {invitation_link}")
        return {"status": "local_mode", "message": "Email logged to console"}
    
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=email,
        subject=f"You're invited to join {team_name}",
        html_content=f"""
        <h2>Team Invitation</h2>
        <p>You've been invited to join the team <strong>{team_name}</strong>.</p>
        <p>Click the link below to accept the invitation:</p>
        <a href="{invitation_link}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Accept Invitation</a>
        <p>This invitation will expire in 7 days.</p>
        <p>If you can't click the button, copy and paste this link into your browser:</p>
        <p>{invitation_link}</p>
        """
    )
    
    try:
        # Configure SSL context to handle certificate issues on macOS
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Email sent successfully to {email}")
        return {"status": "sent", "message": "Email sent successfully"}
    except Exception as e:
        print(f"Error sending email: {e}")
        # Fallback to local mode on SSL errors
        print(f"📧 [FALLBACK] Team invitation email for {email}:")
        print(f"   Link: {invitation_link}")
        return {"status": "fallback", "message": f"Email failed, logged to console: {str(e)}"}

def send_verification_email(email: str, token: str):
    """Send email verification"""
    verification_link = f"{FRONTEND_URL}/verify/{token}"
    
    if not SENDGRID_API_KEY:
        print(f"📧 [LOCAL MODE] Verification email would be sent to:")
        print(f"   To: {email}")
        print(f"   Subject: Verify your email address")
        print(f"   Link: {verification_link}")
        return {"status": "local_mode", "message": "Email logged to console"}
    
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=email,
        subject="Verify your email address",
        html_content=f"""
        <h2>Email Verification</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="{verification_link}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
        <p>If you can't click the button, copy and paste this link into your browser:</p>
        <p>{verification_link}</p>
        """
    )
    
    try:
        # Configure SSL context to handle certificate issues on macOS
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        
        sg = SendGridAPIClient(api_key=SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Verification email sent successfully to {email}")
        return {"status": "sent", "message": "Email sent successfully"}
    except Exception as e:
        print(f"Error sending verification email: {e}")
        # Fallback to local mode on SSL errors
        print(f"📧 [FALLBACK] Verification email for {email}:")
        print(f"   Link: {verification_link}")
        return {"status": "fallback", "message": f"Email failed, logged to console: {str(e)}"}
