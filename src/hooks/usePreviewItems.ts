import * as React from 'react';
import type { InternalItem, PreviewImageElementProps, RegisterImage } from '../interface';
import type { GroupConsumerProps } from '../PreviewGroup';

export type Items = Omit<InternalItem, 'canPreview'>[];

/**
 * Merge props provided `items` or context collected images
 */
export default function usePreviewItems(
  items?: GroupConsumerProps['items'],
): [items: Items, registerImage: RegisterImage] {
  // Context collection image data
  const [images, setImages] = React.useState<Record<number, PreviewImageElementProps>>({});

  const registerImage = React.useCallback<RegisterImage>((id, data) => {
    setImages(imgs => ({
      ...imgs,
      [id]: data,
    }));

    return () => {
      setImages(imgs => {
        const cloneImgs = { ...imgs };
        delete cloneImgs[id];
        return cloneImgs;
      });
    };
  }, []);

  // items
  const mergedItems = React.useMemo<Items>(() => {
    if (items) {
      return items.map(item =>
        typeof item === 'string' ? { imgData: { src: item } } : { imgData: item },
      );
    }

    return Object.keys(images).reduce((total: Items, id) => {
      const { canPreview, imgData } = images[id];
      if (canPreview) {
        total.push({ imgData, id });
      }
      return total;
    }, []);
  }, [items, images]);

  return [mergedItems, registerImage];
}
