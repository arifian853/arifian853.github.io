import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Timeline } from 'flowbite-react'
import { HiCalendar } from 'react-icons/hi'


export const Achievements = () => {
  return (
    <div className='achievement-container' id='light'>
      <div className="proj-title">
        <h1 className='gradient-title p-1 titles'> Achievements & Experiences</h1>
      </div>

      <div className="main-container mt-5 px-12">
        <div className="flex flex-col">
          <div className="proj-title mb-10">
            <h1 className='gradient-title text-2xl p-1'> Experiences </h1>
          </div>
          <Timeline>

            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className='timeline-time opacity-70'>
                  August 2022 - Present
                </Timeline.Time>
                <Timeline.Title className='timeline-title'>
                  Instructor for IBM Academy and Hybrid Cloud & AI
                </Timeline.Title>
                <Timeline.Body className='timeline-body opacity-70'>
                  <p>
                    Starting my role as a mentor for a contract internship program held by Infinite Learning with a responsibility to make sure my students (mentee) to achieve knowledge about how to become a RedHat Enterprise Linux as a Linux System Administrator and also knowledge about AI and its ethics, history and the development of AI in the industry. Beside that, the knowledge of Cybersecurity is an essential knowledge for my students (mentee) to achieve in advance to make sure their digital lifestyle is safe. Also, I have responsibility to make sure my students is commit and have the knowledge delivered to them, has a skill to collaborate with others, communicate better, has a critical thinking to make the world a better place.
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className='timeline-time opacity-70'>
                  February 2023 - July 2023
                </Timeline.Time>
                <Timeline.Title className='timeline-title'>
                  Studi Independen Bersertifikat Red Hat Certified System Administrator - IBM AI & Cybersecurity
                </Timeline.Title>
                <Timeline.Body className='timeline-body opacity-70'>
                  <p>
                    This program is an Independent Study (activity that similar as Apprenticeship) that held by Infinite Learning with collaboration with the Indonesian Ministry of Education and Culture. This activity includes the training of these certification: <br />
                    - RedHat Certified System Administrator by RedHat (3 months remote + 2 weeks onsite) <br />
                    - Artificial Intelligence Practitioner Certification by IBM (2 weeks onsite) <br />
                    - Cybersecurity Practitioner Certification by IBM (2 weeks onsite) <br />
                    - Capstone Project about AI/Cybersecurity with IBM Cloud services (2 weeks remote) <br />
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className='timeline-time opacity-70'>
                  August 2022 - December 2022
                </Timeline.Time>
                <Timeline.Title className='timeline-title'>
                  Studi Independen Bersertifikat (MSIB Kampus Merdeka x Dicoding) - Pengembang Front-End Web dan React
                </Timeline.Title>
                <Timeline.Body className='timeline-body opacity-70'>
                  <p>
                    This program is an Independent Study (activity that similar as Apprenticeship) that held by Dicoding Indonesia with collaboration with the Indonesian Ministry of Education and Culture. This activity includes the training of these skills: <br />
                    - Basics of Front - End Web Development <br />
                    - Basics of ReactJS <br />
                    - Basics of building PWA <br />
                    - Website deployment <br />
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className='timeline-time opacity-70'>
                  September 2021 - August 2022
                </Timeline.Time>
                <Timeline.Title className='timeline-title'>
                  Google Developer Student Club (Peserta) - Insititut Teknologi Bandung
                </Timeline.Title>
                <Timeline.Body className='timeline-body opacity-70'>
                  <p>
                    Participant of the annual Google Developer Student Club event organized by the Bandung Institute of Technology (ITB). Activities take place online using an online conference application by discussing various kinds of technological material along with workshops and project assignments. Some of the topics discussed are: <br />
                    - Web Development <br />
                    - Front-End Development with React <br />
                    - API Introduction <br />
                    - Golang (Go) Introduction <br />
                    - Backend Introduction <br />
                    - Etc. <br />
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

            <Timeline.Item>
              <Timeline.Point icon={HiCalendar} />
              <Timeline.Content>
                <Timeline.Time className='timeline-time opacity-70'>
                January 2021 - February 2021
                </Timeline.Time>
                <Timeline.Title className='timeline-title'>
                Re-Cloud ID Challenges (Codepolitan x Alibaba Cloud) 2021
                </Timeline.Title>
                <Timeline.Body className='timeline-body opacity-70'>
                  <p>
                  A web building competition that held by Codepolitan on a collaboration with Alibaba Cloud that has a purpose of introducing about how to host a static website on an ECS (Elastic Cloud System) from Alibaba Cloud and how to configure and managing the cloud systems remotely.
                  </p>
                </Timeline.Body>
              </Timeline.Content>
            </Timeline.Item>

          </Timeline>
        </div>
      </div>
      <div className="main-container">

        <div className="flex flex-col">

          <div className="proj-title mb-10">
            <h1 className='gradient-title text-2xl p-1'> Certifications </h1>
          </div>

          <div className="achievement-main">

            <div className="achievement-point">
              <img src="/img/red-hat-certified-system-administrator-rhcsa.png" alt="" />
              <div className="achievement-desc">
                <h1 className='text-1xl'>RedHat Certified System Administrator (RHCSA)</h1>
                <p>Issued : 17 May 2023</p>
              </div>
            </div>

            <div className="achievement-point">
              <img src="/img/sib.png" alt="" />
              <div className="achievement-desc">
                <h1 className='text-1xl'>SIB Dicoding Kampus Merdeka - Front End & React </h1>
                <p>Issued : 31 Dec 2022</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <br />
        <a href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target='_blank' rel='noopener noreferrer'><button className='btn-proj'>All achievements on LinkedIn <FaArrowRight /> </button></a>
        <br />
      </div>
    </div>
  )
}
