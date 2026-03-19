'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styles from './Carousel.module.css';

type CarouselItem = {
  id: string | number;
  content: React.ReactNode;
};

type CarouselProps = {
  items: CarouselItem[];
  /** 自動再生の間隔（ms）。0 で無効 */
  autoplayDelay?: number;
  /** ループ再生 */
  loop?: boolean;
  /** ドット（インジケーター）を表示 */
  showDots?: boolean;
  /** 前後ボタンを表示 */
  showArrows?: boolean;
};

export default function Carousel({
  items,
  autoplayDelay = 0,
  loop = true,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const plugins = autoplayDelay > 0 ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop }, plugins) as UseEmblaCarouselType;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', () => onSelect(emblaApi));
    emblaApi.on('reInit', () => onSelect(emblaApi));
    return () => {
      emblaApi.off('select', () => onSelect(emblaApi));
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={styles.carousel}>
      {/* Viewport */}
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container}>
          {items.map((item) => (
            <div key={item.id} className={styles.slide}>
              {item.content}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow buttons */}
      {showArrows && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev && !loop}
            aria-label="前へ"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext && !loop}
            aria-label="次へ"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && (
        <div className={styles.dots} role="tablist" aria-label="スライドナビゲーション">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === selectedIndex}
              className={`${styles.dot} ${i === selectedIndex ? styles['dot--active'] : ''}`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`スライド ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
