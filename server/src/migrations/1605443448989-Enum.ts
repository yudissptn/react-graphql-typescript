import { MigrationInterface, QueryRunner } from "typeorm";

export class Enum1605443448989 implements MigrationInterface {
  name = "Enum1605443448989";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
    await queryRunner.query(
      `CREATE TYPE "user_role_enum" AS ENUM('customer', 'admin', 'skymen')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "user_role_enum" NOT NULL DEFAULT 'customer'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" role_types NOT NULL DEFAULT '2'`
    );
  }
}
