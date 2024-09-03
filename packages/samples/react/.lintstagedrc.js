module.exports = {
    "**/*.{ts,tsx}": (stagedFiles) => {
        console.log('filename', stagedFiles)
        const strFiles = stagedFiles.join(' ');
        
        return ['eslint ' + strFiles, 'prettier ' + stagedFiles]
    },
    "**/*.md": "prettier --list-different"
}