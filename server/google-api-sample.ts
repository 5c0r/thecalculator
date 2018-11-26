const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = 'robot.json'
// google.options({})


const scopes = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
]

async function main() {
    const auth = await google.auth.getClient({
        scopes: scopes
    });

    const drive = new google.drive('v3');

    const res = await drive.files.create({
        resource: {
            name: 'Test',
            mimeType: 'text/plain'
        },
        media: {
            mimeType: 'text/plain',
            body: 'Hello World'
        }
    });

    console.log(res.data);
}

main().catch(console.error);