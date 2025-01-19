import { Button } from "@/components/ui/button";
import { Navbar } from "../Navbar";


export const Greeting = () => {

  const now = new Date();
  const currentHour = now.getHours();

  const getTimeOfDay = (hour: number) => {
    if (hour >= 0 && hour < 4) {
      return "Peaceful Night";
    } else if (hour >= 4 && hour < 6) {
      return "Early Morning";
    } else if (hour >= 6 && hour < 11) {
      return "Good Morning";
    } else if (hour >= 11 && hour < 15) {
      return "Good Noon";
    } else if (hour >= 15 && hour < 18) {
      return "Good Afternoon";
    } else if (hour >= 18 && hour < 20) {
      return "Good Evening";
    } else {
      return "Peaceful Night";
    }
  }

  const timeOfDay = getTimeOfDay(currentHour);

  return (
    <div className="bg-[#E0E0E0] dark:bg-[#121212] h-screen">
      <Navbar />
      <div className="flex md:flex-row flex-col md:justify-start justify-center h-full items-center gap-4">

        <div className="md:ml-48 ml-0 md:mb-32 mb-24 md:mt-0">
          <h1 data-aos="fade-in" data-aos-duration='900' className="display-font text-xl my-3">
            <b>{timeOfDay}!</b> <br /> <span className="font-bold">I'm <span className='border-red-500 border-b'>Arifian!</span></span>
          </h1>

          <p data-aos="fade-in">Welcome to my portfolio site! <br /> See all my <span className="border-red-500 border-b">works</span> and <span className="border-red-500 border-b">experiences</span> here!</p>
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
