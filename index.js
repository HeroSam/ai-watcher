async function handleFileChange() {
    if (isProcessing) {
        console.log('⏳ Already processing, skipping duplicate event.');
        return;
    }

    isProcessing = true;
    try {
        const question = getLastUserQuestion();
        if (!question) {
            //console.log('⚠️ No new question found ($$ detected or file empty). Ignoring change.');
            return;
        }
        console.log('📝 Detected change in file...');
        console.log(`🤖 Sending to AI: "${question}"`);

        const answer = await askAI(question);

        appendReply(answer);

        console.log('✅ Done processing.');
    } catch (error) {
        console.error('❌ AI failed:', error.message);
        const errorLine = `\nError: ${error.message} $$\n`;
        fs.appendFileSync(FILE_NAME, errorLine, 'utf8');
    } finally {
        isProcessing = false;
    }
}

const fs = require("fs");
const { askAI } = require('./aiService');
const {watchFile, setFileName, getLastUserQuestion, appendReply} = require("./fileHandle");

const FILE_NAME = 'questions.txt';
setFileName(FILE_NAME);
let isProcessing = false;

watchFile(handleFileChange);

process.on('SIGINT', () => {
    console.log('\n🛑 Stopped watching.');
    process.exit(0);
});