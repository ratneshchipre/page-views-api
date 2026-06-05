import {
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  SectionWrapper,
} from "./section";

const featuredVideo = [
  {
    link: "https://www.youtube.com/embed/f7QhgsnDMCo?si=AcVVp8pXrpLlt2FB&amp;start=2916",
    title: "Page Views API Review by OrcDev",
  },
];

interface FeaturedVideoCardProps {
  link: string;
  title: string;
}

function FeaturedVideoCard({ link, title }: FeaturedVideoCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 border-y border-dashed p-6 last:border-r-0 md:border-r">
      <iframe
        className="aspect-video w-full max-w-xl rounded-xl ring-1 ring-border"
        src={link}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function FeaturedVideoSection() {
  return (
    <SectionWrapper className="border-b">
      <SectionHeader>
        <SectionTitle title="Community Spotlight" />
        <SectionDescription description="Reviewed by creators and developers." />
      </SectionHeader>
      <SectionContent className="grid grid-cols-1">
        {featuredVideo.map((video) => (
          <FeaturedVideoCard key={video.title} {...video} />
        ))}
      </SectionContent>
    </SectionWrapper>
  );
}
