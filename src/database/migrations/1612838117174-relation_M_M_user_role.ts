import {MigrationInterface, QueryRunner} from "typeorm";

export class relationMMUserRole1612838117174 implements MigrationInterface {
    name = 'relationMMUserRole1612838117174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_roles__role` (`userId` varchar(255) NOT NULL, `roleId` int NOT NULL, INDEX `IDX_0ac1a679cb8036902d99fd7324` (`userId`), INDEX `IDX_0c863994b238c0c73aae6e18f7` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_roles__role` ADD CONSTRAINT `FK_0ac1a679cb8036902d99fd7324a` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_roles__role` ADD CONSTRAINT `FK_0c863994b238c0c73aae6e18f7a` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_roles__role` DROP FOREIGN KEY `FK_0c863994b238c0c73aae6e18f7a`");
        await queryRunner.query("ALTER TABLE `user_roles__role` DROP FOREIGN KEY `FK_0ac1a679cb8036902d99fd7324a`");
        await queryRunner.query("DROP INDEX `IDX_0c863994b238c0c73aae6e18f7` ON `user_roles__role`");
        await queryRunner.query("DROP INDEX `IDX_0ac1a679cb8036902d99fd7324` ON `user_roles__role`");
        await queryRunner.query("DROP TABLE `user_roles__role`");
    }

}
