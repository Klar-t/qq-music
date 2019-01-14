(function(){
	
	fetch('/json/rec.json')
	.then(res=>res.json())
	.then(render)
	
	function render(json){
		rederSlider(json.data.slider);
		renderRadios(json.data.radioList);
		renderPlaylists(json.data.songList);
	}
	function rederSlider(sliderjson){
		console.log(sliderjson);
		let seliders=sliderjson.map(slider=>{
			return{link:slider.linkUrl,image:slider.picUrl}
		})
		console.log(seliders);
		new Slider({
			el:document.querySelector('#slider'),
			sliders:seliders
		})
		
	}
	function renderRadios(radios){
		let radiolist=radios.map(rdios=>{
			return{picUrl:radios.picUrl,Ftitle:radios.Ftitle}
		})
		console.log(radios);
		new Redios({
			el:document.querySelector('.qq_twocol_list_normal'),
			radioList:radiolist
		})
	}
	function renderPlaylists(playlists){
		let songlist=playlists.map(songs=>{
			return{picUrl:songs.picUrl,Ftitle:songs.songListDesc}
		})
		console.log(radios);
		new Redios({
			el:document.querySelector('.qq_twocol_list_special'),
			songList:songlist
		})
	}

	let player = new MusicPlayer(document.querySelector('#player'))
	document.querySelector('.show-player').addEventListener('click', () => {
	  player.show()
	})
	function onHashChange() {
	  let hash = location.hash
	  if (/^#player\?.+/.test(hash)) {
	    let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
	    let options = matches && matches.reduce((res, cur) => {
	      let arr = cur.split('=')
	      res[arr[0]] = decodeURIComponent(arr[1])
	      return res
	    }, {})
	    player.play(options)
	  } else {
	    player.hide()
	  }
	}
	

})()
