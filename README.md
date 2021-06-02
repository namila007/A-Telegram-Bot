# Telegram-Bot

Testing telegram bot for fun

## How to Run

1. Create a `.env` file and copy content from `.env.example`
2. Place your **Telegram App Token** value in `BOT_TOKEN` variable
3. Run `npm run start`

## Commands

### Chat Filter (Auto responses)

1. Start bot
	`/start`

2. Creates a filter. (ie: /mkfilter Hello world )
		`/mkfilter <filterWord> <..Responses>`
		
3. Remove a filter
	`/rmfilter <filterWord>`

4. Show available filters
	`/shfilters`

5. Remove all filters ( Group Admins only)
	`/rmfilters`

and the most important one :)

### Cat Pics

`/cat` - sends a random cat picture