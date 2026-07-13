import fs from 'fs';
import path from 'path';

const dir = 'e:/codings/Daily Activity Website/src';

const replacements = [
    { regex: /bg-slate-900(?![/\w-])/g, replace: 'bg-white dark:bg-slate-900' },
    { regex: /bg-slate-900\//g, replace: 'bg-white/ dark:bg-slate-900/' },
    { regex: /bg-slate-800(?![/\w-])/g, replace: 'bg-slate-50 dark:bg-slate-800' },
    { regex: /bg-slate-800\//g, replace: 'bg-slate-100/ dark:bg-slate-800/' },
    { regex: /bg-slate-700(?![/\w-])/g, replace: 'bg-slate-200 dark:bg-slate-700' },
    { regex: /bg-slate-700\//g, replace: 'bg-slate-200/ dark:bg-slate-700/' },

    { regex: /border-slate-700(?![/\w-])/g, replace: 'border-slate-200 dark:border-slate-700' },
    { regex: /border-slate-700\//g, replace: 'border-slate-200/ dark:border-slate-700/' },
    { regex: /border-slate-800(?![/\w-])/g, replace: 'border-slate-300 dark:border-slate-800' },
    { regex: /border-slate-800\//g, replace: 'border-slate-300/ dark:border-slate-800/' },

    { regex: /text-slate-200(?![/\w-])/g, replace: 'text-slate-700 dark:text-slate-200' },
    { regex: /text-slate-300(?![/\w-])/g, replace: 'text-slate-600 dark:text-slate-300' },
    { regex: /text-slate-400(?![/\w-])/g, replace: 'text-slate-500 dark:text-slate-400' },
    { regex: /text-slate-500(?![/\w-])/g, replace: 'text-slate-400 dark:text-slate-500' },
    { regex: /text-slate-600(?![/\w-])/g, replace: 'text-slate-300 dark:text-slate-600' },

    { regex: /text-white(?![/\w-])/g, replace: 'text-slate-900 dark:text-white' },
];

function walk(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content;
            replacements.forEach(({ regex, replace }) => {
                modified = modified.replace(regex, replace);
            });
            if (content !== modified) {
                fs.writeFileSync(fullPath, modified, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    });
}

walk(dir);
console.log("Done replacing classes.");
