import { GoogleDriveService } from "../service/google-drive.service";
import { GoogleInstance } from "../service/google-main.service";
import { GoogleSheetService } from "../service/google-sheets.service";


describe("Google Drive service test", () => {
    let googleInstance: GoogleInstance;
    let sheetSvc: GoogleSheetService;
    let sut: GoogleDriveService;

    beforeAll(async () => {
        googleInstance = new GoogleInstance();
        await googleInstance.authenticate();

        sut = new GoogleDriveService(googleInstance);
        sheetSvc = new GoogleSheetService(googleInstance);
    });

    test('smoke test', () => {
        expect(sut).toBeDefined();
        expect(sut.googleSvc).toBeDefined();
        expect(sut.driveService).toBeDefined();
    })

    test('can set file permission ', async () => {
        const { spreadsheetId } = (await sheetSvc.createGoogleSheet("Hello")).data;
        expect(spreadsheetId).toBeTruthy();
        expect(spreadsheetId.length).toBeGreaterThan(0);

        const response = await sut.setFilePermission(spreadsheetId);

        expect(response.data.kind).toBe("drive#permission");
        expect(response.data.role).toBe("reader");


    })


})