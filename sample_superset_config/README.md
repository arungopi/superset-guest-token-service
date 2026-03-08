How I made the Webapp to work with Apache Superset server?
Important changes made 
1. WTF_CSRF_ENABLED = False
2. CORS enabled and added the Webapp URL
3. TALISMAN_CONFIG or TALISMAN_DEV_CONFIG CSP must be updated with "frame-ancestors": ["'self'","http://localhost:3000", "localhost:3000","http://127.0.0.1:3000"],