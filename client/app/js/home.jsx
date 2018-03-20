import React from 'react';
import Config from 'Config'
import HandleError from './handleerror'
import {Helmet} from "react-helmet";
import Slider from "react-slick"
import { BrowserRouter as Router, Route, Link, Prompt, Switch} from 'react-router-dom'
var retry = true;
var imageurl = 'client/app/css/images'

export default class home extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
      {
        'errortext':'',
        datajson: []
      };
    this.showhintbox = this.showhintbox.bind(this)
    this.addletterhandler = this.addletterhandler.bind(this)
    this.removeallselecthandler = this.removeallselecthandler.bind(this)
  }

  componentDidMount() {
    var datajson= [
      {
        images: [imageurl+'/brain1.png', imageurl+'/brain2.png', imageurl+'/brain3.png', imageurl+'/brain4.jpg'],
        hint: 'brain',
        noOfLetters: 5,
        selectedletters: [],
        alphabets: ['a', 'y', 'w', 'r', 'k', 'b', 'u', 'n', 's', 'i'],
        result: false
      },
      {
        images: [imageurl+'/money1.png', imageurl+'/money2.jpg', imageurl+'/money3.png', imageurl+'/money4.jpg'],
        hint: 'money',
        noOfLetters: 5,
        selectedletters: [],
        alphabets: ['w', 'y', 'a', 'l', 'm', 'n', 'u', 'o', 's', 'e'],
        result: false
      },
      {
        images: [imageurl+'/tech1.jpg', imageurl+'/tech2.jpg', imageurl+'/tech3.jpg', imageurl+'/tech4.jpg'],
        hint: 'tech',
        noOfLetters: 4,
        selectedletters: [],
        alphabets: ['a', 'y', 't', 'r', 'h', 'b', 'e', 'n', 's', 'c'],
        result: false
      },
    ]
    this.setState({
      datajson: datajson
    })
  }

  showhintbox(event) {
    var id = event.target.id.split('_')[1]
    var hintboxid = 'hint_'+id
    console.log("id and hintboxid", id, hintboxid)
    $('#'+hintboxid).show();
  }

  addletterhandler(event) {
    var text = event.target.innerHTML
    var data = event.target.getAttribute('data-index')
    var datajson = this.state.datajson
    console.log("innerhtml of button", text, data)
    var updatedjson = datajson.map(function(i, index) {
      if(index == data) {
        i.selectedletters.push(text);
      }
      if(i.selectedletters.length == i.noOfLetters) {

        var word=""
        i.selectedletters.map(function(j) {
          word = word+j;
        })
        if(word == i.hint){
          i.result = true;
        }
        else {
          $('#'+index).find('.button').attr('disabled', true);
          $('#'+index).find('.wrongguess').show();
        }
      }
      return(i);
    })
    this.setState({datajson: updatedjson})
  }

  removeallselecthandler(event) {
    var data = event.target.getAttribute('data-index')
    var datajson = this.state.datajson
    console.log("innerhtml of button", data)
    var updatedjson = datajson.map(function(i, index) {
      if(index == data) {
        i.selectedletters = [];
        $('#'+index).find('.button').attr('disabled', false);
        $('#'+index).find('.wrongguess').hide();
      }
      return(i);
    })
    this.setState({datajson: updatedjson})
  }

  render() {
    var settings = {
      dots: true,
      arrows: true,
      infinite: false,
      autoplay: false,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    var data
    if(this.state.datajson.length>0) {
      data = this.state.datajson.map(function(i, index) {
        if(i.result == false) {
          var images = i.images.map(function(j, imageindex) {
            return (
              <div key={imageindex} className="image">
                <img src={j} width="150" height="150"/>
              </div>
            );
          })
          var ansboxes=[]
          for(var k=0; k<i.noOfLetters; k++) {
            var box= <div className="ansbox" key={k} >{i.selectedletters[k] ? i.selectedletters[k] : ''}</div>
            ansboxes.push(box)
          }
          var filteredalphabets = i.alphabets.filter(function(a) {
              if(i.selectedletters.indexOf(a) == -1) {
                return(a);
              }
          })
          return (
            <div key={index} id={index}>
              <div className="imagewraper">
                {images}
              </div>
              <div className="ansboxeswrapper">
                {ansboxes.map(function(l) {
                  return(l);
                })}
                <button className="hintbutton" type="button" onClick={this.removeallselecthandler} data-index={index}> Clear </button>
              </div>
              <div className="wrongguess" style={{display: 'none'}}>you guessed it wrong. Please clear and try again!</div>
              <div className="alphabetbuttons">
                {filteredalphabets.map(function(l, lindex) {
                    return(<button key={lindex} className="button" type="button" data-index={index} onClick={this.addletterhandler}>{l}</button>);
                }, this)}
              </div>
              <div className="hintbox">
                <button className="hintbutton" type="button" id={"hintbuton_"+index} onClick={this.showhintbox}>Hint</button>
                <div className="hint" id={"hint_"+index}>{i.hint}</div>
              </div>
            </div>
          );
        }
        else {
          return(
            <div className="successdiv" key={index}>
              <img src={imageurl+'/success.png'} width="150" height="150" />
              <span>Well played!! you guessed it right.</span>
            </div>
          );
        }
      },this)
    }
    var apierr
    if(this.state.retryBtn){
        apierr = this.state.retryBtn
    }
    else{
        apierr = ""
    }
    var networkerror
    if(this.state.errortext)
      networkerror=<HandleError errortext={this.state.errortext} />
    return (
      <div>
        <Helmet>
          <title>Sample app programme</title>
          <meta name="description" content= "This is main page of basic setup of react using routing"/>
          <meta itemprop="name" content="React setup" />
          <meta itemprop="description" content="This is a project named React basic setup" />
        </Helmet>
        <div>
          {networkerror}
          <div id="apierror"></div>
          {apierr}
          <div>
            <Slider {...settings}>
              {data}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}