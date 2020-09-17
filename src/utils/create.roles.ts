import { Connection } from 'typeorm';
import { Roles } from '../common/roles/default';
import { RolService } from '../services/rol.service';

export const createRoles = async (con: Connection) => {
  const roles = await RolService.getAll();

  if (roles.length == 0) {
    console.log('CREATING DEFAULT ROLES');

    let arrayRoles = [Roles.ADMIN, Roles.COLLABORATOR, Roles.GUEST, Roles.LEADER];

    arrayRoles.forEach(async function (nameRol) {
      const rol = await RolService.create(nameRol);
      console.log(rol);
    });
  }
};
