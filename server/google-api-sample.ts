const fs = require('fs');
const readline = require('readline');

import { drive_v3, sheets_v4, google } from 'googleapis';
// This is not safe 
// process.env['GOOGLE_APPLICATION_CREDENTIALS'] = 'robot.json'
// google.options({})


const scopes = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
]

async function main() {
    const auth = await google.auth.getClient({
        keyFilename: 'robot.json',
        scopes: scopes
    });

    const drive = new drive_v3.Drive({
        auth: auth
    }, google);

    const speadsheet = new sheets_v4.Sheets({
        auth: auth
    }, google);


    const res = await speadsheet.spreadsheets.create({
        requestBody: {
            properties: {
                title: "Hello World"
            }
        }
    });

    console.log("Sheet creation request", res.data);

    const { spreadsheetId, spreadsheetUrl } = res.data;
    const anotherRequest = await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: {
            type: "anyone",
            role: "reader"
        }
    });

    console.log("Sheet permission request", anotherRequest.data);

    console.log("Success! Please access using this url ", spreadsheetUrl);
}

main().catch(console.error);