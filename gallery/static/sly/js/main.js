/* gallery on peppermint start */

function elNum(parent, target){
	for(var i = 0; i < parent.children.length; i++) {
            if(parent.children[i] == target){
				if(i == 0) i='0';
				return i;
			}
        }
	return false;
}

if(document.getElementById('gal-wrap') !== null){
	
	//we need to create peppermint gallery
	var pepper = document.createElement('div');
	pepper.innerHTML = $.one('#gal').innerHTML;
	var balapepper = $(pepper);
	balapepper.addClass('peppermint');
	balapepper.addClass('peppermint-inactive');
	balapepper.addClass('hidemeout');
	balapepper.attr('id', 'peppermint');
	$('#gal-wrap').append(pepper);
	
	var slider = Peppermint(document.getElementById('peppermint'), {
	  dots: false,
	  slideshow: true,
	  speed: 500,
	  slideshowInterval: 3000,
	  stopSlideshowAfterInteraction: true,
	  onSetup: function(n) {
		//console.log('Peppermint setup done. Slides found: ' + n);
	  }
	});

	$('.gallery>.block>picture').forEach(function(item){
		item.addEventListener('click', function(e) {
		//(event.preventDefault) ? event.preventDefault() : event.returnValue = false;
			Overlay.show("peppermint", {
				containerClass:"slide-up",
			});
			var e = e || event;
			var target = e.target || e.srcElement;
			target = $(target).parent().parent();
			
			var parent = target.parent();
			var num = elNum(parent[0],target[0]);
			if(num){
				slider.slideTo(num);
			}
			slider.recalcWidth();// do not delete, the slider works wrong without this line of code
			btnPrev = $('.prev');
			btnNext = $('.next');
			// Событие нажатия кнопки назад
			btnPrev.on('click', slider.prev)
			// Событие нажатия кнопки вперёд
			btnNext.on('click', slider.next)
			return false;
		});
	});

	OOP.addEventListener(Overlay, Overlay.EVENT_BEFORE_SHOW, function(evt){
		$('#peppermint').replaceClass('hideout','showin');
		$('.peppermint-slides .pictext').removeClass('hide');
		// create prev and next buttons if not exist
		var in_pepper = $('#peppermint').children();
		
		function hasPrevNext(elem){
			if($(elem).is('.prevnext')){
				return true;
			}
		}
		
		var nobut = in_pepper.some(hasPrevNext);
		//console.log(nobut);

		if(nobut !== true){
			var prevnext = document.createElement('div');
			$(prevnext).addClass('prevnext');
			prevnext.innerHTML = '<span class="prev">◁</span> <span class="next">▷</span>';
			$('#peppermint').append(prevnext);
		}else{
			slider.recalcWidth();// we need to recalculation width if prev and next buttons exists
		}
		
	});

	OOP.addEventListener(Overlay, Overlay.EVENT_AFTER_HIDE, function(evt){
		$('#peppermint').replaceClass('showin','hideout');
		$('.peppermint-slides .pictext').addClass('hide');
		//$.one('.prevnext').remove();
	});

}

/* gallery on peppermint end */

