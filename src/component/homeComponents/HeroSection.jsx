import budgetImg from "/budget_illustration.png";

const HeroSection = () => {
  return (
    <div className="w-full bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center py-16 px-4 sm:px-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight mb-6">
            Why a Balanced Budget Matters?
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            A well-planned budget is the foundation of financial freedom. It
            helps you control spending, plan for the future, and reduce
            financial stress.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our website simplifies budgeting by analyzing your income and
            expenses. We compare it with the ideal 50:30:20 rule and give
            personalized insights to improve your financial health.
          </p>
          <p className="text-md text-gray-600 italic">
            Begin your journey to smarter money management — it's never too
            early to start.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={budgetImg}
            alt="Budget Planning Illustration"
            className="w-full max-w-md rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
