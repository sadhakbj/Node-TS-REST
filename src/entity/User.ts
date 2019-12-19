import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BaseEntity} from "typeorm";
import {hash}  from 'bcryptjs'

@Entity("auth_users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    fullname: string;

    @Column()
    password: string;

    @Column({unique: true})
    email: String;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await hash(this.password, 12);
    }

}
