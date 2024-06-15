import Link from "next/link";
import { FaTelegram, FaTwitter, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";

const footerLinks = [
  {
    heading: "Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Consultation", href: "/consultation" },
      { label: "Medication", href: "/medication" },
      { label: "Lab Tests", href: "/lab-tests" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie" },
    ],
  },
];

const Footer = () => {
  return (
    <>
      <div className="-z-[100]"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319" className="-z-[100]">
        <path
          fill="#5e2bff"
          fillOpacity="1"
          d="M0,288L80,277.3C160,267,320,245,480,250.7C640,256,800,288,960,277.3C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <footer className="py-10 bg-primary text-white">
        <div className="container space-y-10">
          <div className="flex md:flex-row flex-col gap-8 md:gap-0 justify-between">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <GiMedicines size={35} className="" />
                <div>
                  <Link href="/" className="flex font-extrabold text-2xl">
                    <span>BDMeds</span>
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FiPhone className="" />
                  <span className="text-sm text-secondary-200">(123) 456-7890</span>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineEmail className="" />
                  <span className="text-sm text-secondary-200">info@BdMeds.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[3rem] h-[1px] bg-primary/40 rounded-full"></div>
                <div className="flex items-center gap-4">
                  <div>
                    <Link href="https://t.me/BdMeds" className="text-secondary-200 hover: duration-200">
                      <FaTelegram size={25} />
                    </Link>
                  </div>
                  <div>
                    <Link href="https://x.com/BdMeds" className="text-secondary-200 hover:text-blue-400 duration-200">
                      <FaTwitter size={25} />
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://wa.me/2348123456789"
                      className="text-secondary-200 hover:text-green-400 duration-200"
                    >
                      <FaWhatsapp size={25} />
                    </Link>
                  </div>

                  <div>
                    <Link
                      href="https://instagram.com/BdMeds"
                      className="text-secondary-200 hover:text-pink-500 duration-200"
                    >
                      <FaInstagram size={25} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="sm:flex flex-wrap grid grid-cols-2 gap-8">
              {footerLinks.map(({ heading, links }, id) => (
                <div key={id} className="space-y-4">
                  <h4 className={`font-bold  uppercase`}>{heading}</h4>
                  <ul className="space-y-2">
                    {links.map(({ label, href }, id) => (
                      <li key={id} className="text-sm">
                        <Link href={href} className="text-secondary-200 hover: duration-200">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p className="text-secondary-300/80 text-center text-sm">BdMeds Copyright&copy; 2024</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
