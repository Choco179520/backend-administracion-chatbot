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
    type: "varchar",
    name: "RESPONSE",
    length: "MAX",
  })
  response?: string;

  @ManyToOne(() => DocumentEntity, (document) => document.responses, {
    nullable: true,
  })
  @JoinColumn({
    name: "ID_DOCUMENT",
    foreignKeyConstraintName: "FK_RESPONSE_DOCUMENT",
  })
  document: DocumentEntity;
}
