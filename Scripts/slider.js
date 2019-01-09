class Slider{
	constructor(options={}){
		this.$el=options.el;
		this.$sliders=options.sliders;
		this.interval=options.interval||3000;
		this.index=0;
		this.render();
		this.start();
	}
	render(){
		this.$el.innerHTML='<div class="qq-slider-group">';
		this.$group=this.$el.firstElementChild;
		console.log(this.$sliders);
		this.$group.style.width=`${this.$sliders.length*100}%`;
		
		this.$group.innerHTML=this.$sliders.map(slider=>
				`<div class="qq-slider-item">
					<a href="${slider.link}">
						<img src="${slider.images}"/>
					</a>
				</div>`
		).join('')
	}
	start(){
		
		setInterval(this.next.bind(this),this.interval);
	}
	next(){
		this.index+=1;
		let x=`-${this.index*100/this.$sliders.length}%`;
		this.$group.style.transform=`translate(${x})`;
		if(this.index===this.$sliders.length-1){
			this.index=0;
		}
	}
}
class Radios{
	constructor(options={}){
		this.$el=options.el;
		this.$radioList=options.radioList;
		this.joinRadios();
	}
	joinRadios(){
		this.$el.innerHTML='<ul id="radio_wrapper" class="list_container"></ul>'
		this.$group=this.$el.firstElementChild;
		this.$group.innerHTML=this.$radioList.map(radios=>{
			`<li>
				<a class="list_main" href="#l">
					<div class="list_media">
						<img src="${radios.picUrl}"/>
						<span class="icon icon_play"></span>
					</div>
					<div class="list_info">
						<h3 class="list_tit">
							${radios.Ftitle}
						</h3>
					</div>
				</a>
			</li>`
		})
	}
	
}
