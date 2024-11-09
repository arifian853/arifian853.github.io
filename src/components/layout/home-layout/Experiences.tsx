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

// const experiences = [
//     {
//         "id": 1,
//         "position" : "Lead Mentor for IBM Academy Advance Artificial Intelligence",
//         "company": "Infinite Learning Indonesia",
//         "type" : "Contract",
//         "time": "July 2024 - Present",
//         "location": "Batam, Riau Islands, Indonesia",
//         "description": "As a lead mentor at IBM Academy Advanced AI @ Infinite Learning, I am responsible for guiding the mentor team and ensuring mentees master various crucial aspects, from IBM Soft Skills Training, Machine Learning, AI Governance, Generative AI, Deep Learning, to the use of WatsonX.ai on the IBM Cloud platform. My responsibilities include developing mentees' project management skills particularly for the 3M Project in the MSIB program, ensuring they can build and implement robust machine learning models, guiding them in dataset preparation, and managing the mentor team to collaborate effectively while maintaining a positive work environment."
//     },
//     {
//         "id": 1,
//         "position" : "Mentor for IBM Academy Advance Artificial Intelligence",
//         "company": "Infinite Learning Indonesia",
//         "type" : "Contract",
//         "time": "February 2024 - July 2024",
//         "location": "Batam, Riau Islands, Indonesia",
//         "description": "As a lead mentor at IBM Academy Advanced AI @ Infinite Learning, I am responsible for guiding the mentor team and ensuring mentees master various crucial aspects, from IBM Soft Skills Training, Machine Learning, AI Governance, Generative AI, Deep Learning, to the use of WatsonX.ai on the IBM Cloud platform. My responsibilities include developing mentees' project management skills particularly for the 3M Project in the MSIB program, ensuring they can build and implement robust machine learning models, guiding them in dataset preparation, and managing the mentor team to collaborate effectively while maintaining a positive work environment."
//     },
// ]



export const Experiences = () => {
    return (
        <div className="flex justify-center items-center flex-col md:my-16 my-8">
            <h1 data-aos="fade-out" data-aos-duration='900' className="display-font text-4xl border-red-500 border-b mb-3">Experiences</h1>
            <p className="text-sm opacity-75 md:mb-6 mb-3 md:w-full w-2/3 text-center">Work experiences, interns, and independent study</p>
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] flex md:flex-row flex-col items-center justify-center min-h-[400px] h-auto p-5 gap-5 md:w-4/5 w-full" id="aboutself">
                <Accordion type="multiple" className="md:w-2/3 w-full bg-[#BABFBF] dark:bg-[#30323D] p-5 rounded-md">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> Lead Mentor for IBM Academy Advance Artificial Intelligence</AccordionTrigger>
                        <AccordionContent>
                            <Table>
                                <TableRow>
                                    <TableCell className="font-medium">Company</TableCell>
                                    <TableCell>Infinite Learning Indonesia</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Type</TableCell>
                                    <TableCell>Contract</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Time</TableCell>
                                    <TableCell>July 2024 - Present</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Location | Type</TableCell>
                                    <TableCell>Batam, Riau Island, Indonesia | On-site</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Description</TableCell>
                                    <TableCell>As a lead mentor at IBM Academy Advanced AI @ Infinite Learning, I am responsible for guiding the mentor team and ensuring mentees master various crucial aspects, from IBM Soft Skills Training, Machine Learning, AI Governance, Generative AI, Deep Learning, to the use of WatsonX.ai on the IBM Cloud platform. My responsibilities include developing mentees' project management skills particularly for the 3M Project in the MSIB program, ensuring they can build and implement robust machine learning models, guiding them in dataset preparation, and managing the mentor team to collaborate effectively while maintaining a positive work environment.</TableCell>
                                </TableRow>
                            </Table>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>

            <a href="https://www.linkedin.com/in/arifian-saputra-08135a178/" target="_blank" rel="noopener noreferrer">
                <Button className="flex flex-row justify-center items-center gap-1"> More at LinkedIn <HiOutlineExternalLink /> </Button>
            </a>

        </div>
    )
}