import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Logo from "./assets/image/logo.png"
import Diwali from "./assets/image/DIWALY.jpg"
import Holi from "./assets/image/holy2.jpg"
import Xmas from "./assets/image/xmas.jpg"
import Bday from "./assets/image/bday.jpg"
import Jmas from "./assets/image/janmastomi.jpg"
import Rakhi from "./assets/image/rakhi.jpg"
import Bhai from "./assets/image/vai-fota.jpg"
import EID from "./assets/image/Eid.jpg"
import AKP from "./assets/image/any kind of pujo.jpg"
import Guru from "./assets/image/gurunanak.jpg"
import {LogIn,BaggageClaim,ShoppingCart} from 'lucide-react'

function App() {

  return (
    <>
<div>
  <section id="header">
    <div id="brand"><img src={ Logo}/></div>
    <div id="navbar">
      <li><a href="home.html">Home</a></li>
      <li><a href="#">Products</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact-us</a></li>
      <li><a href="#">
      <LogIn />
      
      </a></li>
      <li><a href="#">
      <BaggageClaim />  
      </a></li>
    </div>
  </section>
  <section id="hero">
    <h1>LETS CELEBRATE. . .</h1>
    <h4>This festival gift a special moment to your beloved one.. </h4>
    <p>Upgrading your special moments to the next level</p>
  </section>
  {/* choose your event */}
  <section id="material1" className="section-p1">
    <h1>Chose Your Event</h1>
    <div className="pro-container">
      {/* start of 1st product */}
      <div className="pro">
        <img src={Diwali} width="200px" height="200px" />
        <div className="des">
          <span>Diwaly</span>
        </div>
        <a href="#"> <ShoppingCart /> </a>
      </div>
      {/* end of 1st product */}
      {/* start of 2nd product */}
      <div className="pro">
        <img src={Holi} width="200px" height="200px" />
        <div className="des">
          <span>Holi</span>
        </div>
        <a href="#"> <ShoppingCart /> </a>
      </div>
      {/* end of 2nd product */}
      {/* start of 3rd item */}
      <div className="pro">
        <img src={Xmas} width="200px" height="200px" />
        <div className="des">
          <span>Christmas</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 3rd item */}
      {/* start of 4th item */}
      <div className="pro">
        <img src={Bday} width="200px" height="200px" />
        <div className="des">
          <span>Birthday</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of the 4th item */}
      {/* start of 5th */}
      <div className="pro">
        <img src={Jmas} width="200px" height="200px" />
        <div className="des">
          <span>Janmastomi</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 5th */}
      {/* start of 6th */}
      <div className="pro">
        <img src={AKP} width="200px" height="200px" />
        <div className="des">
          <span>Any kind of puja</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 6th */}
      {/* start of 7th */}
      <div className="pro">
        <img src={Rakhi} width="200px" height="200px" />
        <div className="des">
          <span>Raksha Bandhan</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 7th */}
      {/* start of 8th */}
      <div className="pro">
        <img src={Bhai} width="200px" height="200px" />
        <div className="des">
          <span>Bhai-Fota</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 8th */}
      {/* start of 9th */}
      <div className="pro">
        <img src={EID} width="200px" height="200px" />
        <div className="des">
          <span>Eid</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 9th */}
      {/* start of 10th */}
      <div className="pro">
        <img src={Guru} width="200px" height="200px" />
        <div className="des">
          <span>GuruPurav</span>
        </div>
        <a href="#"><ShoppingCart /></a>
      </div>
      {/* end of 10th */}
    </div> 
  </section> 
  {/* end of event selection setup content */}
</div>



    </>
  )
}

export default App
