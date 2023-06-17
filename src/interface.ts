/**
 * Used for PreviewGroup passed image data
 */
export type ImageElementProps = Pick<
  React.ImgHTMLAttributes<HTMLImageElement>,
  | 'src'
  | 'crossOrigin'
  | 'decoding'
  | 'draggable'
  | 'loading'
  | 'referrerPolicy'
  | 'sizes'
  | 'srcSet'
  | 'useMap'
  | 'alt'
>;

export type PreviewImageElementProps = {
  imgData: ImageElementProps;
  canPreview: boolean;
};

export type InternalItem = PreviewImageElementProps & {
  id?: string;
};

export type RegisterImage = (id: string, data: PreviewImageElementProps) => VoidFunction;

export type OnGroupPreview = (id: string, mouseX: number, mouseY: number) => void;
