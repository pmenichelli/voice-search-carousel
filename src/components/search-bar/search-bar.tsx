import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import icons from '../../assets/icon/icon';
import { dtSpeechRecognition } from './speech-recognition'

@Component({
  tag: 'dt-search-bar',
  styleUrl: 'search-bar.scss',
  shadow: true
})
export class SearchBar {
  private speechRecognition;
  private query: string;
  private finalTranscript = '';
  private ignoreOnend;
  private startTimestamp;

  @Event() private dtQueryChange: EventEmitter;

  @State() private recognizing = false;

  @Prop() public lang: string = 'en-US';

  constructor() {
    this.onMicButtonClick = this.onMicButtonClick.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSpeechRecognitionStart = this.onSpeechRecognitionStart.bind(this);
    this.onSpeechRecognitionError = this.onSpeechRecognitionError.bind(this);
    this.onSpeechRecognitionEnd = this.onSpeechRecognitionEnd.bind(this);
    this.onSpeechRecognitionResult = this.onSpeechRecognitionResult.bind(this);
  }

  componentDidLoad() {
    this.speechRecognition = dtSpeechRecognition();
    if (!this.speechRecognition) {
      // disable mic button
      // start_img.src = 'mic-slash.gif';
    } else {
      this.speechRecognition.onstart = this.onSpeechRecognitionStart;
      this.speechRecognition.onerror = this.onSpeechRecognitionError;
      this.speechRecognition.onend = this.onSpeechRecognitionEnd;
      this.speechRecognition.onresult = this.onSpeechRecognitionResult;
    }
  }

  render() {
    const micIconCasses = `dt-search-bar__mic-icon ${this.recognizing ? 'dt-search-bar__mic-icon--recording' : ''}`
    return (
        <div class='dt-search-bar'>
          <div class='dt-search-bar__input-container'>
            <input
              class='dt-search-bar__input'
              placeholder='Search books'
              value={this.query}
              onChange={this.onInputChange}/>
            <div class='dt-search-bar__search-icon' onClick={this.onSearchButtonClick}>{ icons.search }</div>
          </div>

          <div class={micIconCasses} onClick={this.onMicButtonClick}>
            { this.recognizing && <div class="outer"></div> }
            { this.recognizing && <div class="outer-2"></div> }
            <div class='mic-icon'>{icons.mic}</div>
          </div>
        </div>
    );
  }

  private recordMicInput(timeStamp) {
    if (this.recognizing) {
      this.speechRecognition.stop();
      return;
    }
    this.finalTranscript = '';
    this.speechRecognition.lang = this.lang;
    this.speechRecognition.start();
    this.ignoreOnend = false;
    this.startTimestamp = timeStamp;
  }

  private capitalize(string: string) {
    const firstCharRegex = /\S/;
    return string.replace(firstCharRegex, function(m) { return m.toUpperCase(); });
  }

  private onMicButtonClick(event: Event) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((res) => {
        console.log({res});
        this.recordMicInput(event.timeStamp);
      });
  }

  private onSearchButtonClick() {
    this.dtQueryChange.emit(this.query);
  }

  private onInputChange(event: Event) {
    console.log(event);
    this.query = (event.target as HTMLInputElement).value;
  }

  private onSpeechRecognitionStart = function() {
    this.recognizing = true;
    console.log('Speak now.');
  };

  private onSpeechRecognitionError = function(event) {
    if (event.error == 'no-speech') {
      // start_img.src = 'mic.gif';
      console.log('No speech was detected. You may need to adjust your microphone settings');
      this.ignoreOnend = true;
    }
    if (event.error == 'audio-capture') {
      // start_img.src = 'mic.gif';
      console.log('No microphone was found. Ensure that a microphone is installed and that microphone settings are configured correctly.');
      this.ignoreOnend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - this.startTimestamp < 100) {
        console.warn('Mic blocked');
      } else {
        console.warn('mic denied');
      }
      this.ignoreOnend = true;
    }
  };

  private onSpeechRecognitionEnd = function() {
    this.recognizing = false;
    if (this.ignoreOnend) {
      return;
    }
    // start_img.src = 'mic.gif';
    if (!this.finalTranscript) {
      console.log('Click on the microphone icon and begin speaking.')
      return;
    }
  };

  private onSpeechRecognitionResult = function(event) {
    let interimTranscript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    this.finalTranscript = this.capitalize(this.finalTranscript);
    if (this.finalTranscript || interimTranscript) {
      this.query = this.finalTranscript || this.interimTranscript;
      this.dtQueryChange.emit(this.query);
    }
  };
}
