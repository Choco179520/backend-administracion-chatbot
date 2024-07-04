import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EstadoUsuarioEnum, RolesUsuarioEnum } from "../enums/usuario.enum";
import { Exclude } from "class-transformer";

@Entity("USUARIO")
export class UsuarioEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ID_USUARIO",
    primaryKeyConstraintName: "PK_USUARIO",
  })
  id?: number;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date

  @Column({
    type: "varchar",
    name: "NOMBRE",
    length: 100,
  })
  nombre?: string;

  @Column({
    type: "varchar",
    name: "ROL",
    length: 20,
  })
  rol?: RolesUsuarioEnum;

  @Column({
    type: "varchar",
    name: "EMAIL",
    length: 80,
    unique: true,
  })
  email?: string;

  @Exclude()
  @Column({
    type: "varchar",
    name: "PASSWORD",
  })
  password?: string;

  @Column({
    type: "date",
    name: "FECHA_ULTIMO_ACCESO",
    nullable: true,
  })
  fechaUltimoAcceso?: string;

  @Column({
    type: "tinyint",
    name: "ACTUALIZO_PASSWORD",
    default: 0,
  })
  actualizadoPassword? = 1 | 0;

  @Column({
    type: "date",
    name: "FECHA_ACT_PASSWORD",
    nullable: true,
  })
  fechaActualizacionPassword?: string;

  @Column({
    type: "text",
    name: "ESTADO",
    nullable: true,
  })
  estado? = EstadoUsuarioEnum;

  @Column({
    type: "text",
    name: "JWT_AZURE",
    nullable: true,
  })
  jwtAzure?: string;

  @Column({
    type: "text",
    name: "JWT",
    nullable: true,
  })
  jwt?: string;
}
