import Image from 'next/image';

export const OptimizedImage = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: any }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={props.width || 800}
      height={props.height || 600}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      {...props}
    />
  );
}; 