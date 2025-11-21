import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, params, query, body } = req;

    this.logger.log(`Request: ${method} ${originalUrl}`);
    this.logger.log(
      `Payload | params: ${JSON.stringify(params)} | query: ${JSON.stringify(query)} | body: ${JSON.stringify(body)}`,
    );

    next();
  }
}
