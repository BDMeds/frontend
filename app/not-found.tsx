import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { LuHome } from "react-icons/lu";

const NotFound = () => {
  return (
    <main className="min-h-screen grid place-content-center">
      <div className="space-y-5 container">
        <div className="grid place-content-center">
          <Image src="/svgs/404-not-found.svg" alt="404 not found" width={500} height={500} />
        </div>
        <div className="space-y-5 text-center max-w-lg mx-auto">
          <p>Looks like this page took a sick day. Let&apos;s get you back on track!</p>
          {/* <p>
            Uh-oh, it looks like this page is feeling a bit under the weather. Let&apos;s get you back to a healthier
            place!
          </p> */}

          <div className="grid place-content-center">
            <Link href={"/"}>
              <Button text="Go Home" icon={<LuHome />} variant="filled" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
