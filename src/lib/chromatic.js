import dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'child_process';

execSync(`npx chromatic --project-token=${process.env.CHROMATIC_PROJECT_TOKEN}`, {
  stdio: 'inherit',
});