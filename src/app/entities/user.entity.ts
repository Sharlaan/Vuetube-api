// import { hashPassword } from '@foal/core';
// import { Group, Permission } from '@foal/typeorm';
import { hashPassword } from '@foal/core';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  channelName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // @Column()
  // permissions: (Permission | string)[];

  // @Column()
  // groups: (Group | string)[];

  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }

  // async setUserPermissions(requestedPermissions: User['permissions'][]) {
  //   for (const codeName of requestedPermissions) {
  //     const permission = await Permission.findOne({ codeName });
  //     if (!permission) {
  //       return console.log(`No permission with the code name "${codeName}" was found.`);
  //     }
  //     this.permissions.push(permission);
  //   }
  // }

  // async setUserGroups(requestedGroups: User['groups'][]) {
  //   for (const codeName of requestedGroups) {
  //     const group = await Group.findOne({ codeName });
  //     if (!group) {
  //       return console.log(`No group with the code name "${codeName}" was found.`);
  //     }
  //     this.groups.push(group);
  //   }
  // }
}
