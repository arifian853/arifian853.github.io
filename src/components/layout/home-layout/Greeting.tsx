import { Button } from "@/components/ui/button";
import { Navbar } from "../Navbar";


export const Greeting = () => {

  const now = new Date();
  const currentHour = now.getHours();

  const getTimeOfDay = (hour: number) => {
    if (hour >= 4 && hour < 11) {
      return "Morning";
    } else if (hour >= 11 && hour < 18) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }

  const timeOfDay = getTimeOfDay(currentHour);

  return (
    <div className="bg-[#E0E0E0] dark:bg-[#30323D] h-screen">
      <Navbar />
      <div className="flex md:flex-row flex-col md:justify-start justify-center h-full items-center gap-4">

        <div className="md:ml-48 ml-0 md:mb-32 mb-24 md:mt-0">
          <h1 data-aos="fade-in" data-aos-duration='800' className="display-font text-xl my-3">
            Good {timeOfDay}! <br /> <span className="font-bold">I'm <span className='text-red-500'>Arifian!</span></span>
          </h1>

          <p data-aos="fade-in">Welcome to my portfolio site! <br /> See all my <span className="text-red-500">works</span> and <span className="text-red-500">experiences</span> here!</p>
          <a href="#aboutself">
            <Button data-aos="fade-in" className="mt-3">
              Get Started!
            </Button>
          </a>
        </div>
        <div className="h-10 w-10 md:ml-48 ml-0 md:mb-32 mb-24 md:mt-0"> </div>
      </div>

    </div>
  )
}
