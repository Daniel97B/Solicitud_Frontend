import { TestBed } from "@angular/core/testing";
import {CheckRoleSupervisorGuard} from './check-role-supervisor.guard';

describe('ChekRoleSupervisor',()=>{
    let guard: CheckRoleSupervisorGuard;

    beforeEach(()=>{
        TestBed.configureTestingModule({});
        guard =TestBed.inject(CheckRoleSupervisorGuard);
    });

    it('should be created',()=>{
        expect(guard).toBeTruthy();
    });
});