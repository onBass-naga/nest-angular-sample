import {
  Get,
  Post,
  Body,
  Query,
  Param,
  Headers,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { Logger } from '../logger/logger.service';
import { RouteParameters, QueryParameters, UserDto } from './dto/samples.dto';
import { User } from './decorators/user.decorator';

@Controller('samples')
export class SamplesController {
  constructor(private readonly logger: Logger) {}

  @Get()
  root() {
    return {message: 'Hello world!'};
  }

  // パスから複数の値を取得
  @Get(':id/details/:detailId')
  routeParameters(
    @Param('id') id: string,
    @Param('detailId') detailId: string,
  ) {
    return {id, detailId};
  }

  // パスの値からDTOを作成
  @Get('params/:id/:detailId')
  routeParametersToDto(
    @Param() params: RouteParameters,
  ) {
    return {params};
  }

  // クエリストリングから取得
  // /samples/queries?id=1&statuses[]=pendding&statuses[]=completed
  @Get('queries')
  queries(
    @Query('id') id: string,
    @Query('statuses') statuses: string[],
  ) {
    return {id, statuses};
  }

  // クエリストリングからDTO作成
  // /samples/queries?id=1&statuses[]=pendding&statuses[]=completed
  @Get('queries2dto')
  queriesToDto(
    @Query() query: QueryParameters,
  ) {
    return {query};
  }

  // JSONからネストしたDTO
  // {
  //   "name": "Bugs Bunny",
  //   "contact": {
  //     "emails": ["foo@example.com", "bar@example.com"],
  //     "phoneNumber": "0000-00-0000"
  //   }
  // }
  @Post('user')
  @HttpCode(HttpStatus.ACCEPTED)
  dtoNested(@Body() user: UserDto) {
    this.logger.debug('dtoNested: ' + JSON.stringify(user));
    return user;
  }

  // CustomDecoratorで変換
  @Post('userWithDecorator')
  @HttpCode(HttpStatus.ACCEPTED)
  withDecorator(@User() user: UserDto) {
    this.logger.debug('withDecorator: ' + JSON.stringify(user));
    return user;
  }

  // Headerの値を取得
  @Post('header')
  @HttpCode(HttpStatus.ACCEPTED)
  header(@Headers('x-auth-token') authToken: string) {
    this.logger.debug(`authToken: ${authToken}`);
    return { authToken };
  }
}
