import React from 'react';
import { SiFacebook, SiGmail, SiInstagram, SiLinkedin, SiTwitter } from 'react-icons/si';

const Contacts = () => {
  return (
    <div className="contacts-parent">
        <h1 className="text-4xl">Stay Connected</h1>
        <br />
        <p>You can find me here : </p>
        <div className="container-contacts">
            <div className="contacts shadow-lg">
                <a href="https://www.facebook.com/arifian.syaputra.9/" target="_blank" rel="noopener noreferrer"><SiFacebook /></a>
                <a href="https://www.instagram.com/arifiansaputra_/" target="_blank" rel="noopener noreferrer"><SiInstagram /></a>
                <a href="https://twitter.com/ArifianSaputra0" target="_blank" rel="noopener noreferrer"><SiTwitter /></a>
                <a href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target="_blank" rel="noopener noreferrer"><SiLinkedin /></a>
                <a href="mailto:arifiansaputra43@gmail.com" target="_blank" rel="noopener noreferrer"><SiGmail /></a>
            </div>
        </div>
    </div>
  )
}

export default Contacts