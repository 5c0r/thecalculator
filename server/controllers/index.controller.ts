import { Controller, Req, Res, Get, Render } from 'routing-controllers';

@Controller()
export class IndexController {
    @Get("/hello")
    getHello(@Res() res) {
        res.send("Hello");
    }
}