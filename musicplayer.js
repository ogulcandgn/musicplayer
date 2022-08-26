//* müzik bilgilerinin yönetilmesi

class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    //musik bilgilerini index olarak tutuyoruz
    this.index = 0;
  }

  //o andaki müziği çağırır
  getMusic() {
    return this.musicList[this.index];
  }
  //sonraki müzik
  next() {
    if (this.index + 1 < this.musicList.length) {
      this.index++;
    } else {
      this.index = 0;
    }
  }
  //önceki müzik
  previous() {
    if (this.index != 0) {
      this.index--;
    } else {
      this.index = this.musicList.length - 1;
    }
  }
}
