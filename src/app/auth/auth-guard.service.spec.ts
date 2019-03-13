import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { commonTestingModules, commonTestingProviders } from '../common/common.testing';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, commonTestingModules],
    providers: [AuthService, UiService, commonTestingProviders.concat(AuthGuard)]
  }));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
