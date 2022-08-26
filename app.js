//*tanımlamaları yazıyoruz
const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev")
const next = document.querySelector("#next");
const current = document.querySelector("#current-time");
const duration = document.querySelector("#duration-time");
const progress_bar = document.querySelector("#progress-bar");
const current_time = document.querySelector("#current-time");
const volume_icon = document.querySelector("#volume-icon");
const volume_bar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");

const player = new MusicPlayer(musicList);

//sayfa yüklendiğinde gerçekleşen olaylar
window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  //başlangıçta muzik barı 0 olsun
  progress_bar.value = 0;
  //başlangıçta ses barı full olsun
  volume_bar.value = 100;
  //müzik listesinin yüklenmesi
  displayMusicList(player.musicList);
  isPlayingNow();
});

const displayMusic = (music) => {
  title.innerHTML = music.getName();
  singer.innerHTML = music.singer;
  //*img dosyasının içinden alıyoruz
  image.src = "img/" + music.img;
  //*mp3 dosyasının içinden alıyoruz
  audio.src = "mp3/" + music.file;
};

// play tuşuna bastığımızda şarkı başlar
play.addEventListener("click", () => {
  // containerde playing diye bir class var mı (bool değer döndürür)
  const isMusicPlay = container.classList.contains("playing");

  if (isMusicPlay) {
    pauseMusic();
  } else {
    playMusic();
  }
  // isMusicPlay() ? pauseMusic() : playMusic();
});

const prevMusic = () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

const nextMusic = () => {
  player.next();
  music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

//önceki şarkıya geç
prev.addEventListener("click", () => {
  prevMusic();
});

//sonraki şarkıya geç
next.addEventListener("click", () => {
  nextMusic();
});

//müzik çalıyorsa durdurur
const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("#play-button").classList = "fa-solid fa-play";
  //pause() fonksiyonu audio için default tanımlı
  audio.pause();
};

//müzik duruyorsa çalar
const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("#play-button").classList = "fa-solid fa-pause";
  audio.play();
};

//saniyeyi dakika ve saniyeye çevirir
const calculateTime = (toplamSaniye) => {
  //tam kısmını alacak
  const dakika = Math.floor(toplamSaniye / 60);
  //virgülden sonraki kısmı
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};

//müziklerin sürelerinin otomatik gelmesi
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  //proggress barın max uzunluğunu şarkıya göre belirliyoruz
  progress_bar.max = Math.floor(audio.duration);
});

//progress barın otomatik ilerlemesi
audio.addEventListener("timeupdate", () => {
  progress_bar.value = Math.floor(audio.currentTime);
  current_time.textContent = calculateTime(progress_bar.value);
});

//müziğin herhangi bir saniyesine tıklandığında şarkının oradan devam etmesi
progress_bar.addEventListener("input", () => {
  progress_bar.textContent = calculateTime(progress_bar.value);
  audio.currentTime = progress_bar.value;
});

//volume iconuna tıklanıldığında sessize alma ve icon değişikliği
let sesDurumu = "sesli";

volume_icon.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume_icon.classList = "fa-solid fa-volume-xmark";
    volume_bar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume_icon.classList = "fa-solid fa-volume-high";
    volume_bar.value = 100;
  }
});

//volume barın dinamik hale getirilmesi
volume_bar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume_icon.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume_icon.classList = "fa-solid fa-volume-high";
  }
});

//müzik listesinin oluşturulması
const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
        <li li-index='${i}' onClick="selectedMusic(this)" class="list-group-item d-flex align-items-center justify-content-between">
              <span>${list[i].getName()}</span>
              <span id="music-${i}" class="badge rounded-pill bg-primary"></span>
              <audio class="music-${i}" src="mp3/${list[i].file}"</audio>
          </li> 
    `;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

//müzik listesinden bir şarkıya basınca oynatılması
const selectedMusic = (li) => {
  const index = li.getAttribute("li-index");
  player.index = index;
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

//müzik listesinden bir şarkı seçildiğinde bg değişmesi
const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

//müziğin bittiği anda diğer müziğe geçer
audio.addEventListener("ended", () =>{
  nextMusic();
});