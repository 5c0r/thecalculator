import { drive_v3, google } from 'googleapis';
import { Service } from 'typedi';
import { GoogleInstance } from './google-main.service';


@Service()
export class GoogleDriveService {

    public readonly driveService: drive_v3.Drive;

    constructor(readonly googleSvc: GoogleInstance) {
        this.driveService = new drive_v3.Drive({
            auth: googleSvc.Auth
        }, google);
    }

    async setFilePermission(fileId: string, type: any = { type: "anyone", role: "reader" }) {
        await this.driveService.permissions.create({
            fileId: fileId,
            requestBody: type
        })
    }

    
}