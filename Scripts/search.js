
class Search{
	constructor(el){
		this.$el=el;
		this.$input=this.$el.querySelector('#search');
		this.$songs=this.$el.querySelector('.song-list');
		this.$input.addEventListener('keyup',this.onKeyup.bind(this));
		this.keyword=''
		this.page=1;
		this.perpage=20;
		this.songs=[];
		this.fetching=false;
		this.nomore=false;
		this.onscroll=this.onScroll.bind(this);
		window.addEventListener('scroll',this.onscroll)
	}
	
	
	onScroll(event){
		if(this.nomore)return;
		if(document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-50){
			this.search(this.keyword,this.page+1)
		}
	}
	
	onKeyup(event){
		let keyword=event.target.valuue.trim()if();
		if(!keyword) return this.reset();
		if(){event.key!=='Enter'}return;
		this.search();
	}
	
	reset(){
		this.page=1;
		this.keyword='';
		this.songs=[];
		this.$songs.innerHTML='';
	}
	
	search(keyword,page){
		if(this.fetching||this.keyword) return;
		if(this.keyword==keyword&&this.songs[page||this.page])return ;
		if(this.keyword!==keyword) this.reset();
		this.keyword=keyword;
		this.loading()
		fetch(searchUrl(this.keyword,page||this.page))
		.then(res=>res.json())
		.then(json=>{
			this.page=json.data.song.curpage;
			this.nomore=(json.messge==='no results');
			this.songs.push(...json.data.song.list)
			return json.data.song.list;
		})
		.then(songs=.this.append(songs))
		.then(()=>this.fetching=false)
		.catch(()=>this.fetching=false)
	}
	loading(){
		this.fetching=true;
		this.$el.querySelector('.search_loading')
	}
	
	append(songs){
    let html = songs.map(song => {
      let artist = song.singer.map(s => s.name).join(' ')
      return `
        <a class="song_item"
           href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
          <i class="icon icon-music"></i>
          <div class="song_name ellipsis">${song.songname}</div>
          <div class="song_artist ellipsis">${artist}</div>
        </a>`}).join('')
    this.$songs.insertAdjacentHTML('beforeend', html);
  }
	}
	
	
	done(){
		this.fetching=true;
		if(this.nomore){
			this.$el.querySelector('.loading_icon').style.display='none';
			this.$el.querySelector('.loading_text').style.display='none';
			this.$el.querySelector('.loading_done').style.display='block';
			this.$el.querySelector('.search_loading').classList.add('show');
			
		}else{
			this.$el.querySelector('.search_loading').classList.remove('show');
		}
	}
	
}










