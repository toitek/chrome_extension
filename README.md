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