# contactFormBackend
Backend code necessary for the operation of a contact form on a site

Usage: <br/>
Adjust contact form as desired. CSS should be hosted on destination styles.css - if it doesn't import automatically, you can use HTML to open a stylesheet from link. <br/>
Add email and app password in main.py <br/>
Run the main.py on a VM and paste the URL for POST into the AJAX variables in contact_script.js


Notes:<br/>
Flask reads from /templates/HTMLFILE for the HTML accessed for POST <br/>
This is configured to use GMAIL inboxes via App Passwords  
