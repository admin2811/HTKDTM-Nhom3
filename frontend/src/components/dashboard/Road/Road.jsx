import React, { useEffect } from 'react';
import axios from 'axios';
import { embedDashboard } from "@superset-ui/embedded-sdk";


const supersetUrl = 'http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com'
const supersetApiUrl = supersetUrl + '/api/v1/security'
const dashboardId = "07493a36-64c7-48ac-90e5-72d8ff7998e7"

async function getToken() {

    //calling login to get access token
    const login_body = {
        "password": "admin",
        "provider": "db",
        "refresh": true,
        "username": "admin"
    };

    const login_headers = {
        "headers": {
        "Content-Type": "application/json"
        }
    }

    console.log(supersetApiUrl + '/login')
    const { data } = await axios.post(supersetApiUrl + '/login', login_body, login_headers)
    const access_token = data['access_token']
    console.log(access_token)


    // Calling guest token
    const guest_token_body = JSON.stringify({
        "resources": [
        {
            "type": "dashboard",
            "id": dashboardId,
        }
        ],
        "rls": [],
        "user": {
        "username": "report-viewer",
        "first_name": "report-viewer",
        "last_name": "report-viewer",
        }
    });

    const guest_token_headers = {
        "headers": {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + access_token
        }
    }

    console.log(supersetApiUrl + '/guest_token/')
    console.log(guest_token_body)
    console.log(guest_token_headers)
    await axios.post(supersetApiUrl + '/guest_token/', guest_token_body, guest_token_headers)
    .then(dt => {
        console.log(dt.data['token'])
        embedDashboard({
            id: dashboardId,
            supersetDomain: supersetUrl,
            mountPoint: document.getElementById("superset-container"),
            fetchGuestToken: () => dt.data['token'],
            dashboardUiConfig: { hideTitle: true }
        });
    })
    .catch(error => {
        console.error("Error in guest token request:", error.response ? error.response.data : error.message);
    });


    var iframe = document.querySelector("iframe")
    if (iframe) {
        iframe.style.width = '100%'; // Set the width as needed
        iframe.style.minHeight = '100vw'; // Set the height as needed
    }

}


// function Road() {

//     getToken()

//     return (
//         <div className="App">
//         <div id='superset-container'></div> 
//         </div>
//     );
// }

function Road() {
    useEffect(() => {
        // Gọi hàm getToken một lần sau khi component được render
        getToken();
    }, []); // [] đảm bảo useEffect chỉ chạy một lần khi component mount

    return (
        <div className="App">
            {/* Iframe để hiển thị dashboard cụ thể */}
            <iframe
                width="100%"
                height="600"
                seamless
                frameBorder="0"
                scrolling="no"
                src="http://ec2-3-106-58-241.ap-southeast-2.compute.amazonaws.com/superset/dashboard/p/a8RrWgorJgx/"
            ></iframe>
        </div>
    );
}

export default Road;