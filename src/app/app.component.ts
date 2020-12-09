import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AudioApp'; 
  audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  currentTime = "00:00:00";
  duration = "00:00:00";
  seek = 0;

  files = [
    {
      url : './assets/song1.mp3',
      name : 'Song 1'
    },
    {
      url : './assets/song2.mp3',
      name : 'Song 2'
    },
    {
      url : './assets/song3.mp3',
      name : 'Song 3'
    },
    {
      url : './assets/song4.mp3',
      name : 'Song 4'
    }
  ] ;

  streamObserver(url){
    return new Observable(observer => {

      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        // console.log(event);
        this.seek = this.audioObj.currentTime;
        this.currentTime = this.timeFormat(this.audioObj.currentTime);
        this.duration = this.timeFormat(this.audioObj.duration);
      }

      this.addEvent(this.audioObj , this.audioEvents , handler);

      return () => {
        this.audioObj.pause();
        this.audioObj.currentTime = 0;

        this.removeEvent(this.audioObj , this.audioEvents , handler);
      }
    });
  }

  addEvent(obj , events , handler){
    events.forEach(event => {
      obj.addEventListener(event , handler);
    });
  }

  removeEvent(obj , events , handler){
    events.forEach(event => {
      obj.removeEventListener(event , handler);
    });
  }

  setSeekTo(eve){
    this.audioObj.currentTime = eve.target.value;
  }

  openFile(url){
    this.streamObserver(url).subscribe(event => {});
    // console.log(url);
  }

  setVolume(eve){
    this.audioObj.volume = eve.target.value;
    // console.log(eve.target.value);
  }

  play(){
    this.audioObj.play();
    // console.log("Clicked Play");
  }

  pause(){
    this.audioObj.pause();
    // console.log("Clicked Pause");
  }

  stop(){
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
    // console.log("Clicked stop");
  }

  timeFormat(time, format="HH:mm:ss"){
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
  

}
