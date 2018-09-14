import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({name: 'tasks'})
export class TaskEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ length: 256 })
  overview: string;

  @Column('int')
  priority: number;

  @Column()
  deadline: Date;
}
