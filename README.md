#### How to start:

Open your Chrome browser and go to the Extensions page. You can do this by typing 

    "chrome://extensions/" 
    
in the address bar or by going to the Chrome menu > More Tools > Extensions.
Enable Developer mode by toggling the switch in the top right corner of the Extensions page.

Click on the "Load unpacked" button in the top left corner of the Extensions page.
Browse to the location of the folder containing the extension's files.(in our case chrome_extension folder)
Inside the chrome_extension select the Ai_writer folder.

Click "Select" and the extension should load into Chrome.By default, when you load your extension locally, it will appear in the extensions menu Puzzle.
Pin your extension to the toolbar to quickly access your extension during development.

#### General structural overview:

    chrome_extension
    └── Ai_writer
        ├── icons
        │   ├── (icon files)
        ├── manifest.json
        ├── scripts
        │   ├── (script files)
        └── ui
            ├── popup.html
            └── popup.js

        server_side
        ├── model.py
        ├── requirements.txt
        ├── routes.py
        ├── static
        │   ├── css
        │   │   ├── style.css
        │   ├── images
        │   │   
        │   │   
        │   └── js
        │       
        │       
        └── templates

        run.py
        content.js
        cert.perm
        key.perm
        requirements.txt

#### Running the server_side:

Open a terminal and navigate to the server_side directory in the project.
Make sure you have Python 3 installed on your system.
Install the required Python packages by running the following command:

    pip install -r requirements.txt

Run the server by running the following command:

    python3 run.py


The server provides the backend functionality of the AI Writer Chrome extension, such as credits calculation and user authentication.
To enable the backend functionality, you need to run the server by following the steps outlined previously.
Once the server is running, you can access the extension's features, such as logging in via Google to authenticate your account.
When you log in, the details of your account are added to the users table in the database, if your account is new.
The database is used to store the details of the registered users, as well as other data needed by the extension's backend functionality.


After logging in, the user is directed to the dashboard, where they can see the available premium plans. 
The dashboard also provides access to various sidebar functionalities that the user can use to interact with the extension.


By using localhost ``http://localhost:<port>`` as the 'Authorized JavaScript Origins' field in the Google API Console, the following error will prevent you from using Google authentication:
> Error parsing configuration from HTML: Unsecured login_uri provided.

Google and facebook login require secured login_uri ``https`` 

When using localhost for development and testing purposes, you can use a self-signed SSL certificate to secure the connection.

I've already loaded the certificate ``cert.pem`` and private key ``key.pem`` files and configured Flask to use the certificate, so all you need to do is:
- copy the certificate file ``cert.pem`` to the ``/usr/local/share/ca-certificates`` directory: ``sudo cp /path-to-cert/cert.pem /usr/local/share/ca-certificates/``
- Update the trusted certificates: ``sudo update-ca-certificates
``
- Restart the app, localhost should now run in ``https``


Autocomplete compatible with most sites. Tested with:
https://editpad.org
https://onlinenotepad.org/
https://dnschecker.org/notepad-online.php
Linkedin

