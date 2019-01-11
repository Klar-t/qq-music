

function songUrl(id) {
  return `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
}

function lyricsUrl(songid){
	return `${LYRICS_URL}?id=${songid}`;
}

function albumCoverUrl(id) {
  return `https://y.gtimg.cn/music/photo_new/T002R150x150M000${id}.jpg`
}

export function searchUrl(keyword, page = 1) {
  return `${SEARCH_URL}?keyword=${keyword}&page=${page}`
}