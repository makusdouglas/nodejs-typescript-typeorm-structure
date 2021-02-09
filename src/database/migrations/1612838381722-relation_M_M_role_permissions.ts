import {MigrationInterface, QueryRunner} from "typeorm";

export class relationMMRolePermissions1612838381722 implements MigrationInterface {
    name = 'relationMMRolePermissions1612838381722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `role_permissions__permission` (`roleId` int NOT NULL, `permissionId` int NOT NULL, INDEX `IDX_fadecaf3483f6b1af0b9780cfa` (`roleId`), INDEX `IDX_66d2dc53c558fe02caf494c12e` (`permissionId`), PRIMARY KEY (`roleId`, `permissionId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `role_permissions__permission` ADD CONSTRAINT `FK_fadecaf3483f6b1af0b9780cfa2` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `role_permissions__permission` ADD CONSTRAINT `FK_66d2dc53c558fe02caf494c12ed` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `role_permissions__permission` DROP FOREIGN KEY `FK_66d2dc53c558fe02caf494c12ed`");
        await queryRunner.query("ALTER TABLE `role_permissions__permission` DROP FOREIGN KEY `FK_fadecaf3483f6b1af0b9780cfa2`");
        await queryRunner.query("DROP INDEX `IDX_66d2dc53c558fe02caf494c12e` ON `role_permissions__permission`");
        await queryRunner.query("DROP INDEX `IDX_fadecaf3483f6b1af0b9780cfa` ON `role_permissions__permission`");
        await queryRunner.query("DROP TABLE `role_permissions__permission`");
    }

}
