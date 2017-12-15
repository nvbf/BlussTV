var data = JSON.stringify({
    data: {
        homeTeam: {
            name: 'BK Tromsø',
            logo: '/graphics/logo/bktromso.svg',
            sets: 2,
            points: 20,
            pointsSets: [25, 20, 19],
        },
        awayTeam: {
            name: 'Tif Viking',
            logo: '/graphics/logo/viking.svg',
            sets: 1,
            points: 20,
            pointsSets: [23, 25, 25],
        },
    },
});

function play(str) {
    update(str);
}

var oldData = null;
var intervalId = null;
var isShowing = true;

function renderSets(sets) {
    return sets.map(set => `<div class="sb-prev-set">${set}</div>`).join('');
}

function showPrevSets() {
    clearInterval(intervalId);
    intervalId = setTimeout(hidePrevSets, 8000);
    console.log('showing prev sets');
    isShowing = true;
    $('.sb-prev-set').velocity({ width: 67 }, { duration: 300 });
    $('.sb-prev-set').velocity({ opacity: 1 }, { duration: 300 });
}

function hidePrevSets() {
    console.log('hiding prev sets');
    $('.sb-prev-set').velocity({ opacity: 0 }, { duration: 300 });
    $('.sb-prev-set').velocity({ width: 0 }, { duration: 300 });
    isShowing = false;
}

function update(str) {
    var data = JSON.parse(str).data;
    if (JSON.stringify(data) === JSON.stringify(oldData) || !data) {
        return;
    }
    oldData = data;

    // We might want to show previous sets:
    const rest = (data.homeTeam.points + data.awayTeam.points) % 10;
    const hasOne = data.homeTeam.sets > 0 || data.awayTeam.sets > 0;
    const shouldShowSet = hasOne && rest === 0;

    console.log(rest, hasOne, shouldShowSet);

    document.getElementById('homeTeamLogo').src = data.homeTeam.logo;
    document.getElementById('awayTeamLogo').src = data.awayTeam.logo;

    document.getElementById('homeTeamName').innerHTML = data.homeTeam.name;
    document.getElementById('awayTeamName').innerHTML = data.awayTeam.name;

    document.getElementById('homeTeamSets').innerHTML = data.homeTeam.sets;
    document.getElementById('awayTeamSets').innerHTML = data.awayTeam.sets;

    document.getElementById('homeTeamPoints').innerHTML = data.homeTeam.points;
    document.getElementById('awayTeamPoints').innerHTML = data.awayTeam.points;

    const numSets = data.homeTeam.sets + data.awayTeam.sets;

    if (shouldShowSet) {
        document.getElementById('homeTeamPrevSets').innerHTML = renderSets(
            data.homeTeam.pointsSets.slice(0, numSets),
        );

        document.getElementById('awayTeamPrevSets').innerHTML = renderSets(
            data.awayTeam.pointsSets.slice(0, numSets),
        );
    }

    if (shouldShowSet) {
        showPrevSets();
    } else {
        hidePrevSets();
    }
}

function remove() {}

play(data);
