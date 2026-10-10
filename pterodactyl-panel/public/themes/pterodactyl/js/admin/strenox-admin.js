/**
 * StrenoxCloud admin helpers.
 *
 * 1. Fallback modal dismissal: if anything ever interferes with Bootstrap's
 *    own data-dismiss handler, this delegated listener still closes the
 *    nearest open modal. Firing twice is harmless (Bootstrap's hide is
 *    idempotent), so this coexists safely with the stock behavior.
 * 2. Dismissible alerts get a pointer cursor affordance via CSS already;
 *    nothing needed here.
 */
(function ($) {
    'use strict';

    $(document).on('click.strenoxModalFix', '[data-dismiss="modal"]', function () {
        var $modal = $(this).closest('.modal');
        if ($modal.length && typeof $modal.modal === 'function') {
            $modal.modal('hide');
        }
    });

    // If a backdrop is ever left orphaned (opaque layer, no dialog),
    // clicking it removes it so the page can never stay frozen.
    $(document).on('click.strenoxModalFix', '.modal-backdrop', function () {
        if ($('.modal.in, .modal.show').length === 0) {
            $(this).remove();
            $('body').removeClass('modal-open');
        }
    });

    // Clickable rows: navigate to the thread, unless the click started
    // on a link, button, input or select inside the row.
    $(document).on('click.strenoxRows', 'tr.strenox-click-row', function (e) {
        if ($(e.target).closest('a, button, input, select, textarea').length) {
            return;
        }
        var href = $(this).data('href');
        if (href) {
            window.location.href = href;
        }
    });

    // Deterministic stacking: whenever any modal is triggered, force the
    // backdrop below the dialog with inline styles. Inline styles beat any
    // stylesheet ordering issue, so no invisible layer can ever sit between
    // the cursor and the dialog buttons.
    $(document).on('click.strenoxModalFix', '[data-toggle="modal"]', function () {
        setTimeout(function () {
            $('.modal-backdrop').css({ 'z-index': '1040', opacity: '0', background: 'none' });
            $('.modal.in, .modal.show').css('z-index', '1060');
        }, 60);
    });

    // No backdrop layer, period: strip it the moment any modal finishes
    // opening (and shortly after the trigger as a fallback). Cancel, X,
    // Create and Escape keep working; there is simply no overlay element
    // left that could ever intercept a click.
    $(document).on('shown.bs.modal.strenoxNoBackdrop', '.modal', function () {
        $('.modal-backdrop').remove();
    });
    $(document).on('click.strenoxNoBackdrop', '[data-toggle="modal"]', function () {
        setTimeout(function () {
            $('.modal-backdrop').remove();
        }, 350);
    });
})(jQuery);
