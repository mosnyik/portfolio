"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 bg-[#19485F] text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          About Me
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-xl text-center mb-8">
            I specialize in building fintech infrastructure that bridges cryptocurrency
            and traditional finance. Currently architecting payment systems that process
            crypto-to-fiat transactions across multiple blockchain networks.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-[#D9E0A4]">What I Build</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Multi-chain payment engines (BTC, ETH, Tron)</li>
                <li>• HD wallet derivation systems</li>
                <li>• Automated fund sweeping & settlement</li>
                <li>• Crypto deposit watchers with fraud detection</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-[#D9E0A4]">Core Stack</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Node.js / TypeScript / Express</li>
                <li>• Python / FastAPI</li>
                <li>• Bitcoin, Ethereum, Tron protocols</li>
                <li>• BIP32/39/44 HD key derivation</li>
                <li>• MySQL, PostgreSQL, MongoDB, Redis</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

