import { Service } from "typedi";
import { sheets_v4, google } from 'googleapis';
import { GoogleInstance } from "./google-main.service";


@Service()
export class GoogleSheetService {
    private readonly googleSheet: sheets_v4.Sheets;

    constructor(readonly googleInstance: GoogleInstance) {
        this.googleSheet = new sheets_v4.Sheets({
            auth: googleInstance.Auth
        }, google);
    }

    public async createGoogleSheet(title?: string): Promise<any> {
        return this.googleSheet.spreadsheets.create({
            requestBody: {
                properties: {
                    title: title
                }
            }
        })
    }

    public async insertDataToSheet(sheetId: string, data: any[]): Promise<any> {
        return this.googleSheet.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "Sheet1!A1:C1",
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",
            
            requestBody: {
                range:"Sheet1!A1:C1",
                values: data,
                majorDimension: "ROWS"
            }
        })
    }
}