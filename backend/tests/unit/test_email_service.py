import pytest
from unittest.mock import Mock, patch, MagicMock
import smtplib
from app.services.email_service import send_team_invitation_email, send_verification_email

class TestEmailService:
    """Test email service functionality"""
    
    @patch('app.services.email_service.smtplib.SMTP')
    @patch('app.services.email_service.MAIL_USERNAME', 'test_user')
    @patch('app.services.email_service.MAIL_PASSWORD', 'test_pass')
    def test_send_team_invitation_email_success(self, mock_smtp):
        """Test successful team invitation email sending"""
        # Setup mock SMTP server
        mock_server = Mock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        
        result = send_team_invitation_email(
            email="test@example.com",
            team_name="Test Team",
            token="test_token_123"
        )
        
        # Verify SMTP calls
        mock_smtp.assert_called_once_with('sandbox.smtp.mailtrap.io', 587)
        mock_server.starttls.assert_called_once()
        mock_server.login.assert_called_once_with('test_user', 'test_pass')
        mock_server.sendmail.assert_called_once()
        mock_server.quit.assert_called_once()
        
        # Verify return value
        assert result["status"] == "sent"
        assert result["message"] == "Email sent successfully"
    
    @patch('app.services.email_service.smtplib.SMTP')
    @patch('app.services.email_service.MAIL_USERNAME', None)
    @patch('app.services.email_service.MAIL_PASSWORD', None)
    def test_send_team_invitation_email_no_credentials(self, mock_smtp):
        """Test email sending when no credentials are configured (local mode)"""
        result = send_team_invitation_email(
            email="test@example.com",
            team_name="Test Team",
            token="test_token_123"
        )
        
        # Should not attempt SMTP connection
        mock_smtp.assert_not_called()
        
        # Should return local mode status
        assert result["status"] == "local_mode"
        assert "no SMTP credentials" in result["message"]
    
    @patch('app.services.email_service.smtplib.SMTP')
    @patch('app.services.email_service.MAIL_USERNAME', 'test_user')
    @patch('app.services.email_service.MAIL_PASSWORD', 'test_pass')
    def test_send_team_invitation_email_smtp_error(self, mock_smtp):
        """Test email sending when SMTP error occurs"""
        # Setup mock to raise exception
        mock_smtp.side_effect = smtplib.SMTPException("SMTP connection failed")
        
        result = send_team_invitation_email(
            email="test@example.com",
            team_name="Test Team",
            token="test_token_123"
        )
        
        # Verify error handling
        assert result["status"] == "error"
        assert "Failed to send email" in result["message"]
        assert "SMTP connection failed" in result["message"]
    
    @patch('app.services.email_service.smtplib.SMTP')
    @patch('app.services.email_service.MAIL_USERNAME', 'test_user')
    @patch('app.services.email_service.MAIL_PASSWORD', 'test_pass')
    @patch('app.services.email_service.FRONTEND_URL', 'http://localhost:5173')
    def test_invitation_email_content(self, mock_smtp):
        """Test that invitation email contains correct content"""
        mock_server = Mock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        
        send_team_invitation_email(
            email="test@example.com",
            team_name="Test Team",
            token="test_token_123"
        )
        
        # Get the email content from the mock call
        call_args = mock_server.sendmail.call_args
        email_content = call_args[0][2]  # Third argument is the email content
        
        # Verify email contains expected content
        assert "test@example.com" in email_content
        assert "Test Team" in email_content
        assert "http://localhost:5173/invite/test_token_123" in email_content
        assert "Accept Invitation" in email_content
    
    @patch('app.services.email_service.smtplib.SMTP')
    @patch('app.services.email_service.MAIL_USERNAME', 'test_user')
    @patch('app.services.email_service.MAIL_PASSWORD', 'test_pass')
    def test_send_verification_email_success(self, mock_smtp):
        """Test successful verification email sending"""
        mock_server = Mock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        
        result = send_verification_email(
            email="test@example.com",
            token="verification_token_123"
        )
        
        # Verify SMTP calls
        mock_smtp.assert_called_once_with('sandbox.smtp.mailtrap.io', 587)
        mock_server.starttls.assert_called_once()
        mock_server.login.assert_called_once_with('test_user', 'test_pass')
        mock_server.sendmail.assert_called_once()
        mock_server.quit.assert_called_once()
        
        # Verify return value
        assert result["status"] == "sent"
        assert result["message"] == "Email sent successfully"
    
    @patch('app.services.email_service.smtplib.SMTP')
    @patch('app.services.email_service.MAIL_USERNAME', 'test_user')
    @patch('app.services.email_service.MAIL_PASSWORD', 'test_pass')
    @patch('app.services.email_service.FRONTEND_URL', 'http://localhost:5173')
    def test_verification_email_content(self, mock_smtp):
        """Test that verification email contains correct content"""
        mock_server = Mock()
        mock_smtp.return_value.__enter__.return_value = mock_server
        
        send_verification_email(
            email="test@example.com",
            token="verification_token_123"
        )
        
        # Get the email content from the mock call
        call_args = mock_server.sendmail.call_args
        email_content = call_args[0][2]  # Third argument is the email content
        
        # Verify email contains expected content
        assert "test@example.com" in email_content
        assert "http://localhost:5173/verify/verification_token_123" in email_content
        assert "Verify Email" in email_content
        assert "verify your email address" in email_content

class TestEmailConfiguration:
    """Test email configuration and environment variables"""
    
    @patch.dict('os.environ', {
        'MAIL_SERVER': 'custom.smtp.server',
        'MAIL_PORT': '2525',
        'MAIL_TLS': 'false'
    })
    def test_email_configuration_from_env(self):
        """Test that email configuration reads from environment variables"""
        # Re-import to get updated environment variables
        import importlib
        from app.services import email_service
        importlib.reload(email_service)
        
        assert email_service.MAIL_SERVER == 'custom.smtp.server'
        assert email_service.MAIL_PORT == 2525
        assert email_service.MAIL_TLS is False
    
    def test_email_configuration_defaults(self):
        """Test that email configuration has proper defaults"""
        from app.services.email_service import MAIL_SERVER, MAIL_PORT, MAIL_TLS, FRONTEND_URL
        
        # Test default values (when env vars are not set)
        assert MAIL_SERVER == "sandbox.smtp.mailtrap.io"
        assert MAIL_PORT == 587
        assert MAIL_TLS is True
        assert FRONTEND_URL == "http://localhost:5173"
