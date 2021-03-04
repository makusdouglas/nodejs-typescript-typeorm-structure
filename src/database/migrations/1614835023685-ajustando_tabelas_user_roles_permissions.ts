import {MigrationInterface, QueryRunner} from "typeorm";

export class ajustandoTabelasUserRolesPermissions1614835023685 implements MigrationInterface {
    name = 'ajustandoTabelasUserRolesPermissions1614835023685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Permission` CHANGE `name` `module` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Permission` CHANGE `module` `name` varchar(255) NOT NULL");
    }

}
