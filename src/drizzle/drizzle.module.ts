import { Module } from "@nestjs/common";
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

import { ConfigService } from "@nestjs/config";
import { ENV } from "../config";

import * as schema from './schema';

export const DRIZZLE = Symbol('drizzel-connection');

@Module({
    providers: [
        {
            provide: DRIZZLE,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const connectionString = configService.get<string>(ENV.DB_URL);
                const pool = new Pool({
                    connectionString,
                    ssl: true
                });

                return drizzle(
                    pool,
                    { schema }
                ) as NodePgDatabase<typeof schema>;
            }
        }
    ],
    exports: [ DRIZZLE ]
})
export class DrizzleModule {}