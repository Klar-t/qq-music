
const express=require('express')
const request=require('request-promise')
const app=express();
const PORT=process.env.POTT||4000

const HEADERS={
				'origin': 'https://y.qq.com'
				'authority': 'c.y.qq.com',
				'referer': 'https://y.qq.com/m/index.html',
				'accept': 'application/json',
				'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1'
			}

app.get('/',async(req,res)=>{
	const url=`https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`;
	try{
		rec.json(await request{
			uri:url,
			json:true,
			header:HEADERS
		})
	}catch(e){
		res.json({error:e.message})
	}
})

app.get('/search',async(req,res)=>{
	const {keyword,page=1}=req.query;
	const url=`curl 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${keyword}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1547088592548' -H 'origin: https://y.qq.com' -H 'accept-encoding: gzip, deflate, br' -H 'accept-language: es-ES,es;q=0.9' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1' -H 'accept: application/json' -H 'referer: https://y.qq.com/m/index.html' -H 'authority: c.y.qq.com' -H 'cookie: pgv_pvi=4456159232; RK=ZXpALk7wGo; ptcz=254d694fb597cb2f3dd34b94cc22b01f5e0c7a59e1fdb51ab4ac15d406945b14; pgv_pvid=2748160740; ts_uid=3064407730; tvfe_boss_uuid=3e59e2fe3a2d611d; pac_uid=1_809468814; pt2gguin=o0416061603; o_cookie=416061603; yqq_stat=0; pgv_info=ssid=s8617586440; pgv_si=s8109406208; ts_refer=ADTAGmyqq; qqmusic_fromtag=10; checkmask=3; ts_last=y.qq.com/m/index.html' --compressed`
	try{
		rec.json(await request{
			uri:url,
			json:true,
			header:HEADERS
		})
	}catch(e){
		res.json({error:e.message})
	}
})


app.listen(PORT)



