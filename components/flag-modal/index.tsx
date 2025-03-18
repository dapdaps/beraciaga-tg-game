"use client";

import ReactDOM from 'react-dom';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';
import IconClose from '@public/images/flag-modal/icon-close.svg';
import React from 'react';
import clsx from 'clsx';

const FlagModal = (props: any) => {
  const {
    className,
    innerClassName,
    contentClassName,
    closeIconClassName,
    isShowCloseIcon = true,
    closeIcon,
    onClose,
    children,
    footer,
    visible,
    isMaskClose = true,
  } = props;

  const [mask, maskAnimate] = useAnimate();
  const [content, contentAnimate] = useAnimate();

  if (!visible) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMaskClose) return;
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    try {
      contentAnimate(content.current, {
        opacity: 0,
        x: 382,
      }, {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 0.5,
        restDelta: 0.01,
        onComplete: () => {
          onClose?.();
        }
      });
    } catch (err: any) {
      console.log(err);
      onClose?.();
    }
  };

  return ReactDOM.createPortal(
    (
      <AnimatePresence mode="wait">
        <motion.div
          ref={mask}
          className={`fixed inset-0 z-[100] bg-[rgba(0,0,0,0.80)] w-full h-full flex justify-end items-center ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleBackdropClick}
          onAnimationComplete={() => {
            contentAnimate(content.current, {
              opacity: 1,
              x: 0,
            }, {
              type: 'spring',
              stiffness: 200,
              damping: 15,
              mass: 0.5,
              restDelta: 0.01,
            });
          }}
        >
          <motion.div
            ref={content}
            className={`w-[382px] relative flex flex-col items-end justify-center pt-[55px] ${innerClassName}`}
            initial={{ opacity: 0, x: 382 }}
          >
            {isShowCloseIcon && (closeIcon || onClose) ? (
              <button
                type="button"
                onClick={handleClose}
                className={`absolute top-5 right-5 cursor-pointer z-[100] ${closeIconClassName}`}
              >
                {closeIcon ? closeIcon : <IconClose />}
              </button>
            ) : null}
            <div className="bg-[url('/images/flag-modal/top.svg')] bg-no-repeat bg-bottom bg-[length:100%] w-full h-[101px] translate-y-[1px]" />
            <div className={clsx("bg-[url('/images/flag-modal/mid.svg')] bg-repeat-y bg-top bg-[length:100%] w-full h-[285px] pl-[60px] pr-[75px]", contentClassName)}>
              {children}
            </div>
            <div className="bg-[url('/images/flag-modal/bot.svg')] bg-no-repeat bg-top bg-[length:100%] w-full h-[34px] translate-y-[-1px]" />
            {
              footer && (
                <div className="flex justify-center items-center w-full mt-[13px]">
                  {footer}
                </div>
              )
            }
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ) as any,
    document.body
  ) as unknown as React.ReactPortal;
};

export default FlagModal;
