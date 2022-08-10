import { TestBed } from '@angular/core/testing';

import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('correctly handles ChunkLoad error', () => {
    const spy = spyOn(window, "alert");
    const error: Error = new Error('ChunkLoadError: ERROR');
    service.handleError(error);
    expect(spy).toHaveBeenCalledWith('Erro! Falha ao carregar módulo! Recarregue a página e tente novamente.');
  });

  it('correctly handles error', () => {
    const spy = spyOn(service, "handleError");
    const error: Error = new Error('TEST ERROR');
    service.handleError(error);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
