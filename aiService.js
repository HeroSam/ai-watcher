const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const API_KEY = process.env.FREETHEAI_API_KEY ? process.env.FREETHEAI_API_KEY.trim() : null;
const BASE_URL = 'https://api.freetheai.xyz/v1/chat/completions';

const MODEL = 'glm/glm-5.2';

if (!API_KEY) {
    console.error('❌ FREETHEAI_API_KEY is not defined in .env file');
}

async function askAI(question) {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;
    let lastError = null;

    const payload = {
        model: MODEL,
        messages: [
            {
                role: 'system',
                content: 'You are a helpful assistant. Reply in the same language the user asks.'
            },
            {
                role: 'user',
                content: question
            }
        ],
        temperature: 0.7, // يتحكم في "إبداع" الرد. (0.7 يعطي توازناً بين الإبداع والمنطق).
        max_tokens: 500
    };

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
                const response = await axios.post(
                    BASE_URL,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${API_KEY}`
                        }
                    }
                );

                const reply = response.data.choices[0].message.content;
                return reply;
        } catch (error) {
                lastError = error;
                //إذا كان الخطأ صادراً من الخادم (مثل رقم 400، 401، 500). نطبع الحالة والبيانات
                if (error.response) {
                    console.error(`❌ Server responded with status ${error.response.status}:`);
                    console.error('📄 Response data:', JSON.stringify(error.response.data, null, 2));
                
                //إذا تم إرسال الطلب لكن لم يصل أي رد (مشكلة في الشبكة).
                } else if (error.request) {
                    console.error('❌ No response received from server:', error.request);

                //إذا حدث خطأ في كتابة الكود نفسه (مثل مشكلة في بناء الطلب).
                } else {
                    console.error('❌ Error setting up request:', error.message);
                }

                if (attempt === MAX_RETRIES) {
                    break;
                }

                console.log(`⏳ Waiting ${RETRY_DELAY}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }

    throw lastError;
}

module.exports = { askAI };