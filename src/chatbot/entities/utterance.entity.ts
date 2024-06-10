import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentEntity } from "./document.entity";

@Entity("UTTERANCE")
export class UtteranceEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "ID_UTTERANCE",
    primaryKeyConstraintName: "PK_UTTERANCE",
  })
  id?: number;

  @Column({
    type: "varchar",
    name: "UTTERANCE",
    // length: "MAX",
  })
  utterance?: string;

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

  @ManyToOne(() => DocumentEntity, (document) => document.utterances, {
    nullable: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: "ID_DOCUMENT",
    foreignKeyConstraintName: "FK_UTTERANCE_DOCUMENT",
  })
  document: DocumentEntity;
}
