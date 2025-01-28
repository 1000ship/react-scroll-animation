"use client";

import React, {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { initialScrollData } from "./constants";
import { ScrollDataContext, ScrollPageContext } from "./stores";
import { ScrollData } from "./types";
import { environment } from "./utils";

interface ScrollContainerProps {
  snap?: "none" | "proximity" | "mandatory";
  children: ReactNode | ReactNode[];
  scrollParent?: Window | HTMLElement | null;
  style?: CSSProperties;
  className?: string;
}

const _window: (Window & typeof globalThis) | undefined =
  typeof window !== "undefined" ? window : undefined;

const ScrollContainer: FC<ScrollContainerProps> = (props) => {
  const {
    snap = "none",
    children,
    scrollParent: _scrollParent,
    style,
    className,
  } = props;
  const scrollParent = _scrollParent || _window;

  const [scrollData, setScrollData] = useState<ScrollData>(initialScrollData);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollEvent = useCallback(() => {
    if (snap !== "none" && scrollTimer.current)
      clearTimeout(scrollTimer.current);

    const container = containerRef.current;
    if (!container) return;

    const currentScrollTop =
      scrollParent === window
        ? window.pageYOffset
        : (scrollParent as HTMLElement).scrollTop;
    const offsetTop = container.getBoundingClientRect().top + currentScrollTop;
    const currentY: number = currentScrollTop - offsetTop;
    const viewportHeight: number =
      scrollParent === window
        ? environment.height
        : (scrollParent as HTMLElement).clientHeight;
    const totalPage: number = Array.isArray(children) ? children?.length : 1;
    const totalHeight: number = totalPage * (viewportHeight - 1);
    const totalProgress: number = currentY / totalHeight; // total page progress 0 ~ 1
    const realPage: number = currentY / viewportHeight; // decimal page number
    const currentPage: number = Math.floor(realPage); // integer page number
    const currentProgress: number = realPage - currentPage; // current page progress

    setScrollData(
      (scrollData) =>
        ({
          ...scrollData,
          currentY,
          viewportHeight,
          totalPage,
          totalHeight,
          totalProgress,
          realPage,
          currentPage,
          currentProgress,
        } as ScrollData)
    );

    if (snap !== "none") {
      scrollTimer.current = setTimeout(() => {
        const newCurrentPage = Math.round(realPage);
        let newCurrentY = currentY;

        if (snap === "mandatory" || Math.abs(newCurrentPage - realPage) < 0.3)
          newCurrentY = newCurrentPage * viewportHeight;

        if (newCurrentY !== currentY)
          window.scrollTo({
            top: newCurrentY + offsetTop,
            behavior: "smooth",
          });
      }, 50);
    }
  }, [children, scrollParent, snap, setScrollData]);

  useEffect(() => {
    if (scrollParent) {
      scrollEvent();
      scrollParent.addEventListener("scroll", scrollEvent);
      scrollParent.addEventListener("resize", scrollEvent);
      return () => {
        scrollParent.removeEventListener("scroll", scrollEvent);
        scrollParent.removeEventListener("resize", scrollEvent);
      };
    }
  }, [scrollEvent, scrollParent]);

  return (
    <div
      ref={containerRef}
      style={{ margin: 0, padding: 0, userSelect: "none", ...style }}
      className={className}
    >
      <ScrollDataContext.Provider value={scrollData}>
        {(Array.isArray(children) &&
          children.map((child, index) => (
            <ScrollPageContext.Provider
              value={{ page: index }}
              key={`scroll-page-${index}`}
            >
              {child}
            </ScrollPageContext.Provider>
          ))) || (
          <ScrollPageContext.Provider value={{ page: 0 }}>
            {children}
          </ScrollPageContext.Provider>
        )}
      </ScrollDataContext.Provider>
    </div>
  );
};

export default ScrollContainer;
