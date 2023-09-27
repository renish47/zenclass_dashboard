import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "../../lib/utils";

const Card = ({
  children,
  className,
  lightRadius = 400,
  borderRadius = "rounded-2xl",
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    let { top, left } = currentTarget.getBoundingClientRect();
    let xPosition = clientX - left;
    let yPosition = clientY - top;
    mouseX.set(xPosition);
    mouseY.set(yPosition);
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        `relative bg-white/10 border border-white/20 cursor-default shadow-slate-900 shadow-sm backdrop-blur-xl rounded-2xl group ${borderRadius}`,
        className
      )}
    >
      <motion.div
        className={`absolute pointer-events-none -inset-px opacity-0 rounded-2xl md:group-hover:opacity-100 duration-200 ${borderRadius}`}
        style={{
          background: useMotionTemplate`radial-gradient(${lightRadius}px circle at ${mouseX}px ${mouseY}px , rgb(233 233 233 / 0.09), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};
export default Card;
