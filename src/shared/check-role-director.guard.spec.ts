import { TestBed } from "@angular/core/testing";
import {CheckRoleDirectorGuard} from './check-role-director.guard';

describe('ChekRoleDirector',()=>{
    let guard: CheckRoleDirectorGuard;

    beforeEach(()=>{
        TestBed.configureTestingModule({});
        guard =TestBed.inject(CheckRoleDirectorGuard);
    });

    it('should be created',()=>{
        expect(guard).toBeTruthy();
    });
});