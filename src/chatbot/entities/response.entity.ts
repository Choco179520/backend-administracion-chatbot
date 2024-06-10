import { DocumentEntity } from "./document.entity";
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("RESPONSE")
export class ResponseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ID_RESPONSE",
    primaryKeyConstraintName: "PK_RESPONSE",
  })
  id?: number;

  @Column({
    type: "text",
    name: "RESPONSE",
    // length: "max_value",
  })
  response?: string;

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

  @ManyToOne(() => DocumentEntity, (document) => document.responses, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: "ID_DOCUMENT",
    foreignKeyConstraintName: "FK_RESPONSE_DOCUMENT",
  })
  document: DocumentEntity;
}
