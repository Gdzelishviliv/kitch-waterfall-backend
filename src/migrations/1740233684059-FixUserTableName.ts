import { MigrationInterface, QueryRunner } from "typeorm";

export class FixUserTableName1740233684059 implements MigrationInterface {
    name = 'FixUserTableName1740233684059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "chef" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "bio" character varying NOT NULL,
                "complianceAck" boolean NOT NULL DEFAULT false,
                "defaultCuisineType" character varying NOT NULL,
                CONSTRAINT "REL_977eded9aa02cae31c8f842d44" UNIQUE ("userId"),
                CONSTRAINT "PK_3a93de538106ed8602e2d04bbe5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "passwordHash" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'viewer',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "ingredients" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_a955029b22ff66ae9fef2e161f8" UNIQUE ("name"),
                CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "stream_ingredients" (
                "streamId" integer NOT NULL,
                "ingredientId" integer NOT NULL,
                CONSTRAINT "PK_e177d187386ac9cdb3c37a55e1c" PRIMARY KEY ("streamId", "ingredientId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "streams" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "category" text NOT NULL,
                "isLive" boolean NOT NULL DEFAULT false,
                "startedAt" TIMESTAMP,
                "location" geometry,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "chefId" integer,
                CONSTRAINT "PK_40440b6f569ebc02bc71c25c499" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "chef"
            ADD CONSTRAINT "FK_977eded9aa02cae31c8f842d444" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "stream_ingredients"
            ADD CONSTRAINT "FK_3c7d72953ed75f3063f8ccbf933" FOREIGN KEY ("streamId") REFERENCES "streams"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "stream_ingredients"
            ADD CONSTRAINT "FK_d407df5ead6ab0e0215189b0d6c" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "streams"
            ADD CONSTRAINT "FK_71e5efc5de451bfdb9b24c04606" FOREIGN KEY ("chefId") REFERENCES "chef"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "streams" DROP CONSTRAINT "FK_71e5efc5de451bfdb9b24c04606"
        `);
        await queryRunner.query(`
            ALTER TABLE "stream_ingredients" DROP CONSTRAINT "FK_d407df5ead6ab0e0215189b0d6c"
        `);
        await queryRunner.query(`
            ALTER TABLE "stream_ingredients" DROP CONSTRAINT "FK_3c7d72953ed75f3063f8ccbf933"
        `);
        await queryRunner.query(`
            ALTER TABLE "chef" DROP CONSTRAINT "FK_977eded9aa02cae31c8f842d444"
        `);
        await queryRunner.query(`
            DROP TABLE "streams"
        `);
        await queryRunner.query(`
            DROP TABLE "stream_ingredients"
        `);
        await queryRunner.query(`
            DROP TABLE "ingredients"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "chef"
        `);
    }

}
