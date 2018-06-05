import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Document } from './Document';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: number;
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Column({ type: 'varchar', select: false })
  password: string;
  @OneToMany(type => Document, document => document.user)
  documents: Document[];
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
