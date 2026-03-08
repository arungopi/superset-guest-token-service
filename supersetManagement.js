const { default: axios } = require("axios");
 
 async function getGuestToken(dashboardId) {
        
        const supersetApiUrl =  `${process.env.SUPERSET_URL}/api/v1/security`;
        const loginBody = {
            password: 'admin',
            provider: 'db',
            refresh: true,
            username: 'admin',
        };

        const loginHeaders = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`${supersetApiUrl}/login`, loginBody, loginHeaders);
        const accessToken = data['access_token'];


        //  Get CSRF Token
        const csrfHeaders = {
            headers: {
                'Authorization': `Bearer ${accessToken}`,  // Use the access token here
            },
            withCredentials : true
        };

        const csrfResponse = await axios.get(`${supersetApiUrl}/csrf_token/`, csrfHeaders);
        const csrfToken = csrfResponse.data.result;
                
        const guestTokenBody = JSON.stringify({
            resources: [{ type: 'dashboard', id: dashboardId }],
            rls: [],
            user: {
                username: 'admin',
                first_name: 'Superset',
                last_name: 'Admin',
            },
        });

        const guestTokenHeaders = {

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
                'X-CSRFToken': csrfToken,  // Updated to hyphen case
            },
            withCredentials : true
            
        };

        const tokenResponse = await axios.post(`${supersetApiUrl}/guest_token/`, guestTokenBody, guestTokenHeaders);
        return tokenResponse.data['token'];
    }

    module.exports = {getGuestToken}