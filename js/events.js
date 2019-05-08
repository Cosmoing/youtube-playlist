yp.scripts.events = function() {

const player = yp.player;
const comm = yp.comm;

//handlers
let show_advanced_view_effect = function() {
  const toggle_advanced_elem = document.getElementById('toggle-advanced');
  const body_elem = document.getElementsByTagName('body')[0];
  if(!player.advanced_view) {
    toggle_advanced_elem.innerHTML = "Show Advanced";
    body_elem.className = 'basic';
  }
  else {
    toggle_advanced_elem.innerHTML = "Hide Advanced";
    body_elem.className = 'advanced';
  }
}

let toggle_advanced = function() {
  player.advanced_view = !player.advanced_view;
  localStorage.setItem('advanced_view', JSON.stringify(player.advanced_view));
  show_advanced_view_effect();
}

let toggle_play_pause = function() {
  if(player.p.getPlayerState() === 1) { //playing
    player.p.pauseVideo();
  }
  else if(player.p.getPlayerState() === 2) { //paused
    player.p.playVideo();
    document.getElementById("play-pause").innerHTML = "Pause";
  }
}

let reload_songs = function() {
  yp.loader.reload(['songs']);
};


let volume_handle = function() {
  const volume = this.value;
  const number_elem = document.getElementById('volume-number');
  number_elem.innerHTML = volume;
  player.volume_perc = volume;
  player.set_volume();
  localStorage.setItem('volume_perc', JSON.stringify(player.volume_perc));
};

let song_order_handle = function(sel) {
  player.song_order = sel.value;
  localStorage.setItem('song_order', JSON.stringify(sel.value));
};

let skip_expected_fails_handle = function(cb) {
  player.skip_expected_fail = cb.checked;
  localStorage.setItem('skip_expected_fail', JSON.stringify(cb.checked));
};


let clear_local_storage = function() {
  localStorage.clear();
};
    
let timestamp_handle = function(cb) {
    localStorage.setItem('no_timestamp', JSON.stringify(cb.checked));
}

//attach handlers
return function() {
  if(player.player_hidden) {
    hide_player();
  }
  document.getElementById("play-pause").onclick = toggle_play_pause;
  document.getElementById("next").onclick = player.play_next;
  //document.getElementById("reload-songs").onclick = reload_songs;
  document.getElementById("comm-button").onclick = comm.onbutton;
  document.getElementById('toggle-advanced').onclick = toggle_advanced;
  show_advanced_view_effect();

  const volume_slider = document.getElementById("volume-slider");
  volume_slider.oninput = volume_handle;
  volume_slider.value = player.volume_perc;
  document.getElementById("volume-number").innerHTML = player.volume_perc;

  const song_order_sel = document.getElementById("song-order-select");
  song_order_sel.onchange = song_order_handle.bind(song_order_sel, song_order_sel);
  song_order_sel.value = player.song_order;

  const skip_fail_cb = document.getElementById("cb-skip-fail");
  skip_fail_cb.onclick = skip_expected_fails_handle.bind(skip_fail_cb, skip_fail_cb);
  skip_fail_cb.checked = player.skip_expected_fail;
    
  const no_timestamp_cb = document.getElementById("cb-nots");
  no_timestamp_cb.onclick = timestamp_handle.bind(no_timestamp_cb, no_timestamp_cb);
  no_timestamp_cb.checked = player.no_timestamp;

  document.getElementById("cb-like").onclick = yp.tag_data.tag_preference_checkbox('liked');
  document.getElementById("cb-disable").onclick = yp.tag_data.tag_preference_checkbox('disabled');
  document.getElementById("reset-preferences").onclick = yp.tag_data.reset_tag_preferences;
  document.getElementById("reset-set-tags").onclick = yp.tag_data.reset_set_tags;
  document.getElementById("export-preferences").onclick = yp.tag_data.export_preferences;
  document.getElementById("import-preferences").onclick = yp.tag_data.import_preferences_click;
  document.getElementById("hidden-import-preferences").addEventListener("change", yp.tag_data.import_preferences);

  document.getElementById("bot-host").value = comm.server_hostname;
  document.getElementById("bot-port").value = comm.server_port;
};

};