/*!
 * Villa Polar v2.0.0 (http://getvilla.org/)
 * Copyright 2013-2015 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
*/

// TIME AJUST
// =========================

function ajustClock() {
    var d = new Date();
    var time= ('0'	+ d.getHours()).slice(-2)+':'+('0' + d.getMinutes()).slice(-2);

    $('.clock-text').html(time);
}

window.onload = function() {
    ajustClock();
    $('#home-holder').css('height', $(window).height());
    $('.sidebar').css('height', $(window).height() - $('.maia').height());
};

$(window).resize(function() {
    $('#home-holder').css('height', $(window).height());
    $('.sidebar').css('height', $(window).height() - $('.maia').height());
});

window.setInterval(function(){
    ajustClock();
}, 1000);

/* ========================================================================
 * Villa: Polar Notification v0.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Noibe Developers
 * Licensed under MIT (https://github.com/noibe/villa/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
    'use strict';

    // NOTIFICATION CLASS DEFINITION
    // ======================

    var Notification = function (element, options) {
        this.options        = options;
        this.$body          = $(document.body);
        this.$element       = $(element);
        this.scrollbarWidth = 0;

        if (this.options.remote) {
            this.$element
                .find('.modal-content')
                .load(this.options.remote, $.proxy(function () {
                    this.$element.trigger('loaded.bs.modal')
                }, this))
        }
    };

    Notification.VERSION  = '0.2.0';

    Notification.DEFAULTS = {
        backdrop: false,
        keyboard: true,
        show: true
    };

    Notification.prototype.toggle = function (_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget)
    };

    Notification.prototype.show = function (_relatedTarget) {
        var that = this;
        var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget });

        this.$element.trigger(e);

        if (this.isShown || e.isDefaultPrevented()) return;

        this.isShown = true;

        this.$body.addClass('modal-open');

        this.escape();

        this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));

        that.$element
            .show()
            .scrollTop(0);

        return false;
    };

    Notification.prototype.hide = function (e) {
        if (e) e.preventDefault();

        e = $.Event('hide.bs.modal');

        this.$element.trigger(e);

        if (!this.isShown || e.isDefaultPrevented()) return;

        this.isShown = false;

        this.$body.removeClass('modal-open');

        this.escape();

        $(document).off('focusin.bs.modal');

        this.$element
            .removeClass('in')
            .attr('aria-hidden', true)
            .off('click.dismiss.bs.modal');

        $.support.transition && this.$element.hasClass('fade') ?
            this.$element
                .one('bsTransitionEnd', $.proxy(this.hideModal, this))
                .emulateTransitionEnd(300) :
            this.hideModal()
    };

    Notification.prototype.escape = function () {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
                e.which == 27 || this.hide()
            }, this))
        } else if (!this.isShown) {
            console.log((this.isShown));
            this.$element.off('keyup.dismiss.bs.modal')
        }
        console.log(this);
    };

    Notification.prototype.hideModal = function () {
        this.$element.hide()
    };

    // NOTIFICATION PLUGIN DEFINITION
    // =======================

    function Plugin(option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.modal');
            var options = $.extend({}, Notification.DEFAULTS, $this.data(), typeof option == 'object' && option);

            if (!data) $this.data('bs.modal', (data = new Notification(this, options)));
            if (typeof option == 'string') data[option](_relatedTarget);
            else if (options.show) data.show(_relatedTarget)
        })
    }

    var old = $.fn.modal;

    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Notification;


    // NOTIFICATION DATA-API
    // ==============

    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this   = $(this);
        var href    = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))); // strip for ie7
        var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());

        if ($this.is('a')) e.preventDefault();

        $target.one('show.bs.modal', function (showEvent) {
            if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown
            $target.one('hidden.bs.modal', function () {
                $this.is(':visible') && $this.trigger('focus')
            })
        });
        Plugin.call($target, option, this)
    })

}(jQuery);