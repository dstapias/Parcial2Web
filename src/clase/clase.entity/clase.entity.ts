/* eslint-disable prettier/prettier */
/* archivo: ../../artist/artist.entity.ts */
import { BonoEntity } from "../../bono/bono.entity/bono.entity";
import { UsuarioEntity } from "../../usuario/usuario.entity/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ClaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    nombre: string;
    @Column()
    codigo: string;
    @Column()
    creditos: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.clases, { onDelete: 'SET NULL' })
    usuario: UsuarioEntity;

    @OneToMany(() => BonoEntity, bono => bono.clase)
    bonos: BonoEntity[];
}