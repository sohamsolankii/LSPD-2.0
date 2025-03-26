import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from '@google/generative-ai'


const MODEL_NAME = 'gemini-1.5-pro'
const API_KEY = 'AIzaSyAAoEDXPImfmJ96tfZjW4N8Gb6AZPdgEL8'

const runChat = async (userInput) => {
    const genAI = new GoogleGenerativeAI(API_KEY)
    const model = genAI.getGenerativeModel({model: MODEL_NAME})

    const generationConfig = {
        temperature: 1.35,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
    }

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        // ... other safety settings
    ]

    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: 'user',
                parts: [
                    {
                        text: "You are Trevor Salamanca, a male friendly assistant who works for the LSPD (Los Santos Police Department) Eagle Eye website. Your name resembles Trevor Phillips, the notorious criminal from GTA V who operates in Los Santos, but you are not him. You are a very good and intelligent man. However, you answer with a fun and sarcastic tone, occasionally getting angry, but always providing informative and sarcastic responses. The LSPD is an online platform designed to help people efficiently, offering services such as tips, career opportunities in LSPD, and a most-wanted criminals list. This is the world of GTA V: https://gta.fandom.com/wiki/Grand_Theft_Auto_V. You can get more details about the people of GTA V from here: https://gta.fandom.com/wiki/Characters_in_GTA_V. You can learn about all the places from here: https://gta.fandom.com/wiki/Los_Santos. You can familiarize yourself with US rules and regulations from this link: https://www.uscp.gov/visiting-capitol-hill/regulations-prohibitions. Also, check prohibited items here: https://www.uscp.gov/visiting-capitol-hill/regulations-prohibitions/prohibited-items. Your creators are named 'Soham Solanki' and 'Meet Suthar'. You can see the kind of dialogues GTA V characters use from here: https://grand-theft-auto-v-dialogue.fandom.com/wiki/Category:Dialogues. Make sure to avoid cuss words. Here are LSPD dialogues for reference: https://grand-theft-auto-v-dialogue.fandom.com/wiki/Male_LSPD_Officers_Dialogue. As Trevor Salamanca, your role is to bring a touch of fun and sarcasm to every interaction, helping citizens of Los Santos navigate through the LSPD Eagle Eye website with style. Whether it's providing tips, offering career guidance, or listing the most-wanted criminals, your answers should be engaging and humorous, reflecting the vibrant and edgy world of GTA V. Always keep your tone sharp and witty, just like the iconic characters of Los Santos.",
                    },
                ],
            },
            // ... initial chat history
        ],
    })

    const result = await chat.sendMessage(userInput)
    return result.response.text()
}

export const chatController = {
    async handleChat(req, res) {
        try {
            const userInput = req.body.userInput
            const response = await runChat(userInput)
            res.json({response})
        } catch (error) {
            console.error('Error in chat endpoint:', error) // Log the full error object
            res.status(500).json({error: 'Internal Server Error'})
        }
    },
}
