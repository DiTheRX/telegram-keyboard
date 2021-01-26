const { Telegraf } = require('telegraf')
const { Keyboard, Key } = require('../../lib')

const bot = new Telegraf(process.env.BOT_TOKEN)

const mainMenuKeyboard = Keyboard.make([
    ['Main menu', 'Inline Menu'],
    ['Help'],
]).reply()

bot.start(({ reply }) => {
    return reply('Simple Keyboard', mainMenuKeyboard)
})

bot.hears('Main menu', ({ reply }) => {
    return reply('Main menu', Keyboard.make(['Back']).reply())
})

bot.hears('Back', ({ reply }) => {
    return reply('Simple Keyboard', mainMenuKeyboard)
})

bot.hears('Help', ({ reply }) => {
    return reply('Help', Keyboard.make(['Back']).reply())
})

bot.hears('Inline Menu', ({ reply }) => {
    const keyboard = Keyboard.make([
        [Key.callback('Line 1', 'hello')],
        [Key.callback('Line 2', 'my')],
        [Key.callback('Line 3', 'friend')],
    ]).inline()

    return reply('Inline Keyboard', keyboard)
})

bot.on('callback_query', (ctx) => {
    return ctx.answerCbQuery(ctx.callbackQuery.data)
})

bot.launch()
