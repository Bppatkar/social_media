import Image from 'next/image';
import EmptyState from '@/components/feedback/EmptyState';

interface Props {
  images: string[];
}

export default function ProfilePhotos({ images }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {images.length === 0 ? (
        <EmptyState
          title="No posts yet"
          description="This user has not created any posts yet."
        />
      ) : (
        images.map((image, index) => (
          <div
            key={index}
            className="group overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={image}
              alt="Post"
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))
      )}
    </div>
  );
}
