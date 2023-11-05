import { BookOpenCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="navbar bg-neutral-100">
      <div className="mx-auto w-4/5">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href='/'><BookOpenCheck color="blue" /></Link>
        </div>
        <div className="flex-none">
          <Link href='/create' className="btn btn-ghost">
            create post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
