import { TestBed } from '@angular/core/testing';

import { EditTableService } from './edit-table.service';

describe('EditTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditTableService = TestBed.get(EditTableService);
    expect(service).toBeTruthy();
  });
});
