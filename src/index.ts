import { Hono } from 'hono'
import { Env } from '../worker-configuration'

const app = new Hono<{Bindings: Env}>()

type user = {
	cpf: string,
	points: number,
}
type region = {
	users: user[]
}

async function registerUsuario(cpf: string, ctx: any): Promise<user> {
	const user = JSON.parse(
		await ctx.env.users.get(cpf)
	)
	if(!user) {
		await ctx.env.users.put(cpf, JSON.stringify({ cpf, points: 0 }))
			// update da region-guaiba
		const actualregion = await getRegion(ctx);
		const newUser: user = {
			cpf, points: 0,
		}
		actualregion.users.push(newUser)
		await ctx.env.users.put("region-guaiba", JSON.stringify(actualregion))
	}


	return await ctx.env.users.get(cpf)
}

async function getRegion(ctx: any): Promise<region> {
	// deveria ser uma tabela separada, com a região de cada usuário e tudo mais.
	// mas temos pouco tempo, então vai assim msm.
	const region: region = JSON.parse(await ctx.env.users.get("region-guaiba"));
	if(!region || !region.users.length) {
		await ctx.env.users.put("region-guaiba", JSON.stringify({
			users: [],
		}))
	}
	return JSON.parse(await ctx.env.users.get("region-guaiba")) as region;
}

app.post('/register', async ctx => {
	const form = await ctx.req.json();
	
	const user = await registerUsuario(form.cpf, ctx)

	// finalizado, bora pra tela!
	return ctx.json(user)
})

// app.get('/user', async ctx => {
// 	const form = await ctx.req.json();
// })

app.post('/dar-pontos', async ctx => {
	const form = await ctx.req.json();

	const user = await registerUsuario(form.cpf, ctx)
	user.points += form.toAdd;
})

app.get('/ranking', async ctx => {
	const list = await getRegion(ctx);
	return ctx.json(list)
})

export default app