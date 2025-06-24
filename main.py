from flask import Flask, render_template, request
from flask_cors import CORS
import smtplib
import ssl

app = Flask(__name__)
CORS(app)

@app.route('/contactForm')
def index():
    return render_template('contactForm.html')

@app.route('/send', methods=['POST'])
def sendEmail():
    sender_email = "marton@email"
    receiver_email = "marton@email"
    password = ""  # Use an App Password from Google

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email,
                f"Subject: New message from {name}\n\nFrom: {email}\n\n{message}")
    except Exception as e:
        print(f"Error: {e}")
        return "Failed to send email."

    return "Email sent successfully!"

if __name__ == '__main__':
    app.run(debug=True)
