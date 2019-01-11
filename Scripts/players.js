//进度条
class ProgressBar{
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
class Musicplay{
	constructor(el){
		this.$el=el;
		this.$el.addEventListener('click',this);
		this.$audio=this.createAudio();
		
	}
	
	createAudio(){
		let audio=document.createElement('audio');
		audio.id=``;
		audio.addEventListener('ended',()=>{
			this.$audio.play();
			
		})
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
		
	}
	onPause(){
		
	}
	
	play(options={}){
		if(!options)return;
		
		this.$el.querySelector().innerText=options.songname;
		this.$el.querySelector().innerText=options.artist;
		this.progress.reset(options.duration);
		
		let coverUrl=albumcoverUrl
	}
}

//歌词
class lyricsplayer{
	contructor(el,audio){
		this.$el=el;
		this.$el.innerHTML='';
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
		
		
		if(this.index>2){
			let y=-(this.index-2)*thsi.LINE_HEIGHT;
			this.$lines.style.transform=`translateY(${y}px)`;
		}
		
		
	}
	//加载HTML
	rander(){
		
	}
	
	reset(){
		this.pause();
		this.index=0;
		this.elapsed=0;
		//[00:00:00]sjkjk
		if(text){
			this.text=this.formatText(text)||'';
			this.lyrics=this.text.match(/^\[\d{2}:\d{2}\.\d{2}\](.+)$/gm)||[];
			if(this.lyrics.length) this.render();
		}
		
		
	}

	//添加歌词文本
	formatText(text){
		let div=document.createElement('div')
		div.innerHTML=text;
		return div.innerText
	}
	
}




