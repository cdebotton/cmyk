import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid') id: number;
  @Column({ type: 'varchar', unique: true })
  title: string;
  @ManyToOne(type => User, user => user.documents)
  user: User;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
