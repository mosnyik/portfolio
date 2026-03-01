"use client";

import { motion } from "framer-motion";
import { ExternalLink, Briefcase, Target, FileText, Users } from "lucide-react";

const jobBoards = [
  {
    category: "Crypto & Blockchain Specific",
    icon: Target,
    sites: [
      { name: "Cryptocurrency Jobs", url: "https://cryptocurrencyjobs.co", description: "Largest crypto job board" },
      { name: "Web3 Career", url: "https://web3.career", description: "Web3 and DeFi focused roles" },
      { name: "Crypto Jobs List", url: "https://cryptojobslist.com", description: "Curated blockchain jobs" },
      { name: "Bitcoin Jobs", url: "https://bitcoinjobs.com", description: "Bitcoin ecosystem roles" },
      { name: "Remote3", url: "https://remote3.co", description: "Remote Web3 jobs" },
      { name: "Bankless Jobs", url: "https://bankless.pallet.com/jobs", description: "DeFi and crypto jobs" },
      { name: "Crypto Careers", url: "https://cryptocareers.co", description: "Crypto startup jobs" },
      { name: "UseWeb3 Jobs", url: "https://useweb3.xyz/jobs", description: "Web3 developer jobs" },
    ],
  },
  {
    category: "Fintech Focused",
    icon: Briefcase,
    sites: [
      { name: "Wellfound (AngelList)", url: "https://wellfound.com", description: "Startup jobs - filter by fintech/crypto" },
      { name: "Built In", url: "https://builtin.com", description: "Tech startup jobs" },
      { name: "Fintech Futures Jobs", url: "https://jobs.fintechfutures.com", description: "Fintech industry jobs" },
      { name: "eFinancialCareers", url: "https://efinancialcareers.com", description: "Finance and fintech" },
    ],
  },
  {
    category: "Remote-First Platforms",
    icon: Users,
    sites: [
      { name: "Remote OK", url: "https://remoteok.com", description: "Filter by blockchain/fintech" },
      { name: "We Work Remotely", url: "https://weworkremotely.com", description: "Remote dev jobs" },
      { name: "RemoteLeaf", url: "https://remoteleaf.com", description: "Curated remote jobs" },
      { name: "Turing", url: "https://turing.com", description: "Remote jobs for devs" },
      { name: "Toptal", url: "https://toptal.com", description: "Freelance - high paying" },
      { name: "Arc.dev", url: "https://arc.dev", description: "Remote developer jobs" },
      { name: "Flexjobs", url: "https://flexjobs.com", description: "Vetted remote jobs" },
      { name: "Working Nomads", url: "https://workingnomads.com", description: "Digital nomad jobs" },
    ],
  },
  {
    category: "General (But Good for Tech)",
    icon: FileText,
    sites: [
      { name: "LinkedIn", url: "https://linkedin.com/jobs", description: "Set alerts for blockchain/fintech" },
      { name: "Indeed", url: "https://indeed.com", description: "Search: blockchain developer" },
      { name: "Glassdoor", url: "https://glassdoor.com", description: "Research company salaries" },
      { name: "Hired", url: "https://hired.com", description: "Companies apply to you" },
      { name: "Dice", url: "https://dice.com", description: "Tech-focused job board" },
    ],
  },
];

const applicationTips = [
  {
    title: "Volume is Key",
    description: "Aim for 20-25 applications per week. Remote roles get 200-500 applicants. You need volume to break through.",
  },
  {
    title: "Niche Down",
    description: "Apply as 'Fintech/Blockchain Engineer' not 'Fullstack Developer'. Less competition, higher response rate.",
  },
  {
    title: "Keywords Matter",
    description: "Include: HD wallet, BIP32/39/44, multi-chain, payment systems, crypto, fintech in your resume.",
  },
  {
    title: "Direct Outreach",
    description: "Message CTOs and founders on Twitter/LinkedIn. 30-50% response rate vs 2-5% for cold applications.",
  },
  {
    title: "Follow Up",
    description: "If no response after 5-7 days, send a polite follow-up. Many jobs are filled through persistence.",
  },
];

