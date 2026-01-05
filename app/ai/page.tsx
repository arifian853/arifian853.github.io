import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Arifian.dev - AI",
  description: "Arifian's Portfolio Site - AI",
  openGraph: {
    title: "Arifian.dev - AI",
    description: "Arifian's Portfolio Site - AI",
  },
}

export default function AI() {
  return (
    <div className="m-auto my-5 p-5">
      <Navbar />
      <Card className="w-2/3 m-auto my-5 p-5">
        <h1 className="font-heading text-3xl font-bold mb-4">Arifian Saputra - AI</h1>
        <p className="font-sans text-base leading-relaxed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque velit beatae soluta id facere molestiae earum dolor eum corrupti est quo error asperiores, debitis numquam voluptas temporibus autem laboriosam mollitia illum praesentium architecto iusto enim quam. Placeat quis ea beatae perferendis rem praesentium, officiis nobis veniam atque sint architecto distinctio? Distinctio quam aspernatur veniam obcaecati alias, nemo quo quaerat dolorem repellat beatae eligendi et dolor nobis officia dolores dolorum fugit temporibus ipsum? Quaerat impedit nulla quidem quae minus sint ad odit earum reiciendis quisquam voluptate, quos enim aperiam repellat cupiditate laudantium eius distinctio! Officiis voluptatibus expedita ipsum dicta, perferendis deserunt.
        </p>
      </Card>
      <Button className="bg-blue-500"><Link href="/">Home</Link></Button>
      <Footer />
    </div>
  );
}
