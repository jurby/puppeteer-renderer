#### This is a fork with limited features

# Puppeteer(Chrome headless node API) based web page renderer

Puppeteer(Chrome headless node API) based web page renderer.
Will only output PDF files. This is not safe and should not be used for
public services. Any URL can be printed to pdf, even file:///etc/passwd.

## Getting Started

### Start server using docker (If you can not run Chromium and installed docker)
`docker run -d --name renderer -p 3000:3000 hmtx/puppeteer-pdf`

### Test on your browser
Input url `http://localhost:{port}/?url=https://www.google.com`

Optional arguments are:

- username
- password
- format ("A4", "A3", "Letter" etc.)
- landscape (true|false)
- url (must be set)

