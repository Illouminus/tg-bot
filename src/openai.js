import fs from "fs";
import OpenAI from "openai";
import config from 'config';


class OpenAi {
	roles = {
		ASSISTANT: 'assistant',
		USER: 'user',
		SYSTEM: 'system'
	}
	constructor(apiKey) {
		this.openai = new OpenAI({ apiKey });
		this.apiKey = apiKey;
	}
	async chat(messages) {
		try {
			const completion = await this.openai.chat.completions.create({
				messages,
				model: "gpt-3.5-turbo",
			});
			return completion.choices[0].message.content;
			//console.log(completion.choices[0]);
		} catch (error) {
			console.log(`Error chat: ${error}`);
		}
	}
	// Метод для транскрибации аудио
	async transcription(path) {
		try {
			const transcription = await this.openai.audio.transcriptions.create({
				file: fs.createReadStream(path),
				model: "whisper-1",
			});
			return transcription.text;
		} catch (error) {
			console.error(`Ошибка при вызове OpenAI API:`, error.message, error);
		}
	}
}


export const openai = new OpenAi(config.get('OPENAI_API_KEY'));