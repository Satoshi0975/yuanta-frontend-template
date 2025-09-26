const defaultImageUrl = '/og-image.png';

export const getOpenGraphImageUrl = (
  image: string | null | undefined
): string => {
  if (!image) return defaultImageUrl;

  // 使用 next-image-export-optimizer 的設定
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const imagePath = image.startsWith('/') ? image : `/${image}`;

  return `${process.env.NEXT_PUBLIC_DOMAIN}${basePath}${imagePath}`;
};
