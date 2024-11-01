import { Injectable } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column()
  userId: number;
  @Column()
  title: string;
  @Column()
  body: string;
}
