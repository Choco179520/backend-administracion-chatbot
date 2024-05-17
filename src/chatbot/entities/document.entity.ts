import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ResponseEntity } from './response.entity';
import { UtteranceEntity } from './utterance.entity';

@Entity('DOCUMENT')
export class DocumentEntity {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'ID_DOCUMENT',
        primaryKeyConstraintName: 'PK_DOCUMENT',
    })
    id?: number;

    @Column({
        type: 'varchar',
        name: 'TITLE',
        length: 'MAX',
    })
    title?: string;

    @Column({
        type: 'int',
        name: 'ID_CHATBOT',
    })
    idChatbot?: number;

    @Column({
        type: 'tinyint',
        name: 'ESTADO',
        default: 1,
    })
    estado? = 1 | 0;

    @OneToMany(() => ResponseEntity, (response) => response.document)
    responses?: ResponseEntity[];

    @OneToMany(() => UtteranceEntity, (utterance) => utterance.document)
    utterances?: UtteranceEntity[];
}
