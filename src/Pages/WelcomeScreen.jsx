import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import OrbitVision from "../components/ui/OrbitVision";

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinish = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      onLoadingComplete?.();
    }, 700);
  }, [onLoadingComplete]);

  useEffect(() => {
    const timer = setTimeout(handleFinish, 2400);
    return () => clearTimeout(timer);
  }, [handleFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="ink-orbit-welcome fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            filter: "blur(14px)",
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <div className="welcome-orbit-shell relative h-full w-full">
            <div className="welcome-orbit-frame">
              <OrbitVision autoReforge showInterface={false} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

WelcomeScreen.propTypes = {
  onLoadingComplete: PropTypes.func,
};

export default WelcomeScreen;
