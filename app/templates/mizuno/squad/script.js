var data = JSON.stringify({
    data: {
        name: 'NTNUI',
        logo: '/graphics/NTNUI/logo.jpg',
        players: [
            {
                number: 1,
                name: 'Rune Hamnes',
                height: 191,
                reach: '340',
                position: 'M',
                id: 127,
            },
            {
                number: 2,
                name: 'Morten Lillehagen',
                height: 203,
                position: 'K',
                reach: '340',
                id: 54,
            },
            {
                number: 3,
                name: 'Simen Henriksveen',
                height: 187,
                position: 'L',
                reach: '340',
                id: 135,
            },
            {
                number: 4,
                name: 'Espen Mokkelbost',
                height: 180,
                position: 'C',
                reach: '340',
                id: 241,
            },
            {
                number: 1,
                name: 'Vegar Løkken',
                height: 191,
                reach: '340',
                position: 'M',
                id: 127,
            },
            {
                number: 2,
                name: 'Cato S',
                height: 203,
                position: 'K',
                reach: '340',
                id: 54,
            },
            {
                number: 3,
                name: 'Jon Vegar Berntsen',
                height: 187,
                position: 'L',
                reach: '340',
                id: 135,
            },
            {
                number: 4,
                name: 'Jånn',
                height: 180,
                position: 'C',
                reach: '340',
                id: 241,
            },
        ],
    },
});

function play(str) {
    console.log(str);
    var obj = JSON.parse(str);

    $('.team-name').html(obj.data.name);

    var players = obj.data.players.sort(function(a, b) {
        if (
            a.position &&
            a.position.toLowerCase() == 'libero' &&
            b.position &&
            b.position.toLowerCase() != 'libero'
        ) {
            return 1;
        }

        a.number = parseInt(a.number);
        b.number = parseInt(b.number);
        console.log(a.number);
        if (a.number > b.number) {
            return 1;
        }
        if (a.number == b.number) {
            return 0;
        }

        if (a.number < b.number) {
            return -1;
        }
    });

    if (obj.data.logo) {
        $('.team-logo').html($('<img>').attr('src', obj.data.logo));
    }

    var html = '';
    for (var i in players) {
        var player = players[i];
        var number = '';
        if (!isNaN(player.number)) {
            number = player.number;
        }
        html +=
            '<div class="dialog-row" style="transform: translateX(-600px)">';
        html += '<div class="dialog-row-number">' + number + '</div>';
        html += '<div class="player-name">' + player.name + '</div>';
        html += '<div class="dialog-row-role">' + player.position + '</div>';
        html += '</div>';
    }

    $('.players').append(html);

    var playersElement = $('.players');
    var playerIndex = 0;

    anime({
        targets: '.dialog-heading',
        translateX: 0,
        easing: 'easeInOutCubic',
    });

    anime({
        targets: '.dialog-row',
        translateX: 0,
        easing: 'easeInOutCubic',
        delay: function(el, i, l) {
            return i * 100;
        },
        complete: function() {
            viewPlayerInfo();
        },
    });

    var viewPlayerInfo = function() {
        $('.dialog-row').removeClass('selected-player');

        if (typeof players[playerIndex] == 'undefined') {
            $('#player_image').attr('src', '');
            return;
        }

        var player = players[playerIndex];

        playersElement
            .find('.dialog-row')
            .eq(playerIndex)
            .addClass('selected-player');

        // Show the player image:
        console.log('Show player image');
        console.log(player.image);
        //$('#player_image').attr('src', 'http://poengliga.no/img_players/'+ player.id +'.jpg');

        $('.player-image').css('backgroundImage', 'url(' + player.image + ')');
        $('.player-image').attr('image', player.image);

        playerIndex++;

        if (
            typeof players[playerIndex] != 'undefined' &&
            players[playerIndex].image
        ) {
            // Wannabe preload:
            var img = new Image();
            img.src = players[playerIndex].image;
        }
        setTimeout(viewPlayerInfo, 2000);
    };
}

function remove(callback) {
    // Animate away to the bottom:
    anime({
        targets: '.dialog-heading',
        translateX: 908,
        easing: 'easeInOutCubic',
    });

    anime({
        targets: '.player-image',
        translateX: 308,
        easing: 'easeInOutCubic',
    });

    anime({
        targets: '.dialog-row',
        translateX: 908,
        easing: 'easeInOutCubic',
        delay: function(el, i, l) {
            return i * 100;
        },
        complete: function() {
            if (callback) {
                callback();
            }
        },
    });
}

if (getUrlParameter('debug')) {
    setTimeout(function() {
        play(data);
    }, 2);
}
