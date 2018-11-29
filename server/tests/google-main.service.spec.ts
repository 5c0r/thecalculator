import { Container } from 'typedi';
import { GoogleInstance } from '../service/google-main.service';

describe('Google Main service', async () => {
    let service: GoogleInstance;

    beforeEach(async () => {
        service = Container.get(GoogleInstance);
        await service.authenticate();
    });

    // This is not truly tested, not really a good idea to test this 
    test('should work', () => {
        service = Container.get(GoogleInstance);
        expect(service).toBeTruthy();
        expect(service.Auth).toBeDefined();
        // service.Auth is undefined 
    });
})