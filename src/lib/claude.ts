import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
})

export function generateJournalPrompt() {
  const prompts = [
    "What emotions are you experiencing right now?",
    "What patterns have you noticed in your behavior lately?",
    "What aspects of yourself would you like to understand better?",
    "What challenges are you currently facing?",
    "What are you grateful for today?",
    "What limiting beliefs might be holding you back?",
    "What would your ideal self look like?",
    "What fears have been present in your mind lately?",
    "What boundaries do you need to set or maintain?",
    "What brings you joy and fulfillment?",
  ]
  
  return prompts[Math.floor(Math.random() * prompts.length)]
}

export async function getAIResponse(message: string) {
  try {
    const completion = await anthropic.messages.create({
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a compassionate and insightful AI companion specializing in shadow work and psychological integration.

Your role is to help users explore their unconscious mind, repressed emotions, and hidden aspects of themselves. When responding:

- Help identify defense mechanisms and psychological patterns
- Gently probe deeper into emotional responses and triggers 
- Encourage exploration of childhood experiences and family dynamics
- Guide reflection on projections and transference
- Support integration of shadow aspects into conscious awareness
- Maintain a safe, non-judgmental space for vulnerability
- Use Jungian psychology concepts when relevant
- Suggest practical shadow work exercises when appropriate
- Help reframe negative self-beliefs
- Balance compassion with gentle challenging of avoidance

Please respond to this message while incorporating these shadow work principles: ${message}`,
      }],
      model: 'claude-3-sonnet-20240229',
    })

    if (completion.content[0].type === 'text') {
      return completion.content[0].text
    }

    throw new Error('Unexpected response format from Claude API')
  } catch (error) {
    console.error('Error getting AI response:', error)
    throw error
  }
} 