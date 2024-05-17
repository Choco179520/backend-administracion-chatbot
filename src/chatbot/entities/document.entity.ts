import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ResponseEntity } from "./response.entity";
import { UtteranceEntity } from "./utterance.entity";
import { format } from "date-fns";

@Entity("DOCUMENT")
export class DocumentEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ID_DOCUMENT",
    primaryKeyConstraintName: "PK_DOCUMENT",
  })
  id?: number;

  @Column({
    type: "varchar",
    name: "TITLE",
    length: "MAX",
  })
  title?: string;

  @Column({
    type: "int",
    name: "ID_CHATBOT",
    nullable: true
  })
  idChatbot?: number;

  @Column({
    type: "tinyint",
    name: "ESTADO",
    default: 1,
  })
  estado? = 1 | 0;

  @Column({
    type: "tinyint",
    name: "ELIMINAR",
    default: 0,
  })
  eliminar? = 1 | 0;

  @Column({
    type: "smalldatetime",
    name: "FECHA_CREACION",
    nullable: true,
  })
  fechaCreacion?: string;

  @Column({
    type: "smalldatetime",
    name: "FECHA_ACTUALIZACION",
    nullable: true,
  })
  fechaActualizacion?: string;

  @Column({
    type: "smalldatetime",
    name: "FECHA_SOLICITUD_ELIMINACION",
    nullable: true,
  })
  fechaSolicitudEliminacion?: string;

  @OneToMany(() => ResponseEntity, (response) => response.document)
  responses?: ResponseEntity[];

  @OneToMany(() => UtteranceEntity, (utterance) => utterance.document)
  utterances?: UtteranceEntity[];
}
