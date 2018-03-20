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
  }

  componentDidMount() {
    var datajson= [
      {
        images: [imageurl+'/brain1.png', imageurl+'/brain2.png', imageurl+'/brain3.png', imageurl+'/brain4.jpg'],
        hint: 'brain',
        noOfLetters: 5
      },
      {
        images: [imageurl+'/money1.png', imageurl+'/money2.jpg', imageurl+'/money3.png', imageurl+'/money4.jpg'],
        hint: 'money',
        noOfLetters: 5
      },
      {
        images: [imageurl+'/tech1.jpg', imageurl+'/tech2.jpg', imageurl+'/tech3.jpg', imageurl+'/tech4.jpg'],
        hint: 'tech',
        noOfLetters: 4
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

  render() {
    var settings = {
      dots: true,
      arrows: true,
      infinite: true,
      autoplay: false,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    var data
    if(this.state.datajson.length>0) {
      data = this.state.datajson.map(function(i, index) {
        var images = i.images.map(function(j, imageindex) {
          return (
            <div key={imageindex} className="image">
              <img src={j} width="150" height="150"/>
            </div>
          );
        })
        var ansboxes=[]
        for(var k=0; k<i.noOfLetters; k++) {
          var box= <div className="ansbox" key={k}></div>
          ansboxes.push(box)
        }
        return (
          <div key={index}>
            <div className="imagewraper">
              {images}
            </div>
            <div className="ansboxeswrapper">
              {ansboxes.map(function(l) {
                return(l);
              })}
            </div>
            <div className="alphabetbuttons">
              <button className="button" type="button">a</button>
              <button className="button" type="button">b</button>
              <button className="button" type="button">c</button>
              <button className="button" type="button">d</button>
              <button className="button" type="button">e</button>
              <button className="button" type="button">f</button>
              <button className="button" type="button">g</button>
              <button className="button" type="button">h</button>
              <button className="button" type="button">i</button>
              <button className="button" type="button">j</button>
              <button className="button" type="button">k</button>
              <button className="button" type="button">l</button>
              <button className="button" type="button">m</button>
              <button className="button" type="button">n</button>
              <button className="button" type="button">o</button>
              <button className="button" type="button">p</button>
              <button className="button" type="button">q</button>
              <button className="button" type="button">r</button>
              <button className="button" type="button">s</button>
              <button className="button" type="button">t</button>
              <button className="button" type="button">u</button>
              <button className="button" type="button">v</button>
              <button className="button" type="button">w</button>
              <button className="button" type="button">x</button>
              <button className="button" type="button">y</button>
              <button className="button" type="button">z</button>
            </div>
            <div className="hintbox">
              <button className="hintbutton" type="button" id={"hintbuton_"+index} onClick={this.showhintbox}>Hint</button>
              <div className="hint" id={"hint_"+index}>{i.hint}</div>
            </div>
          </div>
        );
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