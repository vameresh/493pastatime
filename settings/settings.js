$( document ).ready(function() {

    let selected_games = [false, false, false, false];

    $("#close-settings-btn").click(function() {
        let slide = setInterval( function() {
            width = parseInt($(".settings-panel").css('width'))
            width = width * -1;
            curr_pos = parseInt($(".settings-panel").css('left'));
            new_pos = curr_pos - 40;
            if (new_pos < width) {
                clearInterval(slide);
            }
            $(".settings-panel").css('left', new_pos);
            $(".settings-header").css('left', new_pos);
        }, 10);

        setTimeout(function() {
            $("#open-panel-btn").css('display', 'block');
        }, 20);
    });

    $("#shuffle").click(function() {
        shuf_on = $(this).html() == "toggle_on";
        if (shuf_on) {
            $(this).html("toggle_off");
            $(this).css('color', 'rgb(253, 125, 125)');
        }
        else {
            $(this).html("toggle_on");
            $(this).css('color', 'green');
        }
    });
    
    $("#settings-open-btn").click(function() {
        let slide = setInterval( function() {
            width = parseInt($(".settings-panel").css('width'))
            curr_pos = parseInt($(".settings-panel").css('left'));
            new_pos = curr_pos + 40;
            if (new_pos >= 0) {
                clearInterval(slide);
            }
            $(".settings-panel").css('left', new_pos);
            $(".settings-header").css('left', new_pos);
        }, 10);

        setTimeout(function() {
            $("#open-panel-btn").css('display', 'none');
        }, 20);
    });

    $(".game-thumbnail").click(function() {
        let game_num = $(this).attr('id');
        game_num = parseInt(game_num.slice(-1));
        selected = selected_games[game_num];

        if (selected) {
            $(this).css('border', '');
            selected_games[game_num] = false;
        }
        else {
            $(this).css('border', '5px solid green');
            selected_games[game_num] = true;
        }
    });
})