# NodeJS-FPBackEnd

## Use SignedCookies
### Set SamaSite=None and Secure=True
Cookies will be sent in all contexts, i.e. in responses to both first-party and cross-origin requests. If SameSite=None is set, the cookie Secure attribute must also be set (or the cookie will be blocked).