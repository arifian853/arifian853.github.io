import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


export const Educations = () => {
    return (
        <div className="flex justify-center items-center flex-col md:my-16 my-8">
            <h1 data-aos="fade-out" data-aos-duration='600' className="display-font text-4xl border-red-500 border-b mb-3">Educations</h1>
            <p className="text-sm opacity-75 md:mb-6 mb-3 md:w-full w-2/3 text-center">Education experiences</p>
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] flex md:flex-row flex-col items-center justify-center min-h-[350px] h-auto p-5 gap-5 md:w-4/5 w-full flex-wrap" id="aboutself">

                <Tabs defaultValue="college" className="w-full flex md:flex-row flex-col items-center justify-center md:gap-3 gap-0.5">
                    <TabsList className="flex md:flex-col flex-row justify-center bg-transparent items-center md:h-[200px] h-[50px]">
                        <TabsTrigger className="text-left" value="highschool">High School</TabsTrigger>
                        <TabsTrigger className="text-left" value="college">College</TabsTrigger>
                    </TabsList>
                    <TabsContent value="highschool">
                        <Card className="h-[200px] bg-[#BABFBF] dark:bg-[#30323D] shadow-lg border-none md:w-[500px] w-full">
                            <CardHeader>
                                <CardTitle>SMA Negeri 1 Bintan Utara</CardTitle>
                                <CardDescription>
                                    Senior High School at Tanjunguban. Riau Islands.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="college">
                        <Card className="h-[200px] bg-[#BABFBF] dark:bg-[#30323D] shadow-lg border-none md:w-[500px] w-full">
                            <CardHeader>
                                <CardTitle>Universitas Maritim Raja Ali Haji</CardTitle>
                                <CardDescription>
                                    A Maritime University at Tanjungpinang, Riau Islands.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                            <CardFooter>

                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}