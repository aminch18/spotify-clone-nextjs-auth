import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { shuffle } from 'lodash'

const colors = [
    "from-blue-500",
    "from-pink-500",
    "from-purple-500",
    "from-indigo-500",
    "from-orange-500",
    "from-yellow-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null);

  useEffect(()=> {
      setColor(shuffle(colors).pop());
  },[]);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-90
        cursor-pointer rounded-full
        p-1 pr-2 text-white"
        >
          <img 
            className="rounded-full w-10" 
            src={session?.user.image} 
            alt="" />
          <h2>{session?.user.name}</h2>
          <ChevronDoubleDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b
         to-black ${color} text-white h-80 padding-8 `}
      >
        <h1>CE VIENE</h1>
      </section>
    </div>
  );
}

export default Center;
