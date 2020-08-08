// Copyright 2020 Fazt Community ~ All rights reserved. MIT license.
import { Column, Entity, PrimaryGeneratedColumn, Index } from 'typeorm';

@Index("uk_name_team", ["nameTeam"], { unique: true })
@Entity('team')

export class TeamEntity {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
    id: number;

    @Column('character varying', { name: 'name_team', length: 45 })
    nameTeam: string;

    @Column('text', { name: 'team_description' })
    teamDescription: string;

    @Column('integer', { name: 'team_capacity' })
    teamCapacity: number;

    @Column('character varying', { name: 'state_team', length: 20 })
    stateTeam: string;
}