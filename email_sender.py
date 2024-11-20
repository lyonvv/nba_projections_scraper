import argparse
from datetime import datetime
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from dotenv import load_dotenv

from render_email import render_email_content, weeks_since_start_of_season

load_dotenv()

def send_email_via_gmail(receiver_email, receiver_name, season_start_date, season_end_date):
    

    season_start_date = datetime.strptime(season_start_date, "%m/%d/%y")
    season_end_date = datetime.strptime(season_end_date, "%m/%d/%y")

    current_date = datetime.now()

    if current_date < season_start_date:
        print("The NBA season has not started yet.")
        return
    
    if current_date > season_end_date:
        print("The NBA season has ended.")
        return
    
    week_number = weeks_since_start_of_season(season_start_date, current_date)

    #save body in local file

    sender_email = "lyon.vanvoorhis@gmail.com"
    subject = "Hello from Gmail SMTP!"
    body = render_email_content(receiver_name, week_number)

    with open('email.html', 'w', encoding='utf-8') as f:
        f.write(body)

    # save body in local file



    # # Email body



    # # Compose the email
    # message = MIMEMultipart()
    # message["From"] = sender_email
    # message["To"] = receiver_email
    # message["Subject"] = subject
    # message.attach(MIMEText(body, "html"))

    # # Gmail's SMTP server details
    # smtp_server = "smtp.gmail.com"
    # smtp_port = 587

    # app_password = os.getenv("GOOGLE_APP_PASSWORD")

    # # Set up a secure connection using TLS
    # try:
    #     with smtplib.SMTP(smtp_server, smtp_port) as server:
    #         server.starttls()  # Secure the connection
    #         # Login to Gmail using your app-specific password
    #         server.login(sender_email, app_password)  # Use your app-specific password here
    #         server.sendmail(sender_email, receiver_email, message.as_string())
    #         print("Email sent successfully!")
    # except Exception as e:
    #     print(f"Error sending email: {e}")

# Call the function to send the email

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Send an email via Gmail SMTP.")
    parser.add_argument("receiver_email", type=str, help="The email address of the recipient.")
    parser.add_argument("receiver_name", type=str, help="The name of the recipient.")
    parser.add_argument("season_start_date", type=str, help="The start date of the season, formatted as MM/DD/YY.")
    parser.add_argument("season_end_date", type=str, help="The end date of the season, formatted as MM/DD/YY.")

    args = parser.parse_args()

    # Call the function with command-line arguments
    send_email_via_gmail(args.receiver_email, args.receiver_name, args.season_start_date, args.season_end_date)