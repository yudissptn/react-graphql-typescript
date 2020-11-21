import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveRole1605789556849 implements MigrationInterface {
    name = 'RemoveRole1605789556849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_role" DROP CONSTRAINT "PK_f7f23b5c5e924c45d3b3038ff40"`);
        await queryRunner.query(`ALTER TABLE "admin_role" DROP COLUMN "roleId"`);
        await queryRunner.query(`CREATE TYPE "admin_role_roleid_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "admin_role" ADD "roleId" "admin_role_roleid_enum" NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "admin_role" ADD CONSTRAINT "PK_f7f23b5c5e924c45d3b3038ff40" PRIMARY KEY ("roleId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin_role" DROP CONSTRAINT "PK_f7f23b5c5e924c45d3b3038ff40"`);
        await queryRunner.query(`ALTER TABLE "admin_role" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP TYPE "admin_role_roleid_enum"`);
        await queryRunner.query(`ALTER TABLE "admin_role" ADD "roleId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin_role" ADD CONSTRAINT "PK_f7f23b5c5e924c45d3b3038ff40" PRIMARY KEY ("roleId")`);
    }

}
