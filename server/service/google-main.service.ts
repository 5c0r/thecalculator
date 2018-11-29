import { Service } from 'typedi';
import { google } from 'googleapis';


const scopes = [
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
];
// Unsafe to have this file , please don't use this for evil
const file = 'robot.json';

@Service()
export class GoogleInstance {
    // It should be JWT , nothing else
    public get Auth(): any {
        return this._auth;
    }
    private _auth: any;
    // public readonly googleInstance: GoogleApis;

    constructor() {
        this.authenticate();
    }

    // This is called explicitly for unit tests only
    public authenticate(): Promise<any> {
        return google.auth.getClient({
            keyFilename: file,
            scopes: scopes
        }).then((val) => {
            this._auth = val;
        }, (err) => console.error(err));
    }
}