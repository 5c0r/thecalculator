import { Service } from "typedi";
import { sheets_v4, google, drive_v3 } from 'googleapis';
import { GoogleInstance } from "./google-main.service";
import { AxiosPromise } from "axios";


@Service()
export class GoogleSheetService {
    private readonly googleSheet: sheets_v4.Sheets;
    private readonly defaultSheetId = "Sheet1";

    constructor(googleInstance: GoogleInstance) {
        this.googleSheet = new sheets_v4.Sheets({
            auth: googleInstance.Auth
        }, google);
    }

    public createGoogleSheet(title?: string): AxiosPromise<sheets_v4.Schema$Spreadsheet> {
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
            range: `${this.defaultSheetId}!A1:C1`,
            valueInputOption: "USER_ENTERED",
            insertDataOption: "INSERT_ROWS",

            requestBody: {
                range: `${this.defaultSheetId}!A1:C1`,
                values: data,
                majorDimension: "ROWS"
            }
        })
    }

    public resizeColumns(id: string): AxiosPromise<sheets_v4.Schema$BatchUpdateSpreadsheetResponse> {
        return this.googleSheet.spreadsheets.batchUpdate(
            {
                spreadsheetId: id,
                requestBody: {
                    requests: [
                        {
                            autoResizeDimensions: {
                                dimensions: {
                                    sheetId: 0,
                                    dimension: 'COLUMNS',
                                    startIndex: 0,
                                    endIndex: 3
                                }
                            }
                        }
                    ]
                }
            })

    }
}