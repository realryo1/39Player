// YouTubeの動画IDを設定する
var videoId = "PqJNc9KVIZE";

// YouTubeのIFrame Player APIを非同期で読み込む
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// YouTubeのプレイヤーを作成する
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: videoId,
        playerVars: {
            disablekb: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0
        },
        events: {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
        }
    });
}

// プレイヤーが準備完了したときに呼び出される関数
function onPlayerReady(event) {
    // 動画の長さを取得して、シークバーの最大値を設定する
    var duration = player.getDuration();
    var seekBar = document.getElementById("seek-bar");
    seekBar.max = duration;

    // 再生・停止ボタンをクリックしたときに動画を再生・停止する関数を設定する
    var playPauseButton = document.getElementById("play-pause-button");
    playPauseButton.addEventListener("click", togglePlayPause);

    // 動画の総再生時間を表示する
    var durationSpan = document.getElementById("duration");
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
    }
    durationSpan.textContent = durationMinutes + ":" + durationSeconds;
}

// プレイヤーの状態が変更されたときに呼び出される関数
function onPlayerStateChange(event) {
    // 動画が再生中の場合、シークバーの値を更新する
    if (event.data == YT.PlayerState.PLAYING) {
        setInterval(function () {
            var currentTime = player.getCurrentTime();
            var seekBar = document.getElementById("seek-bar");
            seekBar.value = currentTime;

            // 再生時間を表示する
            var currentTimeSpan = document.getElementById("current-time");
            var currentMinutes = Math.floor(currentTime / 60);
            var currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = "0" + currentSeconds;
            }
            currentTimeSpan.textContent = currentMinutes + ":" + currentSeconds;
        }, 1000);
    }
}
// 再生・停止ボタンがクリックされたときに呼び出される関数
function togglePlayPause() {
    var playPauseButton = document.getElementById("play-pause-button");
    var seekBar = document.getElementById("seek-bar");
    if (player.getPlayerState() == YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseButton.textContent = "再生";
    } else {
        player.playVideo();
        setInterval(function () {
            var currentTime = player.getCurrentTime();
            seekBar.value = currentTime;
        }, 1000);
        playPauseButton.textContent = "停止";
    }
}

// シークバーが変更されたときに呼び出される関数
function seekTo() {
    var seekBar = document.getElementById("seek-bar");
    var time = seekBar.value;
    player.seekTo(time);
}