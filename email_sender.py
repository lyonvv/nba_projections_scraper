import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

from render_email import render_email_content

load_dotenv()

def send_email_via_gmail():
    sender_email = "lyon.vanvoorhis@gmail.com"
    receiver_email = "lyon@tonic.ai"
    subject = "Hello from Gmail SMTP!"
    body = render_email_content()

    #save body in local file

    with open('email.html', 'w') as f:
        f.write(body)




    # Compose the email
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "html"))

    # Gmail's SMTP server details
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    app_password = os.getenv("GOOGLE_APP_PASSWORD")

    # Set up a secure connection using TLS
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()  # Secure the connection
            # Login to Gmail using your app-specific password
            server.login(sender_email, app_password)  # Use your app-specific password here
            server.sendmail(sender_email, receiver_email, message.as_string())
            print("Email sent successfully!")
    except Exception as e:
        print(f"Error sending email: {e}")

# Call the function to send the email
send_email_via_gmail()
