const { defineConfig } = require('vite');
const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir, baseDir = dir) {
    const files = {};

    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            if (item.name !== 'node_modules' && item.name !== 'dist') {
                Object.assign(files, getHtmlFiles(fullPath, baseDir));
            }
        } else if (item.name.endsWith('.html')) {
            const relativePath = path.relative(baseDir, fullPath);
            const key = relativePath.replace(/\.html$/, '').replace(/\\/g, '/');

            files[key] = fullPath;
        }
    }

    return files;
}

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: getHtmlFiles(__dirname)
        }
    }
});