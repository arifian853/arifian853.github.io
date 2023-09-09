import React from 'react'
import { SiFacebook, SiGmail, SiInstagram, SiLinkedin, SiTwitter } from 'react-icons/si'
import { Button } from 'flowbite-react'

export const Contact = () => {
    return (
        <div className='contact-container' id='light'>
            <div className="contact-main" data-aos="fade-top" data-aos-duration="1000">
                <h1 className='text-3xl  gradient-title'>Stay in Touch</h1>
                <p>Want to collaborate? Find me on :</p>
                <div className="contact-items">
                    <Button.Group>
                        <Button href="https://www.facebook.com/arifian.syaputra.9/" target="_blank" rel="noopener noreferrer" color="gray">
                            <SiFacebook className='text-2xl' />
                        </Button>
                        <Button href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target="_blank" rel="noopener noreferrer" color="gray">
                            <SiLinkedin className='text-2xl' />
                        </Button>
                        <Button href="https://www.instagram.com/arifiansaputra_/" target="_blank" rel="noopener noreferrer" color="gray">
                            <SiInstagram className='text-2xl' />
                        </Button>
                        <Button href="https://twitter.com/ArifianSaputra0" target="_blank" rel="noopener noreferrer" color="gray">
                            <SiTwitter className='text-2xl' />
                        </Button>
                        <Button href="mailto:arifiansaputra43@gmail.com" target="_blank" rel="noopener noreferrer" color="gray">
                            <SiGmail className='text-2xl' />
                        </Button>
                    </Button.Group>
                </div>
            </div>
        </div>
    )
}
