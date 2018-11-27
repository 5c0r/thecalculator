import { Service } from 'typedi';
import { GoogleDriveService } from './google-drive.service';
import { GoogleSheetService } from './google-sheets.service';

@Service()
export class CalculatorService {

    constructor(private readonly driveSvc: GoogleDriveService,
        private sheetSvc: GoogleSheetService) {

    }

    // This is quite an expensive operation
    public async createSheet(title: string, data: any[], shared: boolean = true): Promise<string> {
        const sheetResponse = await this.sheetSvc.createGoogleSheet(title);
        const { spreadsheetId, spreadsheetUrl } = sheetResponse.data;

        // TODO: Insert data here
        const testData = [
            ['Calculation', 'Result', 'Timestamp'],
            [' 1+ 1', 2, new Date().toDateString()],
            [' 1+ 1', 2, new Date().toDateString()],
            [' 1+ 1', 2, new Date().toDateString()]
        ]
        const appendResponse = await this.sheetSvc.insertDataToSheet(spreadsheetId, testData);
        const drivePermissionResponse = await this.driveSvc.setFilePermission(spreadsheetId);

        console.log('appendReesponse', appendResponse);

        return spreadsheetUrl;
    }

    public async addRowToSheet(sheetId: string, row: any): Promise<void> {
        // TODO: Insert data here
        
        const appendResponse = await this.sheetSvc.insertDataToSheet(sheetId, [row]);
        console.log('appendReesponse', appendResponse);

    }

    public async removeSheet(sheetId: string): Promise<void> {

    }


} 