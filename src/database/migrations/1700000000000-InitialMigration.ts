import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1700000000000 implements MigrationInterface {
  name = 'InitialMigration1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(255) NOT NULL,
        "email" character varying(255) NOT NULL,
        "password" character varying(255) NOT NULL,
        "role" character varying NOT NULL DEFAULT 'user',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      )
    `);

    // Create access_logs table
    await queryRunner.query(`
      CREATE TABLE "access_logs" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
        "userId" uuid,
        "ipAddress" character varying(45) NOT NULL,
        "userAgent" text,
        "status" character varying(20) NOT NULL DEFAULT 'success',
        CONSTRAINT "PK_access_logs_id" PRIMARY KEY ("id")
      )
    `);

    // Add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "access_logs" 
      ADD CONSTRAINT "FK_access_logs_userId" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "IDX_users_email" ON "users" ("email")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_access_logs_userId" ON "access_logs" ("userId")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_access_logs_timestamp" ON "access_logs" ("timestamp")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "access_logs" DROP CONSTRAINT "FK_access_logs_userId"
    `);

    // Drop tables
    await queryRunner.query(`DROP TABLE "access_logs"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
