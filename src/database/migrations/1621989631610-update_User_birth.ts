import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserBirth1621989631610 implements MigrationInterface {
    name = 'updateUserBirth1621989631610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `birth`");
        await queryRunner.query("ALTER TABLE `user` ADD `birth` date NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `birth`");
        await queryRunner.query("ALTER TABLE `user` ADD `birth` datetime NOT NULL");
    }

}
