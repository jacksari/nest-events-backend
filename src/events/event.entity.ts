import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity('event', {
  name: 'event',
})
export class Event {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 25,
  })
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'when',
  })
  when: Date;

  @Column({
    length: 100,
  })
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
