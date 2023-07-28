import React from 'react'
import { SiFacebook, SiGmail, SiInstagram, SiLinkedin, SiTwitter } from 'react-icons/si'

export const Contact = () => {
    return (
        <div className='contact-container' id='light'>
            <div className="contact-main">
                <h1 className='text-3xl  gradient-title'>Stay in Touch</h1>
                <p>Want to collaborate? Find me on :</p>
                <div className="contact-items">
                    <a className='contacts' href="https://www.facebook.com/arifian.syaputra.9/" target="_blank" rel="noopener noreferrer"><SiFacebook /></a>
                    <a className='contacts' href="https://www.instagram.com/arifiansaputra_/" target="_blank" rel="noopener noreferrer"><SiInstagram /></a>
                    <a className='contacts' href="https://twitter.com/ArifianSaputra0" target="_blank" rel="noopener noreferrer"><SiTwitter /></a>
                    <a className='contacts' href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target="_blank" rel="noopener noreferrer"><SiLinkedin /></a>
                    <a className='contacts' href="mailto:arifiansaputra43@gmail.com" target="_blank" rel="noopener noreferrer"><SiGmail /></a>
                </div>
            </div>
        </div>
    )
}
