import { Button } from "@/components/ui/button"
import { HiOutlineExternalLink } from "react-icons/hi"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Table,
    TableCell,
    TableRow,
} from "@/components/ui/table"

const experiences = [
    {
        "id": 0,
        "position": "Head of AI Development Program",
        "company": "Infinite Learning Indonesia",
        "type": "Contract | On-site",
        "time": "February 2025 - Present",
        "location": "Batam, Riau Islands, Indonesia",
        "description": "Serving as Head AI Technical Mentor at the AI Development KMM Program @ Infinite Learning, I oversee mentees' learning in Machine Learning, AI Applications, Data Science, Python, Deep Learning, and Model Deployment. I ensure they develop strong project management, collaboration, and presentation skills, particularly for the Capstone Project. Additionally, I guide them in building, fine-tuning, and deploying machine learning models while ensuring proper dataset preparation. I also manage mentor team collaboration, program understanding, and resource allocation, fostering a positive and productive learning environment.",
        "skillset": [
            "Team Management", "Leadership", "Collaboration", "Communication", "AI Development", "Data Science", "TensorFlow", "Keras", "Python", "Flask"
        ]
    },
    {
        "id": 1,
        "position": "Lead Mentor for IBM Academy: Advance Artificial Intelligence",
        "company": "Infinite Learning Indonesia",
        "type": "Contract | On-site",
        "time": "July 2024 - February 2025",
        "location": "Batam, Riau Islands, Indonesia",
        "description": "As a lead mentor at IBM Academy Advanced AI @ Infinite Learning, I am responsible for guiding the mentor team and ensuring mentees master various crucial aspects, from IBM Soft Skills Training, Machine Learning, AI Governance, Generative AI, Deep Learning, to the use of WatsonX.ai on the IBM Cloud platform. My responsibilities include developing mentees' project management skills particularly for the 3M Project in the MSIB program, ensuring they can build and implement robust machine learning models, guiding them in dataset preparation, and managing the mentor team to collaborate effectively while maintaining a positive work environment.",
        "skillset": [
            "Team Management", "Leadership", "Collaboration", "Communication", "AI Development", "Data Science", "TensorFlow", "Keras", "Python", "Flask"
        ]
    },
    {
        "id": 2,
        "position": "Mentor for IBM Academy: Advance Artificial Intelligence",
        "company": "Infinite Learning Indonesia",
        "type": "Contract | On-site",
        "time": "February 2024 - July 2024",
        "location": "Batam, Riau Islands, Indonesia",
        "description": "Continuing my journey to become an instructor at IBM Academy, now focusing on Advanced Artificial Intelligence, a division previously based on Hybrid Cloud and AI. My duty is to ensure my mentees understand Data Science, Generative AI, Machine Learning, and Deep Learning using IBM Cloud technologies.",
        "skillset": [
            "Collaboration", "Communication", "AI Development", "Data Science", "TensorFlow", "Keras", "Python", "Flask"
        ]
    },
    {
        "id": 3,
        "position": "Mentor for IBM Academy: Hybrid Cloud and AI",
        "company": "Infinite Learning Indonesia",
        "type": "Contract + Internship | On-site",
        "time": "Aug 2023 - Feb 2024",
        "location": "Batam, Riau Islands, Indonesia",
        "description": "Starting my role as a mentor for a contract internship program held by Infinite Learning with a responsibility to make sure my students (mentee) to achieve knowledge about how to become a RedHat Enterprise Linux as a Linux System Administrator and also knowledge about AI and its ethics, history and the development of AI in the industry. Beside that, the knowledge of Cybersecurity is an essential knowledge for my students (mentee) to achieve in advance to make sure their digital lifestyle is safe. Also, I have responsibility to make sure my students is commit and have the knowledge delivered to them, has a skill to collaborate with others, communicate better, has a critical thinking to make the world a better place.",
        "skillset": [
            "Collaboration", "Communication", "RedHat Administration", "Linux", "CLI", "AI", "Cybersecurity"
        ]
    },
    {
        "id": 4,
        "position": "Mentee of Red Hat Certified System Administrator - IBM AI & Cybersecurity",
        "company": "Infinite Learning Indonesia",
        "type": "Apprenticeship/Independent Study | Hybrid",
        "time": "Feb 2023 - Jul 2023",
        "location": "Batam, Riau Islands, Indonesia",
        "description": "This independent study program, similar to an apprenticeship, is a collaboration between Infinite Learning and the Indonesian Ministry of Education and Culture. It offers comprehensive certification training including the RedHat Certified System Administrator course (3 months remote plus 2 weeks onsite), IBM's Artificial Intelligence Practitioner Certification (2 weeks onsite), IBM's Cybersecurity Practitioner Certification (2 weeks onsite), and culminates in a capstone project focusing on AI or Cybersecurity using IBM Cloud services (2 weeks remote).",
        "skillset": [
            "Collaboration", "Communication", "RedHat Administration", "Linux", "CLI", "AI", "Cybersecurity"
        ]
    },
    {
        "id": 5,
        "position": "Mentee of Pengembang Front-End Web dan React",
        "company": "Dicoding Indonesia",
        "type": "Apprenticeship/Independent Study  | Remote",
        "time": "Aug 2022 - Dec 2022",
        "location": "Tanjungpinang, Riau Islands, Indonesia",
        "description": "This independent study program, similar to an apprenticeship, is a collaboration between Dicoding Indonesia and the Indonesian Ministry of Education and Culture. The program provides comprehensive training in web development skills, encompassing the fundamentals of Front-End Web Development, ReactJS basics, Progressive Web Application (PWA) development principles, and website deployment techniques.",
        "skillset": [
            "Collaboration", "Communication", "HTML", "CSS", "JavaScript", "React", "PWA"
        ]
    },
]



export const Experiences = () => {
    return (
        <div className="flex justify-center items-center flex-col md:my-16 my-8">
            <h1 data-aos="fade-out" data-aos-duration='900' className="display-font text-4xl border-red-500 border-b mb-3">Experiences</h1>
            <p className="text-sm opacity-75 md:mb-6 mb-3 md:w-full w-2/3 text-center">Works, Internships, and Independent Study experiences</p>
            <div className="bg-[#E0E0E0] dark:bg-[#121212] flex md:flex-row flex-col items-center justify-center min-h-[400px] h-auto p-5 gap-5 md:w-4/5 w-full" id="aboutself">
                <Accordion data-aos="fade-out" data-aos-duration='900' type="single" collapsible className="md:w-2/3 w-full bg-[#EFEFEF] dark:bg-[#1C1C1C] p-5 rounded-md">
                    {
                        experiences.map((exp, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger className="text-left"> <span>{exp.position}</span> </AccordionTrigger>
                                <AccordionContent>
                                    <Table>
                                        <TableRow>
                                            <TableCell className="font-semibold">Company</TableCell>
                                            <TableCell>{exp.company}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Type</TableCell>
                                            <TableCell>{exp.type}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Time</TableCell>
                                            <TableCell>{exp.time}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Location</TableCell>
                                            <TableCell>{exp.location}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Description</TableCell>
                                            <TableCell>{exp.description}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">Skillset</TableCell>
                                            <TableCell>{exp.skillset.join(", ")}</TableCell>
                                        </TableRow>
                                    </Table>
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>

            </div>

            <a href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1"> More at LinkedIn <HiOutlineExternalLink /> </Button>
            </a>

        </div>
    )
}