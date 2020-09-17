import { Connection } from 'typeorm';
import { Roles } from '../common/roles/default';
import { RolService } from '../services/rol.service';
import { RolUserService } from '../services/rol-user.service';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERNAME } from '../config';
import { UserState } from '../common/enumerations/state';

export const createData = async (con: Connection) => {
  const roles = await RolService.getAll();

  if (roles.length == 0) {
    console.log('CREATING DEFAULT ROLES');

    let arrayRoles = [Roles.ADMIN, Roles.COLLABORATOR, Roles.GUEST, Roles.LEADER];

    arrayRoles.forEach(async function (nameRol) {
      const rol = await RolService.create(nameRol);
      console.log(rol);
    });

    const adminData: UserEntity = {
      email: ADMIN_EMAIL,
      name: 'fazt',
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
      imagePath: '',
      userDescription: '',
      stateUser: UserState.ACTIVE
    };

    const userCreated = await UserService.createUser(adminData);

    if (userCreated) {
      console.log('CREATING DEFAULT ADMIN');
      console.log(userCreated);

      const rolGuest = await RolService.getNameRol(Roles.ADMIN);

      if (rolGuest) {
        await RolUserService.assignRol(userCreated.id, rolGuest.id);
      }
    }
  }
};
