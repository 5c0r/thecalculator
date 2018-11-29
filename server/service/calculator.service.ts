import { Service } from 'typedi';
import { GoogleDriveService } from './google-drive.service';
import { GoogleSheetService } from './google-sheets.service';

@Service()
export class CalculatorService {

    constructor(private readonly driveSvc: GoogleDriveService,
        private sheetSvc: GoogleSheetService) {

    }

    // This is quite an expensive operation, but read/ write / read 
    public async createSheet(title: string, data: any[], shared: boolean = true): Promise<string> {
        const sheetResponse = await this.sheetSvc.createGoogleSheet(title);
        const { spreadsheetId, spreadsheetUrl } = sheetResponse.data;

        const processedData = this.preProcessData(data);

        const appendResponse = await this.sheetSvc.insertDataToSheet(spreadsheetId, processedData);
        const drivePermissionResponse = await this.driveSvc.setFilePermission(spreadsheetId);


        return spreadsheetUrl;
    }

    public async addRowToSheet(sheetId: string, row: any): Promise<void> {
        // TODO: Insert data here

        const appendResponse = await this.sheetSvc.insertDataToSheet(sheetId, [row]);
        console.log('appendReesponse', appendResponse);

    }

    public async removeSheet(sheetId: string): Promise<void> {

    }

    private preProcessData(data: any[]): any[] {
        const headerRow = [
            ['Calculation', 'Result', 'Timestamp']
        ];
        const newData = data.map(value => {
            return [value.Calculation, value.Result, value.Timestamp]
        });

        return headerRow.concat(newData);
    }

} 