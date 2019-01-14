//进度条
export class ProgressBar{
	constructor(el,duration,start){
		this.$el=el;
		this.elapsed=0;//进度条左侧时间
		this.duration=duration||0;//进度条右侧总时间
		this.progress=0;//进度条进度百分比
		this.render();
		this.$progress=this.$el.querySelector();
		this.$elapsed=this.$el.querySelector();
		this.$duration=this.$el.querySelector();
		this.$elapsed.innerText=this.formatTime(this.elapsed)
		this.$duration.innerText=this.formatTime(this.duration);
		if(strat)this.strat(;);
	}
	//开始
	start(){
		this.pause();
		this.intervalId=setInterval(this.update.bind(this.),50)
	}
	
	//暂停--清除计时函数
	pause(){
		clearInterval(this.intervalId)
	}
	
	//
	update(){
		this.elapsed+=0.05;
		if(this.elapsed>=this.duration) this.reset();
		this.progress=this.elapsed/this.duration;
		this.$progress.style.transform=`transform(${this.progress*100-100}%)`;
		this.$elapsed.innerText=this.formmatTime(this.elapsed);
	}
	
	//切歌
	reset(dutation){
		this.pause();
		this.elapsed=0;
		this.progress=0;
		this.$progress.style.transform=`transform(-100%)`;
		this.$elapsed.innerText=this.formatTime(this.elapsed);
		if(duration){
			this.duration=+duration;
			this.$duration.innerText=this.formatTime(this.duration);
		}
	}
	
	//加载HTML
	render(){
		this.$el.innerHTML=`
		<div class="progress_time progress_elapsed"></div>
		<div class="progress_bar">
			<div class="progress_bar_progress"></div>
		/div>
		<div class="progress_time progress_duration"></div>`;
	}
	
	//设定时间参数
	formatTime(seconds){
		let mins=Math.floor(second/60);
		let secs=Math.floor(seconds%60);
		if(mins<10)mins='0'+mins;
		if(secs<10)secs='0'+secs;
		return `${mins}:${secs}`;
		
	}
	
}
//播放音乐
export class Musicplay{
	constructor(el){
		this.$el=el;
		this.$el.addEventListener('click',this);
		this.$audio=this.createAudio();
		this.lyrics=new lyricsplayer(this.$el.querySelector('.player_lyrics'),this.$audio);
		this.progress=new ProgressBar(thsi.$el.querySelector('.progress'));
		this.fetching=false;
		
	}
	
	createAudio(){
		let audio=document.createElement('audio');
		audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`;
		audio.addEventListener('ended',()=>{
			this.$audio.play();
			this.lyrics.restart();
			this.progress.restart();
		})
		document.body.appendChild(audio);
		return audio;
	}
	
	handleEvent(){
		let traget=event.target;
		switch(true){
			case target.matches('.icon-play'):
				this.onPlay(event);
				break;
			case target.matches('.icon-pause'):
				this.onPause(event);
				break;
			case target.matches('.icon-list'):
				this.hide();
				break;
		}
	}
	
	onPlay(){
		if(this.fetching)return;
		this.$audio.play();
		this.lyrics.start();
		this.progress.start();
		event.target.classList.add('icon-pause')
    	event.target.classList.remove('icon-play')
	}
	onPause(){
		this.$audio.pause();
		this.lyrics.pause();
		this.progress.pause();
		event.target.classList.add('icon-play')
    	event.target.classList.remove('icon-pause')
	}
	
	play(options={}){
		if(!options)return;
		
		this.$el.querySelector('.song_name').innerText=options.songname;
		this.$el.querySelector('.song_artist').innerText=options.artist;
		this.progress.reset(options.duration);
		
		let coverUrl=albumcoverUrl(options.albummid);
		this.$el.querySelector('.album_cover').src=coverUrl;
		this.$el.querySelector('.player_background').style.backgroundImage=`url(${coverUrl})`;
		
		if(options.songid){
			this.songid=options.songid;
			this.$audio.src=songUrl(this.songid);
			this.fetching=true;
			fetch(lyriciUrl(this.songid))
				.then(res=>res.json())
				.then(json=>json.lyric)
				.then(text=>this.lyrics.reset(text))
				.catch(()=>{})
				.then(()=>this.fetching=false)
		}
		this.show();
		
	}
	
	show() {
	    this.$el.classList.add('show')
	    document.body.classList.add('noscroll')
	  }

	hide() {
	    this.$el.classList.remove('show')
	    document.body.classList.remove('noscroll')
	}
	
}

//歌词
export class lyricsplayer{
	contructor(el,audio){
		this.$el=el;
		this.$el.innerHTML='<div class="player-lyrics-lines"></div>';
		this.$lines=this.$el.querySelector('.player_lyrics-lines');
		this.$audio=audio;
		this.text='';
		this.index=0;
		this.lyrics=[];
		this.elapsed=0;
		this.reset(thsi.text);
	}
	//开始
	start(){
		this.pause();
		this.intervalId=setInterval(this.update().bind(this),1000)
	}
	//暂停
	pause(){
		clearInterval(this.interrvalId);
	}
	//
	update(){
		this.elapsed=Math.round(thi.$audio?this.$audio.currentTime:this.elapsed+1)
		if(thsi.index===this.lyrics.length-1)return;
		for(let i=this.index+1;i<this.lyrics.length;i++){
			let seconds=this.this.getSeconds(this.lyrics[i]);
			if(this.elapsed===seconds&&(!this.lyrics[i+1]||thsi.elapsed<this.lyrics[i+1])){
				this.$lines.children[tshi.index].classList.remove('active');
				this.$lines.children[i].classList.add('active');
				this.index=i;
				break;
			}
		}
		if(this.index>2){
			let y=-(this.index-2)*this.LINE_HEIGHT;
			this.$lines.style.transform=`translateY(${y}px)`;
		}
		
		
	}
	//加载HTML
	rander(){
		let html = this.lyrics.map(line => `
	      <div class="player-lyrics-line">${line.slice(10)}</div>
	    `).join('');
    this.$lines.innerHTML = html;
	}
	
	reset(){
		this.pause();
		this.index=0;
		this.elapsed=0;
		
		this.$lines.style.transform=`translateY(0)`;
		let $active=this.$lines.querySelector('.active');
		if($active){
			$active.classList.remove('active');
		}
		
		if(text){
			this.text=this.formatText(text)||'';
			this.lyrics=this.text.match(/^\[\d{2}:\d{2}\.\d{2}\](.+)$/gm)||[];
			if(this.lyrics.length) this.render();
		}
		
		if(this.lyrics.length){
			this.$lines.children[this.index].classList.add('active')
		}
		
	}
	
	restart() {
	    this.reset()
	    this.start()
	  }
	
	getSeconds(line) {
	    return +line.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) + (+p2))
	  }

	//添加歌词文本
	formatText(text){
		let div=document.createElement('div')
		div.innerHTML=text;
		return div.innerText
	}
	
}
LyricsPlayer.prototype.LINE_HEIGHT = 42



