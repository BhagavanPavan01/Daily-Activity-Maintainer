const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    [/bg-white\/95/g, 'bg-slate-800/90 border border-slate-700/50'],
    [/bg-white\/20/g, 'bg-slate-800/40 border border-slate-700/50'],
    [/text-gray-800/g, 'text-slate-100'],
    [/text-gray-700/g, 'text-slate-100'],
    [/text-gray-600/g, 'text-slate-300'],
    [/text-gray-500/g, 'text-slate-400'],
    [/text-gray-400/g, 'text-slate-400'],
    [/text-gray-300/g, 'text-slate-500'],
    [/border-gray-200/g, 'border-slate-700'],
    [/border-gray-100/g, 'border-slate-700'],
    [/bg-gray-50/g, 'bg-slate-900/50'],
    [/bg-gray-100/g, 'bg-slate-700/50'],
    [/bg-gray-200/g, 'bg-slate-700'],
    [/(?<!-)bg-white(?![\/\-\w])/g, 'bg-slate-800'],
    [/from-indigo-500 to-purple-600/g, 'from-blue-600 to-violet-600'],
    [/from-indigo-600 to-purple-600/g, 'from-blue-600 to-violet-600'],
    [/text-indigo-600/g, 'text-blue-400'],
    [/text-indigo-500/g, 'text-blue-400'],
    [/text-purple-600/g, 'text-violet-400'],
    [/bg-indigo-50/g, 'bg-blue-900/30'],
    [/border-indigo-200/g, 'border-blue-700'],
    [/border-indigo-400/g, 'border-blue-500'],
    [/bg-indigo-500/g, 'bg-blue-600'],
    [/ring-indigo-400/g, 'ring-blue-500'],
    [/shadow-indigo-500\/30/g, 'shadow-blue-900/40'],
    [/shadow-sm/g, 'shadow-lg shadow-black/20'],
    [/shadow-md/g, 'shadow-xl shadow-black/30'],
    [/shadow-lg/g, 'shadow-2xl shadow-black/40'],
    [/bg-green-500/g, 'bg-emerald-500'],
    [/text-green-500/g, 'text-emerald-400'],
    [/bg-green-100 text-green-700/g, 'bg-emerald-900/40 text-emerald-400'],
    [/text-indigo-500/g, 'text-blue-400'],
    [/text-black/g, 'text-white']
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            for (const [regex, replacement] of replacements) {
                content = content.replace(regex, replacement);
            }
            fs.writeFileSync(fullPath, content);
            console.log(`Updated ${file}`);
        }
    }
}

processDir(srcDir);
