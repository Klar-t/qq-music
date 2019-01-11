
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
	
	search(keyword){
		if(this.fetching) return;
		this.keyword=keyword;
		this.fetching=ture;
		fetch()
		.then(res=>res.json())
		.then(json=>{
			this.page=json.data.song.curpage;
			this.nomore=(json.messge==='no results');
			this.songs.push(...json.data.song.list)
			return json.data.song.list;
		})
		.then(songs=.thsi.append(songs))
		.then(()=>this.fetching=false)
		.catch(()=>this.fetching=false)
	}
	
	
	append(songs){
		let html=songs.map(song=>
			``
		).join('')
		this.$songs.insertAdjacentHTML(html);
		//this.$song.innerHtml+=html;
	}
	
}










