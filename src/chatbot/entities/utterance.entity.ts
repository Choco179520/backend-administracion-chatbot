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
    length: "MAX",
  })
  utterance?: string;

  @ManyToOne(() => DocumentEntity, (document) => document.utterances, {
    nullable: true,
  })
  @JoinColumn({
    name: "ID_DOCUMENT",
    foreignKeyConstraintName: "FK_UTTERANCE_DOCUMENT",
  })
  document: DocumentEntity;
}
