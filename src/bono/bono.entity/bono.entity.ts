import { ClaseEntity } from "../../clase/clase.entity/clase.entity";
import { UsuarioEntity } from "../../usuario/usuario.entity/usuario.entity";
import { Column, Double, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BonoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    monto: number;
    @Column('float')
    calificacion: number
    @Column()
    palabraClave: string;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.bonos)
    usuario: UsuarioEntity;
    
    @ManyToOne(() => ClaseEntity, clase => clase.bonos)
    clase: ClaseEntity;
}
