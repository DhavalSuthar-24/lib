import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { FlagsmithService } from "../services/flagsmith.service";

@Injectable()
export class FeatureFlagInterceptor implements NestInterceptor {
  constructor(private flagsmithService: FlagsmithService) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    this.flagsmithService.initInBackground(); // Only called if decorator is present

    return next.handle();
  }
}
