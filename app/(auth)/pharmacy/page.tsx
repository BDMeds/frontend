import Button from "@/components/Common/Button";
import Image from "next/image";
import Link from "next/link";
import { CiPill } from "react-icons/ci";

const Page = () => {
  return (
    <div className="h-screen -mt-20 flex items-center justify-center">
      <div className="space-y-10">
        <div className="grid place-content-center">
          <Image src={"/images/pharmacy.svg"} alt="pharmacy" width={400} height={400} />
        </div>

        <div className="grid place-content-center">
          <div>
            <Link href="/pharmacy" target="_blank">
              <Button text="Go to pharmacy" variant="filled" icon={<CiPill />} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
