
$(document).ready(function() {
    var container = $("#container");
    window.loadMenus(container);
    window.initialHide(container);
    container.masonry();

    $('#selectrestaurants').on('click', function(e) {
        e.stopPropagation();

        var $target = $(e.target);
        var checkbox;
        if($target.val() === '') {
            checkbox = $target.children('input').length > 0 ? $target.children('input') : $target.siblings('input');
            checkbox.prop('checked', !checkbox.prop('checked'));
        }
        else {
            checkbox = $target;
        }

        var id = checkbox.val();
        var section;
        if(checkbox.prop('checked'))//show
        {
            section = window.hiddenRestaurants[id.toString()];
            delete window.hiddenRestaurants[id.toString()];
            container.append(section).masonry('appended', section).masonry();
        }
        else//hide
        {
            section = $('section[data-restaurant-id=' + id + ']', container);
            window.hiddenRestaurants[id.toString()] = section;
            container.masonry('remove', section).masonry();
        }

        var unChecked = [];
        $('input[type="checkbox"]', this).each(function() {
            if(!$(this).prop('checked')) {
                unChecked.push($(this).val());
            }
        });
        window.writeCookie('hiddenRestaurants', unChecked.join(','), 10 * 365);
    });
});

window.initialHide = function(cont) {
    window.hiddenRestaurants = {};

    var hidden = window.readCookie("hiddenRestaurants");
    if(typeof hidden === "undefined") {
        return;
    }

    hidden = hidden.split(",");

    $("section", cont).each(function() {
        var section = $(this);
        var restaurantId = section.data("restaurantId");
        if(hidden.indexOf(restaurantId.toString()) > -1)//hide section
        {
            window.hiddenRestaurants[restaurantId.toString()] = section;
            section.remove();
            $('input[type=checkbox][value=' + restaurantId + ']', '#selectrestaurants').prop('checked', false);
        }
    });
};
