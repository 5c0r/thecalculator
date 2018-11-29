import { drive_v3, google } from 'googleapis';
import { Service } from 'typedi';
import { GoogleInstance } from './google-main.service';
import { AxiosPromise } from 'axios';


@Service()
export class GoogleDriveService {

    public readonly driveService: drive_v3.Drive;

    constructor(readonly googleSvc: GoogleInstance) {
        this.driveService = new drive_v3.Drive({
            auth: googleSvc.Auth
        }, google);
    }

    setFilePermission(fileId: string, type: any = { type: "anyone", role: "reader" }) : AxiosPromise<drive_v3.Schema$Permission> {
        return this.driveService.permissions.create({
            fileId: fileId,
            requestBody: type
        })
    }

    
}