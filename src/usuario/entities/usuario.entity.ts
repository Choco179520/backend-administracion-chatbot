import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {Exclude} from "class-transformer";

@Entity('USUARIO')
export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'ID_USUARIO',
        primaryKeyConstraintName: 'PK_USUARIO',
    })
    id?: number;

    @Column({
        type: 'varchar',
        name: 'NOMBRE',
        length: 100,
    })
    nombre?: string;

    @Column({
        type: 'varchar',
        name: 'ROL',
        length: 20
    })
    rol?: string;

    @Column({
        type: 'varchar',
        name: 'EMAIL',
        length: 80,
        unique: true
    })
    email?: string;

    @Column({
        type: 'varchar',
        name: 'TELEFONO',
        length: 10,
    })
    telefono?: string;

    @Column({
        type: 'smalldatetime',
        name: 'FECHA_ULTIMO_ACCESO',
        nullable: true
    })
    fechaUltimoAcceso?: string;

    @Exclude()
    @Column({
        type: 'smalldatetime',
        name: 'FECHA_REGISTRO',
    })
    fechaRegistro?: string;

    @Column({
        type: 'tinyint',
        name: 'ESTADO',
        default: 1,
    })
    estado? = 1 | 0;

}
