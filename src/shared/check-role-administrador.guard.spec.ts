import { TestBed } from "@angular/core/testing";
import {CheckRoleAdministradorGuard} from './check-role-administrador.guard';

describe('ChekRoleAdministrador',()=>{
    let guard: CheckRoleAdministradorGuard;

    beforeEach(()=>{
        TestBed.configureTestingModule({});
        guard =TestBed.inject(CheckRoleAdministradorGuard);
    });

    it('should be created',()=>{
        expect(guard).toBeTruthy();
    });
});