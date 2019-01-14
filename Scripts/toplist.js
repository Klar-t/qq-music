class TopList {
  constructor(el) {
    this.$el = el
  }

  launch() {
    fetch(TOPLIST_URL)
      .then(res => res.json())
      .then(json => this.list = json.data.topList)
      .then(() => this.render())
    return this
  }

  render() {
    this.$el.querySelector('.toplist').innerHTML = this.list.map(item => 
      `<li class="top_item">
        <div class="top_item_media">
          <a href="#">
            <img class="lazyload" data-src="${item.picUrl.replace('http://', 'https://')}">
          </a>
        </div>
        <div class="top_item-info">
          <h3 class="top_item_title ellipsis">${item.topTitle}</h3>
          <ul class="top_item_list">${this.songlist(item.songList)}</ul>
        </div>
      </li>`).join('')

    lazyload(this.$el.querySelectorAll('.lazyload'))
  }

  songlist(songs) {
    return songs.map((song, i) => 
      `<li class="top_item_song">
        <i class="song_index">${i + 1}</i>
        <span class="song_name">${song.songname}</span>- ${song.singername}
      </li>`).join('')
  }
}