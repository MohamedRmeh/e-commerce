import Link from "next/link";


export default function Button({ title, href, onclick }) {
  return (
    <Link
    onClick={onclick}
      href={href}
      className="border-2  hover:bg-neutral-700 p-2 transition delay-80 rounded-lg"
    >
      {title}
    </Link>
  );
}
