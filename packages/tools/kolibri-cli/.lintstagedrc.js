module.exports = {
    "**/*.{ts,tsx}": (stagedFiles) => {
        console.log('Staged Files (**/*.{ts,tsx}): ', stagedFiles)
        const strFiles = stagedFiles.join(' ');
        return [`eslint ${strFiles}`, `prettier --check ${strFiles}`]
    },
    "**/*.{md,css,scss,json}": (stagedFiles) => {
        console.log('Staged Files (**/*.{md,css,scss,json}): ', stagedFiles)
        const strFiles = stagedFiles.join(' ');
        return `prettier --check ${strFiles}`;
    }
}