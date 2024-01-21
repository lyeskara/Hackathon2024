import { migrate } from 'drizzle-orm/neon-http/migrator';
import { db } from './db';

const main = async () => {
    await migrate(db, { migrationsFolder: './drizzle/' });
    process.exit(0);
};
main();

