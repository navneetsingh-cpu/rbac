import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, user } = request;
    const now = Date.now();
    const logPath = path.join(__dirname, '..', '..', 'audit.log');

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const logEntry = {
          timestamp: new Date().toISOString(),
          user: user ? user.email : 'anonymous',
          method,
          url,
          responseTime: `${responseTime}ms`,
        };

        fs.appendFile(logPath, JSON.stringify(logEntry) + '\n', (err) => {
          if (err) console.error('Error writing to audit log:', err);
        });
      })
    );
  }
}
