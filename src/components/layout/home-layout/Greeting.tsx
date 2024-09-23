import { Button } from "@/components/ui/button";


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
    <div className="bg-[#E0E0E0] dark:bg-[#30323D] h-screen p-5">

      <div className="flex md:flex-row flex-col gap-3 justify-center items-center h-96">

        <div className="md:w-1/2 w-full p-10 md:pl-20 pl-5">
          <h1 data-aos="fade-in" className="display-font text-xl">
            Good {timeOfDay}! I'm <span className='text-red-500'>Arifian!</span>
          </h1>

          <p data-aos="fade-in">Welcome to my portfolio! <br /> See all my <span className="text-red-500">works</span> here!</p>
          <a href="#aboutself">
            <Button data-aos="fade-in" className="mt-2">
              Get Started
            </Button>
          </a>
        </div>

        <div className="h-40 md:w-1/2 w-full">

        </div>

      </div>

    </div>
  )
}
