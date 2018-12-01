import { Body, Post, Param, OnUndefined, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { CalculatorService } from '../service/calculator.service';

@Service()
@JsonController()
export class IndexController {

    constructor(readonly calculatorSvc: CalculatorService) {
        console.log('calculator service', calculatorSvc);
    }

    @Post('/createsheet')
    @OnUndefined(200)
    async createSheetWithAllResult(@Body() calculationData: any[]) {
        console.log('createSheet', calculationData);
        var spreadSheetUrl = await this.calculatorSvc.createSheet('Testti', calculationData);

        return spreadSheetUrl;
    }

    @Post('/addrow/:sheetId')
    @OnUndefined(200)
    async addSheetWithNewResult(@Param('sheetId') sheetId: string) {
        await this.calculatorSvc.addRowToSheet(sheetId, ['1+1', 2, new Date().toDateString()]);
    }
}