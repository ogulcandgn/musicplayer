//* müzik bilgileri

class Music {
  constructor(title, singer, img, file) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

//* şarkıcı ismi ile şarkı ismi çağırır
  getName() {
    return this.title + " - " + this.singer;
  }
}

//* müzik bilgilerinin tutulması
const musicList = [
  new Music("1) Astral", "Massaka", "4.jpg", "4.mp3"),
  new Music("2) Boşver", "Nilüfer", "1.jpeg", "1.mp3"),
  new Music("3) Bu da Geçer mi Sevgilim", "Yalın", "2.jpeg", "2.mp3"),
  new Music("4) Aramızda Uçurumlar", "Suat Suna", "3.jpeg", "3.mp3"),
];
