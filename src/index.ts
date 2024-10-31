import { Hono } from 'hono'
import { Env } from '../worker-configuration'

const app = new Hono<{Bindings: Env}>()

type user = {
	cpf: string,
	points: number,
}
type region = {
	users: {cpf: string}[]
}


app.post('/register', async ctx => {
	const body = await ctx.req.json()

	if(!body.name || body.name == "") return ctx.text("Invalid name")

	const newUser = JSON.stringify({
		name: body.name,
		points: 0
	})

	// salva na lista da region
	const users_json = (await ctx.env.users.get("region-guaiba")) || "[]";
	const users = JSON.parse(users_json);
	let has = false;
	for(const u of users) {
		if(u.name == body.name) has = true;
	}
	if(!has) users.push({name: body.name});
	await ctx.env.users.put("region-guaiba", JSON.stringify(users));

	ctx.env.users.put(body.name, newUser)
	return ctx.text(newUser)
})

app.post('/darpontos', async ctx => {
	const body = await ctx.req.json()

	const userJson = await ctx.env.users.get(body.name)
	if(!userJson) return ctx.text("Doesn't exist");
	const user = JSON.parse(userJson)
	user.points += Number.parseInt(body.points) || 10;
	await ctx.env.users.put(body.name, JSON.stringify(user))

	return ctx.json(JSON.parse(await ctx.env.users.get(body.name) || '{}'))
})

app.get('/ranking', async ctx => {
	const json_allUsers = await ctx.env.users.get('region-guaiba')

	if(!json_allUsers) {
		await ctx.env.users.put('region-guaiba', JSON.stringify([]));
		return ctx.json([])
	}
	const allUsers: any[] = JSON.parse(json_allUsers);

	const users_complete = [];
	for(const user of allUsers) {
		const userFromDB = await ctx.env.users.get(user.name)
		const DBuser = JSON.parse(userFromDB!);
		users_complete.push(DBuser)
	}

	return ctx.json(users_complete)
})

app.post('/reset', async ctx => {
	await ctx.env.users.delete('region-guaiba')
	return ctx.text("Done.")
})

export default app