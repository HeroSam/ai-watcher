// this function ensure that our concerned file exist or creating it
function ensureFileExists(){
    if(!fs.existsSync(fileName)){
        const header = '--- Questions and Answers Log ---\n';
        fs.writeFileSync(fileName, header, 'utf8');
        console.log(`📄 Created ${fileName} automatically.`);
    }
}

//_____________________________________________________________________________________
//this function return a string of last user question or null if no question
function getLastUserQuestion() {
    const content = fs.readFileSync(fileName, 'utf8');
    const lines = content.split(/\r?\n/);

    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i].trim();
        if (line === '') continue;

        //return null if line end with $$ because it is an AI
        if (line.endsWith('$$') || line.startsWith('Error:') || line === "--- Questions and Answers Log ---") {
            return null;
        }

        return line;
    }

    return null;
}

//_____________________________________________________________________________________
// this function append the AI reply to the file
function appendReply(reply) {
    const replyLine = `\nAI: ${reply} $$\n`;
    fs.appendFileSync(fileName, replyLine, 'utf8');
    console.log('✅ Reply written to file.');
}
//_____________________________________________________________________________________
// this function append the AI reply to the file
function setFileName(name){
    fileName = name;
}

//_____________________________________________________________________________________
// this function for watching the file and ensure that the current content changed
function watchFile(callback) {
    // ensuring that file exist.
    ensureFileExists();

    console.log(`👀 Watching ${fileName}...`);
    console.log('✏️ Write your question in the file and save (Ctrl+S).');
    console.log('🛑 Press Ctrl+C to stop.');

    // watching file using fs.watch and change event
    fs.watch(fileName, (eventType) => {
        if (eventType === 'change') {
            callback();
        }
    });
}

let fileName;
const fs = require("fs");

module.exports = {
    setFileName,
    getLastUserQuestion,
    appendReply,
    watchFile
};