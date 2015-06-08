//------------------------
// STICKY ELEMENTS WIDGET
//-----------------------
(function ($) {

	$.widget('stickyElement', {
		options: {
			//are there other fixed elements  above this one?
			offset: 0,
			//when scrollbar meets this point, stick the element
			beginStick: 0,
			container: $('body'),
			// if true, will keep element in a calculated left position relative to parent.
			marginAdjust: 'false',
			marginLeft: 0,
			disabled: false,
			bottomStick: false,
			baseHeight: 0,
			endStickElement: false
		},
		_create: function () {
			var 
				that = this,
				options = that.options,
				$win = $(window)
			;
			that.element.addClass('ui-widget-sticky-item');
			$win.bind('scroll', function () {
				that.scrollStick();
			});

			$win.bind('resize', function () {
				that.resizeAdjust();
			});

			if (options.bottomStick === true) {
				// stick element on init if window height is above base height
				if ($win.height() > options.baseHeight) {
					this.element.addClass('is-stuck');
				}
			}

		},
		scrollStick: function () {
			var 
				that = this,
				element = that.element,
				options = that.options,
				disabled = that.options.disabled,
				$win = $(window),
				winPos = $win.scrollTop(),
				originalPosition = element.offset().left,
				containerWidth = options.container.width(),
				maxWidth = parseInt(options.container.css('max-width').split('px')[0], 10)
			;
			if (disabled === false) {
				if (winPos > options.beginStick) {
					element.addClass('is-stuck');
					// IE8 Fix: repaint the page after the is-stick class is added.
					$('body').addClass('ie8').removeClass('ie8');
					if (options.marginAdjust === true) {
						that._adjustPosition('left', originalPosition + 'px');
					}
					if (options.bottomStick === true) {
						if (that._isVisible(options.endStickElement)) {
							element.removeClass('is-stuck').addClass('bottom-stuck');
						} else {
							element.removeClass('bottom-stuck').addClass('is-stuck');
						}
					}
				} else {
					//unstick the element
					originalPosition = element.offset().left
					element.removeClass('is-stuck');
					// IE8 Fix: repaint the page after the is-stick class is removed.
					$('body').addClass('ie8').removeClass('ie8');
					if (options.bottomStick === true) {
						// stick element on init if window height is above base height
						if ($win.height() > options.baseHeight) {
							this.element.addClass('is-stuck');
						}
					}
					//return it from whence it came
					if (options.marginAdjust === true) {
						that._adjustPosition('left', 'auto');
					}
				}
			}
		},
		resizeAdjust: function () {
			var 
				that = this,
				element = that.element,
				options = that.options,
				disabled = that.options.disabled,
				$win = $(window),
				containerWidth = options.container.width(),
				containerMargin = options.container.offset().left,
				maxWidth = parseInt(options.container.css('max-width').split('px')[0], 10)
			;
			if (disabled === false) {
				// update original position:
				originalPosition = containerMargin + containerWidth - element.width();
				if (options.marginAdjust === true) {
					if ($win.width() < maxWidth) {
						element.css('left', 'auto');
						element.addClass('stick-right');
					} else {
						//maintain the position of the element
						element.removeClass('stick-right');
						element.css('left', originalPosition + 'px');
					}
				}
			}
		},
		_adjustPosition: function (direction, amount) {
			this.element.css(direction, amount);
		},
		_isVisible: function ($element) {
			var 
				docViewTop = $(window).scrollTop(),
				docViewBottom = docViewTop + $(window).height(),
				elemTop = $element.offset().top,
				elemBottom = elemTop + $element.height()
			;

			return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
		},
		destroy: function () {
			$(window).unbind('scroll');
			this.element.removeClass('is-stuck ui-widget-sticky-item');
		}
	});
})(jQuery);
