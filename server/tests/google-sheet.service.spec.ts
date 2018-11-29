import { GoogleInstance } from "../service/google-main.service";
import { GoogleSheetService } from "../service/google-sheets.service";


describe('Google Sheet service test', () => {
    let googleInstance: GoogleInstance;
    let sheetSvc: GoogleSheetService;

    beforeAll(async () => {
        googleInstance = new GoogleInstance();
        await googleInstance.authenticate();
        sheetSvc = new GoogleSheetService(googleInstance);
    });

    test('can do it all', async () => {
        const { spreadsheetId } = (await sheetSvc.createGoogleSheet("Hello")).data;
        expect(spreadsheetId).toBeTruthy();

        const newSheetId = (await sheetSvc.resizeColumns(spreadsheetId)).data.spreadsheetId;
        expect(spreadsheetId).toBe(newSheetId);
    });


})