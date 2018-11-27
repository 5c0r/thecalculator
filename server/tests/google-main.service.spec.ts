import { Container } from 'typedi';
import { GoogleInstance } from '../service/google-main.service';

describe('Google Main service', () => {
    let service: GoogleInstance;

    // This is not truly tested, not really a good idea to test this 
    test('should work', () => {
        service = Container.get(GoogleInstance);
        expect(service).toBeTruthy();
        // console.log('service', service);
        // expect(service.Auth).toBeTruthy();
    });
})