import { TestBed } from '@angular/core/testing';

import { UIService } from './ui.service';
import { AuthGuard } from '../auth/auth-guard.service';

import { commonTestingModules, commonTestingProviders } from './common.testing';

describe('UIService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: commonTestingModules,
    providers: commonTestingProviders.concat(AuthGuard)
  }));

  it('should be created', () => {
    const service: UIService = TestBed.get(UIService);
    expect(service).toBeTruthy();
  });
});
