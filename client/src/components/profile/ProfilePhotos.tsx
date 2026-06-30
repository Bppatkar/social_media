import Image from 'next/image';

interface Props {
  images: string[];
}

export default function ProfilePhotos({
  images,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-white/10"
        >
          <Image
            src={image}
            alt="Post"
            width={400}
            height={400}
            className="aspect-square object-cover transition hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}