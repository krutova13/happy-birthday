import React from "react";

const Wishlist = () => (
  <section className="min-h-[30vh] flex items-center justify-center py-20 px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-5xl md:text-7xl font-creepster text-horror-red mb-12 flicker">
        GIFT RITUAL
      </h2>
      <p className="font-eb-garamond text-lg md:text-2xl text-horror-dark-red mb-6">
        Говорят, лучший способ выжить на этой вечеринке —<br />
        принести то, что порадует Настю.
      </p>
      <p className="font-eb-garamond text-lg md:text-xl mb-8">
        Вишлист ниже. Выбирай с умом. Дары без души не принимаются.
      </p>
      <a
        href="https://followish.io/mywishlist/xzzbdyw6febq62"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-3 bg-horror-black border-2 border-horror-red rounded-lg text-horror-red text-xl md:text-2xl font-creepster shadow-lg hover:bg-horror-dark-red hover:text-horror-white transition-colors duration-300 flicker animate-pulse mt-2"
      >
        Вишлист для смелых
      </a>
    </div>
  </section>
);

export default Wishlist;