const salaryRanges = [
  // Remote - Regional/Adjusted rates (company adjusts for your location)
  { role: "Mid Backend", range: "$1,500 - $3,000/month", category: "Regional Rates", region: "US/EU startups hiring globally", highlight: false },
  { role: "Senior Backend", range: "$3,000 - $5,000/month", category: "Regional Rates", region: "US/EU startups hiring globally", highlight: false },
  { role: "Blockchain/Fintech Specialist", range: "$4,000 - $7,000/month", category: "Regional Rates", region: "Crypto companies, Web3 startups", highlight: true, note: "YOUR SWEET SPOT - Less competition, your exact skill set" },
  // Remote - Global rates (same pay regardless of location)
  { role: "Mid Backend", range: "$5,000 - $8,000/month", category: "Global Rates", region: "US/EU (GitLab, Automattic, etc.)", highlight: false },
  { role: "Senior Backend", range: "$8,000 - $12,000/month", category: "Global Rates", region: "US/EU tech companies", highlight: false },
  { role: "Senior Web3/Fintech", range: "$10,000 - $15,000/month", category: "Global Rates", region: "US/EU crypto & fintech", highlight: "stretch", note: "STRETCH GOAL - Aim here after 1-2 years" },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-[#19485F] mb-2">Job Search Resources</h1>
          <p className="text-gray-600 mb-8">Personal reference for job hunting. Not linked publicly.</p>

          {/* Salary Ranges */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#19485F] mb-4">Target Salary Ranges (Remote)</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#19485F] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Range</th>
                    <th className="px-4 py-3 text-left">Pay Type</th>
                    <th className="px-4 py-3 text-left">Region/Companies</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryRanges.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        item.highlight === true
                          ? "bg-green-100 border-l-4 border-green-500"
                          : item.highlight === "stretch"
                            ? "bg-yellow-50 border-l-4 border-yellow-500"
                            : index % 2 === 0
                              ? "bg-gray-50"
                              : "bg-white"
                      }
                    >
                      <td className="px-4 py-3 text-gray-800">
                        {item.role}
                        {item.note && (
                          <div className={`text-xs mt-1 font-semibold ${item.highlight === true ? "text-green-700" : "text-yellow-700"}`}>
                            {item.note}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-800 font-medium">{item.range}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{item.category}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{item.region}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Application Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#19485F] mb-4">Application Strategy</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applicationTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="font-semibold text-[#19485F] mb-2">{tip.title}</h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Job Boards */}
          <section>
            <h2 className="text-2xl font-semibold text-[#19485F] mb-4">Job Boards</h2>
            <div className="space-y-8">
              {jobBoards.map((category, catIndex) => (
                <motion.div
                  key={catIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: catIndex * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <category.icon className="w-5 h-5 text-[#19485F]" />
                    <h3 className="text-xl font-medium text-[#19485F]">{category.category}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.sites.map((site, siteIndex) => (
                      <a
                        key={siteIndex}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-800 group-hover:text-[#19485F] transition-colors">
                            {site.name}
                          </h4>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#19485F] transition-colors" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{site.description}</p>
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Weekly Tracker */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-[#19485F] mb-4">Weekly Targets</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#19485F]">20-25</div>
                  <div className="text-gray-600">Applications/week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#19485F]">5-10</div>
                  <div className="text-gray-600">Direct outreach/week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#19485F]">10-20</div>
                  <div className="text-gray-600">Network connections/week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#19485F]">1-2</div>
                  <div className="text-gray-600">Blog posts/month</div>
                </div>
              </div>
            </div>
          </section>

          {/* Reminder */}
          <section className="mt-12">
            <div className="bg-[#19485F] text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Remember</h3>
              <p>
                You built a production multi-chain payment engine with HD wallets, sweepers, and settlement integration.
                That&apos;s not junior work. Don&apos;t undersell yourself. Target $5,000-$8,000/month for remote roles.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
