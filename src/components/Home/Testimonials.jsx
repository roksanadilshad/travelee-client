import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Home,
  MapPin,
  Star,
} from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rahim Uddin",
      location: "Dhaka",
      rating: 5,
      comment: "Amazing experience! Booking was super easy and smooth.",
      verified: true,
      avatar: "",
      tripType: "Beach Vacation",
      color: "from-blue-600 to-cyan-600",
      createdAt: "2026-02-16T10:30:00",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      location: "Chittagong",
      rating: 4,
      comment: "Great customer service and fast response time.",
      verified: true,
      avatar: "",
      tripType: "City Tour",
      color: "from-orange-600 to-amber-600",
      createdAt: "2026-02-14T18:45:00",
    },
    {
      id: 3,
      name: "Kamal Hassan",
      location: "Sylhet",
      rating: 5,
      comment: "Best travel platform I've used. Highly recommended!",
      verified: true,
      avatar: "",
      tripType: "Mountain Trek",
      color: "from-purple-600 to-pink-600",
      createdAt: "2026-02-13T09:20:00",
    },
  ];

  const timeAgo = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diffInSeconds = Math.floor((now - reviewDate) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (minutes < 60) return `${minutes} Minutes`;
    if (hours < 24) return `${hours} Hours`;
    return `${days} Days`;
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 md:px-4 py-2 rounded-full text-sm font-medium mb-2 md:mb-4">
            <span className="text-lg">💬</span>
            <span>Traveler Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            <span className="text-[#3493cc]">Wall</span>{" "}
            <span className="text-[#ed8433]">Of Love</span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real travelers who trusted us with their journeys
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review, index) => (
            <div
              key={review.id}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-border/50"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              {/* Quote Icon */}
              <div className="absolute hidden -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl md:flex items-center justify-center text-white text-2xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform duration-300">
                "
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-3 md:mb-6">
                <div className="flex items-center gap-2 md:gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-bold text-lg shadow-md">
                    {review.avatar}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      {review.name}
                    </h3>

                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      {review.location}
                    </p>

                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock3 className="w-3 h-3 text-secondary" />
                      {timeAgo(review.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Verified Badge */}
                {review.verified && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-green-200">
                      <BadgeCheck className="w-4 h-4 text-green-600" />
                      Verified
                    </span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2 md:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}

                <span className="text-sm font-semibold text-muted-foreground ml-2">
                  {review.rating}.0
                </span>
              </div>

              {/* Comment */}
              <p className="text-foreground/80 leading-relaxed mb-2 md:mb-4 relative z-10">
                "{review.comment}"
              </p>

              {/* Trip Type Tag */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-3 py-1.5 rounded-lg text-xs font-medium">
                <Home className="w-3 h-3" />

                {review.tripType}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center my-10 md:mb-20 md:mt-16">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <span>View All Reviews</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
