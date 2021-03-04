import {MigrationInterface, QueryRunner} from "typeorm";

export class ajustandoTabelasUserRolesPermissions1614834647295 implements MigrationInterface {
    name = 'ajustandoTabelasUserRolesPermissions1614834647295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Permission` ADD `type` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `Permission` DROP COLUMN `type`");
    }

}
