import Button from "@/components/Common/Button";
import Switch from "@/components/Common/Inputs/switch";
import useUserInfo from "@/lib/hooks/useUserInfo";
import { opacityVariant } from "@/lib/utils/variants";
import { motion } from "framer-motion";
import { useState } from "react";

const Notifications = () => {
  const [{ appointment, message, payment, review, buy }, setNotifications] = useState({
    // default
    message: true,
    appointment: true,

    // doctor
    payment: true,
    review: true,

    // patient
    buy: true,
  });

  const { user } = useUserInfo();

  return (
    <motion.div {...opacityVariant} className="p-5 space-y-5">
      <p className="text-xl">Notifications Settings</p>

      <div className="py-3 flex items-center justify-between">
        <p className="">When someone messages me</p>

        <Switch checked={message} onClick={() => setNotifications((prev) => ({ ...prev, message: !prev.message }))} />
      </div>

      <div className="py-3 flex items-center justify-between">
        <p className="">When I get an appointment</p>

        <Switch
          checked={appointment}
          onClick={() => setNotifications((prev) => ({ ...prev, appointment: !prev.appointment }))}
        />
      </div>

      <div className="py-3 flex items-center justify-between">
        <p className="">When I buy a product in marketplace</p>

        <Switch checked={buy} onClick={() => setNotifications((prev) => ({ ...prev, buy: !prev.buy }))} />
      </div>

      {user && user.role === "doctor" && (
        <>
          <div className="py-3 flex items-center justify-between">
            <p className="">When someone pays me</p>

            <Switch
              checked={payment}
              onClick={() => setNotifications((prev) => ({ ...prev, payment: !prev.payment }))}
            />
          </div>

          <div className="py-3 flex items-center justify-between">
            <p className="">When I get a review</p>

            <Switch checked={review} onClick={() => setNotifications((prev) => ({ ...prev, review: !prev.review }))} />
          </div>
        </>
      )}

      <Button text="Save Changes" variant="filled" />
    </motion.div>
  );
};

export default Notifications;
