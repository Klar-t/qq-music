


 function lazyload(images){
 	let imgs=[].slice.call(images);
 	
//IntersectionObserver ES6新API
// 	let observer=new IntersectionObserver(fucntion(entries){
// 		entries.forEach(entry=>{
// 			if(entry.intgersectionRatio>0){
// 				loadImage(entry.target,()=>{
// 					observer.unobserve(entries.target)
// 				})
// 			}
// 		})
// 	},{threshold:0.01})
// 	
// 	imgs.foreach(img=>observer.observe(img))
 	
 	window.addEventListener('scroll',onscroll)
 	window.dispatchEvent(new Event('scroll'))
 	let onscroll=throttle(fucntion(){
 		if(imgs.length===0){
 			return window.removeEventListener('scroll',onscroll)
 		}
 		imgs==imgs.filter(img=>img.classList.contains('lazyload'))
 		imgs.forEach(img=>{
 			if(inViewport(img)){
 				loadImage(img)
 			}
 		})
 	},500)
 	
 	function throttle(func,wait){
 		let prev;
 		return function(){
 			let curr=Date.now();
 			let diff=curr-prev;
 			if(!prev||diff>=wait){
 				func();
 				prev=curr;
 			}else if(diff<wait){
 				clearTimeout(timer)
 				timer=setTimeout(fn,wait-diff)
 			}
 		}
 	}
 	
 	function inViewport(img){
 		let{top,left,right,bottom}=img.getBoundingClientRect();
 		let vpWindth=document.documentElement.clientWidth;
 		let vpHeight=document.documentElement.clientHeight;
 		return(
 			(top>0&&top<vpHeight||bottom>0&&bottom<vpHeight)&&
 			(left>0&&left<vpWindth||right>0&&right<vpWindth)
 		)
 	}
 	
 	function loadImage(img,callback){
 		let image=new Image();
 		image.src=img.dataset.src;
 		image.onload=fucntion(){
 			img.src=image.src;
 			img.classList.remove('lazyload')
 			if(typeof callback==='function') callback()
 		}
 		
 	}
 	
 }









